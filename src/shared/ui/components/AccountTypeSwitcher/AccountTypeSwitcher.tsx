import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { currentUser } from '@/entities/currentUser/model'
import { AccountType } from '@/entities/currentUser/types'

export function AccountTypeSwitcher() {
  const { t } = useTranslation()

  const accountType = useUnit(currentUser.$accountType)

  const handleChange = (event: SelectChangeEvent) => {
    const accType = event.target.value as AccountType
    currentUser.setAccountType(accType)
  }

  return (
    <FormControl sx={{ width: 180 }}>
      <InputLabel id="account-type-select-label">{t('accountType.label')}</InputLabel>
      <Select
        labelId="account-type-select-label"
        id="account-type-select"
        value={accountType}
        onChange={handleChange}
      >
        <MenuItem value={AccountType.SUPPLIER}>{t('accountType.supplier')}</MenuItem>
        <MenuItem value={AccountType.CUSTOMER}>{t('accountType.customer')}</MenuItem>
      </Select>
    </FormControl>
  )
}
