import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import EccubeLogo from '@/shared/assets/icons/eccube-logo-white.svg?react'
import { SxProps, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Loader as DefaultLoader } from '@/shared/ui/components/Loader'
import { Z_INDEX } from '@/shared/libs/constants/style'
import { LangSwitcher } from '@/widgets/LangSwitcher/ui/LangSwitcher'

export interface ISeparateLayoutProps {
  children: ReactNode
  Header?: ReactNode
  Sidebar?: ReactNode
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

export const SEPARATE_LAYOUT_SIDEBAR_WIDTH = 320
export const SEPARATE_LAYOUT_HEADER_HEIGHT = 72
export const SEPARATE_LAYOUT_CONTENT_WIDTH = 500
export const SEPARATE_LAYOUT_COMPACT_BREAKPOINT = 1280

export function SeparateLayout(props: ISeparateLayoutProps) {
  const {
    children,
    Header = null,
    Sidebar = null,
    Loader = null,
    WrapperProps = {},
    HeaderProps = {},
    SideBarProps = {},
    MainProps = {},
    LoaderProps = {},
    showLangSwitcher = true,
  } = props

  // special breakpoint for current layout
  const isCompactView = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down(SEPARATE_LAYOUT_COMPACT_BREAKPOINT)
  )

  const LoaderComponent = Loader || (
    <DefaultLoader visible={LoaderProps?.visible ?? false} sx={LoaderProps?.sx ?? {}} />
  )

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
          overflowY: 'auto',
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
            zIndex: Z_INDEX.Soaring,
            width: '100%',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F6F7F8', // '#f1eeee',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
              zIndex: Z_INDEX.SlightlySoaring,
              margin: '0 auto',
              marginTop: '24px',
              padding: '0 24px',
              maxWidth: `${SEPARATE_LAYOUT_CONTENT_WIDTH}px`,
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
        display: 'grid',
        gridTemplateColumns: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px auto`,
        gridTemplateRows: '72px auto',
        gridTemplateAreas: `
        "sidebar header"
        "sidebar main"
        `,
        width: '100%',
        height: '100vh',
        backgroundColor: '#F6F7F8', // '#f1eeee',
        position: 'relative',
        overflowY: 'auto',
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
          zIndex: Z_INDEX.Soaring,
          width: '100%',
          padding: '8px 40px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F6F7F8', // '#f1eeee',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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

      {/* sidebar */}

      <Box
        component="aside"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
          gridArea: 'sidebar',
          padding: '32px',
          ...(SideBarProps?.sx || {}),
        }}
      >
        <Box sx={{ position: 'relative', zIndex: Z_INDEX.SlightlySoaring }}>
          <EccubeLogo />
          {Sidebar}
        </Box>
      </Box>

      {/* main */}

      <Box sx={{ gridArea: 'main' }}>
        <Box
          component="main"
          sx={{
            zIndex: Z_INDEX.SlightlySoaring,
            margin: '0 auto',
            marginTop: '40px',
            paddingRight: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
            boxSizing: 'content-box',
            maxWidth: `${SEPARATE_LAYOUT_CONTENT_WIDTH}px`,
            ...(MainProps?.sx || {}),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
