import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { locale } from '@/entities/locale/model'
import { Locale } from '@/entities/locale/types'

// TODO: customize component
export function LangSwitcher() {
  const { t, i18n } = useTranslation()

  const language = useUnit(locale.$language)

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language)
    }
  }, [i18n, language])

  const handleChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as Locale
    locale.setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <FormControl sx={{ width: 92 }}>
      <InputLabel id="lang-select-label">{t('common.language')}</InputLabel>
      <Select
        labelId="lang-select-label"
        id="lang-select"
        value={language}
        label={t('common.language')}
        onChange={handleChange}
      >
        <MenuItem value={Locale.DE}>DE</MenuItem> {/* Deutsch */}
        <MenuItem value={Locale.EN}>EN</MenuItem>
      </Select>
    </FormControl>
  )
}
