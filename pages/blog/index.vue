<template>
  <div class="blog-page">
    <!-- Hero -->
    <section class="blog-hero">
      <div class="hero-content">
        <i class="material-icons hero-icon">article</i>
        <h1>{{ t('html.blog.title', {}, 'Blog') }}</h1>
        <p>{{ t('html.blog.subtitle', {}, 'Thoughts, tutorials, and insights') }}</p>
      </div>
    </section>

    <!-- Blog Content -->
    <div class="blog-container">
      <div v-if="posts && posts.length > 0" class="posts-grid">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <NuxtLink :to="post.path" class="post-link">
            <div v-if="post.image" class="post-image">
              <img :src="post.image" :alt="post.title" loading="lazy" />
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span v-if="post.category" class="post-category">{{ post.category }}</span>
                <span v-if="post.date" class="post-date">{{ formatDate(post.date) }}</span>
              </div>
              <h2 class="post-title">{{ post.title }}</h2>
              <p v-if="post.description" class="post-description">{{ post.description }}</p>
              <div class="post-footer">
                <span class="read-more">
                  {{ t('html.blog.readMore', {}, 'Read article') }}
                  <i class="material-icons">arrow_forward</i>
                </span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <i class="material-icons empty-icon">edit_note</i>
        <h2>{{ t('html.blog.soon', {}, 'Blog Coming Soon') }}</h2>
        <p>{{ t('html.blog.soonDescription', {}, 'I\'m working on creating amazing content. Stay tuned!') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTranslation } from '@/composables/useTranslation';

const { t, currentLocale } = useTranslation();

// Fetch blog posts (commented out until @nuxt/content is configured properly)
// const { data: posts } = await useAsyncData('blog', () => queryContent('blog').sort({ date: -1 }).find());
const posts = ref([]);

const formatDate = (dateString) => {
  const locale = currentLocale.value;
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.blog-page {
  width: 100%;
  min-height: 100vh;
}

/* Hero */
.blog-hero {
  width: 100%;
  padding: var(--space-16) var(--space-6);
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

.blog-hero h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.blog-hero p {
  font-size: var(--text-xl);
  opacity: 0.9;
}

/* Blog Container */
.blog-container {
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  padding: 0 var(--space-6) var(--space-16);
  min-height: 400px;
}

/* Posts Grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-8);
}

/* Post Card */
.post-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.post-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.post-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--bg-secondary);
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-content {
  padding: var(--space-6);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
}

.post-category {
  padding: var(--space-1) var(--space-3);
  background: var(--color-primary);
  color: var(--text-inverse);
  border-radius: var(--radius-full);
  font-weight: var(--font-semibold);
}

.post-date {
  color: var(--text-tertiary);
}

.post-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  line-height: var(--leading-tight);
}

.post-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: gap var(--transition-fast);
}

.post-card:hover .read-more {
  gap: var(--space-3);
}

.read-more i {
  font-size: 18px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-20) var(--space-6);
}

.empty-icon {
  font-size: 6rem;
  color: var(--text-tertiary);
  margin-bottom: var(--space-6);
  opacity: 0.5;
}

.empty-state h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.empty-state p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 500px;
}

/* Mobile */
@media (max-width: 768px) {
  .blog-hero {
    padding: var(--space-12) var(--space-4);
  }

  .hero-icon {
    font-size: 4rem;
  }

  .blog-hero h1 {
    font-size: var(--text-3xl);
  }

  .blog-hero p {
    font-size: var(--text-lg);
  }

  .blog-container {
    padding: 0 var(--space-4) var(--space-12);
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .empty-state {
    padding: var(--space-16) var(--space-4);
  }

  .empty-icon {
    font-size: 4rem;
  }

  .empty-state h2 {
    font-size: var(--text-2xl);
  }
}
</style>