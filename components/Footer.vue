<template>
    <footer class="footer">
        <p>
            Site built with <a href="https://nuxtjs.org">Nuxt3</a> (Vue.js) and <a href="https://vitejs.dev">Vite</a>. Under development.
        </p>
        <p>
            Visit my <a href="https://github.com/Bryceed">GitHub</a> to check more about my profile and projects (including this one).
        </p>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #333333;
    padding: 1rem;
    margin: 0 20px;
    width: calc(100% - 40px);
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.footer a {
    text-decoration: underline;
    font-weight: 700;
}
.footer p:first-child {
    font-weight: 700;
}
</style>
