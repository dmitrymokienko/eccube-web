import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'
import { KybLayout } from '../../../shared/ui/layouts/custom/SeparateLayout/KybLayout'
import { PrevPageButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'
import { useNavigate } from 'react-router-dom'
import { fetchMollieOAuth2AccessTokenApi } from '../../../entities/mollie/api'
import Box from '@mui/material/Box'
import { LogoutButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/LogoutButton'
import { useTranslation } from 'react-i18next'
import { kyb } from '../../../entities/kyb/model'

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
        await fetchMollieOAuth2AccessTokenApi()(code!)
        await kyb.createMollieProfileFx()
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
    <KybLayout
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
      <Typography variant="body1" component="h1" gutterBottom>
        {t('kyb.mollie-page.description')}
      </Typography>
      <Button variant="contained" sx={{ marginTop: '24px' }} onClick={onSubmit}>
        {t('button.continue')}
      </Button>
    </KybLayout>
  )
}
