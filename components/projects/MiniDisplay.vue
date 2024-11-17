<template>
    <div class="mini-display-container">
        <h2>Projetos</h2>
        <div class="mini-display">
            <template v-for="project in projects" :key="project.id">
                <div class="project-item active" :style="{ '--highlight-color': project.colors.primary }">
                    <div class="_bg" :style="{ backgroundImage: 'url(' + project.placeholder + ')' }"></div>
                    <div class="info-overlay">
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.description }}</p>
                    </div>
                    <div class="actions">
                        <CommonButton :link="project.page" :title="$t('html.projects.miniDisplay.button')"
                            :newTab="false" :style="{ 'background-color': project.colors.primary }" />
                    </div>
                </div>
            </template>
        </div>
        <NuxtLink to="/projects" class="btn btn-primary btn-lg btn-block btn-float-right">Ver todos os projetos
        </NuxtLink>
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
    z-index: 999;
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
    width: calc(100% - 4rem);
    margin: 0 2rem;
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
    background: transparent;
    color: #000;
    box-shadow: none;
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
    justify-content: flex-start;
    align-items: flex-start;
    width: calc(33vw - 3rem);
    aspect-ratio: 16 / 9;
    margin: 1rem;
    background: #222222;
    color: #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative;
    transition: all 0.3s ease-out;
    border-radius: .5rem;
    --highlight-color: #782fee;
    overflow: hidden;
}

.project-item:hover {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    box-shadow: 0 0 0 5px #222222, 0 0 0 10px var(--highlight-color);
}

html.light .project-item:hover {
    box-shadow: 0 0 0 5px #fff, 0 0 0 10px var(--highlight-color);
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
    /*background-image is the url image, but i also want to add a gradient to the image, do it without background-image
    */
    height: 62%;
    position: relative;
    overflow: hidden;
}

.project-item:hover ._bg::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 70%, #000000c1);
    border-radius: 8px;
    z-index: 1;
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
    height: 40%;
    background: none;
    bottom: 0;
    overflow: visible;
}

html.light .project-item:hover .info-overlay {
    background: none;
    color: #000;
}

.project-item .info-overlay h3 {
    transition: all 1.5s ease-in;
    font-size: 2.7rem;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 40%;
    color: rgba(189, 189, 189, 0.25) !important;
    transition: all 0.2s ease-out;
    text-align: center;
}

.project-item:hover .info-overlay h3 {
    transition: all 0.2s ease-in-out;
    font-size: 1.5rem;
    top: -32%;
    text-align: left;
    color: rgba(255, 255, 255, 1) !important;
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
    top: 5%;
    font-size: 1rem;
    line-height: 1.3rem;
}

.light .project-item:hover {
    background: white !important;
}

.light .project-item:hover .info-overlay {
    color: #000;
    background: white;
}

.light .project-item:hover .info-overlay h3 {
    color: rgba(255, 255, 255, 1) !important;
}

.light .project-item:hover .info-overlay p {
    color: rgba(0, 0, 0, 1) !important;
}

.project-item:hover .actions {
    background: none;
    animation: showActions .33s ease-in-out forwards;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
}

@keyframes showActions {
    0% {
        bottom: -20%;
        opacity: 0;
    }

    100% {
        bottom: 2%;
        opacity: 1;
    }
}

@keyframes lightText {
    0% {
        height: 0;
        color: rgba(255, 255, 255, 0);
    }

    100% {
        height: inherit;
        color: rgb(217, 217, 217);
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
    display: flex;
    gap: 1rem;
}

.project-item .actions a {
    color: #fff;
    font-size: 1.2rem;
    margin: 0;
    transition: all 0.2s ease-out;
}

.project-item .actions a:hover {
    transition: all 0.2s ease-in-out;
    color: var(--highlight-color);
}
</style>

<script>
import { projects } from "../../data/projects.json";

export default {
    data() {
        return {
            projects
        }
    },

    mounted() {
        console.log("Projects")
        document.title = 'Well.dev | Projects'
    }
}
</script>