// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
              hid: 'description',
              name: 'description',
              content: process.env.npm_package_description || ''
            }
          ],
    },
    title: 'Hello',
    description:
        'This is some content coming from app.config.ts that support HMR, try to update it and see it in action.',
    showButton: false,
    modules: [
        '@nuxt/content',
        '@nuxtjs/emotion',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
    ],
    css: [
        '@/assets/css/main.css',
    ],
    components: true,
    content: {
        markdown: {
            // Object syntax can be used to override default options
            toc: {
				depth: 3,
				searchDepth: 3,
			},
            prism: {
                theme: 'prism-themes/themes/prism-material-oceanic.css'
            }
        },
        highlight: {
			theme: "dracula-soft",
		},
        nestedProperties: ['author.name']
    }


})

