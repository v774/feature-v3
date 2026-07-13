import { useLocation } from 'react-router-dom'
import { localeFromPath, translations, type Locale } from './index'

export function useTranslation() {
  const { pathname } = useLocation()
  const locale = localeFromPath(pathname)
  return { locale, t: translations[locale] }
}

export type { Locale }