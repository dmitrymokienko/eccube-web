import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function PlainTenderSuccessCreationPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onContinue = () => {
    // add id query param (open drawer)
    navigate(`/dashboard/tenders?id=`)
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h3">{t('tender.label.successfully-created-tender')}</Typography>

      <Stack spacing={2}>
        {/* descr */}

        <Button type="button" onClick={onContinue}>
          {t('button.continue')}
        </Button>
      </Stack>
    </Stack>
  )
}
