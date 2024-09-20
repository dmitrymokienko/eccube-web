import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/ui/SidebarLayout'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { driver } from 'driver.js'
import { PROFILE_TYPE_STORAGE_ID } from '@/widgets/AccountTypeSwitcher/ui/ProfileTypeSwitcher'
import Button from '@mui/material/Button'
import { SIDEBAR_LAYOUT_SIDEBAR_LIST_ID } from '@/shared/ui/layouts/SidebarLayout/ui/components/Sidebar'

export function CustomerHomePage() {
  const { t } = useTranslation()

  const startTour = () => {
    const driverObj = driver({
      steps: [
        {
          element: `#${PROFILE_TYPE_STORAGE_ID}`,
          popover: {
            title: t('user-tours.home-page.profile-switcher.title'),
            description: t('user-tours.home-page.profile-switcher.description'),
          },
        },
        {
          element: `#${SIDEBAR_LAYOUT_SIDEBAR_LIST_ID}`,
          popover: {
            title: t('user-tours.home-page.sidebar-menu.title'),
            description: t('user-tours.home-page.sidebar-menu.description'),
          },
        },
      ],
    })
    driverObj.drive()
  }

  return (
    <SidebarLayout>
      <Typography variant="h4" textAlign="center" sx={{ marginTop: '32px' }}>
        {t('home.customer.title')}
      </Typography>

      <Typography variant="subtitle1" sx={{ marginTop: '32px' }}>
        {t('home.customer.description')}
      </Typography>

      <Button fullWidth={false} onClick={startTour}>
        {t('button.home-start-tour')}
      </Button>
    </SidebarLayout>
  )
}
