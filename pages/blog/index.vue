<template>
  <div>
    <h1>Blog</h1>
    <p>{{ t('html.blog.soon') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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