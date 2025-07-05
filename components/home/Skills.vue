<template>
  <div class="skills-grid-wrapper">
    <h2 class="skills__title">{{ $t('html.home.skillsTitle') }}</h2>
    <div class="skills__info-message">{{ $t('html.home.skillsClickInfo') }}</div>
    <div class="skills-grid-top">
      <div class="tabs-wrapper relative">
        <div class="tab">{{ currentCategory.name }}</div>
        <button class="arrow" @click="navigate(1)">&#x25B6;</button>
        <div class="bullets-group">
          <button v-for="(cat, index) in categories" :key="cat.name" class="bullet"
            :class="{ active: currentIdx === index }" @click="currentIdx = index">
            </button>
        </div>
      </div>
      <aside class="inline-flex gap-4">
        <span class="skills-total">{{ currentCategory.items.length }} {{ $t('html.home.skillsCount') }}</span>
      <div class="skills-header">
        <svg width="40" height="40" viewBox="0 0 40 40" class="timer-svg">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#e0e0e0" stroke-width="8" />
          <circle cx="20" cy="20" r="16" fill="none" :stroke="timerColor" stroke-width="8" stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="timerDashOffset"
            style="transition: stroke-dashoffset 0.2s linear;" />
        </svg>
        </div>    
    </aside>

    </div>
    <div class="grid-skills">
      <div v-for="(item, i) in currentCategory.items" :key="item.name" class="skill-card" :style="{ animationDelay: (i*50)+'ms' }" @click="showDetails(item)">
        <div class="skill-title">{{ item.name }}</div>
        <CommonMeter :value="item.value" />
      </div>
    </div>
    <div class="side-panel" :class="{ open: selectedItem }">
      <button class="close-button" @click="closeDetails">X</button>
      <div v-if="selectedItem" class="skill-details">
        <h2>{{ selectedItem.name }}</h2>
        <CommonMeter :value="selectedItem.value" />
        <div v-if="selectedItem.description" class="skill-description">
          {{ getSkillDescription(selectedItem) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import skills from '@/data/skills.json';
import CommonMeter from '../common/Meter.vue';

const TIMER_DELAY = 8500
const TIMER_INTERVAL = 50;
const CIRCUMFERENCE = 2 * Math.PI * 16;
let currentIdx = 0;

export default {
  name: 'Skills',
  components: { CommonMeter },
  setup() {
    const categories = ref(skills.map(cat => ({ ...cat })));
    const currentIdx = ref(0);
    const selectedItem = ref(null);
    const timer = ref(TIMER_DELAY);
    let timerInterval = null;

    const currentCategory = computed(() => categories.value[currentIdx.value]);
    const timerColor = '#4a3aff';
    const circumference = CIRCUMFERENCE;
    const timerDashOffset = computed(() => (timer.value / TIMER_DELAY) * circumference);

    function showDetails(item) { selectedItem.value = item; }
    function closeDetails() { selectedItem.value = null; }
    function navigate(dir) {
      currentIdx.value = (currentIdx.value + dir + categories.value.length) % categories.value.length;
      resetTimer();
    }
    function resetTimer() {
      timer.value = TIMER_DELAY;
    }
    function tick() {
      timer.value -= TIMER_INTERVAL;
      if (timer.value <= 0) {
        timer.value = TIMER_DELAY;
        navigate(1);
      }
    }
    function startTimer() {
      timerInterval = setInterval(tick, TIMER_INTERVAL);

      if (categories.value.length > 0) {
          currentIdx.value = 0;
        }
    }
    function stopTimer() {
      clearInterval(timerInterval);
    }

    onMounted(() => {
      startTimer();
      nextTick(() => {
        const grid = document.querySelector('.grid-skills');
        if (grid) grid.addEventListener('mouseenter', stopTimer);
        if (grid) grid.addEventListener('mouseleave', startTimer);
      });
    });
    onUnmounted(() => { stopTimer(); });
    watch(currentIdx, (newIdx) => {
      const bullets = document.querySelectorAll('.bullet');
      bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index === newIdx);
      });
    });
    
    return {
      categories,
      currentCategory,
      selectedItem,
      showDetails,
      closeDetails,
      navigate,
      timerColor,
      circumference,
      timerDashOffset,
      getSkillDescription(skill) {
        if (!skill.description) return '';
        const locale = (this.$i18n?.locale || 'pt').toLowerCase();
        const lang = locale.split('-')[0];
        if (skill.description[locale]) return skill.description[locale];
        if (skill.description[lang]) return skill.description[lang];
        if (skill.description['pt']) return skill.description['pt'];
        if (skill.description['en']) return skill.description['en'];
        const availableLang = Object.keys(skill.description)[0];
        return availableLang ? skill.description[availableLang] : '';
      }
    };
  }
};
</script>

