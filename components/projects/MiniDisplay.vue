<template>
    <div>
        <h2>Projetos em destaque</h2>
        <div class="mini-display">
            <template v-for="project in projects">
                <div class="project-item active">
                    <div class="_bg" :style="{ backgroundImage: 'url(' + project.placeholder + ')' }"></div>
                    <div class="info-overlay">
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.description }}</p>
                    </div>
                </div>
            </template>
        </div>
        <div class="see-more">
            <a href="/projects">Ver mais projetos</a>
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
        width: calc(30%);
        height: calc(20vh - 2rem);
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
        height: calc(33vh - 2rem + 50px);
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
        bottom: 0;
        left: 0;
        padding: .8rem .8rem .2rem;
        background: linear-gradient(transparent, #000);
        right: 0;
        border-radius: 0 0 8px 8px;
        color: #eee;
    }
    .project-item:hover .info-overlay {
        transition: all 0.2s ease-in-out;
        padding: 1rem .8rem .2rem;
    }
    html.light .project-item:hover .info-overlay {
        background: none;
        color: #000;
    }

    .project-item .info-overlay h3 {
        font-size: 2rem;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    .project-item .info-overlay p {
        font-size: .75rem;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
        display: none;
        height: 0;
        opacity: 0;
    }
    .project-item:hover .info-overlay p {
        transition: all .5s ease-in-out;
        display: block;
        height: inherit;
        opacity: 1;
    }

    .project-item .project-links {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        margin-top: 1rem;
    }

    .project-item .project-links a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .project-item .project-links a:hover {
        background: #eee;
    }

    .project-item .project-links a:active {
        background: #eee;
    }

    .project-item .project-links a img {
        width: 50%;
        height: 50%;
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