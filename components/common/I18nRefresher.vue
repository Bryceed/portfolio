<template>
  <!-- Este componente é invisível e serve apenas para gerenciar o estado global do idioma -->
  <div class="i18n-refresh" style="display:none;"></div>
</template>

<script>
export default {
  name: 'I18nRefresher',
  
  data() {
    return {
      currentLocale: null
    }
  },
    mounted() {
    if (process.client) {
      console.log('[I18nRefresher DEBUG] Componente montado');
      
      // Monitorar mudanças de idioma
      document.addEventListener('i18n:localeChanged', this.handleLocaleChange);
      document.addEventListener('languageChanged', this.handleLocaleChange);
      
      // Inicializar com o idioma atual
      let storedLocale = localStorage.getItem('lang');
      let i18nLocale = null;
      
      try {
        i18nLocale = this.$i18n && this.$i18n.global ? this.$i18n.global.locale.value : 
                     (this.$i18n ? this.$i18n.locale : null);
      } catch (e) {
        console.warn('[I18nRefresher DEBUG] Erro ao acessar $i18n:', e);
      }
      
      this.currentLocale = i18nLocale || storedLocale || 'pt-BR';
      console.log('[I18nRefresher DEBUG] Inicializado com locale:', this.currentLocale);
      console.log('[I18nRefresher DEBUG] localStorage:', storedLocale);
      console.log('[I18nRefresher DEBUG] i18n locale:', i18nLocale);
      
      // Adicionar listeners para todos os eventos que possam indicar mudanças no locale
      window.addEventListener('storage', this.handleStorageChange);
    }
  },
    beforeUnmount() {
    if (process.client) {
      console.log('[I18nRefresher DEBUG] Removendo listeners');
      document.removeEventListener('i18n:localeChanged', this.handleLocaleChange);
      document.removeEventListener('languageChanged', this.handleLocaleChange);
      window.removeEventListener('storage', this.handleStorageChange);
    }
  },
  
  methods: {    handleLocaleChange(event) {
      console.log('[I18nRefresher DEBUG] Evento de mudança de locale recebido:', event.type, event.detail);
      
      if (event.detail && event.detail.locale) {
        console.log('[I18nRefresher DEBUG] Novo locale detectado:', event.detail.locale, 'atual:', this.currentLocale);
        
        if (this.currentLocale !== event.detail.locale) {
          this.currentLocale = event.detail.locale;
          console.log('[I18nRefresher DEBUG] Atualizando locale para:', this.currentLocale);
          
          // Forçar atualização deste componente e seus pais
          this.$forceUpdate();
          
          // Verificar o locale do i18n após a atualização
          this.$nextTick(() => {
            console.log('[I18nRefresher DEBUG] Verificando i18n após nextTick');
            
            try {
              const i18nLocale = this.$i18n && this.$i18n.global ? 
                this.$i18n.global.locale.value : 
                (this.$i18n ? this.$i18n.locale : null);
              
              console.log('[I18nRefresher DEBUG] i18n locale atual:', i18nLocale);
            } catch (e) {
              console.error('[I18nRefresher DEBUG] Erro ao verificar i18n:', e);
            }
            
            // Notificar componente pai
            this.$emit('localeChanged', event.detail.locale);
            console.log('[I18nRefresher DEBUG] Evento emitido para o pai:', event.detail.locale);
            
            // IMPORTANTE: Forçar atualização global de componentes
            this.forceUpdateGlobally();
          });
        }
      } else {
        console.warn('[I18nRefresher DEBUG] Evento sem locale válido:', event);
      }
    },
    
    handleStorageChange(event) {
      if (event.key === 'lang' && event.newValue) {
        console.log('[I18nRefresher DEBUG] Mudança no localStorage detectada:', event.newValue);
        
        if (this.currentLocale !== event.newValue) {
          this.currentLocale = event.newValue;
          this.$forceUpdate();
          this.$emit('localeChanged', event.newValue);
          
          // Propagar a mudança para o i18n
          if (this.$i18n && this.$i18n.global && typeof this.$i18n.global.locale === 'object') {
            console.log('[I18nRefresher DEBUG] Atualizando i18n.global.locale com:', event.newValue);
            this.$i18n.global.locale.value = event.newValue;
          }
          
          // Forçar atualização global
          this.forceUpdateGlobally();
        }
      }
    },
    
    // Método especial para forçar atualização de todos os componentes
    forceUpdateGlobally() {
      console.log('[I18nRefresher DEBUG] Tentando forçar atualização global');
      
      // 1. Notificar componentes via bus global (se existir)
      if (window.$nuxt && window.$nuxt.$root) {
        console.log('[I18nRefresher DEBUG] Forçando atualização via $nuxt.$root');
        try {
          window.$nuxt.$root.$forceUpdate();
        } catch (e) {
          console.error('[I18nRefresher DEBUG] Erro ao forçar atualização via $nuxt.$root:', e);
        }
      }
      
      // 2. Disparar evento customizado para outros componentes
      document.dispatchEvent(new CustomEvent('i18n:updateRequested', {
        detail: { timestamp: Date.now() }
      }));
      console.log('[I18nRefresher DEBUG] Evento i18n:updateRequested disparado');
    }
  }
}
</script>
