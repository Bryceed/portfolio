<template>
  <div class="homepage">
    <!-- Pride Alert (June only) -->
    <CommonAlertsPride v-if="isPrideMonth" />
    
    <!-- About Me Hero -->
    <HomeAboutMe />
    
    <!-- Stats Section -->
    <HomeStats />
    
    <!-- Projects Highlight -->
    <ProjectsHighlightsDisplay />
    
    <!-- Technologies Showcase -->
    <HomeTechShowcase />
    
    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-content">
        <div class="cta-badge">
          <i class="material-icons">check_circle</i>
          <span>{{ t('html.home.cta.available', {}, 'Available for freelance') }}</span>
        </div>
        <h2>{{ t('html.home.ctaTitle', {}, 'Let\'s Work Together') }}</h2>
        <p>{{ t('html.home.ctaText', {}, 'Have a project in mind? Let\'s create something amazing!') }}</p>
        <div class="cta-buttons">
          <NuxtLink to="/contact" class="btn btn-primary">
            <i class="material-icons">email</i>
            <span>{{ t('html.home.contactMe', {}, 'Contact Me') }}</span>
          </NuxtLink>
          <NuxtLink to="/projects" class="btn btn-secondary">
            <i class="material-icons">work</i>
            <span>{{ t('html.home.viewProjects', {}, 'View Projects') }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTranslation } from '@/composables/useTranslation';

const { t } = useTranslation();

const date = new Date();
const isPrideMonth = ref(date.getMonth() === 5);

definePageMeta({
  layout: 'default'
});
</script>

<style scoped>
.homepage {
  width: 100%;
  min-height: 100vh;
}

/* Skills & Trajectory Section */
.home-section {
  padding: var(--space-12) var(--space-6);
  max-width: var(--max-width-7xl);
  margin: 0 auto;
}

.skills-trajectory {
  padding: var(--space-16) var(--space-6);
}

.section-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-8);
  align-items: start;
}

.skills-card,
.trajectory-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.skills-card:hover,
.trajectory-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

/* CTA Section */
.cta-section {
  padding: var(--space-20) var(--space-6);
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 100%);
  margin: var(--space-16) 0 0 0;
  text-align: center;
  color: var(--text-inverse);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -250px;
  right: -100px;
  animation: float 20s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(50px) rotate(180deg); }
}

.cta-content {
  max-width: var(--max-width-3xl);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-6);
  backdrop-filter: blur(10px);
}

.cta-badge i {
  font-size: 18px;
}

.cta-section h2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.cta-section p {
  font-size: var(--text-xl);
  opacity: 0.95;
  margin-bottom: var(--space-8);
  line-height: var(--leading-relaxed);
}

.cta-buttons {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.cta-buttons .btn {
  min-width: 180px;
}

/* Responsive */
@media (max-width: 900px) {
  .home-section {
    padding: var(--space-8) var(--space-4);
  }

  .skills-trajectory {
    padding: var(--space-12) var(--space-4);
  }

  .section-container {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .cta-section {
    padding: var(--space-16) var(--space-4);
  }

  .cta-section h2 {
    font-size: var(--text-3xl);
  }

  .cta-section p {
    font-size: var(--text-lg);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .cta-buttons .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .skills-card,
  .trajectory-card {
    padding: var(--space-6);
  }

  .cta-section h2 {
    font-size: var(--text-2xl);
  }

  .cta-section p {
    font-size: var(--text-base);
  }
}
</style>
