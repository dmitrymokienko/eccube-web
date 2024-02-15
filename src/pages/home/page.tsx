import { MollieOnboardingStatus } from '../../shared/ui/components/Button/MollieOnboardingStatus'
import Box from '@mui/material/Box'
import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/SidebarLayout'
import Typography from '@mui/material/Typography'

export function HomePage() {
  return (
    <SidebarLayout
      Nav={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MollieOnboardingStatus />
        </Box>
      }
    >
      <Typography variant="h1" textAlign="center" sx={{ marginTop: '32px' }}>
        Home
      </Typography>
    </SidebarLayout>
  )
}
