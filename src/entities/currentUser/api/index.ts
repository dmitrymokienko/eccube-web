import { defaultApiClient } from '../../../core/api/apiClient'
import { IOnboardingCompanyData } from '../../onboarding/types'
import { IUser } from '../types'
import { IUpdateUserDto } from '../types/dto'

export async function getUserInfoApi() {
  const res = await defaultApiClient.get<IUser>('/v1/user/me')
  return res
}

export async function updateUserApi(data: IUpdateUserDto) {
  const res = await defaultApiClient.put<IUpdateUserDto, IUser>('/v1/user/update', data)
  return res
}

export async function deleteUserApi() {
  const res = await defaultApiClient.delete('/v1/user/delete')
  return res
}

// TODO: update! now only required fields
export async function createOrganizationApi(data: IOnboardingCompanyData) {
  const res = await defaultApiClient.post<IOnboardingCompanyData, unknown>(
    '/v1/organization/create',
    data
  )
  return res
}
