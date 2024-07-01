<template>
    <div v-if="block != 'iframe'" class="card twitch x-sp">
        <h1>🔴 Lives</h1>
        <div class="isiframe">
            <iframe
                :src=twitchURL
                height="378"
                width="620"
                frameborder="0"
                scrolling="no"
                allowfullscreen="true">
            </iframe>
        </div>
        <CarouselYouTubeLastVideos />
    </div>
</template>

<script>
export default {
    setup() {
        const route = useRoute()
        return {
            route
        }
    },

    data() {
        return {
            twitchURL: '',
            intent: this.$route.query.intent,
            block: this.$route.query.block
        }
    },

    // get actual URL of the page
    mounted() {
        this.URL = window.location.hostname;
        this.twitchURL = `https://player.twitch.tv/?channel=bryceed&parent=${this.URL}`;
    },
}
</script>

<style scoped>
    .twitch {
        display: flex;
    flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 200px);
        width: calc(100vw - 4rem);
        padding-top: 2rem;
        background: black;
        border-radius: 8px;
        color: white;
    margin: 2rem;
    }
    html.light .twitch {
        background: linear-gradient(#692cc4, #1c073c);
    box-shadow: 1px 5px 4px 2px #98989863;
    }

    .twitch .blocked-alert {
        margin-top: 2rem;
    }
    .twitch iframe {
        margin-top: 2rem;
        border-radius: 15px;
        width: 100%;
        height: 60vh;
    }

    .twitch p {
        margin-top: 1rem;
    }

    .twitch h1 {
        font-size: 2rem;
        font-weight: 700;
        display: block;
        background: rgba(255,255,255,.15);
        padding: .25rem 2rem .4rem;
        border-radius: 2rem;
    }

    .twitch a {
        margin-top: 1rem;
    }

    .twitch a:hover {
        color: #ccc;
    }

    .twitch a:active {
        color: #ccc;
    }

    .twitch .isiframe {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
    }
</style>