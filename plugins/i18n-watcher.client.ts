export default defineNuxtPlugin(({ vueApp }) => {
  if (!process.client) return

  // Registry for components that use i18n
  const componentsRegistry: any[] = []

  const updateComponents = (locale: string) => {
    componentsRegistry.forEach(component => {
      if (component?.$forceUpdate) {
        try {
          component.$forceUpdate()
        } catch (err) {
          console.error('[i18n-watcher] Error updating component:', err)
        }
      }
    })
    
    // Force update the app if available
    try {
      if (vueApp?.$forceUpdate) {
        vueApp.$forceUpdate()
      }
    } catch (e) {
      console.error('[i18n-watcher] Error forcing app update:', e)
    }
  }

  // Register mixin to track components that use i18n
  vueApp.mixin({
    created() {
      const usesI18n = 
        (this.$options?.i18n) || 
        typeof this.$t === 'function' || 
        (this.$options?.name?.includes('I18n'))
      
      if (usesI18n) {
        componentsRegistry.push(this)
      }
    },
    
    beforeUnmount() {
      const index = componentsRegistry.indexOf(this)
      if (index !== -1) {
        componentsRegistry.splice(index, 1)
      }
    }
  })

  // Listen for locale change events
  document.addEventListener('i18n:localeChanged', (event: any) => {
    if (event.detail?.locale) {
      updateComponents(event.detail.locale)
    }
  })
  
  document.addEventListener('languageChanged', (event: any) => {
    if (event.detail?.locale) {
      updateComponents(event.detail.locale)
    }
  })
  
  document.addEventListener('i18n:updateRequested', (event: any) => {
    let currentLocale = null
    
    try {
      if (vueApp.config?.globalProperties?.$i18n) {
        const i18n = vueApp.config.globalProperties.$i18n
        currentLocale = i18n.global ? i18n.global.locale.value : i18n.locale
      }
    } catch (e) {
      console.error('[i18n-watcher] Error getting current locale:', e)
    }
    
    if (!currentLocale && window.localStorage) {
      currentLocale = window.localStorage.getItem('lang')
    }
    
    currentLocale = currentLocale || 'pt-BR'
    updateComponents(currentLocale)
  })
  
  // Listen for storage changes
  window.addEventListener('storage', (event) => {
    if (event.key === 'lang' && event.newValue) {
      updateComponents(event.newValue)
    }
  })
})
