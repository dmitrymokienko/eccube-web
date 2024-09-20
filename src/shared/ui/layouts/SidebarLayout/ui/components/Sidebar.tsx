import Stack from '@mui/material/Stack'
import { ISidebarDrawerProps, SidebarDrawer } from './SidebarDrawer'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import PaymentIcon from '@mui/icons-material/Payment'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import SettingsIcon from '@mui/icons-material/Settings'
import WorkIcon from '@mui/icons-material/Work'
import EngineeringIcon from '@mui/icons-material/Engineering'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Z_INDEX } from '@/shared/libs/constants/style'
import { SIDEBAR_LAYOUT_NAV_HEIGHT } from '../../lib/constants'
import { useTranslation } from 'react-i18next'
import { currentUser } from '@/entities/currentUser/model'
import { ProfileType } from '@/entities/currentUser/types'

export const SIDEBAR_LAYOUT_SIDEBAR_LIST_ID = 'eccube-sidebar-menu-list-items'

const getMenuItems = (profileType: ProfileType = ProfileType.CUSTOMER) => {
  if (profileType === ProfileType.SUPPLIER) {
    return [
      {
        label: 'sidebar.home',
        icon: HomeIcon,
        path: `/dashboard/supplier/home`,
      },
      {
        label: 'sidebar.job-pool',
        icon: EngineeringIcon,
        path: `/dashboard/supplier/job-pool`,
      },
      {
        label: 'sidebar.participation',
        icon: WorkIcon,
        path: `/dashboard/supplier/participation`,
      },
      {
        label: 'sidebar.settings',
        icon: SettingsIcon,
        path: `/dashboard/supplier/settings`,
      },
    ]
  }
  return [
    {
      label: 'sidebar.home',
      icon: HomeIcon,
      path: `/dashboard/customer/home`,
    },
    {
      label: 'sidebar.tenders',
      icon: HistoryEduIcon,
      path: `/dashboard/customer/tenders`,
    },
    {
      label: 'sidebar.payments',
      icon: PaymentIcon,
      path: `/dashboard/customer/payments`,
    },
    {
      label: 'sidebar.settings',
      icon: SettingsIcon,
      path: `/dashboard/customer/settings`,
    },
  ]
}

const setSelectedIndex = createEvent<number>()
const $selectedIndex = createStore(0).on(setSelectedIndex, (_, v) => v)

export function Sidebar(props: ISidebarDrawerProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const profileType = useUnit(currentUser.$profileType)
  const selectedIndex = useUnit($selectedIndex)

  const MENU_ITEMS = getMenuItems(profileType)

  useEffect(() => {
    const index = MENU_ITEMS.findIndex((v) => location.pathname.startsWith(v.path))
    setSelectedIndex(index > -1 ? index : 0)
  }, [])

  return (
    <SidebarDrawer
      open
      hideBackdrop
      variant="persistent"
      sx={{ zIndex: Z_INDEX.SlightlySoaring }}
      {...props}
    >
      <Stack spacing={8} pt={`calc(${SIDEBAR_LAYOUT_NAV_HEIGHT}px + 80px)`} pb={3} px={1}>
        <List id={SIDEBAR_LAYOUT_SIDEBAR_LIST_ID}>
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
                  <ListItemText primary={t(v.label)} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Stack>
    </SidebarDrawer>
  )
}
