<template>
  <div class="contact-page">
    <div class="contact-header">
      <h1>{{ $t('html.contact.title') }}</h1>
      <p>{{ $t('html.contact.description') }}</p>
    </div>
    <div class="contact-content">

      <div class="contact-info">
        <div class="contact-methods">
          <div class="contact-method">
            <h2>Email</h2>
            <a :href="'mailto:' + contactInfo.email">{{ contactInfo.email }}</a>
          </div>
          
          <div class="contact-method">
            <h2>Phone</h2>
            <a :href="'https://api.whatsapp.com/send?phone=' + formatPhone(contactInfo.phone)" target="_blank">
              {{ contactInfo.phone }}
            </a> 
          <span>{{ $t('html.contact.phone.description') }}</span>
          </div>

          <div class="contact-method">
            <h2>{{ $t('html.contact.cv.title') }}</h2>
            <div class="cv-button-group">
              <button
                class="cv-btn"
                :class="{ active: selectedCvType === 'traditional' }"
                @click="openCvPopup('traditional')"
                type="button"
              >
                {{ $t('html.contact.cv.traditional') }}
              </button>
              <span class="cv-divider"></span>
              <button
                class="cv-btn"
                :class="{ active: selectedCvType === 'europass' }"
                @click="openCvPopup('europass')"
                type="button"
              >
                {{ $t('html.contact.cv.europass') }}
              </button>
            </div>
            <CvPopup
              v-if="showCvPopup"
              :type="cvPopupType"
              :current-lang="$i18n.locale"
              @close="showCvPopup = false"
            />
          </div>
          
          <div class="social-links">
            <h2>{{ $t('html.contact.social.title') }}</h2>
            <div class="social-buttons">
              <a v-if="contactInfo.links?.github" :href="contactInfo.links.github" target="_blank" class="social-btn github">
                <i class="material-icons">code</i>
                GitHub
              </a>
              <a v-if="contactInfo.links?.linkedin" :href="contactInfo.links.linkedin" target="_blank" class="social-btn linkedin">
                <i class="material-icons">work</i>
                LinkedIn
              </a>
              <a v-if="contactInfo.links?.whatsapp" :href="contactInfo.links.whatsapp" target="_blank" class="social-btn whatsapp">
                <i class="material-icons">chat</i>
                WhatsApp
              </a>
              <a v-if="contactInfo.links?.instagram" :href="contactInfo.links.instagram" target="_blank" class="social-btn instagram">
                <i class="material-icons">camera_alt</i>
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div v-if="contactInfo.cvFile" class="cv-download">
          <h3>{{ $t('html.contact.cv.title') }}</h3>
          <p>{{ $t('html.contact.cv.description') }}</p>
          <a :href="contactInfo.cvFile" download class="btn btn-secondary">
            <i class="material-icons">download</i>
            {{ $t('html.contact.buttons.downloadCV') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageTitle } from '@/utils/pageTitle';
import about from '@/data/about.json';
import { contactLinks } from '@/utils/contactLinks';
import CvPopup from '@/components/CvPopup.vue';

export default {
  name: "ContactPage",
  components: {
    CvPopup
  },
  data() {
    return {
      about,
      contactLinks,
      contactInfo: {
        email: about.email,
        phone: about.phone,
        links: {
          github: about.links?.github,
          linkedin: about.links?.linkedin,
          whatsapp: contactLinks.whatsapp,
          instagram: about.links?.instagram
        },
        cvFile: null
      },
      formData: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      cvData: null,
      loadingCv: true,
      pendingCvType: null,
      selectedCvType: null,
      cvPopupType: null,
      showCvPopup: false
    };
  },
  methods: {
    async fetchCvData() {
      this.loadingCv = true;
      try {
        const res = await fetch('/files/cv/index.json?' + Date.now());
        this.cvData = await res.json();
      } finally {
        this.loadingCv = false;
      }
    },
    formatPhone(phone) {
      // Remove todos os caracteres não numéricos
      return phone.replace(/\D/g, '');
    },
    resetForm() {
      this.formData = {
        name: "",
        email: "",
        subject: "",
        message: ""
      };
      this.isSubmitting = false;
    },
    sendEmail() {
      this.isSubmitting = true;
      
      // Simulação de envio (em produção, substituir por API real)
      setTimeout(() => {
        this.isSubmitting = false;
        this.formStatus = {
          type: 'success',
          message: this.$t('html.contact.form.success')
        };
        
        // Reset após 5 segundos
        setTimeout(() => {
          this.formStatus = null;
          this.resetForm();
        }, 5000);
      }, 2000);
    },
    async openCvPopup(type) {
      this.selectedCvType = type;
      this.cvPopupType = type;
      this.showCvPopup = true;
      await this.fetchCvData();
    },
    suggestedCvLang() {
      const locale = this.$i18n.locale;
      const available = this.cvData && this.cvData.traditional ? Object.keys(this.cvData.traditional) : [];
      
      if (available.includes(locale)) {
        return locale;
      } else if (locale.startsWith('pt') && available.includes('pt-BR')) {
        return 'pt-BR';
      } else {
        return available[0] || 'en';
      }
    }
  },
  async mounted() {
    await this.fetchCvData();
  },
  watch: {
    loadingCv(newVal) {
      if (!newVal && this.pendingCvType) {
        this.openCvPopup(this.pendingCvType);
        this.pendingCvType = null;
      }
    }
  },
};
</script>

<style scoped lang="scss">
.contact-page {
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 1rem;
}

.contact-header {
    text-align: center;
    margin: 2rem 0 3rem;
    position: relative;
    padding: 2rem;
    background: linear-gradient(90deg, var(--dark-primary-color), var(--dark-secondary-color));
    border-radius: 12px;
    color: #fff;
}

.contact-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
}

