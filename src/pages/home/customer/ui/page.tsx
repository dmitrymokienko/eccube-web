import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/ui/SidebarLayout'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { driver } from 'driver.js'
import { PROFILE_TYPE_STORAGE_ID } from '@/widgets/AccountTypeSwitcher/ui/ProfileTypeSwitcher'
import Button from '@mui/material/Button'
import { SIDEBAR_LAYOUT_SIDEBAR_LIST_ID } from '@/shared/ui/layouts/SidebarLayout/ui/components/Sidebar'
import Box from '@mui/material/Box'

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
      <Typography variant="h4" textAlign="center" sx={{ mt: 11 }}>
        {t('home.customer.title')}
      </Typography>

      <Typography variant="subtitle1" textAlign="center" sx={{ mt: 4 }}>
        {t('home.customer.description')}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <Button fullWidth={false} onClick={startTour}>
          {t('button.home-start-tour')}
        </Button>

        <Button fullWidth={false} href="https://eccube.de/" target="_blank">
          {t('button.learn-more')}
        </Button>
      </Box>
    </SidebarLayout>
  )
}
