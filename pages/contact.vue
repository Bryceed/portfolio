<template>
  <ProjectsHero
    :title="$t('html.contact.title')"
    :description="$t('html.contact.description')"
    :img="'/avatar.jpg'"
    :gradient="'linear-gradient(120deg, #470de4 0%, #cbb2ef 100%)'"
    baseClass="contact-hero"
    :showParticles="true"
    :particlesHeight="160"
  />
  <div class="contact-page contact-main-content">
    <div class="contact-cards">
      <div class="contact-card">
        <h2>Email</h2>
        <a :href="'mailto:' + contactInfo.email" class="contact-link">{{ contactInfo.email }}</a>
      </div>
      <div class="contact-card">
        <h2>Phone</h2>
        <a :href="'https://api.whatsapp.com/send?phone=' + formatPhone(contactInfo.phone)" target="_blank" class="contact-link">
          {{ contactInfo.phone }}
        </a>
        <span class="contact-note">{{ $t('html.contact.phone.description') }}</span>
      </div>
      <div class="contact-card">
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
      <div class="contact-card">
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
      <div v-if="contactInfo.cvFile" class="contact-card contact-card-download">
        <h3>{{ $t('html.contact.cv.title') }}</h3>
        <p>{{ $t('html.contact.cv.description') }}</p>
        <a :href="contactInfo.cvFile" download class="btn btn-secondary">
          <i class="material-icons">download</i>
          {{ $t('html.contact.buttons.downloadCV') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageTitle } from '@/utils/pageTitle';
import about from '@/data/about.json';
import { contactLinks } from '@/utils/contactLinks';
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

<style scoped>
.contact-page {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 400px;
  margin-top: 0;
}
.contact-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0 3rem 0;
}
.contact-card {
  background: rgba(34, 34, 34, 0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  padding: 2.2rem 2rem 1.5rem 2rem;
  min-width: 260px;
  max-width: 340px;
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
  color: #fff;
  position: relative;
  z-index: 1;
  transition: box-shadow 0.2s, background 0.2s;
}
.contact-card:hover {
  box-shadow: 0 12px 48px 0 #5f0de444;
  background: rgba(95, 13, 228, 0.12);
}
.contact-card h2, .contact-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #5f0de4;
  margin-bottom: 0.5rem;
}
.contact-link {
  color: #a084fa;
  font-size: 1.1rem;
  font-weight: 600;
  word-break: break-all;
  text-decoration: underline;
}
.contact-note {
  font-size: 0.95rem;
  color: #bbb;
  opacity: 0.7;
  margin-top: 0.2rem;
}
.cv-button-group {
  display: flex;
  gap: 0.7rem;
  align-items: center;
}
.cv-btn {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.7rem 1.6rem;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(95, 13, 228, 0.08);
  transition: all 0.2s;
  background: linear-gradient(90deg, #5f0de4 0%, #a084fa 100%);
  color: #fff;
  border: none;
  cursor: pointer;
}
.cv-btn.active, .cv-btn:hover {
  background: linear-gradient(90deg, #a084fa 0%, #5f0de4 100%);
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}
.cv-divider {
  width: 2px;
  height: 28px;
  background: #a084fa;
  border-radius: 2px;
  margin: 0 0.5rem;
}
.social-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.5rem;
}
.social-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 1.2rem;
  background: #232323;
  color: #fff;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.social-btn.github { background: #232323; }
.social-btn.linkedin { background: #0a66c2; }
.social-btn.whatsapp { background: #25d366; color: #222; }
.social-btn.instagram { background: linear-gradient(45deg, #fd5d5d, #fcb045, #833ab4); }
.social-btn:hover {
  filter: brightness(1.1);
  box-shadow: 0 2px 12px #5f0de444;
}
.contact-card-download {
  background: rgba(34, 34, 34, 0.82);
  border: 2px dashed #a084fa;
  align-items: center;
  text-align: center;
}
.btn.btn-secondary {
  background: #fff;
  color: #5f0de4;
  border: 2px solid #5f0de4;
  font-weight: 700;
  border-radius: 2rem;
  padding: 0.7rem 1.6rem;
  margin-top: 1rem;
  transition: all 0.2s;
}
.btn.btn-secondary:hover {
  background: #f3f3f3;
  color: #5f0de4;
  border: 2px solid #a084fa;
  transform: translateY(-2px) scale(1.04);
}
@media (max-width: 900px) {
  .contact-cards {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1.2rem 0 2rem 0;
  }
  .contact-card {
    min-width: 0;
    max-width: 98vw;
    width: 100%;
    padding: 1.5rem 1rem 1rem 1rem;
  }
  .contact-hero-section, .contact-hero-bg, .contact-hero-gradient {
    min-height: 120px;
    height: 120px;
  }
  .contact-hero-logo {
    width: 48px;
    height: 48px;
  }
}
</style>