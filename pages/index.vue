<template>
    <div v-if="isPrideMonth">
        <CommonAlertsPride />
    </div>
    <HomeAboutMe />
    <ProjectsMiniDisplay />
    <HomeSkills />

</template>

<script>
import { getPageTitle } from '../utils/pageTitle';

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
        const isPrideMonth = date.getMonth() === 5;
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

    mounted() {
        // create script and inject an isPrideMonth verification (to alert the user)
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
        script.async = true
        document.head.appendChild(script)

        document.title = getPageTitle({ mainPage: 'Home' });
    }
}
</script>

