<template>
    <div class="projects x-sp">
            <h2 v-html="$t('html.home.projects.title')"></h2>
        <template v-for="project in projects">
            <div class="project-item">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="project-links">
                    <a :href="project.link" target="_blank">Link</a>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { projects } from "../../data/projects.json";
import VanillaTilt from 'vanilla-tilt';

export default {
    data() {
        return {
            projects
        }
    },
    mounted() {
        VanillaTilt.init(this.$el.querySelectorAll(".project-item"), {
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
</script>
