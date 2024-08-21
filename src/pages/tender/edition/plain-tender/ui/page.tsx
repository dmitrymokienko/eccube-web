import { PlainTenderForm } from '@/features/tender/plain-tender/ui/PlainTenderForm'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function PlainTenderEditionPage() {
  const { t } = useTranslation()

  const [uploadedFiles, setFiles] = useState<File[]>([])

  return (
    <Stack spacing={4}>
      <Typography variant="h3">{t('tender.label.new-tender')}</Typography>

      <PlainTenderForm uploadedFiles={uploadedFiles} setFiles={setFiles} />
    </Stack>
  )
}
