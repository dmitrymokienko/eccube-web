import { defaultApiClient } from '@/core/api/apiClient'
import { CreateTenderDto, TenderDto } from '@/features/tender/create-tender/types'
import { omit } from '@/shared/libs/utils/utilities'

export async function uploadTenderFilesApi(uploadedFiles: File[]) {
  if (uploadedFiles.length === 0) return false
  const formData = new FormData()
  for (const file of uploadedFiles) {
    formData.append('files', file)
  }
  await defaultApiClient.post<FormData, TenderDto>('/api/tender/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return true
}

export async function createNewTenderApi(data: CreateTenderDto) {
  const res = await defaultApiClient.post<CreateTenderDto, TenderDto>(
    '/api/tender/create',
    omit(['uploadedFiles'], data)
  )

  const tenderId = res.id
  console.log('tenderId:: ', tenderId)

  await uploadTenderFilesApi(data.uploadedFiles || [])
  return res
}
