import { MouseEvent, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { Nullable } from '@/shared/types/utilities'
import { useTranslation } from 'react-i18next'
import { useUnit } from 'effector-react'
import { currentUser } from '@/entities/currentUser/model'
import { logoutUserApi } from '@/entities/auth/api'
import { auth } from '@/entities/auth/model'
import { useNavigate } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LogoutIcon from '@mui/icons-material/Logout'
import NiceModal from '@ebay/nice-modal-react'
import { ConfirmationDialog } from '../Dialogs/ConfirmationDialog'
import Divider from '@mui/material/Divider'

export function AvatarMenu() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const user = useUnit(currentUser.$info)

  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAccount = () => {
    navigate('/settings/my-account')
    handleClose()
  }

  const handleLogout = async () => {
    NiceModal.show(ConfirmationDialog, {
      title: t('modal.logout.title'),
      content: t('modal.logout.content'),
      onConfirm: async () => {
        await logoutUserApi()
        auth.setRefreshToken(null)
        navigate('/login')
      },
    })
    handleClose()
  }

  const initials = `${user?.firstName?.[0]?.toUpperCase()}${user?.lastName?.[0]?.toUpperCase()}`

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        {user?.avatarUrl ? (
          <Avatar alt={initials} src={user.avatarUrl} />
        ) : (
          <Avatar sx={(theme) => ({ bgcolor: theme.palette.custom.blue[1] })}>{initials}</Avatar>
        )}
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {user?.firstName && user?.lastName && (
          <MenuItem disabled>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            {`${user.firstName} ${user.lastName}`}
          </MenuItem>
        )}

        {user?.email && (
          <MenuItem disabled>
            <ListItemIcon>
              <EmailIcon fontSize="small" />
            </ListItemIcon>
            {user.email}
          </MenuItem>
        )}

        <Divider />

        <MenuItem onClick={handleAccount}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          {t('settings.label.my-account')}
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {t('button.logout')}
        </MenuItem>
      </Menu>
    </>
  )
}
