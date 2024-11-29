<template>

    <CommonAlertsUnderConstruction>
        <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
            <NuxtLink to="/about/personality-test" class="btn btn--primary" @mouseover="prefetchPersonalityResult"
                @click="prefetchLink">
                <span class="i-akar-icons-face-happy"></span>
                <span>MBTI</span>
            </NuxtLink>

            <div class="divider"></div>
            <NuxtLink to="/contact" class="btn btn--secondary"><i class="material-icons mb-2">email</i><span
                    v-html="$t('html.home.actions[1].label')"></span></NuxtLink>



        </div>
    </CommonAlertsUnderConstruction>
</template>

<style scoped>
.divider {
    width: 2px;
    height: 32px;
    background: #5c5c5c5b;
    margin: 0 10px;
}

.btn-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 60px auto;
    max-width: 1340px;
    padding: 0 20px;
    gap: 7px;
}

.btn-group button {
    cursor: pointer;
}
</style>

<script>
export default {
    name: "Contact",

    methods: {
        openLink(link) {
            window.open(link, '_blank');
        },
        prefetchPersonalityResult() {
            this.$nuxt.prefetch('/about/personality-test');
        },
        prefetchLink() {
            this.$nuxt.prefetch('/contact');
        }
    }
};
</script>