<template>
    <footer class="footer">
        <p ref="tiltView" v-html="$t('footer[0]')"></p>
        <p v-html="$t('footer[1]', { url: github, views: '<img src=\'https://contador.s12.com.br/img-aB3b5638Y895w9Cx-2.gif\' width=\'24\' height=\'24\' alt=\'Views counter\' class=\'views-counter\' />' })"></p>
    </footer>
</template>

<script>
import about from '../data/about.json';
import VanillaTilt from 'vanilla-tilt';

export default {
    data() {
        return {
            github: about.links.github || ''
        }
    },
    mounted() {
        if (this.$refs.tiltView) {
            VanillaTilt.init(this.$refs.tiltView, {
                max: 12,
                speed: 400,
                glare: true,
                'max-glare': 0.18,
                scale: 1.08
            });
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
