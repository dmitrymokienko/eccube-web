import { defaultApiClient } from '@/core/api/apiClient'
import { CreateTenderDto, TenderDto } from '../types'

export async function createNewTenderApi(data: CreateTenderDto) {
  const res = await defaultApiClient.post<CreateTenderDto, TenderDto>('/tender/create', data)
  return res
}
