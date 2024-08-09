import List from '@mui/material/List'
import { IUploadedFile } from '../../types'
import { UploadedFile } from './UploadedFile'

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
          key={file.fileName}
          fileName={file.fileName}
          downloadLink={file.fileUrl}
          onDelete={onDelete}
        />
      ))}
    </List>
  )
}
