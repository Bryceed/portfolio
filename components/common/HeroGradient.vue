<template>
  <section :class="[`${baseClass}-section`, customClass]">
    <div :class="[`${baseClass}-bg`]">
      <MenuOverlay v-if="showMenuOverlay" scoop-size="24px" />
      <ParticlesTriangles v-if="showParticles" :height="particlesHeight" :class="[`${baseClass}-particles`]" />
      <div :class="[`${baseClass}-gradient`]" :style="gradientStyle"></div>
    </div>
    <div :class="[`${baseClass}-content`]">
      <slot name="logo">
        <Icon v-if="icon" :name="icon" :class="[`${baseClass}-logo`]" />
        <img v-else-if="img" :src="img" :alt="title" :class="[`${baseClass}-logo`]" />
      </slot>
      <h1 :class="[`${baseClass}-title`]">{{ title }}</h1>
      <p v-if="description" :class="[`${baseClass}-desc`]">{{ description }}</p>
      <slot />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import ParticlesTriangles from '@/components/common/ParticlesTriangles.vue';
import MenuOverlay from '@/components/common/MenuOverlay.vue';
import Icon from '@/components/common/Icon.vue';

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  img: { type: String, default: '' },
  gradient: { type: String, default: '' },
  baseClass: { type: String, default: 'hero' },
  customClass: { type: String, default: '' },
  showParticles: { type: Boolean, default: true },
  showMenuOverlay: { type: Boolean, default: false },
  particlesHeight: { type: [String, Number], default: 160 },
});

const gradientStyle = computed(() => props.gradient ? { background: props.gradient, opacity: 0.85 } : {});
</script>

<style scoped>
.hero-section, .projects-hero-section, .contact-hero-section {
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
}
.hero-bg, .projects-hero-bg, .contact-hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  height: auto;
  z-index: 0;
  pointer-events: none;
  border-radius: 2rem;
}
.hero-particles, .projects-hero-particles, .contact-hero-particles {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 160px !important;
  z-index: 1;
}
.hero-gradient, .projects-hero-gradient, .contact-hero-gradient {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 200px;
  opacity: 0.85;
  z-index: 0;
  border-radius: 2rem;
}
.hero-content, .projects-hero-content, .contact-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding-top: 4rem;
  gap: .5rem;
}
.hero-logo, .projects-hero-logo, .contact-hero-logo {
  width: 90px;
  height: 90px;
  object-fit: cover;
  color: #fff;
  border-radius: 50%;
  background: #fff0;
}
.hero-title, .projects-hero-title, .contact-hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #111;
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  line-height: 1.1;
  text-shadow: 0 2px 16px #00000044;
}
html.light .hero-title, html.light .projects-hero-title, html.light .contact-hero-title {
  color: #fff;
  text-shadow: 0 2px 16px #00000044;
}
.hero-desc, .projects-hero-desc, .contact-hero-desc {
  font-size: 1.2rem;
  color: #e0e0e0;
  text-align: center;
  max-width: 600px;
  margin: 0.5rem 0 1rem;
}
@media (max-width: 700px) {
  .hero-section, .projects-hero-section, .contact-hero-section {
    min-height: 120px;
  }
  .hero-bg, .projects-hero-bg, .contact-hero-bg, .hero-gradient, .projects-hero-gradient, .contact-hero-gradient {
    height: 120px;
  }
  .hero-logo, .projects-hero-logo, .contact-hero-logo {
    width: 60px;
    height: 60px;
  }
  .hero-title, .projects-hero-title, .contact-hero-title {
    font-size: 1.5rem;
  }
}
</style>
