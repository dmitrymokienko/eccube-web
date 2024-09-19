import { locale } from '@/entities/locale/model'
import { useUnit } from 'effector-react'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function LanguageProvider(props: { children: ReactNode }) {
  const { children } = props

  const { i18n } = useTranslation()

  const language = useUnit(locale.$language)

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language)
    }
  }, [i18n, language])

  return <>{children}</>
}
