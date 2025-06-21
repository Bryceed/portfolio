import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import en from '../locales/en.json'
import es from '../locales/es.json'
import pt_BR from '../locales/pt-BR.json'
import fr from '../locales/fr.json'
import ja_JP from '../locales/ja-JP.json'
import ko from '../locales/ko.json'
import pt from '../locales/pt.json' // Português de Portugal
import ru from '../locales/ru.json'
import de from '../locales/de.json'

export default defineNuxtPlugin(({ vueApp }) => {
  console.log('[i18n DEBUG] Inicializando plugin i18n');
  
  // Definir locales válidos
  const validLocales = ['pt-BR', 'en', 'es', 'fr', 'ja-JP', 'ko', 'pt', 'ru', 'de'];
  type ValidLocale = 'pt-BR' | 'en' | 'es' | 'fr' | 'ja-JP' | 'ko' | 'pt' | 'ru' | 'de';
  
  // Função para validar locale
  const isValidLocale = (locale: string): locale is ValidLocale => {
    return validLocales.includes(locale);
  };
  
  // Determinar o locale inicial
  const defaultLocale = 'pt-BR';
  let initialLocale = defaultLocale;
  
  if (process.client) {
    try {
      console.log('[i18n DEBUG] Verificando localStorage para locale inicial');
      const storedLocale = localStorage.getItem('lang');
      console.log('[i18n DEBUG] Locale no localStorage:', storedLocale);
      
      if (storedLocale && isValidLocale(storedLocale)) {
        initialLocale = storedLocale;
        console.log('[i18n DEBUG] Usando locale do localStorage:', initialLocale);
      } else if (storedLocale) {
        console.warn('[i18n DEBUG] Locale no localStorage não é válido:', storedLocale);
        initialLocale = defaultLocale;
        localStorage.setItem('lang', defaultLocale);
        console.log('[i18n DEBUG] Redefinido para o locale padrão:', defaultLocale);
      } else {
        console.log('[i18n DEBUG] Nenhum locale no localStorage, usando padrão:', defaultLocale);
        localStorage.setItem('lang', defaultLocale);
      }
    } catch (error) {
      console.error('[i18n DEBUG] Erro ao acessar localStorage:', error);
    }
  }

  // Criar instância de i18n
  console.log('[i18n DEBUG] Criando i18n com locale inicial:', initialLocale);
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
  });

  // Registrar plugin no app Vue
  console.log('[i18n DEBUG] Registrando plugin i18n na aplicação Vue');
  vueApp.use(i18n);
  
  // Verificar se o i18n foi registrado corretamente
  if (vueApp.config.globalProperties.$i18n) {
    const currentLocale = vueApp.config.globalProperties.$i18n.locale || 
                          vueApp.config.globalProperties.$i18n.global?.locale?.value;
    console.log('[i18n DEBUG] Plugin registrado com sucesso, locale atual:', currentLocale);
  } else {
    console.error('[i18n DEBUG] ERRO: Plugin não registrado corretamente em $i18n');
  }
  
  // Configurar funcionalidades client-side
  if (process.client) {
    console.log('[i18n DEBUG] Configurando funcionalidades client-side');
    
    // Função para emitir eventos de mudança de idioma
    const emitLanguageChangeEvent = (locale: string) => {
      console.log('[i18n DEBUG] Emitindo evento de mudança de idioma para:', locale);
      
      // Disparar evento pelo document
      document.dispatchEvent(new CustomEvent('i18n:localeChanged', { 
        detail: { locale } 
      }));
      
      // Tentar notificar via vueApp (para componentes que escutam eventos)
      try {
        if (!vueApp.config.globalProperties.$i18nBus) {
          vueApp.config.globalProperties.$i18nBus = {
            notifyLocaleChange: (loc: string) => {
              console.log('[i18n DEBUG] Notificando componentes sobre mudança para:', loc);
              setTimeout(() => {
                vueApp.config.globalProperties.$forceUpdate?.();
              }, 0);
            }
          };
        }
        vueApp.config.globalProperties.$i18nBus.notifyLocaleChange(locale);
      } catch (err) {
        console.error('[i18n DEBUG] Erro ao notificar componentes:', err);
      }
    };
    
    // Função para definir o locale
    const setLocale = (newLocale: string) => {
      try {
        console.log('[i18n DEBUG] Tentando definir locale para:', newLocale);
        
        // Validar o locale recebido
        if (!isValidLocale(newLocale)) {
          console.warn(`[i18n DEBUG] Locale inválido "${newLocale}", tentando ajustar...`);
          
          // Tentativa 1: Remover região se houver
          const baseLang = newLocale.split('-')[0];
          if (validLocales.includes(baseLang)) {
            newLocale = baseLang;
            console.log('[i18n DEBUG] Usando idioma base:', newLocale);
          } else {
            console.log('[i18n DEBUG] Fallback para inglês');
            newLocale = 'en';
          }
        }
        
        // Usar um locale seguro
        const safeLocale = isValidLocale(newLocale) ? newLocale : 'en';
        console.log('[i18n DEBUG] Locale seguro determinado:', safeLocale);
        
        // 1. Atualizar localStorage
        console.log('[i18n DEBUG] Atualizando localStorage');
        localStorage.setItem('lang', safeLocale);
        
        // 2. Verificar detalhes do i18n para debug
        console.log('[i18n DEBUG] Tipo de i18n.global:', typeof i18n.global);
        if (i18n.global) {
          console.log('[i18n DEBUG] Tipo de i18n.global.locale:', typeof i18n.global.locale);
          if (typeof i18n.global.locale === 'object' && i18n.global.locale !== null) {
            console.log('[i18n DEBUG] i18n.global.locale tem value?', 'value' in i18n.global.locale);
          }
        }
        
        // 3. Tentar definir locale usando diferentes métodos
        let localeSet = false;
        
        // Método 1: usando i18n.global.locale.value (Vue I18n 9)
        try {
          if (i18n.global && typeof i18n.global.locale === 'object' && i18n.global.locale !== null && 'value' in i18n.global.locale) {
            console.log('[i18n DEBUG] Definindo locale via i18n.global.locale.value');
            i18n.global.locale.value = safeLocale;
            localeSet = true;
          }
        } catch (err) {
          console.error('[i18n DEBUG] Erro ao definir via i18n.global.locale.value:', err);
        }
        
        // Método 2: usando i18n.global.locale diretamente
        if (!localeSet) {
          try {
            if (i18n.global) {
              console.log('[i18n DEBUG] Tentando definir via i18n.global.locale diretamente');
              (i18n.global as any).locale = safeLocale;
              localeSet = true;
            }
          } catch (err) {
            console.error('[i18n DEBUG] Erro ao definir via i18n.global.locale:', err);
          }
        }
        
        // Método 3: usando vueApp.config.globalProperties.$i18n
        if (!localeSet) {
          try {
            const i18nInstance = vueApp.config.globalProperties.$i18n;
            if (i18nInstance) {
              console.log('[i18n DEBUG] Tentando definir via vueApp.config.globalProperties.$i18n');
              if (i18nInstance.global && typeof i18nInstance.global.locale === 'object' && 'value' in i18nInstance.global.locale) {
                i18nInstance.global.locale.value = safeLocale;
              } else {
                (i18nInstance as any).locale = safeLocale;
              }
              localeSet = true;
            }
          } catch (err) {
            console.error('[i18n DEBUG] Erro ao definir via globalProperties.$i18n:', err);
          }
        }
        
        // Verificar se conseguimos definir o locale
        if (localeSet) {
          console.log('[i18n DEBUG] Locale definido com sucesso para:', safeLocale);
          // Emitir evento para notificar componentes
          emitLanguageChangeEvent(safeLocale);
        } else {
          console.error('[i18n DEBUG] Falha em todas as tentativas de definir o locale');
        }
        
      } catch (error) {
        console.error('[i18n DEBUG] Erro crítico ao definir locale:', error);
      }
    };

    // Configurar listener para evento customizado de mudança de idioma
    document.addEventListener('languageChanged', ((event: CustomEvent) => {
      console.log('[i18n DEBUG] Evento languageChanged detectado:', event.detail);
      
      if (event.detail?.locale && typeof event.detail.locale === 'string') {
        console.log('[i18n DEBUG] Alterando idioma para:', event.detail.locale);
        setLocale(event.detail.locale);
      } else {
        console.warn('[i18n DEBUG] Evento languageChanged sem locale válido:', event.detail);
      }
    }) as EventListener);
    
    // Listener para eventos de storage (sincronização entre abas)
    window.addEventListener('storage', (event) => {
      console.log('[i18n DEBUG] Evento storage detectado:', event);
      
      if (event.key === 'lang' && event.newValue) {
        console.log('[i18n DEBUG] Mudança de idioma em outra aba detectada:', event.newValue);
        setLocale(event.newValue);
      }
    });
    
    // Watch para sincronizar mudanças de locale com localStorage
    try {
      if (i18n.global && i18n.global.locale) {
        console.log('[i18n DEBUG] Configurando watch para i18n.global.locale');
        
        watch(() => i18n.global.locale.value, (newVal) => {
          console.log('[i18n DEBUG] i18n.global.locale mudou para:', newVal);
          localStorage.setItem('lang', newVal);
        });
      } else {
        console.warn('[i18n DEBUG] Não foi possível configurar watch para locale - objeto não disponível');
      }
    } catch (err) {
      console.error('[i18n DEBUG] Erro ao configurar watch para locale:', err);
    }
    
    // Log para verificar a estrutura do i18n
    setTimeout(() => {
      try {
        console.group('[i18n DEBUG] Estrutura do i18n:');
        console.log('i18n.mode:', (i18n as any).mode);
        console.log('i18n tem global?', !!i18n.global);
        console.log('i18n.global tem locale?', !!i18n.global?.locale);
        console.log('Tipo de i18n.global.locale:', typeof i18n.global?.locale);
        console.log('Valor atual do locale:', i18n.global?.locale?.value);
        console.log('i18n.global tem getLocaleMessage?', typeof i18n.global?.getLocaleMessage === 'function');
        console.groupEnd();
      } catch (err) {
        console.error('[i18n DEBUG] Erro ao inspecionar i18n:', err);
      }
    }, 100);
  }
  
  // Retornar provide para o Nuxt
  return {
    provide: {
      i18n: i18n.global
    }
  }
})