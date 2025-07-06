<template>
  <div class="lang-selector" ref="container">
    <!-- Botão do seletor de idiomas integrado no elemento principal -->
    <div 
      class="lang-btn" 
      @click="togglePopup"
      ref="button"
    >
      <span class="flag-text">{{ $t('language.code') }}</span>
      <span :class="getFlagClass(selectedLanguage)"></span>
      <span class="lang-label">{{ selectedLanguage.name }}</span>
      <span class="material-icons" :class="{ 'rotated': isOpen }">expand_more</span>
    </div>

    <!-- Popup com grid de idiomas -->
    <div v-if="isOpen" class="lang-popup">
      <div class="lang-grid">
        <div 
          v-for="lang in availableLanguages" 
          :key="getLangKey(lang)" 
          class="lang-item"
          @click="selectLanguage(lang)"
        >
          <span :class="getFlagClass(lang)"></span>
          <div class="lang-info">
            <div class="lang-code">
              {{ lang.code }}<span v-if="lang.region && lang.region !== lang.code">-{{ lang.region }}</span>
            </div>
            <div class="lang-name">{{ lang.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LanguageSelectorComponent',

  props: {
    languages: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isOpen: false,
      internalSelectedLanguage: null,
      lastCheckedLocale: null,
      refreshCounter: 0
    }
  },

  computed: {
    selectedLanguage() {
      // Usa o valor interno se disponível, senão usa o modelValue
      return this.internalSelectedLanguage || this.modelValue || { code: 'en', region: 'US', name: 'English' };
    },
    
    availableLanguages() {
      return this.languages || [];
    },
    
    currentLocale() {
      // Obtém o locale atual do i18n, localStorage, ou props
      let locale;
      
      // Tentativa 1: Verificar o i18n
      if (this.$i18n?.locale) {
        locale = this.$i18n.locale;
      } else if (this.$i18n?.global?.locale?.value) {
        locale = this.$i18n.global.locale.value;
      }
      
      // Tentativa 2: Verificar localStorage
      if (!locale && process.client) {
        try {
          locale = localStorage.getItem('lang');
        } catch (e) {
          console.error('Erro ao acessar localStorage:', e);
        }
      }
      
      // Tentativa 3: Usar o modelo atual
      if (!locale && this.modelValue) {
        const model = this.modelValue;
        if (model.region) {
          locale = `${model.code}-${model.region}`;
        } else {
          locale = model.code;
        }
      }
      
      // Fallback
      return locale || 'en';
    }
  },
  
  watch: {
    // Observa mudanças no locale do i18n
    currentLocale: {
      immediate: true,
      handler(newLocale) {
        if (newLocale && this.lastCheckedLocale !== newLocale) {
          this.lastCheckedLocale = newLocale;
          this.syncWithCurrentLocale(newLocale);
          this.forceRefresh();
        }
      }
    },
    
    // Observa mudanças no modelValue
    modelValue: {
      immediate: true,
      handler(newValue) {
        if (newValue && (!this.internalSelectedLanguage || 
            (this.internalSelectedLanguage.code !== newValue.code || 
             this.internalSelectedLanguage.region !== newValue.region))) {
          this.internalSelectedLanguage = newValue;
          this.forceRefresh();
        }
      }
    }
  },

  methods: {
    togglePopup() {
      console.log('Botão clicado! Alternando popup...');
      this.isOpen = !this.isOpen;
      console.log('Estado do popup:', this.isOpen);
    },
    
    selectLanguage(lang) {
      console.log('Idioma selecionado:', lang);
      this.internalSelectedLanguage = lang;
      this.$emit('update:modelValue', lang);
      this.$emit('select', lang);
      this.isOpen = false;
      
      // Atualizar localStorage diretamente para garantir sincronização
      try {
        if (lang.region) {
          localStorage.setItem('lang', `${lang.code}-${lang.region}`);
        } else {
          localStorage.setItem('lang', lang.code);
        }
        
        // Emitir evento de mudança de idioma
        document.dispatchEvent(new CustomEvent('languageChanged', { 
          detail: { 
            locale: lang.region ? `${lang.code}-${lang.region}` : lang.code 
          } 
        }));
      } catch (e) {
        console.error('Erro ao atualizar localStorage:', e);
      }
      
      this.forceRefresh();
    },
    
    getLangKey(lang) {
      return `${lang.code}-${lang.region || ''}`;
    },
    
    getFlagClass(lang) {
      if (!lang) return 'flag flag-en rounded';
      
      let code = (lang.code || 'en').toLowerCase();
      let region = lang.region ? lang.region.toLowerCase() : '';
      
      if (code === 'pt' && region === 'pt') return 'flag flag-pt_pt rounded';
      if (code === 'en' && region === 'ca') return 'flag flag-ca rounded';
      
      return `flag flag-${code} rounded`;
    },
    
    handleClickOutside(event) {
      if (this.isOpen && this.$refs.container && !this.$refs.container.contains(event.target)) {
        this.isOpen = false;
      }
    },
    
    forceRefresh() {
      // Força renderização do componente
      this.refreshCounter++;
      
      // Forçar atualização do DOM
      this.$nextTick(() => {
        if (this.$forceUpdate) {
          this.$forceUpdate();
        }
      });
    },
    
    syncWithCurrentLocale(locale) {
      if (!locale) return;
      
      console.log('LanguageSelector: Sincronizando com locale:', locale);
      
      // Normaliza o locale para comparações
      const normalizedLocale = locale.toLowerCase();
      const parts = normalizedLocale.split('-');
      const langCode = parts[0];
      const langRegion = parts[1];
      
      // Tenta encontrar correspondência exata e depois parcial
      let matchingLang = null;
      
      // 1. Correspondência exata de código + região
      if (langRegion) {
        matchingLang = this.availableLanguages.find(lang => {
          const code = lang.code?.toLowerCase();
          const region = lang.region?.toLowerCase();
          return code === langCode && region === langRegion;
        });
      }
      
      // 2. Correspondência apenas de código
      if (!matchingLang) {
        matchingLang = this.availableLanguages.find(lang => {
          return lang.code?.toLowerCase() === langCode;
        });
      }
      
      // 3. Correspondência especial pt-BR -> pt
      if (!matchingLang && langCode === 'pt' && langRegion === 'br') {
        matchingLang = this.availableLanguages.find(lang => {
          return lang.code?.toLowerCase() === 'pt' && (!lang.region || lang.region.toLowerCase() === 'br');
        });
      }
      
      // 4. Fallback para inglês se nada for encontrado
      if (!matchingLang) {
        matchingLang = this.availableLanguages.find(lang => {
          return lang.code?.toLowerCase() === 'en';
        });
      }
      
      if (matchingLang) {
        console.log('LanguageSelector: Idioma encontrado para locale', locale, ':', matchingLang);
        this.internalSelectedLanguage = matchingLang;
      } else {
        console.warn('LanguageSelector: Nenhum idioma correspondente encontrado para locale:', locale);
      }
    },
    
    checkLocalStorage() {
      try {
        const storedLocale = localStorage.getItem('lang');
        if (storedLocale && this.lastCheckedLocale !== storedLocale) {
          console.log('LanguageSelector: Locale no localStorage:', storedLocale);
          this.lastCheckedLocale = storedLocale;
          this.syncWithCurrentLocale(storedLocale);
          this.forceRefresh();
        }
      } catch (e) {
        console.error('Erro ao verificar localStorage:', e);
      }
    },
    
    handleLocaleChange(event) {
      if (event && event.detail) {
        const newLocale = event.detail.locale || event.detail;
        console.log('LanguageSelector: Evento de mudança de idioma detectado:', newLocale);
        if (this.lastCheckedLocale !== newLocale) {
          this.lastCheckedLocale = newLocale;
          this.syncWithCurrentLocale(newLocale);
          this.forceRefresh();
        }
      }
      
      // Verifica também o localStorage diretamente
      this.checkLocalStorage();
    }
  },
  
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    
    // Adicionar listeners para eventos de mudança de idioma
    document.addEventListener('i18n:localeChanged', this.handleLocaleChange);
    document.addEventListener('languageChanged', this.handleLocaleChange);
    document.addEventListener('i18n:refresh', this.handleLocaleChange);
    
    // Verificar mudanças no localStorage
    if (process.client) {
      window.addEventListener('storage', () => this.checkLocalStorage());
      
      // Verifica imediatamente
      this.checkLocalStorage();
      
      // Configura um polling para verificar mudanças de idioma
      this.pollingInterval = setInterval(() => {
        this.checkLocalStorage();
        if (this.$i18n) {
          const currentI18nLocale = this.$i18n.locale || (this.$i18n.global?.locale?.value);
          if (currentI18nLocale && this.lastCheckedLocale !== currentI18nLocale) {
            console.log('LanguageSelector: Mudança de locale detectada no polling:', currentI18nLocale);
            this.lastCheckedLocale = currentI18nLocale;
            this.syncWithCurrentLocale(currentI18nLocale);
            this.forceRefresh();
          }
        }
      }, 2000); // Verificar a cada 2 segundos
    }
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('i18n:localeChanged', this.handleLocaleChange);
    document.removeEventListener('languageChanged', this.handleLocaleChange);
    document.removeEventListener('i18n:refresh', this.handleLocaleChange);
    
    if (process.client && this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
})
</script>

