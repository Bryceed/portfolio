<template>
  <div class="contact-page">
    <!-- Hero Card mais elaborado -->
    <div class="hero-card">
      <!-- Background com máscara de gradiente -->
      <div class="hero-card__bg">
        <div class="hero-card__bg-image"></div>
      </div>
      
      <!-- Menu overlay separado -->
      <div class="hero-card__menu-overlay"></div>

      <!-- Título -->
      <div class="hero-card__profile hero-card__profile-info text-center">
        <div class="icons" 
          style="font-size: 2rem; 
          color: var(--text-dark, #eee);">
          <span class="material-icons !text-[6rem]">mail</span>
        </div>
        <h1 class="text-4xl text-bold mb-12">{{ $t('html.contact.hero.title') || 'Entre em Contato' }}</h1>
      </div>


    <div class="contact-section cv-section">
      <h2 class="text-left">{{ $t('html.contact.cv.title') }} (CV)</h2>
      <p>{{ $t('html.contact.cv.description') || 'Veja meu currículo nos formatos disponíveis' }}</p>
      <div class="cv-buttons">
        <button
          class="btn btn-primary"
          :class="{ active: selectedCvType === 'traditional' }"
          @click="openCvPopup('traditional')"
          type="button"
        >
          <i class="material-icons">description</i>
          {{ $t('html.contact.cv.traditional') }}
        </button>
        
        <button
          class="btn btn-primary"
          :class="{ active: selectedCvType === 'europass' }"
          @click="openCvPopup('europass')"
          type="button"
        >
          <i class="material-icons">assignment</i>
          {{ $t('html.contact.cv.europass') }}
        </button>
      </div>
      <CvPopup
        v-if="showCvPopup"
        :type="cvPopupType"
        :current-lang="$i18n.locale"
        @close="showCvPopup = false"
        class="z-index: 99"
      />
    </div>

    <div class="personal-info contact-section">
      <h2>{{ $t('html.contact.contactInfo') || 'Informações de Contato' }}</h2>
      <div class="info-grid">
        <div class="info-item">
          <i class="material-icons">email</i>
          <div>
            <h3>Email</h3>
            <a :href="'mailto:' + contactInfo.email" class="contact-link">{{ contactInfo.email }}</a>
          </div>
        </div>
        
        <div class="info-item">
          <i class="material-icons">phone</i>
          <div>
            <h3>{{ $t('html.contact.phone.title') || 'Telefone' }}</h3>
            <a :href="'https://api.whatsapp.com/send?phone=' + formatPhone(contactInfo.phone)" target="_blank" class="contact-link">
              {{ contactInfo.phone }}
            </a>
            <p class="contact-note">{{ $t('html.contact.phone.description') }}</p>
          </div>
        </div>
      </div>
      <div class="contact-content">
        <div class="social-section">
          <div class="social-grid">
            <a v-if="contactInfo.links?.github" :href="contactInfo.links.github" target="_blank" class="social-card github">
              <i class="material-icons">code</i>
              <span class="social-name">GitHub</span>
              <span class="social-username">@Bryceed</span>
            </a>
            <a v-if="contactInfo.links?.linkedin" :href="contactInfo.links.linkedin" target="_blank" class="social-card linkedin">
              <i class="material-icons">work</i>
              <span class="social-name">LinkedIn</span>
              <span class="social-username">wellington-do-nascimento</span>
            </a>
            <a v-if="contactInfo.links?.whatsapp" :href="contactInfo.links.whatsapp" target="_blank" class="social-card whatsapp">
              <i class="material-icons">chat</i>
              <span class="social-name">WhatsApp</span>
              <span class="social-username">+55 11 94201-8873</span>
            </a>
            <a v-if="contactInfo.links?.instagram" :href="contactInfo.links.instagram" target="_blank" class="social-card instagram">
              <i class="material-icons">camera_alt</i>
              <span class="social-name">Instagram</span>
              <span class="social-username">@wellnas.dev</span>
            </a>
          </div>
        </div>
      </div>
    </div></div>
  </div>
</template>

<script>
import { getPageTitle } from '@/utils/page/pageTitle';
import about from '@/data/about.json';
import { contactLinks } from '@/utils/contact/contactLinks';
import CvPopup from '@/components/CvPopup.vue';
import ProjectsHero from '@/components/common/ProjectsHero.vue';

export default {
  name: "ContactPage",
  components: {
    CvPopup,
    ProjectsHero
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
  position: relative;
  padding: 4rem 0;
  z-index: 2;
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 20px 4rem;
}

/* Estilo do hero card - similar à página about */
.hero-card {
  overflow: visible;
  position: relative;
  padding-top: 3rem;
  z-index: 1;
}

.hero-card__bg {
  position: absolute;
  top: 0.1rem;
  width: calc(100dvw);
  left: 50%;
  transform: translateX(-50%);
  height: 100vmax;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  border-radius: 0.5rem;
}

.hero-card__bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://pixabay.com/get/gdee54b61b4b588857b9b8a08730d7957bb0c775aaa4b40a8bf7991f0d546dfa081f2e9b51b4498a1d6f0b8732f385b673d6374c62d4d23fb00a94a0c33538eacbb777fcc729f686d0ee6e7ab896d3e5c_1920.jpg?attachment=');
  background-size: cover;
  background-position: center;
  
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.3) 85%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.3) 85%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-size: cover;
  -webkit-mask-size: cover;
  mask-position: center;
  -webkit-mask-position: center;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

