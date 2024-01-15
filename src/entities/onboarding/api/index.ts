import { ApiClient, defaultApiClient } from '../../../core/api/apiClient'

export function startMollieOAuth2Api(apiClient: ApiClient = defaultApiClient) {
  return async () => {
    const res = await apiClient.get<{ authorizationUri: string }>('/mollie/auth/url')
    return res
  }
}
export function getMollieOAuth2AccessTokenApi(apiClient: ApiClient = defaultApiClient) {
  return async (code: string) => {
    const res = await apiClient.get<unknown>('/mollie/auth/token', { code })
    return res
  }
}
