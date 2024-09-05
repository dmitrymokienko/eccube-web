import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { currentUser } from '@/entities/currentUser/model'
import { ProfileType } from '@/entities/currentUser/types'
import { useNavigate } from 'react-router-dom'

export function ProfileTypeSwitcher() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const profileType = useUnit(currentUser.$profileType)

  const handleChange = (e: SelectChangeEvent) => {
    currentUser.setProfileType(e.target.value as ProfileType)
    navigate(`/dashboard/${e.target.value}/home`)
  }

  return (
    <FormControl sx={{ width: 140 }}>
      <InputLabel id="profile-type-select-label">{t('profileType.select-label')}</InputLabel>
      <Select
        labelId="profile-type-select-label"
        id="profile-type-select"
        value={profileType}
        label={t('profileType.select-label')}
        onChange={handleChange}
      >
        <MenuItem value={ProfileType.SUPPLIER}>{t('profileType.supplier')}</MenuItem>
        <MenuItem value={ProfileType.CUSTOMER}>{t('profileType.customer')}</MenuItem>
      </Select>
    </FormControl>
  )
}
