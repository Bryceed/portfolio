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
      isOpen: false
    }
  },

  computed: {
    selectedLanguage() {
      return this.modelValue || { code: 'en', region: 'US', name: 'English' };
    },
    
    availableLanguages() {
      return this.languages || [];
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
      this.$emit('update:modelValue', lang);
      this.$emit('select', lang);
      this.isOpen = false;
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
    }
  },
  
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
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
