import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { kyb } from '../../../entities/kyb/model'
import { useUnit } from 'effector-react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { MollieOnboardingStatus } from '@/entities/mollie/types'
import { AuthContext } from '@/shared/ui/providers/AuthProvider'

export function MollieCallbackPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [hasError, setHasError] = useState<boolean>(false)

  const { loggedIn } = useContext(AuthContext)

  const { isLoading, mollieKyb } = useUnit({
    isLoading: kyb.$isLoading,
    mollieKyb: kyb.$mollieOnboardingStatus,
  })

  const called = useRef(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        if (called.current) return // prevent rerender caused by StrictMode
        called.current = true
        const search = window.location.search
        const code = new URLSearchParams(search).get('code')
        await kyb.fetchMollieTokenFx(code!)
        await kyb.createMollieProfileFx()
        await kyb.sendKybPassedFx()
        await kyb.checkMollieOnBoardingStatusFx()
      } catch (err) {
        console.error(err)
        setHasError(true)
      }
    }
    if (loggedIn) {
      fetch()
    }
  }, [loggedIn])

  const onGoToAppClick = async () => {
    navigate('/dashboard/home')
  }

  const href = mollieKyb?._links?.dashboard?.href ?? ''

  return (
    <>
      <Typography variant="h4" component="h1" pb={4}>
        {t('kyb.mollie-page.title')}
      </Typography>

      {/* Status */}
      <Typography
        variant="body1"
        component="h1"
        gutterBottom
        sx={{ color: hasError ? 'error.main' : 'success.main' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {hasError ? <ErrorIcon sx={{ color: 'error.main' }} /> : null}
          {hasError ? t('kyb.mollie-page.description-error') : null}
          {!hasError && !isLoading ? <CheckCircleIcon sx={{ color: 'success.main' }} /> : null}
          {!hasError && !isLoading ? t('kyb.mollie-page.description') : null}
        </Box>
      </Typography>

      {/* Mollie's onboarding description */}
      {mollieKyb?.status === MollieOnboardingStatus.needsData ? (
        <Typography variant="body1" pt={3}>
          {t('kyb.mollie-page.onboarding')}
        </Typography>
      ) : null}

      <Button
        variant="contained"
        sx={{ marginTop: '32px' }}
        disabled={isLoading}
        href={href}
        target="_blank"
      >
        {t('button.complete-onboarding')}
      </Button>

      <Button
        variant="outlined"
        sx={{ marginTop: '24px' }}
        onClick={onGoToAppClick}
        disabled={isLoading}
      >
        {t('button.go-to-app')}
      </Button>
    </>
  )
}
