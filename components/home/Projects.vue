<template>
    <div class="projects">
        <h2>Projects</h2>
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

export default {
    data() {
        return {
            projects
        }
    },
}
</script>
