import Button from '@mui/material/Button'
import { kyb } from '../../../../entities/kyb/model'

export function MollieOnboardingStatus() {
  const onClick = async () => {
    try {
      await kyb.checkMollieOnBoardingStatusFx()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Button fullWidth={false} variant="contained" onClick={onClick}>
      Check Mollie Onboarding Status
    </Button>
  )
}
