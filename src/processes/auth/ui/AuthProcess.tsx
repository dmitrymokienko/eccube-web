import EccubeBg from '@/shared/assets/images/eccube_bg.jpeg'
import { useUnit } from 'effector-react'
import { ReactNode, useMemo } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import { SidebarRandomContent, getRandomInt } from '@/shared/ui/layouts/SeparateLayout/lib/utils'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { auth } from '@/entities/auth/model'
import {
  SEPARATE_LAYOUT_COMPACT_BREAKPOINT,
  SEPARATE_LAYOUT_SIDEBAR_WIDTH,
  SeparateLayout,
} from '@/shared/ui/layouts/SeparateLayout/ui/SeparateLayout'

export interface IAuthProcessProps {
  children?: ReactNode
}

export function AuthProcess(props: IAuthProcessProps) {
  const { children } = props

  const { t } = useTranslation()
  const navigate = useNavigate()

  const isLoading = useUnit(auth.$isLoading)

  const isCompactView = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down(SEPARATE_LAYOUT_COMPACT_BREAKPOINT)
  )

  const singUpPages = useMatch('/signup*')
  const loginPages = useMatch('/login*')

  const sidebar = useMemo(() => {
    const random = getRandomInt()
    return SidebarRandomContent[random]
  }, [])

  const appBar = useMemo(() => {
    if (singUpPages) {
      return {
        label: 'signup.have-account',
        btn: 'button.login',
      }
    }
    if (loginPages) {
      return {
        label: 'login.no-account',
        btn: 'button.signup',
      }
    }
    return {
      label: '',
      btn: '',
    }
  }, [singUpPages, loginPages])

  return (
    <SeparateLayout
      LoaderProps={{ visible: isLoading }}
      Header={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: isCompactView ? '8px' : '24px',
            height: '100%',
            width: '100%',
          }}
        >
          {t(appBar.label)}

          <Button
            variant="outlined"
            type="submit"
            fullWidth={false}
            size="small"
            onClick={() => {
              navigate(singUpPages ? '/login' : '/signup')
            }}
          >
            {t(appBar.btn)}
          </Button>
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
