import { Locale } from "@/entities/locale/types"
import { t } from "i18next"


export function mapCountryCodeToName(code?: Locale): string {
  switch (code) {
    case Locale.DE:
        return t('common.Germany')
    case Locale.EN:
        return t('common.England')
    default:
        return ''
  }
}


export function mapCountryNameToCode(name?: string): Locale {
    switch (name) {
        case t('common.Germany'):
            return Locale.DE
        case t('common.England'):
            return Locale.EN
        default:
            return Locale.DE
    }
}
    