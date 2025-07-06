<template>
  <section class="about-modern x-sp">
    <MenuOverlay scoop-size="24px" />
    <div id="particles-bg" class="particles-bg"></div>
    <div class="about-modern__container">
      <div class="about-modern__image-wrapper">
        <img
          ref="tiltImg"
          class="about-modern__image"
          :src="about.picture || 'https://avatars.githubusercontent.com/u/42657376?v=4'"
          :alt="getFullName()"
        />
      </div>
      <div class="about-modern__text">
        <h1 v-html="getTranslation('html.home.greetings', { name: 'Wellington' })"></h1>
        <p v-html="getTranslation('html.home.description[0]', { years: personal.age, occupation: 'Full Stack Developer' })"></p>
        <p v-html="getTranslation('html.home.description[1]', { profession1: 'Front-end', profession2: 'UX Design' })"></p>
        <p v-html="getTranslation('html.home.description[2]', { business: currentJob.company || 'N/A', time: currentJob.period || 'N/A' })" v-if="currentJob && currentJob.company !== 'N/A'"></p>
        <p v-html="getTranslation('html.home.description[3]')"></p>
        <div class="about-modern__buttons">
          <NuxtLink to="/about" class="btn btn--primary">
            <i class="material-icons">person</i>
            <span v-html="getTranslation('html.home.actions[2].label')"></span>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn btn--secondary">
            <i class="material-icons">email</i>
            <span v-html="getTranslation('html.home.actions[1].label')"></span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import timeline from '@/data/timeline.json';
import about from '@/data/about.json';
import VanillaTilt from 'vanilla-tilt';
import MenuOverlay from '@/components/common/MenuOverlay.vue';

export default {
  name: 'HomeAboutMe',
  components: { MenuOverlay },
  data() {
    return {
      about: about,
      currentJob: null,
      personal: { age: 0 },
      currentLocale: this.$i18n?.locale || 'pt-BR',
      fallbackLocale: 'en',
      forceUpdate: 0 // contador para forçar reatualização
    };
  },
  mounted() {
    try {
      this.personal.age = this.getPersonalAge();
      this.currentJob = this.getCurrentJob();
      if (this.$refs.tiltImg) {
        VanillaTilt.init(this.$refs.tiltImg, {
          max: 18,
          speed: 500,
          glare: true,
          'max-glare': 0.22,
          scale: 1.08
        });
      }
      // Carregar particles.js do CDN
      if (!window.particlesJS) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.onload = this.initParticles;
        document.body.appendChild(script);
      } else {
        this.initParticles();
      }
      
      // Adicionar listener para evento de mudança de idioma
      document.addEventListener('i18n:localeChanged', this.handleLocaleChange);
      document.addEventListener('languageChanged', this.handleLocaleChange);
      document.addEventListener('i18n:refresh', this.handleLocaleChange);
      
      // Verificar locale atual
      if (this.$i18n && this.$i18n.locale) {
        this.currentLocale = this.$i18n.locale;
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      this.personal.age = 25;
    }
  },
  beforeDestroy() {
    // Remover listeners
    document.removeEventListener('i18n:localeChanged', this.handleLocaleChange);
    document.removeEventListener('languageChanged', this.handleLocaleChange);
    document.removeEventListener('i18n:refresh', this.handleLocaleChange);
    
    // Desconectar o theme observer
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  },
  methods: {
    handleLocaleChange(event) {
      // Atualizar o locale do componente
      if (this.$i18n && this.$i18n.locale) {
        this.currentLocale = this.$i18n.locale;
        // Incrementar contador para forçar re-renderização
        this.forceUpdate++;
      }
    },
    getTranslation(key, params = {}) {
      try {
        // Tentar obter a tradução com o locale atual
        const translation = this.$t(key, params);
        
        // Verificar se é uma chave não traduzida (geralmente retorna a própria chave)
        if (translation === key || translation === '') {
          // Tentar com fallback
          const currentLocale = this.currentLocale;
          const fallbackLocale = this.fallbackLocale;
          
          // Temporariamente mudar para o locale de fallback
          if (this.$i18n.locale) {
            this.$i18n.locale = fallbackLocale;
            const fallbackTranslation = this.$t(key, params);
            // Restaurar locale original
            this.$i18n.locale = currentLocale;
            
            return fallbackTranslation !== key ? fallbackTranslation : key;
          }
        }
        
        return translation;
      } catch (error) {
        console.error(`Error translating key ${key}:`, error);
        return key; // Retornar a chave como fallback final
      }
    },
    getFullName() {
      if (this.about && this.about.name) {
        return `${this.about.name.first} ${this.about.name.middle} ${this.about.name.last}`;
      }
      return 'Wellington do Nascimento';
    },
    getCurrentJob() {
      const today = new Date();
      const jobs = timeline.events
        .filter(event => event.startDate && (!event.endDate || new Date(event.endDate) >= today))
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      if (jobs.length > 0) {
        return {
          ...jobs[0],
          period: this.generateTextJobPeriod(jobs[0].startDate, jobs[0].endDate, this.$i18n.locale)
        };
      }
      return jobs.length > 0 ? jobs[0] : { jobRole: 'Em busca de oportunidade', company: 'N/A' };
    },
    getPersonalAge() {
      if (!this.about || !this.about.birth) return null;
      const { day, month, year } = this.about.birth;
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    initParticles() {
      // Limpa canvas antigo se existir
      const bg = document.getElementById('particles-bg');
      if (bg) {
        Array.from(bg.querySelectorAll('canvas')).forEach(c => c.remove());
      }
      const isDark = document.documentElement.classList.contains('dark');
      const color = isDark ? '#a084fa' : '#5f0de4';
      const bgColor = isDark ? '#222' : '#fff';
      if (window.particlesJS) {
        window.particlesJS('particles-bg', {
          particles: {
            number: { value: 48, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: { type: 'triangle' },
            opacity: { value: 0.22, random: true },
            size: { value: 25, random: true, anim: { enable: true, speed: 2, size_min: 4, sync: false } },
            line_linked: { enable: false },
            move: {
              enable: true,
              speed: 2.2,
              direction: 'top',
              random: false,
              straight: true,
              out_mode: 'out',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: false },
              onclick: { enable: false },
              resize: true
            }
          },
          retina_detect: true,
          background: { color: bgColor }
        });
      }
      if (!this.themeObserver) {
        this.themeObserver = new MutationObserver((mutations) => {
          mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
              setTimeout(() => this.initParticles(), 100);
            }
          });
        });
        this.themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        });
      }
    },
    generateTextJobPeriod(startDate, endDate, lang = this.currentLocale) {
      try {
        if (!startDate) throw new Error('Start date is required');
      } catch (error) {
        console.error('Error generating job period text:', error);
        return '-';
      }
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();
      const options = { year: 'numeric', month: 'short' };
      return `${start.toLocaleDateString(lang, options)} - ${end.toLocaleDateString(lang, options)}`;
    }
  }
};
</script>

