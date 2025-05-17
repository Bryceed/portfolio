<template>  <div class="contact-page">
    <div class="contact-header">
      <h1>{{ $t('html.contact.title') }}</h1>
      <p>{{ $t('html.contact.description') }}</p>
    </div>

    <div class="contact-content">
      <div class="contact-methods">
        <div class="contact-card">
          <div class="contact-icon">
            <i class="material-icons">email</i>
          </div>
          <h3>Email</h3>
          <p>{{ about.email }}</p>
          <a :href="contactLinks.email" class="btn btn--primary">
            {{ $t('html.contact.buttons.sendEmail') }}
          </a>
        </div>

        <div class="contact-card">
          <div class="contact-icon">
            <i class="material-icons">message</i>
          </div>
          <h3>WhatsApp</h3>
          <p>{{ about.phone }}</p>
          <a :href="contactLinks.whatsapp" target="_blank" class="btn btn--primary">
            {{ $t('html.contact.buttons.sendMessage') }}
          </a>
        </div>

        <div class="contact-card">
          <div class="contact-icon">
            <i class="material-icons">description</i>
          </div>
          <h3>{{ $t('html.contact.cv.title') }}</h3>
          <p>{{ $t('html.contact.cv.description') }}</p>
          <a href="/files/cv/Wellington.pdf" target="_blank" class="btn btn--primary">
            {{ $t('html.contact.buttons.downloadCV') }}
          </a>
        </div>
      </div>

      <div class="contact-form-section">
        <h2>{{ $t('html.contact.form.title') }}</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">{{ $t('html.contact.form.name') }}</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              :placeholder="$t('html.contact.form.namePlaceholder')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">{{ $t('html.contact.form.email') }}</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              :placeholder="$t('html.contact.form.emailPlaceholder')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="subject">{{ $t('html.contact.form.subject') }}</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              :placeholder="$t('html.contact.form.subjectPlaceholder')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="message">{{ $t('html.contact.form.message') }}</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              :placeholder="$t('html.contact.form.messagePlaceholder')" 
              rows="5" 
              required
            ></textarea>
          </div>
            <button type="submit" class="btn btn--primary btn--full" :disabled="isSubmitting">
            <span v-if="isSubmitting"><i class="material-icons spin">sync</i></span>
            <span v-else>{{ $t('html.contact.form.submit') }}</span>
          </button>
          
          <div v-if="formStatus" :class="['form-status', formStatus.type]">
            {{ formStatus.message }}
          </div>
          
          <div class="form-divider">
            <span class="divider-line"></span>
            <span class="divider-text">{{ $t('html.contact.form.divider') }}</span>
            <span class="divider-line"></span>
          </div>
          
          <a :href="contactLinks.whatsapp" target="_blank" class="btn btn--whatsapp round">
            <i class="i-akar-icons-whatsapp-fill"></i>
            <span>{{ $t('html.contact.buttons.whatsappAlternative') }}</span>
          </a>
        </form>
      </div>

      <div class="social-media-section">
        <h2>{{ $t('html.contact.social.title') }}</h2>
        <div class="social-links">
          <a :href="contactLinks.github" target="_blank" class="social-link">
            <div class="social-icon github">
              <span class="i-akar-icons-github-fill"></span>
            </div>
            <span>GitHub</span>
          </a>
          <a :href="contactLinks.linkedin" target="_blank" class="social-link">
            <div class="social-icon linkedin">
              <span class="i-akar-icons-linkedin-fill"></span>
            </div>
            <span>LinkedIn</span>
          </a>
          <a href="https://discord.gg/uYvVeha" target="_blank" class="social-link">
            <div class="social-icon discord">
              <span class="i-akar-icons-discord-fill"></span>
            </div>
            <span>Discord</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageTitle } from '@/utils/pageTitle';
import { contactLinks } from '@/utils/contactLinks';
import { contact } from '@/data/contact.json';
import about from '@/data/about.json';

export default {
  name: "ContactPage",
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      formStatus: null,
      contactLinks,
      about: about,
    };
  },
  methods: {
    submitForm() {
      this.isSubmitting = true;
      this.formStatus = null;
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Success
        this.formStatus = {
          type: 'success',
          message: this.$t('html.contact.form.success')
        };
        this.isSubmitting = false;
        this.resetForm();
      }, 1500);
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
        isSubmitting: false,
        formStatus: null
      };
    },
    openLink(link) {
      window.open(link, '_blank');
    }
  },
  mounted() {
    document.title = getPageTitle({ mainPage: 'Contact' });
  }
};
</script>

<style scoped>
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
  gap: 3rem;
  padding-bottom: 3rem;
}

/* Contact Methods */
.contact-methods {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  order: 3;
}

.contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.contact-icon i {
  font-size: 2rem;
  color: #fff;
}

.contact-card h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.contact-card p {
  margin-bottom: 1.5rem;
  color: var(--text-muted);
}

/* Contact Form */
.contact-form-section {
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  order: 2;
}

.contact-form-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 1rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.btn--primary {
  background-color: var(--primary-color);
  color: #fff;
}

.btn--primary:hover {
  background-color: var(--secondary-color);
}

.btn--whatsapp {
  background-color: #25D366;
  color: #fff;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn--whatsapp:hover {
  background-color: #128C7E;
}

.btn--full {
  width: 100%;
}

.form-status {
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
}

.form-status.success {
  background-color: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}

.form-status.error {
  background-color: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-divider {
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem;
  gap: 15px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

html.light .divider-line {
  background-color: rgba(0, 0, 0, 0.1);
}

.divider-text {
  color: var(--text-muted);
  font-size: 0.9rem;
  white-space: nowrap;
}

/* Social Media */
.social-media-section {
  margin-top: 1rem;
  text-align: center;
  order: 1;
}

.social-media-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-color);
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-5px);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.5rem;
}

.social-icon.github {
  background-color: #333;
  color: #fff;
}

.social-icon.linkedin {
  background-color: #0077b5;
  color: #fff;
}

.social-icon.discord {
  background-color: #7289da;
  color: #fff;
}

/* Media Queries */
@media (min-width: 768px) {
  .contact-page {
    padding: 0 2rem;
  }

  .contact-methods {
    grid-template-columns: repeat(3, 1fr);
  }

  .form-group input,
  .form-group textarea {
    font-size: 1.1rem;
  }
}

@media (min-width: 1024px) {
  .contact-header {
    margin: 3rem 0 4rem;
  }

  .contact-header h1 {
    font-size: 3rem;
  }

  .contact-content {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .contact-methods {
    order: 3;
    width: 100%;
  }

  .contact-form-section {
    order: 2;
    flex: 1 1 60%;
  }

  .social-media-section {
    order: 1;
    width: 100%;
    margin-top: 3rem;
  }
}

/* Light theme adjustments */
html.light .contact-card,
html.light .contact-form-section {
  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

html.light .form-group input,
html.light .form-group textarea {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
}
</style>