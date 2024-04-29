import { defaultApiClient } from '../../../core/api/apiClient'
import { IKybCompanyData } from '../../kyb/types'
import { IUser } from '../types'
import { IUpdateUserDto } from '../types/dto'

type Address = Pick<IKybCompanyData, 'address'>

type OrganizationDto = Omit<IKybCompanyData, 'address'> & Address['address']

export async function getUserInfoApi() {
  const res = await defaultApiClient.get<IUser>('/api/user/me')
  return res
}

export async function updateUserApi(data: IUpdateUserDto) {
  const res = await defaultApiClient.put<IUpdateUserDto, IUser>('/api/user/update', data)
  return res
}

export async function deleteUserApi() {
  const res = await defaultApiClient.delete('/api/user/delete')
  return res
}

export async function createOrganizationApi(data: IKybCompanyData) {
  const { address, ...rest } = data
  const res = await defaultApiClient.post<OrganizationDto, unknown>('/api/organization/create', {
    ...rest,
    ...address,
  })
  return res
}

export async function updateOrganizationApi(data: Partial<IKybCompanyData>) {
  const { address, ...rest } = data || {}
  const dto = address ? { ...rest, ...address } : rest
  const res = await defaultApiClient.put<Partial<OrganizationDto>, unknown>(
    '/api/organization/update',
    dto
  )
  return res
}
