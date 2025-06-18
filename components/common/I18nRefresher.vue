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
      // Monitorar mudanças de idioma
      document.addEventListener('i18n:localeChanged', this.handleLocaleChange);
      
      // Inicializar com o idioma atual
      this.currentLocale = this.$i18n.locale || localStorage.getItem('lang') || 'pt-BR';
    }
  },
  
  beforeUnmount() {
    if (process.client) {
      document.removeEventListener('i18n:localeChanged', this.handleLocaleChange);
    }
  },
  
  methods: {
    handleLocaleChange(event) {
      if (event.detail && event.detail.locale) {
        if (this.currentLocale !== event.detail.locale) {
          this.currentLocale = event.detail.locale;
          
          // Forçar atualização deste componente e seus pais
          this.$forceUpdate();
          this.$nextTick(() => {
            // Notificar componente pai
            this.$emit('localeChanged', event.detail.locale);
          });
        }
      }
    }
  }
}
</script>
