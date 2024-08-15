import List from '@mui/material/List'
import { UploadedFile } from './UploadedFile'

export interface IUploadedFilesListProps {
  files: File[]
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
          // downloadLink={file.fileUrl}
          onDelete={onDelete}
        />
      ))}
    </List>
  )
}
