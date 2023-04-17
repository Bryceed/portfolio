<template>
    <div class="projects">
        <h2>Projects</h2>
        <div class="projects-carousel" v-if="projects.length">
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
        <div class="projects-carousel" v-else>
            <h2>No projects found</h2>
        </div>
        <CommonCarousel />
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


        created() {
            // Create a carousel for the projects
        }
    }
</script>
