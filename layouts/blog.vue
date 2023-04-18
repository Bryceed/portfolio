<template>
    <main>
        <nuxt-content :document="$this" />
        <prev-next :prev="prev" :next="next" />
    </main>
    <slot />
</template>
<script>
export default {
    async asyncData({ $content, params }) {
        const article = await $content('articles', params.slug).fetch()

        const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch()

        return {
        article,
        prev,
        next
        }
    },
}
</script>