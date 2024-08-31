import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export function PlainTenderSuccessPublishingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onContinue = () => {
    // TODO: add id query param (open drawer)
    navigate(`/dashboard/tenders?id=`)
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={0}>
        <Typography variant="h3" textAlign="center">
          <CheckCircleIcon fontSize="inherit" sx={{ color: 'success.main' }} />
        </Typography>

        <Typography variant="h3" textAlign="center">
          {t('tender.label.successfully-created-tender')}
        </Typography>
      </Stack>

      <Typography variant="body1" textAlign="justify">
        {t('tender.description.successfully-created-tender')}
      </Typography>

      <Button type="button" onClick={onContinue}>
        {t('button.continue')}
      </Button>
    </Stack>
  )
}
