<template>
    <div>
        <div v-if="intent === 'twitch'">
            <HomeTwitch />
        </div>
        <div v-if="intent === 'skills'">
            <HomeSkills />
        </div>
        <HomeAboutMe />
        <div v-if="intent != 'skills'">
            <HomeSkills />
        </div>
        <div v-if="intent != 'twitch'">
            <HomeTwitch />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',

    setup() {
        const route = useRoute()
        return {
            route
        }
    },

    data() {
        return {
            intent: this.$route.query.intent
        }
    },

    head() {
        return {
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
            ],
        }
    },

    mounted() {
        console.log("Portfolio")
        document.title = 'Well.dev | Nuxt3 + Vite'
    },
}
</script>

