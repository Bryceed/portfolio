<template>
    <div class="flex flex-col md:flex-row mt-12" v-if="!error">
        <div class="w-full md:w-1/4 sticky top-0">
            <h1 class="text-5xl font-bold mb-6 text-center">
                {{ project.title }}
            </h1>
            <div class="relative w-full h-0 pb-3/4">
                <img :src="project.placeholder" alt="Project Image"
                    class="absolute h-full w-full object-cover rounded-lg shadow-md" />
            </div>

            <h3 class="text-l text-gray-500 mt-2">
                {{ project.description }}
            </h3>
            <div class="flex flex-col items-start justify-center mt-12">
                <button @click="goBack"
                    class="text-light-800 font-bold py-4 px-1 rounded inline-flex items-center icon-left mb-6">
                    <span class="i-akar-icons-arrow-left mr-2"></span>
                    <span class="ml-2">{{ $t('project.buttons.back') }}</span>
                </button>
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
            <a href="/projects"
                class="text-light-800 font-bold py-4 px-1 rounded inline-flex items-center icon-left mt-6">
                <span class="i-akar-icons-arrow-left mr-2"></span>
                <span class="ml-2">{{ $t('project.buttons.allProjects') }}</span>
            </a>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projects } from "../../data/projects.json";

export default {
    name: "Project",

    setup() {
        const route = useRoute();
        const router = useRouter();
        const project = ref(null);
        const error = ref(false);

        const loadProject = () => {
            project.value = null; // Reset project data
            const foundProject = projects.find(
                (proj) => proj.id === route.params.project_id
            );
            if (foundProject) {
                project.value = foundProject;
                if (process.client) {
                    waitDocReady();
                }
            } else {
                error.value = true;
            }
        };

        const waitDocReady = (removeClass = false) => {
            if (document.readyState === "complete") {
                if (removeClass) {
                    return document.querySelector("body").classList.remove("bg-experience");
                }
                defineClassStyle({
                    ".bg-experience": {
                        "background": `linear-gradient(0deg, ${project.value.colors.primary}, ${project.value.colors.secondary}), linear-gradient(0deg, ${project.value.colors.secondary}, transparent)`
                    },
                    ".bg-experience nav": {
                        "background": `linear-gradient(90deg, ${project.value.colors.primary}, ${project.value.colors.secondary}) !important`,
                        "box-shadow": "none !important"
                    },
                    ".bg-experience .footer": {
                        "background": `${project.value.colors.secondary} !important`,
                        "box-shadow": "none !important",
                        "color": `${project.value.colors.text} !important`
                    },
                    ".bg-experience .container": {
                        "color": `${project.value.colors.text} !important`
                    },
                    ".bg-experience nav a, .bg-experience nav i": {
                        "color": `${project.value.colors.text} !important`
                    },
                    ".bg-experience.dark body::after": {
                        "display": "block",
                        "content": "''",
                        "background": "black",
                        "position": "absolute",
                        "top": 0,
                        "right": 0,
                        "left": 0,
                        "bottom": 0,
                        "z-index": -1,
                        "opacity":'.6'
                    },
                });
                document.querySelector("body").classList.add("bg-experience");
            } else {
                setTimeout(() => waitDocReady(removeClass), 100);
            }
        };

        const defineClassStyle = (styles) => {
            const style = document.createElement("style");
            style.id = "class-style";
            style.innerHTML = Object.keys(styles)
                .map((selector) => {
                    const properties = styles[selector];
                    return `${selector} { ${Object.keys(properties)
                        .map((property) => {
                            const value = properties[property];
                            return `${property}: ${value};`;
                        })
                        .join("")} }`;
                })
                .join("");
            document.getElementsByTagName("head")[0].appendChild(style);
        };

        const goBack = () => {
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push('/projects');
            }
        };

        watch(() => route.params.project_id, loadProject, { immediate: true });

        return {
            route,
            project,
            error,
            loadProject,
            waitDocReady,
            defineClassStyle,
            goBack
        };
    },

    beforeRouteLeave(to, from, next) {
        this.waitDocReady(true);
        next();
    },
};
</script>
