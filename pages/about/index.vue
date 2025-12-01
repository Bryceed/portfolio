<template>  
  <div>
    <div class="about-page">
      
      <!-- Hero Card mais elaborado -->
      <div class="hero-card">
        <!-- Background com máscara de gradiente -->
        <div class="hero-card__bg">
          <div class="hero-card__bg-image"></div>
        </div>
        
        <div class="hero-card__profile">
          <div class="hero-card__profile-image">
            <img :src="about.picture" alt="Wellington do Nascimento" onerror="this.src='https://avatars.githubusercontent.com/u/56080521?v=4'" />
          </div>
          <div class="hero-card__profile-info">
            <h1>Wellington do Nascimento</h1>
            <p>{{ $t('html.about.description') }}</p>
          </div>
        </div>
      </div>

      <div class="about-content">
        <div class="about-section personal-info">
          <h2>{{ $t('html.about.personal.title') }}</h2>
          <div class="info-grid">
            <div class="info-item">
              <i class="material-icons">person</i>
              <div>
                <h3>{{ $t('html.about.personal.name.label') }}</h3>
                <p>Wellington do Nascimento</p>
              </div>
            </div>
            <div class="info-item">
              <i class="material-icons">cake</i>
              <div>
                <h3>{{ $t('html.about.personal.age.label') }}</h3>
                <p>{{ $t('html.about.personal.age.value', { age: personalAge(), date: personalBirthDate() }) }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="material-icons">location_on</i>
              <div>
                <h3>{{ $t('html.about.personal.location.label') }}</h3>
                <p>Rio de Janeiro, Brasil</p>
                <p>São Paulo, Brasil</p>
              </div>
            </div>
            <div class="info-item">
              <i class="material-icons">school</i>
              <div>
                <h3>{{ $t('html.about.personal.education.label') }}</h3>
                <p>Engenharia da Computação</p>
              </div>
            </div>
            <div class="info-item">
              <i class="material-icons">work</i>
              <div>
                <h3>{{ $t('html.about.personal.occupation.label') }}</h3>
                <p>Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-section experience bg-transparent">
          <h2>{{ $t('html.about.experience.title') }}</h2>
          <div class="timeline">
            <template v-for="year in Object.keys(groupedEvents).sort((a,b) => b - a)" :key="year">
              <div class="timeline-year">
                <span class="year-label">{{ year }}</span>
                <div class="timeline-year-events">
                  <div class="timeline-connection-line"></div>
                  <div v-for="event in groupedEvents[year]" 
                      :key="event.id" 
                      class="timeline-item"
                      :class="{'timeline-formation': event.formationType}"
                      :style="{'--event-color': event.color || '#6a4caf'}">
                    <div class="timeline-marker">
                      <div class="timeline-dot"></div>
                      <div class="timeline-connector"></div>
                    </div>
                    <div class="timeline-content">
                      <div class="timeline-header">
                        <div class="timeline-company" v-if="event.company || event.formationType">
                          <img v-if="event.companyLogo" :src="event.companyLogo" :alt="event.company" class="company-logo" @error="$event.target.src = event.companyLogoFallback || ''">
                          <span class="company-name">{{ event.company || event.formationType }}</span>
                          <button v-if="event.companyLink" class="company-website" @click="openLink(event.companyLink)">
                            <!-- use o ícone de globo meridiano do Akar Icons -->
                            <i class="i-akar-icons-globe"></i>
                            <span>{{ $t('html.about.experience.company.button') }}</span>
                          </button>
                        </div>
                        <span class="timeline-date">{{ event.date || `${year} - ${event.formationOngoing ? 'Presente' : event.formationPredictedEndDate?.split('-')[0] || 'Presente'}` }}</span>
                        
                      </div>
                      <h3>{{ event.jobRole || event.formationRole || event.title }}</h3>
                      <p>{{ event.jobDescription || event.formationDescription || event.description }}</p>
                      <div class="timeline-tags" v-if="event.jobtags || event.formationtags || event.tags">
                        <span v-for="tag in (event.jobtags || event.formationtags || event.tags)" 
                              :key="tag" 
                              class="tag">{{ tag }}</span>
                      </div>
                      <div class="timeline-meta">
                        <span v-if="event.jobLocation || event.formationLocation" class="meta-item">
                          <i class="material-icons">location_on</i>
                          {{ event.jobLocation || event.formationLocation }}
                        </span>
                        <span v-if="event.jobContract || event.formationType" class="meta-item">
                          <i class="material-icons">{{ event.formationType ? 'school' : 'work' }}</i>
                          {{ event.jobContract || event.formationType }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="about-section skills">
          <h2>{{ $t('html.about.skills.title') }}</h2>
          <div class="skills-grid">
            <div class="skill-category">            
              <template v-for="category in skills" :key="category.name">
                <h3>{{ category.name }} {{ category.emoji }}</h3>
                <div class="skill-tags">
                  <span v-for="skill in category.items" :key="skill.name" class="skill-tag" :title="'Proficiency: ' + skill.value + '/5'">
                    {{ skill.name }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="about-section personality">
          <h2>{{ $t('html.about.personality.title') }}</h2>
          <p>{{ $t('html.about.personality.description') }}</p>
          <NuxtLink to="/about/personality-test" class="btn btn--primary">
            <i class="material-icons">psychology</i>
            <span>{{ $t('html.about.personality.button') }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import skills from '@/data/skills.json';
import { getPageTitle } from '@/utils/pageTitle';
import { contactLinks } from '@/utils/contactLinks';
import about from '@/data/about.json';
import timeline from '@/data/timeline.json';

export default {
  name: "AboutPage",
  data() {
    return {
      about,
      contactLinks,
      skills: skills,
      timelineEvents: timeline.events
    };
  },
  computed: {
    groupedEvents() {
      const grouped = {};
      this.timelineEvents.forEach(event => {
        const year = event.startDate ? new Date(event.startDate).getFullYear() : 
                    event.date ? parseInt(event.date.split('/')[2] || event.date.split(' - ')[0]) : 
                    new Date().getFullYear();
        
        if (!grouped[year]) {
          grouped[year] = [];
        }
        grouped[year].push(event);
      });
      return grouped;
    }
  },
  methods: {
    openLink(link) {
      window.open(link, '_blank');
    },
    personalAge() {
      // birth is a object with day, month and year
      if (!this.about || !this.about.birth) {
        return null;
      }
      const { day, month, year } = this.about.birth;
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },    personalBirthDate() {
      if (!this.about || !this.about.birth) {
        return null;
      }
      const { day, month, year } = this.about.birth;
      // Extrair o código do idioma como string e garantir que seja válido
      const locale = typeof this.$i18n.locale === 'string' ? this.$i18n.locale : 'en-US';
      
      try {
        return new Date(year, month - 1, day).toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        console.warn('Error formatting date with locale', locale, error);
        // Fallback para o formato padrão se houver erro
        return new Date(year, month - 1, day).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
  },
  mounted() {
    document.title = getPageTitle({ mainPage: 'About | WellNas.dev' });
  }
};
</script>

<style scoped lang="scss">
.about-page {
  position: relative;
  padding: 4rem 0;
  z-index: 2; /* Assegura que o conteúdo fique acima do background */
}

.hero-card {
  overflow: visible; /* Alterado para visible para não cortar elementos */
  position: relative;
  padding-top: 3rem;
  z-index: 1; /* Acima do background, mas abaixo do menu principal */
}

.hero-card__bg {
  position: absolute;
  top: 0.1rem;
  width: calc(100dvw);
  left: 50%;
  transform: translateX(-50%);
  height: 100vmax; /* Fixed height for the background */
  z-index: 0; /* Colocado abaixo do conteúdo */
  overflow: hidden;
  pointer-events: none; /* Permite cliques nos elementos abaixo */
  border-radius: 0.5rem;
}

.hero-card__bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1728920315854-0f965ba2379d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  
  /* Aplicamos a máscara apenas à imagem de fundo */
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
  opacity: 1;
}

@media (min-width: 768px) {
  :root {
    --header-height: calc(40px + 4rem);
  }
  
  /* Use JS or add a scroll listener to toggle this class */
  body.scrolled-past-hero .hero-card__menu-overlay {
    opacity: 0;
    pointer-events: none;
  }
  
  /* Ajuste para melhorar a renderização em telas maiores */
  .hero-card__bg {
    height: 100vh;
  }
}

.hero-card__profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 2; /* Garantir que fique acima do background */
}

.hero-card__profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 .5rem 0.5rem rgba(0, 0, 0, 0.5);
}

.hero-card__profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-card__profile-info {
  color: #fff;
  width: 100%;
  text-align: center;
}

.hero-card__profile-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 .5rem 0.5rem rgba(0, 0, 0, 0.5);
}

.hero-card__profile-info p {
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.5;
  margin: 0 auto;
}

.hero-card__profile-info a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.hero-card__profile-info a:hover {
  text-decoration: underline;
}

.hero-card__profile-info a i {
  margin-right: 0.5rem;
}

.hero-card__profile-info a span {
  font-size: 1.2rem;
}

.hero-card__profile-info a span:hover {
  text-decoration: underline;
}

html.light .hero-card {
  color: var(--light-text-color);
  transition: all 0.3s ease;

  .hero-card__bg-image {
    background-image: url('https://images.unsplash.com/photo-1728920315854-0f965ba2379d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  }
  .hero-card__bg-image:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .2);
  }

  .hero-card__profile-info h1,
  .hero-card__profile-info p,
  .hero-card__profile-info a {
    color: var(--light-text-color);
  }

  .hero-card__profile-info a:hover,
  .hero-card__profile-info a span:hover {
    color: var(--light-primary-color);
  }

  .hero-card__profile-info a i {
    color: var(--light-primary-color);
  }

  .hero-card__profile-info a span {
    color: var(--light-text-color);
  }

  .hero-card__profile-info a span:hover {
    color: var(--light-primary-color);
  }

}

.about-page {
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 20px 4rem;
}

.about-header {
  text-align: center;
  margin: 2rem 0 3rem;
  padding-top: 2rem;
}

.about-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.about-header p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 3rem;
  z-index: 1;
  position: relative;
}

.about-section {
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: rgba(34, 34, 34, 0.4);
  box-shadow: 0 4px 6px rgba(var(--dark-card-background-color), 0.1);
  backdrop-filter: blur(20px);
  z-index: 0;
  position: relative;
}

.about-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  color: var(--dark-text-color);
  font-weight: 900;
}

