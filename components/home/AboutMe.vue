<template>
  <section class="about-hero">
    <div class="particles-bg" ref="particlesBg"></div>
    <div class="about-container">
      <div class="about-image-wrapper">
        <img
          ref="tiltImg"
          class="about-image"
          :src="aboutData.picture || 'https://avatars.githubusercontent.com/u/42657376?v=4'"
          :alt="fullName"
          loading="eager"
        />
      </div>
      <div class="about-content">
        <h1 class="about-title" v-html="t('html.home.greetings', { name: aboutData.name.first }, `Hi, I'm ${aboutData.name.first}!`)">
        </h1>
        <p class="about-description" v-html="t('html.home.description[0]', { years: age, occupation: 'Full Stack Developer' }, `I'm ${age} years old and work as a Full Stack Developer`)">
        </p>
        <p class="about-description" v-if="currentJobText">
          <span v-html="currentJobText"></span>
        </p>
        <p class="about-description">
          {{ t('html.home.description[3]', {}, 
             'Passionate about creating amazing digital experiences') }}
        </p>
        <div class="about-actions">
          <NuxtLink to="/about" class="btn btn-primary">
            <i class="material-icons">person</i>
            <span>{{ t('html.home.actions[0]', {}, 'About Me') }}</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn btn-secondary">
            <i class="material-icons">email</i>
            <span>{{ t('html.home.actions[1]', {}, 'Contact') }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useTranslation } from '@/composables/useTranslation';
import VanillaTilt from 'vanilla-tilt';
import aboutData from '@/data/about.json';
import timeline from '@/data/timeline.json';

const { t, currentLocale } = useTranslation();

// Refs
const tiltImg = ref(null);
const particlesBg = ref(null);
let themeObserver = null;

// Calculate age correctly
const age = computed(() => {
  if (!aboutData.birth) return 25;
  
  const { year, month, day } = aboutData.birth;
  const birthDate = new Date(year, month - 1, day); // month is 0-indexed in JS
  const today = new Date();
  
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust if birthday hasn't occurred this year yet
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    calculatedAge--;
  }
  
  return calculatedAge;
});

// Full name
const fullName = computed(() => {
  if (!aboutData.name) return 'Wellington do Nascimento';
  return `${aboutData.name.first} ${aboutData.name.middle} ${aboutData.name.last}`;
});

// Current job
const currentJob = computed(() => {
  const today = new Date();
  const jobs = timeline.events
    .filter(event => event.startDate && (!event.endDate || new Date(event.endDate) >= today))
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  
  return jobs.length > 0 ? jobs[0] : null;
});

// Current job text with proper translation
const currentJobText = computed(() => {
  if (!currentJob.value || !currentJob.value.company || currentJob.value.company === 'N/A') {
    return '';
  }
  
  const period = calculateJobPeriod(currentJob.value.startDate, currentJob.value.endDate);
  
  return t('html.home.description[2]', 
    { business: currentJob.value.company, time: period },
    `Working at ${currentJob.value.company} for ${period}`
  );
});

// Calculate job period based on locale
const calculateJobPeriod = (startDate, endDate) => {
  if (!startDate) return '-';
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  
  if (end.getDate() < start.getDate()) months--;
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const locale = currentLocale.value.split('-')[0];
  
  const translations = {
    pt: (y, m) => {
      if (y === 0 && m === 0) return 'menos de 1 mês';
      if (y === 0) return `${m} ${m === 1 ? 'mês' : 'meses'}`;
      if (m === 0) return `${y} ${y === 1 ? 'ano' : 'anos'}`;
      return `${y} ${y === 1 ? 'ano' : 'anos'} e ${m} ${m === 1 ? 'mês' : 'meses'}`;
    },
    en: (y, m) => {
      if (y === 0 && m === 0) return 'less than 1 month';
      if (y === 0) return `${m} month${m !== 1 ? 's' : ''}`;
      if (m === 0) return `${y} year${y !== 1 ? 's' : ''}`;
      return `${y} year${y !== 1 ? 's' : ''} and ${m} month${m !== 1 ? 's' : ''}`;
    },
    es: (y, m) => {
      if (y === 0 && m === 0) return 'menos de 1 mes';
      if (y === 0) return `${m} mes${m !== 1 ? 'es' : ''}`;
      if (m === 0) return `${y} año${y !== 1 ? 's' : ''}`;
      return `${y} año${y !== 1 ? 's' : ''} y ${m} mes${m !== 1 ? 'es' : ''}`;
    }
  };
  
  const fn = translations[locale] || translations.en;
  return fn(years, months);
};

// Initialize particles.js
const initParticles = () => {
  // Clean old canvas
  if (particlesBg.value) {
    const canvases = particlesBg.value.querySelectorAll('canvas');
    canvases.forEach(c => c.remove());
  }
  
  const isDark = document.documentElement.classList.contains('dark');
  const color = isDark ? '#a084fa' : '#5f0de4';
  
  if (window.particlesJS && particlesBg.value) {
    window.particlesJS('particles-bg', {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: color },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: false }, onclick: { enable: false } }
      },
      retina_detect: true
    });
  }
};

// Load particles script
const loadParticlesScript = () => {
  if (window.particlesJS) {
    initParticles();
    return;
  }
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
  script.onload = initParticles;
  document.body.appendChild(script);
};

onMounted(() => {
  // Initialize tilt effect
  if (tiltImg.value) {
    VanillaTilt.init(tiltImg.value, {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.3,
      scale: 1.05
    });
  }
  
  // Load particles
  loadParticlesScript();
  
  // Watch theme changes
  themeObserver = new MutationObserver(() => {
    setTimeout(initParticles, 100);
  });
  
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});

onBeforeUnmount(() => {
  if (themeObserver) {
    themeObserver.disconnect();
  }
});
</script>

<style scoped>
.about-hero {
  position: relative;
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-5);
  background: linear-gradient(135deg, 
    var(--color-primary-dark) 0%, 
    var(--color-primary) 50%, 
    var(--color-primary-light) 100%);
  overflow: hidden;
  margin: calc(var(--space-8) * -1) 0 var(--space-12);
}

.particles-bg {
  position: absolute;
  inset: 0;
  z-index: var(--z-base);
  pointer-events: none;
}

.about-container {
  position: relative;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-16);
  max-width: var(--max-width-6xl);
  width: 100%;
  padding: var(--space-8);
}

.about-image-wrapper {
  flex: 0 0 auto;
}

.about-image {
  width: 280px;
  height: 280px;
  border-radius: var(--radius-full);
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-xl);
  object-fit: cover;
  transform-style: preserve-3d;
  transition: all var(--transition-base);
}

.about-image:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.about-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  color: var(--text-inverse);
  max-width: 600px;
}

.about-title {
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  line-height: var(--leading-tight);
  margin: 0;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
}

.about-description {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  opacity: 0.95;
  margin: 0;
}

.about-actions {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .about-hero {
    min-height: auto;
    padding: var(--space-12) var(--space-4);
  }
  
  .about-container {
    flex-direction: column;
    gap: var(--space-8);
    padding: var(--space-6);
  }
  
  .about-image {
    width: 200px;
    height: 200px;
  }
  
  .about-content {
    text-align: center;
    align-items: center;
  }
  
  .about-title {
    font-size: var(--text-3xl);
  }
  
  .about-description {
    font-size: var(--text-base);
  }
  
  .about-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .about-actions .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .about-image {
    width: 160px;
    height: 160px;
  }
  
  .about-title {
    font-size: var(--text-2xl);
  }
}
</style>
