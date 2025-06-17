<template>
  <div class="contact-page">
    <div class="contact-header">
      <h1>{{ $t('html.contact.title') }}</h1>
      <p>{{ $t('html.contact.description') }}</p>
    </div>
    <div class="contact-content">
      <div class="contact-form-container">
        <h2>{{ $t('html.contact.form.title') }}</h2>
        <form class="contact-form" @submit.prevent="sendEmail">
          <div class="form-group">
            <label for="name">{{ $t('html.contact.form.name') }}</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              :placeholder="$t('html.contact.form.namePlaceholder')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">{{ $t('html.contact.form.email') }}</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              :placeholder="$t('html.contact.form.emailPlaceholder')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="subject">{{ $t('html.contact.form.subject') }}</label>
            <input 
              type="text" 
              id="subject" 
              v-model="formData.subject" 
              :placeholder="$t('html.contact.form.subjectPlaceholder')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="message">{{ $t('html.contact.form.message') }}</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              :placeholder="$t('html.contact.form.messagePlaceholder')" 
              rows="5" 
              required
            ></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">
            <i class="material-icons">send</i>
            {{ $t('html.contact.form.submit') }}
          </button>
        </form>
        
        <div class="contact-divider">
          <span>{{ $t('html.contact.form.divider') }}</span>
        </div>
      </div>
      
      <div class="contact-info">
        <div class="contact-methods">
          <div class="contact-method">
            <h3>Email</h3>
            <a :href="'mailto:' + contactInfo.email">{{ contactInfo.email }}</a>
          </div>
          
          <div class="contact-method">
            <h3>WhatsApp</h3>
            <a :href="'https://api.whatsapp.com/send?phone=' + formatPhone(contactInfo.phone)" target="_blank">
              {{ contactInfo.phone }}
            </a>
          </div>
          
          <div class="social-links">
            <h3>{{ $t('html.contact.social.title') }}</h3>
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
import contactData from '@/data/contact.json';

export default {
  name: "ContactPage",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      contactInfo: {
        email: about.email || 'hello@wellington.dev',
        phone: about.phone || '+55 11 94201-8873',
        links: about.links || {},
        cvFile: contactData.cvFile || '/files/cv/Wellington.pdf'
      }
    };
  },
  methods: {
    formatPhone(phone) {
      return phone ? phone.replace(/\D/g, '') : '';
    },
    sendEmail() {
      // Criar o mailto link com os dados do formulário
      const subject = encodeURIComponent(this.formData.subject);
      const body = encodeURIComponent(
        `Nome: ${this.formData.name}\n` +
        `Email: ${this.formData.email}\n\n` +
        `${this.formData.message}`
      );
      
      // Abrir o cliente de email padrão do usuário com os campos preenchidos
      window.location.href = `mailto:${this.contactInfo.email}?subject=${subject}&body=${body}`;
      
      // Resetar formulário após envio
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  },
  mounted() {
    if (typeof this.$t === 'function') {
      document.title = this.$t('html.contact.title') + " | Portfolio";
    } else {
      document.title = "Contact | Portfolio";
    }
  }
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

.contact-content {  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
  }
  
  .social-links {
    h3 {
      margin: 0 0 1rem;
      font-size: 1.2rem;
      font-weight: 600;
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