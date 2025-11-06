export default defineNuxtPlugin(({ vueApp }) => {
  if (!process.client) return

  // Listen for locale change events and update i18n directly
  document.addEventListener('i18n:localeChanged', (event: any) => {
    if (event.detail?.locale) {
      try {
        const i18n = vueApp.config?.globalProperties?.$i18n
        if (i18n?.global) {
          i18n.global.locale.value = event.detail.locale
        }
      } catch (err) {
        console.error('[i18n-watcher] Error setting locale:', err)
      }
    }
  })
  
  document.addEventListener('languageChanged', (event: any) => {
    if (event.detail?.locale) {
      try {
        const i18n = vueApp.config?.globalProperties?.$i18n
        if (i18n?.global) {
          i18n.global.locale.value = event.detail.locale
        }
      } catch (err) {
        console.error('[i18n-watcher] Error setting locale:', err)
      }
    }
  })
  
  // Listen for storage changes (cross-tab synchronization)
  window.addEventListener('storage', (event) => {
    if (event.key === 'lang' && event.newValue) {
      try {
        const i18n = vueApp.config?.globalProperties?.$i18n
        if (i18n?.global) {
          i18n.global.locale.value = event.newValue
        }
      } catch (err) {
        console.error('[i18n-watcher] Error setting locale from storage:', err)
      }
    }
  })
})
