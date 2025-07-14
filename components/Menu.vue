<template>
    <div class="menuHandler">
        <!-- Overlay para mobile menu -->
        <div v-if="menuOpen && isMobile" class="mobile-menu-overlay" @click="closeMenu()"></div>
        <nav>
            <a href="/"><!-- guarantee full reload ("panic button" for bugs) -->
                <div class="logo">
                    <span>W</span>
                    <span>e</span>
                    <span>l</span>
                    <span>l</span>
                    <div class="typing">
                        
                    </div>
                    <div class="code-selector active"></div>
                </div>
            </a>
            <div class="menu-canMobile">
                <button class="menu-btn" @click="menuOpen = !menuOpen" :class="{ 'menu-open': menuOpen }">
                    <i class="material-icons">menu</i>
                </button>
                <ul class="menu" :class="{ 'menu-open': menuOpen }">
                    <li v-for="item in menu" :key="item.id">
                        <template v-if="item.submenu">
                            <a href="javascript:void(0)" @click="item.open = !item.open" class="menu-item">
                                <i class="material-icons expand-icon" v-if="!item.open">expand_more</i>
                                <i class="material-icons collapse-icon" v-if="item.open">expand_less</i>
                                <span v-if="$t(`menu.${item.name}`) != item.name">{{ $t(`menu.${item.name}`) }}</span>
                                <span v-else>{{ item.name }}</span>
                            </a>
                            <ul v-if="item.open" class="submenu">
                                <li v-for="subitem in item.submenu" :key="subitem.id">
                                    <a :href="subitem.link" target="_blank">{{ subitem.name }}</a>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <NuxtLink :to="item.link" class="menu-item" @click="closeMenu()">
                                <span v-if="$t(`menu.${item.name.toLowerCase()}`) != item.name.toLowerCase()">{{
                                    $t(`menu.${item.name.toLowerCase()}`) }}</span>
                                <span v-else>{{ item.name }}</span>
                            </NuxtLink>
                        </template>
                    </li>
                    <li class="menu-item lang-switcher" :class="{ 'menu-open': langPopupOpen }" style="position:relative;" v-if="currentLang">                      <div class="lang-display" @click="toggleLangPopup()">
                        <span :class="getFlagClassForLang(currentLang)" class="flag rounded language-flag" :title="currentLang.name"></span>
                        <span class="flag-text">{{ currentLang.region || $t('language.region') }}</span>
                      </div>

                      <!-- Popup inline em vez de componente -->
                      <div v-if="langPopupOpen" class="lang-popup">
                        <div class="lang-grid">
                          <div 
                            v-for="lang in languages" 
                            :key="getLangKey(lang)" 
                            class="lang-item"
                            :class="{ 'active': currentLang.code === lang.code && currentLang.region === lang.region }"
                            @click="selectLang(lang)"
                          >
                            <span :class="getFlagClassForLang(lang)" class="flag rounded"></span>
                            <div class="lang-info">
                              <div class="lang-code">
                                {{ lang.code }}<span v-if="lang.region && lang.region !== lang.code">-{{ lang.region }}</span>
                              </div>
                              <div class="lang-name">{{ lang.name }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                        <ThemeSwitcher />
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import { menu } from "../data/menu.json";
import LanguageSelector from './common/LanguageSelector.vue';
import ThemeSwitcher from './theme/Switcher.vue';
import { onMounted } from 'vue';

let menuOpen = false;
let langPopupOpen = false;

export default {
    name: 'Menu',
    components: {
        LanguageSelector,
        ThemeSwitcher
    },    created() {
        // Vamos usar um método específico para lidar com a inicialização do idioma
        if (process.client) {
            this.$nextTick(() => {
                this.initializeLanguageFromLocalStorage();
            });
        }
    },
    data() {
        // Durante o SSR, sempre inicializamos com o idioma padrão
        let initialLang = { code: 'pt', region: 'BR', name: 'Português (Brasil)' };
        
        // Define as linguagens disponíveis (removido en-CA e pt-PT)
        const availableLanguages = [
            { code: 'pt', region: 'BR', name: 'Português (Brasil)' },
            { code: 'en', region: 'US', name: 'English' },
            { code: 'es', region: 'ES', name: 'Español' },
            { code: 'fr', region: 'FR', name: 'Français' },
            { code: 'de', region: 'DE', name: 'Deutsch' },
            { code: 'ru', region: 'RU', name: 'Русский' },
            { code: 'ja', region: 'JP', name: '日本語' },
            { code: 'ko', region: 'KR', name: '한국어' }
        ];
        
        // Durante o SSR, evitamos acessar localStorage
        // A atualização para o idioma salvo acontecerá no cliente (mounted e created)
        
        return {
            menu,
            menuOpen,
            langPopupOpen,
            isMobile: typeof window !== 'undefined' ? window.innerWidth <= 1024 : false,
            languages: availableLanguages,
            currentLang: initialLang
        }    },    watch: {
        '$i18n.locale': {
            immediate: false,
            handler(newVal) {
                // Atualiza currentLang ao trocar o locale
                const found = this.languages.find(l => {
                  const locale = l.region && l.region !== l.code ? `${l.code}-${l.region}` : l.code;
                  return locale.toLowerCase() === newVal.toLowerCase();
                });
                
                if (found && process.client) {
                    this.currentLang = { ...found };
                }
            }
        }
    },mounted() {
        // Inicializa o idioma somente no cliente após a hidratação
        if (process.client) {
            // Esperamos a hidratação estar completa antes de inicializar o idioma
            setTimeout(() => {
                this.initializeLanguageFromLocalStorage();
            }, 100);
            // Adicionar ouvinte para o evento de mudança de idioma
            document.addEventListener('languageChanged', this.handleLanguageChangeEvent);
            // Adicionar ouvinte para mudanças no localStorage de outras guias/frames
            window.addEventListener('storage', this.handleStorageEvent);
            // OUVIR evento global de atualização de i18n
            document.addEventListener('i18n:updateRequested', () => {
                // Atualiza o idioma atual e força atualização do menu
                this.initializeLanguageFromLocalStorage();
                this.$forceUpdate();
            });
        }
        
        // Configurações do logo
        const logo = document.querySelector('.logo');
        const codeSelector = document.querySelector('.code-selector');
        const spans = document.querySelectorAll('.logo span');
        const typingContainer = document.querySelector('.typing');
        const suffixes = ['ington N.', 'Nas.dev'];
        let currentSuffixIndex = 0;

        const activateSpans = () => {
            spans.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('active');
                }, 100 * (idx + 1));
            });

            setTimeout(() => {
                codeSelector.classList.add('active');
            }, 1000);

            setTimeout(() => {
                codeSelector.classList.remove('active');
            }, 1500);
        };

        const updateSuffix = () => {
            const currentSuffix = suffixes[currentSuffixIndex];
            const nextSuffix = suffixes[(currentSuffixIndex + 1) % suffixes.length];
            currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length;

            // Remove current suffix
            Array.from(typingContainer.children).forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('remove');
                    setTimeout(() => span.remove(), 300);
                }, idx * 100);
            });

            // Add new suffix
            setTimeout(() => {
                codeSelector.classList.add('active');
                nextSuffix.split('').forEach((char, idx) => {
                    setTimeout(() => {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.classList.add('active');
                        typingContainer.appendChild(span);
                    }, idx * 100);
                });

                setTimeout(() => {
                    codeSelector.classList.remove('active');
                }, nextSuffix.length * 100 + 500);
            }, currentSuffix.length * 100 + 500);
        };

        activateSpans();

        setInterval(updateSuffix, 4000);
    },    // Removido beforeMount que estava quebrando a reatividade do i18n
    // A inicialização do idioma já é feita pelo plugin i18n.ts

    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen
        },

        closeMenu() {
            this.menuOpen = false
        },

        toggleLangPopup() {
            this.langPopupOpen = !this.langPopupOpen;
            console.log('Popup estado:', this.langPopupOpen);
        },    selectLang(lang) {
        try {
            // Construir o locale no formato correto (pt-BR, en, etc)
            const locale = lang.region && lang.region !== lang.code ? `${lang.code}-${lang.region}` : lang.code;
            // Atualizar o estado local do componente
            this.currentLang = { ...lang };
            // Salvar no localStorage imediatamente
            if (process.client) {
                localStorage.setItem('lang', locale);
            }
            // Fechar o popup
            this.langPopupOpen = false;
            // Disparar evento principal de mudança de idioma 
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { locale: locale }
            }));
            // Atualizar diretamente o locale
            if (this.$i18n && this.$i18n.global && typeof this.$i18n.global.locale === 'object' && this.$i18n.global.locale !== null) {
                this.$i18n.global.locale.value = locale;
            } else if (this.$i18n) {
                this.$i18n.locale = locale;
            }
            // Forçar atualização deste componente
            this.$forceUpdate();
        } catch (error) {
            console.error('Erro ao alterar o idioma:', error);
        }
    },

        getLangKey(lang) {
            return `${lang.code}_${lang.region.toUpperCase() || ''}`;
        },
        
        getLangFlagClass() {
            const lang = this.currentLang;
            return this.getFlagClassForLang(lang);
        },          getFlagClassForLang(lang) {
            if (!lang) return 'flag flag-en_US'; 
            let code = (lang.code || 'en').toLowerCase();
            let region = lang.region ? lang.region.toUpperCase() : 'US'; // 
            return `flag flag-${code}_${region}`;
        },        isMobile() {
            return window.innerWidth <= 1024
        },
          // Método para inicializar o idioma do localStorage
        initializeLanguageFromLocalStorage() {
            if (!process.client) return; // Executar apenas no cliente
            
            try {
                const savedLocale = localStorage.getItem('lang');
                console.log('Locale salvo recuperado:', savedLocale);
                
                if (!savedLocale) return;
                
                // Encontrar o objeto de idioma correspondente
                const found = this.languages.find(l => {
                    const locale = l.region && l.region !== l.code ? `${l.code}-${l.region}` : l.code;
                    return locale.toLowerCase() === savedLocale.toLowerCase();
                });
                
                if (!found) {
                    console.warn('Idioma salvo não encontrado na lista de idiomas disponíveis:', savedLocale);
                    return;
                }
                
                console.log('Idioma encontrado:', found);
                
                // Atualizar o estado local com o idioma encontrado
                this.currentLang = JSON.parse(JSON.stringify(found));
                
                // Atualizar o i18n (priorizar a API global do Vue I18n 9)
                if (this.$i18n.global) {
                    this.$i18n.global.locale.value = savedLocale;
                } else {
                    this.$i18n.locale = savedLocale;
                }
                
                // Forçar a atualização da interface
                this.$nextTick(() => {
                    this.$forceUpdate();
                    
                    // Atualizar classes da bandeira se necessário
                    const flagElement = document.querySelector('.language-flag');
                    if (flagElement) {
                        const correctClass = this.getFlagClassForLang(found);
                        
                        // Limpar classes antigas
                        [...flagElement.classList].forEach(cls => {
                            if (cls.startsWith('flag-')) {
                                flagElement.classList.remove(cls);
                            }
                        });
                        
                        // Adicionar classes novas
                        correctClass.split(' ').forEach(cls => {
                            if (cls.startsWith('flag-')) {
                                flagElement.classList.add(cls);
                            }
                        });
                    }
                });
                
                console.log('Idioma inicializado com sucesso:', savedLocale);
            } catch (error) {
                console.error('Erro ao inicializar idioma:', error);
            }
        },
          // Método para lidar com evento de mudança de idioma
        handleLanguageChangeEvent(event) {
            try {
                if (event.detail && event.detail.locale) {
                    // Encontrar o objeto de idioma correspondente
                    const found = this.languages.find(l => {
                        const locale = l.region && l.region !== l.code ? `${l.code}-${l.region}` : l.code;
                        return locale.toLowerCase() === event.detail.locale.toLowerCase();
                    });
                    
                    if (found) {
                        this.currentLang = { ...found };
                        
                        // Forçar atualização do menu quando o idioma mudar
                        this.$nextTick(() => {
                            this.$forceUpdate();
                            console.log('Menu atualizado após mudança de idioma');
                        });
                    }
                }
            } catch (error) {
                console.error('Erro ao processar evento de mudança de idioma:', error);
            }
        },
        
        // Método para lidar com mudanças no localStorage
        handleStorageEvent(event) {
            try {
                if (event.key === 'lang' && event.newValue) {
                    // Encontrar o objeto de idioma correspondente
                    const found = this.languages.find(l => {
                        const locale = l.region && l.region !== l.code ? `${l.code}-${l.region}` : l.code;
                        return locale.toLowerCase() === event.newValue.toLowerCase();
                    });
                    
                    if (found) {
                        this.currentLang = { ...found };
                    }
                }
            } catch (error) {
                console.error('Erro ao processar evento de armazenamento:', error);
            }
        },
    },
    mounted() {
        // Atualiza isMobile ao redimensionar
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.updateIsMobile);
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.updateIsMobile);
        }
    },
    methods: {
        ...((typeof window !== 'undefined') ? {
            updateIsMobile() {
                this.isMobile = window.innerWidth <= 1024;
            },
        } : {}),
        closeMenu() {
            this.menuOpen = false;
        },
    },
}
</script>

