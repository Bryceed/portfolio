<template>

    <CommonAlertsUnderConstruction>
        <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
            <span class="hand-pointing">👉</span>
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
    position: relative;
}

.btn-group button {
    cursor: pointer;
}

.hand-pointing {
    position: absolute;
    left: -2rem;
    font-size: 2rem;
    margin-right: 10px;
    animation: hand-pointing 1.5s infinite;
}

@keyframes hand-pointing {
    0% {
        transform: translateX(0);
    }

    15% {
        transform: translateX(10px);
    }

    30% {
        transform: translateX(0);
    }

    45% {
        transform: translateX(10px);
    }

    60% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(0);
    }
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