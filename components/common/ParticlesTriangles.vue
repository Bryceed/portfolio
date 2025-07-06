<template>
  <div :id="id" class="particles-triangles" :style="style"></div>
</template>

<script>
export default {
  name: 'ParticlesTriangles',
  props: {
    id: {
      type: String,
      default: () => `particles-triangles-${Math.random().toString(36).substr(2, 8)}`
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: 120
    },
    colorDark: {
      type: String,
      default: '#a084fa'
    },
    colorLight: {
      type: String,
      default: '#5f0de4'
    },
    backgroundDark: {
      type: String,
      default: '#222'
    },
    backgroundLight: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    style() {
      return {
        width: typeof this.width === 'number' ? this.width + 'px' : this.width,
        height: typeof this.height === 'number' ? this.height + 'px' : this.height,
        position: 'relative',
        zIndex: 1
      };
    }
  },
  mounted() {
    this.loadParticles();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    loadParticles() {
      const run = () => {
        this.cleanup();
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? this.colorDark : this.colorLight;
        const bgColor = isDark ? this.backgroundDark : this.backgroundLight;
        if (window.particlesJS) {
          window.particlesJS(this.id, {
            particles: {
              number: { value: 38, density: { enable: true, value_area: 800 } },
              color: { value: color },
              shape: { type: 'triangle' },
              opacity: { value: 0.22, random: true },
              size: { value: 12, random: true, anim: { enable: true, speed: 2, size_min: 4, sync: false } },
              line_linked: { enable: false },
              move: {
                enable: true,
                speed: 2.2,
                direction: 'top',
                random: false,
                straight: true,
                out_mode: 'out',
                bounce: false
              }
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
              }
            },
            retina_detect: true,
            background: { color: bgColor }
          });
        }
      };
      if (!window.particlesJS) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.onload = run;
        document.body.appendChild(script);
      } else {
        run();
      }
      // Reagir ao tema
      if (!this._themeObs) {
        this._themeObs = new MutationObserver(() => setTimeout(run, 100));
        this._themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      }
    },
    cleanup() {
      const el = document.getElementById(this.id);
      if (el) {
        Array.from(el.querySelectorAll('canvas')).forEach(c => c.remove());
      }
    }
  }
};
</script>

<style scoped>
.particles-triangles {
  width: 100%;
  min-height: 80px;
  max-width: 100vw;
  height: -webkit-fill-available;
  position: relative;
  z-index: 1;
  pointer-events: none;
  height: 2ch;
}
</style>
