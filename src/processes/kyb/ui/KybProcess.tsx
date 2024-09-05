import EccubeBg from '@/shared/assets/images/eccube_bg.jpeg'
import { useUnit } from 'effector-react'
import { ReactNode, useContext, useMemo } from 'react'
import { SidebarRandomContent, getRandomInt } from '@/shared/ui/layouts/SeparateLayout/lib/utils'
import { Navigate, Outlet, useMatch, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { LogoutButton } from '@/shared/ui/components/Button/LogoutButton'
import { kyb } from '@/entities/kyb/model'
import { PrevPageButton } from '@/shared/ui/components/Button/PrevPageButton'
import { AuthContext } from '@/shared/ui/providers/AuthProvider'
import {
  SEPARATE_LAYOUT_SIDEBAR_WIDTH,
  SeparateLayout,
} from '@/shared/ui/layouts/SeparateLayout/ui/SeparateLayout'

export interface IAuthProcessProps {
  children?: ReactNode
}

export function KybProcess(props: IAuthProcessProps) {
  const { children } = props

  const { t } = useTranslation()
  const navigate = useNavigate()

  const { loggedIn } = useContext(AuthContext)

  const isLoading = useUnit(kyb.$isLoading)

  // TODO: Implement this
  //   const isCompactView = useMediaQuery<Theme>((theme) =>
  //     theme.breakpoints.down(SEPARATE_LAYOUT_COMPACT_BREAKPOINT)
  //   )

  const welcomePage = useMatch('/kyb')
  //   const userPage = useMatch('/kyb/user')
  //   const companyPage = useMatch('/kyb/company')
  //   const profilePage = useMatch('/kyb/profile')
  //   const molliePage = useMatch('/kyb/mollie')

  const sidebar = useMemo(() => {
    const random = getRandomInt()
    return SidebarRandomContent[random]
  }, [])

  if (loggedIn === false) return <Navigate to="/login" replace />
  return (
    <SeparateLayout
      LoaderProps={{ visible: isLoading || loggedIn === null }}
      Header={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {welcomePage ? (
            <Box sx={{ flexGrow: 1 }} />
          ) : (
            <PrevPageButton
              onClick={() => {
                navigate(-1)
              }}
            >
              {t('button.prev-step')}
            </PrevPageButton>
          )}

          <LogoutButton />
        </Box>
      }
      Sidebar={
        <Box pt={6}>
          <Typography variant="h5" component="h1" color="custom.const.white">
            {t(sidebar?.title ?? '')}
          </Typography>
          <Typography variant="body1" color="custom.const.white" mt={5}>
            {t(sidebar?.description ?? '')}
          </Typography>
        </Box>
      }
      SideBarProps={{
        sx: {
          backgroundImage: `url(${EccubeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      {children || <Outlet />}
    </SeparateLayout>
  )
}
