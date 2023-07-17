
<template>
    <div class="theme-switcher">
        <button v-if="$colorMode.value === 'light'" @click="setTheme('dark')">
            <i class="material-icons light">wb_sunny</i>
        </button>
        <button v-if="$colorMode.value === 'dark'" @click="setTheme('light')">
            <i class="material-icons dark">brightness_2</i>
        </button>
    </div>
</template>

<style scoped>
button {
    background: #4f4f4f;
    border-radius: 50%;
    width: 1.8em;
}
i.material-icons {
    top: .1em;
}
</style>

<script>
export default {
    name: 'ThemeSwitcher',

    methods: {
        setTheme(theme) {
            useColorMode().value = theme
        }
    },

    watch: {
        '$colorMode.value': {
            immediate: false,
            handler(theme) {
                document.documentElement.classList.remove('light', 'dark', 'system')
                document.documentElement.classList.add(theme)
            }
        }
    }
}
</script>