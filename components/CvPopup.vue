<template>
  <div class="cv-popup-overlay" @click.self="$emit('close')">
    <div class="cv-popup-container">
      <div class="cv-popup-header">
        <h3>{{ $t('html.contact.cv.selectLanguage') }}</h3>
        <button class="close-btn" @click="$emit('close')">
          <i class="material-icons">close</i>
        </button>
      </div>
      
      <div class="cv-popup-content">        <div v-if="type === 'traditional'" class="cv-options">
          <p>{{ $t('html.contact.cv.traditionalDescription') }}</p>
          <div class="cv-lang-options">
            <button 
              v-for="(url, lang) in traditionalCvs" 
              :key="lang" 
              class="cv-lang-btn"
              :class="{ active: selectedLang === lang }"
              @click="openCv(lang, 'traditional')"
            >
              {{ getLanguageName(lang) }}
            </button>
          </div>
        </div>
          <div v-else-if="type === 'europass'" class="cv-options">
          <p>{{ $t('html.contact.cv.popup.description') }}</p>
          <div class="cv-notice">
            <p class="cv-notice-text">
              Ao selecionar o idioma, você será redirecionado para visualização e download do arquivo. 
              Em caso de indisponibilidade, favor avisar e entrar em contato através das outras informações fornecidas no site.
            </p>
          </div>
          <div class="cv-lang-options">
            <button 
              v-for="lang in europassLangs" 
              :key="lang" 
              class="cv-lang-btn"
              :class="{ active: selectedLang === lang }"
              @click="openCv(lang, 'europass')"
            >
              {{ getLanguageName(lang) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cvData from '@/data/cv/index.json';

export default {
  name: 'CvPopup',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['traditional', 'europass'].includes(value)
    },
    currentLang: {
      type: String,
      default: 'pt-BR'
    }
  },  data() {
    return {
      traditionalCvs: cvData.traditional || {},
      europassLangs: cvData.europass || [],
      selectedLang: this.currentLang
    };
  },  methods: {
    openCv(lang, type) {
      if (type === 'traditional') {
        // Para o currículo tradicional, abrir o PDF correspondente
        const url = this.traditionalCvs[lang];
        if (url) {
          window.open(url, '_blank');
          this.$emit('close');
        }      } else {
        // Para o Europass, abrir o curriculum-clean.html com o idioma especificado
        const url = `/codelets/curriculum-clean.html?lang=${lang}`;
        console.log(`Abrindo currículo Europass em ${url}`);
        window.open(url, '_blank');
        this.$emit('close');
      }
    },
    
    getLanguageName(langCode) {
      // Mapeamento de códigos de idiomas para nomes apresentáveis
      const languageNames = {
        'pt-BR': 'Português (Brasil)',
        'en-US': 'English (US)',
        'de-DE': 'Deutsch',
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'ja-JP': '日本語',
        'ko': '한국어',
        'pt-PT': 'Português (Portugal)',
        'ru': 'Русский'
      };
      
      return languageNames[langCode] || langCode;
    }
  },  mounted() {
    // Selecionar o idioma sugerido quando o componente é montado
    const availableLangs = this.type === 'traditional' 
      ? Object.keys(this.traditionalCvs)
      : this.europassLangs;
    
    console.log(`Idiomas disponíveis para ${this.type}:`, availableLangs);
    console.log(`Idioma atual: ${this.currentLang}`);
    
    if (availableLangs.includes(this.currentLang)) {
      this.selectedLang = this.currentLang;
    } else if (this.currentLang.startsWith('pt') && availableLangs.includes('pt-BR')) {
      this.selectedLang = 'pt-BR';
    } else {
      this.selectedLang = availableLangs[0] || 'en-US';
    }
    
    console.log(`Idioma selecionado: ${this.selectedLang}`);
  }
}
</script>

<style scoped lang="scss">
.cv-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.cv-popup-container {
  background-color: var(--dark-background-color, #1e1e1e);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: fadeIn 0.3s ease;
}

.cv-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    margin: 0;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }
    
    i {
      font-size: 1.5rem;
    }
  }
}

.cv-popup-content {
  padding: 1.5rem;
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
}

.cv-notice {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  
  .cv-notice-text {
    font-size: 0.85rem;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.85);
  }
}

.cv-lang-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  
  .cv-lang-btn {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    &.active {
      background-color: var(--dark-primary-color, #9871F6);
      color: white;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Tema claro
html.light .cv-popup-container {
  background-color: white;
  
  .cv-popup-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    
    h3 {
      color: #333;
    }
    
    .close-btn {
      color: rgba(0, 0, 0, 0.5);
      
      &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: black;
      }
    }
  }
  
  .cv-popup-content {
    p {
      color: rgba(0, 0, 0, 0.7);
    }
    
    .cv-notice {
      background-color: rgba(0, 0, 0, 0.05);
      border-left: 3px solid rgba(0, 0, 0, 0.2);
      
      .cv-notice-text {
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
  
  .cv-lang-options {
    .cv-lang-btn {
      background-color: rgba(0, 0, 0, 0.05);
      color: #333;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      
      &.active {
        background-color: var(--light-primary-color, #7F58E2);
        color: white;
      }
    }
  }
}
</style>
