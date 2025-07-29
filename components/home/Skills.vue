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
              :stroke-dasharray="circumference" :stroke-dashoffset="timerDashOffset"
              style="transition: stroke-dashoffset 0.2s linear;" />
          </svg>
        </div>
      </aside>
    </div>

    <div class="grid-skills">
      <div v-for="(item, i) in currentCategory.items" :key="item.name" class="skill-card"
        :style="{ animationDelay: (i*50)+'ms' }" @click="showDetails(item)">
        <div class="skill-title">{{ item.name }}</div>
        <CommonMeter :value="item.value" />
      </div>
    </div>

    <div class="side-panel" :class="{ open: selectedItem }">
      <button class="close-button" @click="closeDetails">X</button>
      <div v-if="selectedItem" class="skill-details">
        <h2>{{ selectedItem.name }}</h2>
        <div v-if="selectedItem.description" class="skill-description">
          {{ getSkillDescription(selectedItem) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import skills from '@/data/skills.json';
import CommonMeter from '../common/Meter.vue';

const TIMER_DELAY = 8500
const TIMER_INTERVAL = 50;
const CIRCUMFERENCE = 2 * Math.PI * 16;

export default {
  name: 'Skills',
  components: { CommonMeter },
  setup() {
    const categories = ref(skills.map(cat => ({ ...cat })));
    const currentIdx = ref(0);
    const selectedItem = ref(null);
    const timer = ref(TIMER_DELAY);
    const progressBarHeight = ref(0);
    let timerInterval = null;

    const currentCategory = computed(() => categories.value[currentIdx.value]);
    const timerColor = '#4a3aff';
    const circumference = CIRCUMFERENCE;
    const timerDashOffset = computed(() => (timer.value / TIMER_DELAY) * circumference);

    function calculateProgressBarHeight() {
      if (!selectedItem.value) return 0;
      // Calculate height based on the skill level (1-5)
      const level = selectedItem.value.level;
      // Height for levels completed (level * 80px) minus some offset
      return level * 80 - 40;
    }

    function showDetails(item) { 
      // Garante que o valor é sempre um número
      const value = Number(item.value);
      selectedItem.value = { 
        ...item,
        level: isNaN(value) ? 1 : value // valor já é de 1 a 5, fallback para 1
      };
      progressBarHeight.value = 0;
      setTimeout(() => {
        progressBarHeight.value = calculateProgressBarHeight();
      }, 100);
    }

    function closeDetails() { 
      selectedItem.value = null; 
    }
    
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
    
    function getSkillDescription(item) {
      const locale = localStorage.getItem('i18n_locale') || 'en';
      return item.description?.[locale.substring(0, 2)] || item.description?.en || item.description || '';
    }
    
    function getPrincipleForLevel(level) {
      const principles = [
        'Essencial',
        'Básico',
        'Intermediário',
        'Avançado',
        'Especialista'
      ];
      return principles[level - 1] || '';
    }
    
    function getPrincipleDesc(level) {
      const descs = [
        'Conhece o conceito, reconhece no código, sabe para que serve.',
        'Consegue usar no dia a dia, mas ainda consulta exemplos.',
        'Resolve problemas comuns sem ajuda, entende limitações.',
        'Cria soluções avançadas, otimiza e ensina outros.',
        'Referência no tema, domina padrões e inova.'
      ];
      return descs[level - 1] || '';
    }

    onMounted(() => {
      startTimer();
      nextTick(() => {
        const grid = document.querySelector('.grid-skills');
        if (grid) grid.addEventListener('mouseenter', stopTimer);
        if (grid) grid.addEventListener('mouseleave', startTimer);
      });
    });
    
    onUnmounted(() => { 
      stopTimer(); 
    });
    
    watch(currentIdx, (newIdx) => {
      const bullets = document.querySelectorAll('.bullet');
      bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index === newIdx);
      });
    });
    
    watch(selectedItem, () => {
      if (selectedItem.value) {
        progressBarHeight.value = calculateProgressBarHeight();
      }
    });
    
    return {
      categories,
      currentCategory,
      selectedItem,
      showDetails,
      closeDetails,
      navigate,
      timer,
      timerColor,
      circumference,
      timerDashOffset,
      currentIdx,
      getSkillDescription,
      getPrincipleForLevel,
      getPrincipleDesc,
      progressBarHeight
    };
  }
};
</script>

<style scoped>
:root {
  --level-green: #43d675;
  --level-green-dark: #2e8b57;
  --level-gray: #e0e0e0;
  --level-gray-dark: #444;
  --level-bg-light: #fff;
  --level-bg-dark: #23272f;
  --level-label-light: #222;
  --level-label-dark: #e0e0e0;
  --level-label-muted-light: #888;
  --level-label-muted-dark: #bbb;
  --level-bar-light: #e0e0e0;
  --level-bar-dark: #444;
}

html.light .side-panel {
  background: var(--level-bg-light);
  color: var(--level-label-light);
}