<style scoped lang="scss">
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  z-index: 19;
  display: block;
}
.menuHandler {
    padding: 20px;
    position: sticky;
    top: 0;
    z-index: 10;
}

nav {
    background-color: rgba(51, 51, 51, .7);
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 2rem !important;
    z-index: 9;
    backdrop-filter: blur(10px);
}

nav::before {
    content: '';
    position: absolute;
    top: -60px;
    left: -20px;
    right: -20px;
    height: 60px;
    background: linear-gradient(to top, rgba(34, 34, 34, 0.8), #222222 31%);
    border-radius: 30px;
}

nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}

nav ul li {
    display: inline-block;
    margin-right: 10px;
    position: relative;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
}
nav ul li a.router-link-active {
    color: #7b5efc;
    font-weight: bold;
    position: relative;
    transition: ease-out .1s;
}

// make underline effect
nav ul li a.router-link-active::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
    height: 10px;
    border-radius: 2px;
    background-image: linear-gradient(0deg, #7b5efc 2px, #7b5efc81 2px, #7b5efc21 4px, transparent 100%);
    animation: underline .2s backwards;
}

@keyframes underline {
    0% {
        width: 0;
        left: 50%;
        height: 0;
    }

    100% {
        width: 100%;
        left: 0;
        height: 10px;
    }
}

