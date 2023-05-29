<template>
    <div>
        <h1>Projects</h1>
        <p>Here are some of my projects</p>
        <div class="projects">
            <div class="project-item" v-for="project in projects" :key="project.id" :style="{'color': project.colors.primary ? `${project.colors.primary}` : '#e6e6e6'}">
                <div class="_left">
                    <img :src="project.placeholder" :alt="project.name" />
                </div>
                <div class="_underneath" :style="{'background': project.colors.primary ? `linear-gradient(90deg, ${project.colors.primary}, transparent)` : 'transparent', 'color': project.colors.secondary ? `${project.colors.secondary}` : '#ece6ef'}">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                </div>
                <div class="_right" :style="{'color': project.colors.secondary ? `${project.colors.secondary}` : '#ece6ef'}">
                    <div class="actions" :style="{'color': project.colors.primary ? `${project.colors.primary}` : '#e6e6e6'}">
                        <v-if v-if="project.page">
                            <NuxtLink :to="project.page"><i class="material-icons">arrow_forward</i></NuxtLink>
                        </v-if>
                        <v-if v-if="project.code">
                            <a :href="project.code" target="_blank"><i class="material-icons">code</i></a>
                        </v-if>
                        <v-if v-if="project.link">
                            <a :href="project.link" target="_blank"><i class="material-icons">launch</i></a>
                        </v-if>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { projects } from "../../data/projects.json";

export default {
    data() {
        return {
            projects
        }
    },
}
</script>

<style scoped>
h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
}
p {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
    text-align: center;
}
.projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto;
    max-width: 1340px;
    padding: 0 20px;
}

.project-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #2e2e2e;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 20px 0;
    width: clamp(360px, 100%, 600px);
    height: 140px;
    transition: all .1s ease-in-out;
    color: #fff;
    border-radius: 8px;
    border-top-left-radius: 2rem;
}
html.light .project-item {
    background: #ece6ef;
    color: #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.project-item:hover {
    box-shadow: 0 0 0 5px #222222, 0 0 0 8px #ffffff, 0 0 30px rgba(203, 203, 203, 0.585);
    transition: all .1s ease-in;
    height: 160px;
    margin: 0;
}
html.light .project-item:hover {
    box-shadow: 0 0 0 5px #ffffff, 0 0 0 8px currentColor, 0 0 40px currentColor;
    transition: all .1s ease-in;
    height: 160px;
    margin: 0;
}

.project-item ._left {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 30%;
    overflow: hidden;
    position: relative;
}
._left::after {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4%;
    background: linear-gradient(to left, currentColor, transparent);
    content: "";
}

.project-item ._left img {
    width: 40vw;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 2rem;
    transition: all .15s ease-in;
}
.project-item:hover ._left img {
    border-bottom-left-radius: 8px;
    transition: all .15s ease-in;
}

.project-item ._underneath {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 60%;
    height: 100%;
    padding: 7px 20px 0;
    overflow: hidden;
    position: relative;
}

.project-item ._underneath h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: .5rem;
    text-align: left;
}

.project-item ._underneath p {
    font-size: 1rem;
    font-weight: 400;
    color: #eee;
    margin-bottom: 20px;
    text-align: left;
}
.light .project-item ._underneath {
    background-color: currentColor !important;
}

.project-item ._right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 100%;
    padding: 10px;
    transition: all .1s ease-out;
}
.project-item:hover ._right {
    padding: 5px;
    transition: all .15s ease-in;
}

.project-item ._right .actions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: 6px;
    transition: all .1s ease-out;
}
html.light .project-item ._right{
    background-color: currentColor;
    transition: all .15s ease-in;
    border-radius: 0 8px 8px 0;
    font-size: 0;
}
html.light .project-item:hover ._right .actions{
    background-color: currentColor;
}
.project-item:hover ._right .actions {
    background-color: rgb(60, 60, 60);
    transition: all .15s ease-in;
}

.project-item ._right .actions a {
    color: #ffffff;
    text-decoration: none;
    border-radius: 50%;
    background-color: transparent;
    padding: 50% 80% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: -5px;
}

.project-item:not(:hover) ._right .actions v-if:not(:first-of-type) {
    opacity: 0.2 !important;
}

.project-item ._right .actions a:hover {
    color: #ccc;
    background-color: rgb(150, 150, 150);
}

.project-item ._right .actions a i.material-icons {
    position: relative;
    top: -4px;
}

</style>