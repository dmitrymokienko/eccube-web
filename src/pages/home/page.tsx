import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/SidebarLayout'
import Typography from '@mui/material/Typography'
import { OnboardingInformer } from '@/features/onboarding/ui/OnboardingInformer'

export function HomePage() {
  return (
    <SidebarLayout Nav={<OnboardingInformer />}>
      <Typography variant="h1" textAlign="center" sx={{ marginTop: '32px' }}>
        Home
      </Typography>
    </SidebarLayout>
  )
}
