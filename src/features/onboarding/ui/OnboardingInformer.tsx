import { kyb } from '@/entities/kyb/model'
import { MollieOnboardingStatus } from '@/entities/mollie/types'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import InfoIcon from '@mui/icons-material/Info'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Alert from '@mui/material/Alert'
import { Link, styled } from '@mui/material'

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
      <Banner severity="info" icon={<AccessTimeIcon fontSize="inherit" />}>
        {t('kyb.dashboard.onboarding-status-review')}
      </Banner>
    )
  }
  const href = mollieOnboarding?._links?.dashboard?.href ?? ''
  return (
    <Banner
      severity="warning"
      icon={<InfoIcon fontSize="inherit" sx={{ color: '#FCD12A' }} />}
      action={
        <Link href={href} target="_blank">
          {t('button.complete')}
        </Link>
      }
    >
      {t('kyb.dashboard.onboarding-status-needs')}
    </Banner>
  )
}

// SUB COMPONENTS

const Banner = styled(Alert)({
  '& .MuiAlert-action': {
    marginRight: 0,
    padding: 0,
    paddingLeft: '8px',
    display: 'flex',
    alignItems: 'center',
  },
})
