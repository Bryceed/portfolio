<template>
    <div>
        <h1>Projects</h1>
        <p>Here are some of my projects</p>
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
    </div>
</template>

<style scoped>
    .mini-display {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        font-size: 0;
    }

    .project-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 300px;
        margin: 1rem;
        border-radius: 8px;
        background: #fff;
        color: #000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: relative;
        transition: all 0.2s ease-in-out;
    }
    .project-item:hover {
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        box-shadow: 0 0 0 5px #222222, 0 0 0 10px #782fee;
        height: 290px;
    }

    .project-item ._bg {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        border-radius: 8px;
    }

    .project-item .info-overlay {
        font-size: 12px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(transparent, #000);
        right: 0;
        border-radius: 0 0 8px 8px;
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