<style scoped>
.skills-grid-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80vh;
}
.skills__title {
  font-size: 3rem;
    font-weight: 900;
    color: #fff;
  margin-bottom: 16px;
}
.skills__info-message {
  font-size: 1rem;
  color: #555;
  margin-bottom: 24px;
  text-align: center;
}
.skills-grid-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 36px 20px;
}
.tabs-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0;
}
.arrow {
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
  padding: 6px 12px;
  background: transparent;
  border-radius: 8px;
  transition: background 0.2s;
  border: none;
}
.arrow:hover {
  background: #4a3aff;
  color: #fff;
}
.bullets-group {
  display: flex;
  gap: 8px;
}
.bullet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: background 0.2s;
}
.bullet.active {
  background: #4a3aff;
}
.tab {
  padding: 10px 20px 10px 0;
  color: #4a3aff;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: uppercase;
}
.skills-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #888;
  font-size: 0.9rem;
}
.timer-svg {
  width: 24px;
  height: 24px;
  transform: rotate(-90deg);
}
.skills-total {
  font-size: 1rem;
  color: #4a3aff;
  font-weight: bold;
}
.grid-skills {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  overflow-y: auto;
}
/* Compensa o espaço da barra de rolagem para evitar layout shift */
.grid-skills {
    scrollbar-gutter: stable;
}
.skill-card {
  background: #e0dfff;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(10px);
  animation: cardIn 0.4s ease forwards;
}
@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.skill-title {
  font-size: 1rem;
  font-weight: bold;
  color: #4a3aff;
}
.side-panel {
  position: fixed;
  right: -300px;
  top: 100px;
  bottom: 10px;
  max-width: 280px;
  width: 100%;
  overflow: visible;
  background-color: rgba(0, 0, 0, 0.8);
  transition: right 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 999;
  backdrop-filter: blur(7px);
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.2);
}
.side-panel.open {
  right: 20px;
  transform-origin: 110% 50%;
  animation: openSidePanel .4s;
}
@keyframes openSidePanel {
  0% {
    right: -30px;
    opacity: 1;
    transform: perspective(800px) rotateY(90deg);
  }
  100% {
    right: 20px;
    opacity: 1;
    transform: perspective(800px) rotateY(0deg);
  }
}
.side-panel:not(.open) {
  animation: closeSidePanel 0.3s;
}
@keyframes closeSidePanel {
  0% {
    opacity: 1;
    transform: perspective(800px) rotateY(0deg);
  }
  100% {
    opacity: 0;
    transform: perspective(800px) rotateY(-60deg);
  }
}
.close-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  align-self: flex-end;
}
.skill-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.skill-description {
  margin-top: 15px;
  text-align: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  line-height: 1.6;
  font-size: 0.95rem;
}
@media (max-width: 768px) {
  .skills-grid-wrapper {
    padding: 20px;
  }
  .skills-grid-top {
    flex-direction: column;
    gap: 10px;
  }
  .side-panel {
    top: 60px;
    right: 0;
    left: 0;
    max-width: 100vw;
    border-radius: 0;
  }
}
</style>