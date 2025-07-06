<template>
  <div class="menu-overlay"></div>
</template>

<script>
export default {
  name: 'MenuOverlay',
  props: {
    scoopSize: {
      type: String,
      default: '20px'
    }
  },
  mounted() {
    this.$el.style.setProperty('--hero-overlay-scoop-size', this.scoopSize);
  }
};
</script>

<style scoped>
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(34px + 4rem);
  background: linear-gradient(
    to right,
    var(--dark-background-color, #222) 0%,
    rgba(34,34,34,0.5) 50%,
    var(--dark-background-color, #222) 100%
  );
  border-bottom: thin solid var(--dark-background-color, #222);
  z-index: 8;
  backdrop-filter: blur(8px);
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.menu-overlay:before,
.menu-overlay:after {
  content: '';
  position: absolute;
  width: var(--hero-overlay-scoop-size, 20px);
  height: var(--hero-overlay-scoop-size, 20px);
  bottom: 0;
  transform: translateY(100%);
  background-size: 100% 100%;
  z-index: inherit;
}
.menu-overlay:before {
  left: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1V0h1A1 1 0 0 0 0 1Z" fill="%23222222"/></svg>');
}
.menu-overlay:after {
  right: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M1 1V0H0A1 1 0 0 1 1 1Z" fill="%23222222"/></svg>');
}
html.light .menu-overlay {
  background: linear-gradient(
    to right,
    var(--light-background-color, #fff) 0%,
    rgba(255,255,255,0.5) 50%,
    var(--light-background-color, #fff) 100%
  );
  border-bottom: thin solid var(--light-background-color, #fff);
}
html.light .menu-overlay:before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1V0h1A1 1 0 0 0 0 1Z" fill="%23D1D1D1"/></svg>');
}
html.light .menu-overlay:after {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M1 1V0H0A1 1 0 0 1 1 1Z" fill="%23D1D1D1"/></svg>');
}
html.dark .menu-overlay {
  background: linear-gradient(
    to right,
    var(--dark-background-color, #222) 0%,
    rgba(34,34,34,0.5) 50%,
    var(--dark-background-color, #222) 100%
  );
  border-bottom: thin solid var(--dark-background-color, #222);
}
html.dark .menu-overlay:before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1V0h1A1 1 0 0 0 0 1Z" fill="%23222222"/></svg>');
}
html.dark .menu-overlay:after {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M1 1V0H0A1 1 0 0 1 1 1Z" fill="%23222222"/></svg>');
}
</style>
