<template>
    <div>
        <HomeAboutMe />
        <HomeSkills />
        <h1>Portfolio</h1>
        <p>My portfolio</p>
        <ul>
            <li><nuxt-link to="/projects/1">Project 1</nuxt-link></li>
        </ul>
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

