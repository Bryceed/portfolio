
<template>
    <div class="theme-switcher">
        <button v-if="$colorMode.preference === 'light'" @click="setTheme('dark')" >
            <div class="i-akar-icons-sun hover:i-akar-icons-sun-fill"></div>
        </button>
        <button v-else @click="setTheme('light')" >
            <div class="i-akar-icons-moon hover:i-akar-icons-moon-fill"></div>     
        </button>
    </div>
</template>

<style scoped>
button {
    border-radius: 50%;
    width: 2em;
    height: 2em;
}
div[class^="i-akar-icons-"] {
    font-size: 1.8em !important;
    opacity: 0.2;
}
div[class^="i-akar-icons-"]:hover {
    opacity: 1;
    transition: all .1s ease-in;
}

</style>

<script>
export default {
    name: 'ThemeSwitcher',

    methods: {
        setTheme(theme) {
            useColorMode().preference = theme
        },    
    },

    watch: {
        '$colorMode.value': {
            immediate: false,
            handler(theme) {
                this.theme = theme
            }
        }
    }
}
</script>