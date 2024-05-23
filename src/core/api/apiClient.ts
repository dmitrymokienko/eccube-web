import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { auth } from '../../entities/auth/model'
import { jwtDecode } from 'jwt-decode'
import { Nullable } from '@/shared/types/utilities'
import { IBackendTokens } from '@/shared/ui/providers/AuthProvider'

const backendBaseURL = (): string => import.meta.env.VITE_APP_BACKEND_BASE_URL

type ApiConfig = CreateAxiosDefaults<unknown>

export class ApiClient {
  public instance: AxiosInstance

  private accessToken: Nullable<string> = null

  public setAccessToken(token: Nullable<string>): void {
    this.accessToken = token
  }

  protected createClient(apiConfiguration: ApiConfig): AxiosInstance {
    const { baseURL, responseType, headers } = apiConfiguration
    return axios.create({
      baseURL: baseURL ?? backendBaseURL(),
      responseType: responseType ?? ('json' as const),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      withCredentials: true,
    })
  }

  constructor(apiConfiguration: ApiConfig = {}) {
    this.instance = this.createClient(apiConfiguration)

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers['Authorization'] = 'Bearer ' + this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        if (this.accessToken) return res
        const authorizationHeader: string = res.headers['authorization']
        if (authorizationHeader) {
          const token = authorizationHeader.split(' ')[1]
          if (token) {
            this.setAccessToken(token)
          }
        }
        return res
      },
      async (err) => {
        const config = err.config
        // Access Token was expired, retry
        const { exp = null } = jwtDecode(this.accessToken ?? '')
        const isExpired = exp && new Date().getTime() > exp * 1000
        if (err?.response.status === 401 && isExpired && !config._retry) {
          config._retry = true
          try {
            const { backendTokens } = await this.get<{ backendTokens: IBackendTokens }>(
              '/api/auth/refresh'
            )
            this.setAccessToken(backendTokens?.accessToken ?? null)
            auth.setAccessToken(backendTokens?.accessToken ?? null)
            auth.setRefreshToken(backendTokens?.refreshToken ?? null)
            const { exp = null } = jwtDecode(backendTokens.accessToken ?? {})
            auth.setExpiresIn(exp)
            return this.instance(config)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
        return Promise.reject(err)
      }
    )
  }

  public async get<TResponse>(
    path: string,
    params?: Record<string, string | number | boolean | null>
  ): Promise<TResponse> {
    try {
      const response = await this.instance.get<TResponse>(path, { params: params ?? {} })
      return response.data
    } catch (err) {
      this.handleError(err as AxiosError)
    }
    return {} as TResponse
  }

  public async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfig<unknown>
  ): Promise<TResponse> {
    try {
      const response = await this.instance.post<TResponse>(path, payload, config)
      return response.data
    } catch (err) {
      this.handleError(err as AxiosError)
    }
    return {} as TResponse
  }

  public async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.instance.put<TResponse>(path, payload)
      return response.data
    } catch (err) {
      this.handleError(err as AxiosError)
    }
    return {} as TResponse
  }

  public async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.instance.patch<TResponse>(path, payload)
      return response.data
    } catch (err) {
      this.handleError(err as AxiosError)
    }
    return {} as TResponse
  }

  public async delete<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.instance.delete<TResponse>(path)
      return response.data
    } catch (err) {
      this.handleError(err as AxiosError)
    }
    return {} as TResponse
  }

  protected handleError(error: AxiosError): void {
    if (error?.response?.data) {
      // Request made and server responded
      const { data, status } = error.response
      console.error(`Error status:: ${status}, data:: ${data}`)
      throw error.response.data
    } else if (error.request) {
      // The request was made but no response was received
      console.error(`Error request:: ${error.request}`)
      throw error.request
    }
    // Something happened in setting up the request that triggered an Error
    console.error(`Error message:: ${error.message}`)
    throw error.message
  }
}

export const defaultApiClient = new ApiClient()
