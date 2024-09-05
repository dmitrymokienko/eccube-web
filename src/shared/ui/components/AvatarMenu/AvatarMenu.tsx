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
import SettingsIcon from '@mui/icons-material/Settings'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LogoutIcon from '@mui/icons-material/Logout'
import DoneIcon from '@mui/icons-material/Done'
import NiceModal from '@ebay/nice-modal-react'
import { ConfirmationDialog } from '../Dialogs/ConfirmationDialog'
import Divider from '@mui/material/Divider'
import { NestedMenuItem } from '../NestedMenuItem/NestedMenuItem'
import { locale } from '@/entities/locale/model'
import { Locale } from '@/entities/locale/types'

export function AvatarMenu() {
  const { t, i18n } = useTranslation()

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null)

  const user = useUnit(currentUser.$info)
  const language = useUnit(locale.$language)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelectLanguage = (lang: Locale) => {
    locale.setLanguage(lang)
    i18n.changeLanguage(lang)
    handleClose()
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
          <Avatar alt={initials} sx={(theme) => ({ bgcolor: theme.palette.custom.blue[1] })}>
            <PersonIcon fontSize="small" />
          </Avatar>
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

        <NestedMenuItem
          parentMenuOpen={!!anchorEl}
          rightAnchored={false}
          label={t('common.language')}
        >
          <MenuItem
            onClick={() => {
              handleSelectLanguage(Locale.DE)
            }}
          >
            <ListItemIcon>
              <DoneIcon
                fontSize="small"
                sx={{ visibility: language === Locale.DE ? 'visible' : 'hidden' }}
              />
            </ListItemIcon>
            {t('common.Germany')}
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleSelectLanguage(Locale.EN)
            }}
          >
            <ListItemIcon>
              <DoneIcon
                fontSize="small"
                sx={{ visibility: language === Locale.EN ? 'visible' : 'hidden' }}
              />
            </ListItemIcon>
            {t('common.English')}
          </MenuItem>
        </NestedMenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={handleAccount}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
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
