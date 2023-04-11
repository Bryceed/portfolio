<template>
    <div class="card twitch">
        <h1>🔴 Lives</h1>

        <iframe
            src="https://player.twitch.tv/?channel=bryceed&parent=localhost"
            height="378"
            width="620"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true">
        </iframe>

    </div>
</template>

<script>

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