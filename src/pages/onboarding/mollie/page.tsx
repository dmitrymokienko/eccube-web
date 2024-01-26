import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { onboarding } from '@/entities/onboarding/model'
import { LogoutButton } from '@/shared/ui/layouts/custom/SeparateLayout/components/LogoutButton'
import { fetchMollieOAuth2AccessTokenApi } from '@/entities/mollie/api'
import { OnboardingLayout } from '@/shared/ui/layouts/custom/SeparateLayout/OnboardingLayout'
import { PrevPageButton } from '@/shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'

export function MollieCallbackPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const called = useRef(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        if (called.current) return // prevent rerender caused by StrictMode
        called.current = true
        const search = window.location.search
        const code = new URLSearchParams(search).get('code')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { accessToken } = await fetchMollieOAuth2AccessTokenApi()(code!)
        await onboarding.createMollieProfileFx()
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [])

  const onSubmit = async () => {
    navigate('/main')
  }

  return (
    <OnboardingLayout
      Header={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <PrevPageButton
            onClick={() => {
              navigate('/onboarding')
            }}
          >
            {t('button.prev-step')}
          </PrevPageButton>

          <LogoutButton />
        </Box>
      }
    >
      <Typography variant="h4" component="h1" pb={4}>
        {t('onboarding.mollie-page.title')}
      </Typography>
      <Typography variant="body1" component="h1" gutterBottom>
        {t('onboarding.mollie-page.description')}
      </Typography>
      <Button variant="contained" sx={{ marginTop: '24px' }} onClick={onSubmit}>
        {t('button.continue')}
      </Button>
    </OnboardingLayout>
  )
}
