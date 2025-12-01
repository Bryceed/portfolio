<template>
  <div class="menu-overlay"></div>
</template>

<script>
export default {
  name: 'MenuOverlay'
}
</script>

<style scoped lang="scss">
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(34px + 4rem); /* Altura do menu */
  
  /* Use design system variable for background */
  background: var(--bg-overlay);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  z-index: 8; /* Abaixo do menu principal (z-index: 10), mas acima do background */
  pointer-events: none; /* Permite interação com elementos abaixo */
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.menu-overlay:before,
.menu-overlay:after {
  content: '';
  position: absolute;
  width: 20px; 
  height: 20px;
  bottom: 0;
  transform: translateY(100%);
  z-index: inherit;
  
  /* Use the same background color as the overlay */
  background-color: var(--bg-overlay);
  
  /* Use mask to shape the element using the SVG */
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  
  transition: background-color 0.3s ease;
}

.menu-overlay:before {
  left: 0;
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1V0h1A1 1 0 0 0 0 1Z" fill="black"/></svg>');
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1V0h1A1 1 0 0 0 0 1Z" fill="black"/></svg>');
}

.menu-overlay:after {
  right: 0;
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M1 1V0H0A1 1 0 0 1 1 1Z" fill="black"/></svg>');
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M1 1V0H0A1 1 0 0 1 1 1Z" fill="black"/></svg>');
}
</style>
