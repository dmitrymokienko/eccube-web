import { Z_INDEX } from '@/shared/libs/constants/style'
import { SIDEBAR_LAYOUT_NAV_HEIGHT } from '@/shared/ui/layouts/SidebarLayout/lib/constants'
import Stack from '@mui/material/Stack'
import { ReactNode } from 'react'

export interface ITenderNavBarProps {
  children: ReactNode
}

export function TenderNavBar(props: Readonly<ITenderNavBarProps>) {
  const { children } = props

  return (
    <Stack
      component="nav"
      direction="row"
      sx={(theme) => ({
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        height: SIDEBAR_LAYOUT_NAV_HEIGHT,
        zIndex: Z_INDEX.SlightlySoaring,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      {children}
    </Stack>
  )
}
