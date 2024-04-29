import { ApiClient, defaultApiClient } from '../../../core/api/apiClient'
import { IMollieOnboardingStatus, IMollieProfileResponse, UpdateMollieProfileDto } from '../types'

export function startMollieOAuth2Api(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.get<{ authorizationUri: string }>('/api/mollie/auth/url')
    return res
  }
}
export function fetchMollieOAuth2AccessTokenApi(apiClient: ApiClient = defaultApiClient) {
  return async (code: string) => {
    const res = await apiClient.post<{ code: string }, { accessToken: string }>(
      '/api/mollie/auth/token',
      { code }
    )
    return res
  }
}

export function createMollieProfileApi(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.post<undefined, IMollieProfileResponse>(
      `/api/mollie/create/profile`,
      undefined
    )
    return res
  }
}
export function updateMollieProfileApi(apiClient: ApiClient = defaultApiClient) {
  return async (payload: UpdateMollieProfileDto) => {
    const res = await apiClient.patch<UpdateMollieProfileDto, IMollieProfileResponse>(
      `/api/mollie/update/profile`,
      payload
    )
    return res
  }
}

export function sendKybPassedApi(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.post<undefined, IMollieProfileResponse>(
      `/api/mollie/onboarding/me`,
      undefined
    )
    return res
  }
}

export function checkMollieOnBoardingStatusApi(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.get<IMollieOnboardingStatus>('/api/mollie/onboarding-status')
    return res
  }
}

export function enablePaymentMethodApi(apiClient: ApiClient = defaultApiClient) {
  return async (method: string) => {
    const res = await apiClient.post<undefined, IMollieProfileResponse>(
      `/api/mollie/profiles/methods/${method}`,
      undefined
    )
    return res
  }
}
