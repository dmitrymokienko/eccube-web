import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/ui/SidebarLayout'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export function CustomerHomePage() {
  const { t } = useTranslation()

  return (
    <SidebarLayout>
      <Typography variant="h4" textAlign="center" sx={{ marginTop: '32px' }}>
        {t('home.customer.title')}
      </Typography>

      <Typography variant="subtitle1" sx={{ marginTop: '32px' }}>
        {t('home.customer.description')}
      </Typography>
    </SidebarLayout>
  )
}
