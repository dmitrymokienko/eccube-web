import Box from '@mui/material/Box'
import { ComponentProps, ReactNode } from 'react'
import { SxProps, useTheme } from '@mui/material/styles'
import { LangSwitcher } from '../../components/LangSwitcher/LangSwitcher'
import { Loader as DefaultLoader } from '../../components/Loader'
import {
  SIDEBAR_LAYOUT_DRAWER_WIDTH,
  SIDEBAR_LAYOUT_MAX_CONTENT_WIDTH,
  SIDEBAR_LAYOUT_NAV_HEIGHT,
} from './lib/constants'
import { Sidebar } from './components/Sidebar'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { LogoutButton } from '../../components/Button/LogoutButton'
import { omit } from 'ramda'
import { ISidebarDrawerProps } from './components/SidebarDrawer'

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
  showLangSwitcher?: boolean
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
    showLangSwitcher = true,
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
        elevation={0}
        sx={{
          backgroundColor: theme.palette.common.white,
          width: `calc(100% - ${SIDEBAR_LAYOUT_DRAWER_WIDTH}px)`,
          ml: `${SIDEBAR_LAYOUT_DRAWER_WIDTH}px`,
          ...(NavProps?.sx || {}),
        }}
        {...omit(['sx'], NavProps)}
      >
        <Toolbar sx={{ height: `${SIDEBAR_LAYOUT_NAV_HEIGHT}px` }}>
          {Nav}
          <Box sx={{ flexGrow: 1 }} />
          {showLangSwitcher && (
            <Box px={3}>
              <LangSwitcher />
            </Box>
          )}
          <LogoutButton />
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
