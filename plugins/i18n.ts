import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import en from '../locales/en.json'
import es from '../locales/es.json'
import pt_BR from '../locales/pt-BR.json'
import fr from '../locales/fr.json'
import ja_JP from '../locales/ja-JP.json'
import ko from '../locales/ko.json'
import pt from '../locales/pt.json'
import ru from '../locales/ru.json'
import de from '../locales/de.json'

const validLocales = ['pt-BR', 'en', 'es', 'fr', 'ja-JP', 'ko', 'pt', 'ru', 'de'] as const
type ValidLocale = typeof validLocales[number]

const isValidLocale = (locale: string): locale is ValidLocale => {
  return validLocales.includes(locale as ValidLocale)
}

export default defineNuxtPlugin(({ vueApp }) => {
  const defaultLocale: ValidLocale = 'pt-BR'
  let initialLocale: ValidLocale = defaultLocale
  
  // Get initial locale from localStorage (client-side only)
  if (process.client) {
    try {
      const storedLocale = localStorage.getItem('lang')
      if (storedLocale && isValidLocale(storedLocale)) {
        initialLocale = storedLocale
      } else if (storedLocale) {
        localStorage.setItem('lang', defaultLocale)
      } else {
        localStorage.setItem('lang', defaultLocale)
      }
    } catch (error) {
      console.error('[i18n] Error accessing localStorage:', error)
    }
  }

  // Create i18n instance
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: initialLocale,
    fallbackLocale: 'en',
    messages: {
      'en': en,
      'es': es,
      'pt-BR': pt_BR,
      'fr': fr,
      'ja-JP': ja_JP,
      'ko': ko,
      'pt': pt,
      'ru': ru,
      'de': de
    }
  })

  vueApp.use(i18n)
  
  // Configure client-side functionality
  if (process.client) {
    const emitLanguageChangeEvent = (locale: string) => {
      document.dispatchEvent(new CustomEvent('i18n:localeChanged', { 
        detail: { locale } 
      }))
      
      // Notify components
      try {
        if (!vueApp.config.globalProperties.$i18nBus) {
          vueApp.config.globalProperties.$i18nBus = {
            notifyLocaleChange: (loc: string) => {
              setTimeout(() => {
                vueApp.config.globalProperties.$forceUpdate?.()
              }, 0)
            }
          }
        }
        vueApp.config.globalProperties.$i18nBus.notifyLocaleChange(locale)
      } catch (err) {
        console.error('[i18n] Error notifying components:', err)
      }
    }
    
    const setLocale = (newLocale: string) => {
      try {
        // Validate locale
        if (!isValidLocale(newLocale)) {
          const baseLang = newLocale.split('-')[0]
          if (validLocales.includes(baseLang as ValidLocale)) {
            newLocale = baseLang
          } else {
            newLocale = 'en'
          }
        }
        
        const safeLocale = isValidLocale(newLocale) ? newLocale : 'en'
        
        // Update localStorage
        localStorage.setItem('lang', safeLocale)
        
        // Update i18n locale
        let localeSet = false
        
        // Method 1: using i18n.global.locale.value (Vue I18n 9)
        try {
          if (i18n.global && typeof i18n.global.locale === 'object' && i18n.global.locale !== null && 'value' in i18n.global.locale) {
            i18n.global.locale.value = safeLocale
            localeSet = true
          }
        } catch (err) {
          console.error('[i18n] Error setting locale via i18n.global.locale.value:', err)
        }
        
        // Method 2: using vueApp.config.globalProperties.$i18n
        if (!localeSet) {
          try {
            const i18nInstance = vueApp.config.globalProperties.$i18n
            if (i18nInstance?.global && typeof i18nInstance.global.locale === 'object' && 'value' in i18nInstance.global.locale) {
              i18nInstance.global.locale.value = safeLocale
              localeSet = true
            }
          } catch (err) {
            console.error('[i18n] Error setting locale via globalProperties.$i18n:', err)
          }
        }
        
        if (localeSet) {
          emitLanguageChangeEvent(safeLocale)
        } else {
          console.error('[i18n] Failed to set locale')
        }
      } catch (error) {
        console.error('[i18n] Critical error setting locale:', error)
      }
    }

    // Listen for custom language change event
    document.addEventListener('languageChanged', ((event: CustomEvent) => {
      if (event.detail?.locale && typeof event.detail.locale === 'string') {
        setLocale(event.detail.locale)
      }
    }) as EventListener)
    
    // Listen for storage events (cross-tab synchronization)
    window.addEventListener('storage', (event) => {
      if (event.key === 'lang' && event.newValue) {
        setLocale(event.newValue)
      }
    })
    
    // Watch for locale changes and sync with localStorage
    try {
      if (i18n.global?.locale) {
        watch(() => i18n.global.locale.value, (newVal) => {
          localStorage.setItem('lang', newVal)
        })
      }
    } catch (err) {
      console.error('[i18n] Error setting up locale watch:', err)
    }
  }
  
  return {
    provide: {
      i18n: i18n.global
    }
  }
})