/* Personal info section */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-item i {
  font-size: 2rem;
  color: var(--primary-color);
}

.info-item h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: var(--secondary-color);
}

.info-item p {
  font-size: 1.1rem;
}

/* Timeline section */
.timeline {
  position: relative;
}

.timeline-year {
  position: relative;
  display: flex;
  gap: 3rem;
}

.year-label {
  flex-shrink: 0;
  width: 100px;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--dark-text-color);
  text-align: right;
  padding-top: .75rem;
  opacity: 0.4;
  letter-spacing: -1px;
}

.timeline-year-events {
  position: relative;
  flex-grow: 1;
  padding-left: 3rem;
}

.timeline-connection-line {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: rgba(var(--dark-primary-color-rgb), 0.15);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.2)
}

.timeline-item:hover {
  background: rgba(var(--dark-primary-color-rgb), 0.1);
}

.timeline-item.timeline-formation {
  background: rgba(var(--dark-primary-color-rgb), 0.05);
}

.timeline-marker {
  position: absolute;
  left: -3.25rem;
  top: 2rem;
  height: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: var(--event-color);
  border: 4px solid var(--dark-background-color);
  border-radius: 50%;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(var(--event-color-rgb), 0.1);
}

.timeline-connector {
  position: absolute;
  left: 50%;
  top: 65px;
  bottom: -2rem;
  width: 3px;
  background: var(--event-color);
  opacity: 0.3;
  transform: translateX(-50%);
}

