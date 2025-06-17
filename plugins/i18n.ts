import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'
import pt_BR from '../locales/pt-BR.json'
import fr from '../locales/fr.json'
import ja_JP from '../locales/ja-JP.json'
import ko from '../locales/ko.json'
import pt_PT from '../locales/pt-PT.json'
import ru from '../locales/ru.json'
import de from '../locales/de.json'

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
  },
  'ko-KR': {
    short: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const
    },
    long: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const,
      weekday: 'short' as const, hour: 'numeric' as const, minute: 'numeric' as const
    }
  },
  'pt-PT': {
    short: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const
    },
    long: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const,
      weekday: 'short' as const, hour: 'numeric' as const, minute: 'numeric' as const
    }
  },
  'ru': {
    short: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const
    },
    long: {
      year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const,
      weekday: 'short' as const, hour: 'numeric' as const, minute: 'numeric' as const
    }
  },
  'de': {
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
    
    // Use o modo Composition API (importante para compatibilidade)
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: langSettings.locale,
      fallbackLocale: langSettings.fallbackLocale,      messages: {
        'en': en,
        'es': es,
        'pt-BR': pt_BR,
        'fr': fr,
        'ja-JP': ja_JP,
        'ko': ko,
        'pt-PT': pt_PT,
        'ru': ru,
        'de': de
      },
      datetimeFormats,
      allowComposition: true // permite uso do useI18n() na Composition API
    });

    vueApp.use(i18n)
      // Para compatibilidade com SSR
    if (process.client) {
      const savedLocale = localStorage.getItem('lang');
      if (savedLocale) {
        // Verificar se o locale é válido e fazer uma conversão segura do tipo
        const validLocales = ['en', 'es', 'pt-BR', 'fr', 'ja-JP', 'ko', 'pt-PT', 'ru', 'de'];
        if (validLocales.includes(savedLocale)) {
          i18n.global.locale.value = savedLocale as any; // Type assertion necessária
        }
      }
    }
    
    return {
      provide: {
        i18n: i18n.global
      }
    }
  })