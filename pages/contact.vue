<template>
    <div>
        <CommonAlertsUnderConstruction>
            <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
                <button class="btn btn-primary" @click="openLink('/files/cv/Wellington.pdf')">
                    <div class="mb-1">
                        <span class="i-akar-icons-download mb-1 mr-1"></span>
                        <span class="mx-2">CV</span>
                    </div>
                </button>

                <div class="divider"></div>

                <button class="btn btn-primary" @click="openLink('https://discord.gg/uYvVeha')">
                    <div class="mb-1">
                        <span class="i-akar-icons-discord-fill mb-1"></span>
                    </div>
                </button>
                <button class="btn btn-primary" @click="openLink('https://github.com/bryceed')">
                    <div class="mb-1">
                        <span class="i-akar-icons-octocat-fill mb-1"></span>
                    </div>
                </button>
                <button class="btn btn-primary" @click="openLink('https://www.linkedin.com/in/wellington-do-nascimento/')">
                    <div class="mb-1">
                        <span class="i-akar-icons-linkedin-fill mb-1"></span>
                    </div>
                </button>
                <button class="btn btn-primary" @click="openLink('https://api.whatsapp.com/send?phone=5511942018873')">
                    <div class="mb-1">
                        <span class="i-akar-icons-whatsapp-fill mb-1"></span>
                    </div>
                </button>
            </div>
        </CommonAlertsUnderConstruction>
    </div>
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