.timeline-year:last-of-type .timeline-year-events:last-of-type .timeline-item:last-child .timeline-connector {
  bottom: 2rem;
}

.timeline-content {
  position: relative;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.timeline-date {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--event-color);
  opacity: 0.9;
}

.timeline-company {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.company-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 6px;
}

.company-name {
  font-weight: 600;
  color: var(--event-color);
}

.timeline-company .company-website {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--event-color);
  font-size: 1.2rem;
  position: relative;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  height: 1.25rem;
  padding: 0 .3rem;
  border-radius: 4rem;
  border: thin solid var(--event-color);
  margin-left: 0.5rem;
  top: -0.05rem;
}
.timeline-company .company-website:before {
  content: '';
  position: absolute;
  background: var(--event-color);
  border-radius: 4rem;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  opacity: 0.15;
}
.timeline-company .company-website i.material-icons {
  font-size: 1rem;
  color: var(--event-color);
  position: relative;
  top: 0.1rem;
}
.timeline-company .company-website span {
  font-size: 0.8rem;
  color: var(--event-color);
  text-decoration: none;
  font-weight: 400;
  text-transform: uppercase;
}

.timeline-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--dark-text-color);
  margin-bottom: 0.75rem;
}

.timeline-content p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--dark-text-color);
  opacity: 0.85;
  margin-bottom: 1.25rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: transparent;
  color: var(--event-color);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
}
.tag:before {
  content: '';
  position: absolute;
  background: var(--event-color);
  color: var(--event-color);
  border-radius: 4rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.15;
}

