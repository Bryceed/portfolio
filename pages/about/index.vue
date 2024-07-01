<template>
    <a href="/about/personality-test">Teste de personalidade</a>

    <CommonAlertsUnderConstruction>
        <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
            <button class="btn btn-primary" @click="openLink('/files/cv/Wellington.pdf')">
                <div class="mb-1">
                    <span class="i-akar-icons-download mb-1 mr-1"></span>
                    <span class="mx-2">CV</span>
                </div>
            </button>

            <div class="divider"></div>

            <NuxtLink to="/about/personality-test" class="btn btn--primary">
                <span class="i-akar-icons-face-happy mb-1 mr-2"></span>
                <span>Personalidade: INTP-T</span>
            </NuxtLink>
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
        }
    }
};
</script>