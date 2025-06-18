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

export default defineNuxtPlugin(({ vueApp }) => {
  const defaultLocale = 'pt-BR'
  // Determinar o locale a ser usado de forma segura
  let initialLocale = defaultLocale;
  if (process.client) {
    try {
      console.log('[i18n] Inicializando plugin, verificando localStorage');
      const storedLocale = localStorage.getItem('lang');
      console.log('[i18n] Valor encontrado no localStorage:', storedLocale);
      if (storedLocale) {
        initialLocale = storedLocale;
        console.log('[i18n] Usando locale do localStorage:', initialLocale);
      } else {
        console.log('[i18n] Nenhum locale encontrado no localStorage, usando padrão:', defaultLocale);
      }
    } catch (error) {
      console.error('[i18n] Erro ao acessar localStorage:', error);
    }
  }
  // Criar instância do i18n com configurações simplificadas
  console.log('[i18n] Criando instância i18n com locale inicial:', initialLocale);
  const i18n = createI18n({
    legacy: false, // Usar apenas o modo de composição do Vue 3
    globalInjection: true, // Injetar funções globalmente
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

  // Registrar o plugin no app
  vueApp.use(i18n)

  // Configurar manipuladores de eventos apenas no cliente
  if (process.client) {
    // Definir tipos válidos de locale
    type ValidLocale = 'pt-BR' | 'en' | 'es' | 'fr' | 'ja-JP' | 'ko' | 'pt' | 'ru' | 'de';
    
    // Função para validar locale
    const isValidLocale = (locale: string): locale is ValidLocale => {
      return ['pt-BR', 'en', 'es', 'fr', 'ja-JP', 'ko', 'pt-PT', 'ru', 'de'].includes(locale);
    };    // Interceptar mudanças de locale com abordagem robusta para diferentes versões do Vue I18n
    const setLocale = (newLocale: string) => {
      try {
        if (!isValidLocale(newLocale)) {
          console.warn(`Locale inválido "${newLocale}" recebido. Tentando desregionalizar o idioma se possível.`);

          // Tentar desregionalizar o idioma se possível
          // Pegue 
          newLocale = 'en';
        }

        // Tentar todas as abordagens possíveis para definir o locale
        const safeLocale = isValidLocale(newLocale) ? newLocale : 'en';
          // Atualizar o localStorage primeiro
        localStorage.setItem('lang', safeLocale);
        
        // Método 1: Vue I18n 9.x com composables
        if (i18n.global && typeof i18n.global.locale === 'object' && i18n.global.locale !== null) {
          if ('value' in i18n.global.locale) {
            i18n.global.locale.value = safeLocale;
            // Notificar componentes sobre a mudança
            emitLanguageChangeEvent(safeLocale);
            return;
          }
        }        // Método 2: Vue I18n 9.x com global diretamente (usando any para evitar erros de tipo)
        if (i18n.global && typeof i18n.global.locale !== 'undefined') {
          // Usando type assertion para evitar erro de compilação
          (i18n.global as any).locale = safeLocale;
          emitLanguageChangeEvent(safeLocale);
          return;
        }
        
        // Método 3: Fallback para versões anteriores ou acesso direto (usando any para evitar erros de tipo)
        if ((i18n as any).locale) {
          (i18n as any).locale = safeLocale;
          emitLanguageChangeEvent(safeLocale);
          return;
        }
        
        // Se chegou aqui, não conseguimos definir o locale
        console.warn('Não foi possível definir o locale via i18n. Tentando outras abordagens.');
          // Método 4: Acesso via vueApp
        if (vueApp.config.globalProperties.$i18n) {
          if (vueApp.config.globalProperties.$i18n.global) {
            vueApp.config.globalProperties.$i18n.global.locale = safeLocale;
          } else {
            vueApp.config.globalProperties.$i18n.locale = safeLocale;
          }
          emitLanguageChangeEvent(safeLocale);
        }
      } catch (error) {
        console.error('Erro ao definir locale:', error);
      }
    };    // Configurar o watch de uma forma mais segura
    try {
      if (i18n.global && i18n.global.locale && typeof i18n.global.locale === 'object') {
        // Apenas configurar o watch se locale for um objeto reativo
        watch(i18n.global.locale, (newLocale) => {
          if (isValidLocale(newLocale)) {
            localStorage.setItem('lang', newLocale);
          }
        });
      } else {
        console.warn('Não foi possível configurar watch em i18n.global.locale - não é um objeto reativo');
      }
    } catch (error) {
      console.error('Erro ao configurar watch para o locale:', error);
    }

    // Garantir que o localStorage tenha um valor inicial
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', defaultLocale);
    }

    // Sincronização entre abas
    window.addEventListener('storage', (event) => {
      if (event.key === 'lang' && event.newValue) {
        setLocale(event.newValue)
      }
    });

    // Evento customizado para mudança de idioma
    document.addEventListener('languageChanged', ((event: CustomEvent) => {
      const localeFromEvent = event.detail?.locale;
      if (localeFromEvent && typeof localeFromEvent === 'string') {
        setLocale(localeFromEvent);
      } else {
        console.warn('Recebido um locale inválido (não-string) do evento:', localeFromEvent);
      }
    }) as EventListener);

    // Função de depuração para investigar a estrutura do i18n
    const debugI18n = () => {
      try {
        console.group('Depuração do objeto i18n');
        console.log('Tipo do i18n:', typeof i18n);
        console.log('i18n tem global?', 'global' in i18n);
        if ('global' in i18n) {
          console.log('Tipo do i18n.global:', typeof i18n.global);
          console.log('i18n.global tem locale?', 'locale' in i18n.global);
          if ('locale' in i18n.global) {
            console.log('Tipo do i18n.global.locale:', typeof i18n.global.locale);
            if (typeof i18n.global.locale === 'object' && i18n.global.locale !== null) {
              console.log('i18n.global.locale tem value?', 'value' in i18n.global.locale);
              if ('value' in i18n.global.locale) {
                console.log('Valor atual do locale:', i18n.global.locale.value);
              }
            }
          }
        }
        console.log('i18n tem locale diretamente?', 'locale' in i18n);
        console.groupEnd();
      } catch (error) {
        console.error('Erro ao depurar i18n:', error);
      }
    };
    
    // Executar depuração apenas uma vez na inicialização
    setTimeout(debugI18n, 500);    // Função para emitir evento de mudança de idioma para os componentes
    const emitLanguageChangeEvent = (locale: string) => {
      // Criar um evento customizado no document para comunicação entre componentes
      document.dispatchEvent(new CustomEvent('i18n:localeChanged', { 
        detail: { locale } 
      }));
      
      // Notificar componentes via globalProperties 
      if (!vueApp.config.globalProperties.$i18nBus) {
        vueApp.config.globalProperties.$i18nBus = {
          notifyLocaleChange: (locale: string) => {
            vueApp.config.globalProperties.$forceUpdate?.();
          }
        };
      }
      
      // Notificar mudança
      vueApp.config.globalProperties.$i18nBus.notifyLocaleChange(locale);
      
      // Para Debug
      console.log('Idioma alterado para:', locale);
    };

    // Sobrescrever a função setLocale para incluir a emissão do evento
    const originalSetLocale = setLocale;
    (window as any).setLocale = (newLocale: string) => {
      originalSetLocale(newLocale);
      emitLanguageChangeEvent(newLocale);
    };
  }

  return {
    provide: {
      i18n: i18n.global
    }
  }
})