.contact-header p {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0.9;
}

.contact-content {  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding-bottom: 3rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
}

.contact-form-container {
  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-weight: 500;
    }
    
    input, textarea {
      padding: 0.85rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: var(--dark-primary-color, #9871F6);
        box-shadow: 0 0 0 2px rgba(152, 113, 246, 0.3);
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }
  
  button {
    margin-top: 0.5rem;
    padding: 1rem 1.5rem;
    background: var(--dark-primary-color, #9871F6);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--dark-secondary-color, #7F58E2);
      transform: translateY(-2px);
    }
    
    i {
      font-size: 1.2rem;
    }
  }
}

.contact-divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  span {
    position: relative;
    background: #111;
    padding: 0 1rem;
    color: #888;
    font-size: 0.9rem;
  }
}

.contact-info {
  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .contact-method {
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
    h2 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    span {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #aaa;
    }
    
    a {
      color: var(--dark-primary-color, #9871F6);
      text-decoration: none;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      
      &:hover {
        color: var(--dark-secondary-color, #7F58E2);
        text-decoration: underline;
      }
    }

    .cv-button-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;

      .cv-btn {
        flex: 1;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          background: var(--dark-primary-color, #9871F6);
        }

        &:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
      }

      .cv-divider {
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
  
  .social-links {
    h3 {
      margin: 0 0 1rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
    h2 {
      margin: 0 0 1.2rem;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .social-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      
      .social-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.2rem;
        border-radius: 8px;
        text-decoration: none;
        color: #fff;
        font-weight: 500;
        transition: all 0.3s ease;
        
        &.github {
          background: #333;
          
          &:hover {
            background: #222;
          }
        }
        
        &.linkedin {
          background: #0077b5;
          
          &:hover {
            background: #005d8f;
          }
        }

        &.whatsapp {
          background: #25D366;
          
          &:hover {
            background: #128C7E;
          }
        }

        &.instagram {
          background: linear-gradient(45deg, #E1306C, #F77737);
          
          &:hover {
            background: linear-gradient(45deg, #C13584, #E1306C);
          }
        }
        
        i {
          font-size: 1.1rem;
        }
      }
    }
  }
  
  .cv-download {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    p {
      margin-bottom: 1rem;
      color: #aaa;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
      }
      
      i {
        font-size: 1.1rem;
      }
    }
  }
}

// Tema claro
html.light {
  .contact-header {
    background: linear-gradient(90deg, var(--light-primary-color, #7F58E2), var(--light-secondary-color, #6546B3));
  }

  .contact-divider {
    span {
      background: #f5f5f5;
    }
    
    &:before {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  
  .contact-form {
    .form-group {
      input, textarea {
        border-color: rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.02);
        color: #333;
        
        &:focus {
          border-color: var(--light-primary-color, #7F58E2);
          box-shadow: 0 0 0 2px rgba(127, 88, 226, 0.15);
        }
      }
    }
  }
  
  .contact-info {
    .contact-method {
      a {
        color: var(--light-primary-color, #7F58E2);
        
        &:hover {
          color: var(--light-secondary-color, #6546B3);
        }
      }
    }
    
    .cv-download {
      border-color: rgba(0, 0, 0, 0.1);
      
      p {
        color: #555;
      }
      
      .btn {
        background: rgba(0, 0, 0, 0.05);
        color: #333;
        
        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
}
</style>