<style scoped>
.about-modern {
  width: 100dvw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    position: relative;
    display: flex
;
    justify-content: center;
    align-items: center;
    padding: 9.5rem 0 5.5rem 0;
    background: linear-gradient(180deg, #470de4e6 0%, #cbb2ef00 90%);
    top: -6rem;
    border-radius: 3rem;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
}
.particles-bg {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
.about-modern__container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  overflow: hidden;
}
.about-modern__image-wrapper {
  flex: 1 1 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  max-width: 400px;
  padding: 0 1rem;
}
.about-modern__image {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 6px solid #5f0de4;
  box-shadow: 0 4px 32px 0 rgba(95, 13, 228, 0.18);
  background: #fff;
  object-fit: cover;
  transition: box-shadow 0.3s, border 0.3s;
}
.about-modern__image:hover {
  box-shadow: 0 8px 48px 0 #5f0de444;
  border: 6px solid #a084fa;
}
.about-modern__text {
  flex: 2 1 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.2rem;
  color: #fff;
  text-align: left;
  padding: 0 1rem;
}
.about-modern__text h1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: #5f0de4;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  text-shadow: -1px -1px 0px rgba(255, 255, 255, 0.5), 
                1px -1px 0px rgba(255, 255, 255, 0.5), 
                -1px 1px 0px rgba(255, 255, 255, 0.2), 
                1px 1px 0px rgba(255, 255, 255, 0.2),
                0px 0px 4px rgba(95, 13, 228, 1);
}
.about-modern__text p {
  font-size: 1.15rem;
  color: #e0e0e0;
  margin-bottom: 0.2rem;
  line-height: 1.5;
}
.about-modern__buttons {
  display: flex;
  gap: 1.2rem;
  margin-top: 1.2rem;
}
.about-modern__buttons .btn {
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.7rem 1.6rem;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(95, 13, 228, 0.08);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.about-modern__buttons .btn--primary {
  background: linear-gradient(90deg, #5f0de4 0%, #a084fa 100%);
  color: #fff;
}
.about-modern__buttons .btn--primary:hover {
  background: linear-gradient(90deg, #a084fa 0%, #5f0de4 100%);
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}
.about-modern__buttons .btn--secondary {
  background: #fff;
  color: #5f0de4;
  border: 2px solid #5f0de4;
}
.about-modern__buttons .btn--secondary:hover {
  background: #f3f3f3;
  color: #5f0de4;
  border: 2px solid #a084fa;
  transform: translateY(-2px) scale(1.04);
}
@media (max-width: 900px) {
  .about-modern__container {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  .about-modern__image-wrapper {
    max-width: 260px;
    min-width: 160px;
    margin-bottom: 1.5rem;
  }
  .about-modern__text {
    align-items: center;
    text-align: center;
    padding: 0;
  }
  .about-modern__text h1 {
    font-size: 2rem;
  }
  .about-modern {
    min-width: 100vw;
    width: 100vw;
    padding: 2rem 0 1rem 0;
  }
  .particles-bg {
    width: 100vw;
    height: 100%;
  }
}
@media (max-width: 600px) {
  .about-modern__container {
    padding: 1.2rem 0.2rem;
    border-radius: 1rem;
  }
  .about-modern__image-wrapper {
    max-width: 140px;
    min-width: 100px;
    padding: 0;
  }
  .about-modern__image {
    max-width: 120px;
    border-width: 3px;
  }
  .about-modern__text h1 {
    font-size: 1.3rem;
  }
  .about-modern__buttons .btn {
    font-size: 0.95rem;
    padding: 0.5rem 1.1rem;
  }
  .about-modern {
    min-width: 100vw;
    width: 100vw;
    padding: 1.2rem 0 0.5rem 0;
  }
  .particles-bg {
    width: 100vw;
    height: 100%;
  }
}
</style>
