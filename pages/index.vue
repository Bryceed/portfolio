<template>
    <HomeAboutMe />
    <HomeSkills />
    <HomeTwitch />
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
            intent: this.$route.query.intent,
            block: this.$route.query.block
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

