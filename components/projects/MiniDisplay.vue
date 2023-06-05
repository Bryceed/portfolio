<template>
    <div class="mini-display-container">
        <h2>Projetos</h2>
        <div class="mini-display">
            <template v-for="project in projects">
                <div class="project-item active">
                    <div class="_bg" :style="{ backgroundImage: 'url(' + project.placeholder + ')' }"></div>
                    <div class="info-overlay">
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.description }}</p>
                    </div>
                    <div class="actions">
                        <CommonButton :link="project.link" :title="$t('html.projects.miniDisplay.button')" :origin="'miniDisplay'"></CommonButton>
                    </div>
                </div>
            </template>
        </div>
        <NuxtLink to="/projects" class="btn btn-primary btn-lg btn-block btn-float-right">Ver todos os projetos</NuxtLink>
    </div>
</template>

<style scoped>
    h2 {
        font-size: 3rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 20px;
        text-align: center;
    }
    html.light h2 {
        color: #000;
    }

    .btn-float-right {
        position: absolute;
        bottom: 1.5rem;
        right: 25px;
        z-index: 2;
        font-weight: bold;
        transition: all .1s ease-in-out;
        background-color: #070707;
        border-radius: .2rem;
        line-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        padding: .5rem 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    .btn-float-right:hover {
        background-color: #444;
        transition: all .1s ease-in;
        box-shadow: 0 0 0 5px #222222, 0 0 0 8px #ffffff;
    }

    .mini-display-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: fill-available;
        min-height: calc(33vh + 50px);
        padding: 2rem 0 4rem;
        background: #111;
        color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.2);
        position: relative;
        transition: all 0.3s ease-out;
        border-radius: 14px;
    }
    html.light .mini-display-container {
        background: #eee;
        color: #000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.2);
    }
    .mini-display {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        grid-gap: 2em;
        grid-auto-flow: row;
        grid-auto-rows: 200px;
        justify-content: center;
        justify-items: center;
        align-items: center;
        width: 90%;
        margin-bottom: 2rem;
    }

    .project-item {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        width: 320px;
        height: 200px;
        margin: 1em;
        border-radius: 8px;
        background: #111;
        color: #000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: relative;
        transition: all 0.3s ease-out;
    }
    .project-item:hover {
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        box-shadow: 0 0 0 5px #222222, 0 0 0 10px #782fee;
        height: 180px;
        width: 310px;
        margin: calc(1rem + 10px);
    }
    html.light .project-item:hover {
        box-shadow: 0 0 0 5px #fff, 0 0 0 10px #782fee;
        background: #eee;
    }

    .project-item ._bg {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 8px;
        transition: all 0.2s ease-out;
        box-shadow: 0 2px 5px #00000078;
        background-color: #111;
        position: absolute;
        z-index: 2;
    }
    .project-item:hover ._bg {
        transition: all 0.2s ease-in-out;
        background-size: cover;
        background-color: #111;
        height: 80%;
    }


    .project-item .info-overlay {
        font-size: 12px;
        position: absolute;
        bottom: 0%;
        left: 0;
        padding: .8rem .8rem .2rem;
        background: linear-gradient(transparent, #000);
        right: 0;
        border-radius: 0 0 8px 8px;
        color: #eee;
        height: 40%;
        transition: all 0.2s ease-out;
        z-index: 2;
        overflow: hidden;
    }
    .project-item:hover .info-overlay {
        transition: all 0.2s ease-in-out;
        padding: 1rem .8rem .2rem;
        height: 80%;
        background: linear-gradient(transparent, #000 97%);
        bottom: 20%;
    }
    html.light .project-item:hover .info-overlay {
        background: none;
        color: #000;
    }

    .project-item .info-overlay h3 {
        transition: all 1.5s ease-in;
        font-size: 2.5em;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2);
        position: absolute;
        bottom: 5%;
        transition: all 0.2s ease-out;
        opacity: 0;
    }
    .project-item:hover .info-overlay h3 {
        transition: all 0.2s ease-in-out;
        font-size: 1.2rem;
        bottom: 30%;
        opacity: 1;
    }
    .project-item .info-overlay p {
        font-size: .75rem;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
        display: none;
        height: 0;
        opacity: 0;
        color: rgba(255, 255, 255, 0);
        position: absolute;
        bottom: -52%;
    }
    .project-item:hover .info-overlay p {
        transition: all 3.5s ease-in-out;
        display: block;
        height: inherit;
        opacity: 1;
        margin: .33rem 0;
        animation: lightText .5s ease-in-out forwards;
        overflow: hidden;
        bottom: -52.5%;
    }
    @keyframes lightText {
        0% {
            height: 0;
            color: rgba(255, 255, 255, 0);
        }
        100% {
            height: inherit;
            color: rgba(255, 255, 255, 1);
        }
    }

    .project-item .actions {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: .8rem .8rem .2rem;
        background: linear-gradient(transparent, #000);
        border-radius: 0 0 8px 8px;
        transition: all 0.2s ease-out;
        height: 20%;
    }

    .project-item .actions a {
        color: #fff;
        font-size: 1em;
        margin: 0.5rem;
        transition: all 0.2s ease-out;
    }
    .project-item .actions a:hover {
        transition: all 0.2s ease-in-out;
        color: #782fee;
    }

    .btn.btn-miniDisplay {
        background-color: #070707;
        border-radius: .2rem;
        line-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        padding: .5rem 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        bottom: 4px;
        position: relative;
        width: 100%;
        left: -8px;
    }
    .project-item:hover .btn.btn-miniDisplay {
        color: #D2BEF2;
        background-color: #782fee;
        transition: all .1s ease-in;
        box-shadow: none;
        bottom: 9px;
        border: none;
    }
</style>

<script>
import { projects, miniDisplay } from "../../data/projects.json";

export default {
    data() {
        return {
            projects,
            miniDisplay
        }
    },

    mounted() {
        console.log("Projects")
        document.title = 'Well.dev | Projects'
    }
}
</script>