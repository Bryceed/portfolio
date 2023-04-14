<template>
    <div class="card twitch">
        <h1>🔴 Lives</h1>
        <v-if v-if="block != 'iFrame'">
            <iframe
                :src=twitchURL
                height="378"
                width="620"
                frameborder="0"
                scrolling="no"
                allowfullscreen="true">
            </iframe>
        </v-if>
        <v-else>
            <div class="blocked-alert iframe">
                <h2 class="title">This browser do not support iFrame</h2>
                <p class="description">We are having problems displaying the full content of this site because of the technical limitations of your current browser.<br>Anyway, the "Lives" section was created to show that you can follow my <a href="https://www.twitch.tv/bryceed" target="_blank">Twitch channel</a> to follow my live coding streams and gameplays.</p>
            </div>
        </v-else>
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
        height: 100%;
        width: 100%;
        padding: 2rem;
        background: black;
        border-radius: 8px;
        color: white;
    }
    html.light .twitch {
        background: linear-gradient(#0025DD, #00093A);
        box-shadow: 0 0 30px black;
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
</style>