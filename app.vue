<template>
  <NuxtLayout :name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
export default {
    name: 'App',
    head () {
        
    return {
        title: 'My Portfolio | Nuxt3 + Vite',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ],
    }
  },

  mounted() {
    if (localStorage.getItem('lang')) {
      try {
        this.$i18n.locale = localStorage.getItem('lang')
      } catch (e) {
        localStorage.removeItem('lang');
      }
    } else {
      localStorage.setItem('lang', this.$i18n.locale)
      this.$i18n.locale = localStorage.getItem('lang')
    }
  }
}
</script>