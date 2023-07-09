import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'
import pt from '../locales/pt-BR.json'
import fr from '../locales/fr.json'

const datetimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'pt-BR': {
    short: {
      year: 'numeric', month: 'numeric', day: 'numeric',
      weekday: 'short',  hour: 'numeric', minute: 'numeric',
      hour12: false
      },
    long: {
      year: 'numeric', month: 'numeric', day: 'numeric',
      weekday: 'long',  hour: 'numeric', minute: 'numeric',
      hour12: false
    }
  }
}

export default defineNuxtPlugin(({ vueApp }) => {
    const langSettings = {
      locale: 'pt-BR',
      fallbackLocale: 'en',
    }
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: langSettings.locale,
      fallbackLocale: langSettings.fallbackLocale,
      messages: {
        en,
        es,
        pt,
        fr
      },
    });

    vueApp.use(i18n)
  })