import { defaultApiClient } from '../../../core/api/apiClient'
import { IBackendTokens } from '../../../shared/ui/providers/AuthProvider'
import { ILoginUserResponse, IUser, Role } from '../../currentUser/types'
import { ICreateUserDto } from '../../currentUser/types/dto'

export async function registerUserApi(data: { email: string; password: string; roles: Role[] }) {
  const res = await defaultApiClient.post<ICreateUserDto, IUser>('/api/auth/register', data)
  return res
}

export async function loginUserApi(data: { email: string; password: string }) {
  const res = await defaultApiClient.post<{ email: string; password: string }, ILoginUserResponse>(
    '/api/auth/login',
    data
  )
  return res
}

export async function logoutUserApi() {
  const res = await defaultApiClient.post<undefined, undefined>('/api/auth/logout', undefined)
  return res
}

export async function checkLoggedInUserApi() {
  const res = await defaultApiClient.get<{ user: IUser; backendTokens: IBackendTokens }>(
    '/api/auth/logged_in'
  )
  return res
}

// TODO: delete, temporary solution
export async function activateUserApi(token: string) {
  const res = await defaultApiClient.post<{ token: string }, IUser>('/api/auth/activate', {
    token,
  })
  return res
}

export async function refreshTokenApi(refreshToken: string) {
  const res = await defaultApiClient.post<undefined, IBackendTokens>(
    '/api/auth/refresh',
    undefined,
    {
      headers: {
        authorization: `Refresh ${refreshToken}`,
      },
      withCredentials: true,
    }
  )
  return res
}
