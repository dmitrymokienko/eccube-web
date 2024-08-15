import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/SidebarLayout'
import Typography from '@mui/material/Typography'

export function HomePage() {
  return (
    <SidebarLayout>
      <Typography variant="h1" textAlign="center" sx={{ marginTop: '32px' }}>
        Home
      </Typography>
    </SidebarLayout>
  )
}
