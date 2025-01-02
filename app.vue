<template>
  <NuxtLayout :name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
export default {
  name: 'App',
  head() {

    return {
      title: 'Wellington N. Portfolio',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Wellington N. Portfolio' }
      ],
      script: [
        { src: '/js/vanilla-tilt.min.js' },
      ]
    }
  },
  beforeMount() {
    // Importe o head aqui
    const head = this.$options.head.call(this)
    document.title = head.title

    head.link.forEach(link => {
      const linkElement = document.createElement('link')
      Object.keys(link).forEach(key => {
        linkElement.setAttribute(key, link[key])
      })
      document.head.appendChild(linkElement)
    });
    head.meta.forEach(meta => {
      const metaElement = document.createElement('meta')
      Object.keys(meta).forEach(key => {
        metaElement.setAttribute(key, meta[key])
      })
      document.head.appendChild(metaElement)
    });
    head.script.forEach(script => {
      const scriptElement = document.createElement('script')
      Object.keys(script).forEach(key => {
        scriptElement.setAttribute(key, script[key])
      })
      document.head.appendChild(scriptElement)
    });


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