nav ul li a:hover:not(.router-link-active) {
    color: #ccc;
}

nav .logo {
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    margin: 0 10px;
    display: flex;
    align-items: center;
    height: 1.5em;
}

nav .logo .code-selector {
    height: 1.1em;
    width: .65em;
    background-color: #fff;
    display: inline-block;
    animation: blink 1s infinite;
    animation-delay: 1s;
    transition: ease-out 1s;
}

nav .logo .code-selector.active {
    animation: none;
}

nav .logo span {
    display: none;
    width: 0;
}

nav .logo span.active {
    display: inline-block;
    animation: typing .1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    transition: ease-out 1s;
}

@keyframes typing {
    0% {
        width: 0;
    }

    100% {
        width: 0.7em;
    }
}

@keyframes blink {
    0% {
        height: 1em;
    }

    40%,
    50% {
        height: 0em;
    }

    100% {
        height: 1em;
    }
}

/* dropdown menu */
nav ul li ul {
    display: none;
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 10px;
    margin: 0;
    top: 100%;
    width: 160px;
    right: 0;
}

nav ul li ul li {
    display: block;
    margin: 0;
}

nav .menu-btn {
    display: none;
}

nav ul li.lang-switcher {
    background: #4f4f4f;
    padding: 0.25em 1em;
    border-radius: 1em;
    display: flex;
    transition: ease-in-out .3s;
    cursor: pointer;
}

