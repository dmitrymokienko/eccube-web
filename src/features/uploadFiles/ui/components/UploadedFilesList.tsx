import List from '@mui/material/List'
import { UploadedFile } from './UploadedFile'
import { IUploadedFile } from '@/entities/uploadFiles/model/interfaces'

export interface IUploadedFilesListProps {
  files: IUploadedFile[]
  onDelete?: (fileName: string) => void
}

export function UploadedFilesList(props: IUploadedFilesListProps) {
  const { files = [], onDelete } = props

  if (files.length === 0) return null
  return (
    <List>
      {files.map((file) => (
        <UploadedFile
          key={file.name}
          fileName={file.name}
          downloadLink={file.url}
          onDelete={onDelete}
        />
      ))}
    </List>
  )
}
