export default defineNuxtPlugin(({ vueApp }) => {
  if (process.client) {
    // Esta função irá forçar a renderização de componentes quando o idioma mudar
    const updateComponents = (locale) => {
      console.log('Evento de mudança de idioma detectado:', locale);
      
      // Notificar todos os componentes registrados
      const i18nComponents = window._i18nComponentsRegistry || [];
      i18nComponents.forEach(component => {
        if (component && component.$forceUpdate) {
          component.$forceUpdate();
        }
      });
      
      // Forçar atualização do app se estiver disponível
      if (vueApp && vueApp.$forceUpdate) {
        vueApp.$forceUpdate();
      }
    };

    // Registrar componente atual no registro global de componentes i18n
    vueApp.mixin({
      created() {
        // Criar registro global para componentes que usam i18n
        if (window._i18nComponentsRegistry === undefined) {
          window._i18nComponentsRegistry = [];
        }
        
        // Só registrar componentes que usam i18n
        if (this.$options && this.$options.i18n || this.$t) {
          window._i18nComponentsRegistry.push(this);
        }
      },
      beforeUnmount() {
        // Limpar referência quando o componente for desmontado
        if (window._i18nComponentsRegistry) {
          const index = window._i18nComponentsRegistry.indexOf(this);
          if (index !== -1) {
            window._i18nComponentsRegistry.splice(index, 1);
          }
        }
      }
    });

    // Ouvir eventos de mudança de idioma
    document.addEventListener('i18n:localeChanged', (event) => {
      if (event.detail && event.detail.locale) {
        updateComponents(event.detail.locale);
      }
    });
    
    console.log('Plugin i18n-watcher carregado com sucesso');
  }
});
