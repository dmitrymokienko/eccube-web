import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function PlainTenderDraftCreationPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onContinue = () => {
    // TODO: add id query param (open drawer)
    navigate(`/dashboard/tenders?id=`)
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h3" textAlign="center">
        {t('tender.label.successfully-created-tender-draft')}
      </Typography>

      <Typography variant="body1" textAlign="justify">
        {t('tender.description.successfully-created-tender-draft')}
      </Typography>

      <Button type="button" onClick={onContinue}>
        {t('button.continue')}
      </Button>
    </Stack>
  )
}
