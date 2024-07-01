<template>
    <footer class="footer">
        <p v-html="$t('html.footer[0]', { year: getYear() })"></p>
        <p v-html="$t('html.footer[1]', { url: github })"></p>
    </footer>
</template>

<script>
import { about } from '../data/about.json';

export default {
    data() {
        return {
            github: about.links.github
        }
    },

    methods: {
        getYear() {
            return new Date().getFullYear();
        }
    },
}
</script>

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
html.light .footer {
    background-color: #E6E6E6;
}
.footer a {
    text-decoration: underline;
    font-weight: 700;
}
.footer p:first-child {
    font-weight: 700;
}
</style>
