import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'
import { KybLayout } from '../../../shared/ui/layouts/custom/SeparateLayout/KybLayout'
import { PrevPageButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { LogoutButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/LogoutButton'
import { useTranslation } from 'react-i18next'
import { kyb } from '../../../entities/kyb/model'
import { useUnit } from 'effector-react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

export function MollieCallbackPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [hasError, setHasError] = useState<boolean>(false)

  const isLoading = useUnit(kyb.$isLoading)

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
        await kyb.checkMollieOnBoardingStatusFx()
      } catch (err) {
        console.error(err)
        setHasError(true)
      }
    }
    fetch()
  }, [])

  const onSubmit = async () => {
    navigate('/main')
  }

  return (
    <KybLayout
      LoaderProps={{ visible: isLoading }}
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
              navigate('/kyb')
            }}
          >
            {t('button.prev-step')}
          </PrevPageButton>

          <LogoutButton />
        </Box>
      }
    >
      <Typography variant="h4" component="h1" pb={4}>
        {t('kyb.mollie-page.title')}
      </Typography>
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
      <Button
        variant="contained"
        sx={{ marginTop: '24px' }}
        onClick={onSubmit}
        disabled={isLoading}
      >
        {t('button.continue')}
      </Button>
    </KybLayout>
  )
}
