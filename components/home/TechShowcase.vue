<template>
  <section class="tech-showcase">
    <div class="tech-container">
      <h2 class="section-title">{{ t('html.home.tech.title', {}, 'Technologies & Tools') }}</h2>
      <p class="section-description">{{ t('html.home.tech.subtitle', {}, 'The tools I use to bring ideas to life') }}</p>

      <div class="tech-categories">
        <div v-for="category in techCategories" :key="category.name" class="tech-category">
          <h3 class="category-title">
            <i class="material-icons">{{ category.icon }}</i>
            {{ t(`html.home.tech.${category.key}`, {}, category.name) }}
          </h3>
          <div class="tech-grid">
            <div 
              v-for="tech in category.items" 
              :key="tech.name"
              class="tech-item"
              :title="tech.name"
            >
              <div class="tech-icon" :style="{ background: tech.color || 'var(--bg-secondary)' }">
                <span class="tech-emoji" v-if="tech.emoji">{{ tech.emoji }}</span>
                <span class="tech-letter" v-else>{{ tech.name.charAt(0) }}</span>
              </div>
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useTranslation } from '@/composables/useTranslation';

const { t } = useTranslation();

const techCategories = ref([
  {
    name: 'Frontend',
    key: 'frontend',
    icon: 'web',
    items: [
      { name: 'React', emoji: '⚛️', color: '#61DAFB' },
      { name: 'Vue', emoji: '🖖', color: '#42B883' },
      { name: 'Next.js', emoji: '▲', color: '#000000' },
      { name: 'Nuxt', emoji: '💚', color: '#00DC82' },
      { name: 'TypeScript', emoji: '📘', color: '#3178C6' },
      { name: 'Tailwind', emoji: '🎨', color: '#06B6D4' }
    ]
  },
  {
    name: 'Backend',
    key: 'backend',
    icon: 'dns',
    items: [
      { name: 'Node.js', emoji: '🟢', color: '#339933' },
      { name: 'Python', emoji: '🐍', color: '#3776AB' },
      { name: 'C#', emoji: '#️⃣', color: '#239120' },
      { name: 'Java', emoji: '☕', color: '#007396' },
      { name: 'SQL', emoji: '🗄️', color: '#4479A1' },
      { name: 'MongoDB', emoji: '🍃', color: '#47A248' }
    ]
  },
  {
    name: 'DevOps & Cloud',
    key: 'devops',
    icon: 'cloud',
    items: [
      { name: 'Docker', emoji: '🐳', color: '#2496ED' },
      { name: 'AWS', emoji: '☁️', color: '#FF9900' },
      { name: 'Azure', emoji: '🔷', color: '#0078D4' },
      { name: 'Git', emoji: '📦', color: '#F05032' },
      { name: 'CI/CD', emoji: '🔄', color: '#2088FF' }
    ]
  },
  {
    name: 'Design & Tools',
    key: 'design',
    icon: 'palette',
    items: [
      { name: 'Figma', emoji: '🎨', color: '#F24E1E' },
      { name: 'Photoshop', emoji: '🖼️', color: '#31A8FF' },
      { name: 'VS Code', emoji: '💻', color: '#007ACC' },
      { name: 'Postman', emoji: '📮', color: '#FF6C37' }
    ]
  }
]);
</script>

<style scoped>
.tech-showcase {
  padding: var(--space-16) var(--space-6);
  max-width: var(--max-width-7xl);
  margin: 0 auto;
}

.tech-container {
  width: 100%;
}

.section-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: var(--text-primary);
  text-align: center;
  margin-bottom: var(--space-3);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--space-12);
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.tech-category {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.tech-category:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.category-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-5);
}

.category-title i {
  color: var(--color-primary);
  font-size: 24px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--space-4);
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.tech-item:hover {
  background: var(--hover-overlay);
  transform: translateY(-2px);
}

.tech-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.tech-item:hover .tech-icon {
  transform: scale(1.1);
  box-shadow: var(--shadow-md);
}

.tech-emoji {
  font-size: 28px;
}

.tech-letter {
  font-size: 20px;
  font-weight: var(--font-bold);
  color: white;
}

.tech-name {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.2;
}

/* Mobile */
@media (max-width: 768px) {
  .tech-showcase {
    padding: var(--space-12) var(--space-4);
  }

  .section-title {
    font-size: var(--text-3xl);
  }

  .section-description {
    font-size: var(--text-base);
    margin-bottom: var(--space-8);
  }

  .tech-categories {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .tech-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: var(--space-3);
  }

  .tech-icon {
    width: 40px;
    height: 40px;
  }

  .tech-emoji {
    font-size: 24px;
  }
}
</style>