.timeline-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--dark-text-color);
  opacity: 0.8;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-item i {
  font-size: 1rem;
}

@media (max-width: 768px) {

  // background header vai ter a largura total
  .hero-card__bg {
    width: 100vw;
    left: -1.25rem;
    transform: none;
  }
  .hero-card__menu-overlay {
    height: calc(34px + 2rem);
  }

  // header content in rows
  .hero-card__profile {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .year-label {
    width: 1ch; /* Adjust width to fit one character */
    font-size: 1.5rem; /* Keep or adjust font size as needed */
    writing-mode: vertical-rl; /* Display text vertically */
    text-orientation: mixed; /* Ensure characters are upright */
    white-space: pre-wrap; /* Allow wrapping for each character */
    word-break: break-all; /* Break words at any character */
    text-align: center; /* Center the characters vertically */
    padding-top: 0; /* Adjust padding as needed */
    padding-right: 0.5rem; /* Add some padding to the right */
    letter-spacing: 0; /* Reset letter-spacing if not needed */
  }
  
  .timeline-year {
    gap: 1rem; /* Reduce gap for mobile */
  }
  
  .timeline-year-events {
    padding-left: 1.5rem; /* Reduce padding for mobile */
  }
  
  .timeline-item {
    padding: 1rem; /* Reduce padding for mobile */
    margin-bottom: 2rem; /* Adjust margin for mobile */
  }
  
  .timeline-marker {
    left: -2.75rem; /* Adjust position for mobile */
    top: 1.5rem; /* Adjust position for mobile */
  }
  
  .timeline-dot {
    width: 14px; /* Adjust size for mobile */
    height: 14px; /* Adjust size for mobile */
    border-width: 3px; /* Adjust border for mobile */
  }

  .timeline-connector {
    top: 45px; /* Adjust position for mobile */
  }

  .timeline-header {
    flex-direction: column; /* Stack header items vertically */
    align-items: flex-start; /* Align items to the start */
    gap: 0.5rem; /* Add gap between stacked items */
  }

  .timeline-date {
    font-size: 1rem; /* Adjust font size for mobile */
  }

  .company-logo {
    width: 24px; /* Adjust size for mobile */
    height: 24px; /* Adjust size for mobile */
  }

  .company-name {
    font-size: 0.9rem; /* Adjust font size for mobile */
  }

  .timeline-company .company-website {
    font-size: 0.8rem; /* Adjust font size for mobile */
    padding: 0 0.2rem; /* Adjust padding for mobile */
    height: 1.1rem; /* Adjust height for mobile */
  }

  .timeline-company .company-website i.material-icons {
    font-size: 0.9rem; /* Adjust icon size for mobile */
  }

  .timeline-company .company-website span {
    font-size: 0.7rem; /* Adjust text size for mobile */
  }

  .timeline-content h3 {
    font-size: 1.1rem; /* Adjust font size for mobile */
  }

  .timeline-content p {
    font-size: 0.9rem; /* Adjust font size for mobile */
    margin-bottom: 1rem; /* Adjust margin for mobile */
  }

  .tag {
    font-size: 0.75rem; /* Adjust font size for mobile */
    padding: 0.2rem 0.6rem; /* Adjust padding for mobile */
  }

  .meta-item {
    font-size: 0.8rem; /* Adjust font size for mobile */
  }

  .meta-item i {
    font-size: 0.9rem; /* Adjust icon size for mobile */
  }
}

/* Light theme adaptations */
html.light .timeline-connection-line {
  background: rgba(var(--light-primary-color-rgb), 0.15);
}

html.light .timeline-item:not(.timeline-formation) {
  background: rgba(231, 231, 231, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

html.light .timeline-item {
  h3, p, .timeline-meta {
    color: var(--light-text-color);
  }
}

html.light .timeline-item.timeline-formation {
  background: rgba(var(--light-primary-color-rgb), 0.05);

  h3, p, .timeline-meta, .timeline-company, .timeline-date {
    text-shadow: 1px 1px 1px rgba(255,255,255,.2);
  }

  .timeline-company, .timeline-date {
    position: relative;
    margin-bottom: 1rem;
  }

  .timeline-company:before, .timeline-date:before {
    content: '';
    position: absolute;
    background: rgba(255,255,255,.34);
    border-radius: 4rem;
    top: -0.5rem;
    left: -2rem;
    width: calc(100% + 4rem);
    height: calc(100% + 1rem);
    z-index: -1
  }

  .tag {
    filter: brightness(0.7);

    &:before {
      filter: brightness(2.2);
    }
  }
}

html.light .timeline-dot {
  border-color: var(--light-background-color);
}

html.light .year-label {
  color: var(--light-text-color);
}

/* Skills section */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-category h3 {
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  font-weight: 600;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  color: var(--dark-text-color);
  background-color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  display: inline-block;
  transition: all 0.3s ease;
  cursor: help;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
}

.skill-tag::before {
  content: "";
  position: absolute;
  color: transparent;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0.15;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  background-color: var(--secondary-color);
}

/* Personality section */
.personality {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.personality p {
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn--primary {
  background-color: var(--primary-color);
  color: #fff;
}

.btn--primary:hover {
  background-color: var(--secondary-color);
}

/* Media Queries for Responsiveness */
@media (min-width: 768px) {
  .about-page {
    padding: 0 2rem;
  }

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .skills-grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .skill-category {
    flex: 1 1 45%;
    min-width: 300px;
  }
}

@media (min-width: 1024px) {
  .about-header {
    margin: 3rem 0 4rem;
  }

  .about-header h1 {
    font-size: 3rem;
  }

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .timeline-content h3 {
    font-size: 1.5rem;
  }

  .timeline-content h4 {
    font-size: 1.2rem;
  }

}

/* Light theme colors */
html.light .about-section {
  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  h2 {
    color: var(--light-text-color) !important;
  }
}

html.light .timeline::before {
  background: var(--primary-color);
}

html.light .timeline-dot {
  border: 3px solid #fff;
}

html.light .skill-tag {
  background-color: var(--light-background-color);
  color: var(--light-text-color);
}
</style>