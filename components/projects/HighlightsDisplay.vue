<template>
    <div class="projects-highlight-container">
        <h2>{{ $t('html.home.projectsTitle') }}</h2>
        <div class="projects-highlight">
            <template v-for="(project, index) in projects.slice(0, 6)" :key="project.id">
                <div class="project-item" :class="{ active: project.active }" @click="toggleActive(project)"
                    :style="{ '--highlight-color': project.colors.primary }">
                    <div class="_bg" :style="{ backgroundImage: 'url(' + project.placeholder + ')' }"></div>
                    <div class="info-overlay">
                        <h3>{{ project.title }}</h3>
                        <p>{{ getDescription(project) }}</p>
                    </div>
                    <div class="actions">
                        <CommonButton :link="project.page" :title="$t('html.projects.miniDisplay.button.details')"
                            :newTab="false" :style="{ 'background-color': project.colors.primary }" />
                        <CommonButton v-if="project.website" :link="project.website"
                            :title="$t('html.projects.miniDisplay.button.website')" :newTab="true"
                            :style="{ 'background-color': project.colors.secondary }" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
h2 {
    font-size: 3rem;
    font-weight: 900;
    color: #fff;
    margin-bottom: 20px;
    text-align: center;
}

html.light h2 {
    color: #111111;
}

.btn-float-right {
    position: absolute;
    right: 2rem;
    bottom: 1.5rem;
    z-index: 5;
    font-weight: bold;
    transition: all .1s ease-in-out;
    border-radius: .5rem;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    padding: .8rem 1.2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    font-family: 'Parkinsans', 'Roboto', sans-serif;
    font-weight: 500;

    background: #615f6388;
}

.btn-float-right:hover {
    background: #615f63;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.2);
}

html.light .btn-float-right {
    background: #ece6ef;
    color: #000;
    box-shadow: none;
}

html.light .btn-float-right:hover {
    background: #ffffff;
    color: #000;
    box-shadow: none;
}

.btn-float-right .material-icons {
    font-size: 1.5rem;
    position: relative;
    top: -.25rem;
}


.projects-highlight-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(100% - 4rem);
    margin: 0 2rem 4rem;
    min-height: calc(33vh + 50px);
    padding: 2rem 0 0;
    background: #111;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.2);
    position: relative;
    transition: all 0.3s ease-out;
    border-radius: 14px;
}

html.light .projects-highlight-container {
    background: transparent;
    color: #000;
    box-shadow: none;
}

.projects-highlight {
    display: grid;
    justify-content: space-evenly;
    align-items: center;
    font-size: 0;
    width: calc(100% - 4rem);
    min-height: calc(33vh + 50px);
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    margin: 2rem;
    /* limit to 4 columns */
    max-width: calc(400px * 4 + 3rem);
}

.project-item {
    aspect-ratio: 16 / 10;
    background: #222222;
    color: #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: .5rem;
    --highlight-color: #782fee;
    display: grid;
    font-size: calc(0.5vw + 0.5em);
    transform: perspective(2000px);
    transform-style: preserve-3d;
    transition: none;
}

html.light .project-item {
    background: #ece6ef;
    color: #000;
    box-shadow: transparent
}

.project-item:hover {
    cursor: pointer;
    box-shadow: 0 0 0 5px #222222, 0 0 0 10px var(--highlight-color);
}

html.light .project-item:hover {
    box-shadow: 0 0 0 5px #fff, 0 0 0 10px var(--highlight-color);
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
    transform-style: preserve-3d;
    transform: translateZ(20px);
}

.project-item:hover ._bg {
    transition: all 0.2s ease-in-out;
    background-size: cover;
    background-color: #111;
    height: 62%;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.project-item:hover ._bg::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 70%, #000000c1);
    border-radius: 12px;
    z-index: 1;
}

html.light .project-item:hover ._bg::after {
    background: linear-gradient(transparent 70%, var(--highlight-color));
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
    z-index: 2;
    transform: translateZ(25px);
}

html.light .project-item:not(:hover) .info-overlay {
    background: linear-gradient(transparent, var(--highlight-color)) !important;
    color: #000;
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
    font-size: clamp(1rem, 2.5vw, 2.5rem);
    font-family: 'Parkinsans', 'Roboto', sans-serif;
    /* Responsive font size */
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
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    /* Responsive font size */
    top: -32%;
    text-align: left;
    color: rgba(255, 255, 255, 1) !important;
    transform: translateZ(270px);
}

