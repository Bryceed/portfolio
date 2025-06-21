export default defineNuxtPlugin(({ vueApp }) => {
  if (process.client) {
    console.log('[i18n-watcher DEBUG] Plugin i18n-watcher inicializando');
    
    // Esta função irá forçar a renderização de componentes quando o idioma mudar
    const updateComponents = (locale, source) => {
      console.log('[i18n-watcher DEBUG] Evento de mudança de idioma detectado:', locale, 'Fonte:', source);
      
      // Notificar todos os componentes registrados
      const i18nComponents = window._i18nComponentsRegistry || [];
      console.log('[i18n-watcher DEBUG] Componentes registrados:', i18nComponents.length);
      
      let updatedCount = 0;
      i18nComponents.forEach(component => {
        if (component && component.$forceUpdate) {
          try {
            component.$forceUpdate();
            updatedCount++;
            
            // Verificar se o componente tem método $t disponível
            if (component.$t) {
              console.log('[i18n-watcher DEBUG] Componente com $t:', component.$options?.name || 'anônimo');
            }
          } catch (err) {
            console.error('[i18n-watcher DEBUG] Erro ao atualizar componente:', err);
          }
        }
      });
      
      console.log('[i18n-watcher DEBUG] Componentes atualizados:', updatedCount);
      
      // Verificar o i18n no app Vue
      if (vueApp.config && vueApp.config.globalProperties && vueApp.config.globalProperties.$i18n) {
        const i18nInstance = vueApp.config.globalProperties.$i18n;
        console.log('[i18n-watcher DEBUG] $i18n disponível no app Vue');
        
        if (i18nInstance.global) {
          console.log('[i18n-watcher DEBUG] locale atual:', i18nInstance.global.locale?.value);
        } else {
          console.log('[i18n-watcher DEBUG] locale atual (legacy):', i18nInstance.locale);
        }
      }
      
      // Forçar atualização do app se estiver disponível
      try {
        if (vueApp && vueApp.$forceUpdate) {
          console.log('[i18n-watcher DEBUG] Forçando atualização do vueApp');
          vueApp.$forceUpdate();
        } else {
          console.log('[i18n-watcher DEBUG] vueApp.$forceUpdate não disponível');
        }
      } catch (e) {
        console.error('[i18n-watcher DEBUG] Erro ao forçar atualização do app:', e);
      }
    };    // Registrar componente atual no registro global de componentes i18n
    console.log('[i18n-watcher DEBUG] Registrando mixin global para i18n');
    
    vueApp.mixin({
      created() {
        // Criar registro global para componentes que usam i18n
        if (window._i18nComponentsRegistry === undefined) {
          window._i18nComponentsRegistry = [];
          console.log('[i18n-watcher DEBUG] Inicializando registro global de componentes');
        }
        
        // Verificar se este componente usa i18n
        const usesI18n = 
          (this.$options && this.$options.i18n) || 
          typeof this.$t === 'function' || 
          (this.$options && this.$options.name && this.$options.name.includes('I18n'));
        
        // Só registrar componentes que usam i18n
        if (usesI18n) {
          window._i18nComponentsRegistry.push(this);
          
          if (this.$options && this.$options.name && this.$options.name !== 'anonymous') {
            console.log('[i18n-watcher DEBUG] Componente registrado:', this.$options.name);
          }
          
          // Aplicar patch para tornar a tradução mais reativa
          const originalRender = this.$options.render;
          if (originalRender) {
            this.$options.render = function(...args) {
              // Forçar atualização dos textos com cada renderização
              if (this._i18n && this._i18n.locale) {
                const currentLocale = this._i18n.locale;
                // Este truque força o Vue a reconhecer mudanças de i18n
                this._i18n.locale = currentLocale;
              }
              return originalRender.apply(this, args);
            };
          }
        }
      },
      
      // Adicionar hook updated para verificar atualizações
      updated() {
        if (this.$options && this.$options.name && this.$t) {
          if (window._i18nDebugComponents === undefined) {
            window._i18nDebugComponents = new Set();
          }
          
          if (!window._i18nDebugComponents.has(this.$options.name)) {
            window._i18nDebugComponents.add(this.$options.name);
            console.log('[i18n-watcher DEBUG] Componente atualizado:', this.$options.name);
          }
        }
      },
      
      beforeUnmount() {
        // Limpar referência quando o componente for desmontado
        if (window._i18nComponentsRegistry) {
          const index = window._i18nComponentsRegistry.indexOf(this);
          if (index !== -1) {
            window._i18nComponentsRegistry.splice(index, 1);
            
            if (this.$options && this.$options.name) {
              console.log('[i18n-watcher DEBUG] Componente removido:', this.$options.name);
            }
          }
        }
      }
    });    // Ouvir eventos de mudança de idioma
    document.addEventListener('i18n:localeChanged', (event) => {
      console.log('[i18n-watcher DEBUG] Evento i18n:localeChanged recebido:', event.detail);
      if (event.detail && event.detail.locale) {
        updateComponents(event.detail.locale, 'i18n:localeChanged');
      }
    });
    
    // Ouvir também o evento original
    document.addEventListener('languageChanged', (event) => {
      console.log('[i18n-watcher DEBUG] Evento languageChanged recebido:', event.detail);
      if (event.detail && event.detail.locale) {
        updateComponents(event.detail.locale, 'languageChanged');
      }
    });
    
    // Ouvir evento especial de atualização
    document.addEventListener('i18n:updateRequested', (event) => {
      console.log('[i18n-watcher DEBUG] Solicitação de atualização recebida:', event.detail);
      
      // Tentar obter o locale atual
      let currentLocale = null;
      
      try {
        if (vueApp.config && vueApp.config.globalProperties && vueApp.config.globalProperties.$i18n) {
          const i18n = vueApp.config.globalProperties.$i18n;
          currentLocale = i18n.global ? i18n.global.locale.value : i18n.locale;
        }
      } catch (e) {
        console.error('[i18n-watcher DEBUG] Erro ao obter locale atual:', e);
      }
      
      // Fallback para localStorage
      if (!currentLocale && window.localStorage) {
        currentLocale = window.localStorage.getItem('lang');
      }
      
      // Usar padrão se nada for encontrado
      currentLocale = currentLocale || 'pt-BR';
      
      // Forçar atualização de todos os componentes
      updateComponents(currentLocale, 'updateRequested');
    });
    
    // Ouvir mudanças no localStorage
    window.addEventListener('storage', (event) => {
      if (event.key === 'lang' && event.newValue) {
        console.log('[i18n-watcher DEBUG] Mudança de locale via localStorage:', event.newValue);
        updateComponents(event.newValue, 'storage');
      }
    });
    
    console.log('[i18n-watcher DEBUG] Plugin i18n-watcher carregado com sucesso');
    
    // Verificar configuração após curto delay
    setTimeout(() => {
      console.log('[i18n-watcher DEBUG] Componentes registrados após inicialização:', 
        window._i18nComponentsRegistry ? window._i18nComponentsRegistry.length : 0);
        
      // Verificar estado do i18n
      try {
        const i18n = vueApp.config.globalProperties.$i18n;
        if (i18n) {
          console.log('[i18n-watcher DEBUG] Estado do i18n:', {
            global: !!i18n.global,
            locale: i18n.global ? i18n.global.locale.value : i18n.locale
          });
        } else {
          console.warn('[i18n-watcher DEBUG] $i18n não encontrado em globalProperties');
        }
      } catch (e) {
        console.error('[i18n-watcher DEBUG] Erro ao verificar estado do i18n:', e);
      }
    }, 1000);
  }
});