<style scoped>
.lang-selector {
  position: relative;
  display: inline-block;
  z-index: 9999;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #181818;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
  position: relative;
  z-index: 101;
}

.lang-btn:hover {
  background: #222;
}

.flag-text {
  text-transform: uppercase !important;
  margin-right: .5em;
  font-weight: bold;
  user-select: none;
  cursor: default;
}

.lang-label {
  font-weight: 600;
  font-size: 1em;
}

.material-icons {
  transition: transform 0.2s;
}

.material-icons.rotated {
  transform: rotate(180deg);
}

.lang-popup {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 10000;
  background: #181818;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 1.5px 8px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  min-width: 260px;
  max-width: 340px;
  border: 1.5px solid #232323;
  animation: popup-fade-in 0.2s ease-out;
}

@keyframes popup-fade-in {
  from { opacity: 0; transform: translateY(-10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.lang-item {
  display: flex;
  align-items: center;
  gap: 0.7em;
  padding: 0.5em 0.7em;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.lang-item:hover {
  background: #222;
}

.flag {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 32px;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 0.3em;
}

.rounded {
  border-radius: 10%;
}

.lang-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.lang-code {
  font-weight: 600;
  font-size: 1.05em;
  color: #fff;
}

.lang-name {
  font-size: 0.92em;
  color: #bbb;
  opacity: 0.7;
  margin-top: 2px;
}
</style>
