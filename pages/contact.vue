<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="hero-content">
        <i class="material-icons hero-icon">mail_outline</i>
        <h1>{{ t('html.contact.hero.title', {}, 'Let\'s Connect!') }}</h1>
        <p>{{ t('html.contact.hero.subtitle', {}, 'Feel free to reach out through any of these channels') }}</p>
      </div>
    </section>

    <div class="contact-container">
      <!-- CV Section -->
      <section class="contact-section cv-section">
        <h2>{{ t('html.contact.cv.title', {}, 'Resume') }} (CV)</h2>
        <p>{{ t('html.contact.cv.description', {}, 'Download my resume in your preferred format') }}</p>
        <div class="cv-buttons">
          <button
            class="btn btn-primary"
            @click="openCvPopup('traditional')"
            type="button"
          >
            <i class="material-icons">description</i>
            <span>{{ t('html.contact.cv.traditional', {}, 'Traditional') }}</span>
          </button>
          
          <button
            class="btn btn-secondary"
            @click="openCvPopup('europass')"
            type="button"
          >
            <i class="material-icons">assignment</i>
            <span>{{ t('html.contact.cv.europass', {}, 'Europass') }}</span>
          </button>
        </div>
      </section>

      <!-- Contact Info Section -->
      <section class="contact-section">
        <h2>{{ t('html.contact.contactInfo', {}, 'Contact Information') }}</h2>
        <div class="info-grid">
          <a :href="`mailto:${contactInfo.email}`" class="contact-card email-card">
            <i class="material-icons">email</i>
            <div class="card-content">
              <h3>Email</h3>
              <span class="contact-value">{{ contactInfo.email }}</span>
            </div>
          </a>
          
          <a :href="`https://api.whatsapp.com/send?phone=${formatPhone(contactInfo.phone)}`" target="_blank" class="contact-card phone-card">
            <i class="material-icons">phone</i>
            <div class="card-content">
              <h3>{{ t('html.contact.phone.title', {}, 'Phone') }}</h3>
              <span class="contact-value">{{ contactInfo.phone }}</span>
              <span class="contact-note">{{ t('html.contact.phone.description', {}, 'WhatsApp available') }}</span>
            </div>
          </a>
        </div>
      </section>

      <!-- Social Links Section -->
      <section class="contact-section">
        <h2>{{ t('html.contact.social.title', {}, 'Social Media') }}</h2>
        <div class="social-grid">
          <a v-if="contactInfo.links?.github" :href="contactInfo.links.github" target="_blank" class="social-card github">
            <i class="material-icons">code</i>
            <div class="social-info">
              <span class="social-name">GitHub</span>
              <span class="social-username">@Bryceed</span>
            </div>
          </a>
          
          <a v-if="contactInfo.links?.linkedin" :href="contactInfo.links.linkedin" target="_blank" class="social-card linkedin">
            <i class="material-icons">work</i>
            <div class="social-info">
              <span class="social-name">LinkedIn</span>
              <span class="social-username">wellington-do-nascimento</span>
            </div>
          </a>
          
          <a v-if="contactInfo.links?.whatsapp" :href="contactInfo.links.whatsapp" target="_blank" class="social-card whatsapp">
            <i class="material-icons">chat</i>
            <div class="social-info">
              <span class="social-name">WhatsApp</span>
              <span class="social-username">+55 11 94201-8873</span>
            </div>
          </a>
          
          <a v-if="contactInfo.links?.instagram" :href="contactInfo.links.instagram" target="_blank" class="social-card instagram">
            <i class="material-icons">camera_alt</i>
            <div class="social-info">
              <span class="social-name">Instagram</span>
              <span class="social-username">@wellnas.dev</span>
            </div>
          </a>
        </div>
      </section>
    </div>

    <!-- CV Popup -->
    <CvPopup
      v-if="showCvPopup"
      :type="cvPopupType"
      :current-lang="currentLocale"
      @close="showCvPopup = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTranslation } from '@/composables/useTranslation';
import CvPopup from '@/components/CvPopup.vue';
import about from '@/data/about.json';
import { contactLinks } from '@/utils/contactLinks';

const { t, currentLocale } = useTranslation();

// State
const showCvPopup = ref(false);
const cvPopupType = ref('traditional');

// Contact  information
const contactInfo = computed(() => ({
  email: about.email,
  phone: about.phone,
  links: {
    github: about.links?.github,
    linkedin: about.links?.linkedin,
    whatsapp: contactLinks.whatsapp,
    instagram: about.links?.instagram
  }
}));

// Methods
const formatPhone = (phone) => {
  return phone.replace(/\D/g, '');
};

const openCvPopup = (type) => {
  cvPopupType.value = type;
  showCvPopup.value = true;
};
</script>

<style scoped>
.contact-page {
  width: 100%;
  padding: 0;
}

/* Hero Section */
.contact-hero {
  width: 100%;
  padding: var(--space-20) var(--space-6);
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 100%);
  text-align: center;
  color: var(--text-inverse);
  margin-bottom: var(--space-12);
}

.hero-content {
  max-width: var(--max-width-3xl);
  margin: 0 auto;
}

.hero-icon {
  font-size: 5rem;
  margin-bottom: var(--space-4);
  opacity: 0.9;
}

.contact-hero h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.contact-hero p {
  font-size: var(--text-xl);
  opacity: 0.9;
}

/* Container */
.contact-container {
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  padding: 0 var(--space-6) var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

/* Sections */
.contact-section {
  h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-4);
    color: var(--text-primary);
  }

  p {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    margin-bottom: var(--space-6);
  }
}

/* CV Section */
.cv-section {
  text-align: center;
}

.cv-buttons {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Contact Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.contact-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  text-decoration: none;
  color: var(--text-primary);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  min-height: 120px;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.contact-card i {
  font-size: 2.5rem;
  color: var(--color-primary);
  background: var(--hover-overlay);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.card-content h3 {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-secondary);
}

.contact-value {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-primary);
  word-break: break-all;
}

.contact-note {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* Social Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-4);
}

.social-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  text-decoration: none;
  color: #fff;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  min-height: 80px;
}

.social-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
}

.social-card i {
  font-size: 2.5rem;
  opacity: 0.9;
  flex-shrink: 0;
}

.social-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.social-name {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
}

.social-username {
  font-size: var(--text-sm);
  opacity: 0.85;
}

/* Social Card Colors */
.social-card.github {
  background: linear-gradient(135deg, #24292e 0%, #1a1f24 100%);
}

.social-card.linkedin {
  background: linear-gradient(135deg, #0a66c2 0%, #084d94 100%);
}

.social-card.whatsapp {
  background: linear-gradient(135deg, #25d366 0%, #1ea952 100%);
}

.social-card.instagram {
  background: linear-gradient(135deg, #e1306c 0%, #fd1d1d 50%, #f77737 100%);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contact-hero {
    padding: var(--space-12) var(--space-4);
  }

  .hero-icon {
    font-size: 4rem;
  }

  .contact-hero h1 {
    font-size: var(--text-3xl);
  }

  .contact-hero p {
    font-size: var(--text-lg);
  }

  .contact-container {
    padding: 0 var(--space-4) var(--space-12);
    gap: var(--space-8);
  }

  .contact-section h2 {
    font-size: var(--text-2xl);
  }

  .cv-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .info-grid,
  .social-grid {
    grid-template-columns: 1fr;
  }

  .contact-card {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .social-card {
    justify-content: center;
  }
}
</style>