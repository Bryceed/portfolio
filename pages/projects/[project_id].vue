<template>
    <div>
        <h1>Project 1</h1>
        <p>My project 1 ({{ route.params.project_id }})</p>

        <nuxt-link to="/">Back</nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'Project',
    setup() {
        const route = useRoute()
        return {
            route
        }
    },

    created() {
        console.log("Project: " + this.$route.params.project_id)
    },
}
</script>

