import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import { SxProps, Theme, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LangSwitcher } from '../../components/LangSwitcher/LangSwitcher'
import { Loader as DefaultLoader } from '../../components/Loader'
import {
  SIDEBAR_LAYOUT_COMPACT_BREAKPOINT,
  SIDEBAR_LAYOUT_DRAWER_WIDTH,
  SIDEBAR_LAYOUT_MAX_CONTENT_WIDTH,
  SIDEBAR_LAYOUT_NAV_HEIGHT,
} from './lib/constants'
import { SidebarMenu } from './components/SidebarMenu'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { LogoutButton } from '../../components/Button/LogoutButton'

export interface ISidebarLayoutProps {
  children: ReactNode
  Header?: ReactNode
  Loader?: ReactNode
  SideBarProps?: {
    sx?: SxProps
  }
  WrapperProps?: {
    sx?: SxProps
  }
  HeaderProps?: {
    sx?: SxProps
  }
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
    Header = null,
    Loader = null,
    WrapperProps = {},
    HeaderProps = {},
    MainProps = {},
    LoaderProps = {},
    showLangSwitcher = true,
  } = props

  const theme = useTheme()

  // special breakpoint for current layout
  const isCompactView = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down(SIDEBAR_LAYOUT_COMPACT_BREAKPOINT)
  )

  const LoaderComponent = Loader || (
    <DefaultLoader visible={LoaderProps?.visible ?? false} sx={LoaderProps?.sx ?? {}} />
  )

  // TODO: add sidebar
  if (isCompactView) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto',
          gridTemplateRows: '72px auto',
          gridTemplateAreas: `
            "header"
            "main"
            `,
          width: '100%',
          height: '100dvh', // TODO: check it works correctly
          backgroundColor: '#F6F7F8', // '#f1eeee',
          ...(WrapperProps?.sx || {}),
        }}
      >
        {/* loader */}
        {LoaderComponent}
        {/* header */}
        <Box
          component="header"
          sx={{
            gridArea: 'header',
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 1,
            width: '100%',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            ...(HeaderProps?.sx || {}),
          }}
        >
          {Header}

          {showLangSwitcher && (
            <Box pl={3}>
              <LangSwitcher />
            </Box>
          )}
        </Box>
        {/* main */}
        <Box sx={{ gridArea: 'main' }}>
          <Box
            component="main"
            sx={{
              zIndex: 1,
              margin: '0 auto',
              marginTop: '24px',
              padding: '0 24px',
              maxWidth: `${SIDEBAR_LAYOUT_MAX_CONTENT_WIDTH}px`,
              ...(MainProps?.sx || {}),
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    )
  }

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

      {/* header */}
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.common.white,
          width: `calc(100% - ${SIDEBAR_LAYOUT_DRAWER_WIDTH}px)`,
          ml: `${SIDEBAR_LAYOUT_DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar sx={{ height: `${SIDEBAR_LAYOUT_NAV_HEIGHT}px` }}>
          {Header}
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
      <SidebarMenu />

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
            padding: '0 32px',
            maxWidth: `${SIDEBAR_LAYOUT_MAX_CONTENT_WIDTH}px`,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
