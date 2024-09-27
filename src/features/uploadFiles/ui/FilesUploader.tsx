import { FormEvent, useMemo, useState } from 'react'
import { UploadFilesButton } from './components/UploadFilesButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { isEmpty } from '@/shared/libs/utils/utilities'
import { UploadedFilesList } from './components/UploadedFilesList'
import { useTranslation } from 'react-i18next'
import { SxProps } from '@mui/material/styles'
import { IUploadedFile } from '@/entities/uploadFiles/model/interfaces'

const MAX_COUNT = 6
const ATTACHMENT_MAX_SIZE = 10 * 1024 * 1024 // 10MB

export interface IFilesUploaderProps {
  files: IUploadedFile[]
  onUpload: (files: IUploadedFile[]) => void
  onDelete?: (fileName: string) => void
  deletable?: boolean
  sx?: SxProps
}

export function FilesUploader(props: IFilesUploaderProps) {
  const { files = [], onUpload, onDelete, deletable = true, sx = {} } = props

  const { t } = useTranslation()

  const [error, setError] = useState<string | boolean>(false)

  const isTooMuchFiles = useMemo(() => files.length >= MAX_COUNT, [files?.length])

  const onFileUpload = (e: FormEvent<HTMLInputElement>) => {
    setError(false)
    const extractedFiles = e.currentTarget.files as FileList
    const extractedFile = extractedFiles[0]
    const isFileAlreadyExists = files.some((v) => v.name === extractedFile.name)
    if (isFileAlreadyExists) {
      setError(t('validation.upload-file-already-exists'))
      return
    }
    if (extractedFile.size >= ATTACHMENT_MAX_SIZE) {
      setError(t('validation.upload-file-max-size', { n: ATTACHMENT_MAX_SIZE / 1024 / 1024 }))
      return
    }
    if (isEmpty(files)) {
      onUpload([extractedFile])
    } else {
      onUpload([...files, extractedFile])
    }
  }

  const handleDelete = (fileName: string) => {
    if (typeof onDelete === 'function') {
      const file = files.find((v) => v.name === fileName)
      if (!file?.url) return
      onDelete(file.url)
    }
    const newFiles = files.filter((v) => v.name !== fileName)
    onUpload(newFiles)
  }

  return (
    <Stack spacing={0} sx={sx}>
      <Stack spacing={0.5}>
        <UploadFilesButton onChange={onFileUpload} disabled={isTooMuchFiles} />

        {isTooMuchFiles && (
          <Typography variant="caption" sx={{ px: '14px' }}>
            {t('validation.upload-file-max-count')}
          </Typography>
        )}

        {error && (
          <Typography variant="caption" color="error.main" sx={{ px: '14px' }}>
            {error}
          </Typography>
        )}
      </Stack>

      <UploadedFilesList files={files} onDelete={deletable ? handleDelete : undefined} />
    </Stack>
  )
}
