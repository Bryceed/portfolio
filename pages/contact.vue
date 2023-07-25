<template>
    <div>
        <CommonAlertsUnderConstruction>
            <div class="btn-group btn-group-lg" role="group" aria-label="Basic example"> 
                <button class="btn btn-primary" @click="openLink('/files/cv/Wellington.pdf')">
                    <div class="mb-1">
                        <span class="i-akar-icons-copy mb-1 mr-1"></span>
                        <span class="ml-2">Curriculum (PDF)</span>
                    </div>
                </button>
                <button class="btn btn-primary" @click="openLink('https://www.linkedin.com/in/wellington-do-nascimento/')">
                    <div class="mb-1">
                        <span class="i-akar-icons-linkedin-box-fill mb-1 mr-1"></span>
                        <span class="ml-2">LinkedIn</span>
                    </div>
                </button>
            </div>
        </CommonAlertsUnderConstruction>
    </div>
</template>

<style scoped>
    .btn-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 60px auto;
        max-width: 1340px;
        padding: 0 20px;
        gap: 20px;
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