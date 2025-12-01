<template>
  <header class="site-header" :class="{ 'menu-open': isMenuOpen }">
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-container">
        <!-- Logo -->
        <NuxtLink to="/" class="logo-link" @click="closeMenu" aria-label="Go to homepage">
          <div class="logo">
            <span class="logo-text">Well</span>
            <span class="logo-cursor"></span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <ul class="nav-menu desktop-menu" role="menubar">
          <li v-for="item in menuItems" :key="item.id" role="none">
            <NuxtLink
              :to="item.link"
              class="nav-item"
              :class="{ 'active': isActiveRoute(item.link) }"
              role="menuitem"
            >
              {{ t(`menu.${item.name.toLowerCase()}`, {}, item.name) }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Right Side Actions -->
        <div class="nav-actions">
          <!-- Language Selector -->
          <div class="lang-selector" ref="langSelector">
            <button
              class="lang-button"
              @click="toggleLangMenu"
              :aria-expanded="isLangMenuOpen"
              aria-haspopup="true"
              aria-label="Select language"
            >
              <span :class="getCurrentFlagClass()" class="flag-icon"></span>
              <span class="lang-code">{{ currentLangCode }}</span>
              <i class="material-icons dropdown-icon">
                {{ isLangMenuOpen ? 'expand_less' : 'expand_more' }}
              </i>
            </button>

            <!-- Language Dropdown -->
            <transition name="dropdown">
              <div v-if="isLangMenuOpen" class="lang-dropdown" role="menu">
                <button
                  v-for="lang in languages"
                  :key="getLangKey(lang)"
                  class="lang-option"
                  :class="{ 'active': isCurrentLang(lang) }"
                  @click="selectLanguage(lang)"
                  role="menuitem"
                >
                  <span :class="getFlagClass(lang)" class="flag-icon"></span>
                  <div class="lang-info">
                    <span class="lang-name">{{ lang.name }}</span>
                    <span class="lang-locale">{{ getLangKey(lang) }}</span>
                  </div>
                  <i v-if="isCurrentLang(lang)" class="material-icons check-icon">check</i>
                </button>
              </div>
            </transition>
          </div>

          <!-- Theme Switcher -->
          <ThemeSwitcher />

          <!-- Mobile Menu Button -->
          <button
            class="mobile-menu-button"
            @click="toggleMobileMenu"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle mobile menu"
            aria-controls="mobile-navigation"
          >
            <span class="menu-icon" :class="{ 'open': isMenuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <transition name="mobile-menu">
      <div v-if="isMenuOpen" class="mobile-nav-overlay" @click="closeMenu">
        <nav 
          class="mobile-nav" 
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation"
          @click.stop
        >
          <ul class="mobile-menu" role="menubar">
            <li v-for="item in menuItems" :key="item.id" role="none">
              <NuxtLink
                :to="item.link"
                class="mobile-nav-item"
                :class="{ 'active': isActiveRoute(item.link) }"
                @click="closeMenu"
                role="menuitem"
              >
                {{ t(`menu.${item.name.toLowerCase()}`, {}, item.name) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from '#app';
import { useTranslation } from '@/composables/useTranslation';
import ThemeSwitcher from './theme/Switcher.vue';
import { menu } from '@/data/menu.json';

// Composables
const route = useRoute();
const { t, setLocale, currentLocale, refresh } = useTranslation();

// State
const isMenuOpen = ref(false);
const isLangMenuOpen = ref(false);
const langSelector = ref(null);

// Languages configuration
const languages = ref([
  { code: 'pt', region: 'BR', name: 'Português' },
  { code: 'en', region: 'US', name: 'English' },
  { code: 'es', region: 'ES', name: 'Español' },
  { code: 'fr', region: 'FR', name: 'Français' },
  { code: 'de', region: 'DE', name: 'Deutsch' },
  { code: 'ru', region: 'RU', name: 'Русский' },
  { code: 'ja', region: 'JP', name: '日本語' },
  { code: 'ko', region: 'KR', name: '한국어' }
]);

// Menu items (filtrados para remover submenu se necessário)
const menuItems = computed(() => {
  return menu.filter(item => !item.submenu);
});

// Current language code para display
const currentLangCode = computed(() => {
  const locale = currentLocale.value;
  const parts = locale.split('-');
  return parts[0].toUpperCase();
});

// Methods
const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    isLangMenuOpen.value = false;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value;
};

const selectLanguage = (lang) => {
  const locale = lang.region && lang.region !== lang.code 
    ? `${lang.code}-${lang.region}` 
    : lang.code;
  
  setLocale(locale);
  isLangMenuOpen.value = false;
  
  // Força re-render de componentes
  setTimeout(() => {
    refresh();
  }, 100);
};

const getLangKey = (lang) => {
  return lang.region && lang.region !== lang.code 
    ? `${lang.code}-${lang.region}` 
    : lang.code;
};

const getFlagClass = (lang) => {
  const code = (lang.code || 'en').toLowerCase();
  const region = (lang.region || 'US').toUpperCase();
  return `flag flag-${code}_${region}`;
};

const getCurrentFlagClass = () => {
  const locale = currentLocale.value;
  const parts = locale.split('-');
  const code = parts[0].toLowerCase();
  const region = (parts[1] || code).toUpperCase();
  return `flag flag-${code}_${region}`;
};

const isCurrentLang = (lang) => {
  const locale = currentLocale.value;
  const langLocale = getLangKey(lang);
  return locale.toLowerCase() === langLocale.toLowerCase();
};

const isActiveRoute = (path) => {
  return route.path === path;
};

// Click outside to close language menu
const handleClickOutside = (event) => {
  if (langSelector.value && !langSelector.value.contains(event.target)) {
    isLangMenuOpen.value = false;
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // Listener para mudança de locale de outras partes da app
  document.addEventListener('locale:changed', () => {
    refresh();
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
});
</script>

<style scoped lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  width: 100%;
  padding: calc(var(--space-3) + 2px) var(--space-5);
  background: transparent;
  transition: all var(--transition-base);
}

.navbar {
  background: var(--bg-overlay);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-primary);
  transition: all var(--transition-base);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-5);
  gap: var(--space-4);
  max-width: var(--max-width-7xl);
  margin: 0 auto;
}

/* Logo */
.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  z-index: var(--z-sticky);
}

