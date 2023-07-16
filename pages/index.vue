<template>
    <v-if v-if="isPrideMonth">
        <CommonAlertsPride />
    </v-if>
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
        const isPrideMonth = date.getMonth() === 5 ? true : false;
        const isChristmas = date.getMonth() === 11 ? true : false;
        const isHalloween = date.getMonth() === 9 ? true : false;
        const isNewYears = date.getMonth() === 0 ? true : false;
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
    },
}
</script>

