<template>
    <Menu />
    <div class="container">
        <router-view></router-view>
    </div>
    <Footer />
    <!-- Componente invisível que ajuda na reatividade do i18n -->
    <CommonI18nRefresher @localeChanged="handleLocaleChange" />
</template>

<script>
export default {
  methods: {
    handleLocaleChange(locale) {
      // Forçar atualização do layout quando o idioma mudar
      this.$forceUpdate();
      console.log('Layout detectou mudança de idioma para:', locale);
    }
  }
}
</script>