html.dark .side-panel {
  background: var(--level-bg-dark);
  color: var(--level-label-dark);
}

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
  align-items: flex-start;
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
  cursor: pointer;
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
  overflow-y: auto;
  scrollbar-gutter: stable;
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

/* New Skill Progress Card Styles */
.skill-progress-card {
  width: 100%;
  margin-top: 2rem;
  position: relative;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.progress-track-container {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Background track line */
.progress-track-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: calc(100% - 30px);
  background-color: var(--level-gray);
  border-radius: 2px;
  z-index: 1;
  top: 15px;
}

html.dark .progress-track-line {
  background-color: var(--level-gray-dark);
}

/* Animated progress background */
.progress-track-bg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  background-color: var(--level-green);
  border-radius: 2px;
  z-index: 2;
  top: 15px;
  transition: height 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}

html.dark .progress-track-bg {
  background-color: var(--level-green-dark);
}

/* Progress Levels Container */
.progress-levels {
  position: relative;
  width: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Individual Level Row */
.progress-level {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 80px;
  position: relative;
}

/* Checkpoint Circle */
.checkpoint-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid var(--level-gray);
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;
}

html.dark .checkpoint-circle {
  background-color: var(--level-bg-dark);
  border-color: var(--level-gray-dark);
}

.checkpoint-circle.completed {
  border-color: var(--level-green);
  background-color: var(--level-green);
  box-shadow: 0 0 0 4px #43d67533;
}

html.dark .checkpoint-circle.completed {
  border-color: var(--level-green-dark);
  background-color: var(--level-green-dark);
}

.checkpoint-circle.active {
  border-color: var(--level-green);
  box-shadow: 0 0 0 6px #43d67544;
}

.checkpoint-circle.pulse {
  animation: pulse 1.2s infinite alternate;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 6px #43d67544; }
  100% { box-shadow: 0 0 0 12px #43d67522; }
}

.checkpoint-circle.pending {
  border-color: var(--level-gray);
  background-color: #fff;
}

html.dark .checkpoint-circle.pending {
  background-color: var(--level-bg-dark);
  border-color: var(--level-gray-dark);
}

.checkpoint-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--level-green);
  transform: scaleY(0);
  transform-origin: bottom;
  animation: fillUp 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards;
}

html.dark .checkpoint-fill {
  background-color: var(--level-green-dark);
}

.circle-progress-bar {
  position: absolute;
  left: 50%;
  bottom: -10px;
  width: 4px;
  height: 18px;
  background: linear-gradient(180deg, var(--level-green) 60%, #fff0 100%);
  border-radius: 2px;
  transform: translateX(-50%);
  opacity: 0.7;
  transition: background 0.3s;
}

.circle-progress-bar.bar-completed {
  background: var(--level-green);
  opacity: 1;
}

.level-connector {
  position: absolute;
  left: 50%;
  top: -40px;
  width: 4px;
  height: 40px;
  transform: translateX(-50%);
  z-index: 0;
  display: flex;
  align-items: flex-end;
}

.connector-fill {
  width: 100%;
  height: 100%;
  background: var(--level-green);
  border-radius: 2px;
  transition: background 0.3s;
}

.connector-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--level-green) 60%, #43d67555 80%, #fff0 100%);
  border-radius: 2px;
  animation: connectorPulse 1.2s infinite alternate;
}

@keyframes connectorPulse {
  0% { filter: brightness(1) scaleY(1); }
  100% { filter: brightness(1.2) scaleY(1.08); }
}

.connector-empty {
  width: 100%;
  height: 100%;
  background: var(--level-gray);
  border-radius: 2px;
  opacity: 0.5;
}

.level-content .level-title {
  color: var(--level-label-muted-light);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 4px;
  transition: color 0.3s;
}

.level-content.active .level-title {
  color: var(--level-green);
  font-weight: 700;
}

.level-content.completed .level-title {
  color: var(--level-green);
  font-weight: 700;
}

html.dark .level-content .level-title {
  color: var(--level-label-muted-dark);
}

html.dark .level-content.active .level-title,
html.dark .level-content.completed .level-title {
  color: var(--level-green-dark);
}

.level-description {
  font-size: 0.95rem;
  color: var(--level-label-muted-light);
  line-height: 1.4;
}

html.dark .level-description {
  color: var(--level-label-muted-dark);
}

.level-content.active .level-description {
  color: var(--level-green);
}

html.dark .level-content.active .level-description {
  color: var(--level-green-dark);
}

@media (max-width: 600px) {
  .level-title {
    font-size: 1rem;
  }
  
  .level-description {
    font-size: 0.9rem;
  }
  
  .checkpoint-circle {
    width: 24px;
    height: 24px;
  }
  
  .checkmark {
    font-size: 16px;
  }
  
  .progress-track-line,
  .progress-track-bg {
    width: 3px;
  }
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
    padding: 10px;
  }
  
  .progress-level {
    min-height: 70px;
  }
}
</style>