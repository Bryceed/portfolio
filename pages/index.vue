<template>
    <div v-if="isPrideMonth">
        <CommonAlertsPride />
    </div>
    <HomeAboutMe />
    <ProjectsMiniDisplay />
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
        const date = new Date()
        const isPrideMonth = date.getMonth() === 6;
        const isChristmas = date.getMonth() === 11;
        const isHalloween = date.getMonth() === 9;
        const isNewYears = date.getMonth() === 0;
        return {
            intent: this.$route.query.intent,
            block: this.$route.query.block,
            isPrideMonth,
            isChristmas,
            isHalloween,
            isNewYears
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
        document.title = 'Portfolio | Well.dev'

        // create script and inject an isPrideMonth verification (to alert the user)
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
        script.async = true
        document.head.appendChild(script)
    }
}
</script>

