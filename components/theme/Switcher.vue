<template>
    <li @click="toggleColorMode">
        <span class="material-icons">tune</span>
        <ul>
            <h4>{{ $t('language') }} (default root: {{ $i18n.locale }})</h4>
            <select v-model="$i18n.locale" @change="saveLanguage" style="width: 100%;">
                <option v-for="(lang, i) in langs" :key="lang" :value="lang">
                    {{ lang }}
                </option>
            </select>

            <h4>Theme</h4>
            <li @click="colorMode.preference = 'system'" :class="{ active: colorMode.preference === 'system' }">
                <span class="material-icons">settings</span><span>System</span>
            </li>
            <li @click="colorMode.preference = 'light'" :class="{ active: colorMode.preference === 'light' }">
                <span class="material-icons">wb_sunny</span><span>Light</span>
            </li>
            <li @click="colorMode.preference = 'dark'" :class="{ active: colorMode.preference === 'dark' }">
                <span class="material-icons">brightness_3</span><span>Dark</span>
            </li>
            <li @click="colorMode.preference = 'pride'" :class="{ active: colorMode.preference === 'pride' }">
                <span class="material-icons">favorite</span><span>Colors</span>
            </li>
            <li @click="colorMode.preference = 'sepia'" :class="{ active: colorMode.preference === 'sepia' }">
                <span class="material-icons">filter_vintage</span><span>Night Filter</span>
            </li>
        </ul>
    </li>
</template>

<style scoped>
h4 {
    padding: 0 10px;
    font-weight: 700;

}

li {
    z-index: 999;
}

li ul {
    display: none;
    opacity: 0;
    transition: ease-out .25s;
}

li:hover ul {
    display: block;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #111;
    color: #fff;
    padding: 10px 0;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    transition: ease-out .35s;
    opacity: 1;
}

li ul li {
    margin: 0;
    padding: 3px 10px 12px;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
}

li ul li:not(.active) {
    padding-left: 25px;
}

li ul li.active::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #fff;
    margin-right: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5);
    animation: expandSelector .25s ease-out forwards;
    position: relative;
    top: 4px;
}

li ul li span:nth-child(2) {
    margin-top: 7px;
}

@keyframes expandSelector {
    0% {
        width: 5px;
        height: 5px;
        border-radius: 0;
        box-shadow: none;
    }

    100% {
        width: 5px;
        height: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5);
    }
}

li ul li:hover {
    background-color: #555;
}

li ul li span {
    margin-right: 10px;
}
</style>

<script>
import { useI18n } from 'vue-i18n';

export default {
    
    setup() {
        const colorMode = useColorMode();
        return { colorMode };
    },
    data() {
        return {
            language: this.$i18n.locale,
            langs: ['en', 'pt', 'es'],
        }
    },
    computed() {
        return {
            $i18n: i18n,
        }
    },
    methods: {
        saveLanguage() {
            localStorage.setItem("language", this.language);
            this.language = this.selectedLang;
            useI18n.locale = this.language;
        },
    },
    mounted() {
        if (localStorage.getItem("language")) {
            this.language = localStorage.getItem("language");
        } else {
            this.language = "en";
        }
    },
}
</script>