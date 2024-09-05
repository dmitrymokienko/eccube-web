import Box from '@mui/material/Box'
import { ComponentProps, ReactNode } from 'react'
import { SxProps, useTheme } from '@mui/material/styles'
import { Loader as DefaultLoader } from '../../../components/Loader'
import {
  SIDEBAR_LAYOUT_DRAWER_WIDTH,
  SIDEBAR_LAYOUT_MAX_CONTENT_WIDTH,
  SIDEBAR_LAYOUT_NAV_HEIGHT,
} from '../lib/constants'
import { Sidebar } from './components/Sidebar'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { ISidebarDrawerProps } from './components/SidebarDrawer'
import { omit } from '@/shared/libs/utils/utilities'
import { Z_INDEX } from '@/shared/libs/constants/style'
import EccubeLogo from '@/shared/assets/icons/eccube-logo-dark.svg?react'
import { ProfileTypeSwitcher } from '@/widgets/AccountTypeSwitcher/ui/ProfileTypeSwitcher'
import { AvatarMenu } from '@/widgets/AvatarMenu/ui/AvatarMenu'

export interface ISidebarLayoutProps {
  children: ReactNode
  Nav?: ReactNode
  Loader?: ReactNode
  SidebarProps?: ISidebarDrawerProps
  WrapperProps?: {
    sx?: SxProps
  }
  NavProps?: ComponentProps<typeof AppBar>
  MainProps?: {
    sx?: SxProps
  }
  LoaderProps?: {
    visible?: boolean
    sx?: SxProps
  }
}

export function SidebarLayout(props: ISidebarLayoutProps) {
  const {
    children,
    Nav = null,
    Loader = null,
    WrapperProps = {},
    NavProps = {},
    MainProps = {},
    LoaderProps = {},
    SidebarProps = {},
  } = props

  const theme = useTheme()

  const LoaderComponent = Loader || (
    <DefaultLoader visible={LoaderProps?.visible ?? false} sx={LoaderProps?.sx ?? {}} />
  )

  // TODO: implement CompactView (show/hide sidebar)
  // if (isCompactView) {
  //   return null
  // }

  // Desktop view
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        height: '100vh',
        backgroundColor: '#F6F7F8', // '#f1eeee',
        ...(WrapperProps?.sx || {}),
      }}
    >
      {/* loader */}
      {LoaderComponent}

      {/* navigation */}
      <AppBar
        component="nav"
        position="fixed"
        elevation={1}
        sx={{
          zIndex: Z_INDEX.Soaring,
          backgroundColor: theme.palette.common.white,
          width: '100%',
          ...(NavProps?.sx || {}),
        }}
        {...omit(['sx'], NavProps)}
      >
        <Toolbar sx={{ height: `${SIDEBAR_LAYOUT_NAV_HEIGHT}px` }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: `calc(${SIDEBAR_LAYOUT_DRAWER_WIDTH}px - 24px)`,
            }}
          >
            <EccubeLogo height="56px" />
          </Box>

          {Nav}

          <Box sx={{ flexGrow: 1 }} />

          <Box px={3}>
            <ProfileTypeSwitcher />
          </Box>

          <AvatarMenu />
        </Toolbar>
      </AppBar>

      {/* sidebar */}
      <Sidebar {...SidebarProps} />

      {/* main */}
      <Box
        component="main"
        sx={{
          marginTop: `${SIDEBAR_LAYOUT_NAV_HEIGHT}px`,
          marginLeft: `${SIDEBAR_LAYOUT_DRAWER_WIDTH}px`,
          paddingBottom: '24px',
          width: '100%',
          overflowY: 'auto',
          backgroundColor: '#F6F7F8', // '#f1eeee',
          ...(MainProps?.sx || {}),
        }}
      >
        <Box
          sx={{
            margin: '0 auto',
            padding: '0 24px',
            maxWidth: `${SIDEBAR_LAYOUT_MAX_CONTENT_WIDTH}px`,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
