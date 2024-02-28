import { kyb } from '@/entities/kyb/model'
import { MollieOnboardingStatus } from '@/entities/mollie/types'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useUnit } from 'effector-react'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import InfoIcon from '@mui/icons-material/Info'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export function OnboardingInformer() {
  const { t } = useTranslation()

  const mollieOnboarding = useUnit(kyb.$mollieOnboardingStatus)

  useEffect(() => {
    try {
      const fetch = async () => {
        await kyb.checkMollieOnBoardingStatusFx()
      }
      fetch()
    } catch (err) {
      console.error(err)
    }
  }, [])

  if (!mollieOnboarding || mollieOnboarding?.status === MollieOnboardingStatus.completed) {
    return null
  }
  if (mollieOnboarding?.status === MollieOnboardingStatus.inReview) {
    return (
      <Banner>
        <AccessTimeIcon sx={{ color: '#FCD12A' }} />
        <Typography variant="body1" color="custom.const.black">
          {t('kyb.dashboard.onboarding-status-review')}
        </Typography>
      </Banner>
    )
  }
  const href = mollieOnboarding?._links?.dashboard?.href ?? ''
  return (
    <Banner>
      <InfoIcon sx={{ color: '#FCD12A' }} />
      <Typography variant="body1" color="custom.const.black">
        {t('kyb.dashboard.onboarding-status-needs')}
      </Typography>
      <Link href={href} target="_blank">
        {t('button.complete')}
      </Link>
    </Banner>
  )
}

// SUB COMPONENTS

function Banner(props: { children: ReactNode }) {
  const { children } = props
  return (
    <Box
      p={1}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '4px',
        border: '2px solid #FCD12A',
      }}
    >
      {children}
    </Box>
  )
}
