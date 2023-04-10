<template>
    <div>
        <HomeAboutMe />
        <HomeSkills />
    </div>
</template>

<script>
export default {
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

