<template>
  <div class="layout-wrapper">
    <CommonCustomBackground
      v-if="hasCustomBg"
      :type="backgroundType"
      :src="backgroundSrc"
      :gradient="backgroundGradient"
      :color="backgroundColor"
      :transition-duration="backgroundTransitionDuration"
    />
    <div class="layout-content">
      <MenuOverlay v-if="route.path !== '/'" />
      <Menu />
      <main class="main-container">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Menu from '@/components/Menu.vue';
import Footer from '@/components/Footer.vue';
import MenuOverlay from '@/components/MenuOverlay.vue';

const route = useRoute();
const meta = computed(() => route.meta || {});

const backgroundType = computed(() => meta.value.backgroundType || '');
const backgroundSrc = computed(() => meta.value.backgroundSrc || '');
const backgroundGradient = computed(() => meta.value.backgroundGradient || '');
const backgroundColor = computed(() => meta.value.backgroundColor || '');
const backgroundTransitionDuration = computed(() => meta.value.backgroundTransitionDuration || 800);

const hasCustomBg = computed(() =>
  backgroundType.value || backgroundSrc.value || backgroundGradient.value || backgroundColor.value
);
</script>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100dvh;
  width: 100%;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-slow), color var(--transition-slow);
}

.layout-content {
  position: relative;
  z-index: var(--z-base);
}

.main-container {
  min-height: calc(100dvh - 200px);
  width: 100%;
}
</style>