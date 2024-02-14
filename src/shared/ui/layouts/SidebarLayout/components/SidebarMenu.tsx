import Stack from '@mui/material/Stack'
import { IMenuDrawerProps, MenuDrawer } from './MenuDrawer'
import EccubeLogo from '../../../../assets/icons/eccube-logo-dark.svg?react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import PaymentIcon from '@mui/icons-material/Payment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

const MENU_ITEMS = [
  {
    label: 'Home',
    icon: HomeIcon,
    path: '/home',
  },
  {
    label: 'Payments',
    icon: PaymentIcon,
    path: '/payments',
  },
]

const setSelectedIndex = createEvent<number>()
const $selectedIndex = createStore(0).on(setSelectedIndex, (_, v) => v)

export interface ISidebarMenuProps extends IMenuDrawerProps {}

export function SidebarMenu(props: ISidebarMenuProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedIndex = useUnit($selectedIndex)

  useEffect(() => {
    const index = MENU_ITEMS.findIndex((v) => location.pathname.startsWith(v.path))
    setSelectedIndex(index > -1 ? index : 0)
  }, [])

  return (
    <MenuDrawer open hideBackdrop variant="persistent" {...props}>
      <Stack spacing={8} pt={1} pb={3} px={1}>
        {/* TODO: link */}
        <EccubeLogo height="56px" />

        <List>
          {MENU_ITEMS.map((v, i) => {
            const Icon = v.icon
            return (
              <ListItem key={v.path} disablePadding>
                <ListItemButton
                  selected={selectedIndex === i}
                  onClick={() => {
                    setSelectedIndex(i)
                    navigate(v.path)
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={v.label} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Stack>
    </MenuDrawer>
  )
}
