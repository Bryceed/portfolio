<template>
  <section class="stats-section">
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="material-icons">schedule</i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ yearsExperience }}+</div>
          <div class="stat-label">{{ t('html.home.stats.experience', {}, 'Years Experience') }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="material-icons">code</i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ projectsCount }}+</div>
          <div class="stat-label">{{ t('html.home.stats.projects', {}, 'Projects Completed') }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="material-icons">workspace_premium</i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ certificationsCount }}+</div>
          <div class="stat-label">{{ t('html.home.stats.certifications', {}, 'Certifications') }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="material-icons">terminal</i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ technologiesCount }}+</div>
          <div class="stat-label">{{ t('html.home.stats.technologies', {}, 'Technologies') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useTranslation } from '@/composables/useTranslation';
import timeline from '@/data/timeline.json';

const { t } = useTranslation();

// Calculate years of experience from first job
const yearsExperience = computed(() => {
  const jobsWithDate = timeline.events.filter(e => e.jobRole && e.startDate);
  if (jobsWithDate.length === 0) return 5;
  
  // Find the earliest start date
  const earliestDate = jobsWithDate.reduce((min, e) => {
    const date = new Date(e.startDate);
    return date < min ? date : min;
  }, new Date());

  const startYear = earliestDate.getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
});

// Count unique projects (simplified - you can adjust based on your data)
const projectsCount = computed(() => {
  return timeline.events.filter(e => e.jobRole).length + 10; // Add personal projects estimate
});

// Count certifications (you can load from certifications data)
const certificationsCount = computed(() => {
  return 15; // Adjust based on actual data
});

// Count technologies (estimate)
const technologiesCount = computed(() => {
  return 30; // Adjust based on skills data
});
</script>

<style scoped>
.stats-section {
  padding: var(--space-16) var(--space-6);
  background: linear-gradient(135deg, 
    var(--bg-secondary) 0%, 
    var(--bg-primary) 100%);
  margin: var(--space-12) 0;
}

.stats-container {
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-6);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 100%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.stat-icon i {
  font-size: 32px;
  color: var(--text-inverse);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: var(--space-2);
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Mobile */
@media (max-width: 768px) {
  .stats-section {
    padding: var(--space-12) var(--space-4);
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
    padding: var(--space-5);
  }

  .stat-icon {
    width: 56px;
    height: 56px;
  }

  .stat-icon i {
    font-size: 28px;
  }

  .stat-number {
    font-size: var(--text-3xl);
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>
