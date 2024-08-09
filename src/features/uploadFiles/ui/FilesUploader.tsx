import { FormEvent, useMemo, useState } from 'react'
import { UploadFilesButton } from './components/UploadFilesButton'
import { IUploadedFile } from '../types'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { isEmpty } from '@/shared/libs/utils/utilities'
import { UploadedFilesList } from './components/UploadedFilesList'
import { useTranslation } from 'react-i18next'

const MAX_COUNT = 6
const ATTACHMENT_MAX_SIZE = 10 * 1_000 * 1_000 // 10MB

export interface IFilesUploaderProps {
  files: IUploadedFile[]
  onUpload: (files: IUploadedFile[]) => void
  deletable?: boolean
}

export function FilesUploader(props: IFilesUploaderProps) {
  const { files = [], onUpload, deletable = true } = props

  const { t } = useTranslation()

  const [error, setError] = useState<string>()

  const isTooMuchFiles = useMemo(() => files.length >= MAX_COUNT, [files?.length])

  const onFileUpload = (e: FormEvent<HTMLInputElement>) => {
    setError('')
    const extractedFiles = e.currentTarget.files as FileList
    const extractedFile = extractedFiles[0] as File
    const isFileAlreadyExists = files.some((v) => v.fileName === extractedFile.name)
    if (isFileAlreadyExists) return
    if (extractedFile.size >= ATTACHMENT_MAX_SIZE) {
      setError(t('validation.upload-file-max-size', { n: ATTACHMENT_MAX_SIZE / 1_000 / 1_000 }))
      return
    }
    if (isEmpty(files)) {
      onUpload([prepareFile(extractedFile)])
    } else {
      onUpload([...files, prepareFile(extractedFile)])
    }
  }

  const onDelete = (fileName: string) => {
    const newFiles = files.filter((v) => v.fileName !== fileName)
    onUpload(newFiles)
  }

  return (
    <Stack spacing={0}>
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

      <UploadedFilesList
        files={files.filter((v) => !isEmpty(v))}
        onDelete={deletable ? onDelete : undefined}
      />
    </Stack>
  )
}

function prepareFile(f: File): IUploadedFile {
  return {
    file: f,
    fileName: f.name,
    fileSize: f.size,
    isUploaded: false,
  }
}
