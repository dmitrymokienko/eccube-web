import { defaultApiClient } from '@/core/api/apiClient'
import { omit } from '@/shared/libs/utils/utilities'
import { CreateTenderDto } from '@/features/tender/plain-tender/api/dto'
import { ITender } from '@/entities/tender/model/interfaces'

export async function uploadTenderFilesApi(uploadedFiles: File[]) {
  if (uploadedFiles.length === 0) return false
  const formData = new FormData()
  for (const file of uploadedFiles) {
    formData.append('files', file)
  }
  await defaultApiClient.post<FormData, ITender>('/api/tender/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return true
}

export async function createNewTenderApi(data: CreateTenderDto) {
  const res = await defaultApiClient.post<CreateTenderDto, ITender>(
    '/api/tender/create',
    omit(['uploadedFiles'], data)
  )

  const tenderId = res.id
  console.log('tenderId:: ', tenderId)

  await uploadTenderFilesApi(data.uploadedFiles || [])
  return res
}
