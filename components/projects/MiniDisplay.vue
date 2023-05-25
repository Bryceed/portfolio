<template>
    <div>
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
                        <CommonButton :link="project.link" :title="$t('html.projects.miniDisplay.button')" />
                    </div>
                </div>
            </template>
        </div>
        
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
    .mini-display {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        font-size: 0;
        min-height: calc(33vh + 50px);
    }

    .project-item {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        width: calc(33vw - 3rem);
        height: calc(33vw / 1.7);
        margin: 1rem;
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
        height: calc(33vw / 1.7 - 20px);
        width: calc(33vw - 3rem - 20px);
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
        font-size: 2.5rem;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 48%;
        transition: all 0.2s ease-out;
        text-align: center;
    }
    .project-item:hover .info-overlay h3 {
        transition: all 0.2s ease-in-out;
        font-size: 1.5rem;
        top: 65%;
        text-align: left;
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
        top: 86%;
    }
    .project-item:hover .info-overlay p {
        transition: all 3.5s ease-in-out;
        display: block;
        height: inherit;
        opacity: 1;
        margin: .33rem 0;
        animation: lightText .5s ease-in-out forwards;
        overflow: hidden;
        top: 79%;
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
        font-size: 1.2rem;
        margin: 0 .5rem;
        transition: all 0.2s ease-out;
    }
    .project-item .actions a:hover {
        transition: all 0.2s ease-in-out;
        color: #782fee;
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