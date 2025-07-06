<template>
  <transition name="bg-fade" mode="out-in">
    <div
      v-if="visible"
      class="custom-bg"
      :style="backgroundStyle"
      :key="backgroundKey"
    >
      <div v-if="type==='image'" class="bg-fade-bottom"></div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, default: 'gradient' }, // 'image', 'gradient', 'color'
  src: { type: String, default: '' }, // para imagem
  gradient: { type: String, default: '' }, // para gradiente
  color: { type: String, default: '' }, // para cor sólida
  transitionDuration: { type: Number, default: 800 }, // ms
  visible: { type: Boolean, default: true },
});

const backgroundStyle = computed(() => {
  if (props.type === 'image' && props.src) {
    return {
      backgroundImage: `url('${props.src}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    };
  }
  if (props.type === 'gradient' && props.gradient) {
    // Força gradiente vertical se não for linear-gradient top-bottom
    let grad = props.gradient;
    if (!/to bottom|180deg|top to bottom|0deg|linear-gradient\(to bottom/i.test(grad)) {
      grad = grad.replace('linear-gradient(', 'linear-gradient(to bottom,');
    }
    return {
      backgroundImage: grad,
      width: '100%',
      height: '100%',
    };
  }
  if (props.type === 'color' && props.color) {
    return {
      background: props.color,
      width: '100%',
      height: '100%',
    };
  }
  // fallback
  return {
    background: '#e0dfff',
    width: '100%',
    height: '100%',
  };
});

const backgroundKey = computed(() => {
  // Para forçar transição ao trocar background
  return `${props.type}-${props.src || props.gradient || props.color}`;
});
</script>

<style scoped>
.custom-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  min-height: 100%;
  z-index: 0;
  pointer-events: none;
  transition: background 0.8s cubic-bezier(.4,0,.2,1);
  will-change: background;
  overflow: hidden;
}
.bg-fade-bottom {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 120px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--body-bg, #e0dfff) 100%);
  z-index: 1;
}
.bg-fade-enter-active, .bg-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(.4,0,.2,1);
}
.bg-fade-enter-from, .bg-fade-leave-to {
  opacity: 0;
}
.bg-fade-enter-to, .bg-fade-leave-from {
  opacity: 1;
}
</style>
