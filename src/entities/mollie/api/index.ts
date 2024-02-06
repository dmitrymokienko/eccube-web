import { ApiClient, defaultApiClient } from '../../../core/api/apiClient'
import { IMollieProfileResponse, UpdateMollieProfileDto } from '../types'

export function startMollieOAuth2Api(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.get<{ authorizationUri: string }>('/mollie/auth/url')
    return res
  }
}
export function fetchMollieOAuth2AccessTokenApi(apiClient: ApiClient = defaultApiClient) {
  return async (code: string) => {
    const res = await apiClient.post<{ code: string }, { accessToken: string }>(
      '/mollie/auth/token',
      { code }
    )
    return res
  }
}

export function createMollieProfileApi(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.post<undefined, IMollieProfileResponse>(
      `/mollie/create/profile`,
      undefined
    )
    return res
  }
}
export function updateMollieProfileApi(apiClient: ApiClient = defaultApiClient) {
  return async (payload: UpdateMollieProfileDto) => {
    const res = await apiClient.patch<UpdateMollieProfileDto, IMollieProfileResponse>(
      `/mollie/update/profile`,
      payload
    )
    return res
  }
}

export function checkMollieOnBoardingStatusApi(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.get<{ status: string }>('/mollie/onboarding-status')
    return res
  }
}
