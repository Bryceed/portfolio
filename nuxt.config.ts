// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    meta: {
        title: 'My Portfolio | Nuxt3 + Vite',
    },
    title: 'Hello',
    description:
        'This is some content coming from app.config.ts that support HMR, try to update it and see it in action.',
    showButton: false,
    modules: [
        '@nuxtjs/emotion',
        '@nuxt/ui',
        '@nuxtjs/color-mode'
    ],
    css: [
        '@/assets/css/main.css',
    ],
    
})
