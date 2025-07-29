<template>
  <div>
    <h1>Blog</h1>
    <p>{{ t('html.blog.soon') }}</p>

    <ul>
      <li v-for="post in posts" :key="post.id" v-if="posts">
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </li>
      <li v-else>
        <span>Sem publicações para exibir.</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').path('/Posts').all());
</script>

<style scoped lang="scss">
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: var(--text-color, #333);
}
</style>