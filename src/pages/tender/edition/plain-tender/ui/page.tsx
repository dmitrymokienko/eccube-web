import { CreatePlainTenderForm } from '@/features/tender/create-tender/ui/CreatePlainTenderForm'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export function PlainTenderEditionPage() {
  const { t } = useTranslation()

  return (
    <Stack spacing={4}>
      <Typography variant="h3">{t('tender.label.new-tender')}</Typography>

      <CreatePlainTenderForm />
    </Stack>
  )
}
