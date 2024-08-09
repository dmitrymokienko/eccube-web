export interface IUploadedFile {
  isUploaded: boolean
  fileName: string
  fileSize: number
  fileUrl?: string
  file?: File
}
