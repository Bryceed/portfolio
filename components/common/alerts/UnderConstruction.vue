<template>
    <div class="under-construction">
        <i class="material-icons">warning_amber</i>
        <h2 v-html="$t('html.commons.underConstruction.title')"></h2>
        <div v-html="$t('html.commons.underConstruction.description')">
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonAlertsUnderConstruction"
}
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
    background-color: red;
    border-radius: 10%;
    padding: .6rem;
}

.under-construction h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
}

.under-construction p {
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
}
</style>