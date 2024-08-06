import Stack from '@mui/material/Stack'
import { ISidebarDrawerProps, SidebarDrawer } from './SidebarDrawer'
import EccubeLogo from '../../../../assets/icons/eccube-logo-dark.svg?react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import PaymentIcon from '@mui/icons-material/Payment'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import SettingsIcon from '@mui/icons-material/Settings'
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
    path: '/dashboard/home',
  },
  {
    label: 'Tenders',
    icon: HistoryEduIcon,
    path: '/dashboard/tenders',
  },
  {
    label: 'Payments',
    icon: PaymentIcon,
    path: '/dashboard/payments',
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    path: '/dashboard/settings',
  },
]

const setSelectedIndex = createEvent<number>()
const $selectedIndex = createStore(0).on(setSelectedIndex, (_, v) => v)

export function Sidebar(props: ISidebarDrawerProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedIndex = useUnit($selectedIndex)

  useEffect(() => {
    const index = MENU_ITEMS.findIndex((v) => location.pathname.startsWith(v.path))
    setSelectedIndex(index > -1 ? index : 0)
  }, [])

  return (
    <SidebarDrawer open hideBackdrop variant="persistent" {...props}>
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
    </SidebarDrawer>
  )
}