.logo {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 2px;
  letter-spacing: -0.5px;
}

.logo-text {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-cursor {
  width: 3px;
  height: 1.4em;
  background: var(--color-primary);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Desktop Menu */
.desktop-menu {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--space-2);
}

@media (min-width: 768px) {
  .desktop-menu {
    display: flex;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-item:hover {
  color: var(--color-primary);
  background: var(--hover-overlay);
}

.nav-item.active {
  color: var(--color-primary);
  font-weight: var(--font-semibold);
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Language Selector */
.lang-selector {
  position: relative;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 40px;
}

.lang-button:hover {
  background: var(--hover-overlay);
  border-color: var(--color-primary);
}

.flag-icon {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  background-size: cover;
  background-position: center;
}

.lang-code {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
}

.dropdown-icon {
  font-size: 18px;
  transition: transform var(--transition-fast);
}

.lang-button[aria-expanded="true"] .dropdown-icon {
  transform: rotate(180deg);
}

/* Language Dropdown */
.lang-dropdown {
  position: absolute;
  top: calc(100% + var(--space-2));
  right: 0;
  min-width: 240px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-2);
  z-index: var(--z-dropdown);
  max-height: 400px;
  overflow-y: auto;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: transparent;
  border: none;
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-sm);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-option:hover {
  background: var(--hover-overlay);
}

.lang-option.active {
  background: var(--color-primary);
  color: var(--text-inverse);
}

.lang-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lang-name {
  font-weight: var(--font-semibold);
}

.lang-locale {
  font-size: var(--text-xs);
  opacity: 0.7;
  font-family: var(--font-mono);
}

.check-icon {
  font-size: 18px;
}

/* Dropdown Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--transition-base);
  transform-origin: top right;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

/* Mobile Menu Button */
.mobile-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: var(--z-fixed);
}

@media (min-width: 768px) {
  .mobile-menu-button {
    display: none;
  }
}

.menu-icon {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-base);
}

.menu-icon.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-icon.open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Navigation */
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--z-fixed);
  display: flex;
  justify-content: flex-end;
}

.mobile-nav {
  width: 100%;
  max-width: 320px;
  height: 100%;
  background: var(--bg-primary);
  padding: var(--space-20) var(--space-6) var(--space-6);
  overflow-y: auto;
  box-shadow: var(--shadow-2xl);
}

.mobile-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  min-height: 52px;
}

.mobile-nav-item:hover {
  background: var(--hover-overlay);
  color: var(--color-primary);
}

.mobile-nav-item.active {
  background: var(--color-primary);
  color: var(--text-inverse);
  font-weight: var(--font-semibold);
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--transition-base);
}

.mobile-menu-enter-from .mobile-nav-overlay,
.mobile-menu-leave-to .mobile-nav-overlay {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-nav,
.mobile-menu-leave-to .mobile-nav {
  transform: translateX(100%);
}

/* Body scroll lock when mobile menu is open */
.menu-open {
  overflow: hidden;
}
</style>