.lang-switcher:hover {
    box-shadow: 0 0 0 .15em white;
    background: black;
}

.lang-switcher:active {
    transition-duration: .1s;
    position: relative;
    background: #222;
}

@media (max-width: 1024px) {
    nav .menu-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 20;
        background-color: rgba(255, 255, 255, .2);
        width: 2.3rem;
        height: 2.1rem;
        border-radius: .2rem;
        zoom: 1.2;

        .material-icons {
            height: 24px !important;
            color: #fff;
        }
    }

    nav .menu li {
        display: none;
    }

    nav .menu.menu-open {
        position: absolute;
        right: -20px;
        top: -20px;
        background-color: #111111;
        box-shadow: 0 0 30px #333;
        height: 100vh;
        width: clamp(240px, 30vw, 400px);
        flex-direction: column;
        padding-top: 100px;
    }

    nav .menu.menu-open::after {
        content: '';
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100vh;
        width: 100vw;
        background: linear-gradient(to top, rgba(34, 34, 34, 0.8), #222222F8 31%);
        z-index: -1;
        border-radius: 30px;
    }

    nav .menu.menu-open::before {
        content: "WEBSITE";
        position: absolute;
        top: 33px;
        right: 70px;
    }

    nav .menu:not(.menu-open) li.lang-switcher {
        display: none;
    }

    nav .menu.menu-open li {
        margin: 0;
        padding: .5em 1.5em;
        display: block;
        text-align: left;
        background-color: #2222223E;
        width: 100%;
        border-bottom: thin solid #FFFFFF63;
    }

    nav .menu.menu-open li:first-of-type {
        border-top: thin solid #FFFFFF63;
    }

    nav .menu.menu-open li:last-of-type {
        margin-bottom: 20px;
    }

    nav .menu li .submenu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
}