.hero-card__menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(34px + 4rem);
  background: linear-gradient(
    to right,
    var(--dark-background-color, #222222) 0%,
    rgba(34, 34, 34, 0.5) 50%,
    var(--dark-background-color, #222222) 100%
  );
  border-bottom: thin solid var(--dark-background-color, #222222);
  z-index: 8;
  backdrop-filter: blur(8px);
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.hero-card__menu-overlay:before,
.hero-card__menu-overlay:after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  transform: translateY(100%);
  background-size: 100% 100%;
  z-index: inherit;
}

.hero-card__menu-overlay:before {
  color: var(--dark-background-color, #222222);
  left: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1V0h1A1 1 0 0 0 0 1Z" fill="%23222222"/></svg>');
}

.hero-card__menu-overlay:after {
  color: var(--dark-background-color, #222222);
  right: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M1 1V0H0A1 1 0 0 1 1 1Z" fill="%23222222"/></svg>');
}

.hero-card__profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 1rem 3rem;
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-card__profile-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 4px solid var(--primary-color, #5f0de4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }
}

.hero-card__profile-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.5);
}

.hero-card__profile-info p {
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.5;
  margin: 0 auto;
}

/* Conteúdo principal */
.contact-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 3rem;
  z-index: 1;
  position: relative;
}

.contact-section {
  margin-bottom: 1rem;
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  z-index: 0;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(95, 13, 228, 0.2);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-color, #5f0de4);
    color: var(--dark-text-color, #ffffff);
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    opacity: 0.9;
  }
}

/* Informações pessoais */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;

  i {
    font-size: 2rem;
    color: var(--primary-color, #5f0de4);
    background-color: rgba(95, 13, 228, 0.1);
    padding: 0.8rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--secondary-color, #a084fa);
  }

  .contact-link {
    color: #a084fa;
    font-size: 1.1rem;
    font-weight: 600;
    word-break: break-word;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #5f0de4;
      text-decoration: underline;
    }
  }

  .contact-note {
    font-size: 0.95rem;
    color: #bbb;
    opacity: 0.7;
    margin-top: 0.5rem;
  }
}

/* Seção CV */
.cv-section {
  text-align: center;
}

.cv-buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 2rem;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  
  i {
    font-size: 1.4rem;
  }

  &.btn-primary {
    background: linear-gradient(90deg, #5f0de4 0%, #a084fa 100%);
    color: #fff;
    box-shadow: 0 4px 15px rgba(95, 13, 228, 0.3);
    
    &:hover, &.active {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 6px 20px rgba(95, 13, 228, 0.5);
      background: linear-gradient(90deg, #6818fc 0%, #b39dff 100%);
    }
  }
}

/* Seção Social */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  i {
    font-size: 2.5rem;
    margin-bottom: 0.8rem;
  }
  
  .social-name {
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
    margin-top: 0.5rem;
  }
  
  .social-username {
    opacity: 0.8;
    font-size: 0.9rem;
  }
  
  &.github { 
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    
    &:hover {
      background: linear-gradient(145deg, #333333, #222222);
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  }
  
  &.linkedin { 
    background: linear-gradient(145deg, #0a66c2, #0077b5);
    
    &:hover {
      background: linear-gradient(145deg, #0d78e4, #0088d1);
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(10, 102, 194, 0.3);
    }
  }
  
  &.whatsapp { 
    background: linear-gradient(145deg, #25d366, #128c7e);
    
    &:hover {
      background: linear-gradient(145deg, #2ce072, #14a18f);
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
    }
  }
  
  &.instagram { 
    background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d, #f56040, #f77737, #fcaf45, #ffdc80);
    
    &:hover {
      background: linear-gradient(45deg, #4c6efc, #6360e0, #9747c7, #d14894, #f34178, #ff3a3a, #ff7254, #ff8949, #ffbc5e, #ffe599);
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(193, 53, 132, 0.3);
    }
  }
}

/* Responsividade */
@media (max-width: 900px) {
  .hero-card__profile {
    padding: 5rem 1rem 2rem;
  }
  
  .hero-card__profile-image {
    width: 120px;
    height: 120px;
  }
  
  .hero-card__profile-info h1 {
    font-size: 2rem;
  }
  
  .hero-card__profile-info p {
    font-size: 1.1rem;
  }
  
  .contact-section {
    padding: 1.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .cv-buttons {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
}

/* Tema claro */
html.light {
  .hero-card__bg-image {
    background-image: url('https://pixabay.com/get/gdee54b61b4b588857b9b8a08730d7957bb0c775aaa4b40a8bf7991f0d546dfa081f2e9b51b4498a1d6f0b8732f385b673d6374c62d4d23fb00a94a0c33538eacbb777fcc729f686d0ee6e7ab896d3e5c_1920.jpg?attachment=');
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  .hero-card__menu-overlay {
    background: linear-gradient(
      to right,
      var(--light-background-color, #D1D1D1) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      var(--light-background-color, #D1D1D1) 100%
    );
    border-bottom: thin solid var(--light-background-color, #D1D1D1);
    
    &:before {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1V0h1A1 1 0 0 0 0 1Z" fill="%23D1D1D1"/></svg>');
    }
    
    &:after {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M1 1V0H0A1 1 0 0 1 1 1Z" fill="%23D1D1D1"/></svg>');
    }
  }
  
  .contact-section {
    background-color: rgba(255, 255, 255, 0.1);
    h2 {
      color: var(--light-text-color, #333);
    }
  }
  
  .info-item {
    .contact-link {
      color: #5f0de4;
      
      &:hover {
        color: #a084fa;
      }
    }
    
    .contact-note {
      color: #666;
    }
  }
}
</style>