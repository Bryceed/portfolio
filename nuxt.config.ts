import { Title } from "#build/components";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  showButton: false,

  modules: [
    "@nuxt/content",
    "@nuxtjs/emotion",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@unocss/nuxt",
    "dayjs-nuxt",
    "nuxt-jsonapi",
    "@nuxt/icon"
  ],

  css: ["@/assets/css/main.css"],

  components: true,

  content: {
    // Ensure the content module is correctly configured
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
      prism: {
        theme: "prism-themes/themes/prism-material-oceanic.css",
      },
    },
    highlight: {
      theme: "monokai",
    },
    nestedProperties: ["author.name"],
    documentDriven: true,
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: "2024-11-17",

  vite: {
    optimizeDeps: {
      exclude: ['vanilla-tilt']
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
});