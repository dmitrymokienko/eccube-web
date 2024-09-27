import { defaultApiClient } from '@/core/api/apiClient'
import { createQueryParams, omit } from '@/shared/libs/utils/utilities'
import { CreateTenderDto } from '@/features/tender/plain-tender/api/dto'
import { ITender } from '@/entities/tender/model/interfaces'
import { TenderListQueryFilters } from '../model/interfaces'
import { IUploadedFile } from '@/entities/uploadFiles/model/interfaces'

export async function uploadTenderFilesApi(uploadedFiles: IUploadedFile[], tenderId: string) {
  if (uploadedFiles.length === 0) return false
  const formData = new FormData()
  for (const file of uploadedFiles) {
    formData.append('files', file)
  }
  await defaultApiClient.post<FormData, ITender>(`/api/tender/upload/${tenderId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return true
}

//

export async function createNewTenderApi(data: CreateTenderDto) {
  const res = await defaultApiClient.post<CreateTenderDto, ITender>(
    '/api/tender/create',
    omit(['uploadedFiles'], data)
  )
  const tenderId = res.id
  await uploadTenderFilesApi(data.uploadedFiles || [], tenderId)
  return res
}

//

export async function createNewTenderDraftApi(data: Partial<CreateTenderDto>) {
  const res = await defaultApiClient.post<Partial<CreateTenderDto>, ITender>(
    '/api/tender/create/draft',
    omit(['uploadedFiles'], data)
  )
  const tenderId = res.id
  await uploadTenderFilesApi(data.uploadedFiles || [], tenderId)
  return res
}

//

export async function fetchTenderByIdApi(id: string) {
  return defaultApiClient.get<ITender>(`/api/tender/${id}`)
}

//

export async function fetchTenderListApi(filters?: TenderListQueryFilters) {
  const queryParams = createQueryParams(filters)
  return defaultApiClient.get<ITender[]>(`/api/tender/list?${queryParams}`)
}

//

export async function updateByIdApi(data: Partial<CreateTenderDto> & { id: string }) {
  const { id } = data
  const res = await defaultApiClient.put<Partial<CreateTenderDto>, ITender>(
    `/api/tender/${id}`,
    omit(['uploadedFiles'], data)
  )
  await uploadTenderFilesApi(data.uploadedFiles || [], id)
  return res
}

//

export async function publishTenderApi(id: string) {
  return defaultApiClient.post(`/api/tender/publish/${id}`, undefined)
}

//

export async function deleteByIdApi(id: string) {
  return defaultApiClient.delete(`/api/tender/${id}`)
}
