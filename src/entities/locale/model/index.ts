import { createEvent, createStore } from 'effector'
import persist from 'effector-localstorage'
import { Locale } from '../types'

const setLanguage = createEvent<Locale>()
const $language = createStore<Locale>(Locale.DE).on(setLanguage, (_, lang) => lang)
persist({ store: $language, key: 'language' })

export const locale = {
  setLanguage,
  $language,
}
