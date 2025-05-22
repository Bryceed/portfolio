<template>
  <div class="contact-page">
    <div class="contact-header">
      <h1>{{ $t('html.contact.title') }}</h1>
      <p>{{ $t('html.contact.description') }}</p>
    </div>
    <div class="contact-content">
      <p>Contact form and information will be displayed here once the issue is resolved.</p>
    </div>
  </div>
</template>

<script>
// import { getPageTitle } from '@/utils/pageTitle';
// import { contactLinks } from '@/utils/contactLinks'; // Temporariamente comentado
// import { contact } from '@/data/contact.json'; // Temporariamente comentado
// import about from '@/data/about.json'; // Temporariamente comentado

export default {
  name: "ContactPage",
  data() {
    return {
      // Dados de exemplo podem ser adicionados aqui se necessário para o template simplificado
    };
  },
  methods: {
    // Métodos de exemplo podem ser adicionados aqui
  },
  mounted() {
    // Simplificando a atualização do título para depuração
    if (typeof this.$t === 'function') {
      document.title = this.$t('html.contact.title') + " | Portfolio";
    } else {
      document.title = "Contact | Portfolio"; // Fallback se $t não estiver disponível
    }
  }
};
</script>

<style scoped>
.contact-page {
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 1rem;
}

.contact-header {
    text-align: center;
    margin: 2rem 0 3rem;
    position: relative;
    padding: 2rem;
    background: linear-gradient(90deg, var(--dark-primary-color), var(--dark-secondary-color));
    border-radius: 12px;
    color: #fff;
}

.contact-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
}

.contact-header p {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0.9;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 3rem;
}

/* ...demais estilos existentes... */
</style>