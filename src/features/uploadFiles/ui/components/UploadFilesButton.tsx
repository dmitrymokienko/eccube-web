import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { forwardRef, InputHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import FileUploadIcon from '@mui/icons-material/FileUpload'

export const UploadFilesButton = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { t } = useTranslation()

  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<FileUploadIcon />}
      disabled={props.disabled}
    >
      {t('button.upload-file')}

      <HiddenInput
        ref={ref}
        type="file"
        accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx,.txt"
        {...props}
      />
    </Button>
  )
})

const HiddenInput = styled('input')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: 1,
  width: 1,
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
})
