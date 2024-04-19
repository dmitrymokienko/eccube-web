import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function WelcomeOnKybPage() {
  // TODO: add validation
  const { t } = useTranslation()
  const navigate = useNavigate()

  const form = useForm()
  const { handleSubmit } = form

  const onSubmit = async () => {
    navigate('/kyb/user')
  }

  return (
    <>
      <Typography variant="h4" component="h1" pb={4}>
        {t('kyb.welcome-page.title')}
      </Typography>

      <FormProvider {...form}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body1" component="h1" gutterBottom>
            {t('kyb.welcome-page.description')}
          </Typography>

          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {t('button.start')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  )
}
