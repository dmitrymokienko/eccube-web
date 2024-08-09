import { defaultApiClient } from '@/core/api/apiClient'
import { CreateTenderDto, TenderDto } from '../types'
import { omit } from '@/shared/libs/utils/utilities'

export async function createNewTenderApi(data: CreateTenderDto) {
  const formData = new FormData()
  // Append the file parameter to the FormData object
  const uploadedFiles = data.uploadedFiles || []
  for (const file of uploadedFiles) {
    formData.append('uploadedFiles', file)
  }
  // Append the JSON data as a string
  formData.append('data', JSON.stringify(omit(['uploadedFiles'], data)))
  const res = await defaultApiClient.post<FormData, TenderDto>('/tender/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res
}
