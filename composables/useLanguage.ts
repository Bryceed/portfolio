/**
 * Composable for handling language/locale management
 */
export const useLanguage = () => {
  const validLocales = ['pt-BR', 'en', 'es', 'fr', 'ja-JP', 'ko', 'pt', 'ru', 'de'] as const
  type ValidLocale = typeof validLocales[number]

  interface Language {
    code: string
    region: string
    name: string
  }

  const availableLanguages: Language[] = [
    { code: 'pt', region: 'BR', name: 'Português (Brasil)' },
    { code: 'en', region: 'US', name: 'English' },
    { code: 'es', region: 'ES', name: 'Español' },
    { code: 'fr', region: 'FR', name: 'Français' },
    { code: 'de', region: 'DE', name: 'Deutsch' },
    { code: 'ru', region: 'RU', name: 'Русский' },
    { code: 'ja', region: 'JP', name: '日本語' },
    { code: 'ko', region: 'KR', name: '한국어' }
  ]

  const isValidLocale = (locale: string): locale is ValidLocale => {
    return validLocales.includes(locale as ValidLocale)
  }

  const getLocaleFromLanguage = (lang: Language): string => {
    return lang.region && lang.region !== lang.code 
      ? `${lang.code}-${lang.region}` 
      : lang.code
  }

  const getLanguageFromLocale = (locale: string): Language | undefined => {
    return availableLanguages.find(l => {
      const langLocale = getLocaleFromLanguage(l)
      return langLocale.toLowerCase() === locale.toLowerCase()
    })
  }

  const getFlagClass = (lang: Language): string => {
    if (!lang) return 'flag flag-en_US'
    const code = (lang.code || 'en').toLowerCase()
    const region = lang.region ? lang.region.toUpperCase() : 'US'
    return `flag flag-${code}_${region}`
  }

  const getLanguageKey = (lang: Language): string => {
    return `${lang.code}_${lang.region?.toUpperCase() || ''}`
  }

  return {
    validLocales,
    availableLanguages,
    isValidLocale,
    getLocaleFromLanguage,
    getLanguageFromLocale,
    getFlagClass,
    getLanguageKey
  }
}
