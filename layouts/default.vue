<template>
  <div class="layout-bg-wrapper">
    <CommonCustomBackground
      v-if="hasCustomBg"
      :type="backgroundType"
      :src="backgroundSrc"
      :gradient="backgroundGradient"
      :color="backgroundColor"
      :transition-duration="backgroundTransitionDuration"
    />
    <div class="relative z-10">
      <Menu />
      <div class="container">
        <router-view></router-view>
      </div>
      <Footer />
      <!-- Componente invisível que ajuda na reatividade do i18n -->
      <CommonI18nRefresher @localeChanged="handleLocaleChange" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

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

function handleLocaleChange(locale) {
  // Forçar atualização do layout quando o idioma mudar
  location.reload();
}
</script>

<style>
.layout-bg-wrapper {
  position: relative;
  min-height: 100dvh;
  width: 100%;
}
</style>