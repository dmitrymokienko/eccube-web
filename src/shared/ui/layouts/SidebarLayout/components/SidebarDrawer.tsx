import { useEffect } from 'react'
import { SIDEBAR_LAYOUT_DRAWER_WIDTH } from '../lib/constants'
import { omit } from 'ramda'
import { Loader } from '@/shared/ui/components/Loader'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'

const enum Anchor {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

const noop = () => {
  /* noop */
}

export interface ISidebarDrawerProps extends DrawerProps {
  fullScreen?: boolean
  maxWidth?: string
  onClose?: () => void
  isLoading?: boolean
  setRef?: (node: HTMLDivElement) => void
}

export function SidebarDrawer(props: ISidebarDrawerProps) {
  const {
    children,
    setRef,
    isLoading = false,
    open = false,
    fullScreen = false,
    onClose = noop,
    anchor = Anchor.Left,
    PaperProps = {},
    maxWidth = SIDEBAR_LAYOUT_DRAWER_WIDTH,
    ...rest
  } = props

  const theme = useTheme()

  useEffect(() => {
    if (!open) {
      onClose?.()
    }
  }, [open])

  const content = isLoading ? null : children

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        ref: setRef ? (node: HTMLDivElement) => setRef(node) : undefined,
        sx: {
          width: '100%',
          maxWidth: fullScreen ? 'none' : maxWidth,
          borderRadius: 0,
          backgroundColor: theme.palette.common.white,
          border: 'none',
          ...(PaperProps?.sx ?? {}),
        },
        ...omit(['sx'], PaperProps),
      }}
      {...rest}
    >
      <Loader visible={isLoading} />

      {content}
    </Drawer>
  )
}
