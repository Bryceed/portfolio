import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'
import pt from '../locales/pt-BR.json'
import fr from '../locales/fr.json'
import ja from '../locales/ja-JP.json'
import ko from '../locales/ko.json'

const datetimeFormats = {
  'en-US': {
    short: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const
    },
    long: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const,
      weekday: 'short' as const, hour: 'numeric' as const, minute: 'numeric' as const
    }
  },
  'pt-BR': {
    short: {
      year: 'numeric' as const, month: 'numeric' as const, day: 'numeric' as const,
      weekday: 'short' as const, hour: 'numeric' as const, minute: 'numeric' as const,
      hour12: false
      },
    long: {
      year: 'numeric' as const, month: 'numeric' as const, day: 'numeric' as const,
      weekday: 'long' as const, hour: 'numeric' as const, minute: 'numeric' as const,
      hour12: false
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const
    },
    long: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const,
      weekday: 'short' as const, hour: 'numeric' as const, minute: 'numeric' as const
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
        fr,
        ja,
        ko,
      },
      datetimeFormats
    });

    vueApp.use(i18n)
  })