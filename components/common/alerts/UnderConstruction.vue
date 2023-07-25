<template>
    <div class="under-construction">
        <i class="material-icons">warning_amber</i>
        <h2 v-html="$t('html.commons.underConstruction.title')"></h2>
        <p v-html="$t('html.commons.underConstruction.description')"></p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "CommonAlertsUnderConstruction"
};
</script>

<style scoped>
.under-construction {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 220px - 5rem);
}

.under-construction i {
    font-size: 5rem;
    color: white;
    margin-bottom: 20px;
    display: inline-table;
    background-color: rgba(95, 13, 228, 0.791);
    border-radius: 10%;
    padding: 0.6rem;
}

.under-construction h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    font-family: "Keep Calm", sans-serif;
    margin-bottom: 2.5rem;
}

.under-construction p {
    font-size: 1.25rem;
    font-weight: 400;
    text-align: center;
    max-width: 75%;
    display: inline;
    background-color: rgba(95, 13, 228, 0.103);
    padding: 0.2rem 0.5rem 0.3rem;
    border-radius: 0.2rem;
    opacity: .5;
}
</style>