html.light nav {
    background-color: rgba(227, 227, 227, 0.8);
    box-shadow: inset 0 0 6px #ccc, 0 0 6px #979797;
    color: #000;
}

html.light nav::before {
    background: linear-gradient(0deg, #d1d1d17a, #D1D1D1 31%);
}

html.light nav ul li a {
    color: #555;
    font-weight: 500;
}

html.light nav ul li a.router-link-active {
    color: #7B5EFC;
    font-weight: bold;
}

html.light nav ul li a:hover:not(.router-link-active) {
    color: #000;
}

html.light nav .logo .code-selector {
    background-color: #000;
}

html.light nav ul li.lang-switcher {
    background: #ECECEC;
    color: #000;
    box-shadow: 0 .07em 0 .1em #00000009;
    position: relative;
    top: 0;
}

html.light nav ul li.lang-switcher:hover {
    box-shadow: 0 0 0 .15em #5f0de4;
    color: #5f0de4;
    background: #FFFFFF;
    transition: ease-out .1s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

nav ul li.smart-active a {
    color: #ff0;
    /* Estilo para o item ativo */
    font-weight: bold;
}

// Novos estilos para o selector de idiomas
.lang-display {
  display: flex;
  align-items: center;
  gap: 0.3em;
}

.lang-toggle {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.lang-popup {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 10000;
  background: #181818;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 1.5px 8px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  max-width: 280px;
  width: 75vw;
  border: 1.5px solid #232323;
  animation: popup-fade-in 0.2s ease-out;
}


@keyframes popup-fade-in {
  from { opacity: 0; transform: translateY(-10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.lang-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem; /* Adiciona espaçamento à direita para rolagem */
}

.lang-item {
  display: flex;
  align-items: center;
  gap: 0.7em;
  padding: 0.5em 0.7em 0.5em 1em;
  border-radius: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  overflow: visible;
}

.lang-item:hover {
  
  background: #7B5EFC42;
}

.lang-item.active {
  color: #fff;
  position: relative;
  z-index: 10;
}
.lang-item.active:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0%;
    width: .35rem;
    height: 1.75rem;
    border-radius: 1rem;
    background-color: #7B5EFC;
    transform: translateY(-50%);
    transition: all 0.2s ease-in-out;
}

.lang-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.lang-name {
  font-weight: 600;
  font-size: 1.05em;
  color: #fff;
}

.lang-code {
  font-size: 0.85em;
  color: #bbb;
  opacity: 0.7;
  margin-top: 2px;
}
.lang-display > .flag {
    position: relative;
    left: -.2em;
}
.lang-grid .flag {
  width: 2.4em;
  height: 2.4em;
  border-radius: 15%;
}

html.light {
  .lang-popup {
    background: #f5f5f5;
    border-color: #e0e0e0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 1.5px 8px rgba(0, 0, 0, 0.1);
  }

  .lang-item:hover {
    background: #e9e9e9;
  }

  .lang-code {
    color: #333;
  }

  .lang-name {
    color: #666;
  }
}

/* Language flag animation */
.language-flag {
    transition: all 0.3s ease;
    animation: flag-change 0.4s ease-in-out;
}

@keyframes flag-change {
    0% { 
        transform: scale(0.8);
        opacity: 0.6; 
    }
    50% { 
        transform: scale(1.2);
        opacity: 0.8; 
    }
    100% { 
        transform: scale(1);
        opacity: 1; 
    }
}
</style>