.project-item .info-overlay p {
    font-size: clamp(0.75rem, 1.1vw, 1rem);
    /* Responsive font size */
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    display: none;
    height: 0;
    opacity: 0;
    color: rgba(255, 255, 255, 0);
    position: absolute;
    top: 86%;
    font-family: 'Inter', 'Roboto', sans-serif;
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
    font-size: clamp(0.75rem, 1vw, 1rem);
    font-weight: 300;
    /* Responsive font size */
    line-height: 1.3em;
}

.light .project-item:hover {
    background: #ccc !important;
}

.light .project-item:hover .info-overlay {
    color: #000;
    background: white;
}

.light .project-item .info-overlay h3 {
    color: rgba(255, 255, 255, 0.274) !important;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
    transform: translateZ(27px) translateY(-10%);
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}
.actions a {

    font-family: 'Parkinsans', 'Roboto', sans-serif !important;
    font-weight: 500;

    zoom: .8;
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
        opacity: 0;
    }

    100% {
        height: inherit;
        color: rgb(217, 217, 217);
        opacity: .8 !important;
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
    transform: translateY(20px);
    opacity: 0;
}

.project-item .actions a {
    color: #fff;
    font-size: 1.2rem;
    margin: 0;
    transition: all 0.2s ease-out;
    font-family: 'Parkinsans', 'Roboto', sans-serif !important;
    font-weight: 700;
    padding: .1rem 1rem;
    border-radius: .5rem;
    line-height: 1;
}

.project-item .actions a:hover {
    transition: all 0.2s ease-in-out;
}

.project-item.active {
    /* Apply hover styles when active */
    box-shadow: 0 0 0 5px #222222, 0 0 0 10px var(--highlight-color);
}

html.light .project-item.active {
    box-shadow: 0 0 0 5px #fff, 0 0 0 10px var(--highlight-color);
    background: #eee;
}

.project-item.active ._bg {
    /* Apply hover styles when active */
    background-size: cover;
    background-color: #111;
    height: 62%;
    position: relative;
    overflow: hidden;
}

.project-item.active ._bg::after {
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

.project-item.active .info-overlay {
    padding: 1rem .8rem .2rem;
    height: 40%;
    background: none;
    bottom: 0;
    overflow: visible;
}

html.light .project-item.active .info-overlay {
    background: none;
    color: #000;
}

.project-item.active .info-overlay h3 {
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    top: -32%;
    text-align: left;
    color: rgba(255, 255, 255, 1) !important;
    transform: translateZ(270px);
}

.project-item.active .info-overlay p {
    display: block;
    height: inherit;
    opacity: 1;
    margin: .33rem 0;
    animation: lightText .5s ease-in-out forwards;
    overflow: hidden;
    top: 5%;
    font-size: clamp(0.75rem, 1vw, 1rem);
    line-height: 1.3em;
}

.project-item.active .actions {
    background: none;
    animation: showActions .33s ease-in-out forwards;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    display: flex;
    gap: 1rem;
    justify-content: center;
    transform: translateZ(25px);
}
    @media (max-width: 960px) {
        .projects-highlight-container {
            width: 100%;
            margin: 0 1rem;
        }
    
        .projects-highlight {
            margin: 0rem;
        }
    
        .project-item {
            aspect-ratio: 16 / 10;
            font-size: 1rem;
            grid-template-columns: 1fr;
            width: calc(100% - 7rem);
        }
    
        .project-item .info-overlay h3 {
            font-size: 7vw
        }
    
        .project-item .info-overlay p {
            font-size: 1rem;
        }
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
    methods: {
        toggleActive(project) {
            project.active = !project.active;
        },
        hoverOut(project) {
            project.active = false;
        },
        getDescription(project) {
            return project.description[this.$i18n.locale] || project.description['en'];
        }
    },
    mounted() {

        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll(".project-item"), {
                max: 15,
                reverse: true,
                speed: 300,
                glare: true,
                "max-glare": 0.5,
                "glare-prerender": false,
                "gyroscope": true
            });
        }
    }
}
</script>