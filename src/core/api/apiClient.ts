import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { auth } from '../../entities/auth/model'
import { jwtDecode } from 'jwt-decode'

const backendBaseURL = (): string => import.meta.env.VITE_APP_BACKEND_BASE_URL

type ApiConfig = CreateAxiosDefaults<unknown>

export class ApiClient {
  public instance: AxiosInstance

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

    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      async (err) => {
        const config = err.config
        const refreshToken = JSON.parse(localStorage.getItem('refresh')!)
        // Access Token was expired, retry
        if (err?.response.status === 401 && refreshToken && !config._retry) {
          config._retry = true
          try {
            const rs = await this.instance.post('/v1/auth/refresh', undefined, {
              headers: {
                'Content-Type': 'application/json',
                authorization: `Refresh ${refreshToken}`,
              },
              withCredentials: true,
            })
            auth.setRefreshToken(rs.data.refreshToken)
            const { exp } = jwtDecode(rs.data.accessToken)
            if (exp) {
              auth.setExpiresIn(exp)
            }
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
