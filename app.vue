<template>
    <NuxtLayout>
        <router-view />
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
  }
}
</script>