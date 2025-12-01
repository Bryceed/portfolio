<template>
  <div class="projects-page">
    <!-- Hero Section -->
    <section class="projects-hero">
      <div class="hero-content">
        <i class="material-icons hero-icon">code</i>
        <h1>{{ t('html.projects.title', {}, 'My Projects') }}</h1>
        <p>{{ t('html.projects.intro', {}, 'Explore my work and creations') }}</p>
      </div>
    </section>

    <!-- Projects Grid -->
    <div class="projects-container">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card"
        @click="navigateToProject(project)"
      >
        <!-- Project Image -->
        <div class="project-image">
          <img 
            :src="project.placeholder || '/placeholder-project.jpg'" 
            :alt="project.title"
            loading="lazy"
          />
          <div class="project-overlay"></div>
        </div>
        
        <!-- Project Info -->
        <div class="project-info">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ getDescription(project) }}</p>
          
          <!-- Project Actions -->
          <div class="project-actions">
            <NuxtLink 
              v-if="project.page" 
              :to="`/project/${project.id}`"
              class="action-button primary"
              @click.stop
            >
              <i class="material-icons">arrow_forward</i>
              <span>{{ t('html.projects.details', {}, 'View Details') }}</span>
            </NuxtLink>
            
            <a 
              v-if="project.code" 
              :href="project.code" 
              target="_blank"
              class="action-button secondary"
              @click.stop
            >
              <i class="material-icons">code</i>
              <span>{{ t('html.projects.code', {}, 'Code') }}</span>
            </a>
            
            <a 
              v-if="project.link" 
              :href="project.link" 
              target="_blank"
              class="action-button secondary"
              @click.stop
            >
              <i class="material-icons">launch</i>
              <span>{{ t('html.projects.demo', {}, 'Demo') }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTranslation } from '@/composables/useTranslation';
import { useRouter } from '#app';
import { projects } from '@/data/projects.json';

const { t, currentLocale } = useTranslation();
const router = useRouter();

const getDescription = (project) => {
  const locale = currentLocale.value;
  return project.description?.[locale] || project.description?.['en'] || project.description?.['pt-BR'] || '';
};

const navigateToProject = (project) => {
  if (project.page) {
    router.push(`/project/${project.id}`);
  }
};
</script>

<style scoped>
.projects-page {
  width: 100%;
}

/* Hero Section */
.projects-hero {
  width: 100%;
  padding: var(--space-16) var(--space-6);
  background: linear-gradient(135deg, 
    #067E87 0%, 
    #1FAE0C 100%);
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

.projects-hero h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.projects-hero p {
  font-size: var(--text-xl);
  opacity: 0.9;
}

/* Projects Container */
.projects-container {
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  padding: 0 var(--space-6) var(--space-16);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-8);
}

/* Project Card */
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

/* Project Image */
.project-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: var(--bg-secondary);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.6) 0%, 
    transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

/* Project Info */
.project-info {
  flex: 1;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.project-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin: 0;
  line-height: var(--leading-tight);
}

.project-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
  flex: 1;
}

/* Project Actions */
.project-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: auto;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: all var(--transition-fast);
  min-height: 40px;
}

.action-button i {
  font-size: 18px;
}

.action-button.primary {
  background: var(--color-primary);
  color: var(--text-inverse);
  box-shadow: var(--shadow-sm);
}

.action-button.primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.action-button.secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.action-button.secondary:hover {
  background: var(--hover-overlay);
  transform: translateY(-2px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .projects-hero {
    padding: var(--space-12) var(--space-4);
  }

  .hero-icon {
    font-size: 4rem;
  }

  .projects-hero h1 {
    font-size: var(--text-3xl);
  }

  .projects-hero p {
    font-size: var(--text-lg);
  }

  .projects-container {
    grid-template-columns: 1fr;
    padding: 0 var(--space-4) var(--space-12);
    gap: var(--space-6);
  }

  .project-image {
    height: 180px;
  }

  .project-info {
    padding: var(--space-5);
  }

  .project-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 374px) {
  .projects-container {
    grid-template-columns: 1fr;
  }
}
</style>