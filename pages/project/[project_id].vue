<template>
    <div class="flex flex-col md:flex-row mt-12" v-if="!error">
        <div class="w-full md:w-1/4 sticky top-0">
            <h1 class="text-5xl font-bold mb-6 text-center">
                {{ projects.title }}
            </h1>
            <div class="relative w-full h-0 pb-3/4">
                <img
                    :src="projects.placeholder"
                    alt="Project Image"
                    class="absolute h-full w-full object-cover rounded-lg shadow-md"
                />
            </div>

            <h3 class="text-l text-gray-500 mt-2">
                {{ projects.description }}
            </h3>
            <div class="flex flex-col items-start justify-center mt-12">
                <nuxt-link
                    to="/projects"
                    class="text-light-800 font-bold py-4 px-1 rounded inline-flex items-center icon-left mb-6"
                >
                    <span class="i-akar-icons-arrow-left mr-2"></span>
                    <span class="ml-2">Voltar</span>
                </nuxt-link>
            </div>
        </div>
        <div class="w-full md:w-3/4">
            <CommonAlertsUnderConstruction />
        </div>
    </div>
    <div v-else>
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-5xl font-bold mb-6 text-center">404</h1>
            <h3 class="text-l text-gray-500 mt-2">Página não encontrada</h3>
            <a
                href="/projects"
                class="text-light-800 font-bold py-4 px-1 rounded inline-flex items-center icon-left mt-6"
            >
                <span class="i-akar-icons-arrow-left mr-2"></span>
                <span class="ml-2">Voltar</span>
            </a>
        </div>
    </div>
</template>

<script>
import { projects } from "../../data/projects.json";

export default {
    name: "Project",

    data() {
        return {
            projects,
            error: false
        };
    },

    setup() {
        const route = useRoute();
        return {
            route
        };
    },

    mounted() {
        this.projects = this.projects.filter(
            (project) => project.id === this.route.params.project_id
        )[0];
        !this.projects ?? (this.error = true);

        // TODO: Change background color to follow the project's primary color
        //document.querySelector("html").style.backgroundColor = this.projects.colors.primary;
    },

    watch: {
        "$route.params.project_id": {
            immediate: true,
            handler() {
                this.route.params.project_id = this.$route.params.project_id;
            }
        }
    },
};
</script>
