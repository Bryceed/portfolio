<template>
    <nav>
        <a href="/"><!-- guarantee full reload ("panic button" for bugs) -->
            <div class="logo">
                <span>W</span>
                <span>e</span>
                <span>l</span>
                <span>l</span>
                <div class="typing">
                    <span>.</span>
                    <span>d</span>
                    <span>e</span>
                    <span>v</span>
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
                            // get the item.name value to check if there's a key in the language file
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
                            <span v-if="$t(`menu.${item.name.toLowerCase()}`) != item.name.toLowerCase()">{{ $t(`menu.${item.name.toLowerCase()}`) }}</span>
                            <span v-else>{{ item.name }}</span>
                        </NuxtLink>
                    </template>
                </li>
                <li class="menu-item lang-switcher" @click="langSwitch()">
                    <span class="flag-text">{{ $t('language.region') }} </span>

                    <div v-if="$i18n.locale == 'en' || $i18n.locale == 'en-US'" class="flag flag-en rounded"></div>

                    <div v-else-if="$i18n.locale == 'pt-BR' || $i18n.locale == 'pt'" class="flag flag-pt rounded"></div>

                    <div v-else-if="$i18n.locale == 'es' || $i18n.locale == 'es-ES'" class="flag flag-es rounded"></div>

                    <div v-else-if="$i18n.locale == 'fr' || $i18n.locale == 'fr-FR'" class="flag flag-fr rounded"></div>

                    <div v-else-if="$i18n.locale == 'jp' || $i18n.locale == 'ja-JP'" class="flag flag-jp rounded"></div>

                        <div v-else-if="$i18n.locale == 'ko' || $i18n.locale == 'ko-KR'" class="flag flag-ko rounded"></div>

                    <div v-else class="flag flag-en rounded"></div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { menu } from "../data/menu.json";
let menuOpen = false;
export default {
    name: 'Menu',

    data() {
        return {
            menu,
            menuOpen
        }
    },

    mounted() {
        const logo = document.querySelector('.logo')
        const codeSelector = document.querySelector('.code-selector')
        let spans = document.querySelectorAll('.logo span')
        const typing = () => {
            spans.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('active')
                }, 100 * (idx + 1))
            })

            setTimeout(() => {
                codeSelector.classList.add('active')
            }, 1000)

            setTimeout(() => {
                codeSelector.classList.remove('active')
            }, 1500)
        }
        typing()

        const newSuffixTexts = [
            '.dev',
            '.design',
            '.web', 
            '.ux',
            '.app',
            '.gamer',
            '.streamer',
            '.LGBTQIA+',
            '.INTP-T',
            'ington N.',
        ]

        let index = 0;
        let indexDelay = 0;
        let waitingTime = 0;
        let oldSuffix;
        let newSuffix;
        let toEdit = document.querySelector('.typing');
        let editSpans;

        setInterval(() => {
            toEdit = document.querySelector('.typing');
            editSpans = document.querySelectorAll('.typing span');
            index++;
            oldSuffix = newSuffixTexts[index - 1];
            newSuffix = newSuffixTexts[index];
            
            if (index > newSuffixTexts.length - 1) {
                clearInterval();
            }
            waitingTime = 0;
            
            console.log(oldSuffix.length, newSuffix.length)

            codeSelector.classList.add('active')

            for (let i = oldSuffix.length - 1; i >= 0; i--) {
                indexDelay += 200;
                setTimeout(() => {
                    editSpans[oldSuffix.length - 1 - i].classList.add('remove')
                    setTimeout(() => {
                        editSpans[oldSuffix.length - 1 - i].remove()
                    }, 200)
                }, 170 * (i + 1))
            }

            indexDelay = 0;

            setTimeout(() => {
                codeSelector.classList.add('active')
                waitingTime = 0;
                for (let i = 0; i < newSuffix.length; i++) {
                    let _span = document.createElement('span');
                    _span.innerText = newSuffix[i];
                    _span.classList.add('active')
                    setTimeout(() => {
                        toEdit.appendChild(_span)
                    }, 60 * (i + 1))
                    setTimeout(() => {
                        waitingTime += 60;
                    }, 60 * (i + 1))
                }

                setTimeout(() => {
                    codeSelector.classList.remove('active')
                }, waitingTime)
            }, 1500 + waitingTime)
            
        }, 4000 + waitingTime)
    },

    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen
        },

        closeMenu() {
            this.menuOpen = false
        },

        langSwitch() {
            if (this.$i18n.locale == 'en' || this.$i18n.locale == 'en-US') {
                localStorage.setItem('lang', 'pt-BR')
                this.$i18n.locale = 'pt-BR'
            } else if (this.$i18n.locale == 'pt-BR' || this.$i18n.locale == 'pt') {
                localStorage.setItem('lang', 'es')
                this.$i18n.locale = 'es'
            } else if (this.$i18n.locale == 'es' || this.$i18n.locale == 'es-ES') {
                localStorage.setItem('lang', 'fr')
                this.$i18n.locale = 'fr'
            } else if (this.$i18n.locale == 'fr' || this.$i18n.locale == 'fr-FR') {
                localStorage.setItem('lang', 'jp')
                this.$i18n.locale = 'jp'
            } else if (this.$i18n.locale == 'jp' || this.$i18n.locale == 'ja-JP') {
                localStorage.setItem('lang', 'ko')
                this.$i18n.locale = 'ko'
            } else if (this.$i18n.locale == 'ko' || this.$i18n.locale == 'ko-KR') {
                localStorage.setItem('lang', 'en')
                this.$i18n.locale = 'en'
            } else {
                localStorage.setItem('lang', 'en')
                this.$i18n.locale = 'en'
            }
        }
    }
}
</script>

<style>
nav {
    background-color: rgba(51, 51, 51, .7);
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    border-radius: 5px;
    position: sticky;
    top: 20px;
    z-index: 9;
    backdrop-filter: blur(10px);
}
nav::after {
    content: '';
    position: absolute;
    top: -60px;
    left: -20px;
    right: -20px;
    height: 60px;
    background: linear-gradient(to top, rgba(34, 34, 34, 0.8), #222222 31%);
    z-index: -1;
    border-radius: 30px;
}

html.light nav {
    filter: invert(1) brightness(1.5);
    background-color: rgba(0,0,0, .9);
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

nav ul li a:hover {
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
    transition: ease-out .3s;
    cursor: pointer;
}
.lang-switcher:hover {
    box-shadow: 0 0 0 .15em white;
    background: black;
}
.lang-switcher:active {
    transition-duration: .1s;
    position: relative;
    right: -.2em;
    background: #222;
}
.lang-switcher:active .flag-text {
    margin-right: .15em
}

@media (max-width: 599px) {
    nav .menu-btn {
        display: block;
        position: relative;
        z-index: 5;
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
</style>