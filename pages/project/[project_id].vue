<template>
    <div class="flex flex-col md:flex-row mx-[20px]" v-if="!error">
        <div class="w-full md:w-1/4 relative">
            <div class="card-intro rounded-lg px-6 h-auto pt-8">
                <h1 class="text-5xl font-bold mb-6 text-center">
                    {{ project.title }}
                </h1>
                <div class="relative w-full h-0 pb-3/4">
                    <img :src="project.placeholder" alt="Project Image"
                        class="absolute h-full w-full object-cover rounded-lg shadow-md" />
                </div>

                <h3 class="text-l text-description mt-2">
                    {{ getDescription(project) }}
                </h3>

                <!-- render website and source code buttons if available -->
                <div class="flex flex-row items-center justify-center mt-12 gap-2">
                    <a v-if="project.link" :href="project.link" target="_blank"
                        class="text-light-800 font-bold py-4 px-1 rounded inline-flex items-center icon-left mb-6 btn btn--primary btn-reverse">
                        <span class="i-akar-icons-link"></span>
                        <span class="">Website</span>
                    </a>
                    <a v-if="project.code" :href="project.code" target="_blank"
                        class="text-light-800 font-bold py-4 px-1 rounded inline-flex items-center icon-left mb-6 btn btn--primary btn-reverse">
                        <span class="i-akar-icons-github"></span>
                        <span class="">GitHub</span>
                    </a>
                </div>

                <div class="flex flex-col items-start justify-center mt-12">
                    <button @click="goBack"
                        class="text-light-800 font-bold py-4 px-1 rounded inline-flex items-center icon-left mb-6 btn btn--primary">
                        <span class="i-akar-icons-arrow-left"></span>
                        <span class="">{{ $t('html.project.buttons.back') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="w-full md:w-3/4 min-h-screen w-auto pt-8">
            <ProjectInfo :projectId="route.params.project_id" />
            <ProjectUpdates :projectId="route.params.project_id" />
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

<style scoped>
.btn {
    background-color: var(--secondary-color);
    color: var(--text-color);
    font-size: 1rem;

    &:hover {
        background-color: var(--primary-color);
    }
}

.btn-reverse {
    background-color: var(--text-color);
    color: var(--secondary-color);

    &:hover {
        background-color: var(--secondary-color);
        color: var(--text-color);
    }
}

.text-description {
    color: var(--text-color);
}
</style>
<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projects } from "../../data/projects.json";
import ProjectInfo from '@/components/ProjectInfo.vue';
import ProjectUpdates from '@/components/ProjectUpdates.vue';

export default {
    name: "Project",

    components: {
        ProjectInfo,
        ProjectUpdates,
    },

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
                    ":root": {
                        "--primary-color": project.value.colors.primary,
                        "--secondary-color": project.value.colors.secondary,
                        "--text-color": project.value.colors.text,
                    },
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
                    ".bg-experience nav ul li.lang-switcher": {
                        "background": `${project.value.colors.primary} !important`
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

        const getDescription = (project) => {
            return project.description[this.$i18n.locale] || project.description['en'];
        };

        watch(() => route.params.project_id, loadProject, { immediate: true });

        return {
            route,
            project,
            error,
            loadProject,
            waitDocReady,
            defineClassStyle,
            goBack,
            getDescription
        };
    },

    beforeRouteLeave(to, from, next) {
        this.waitDocReady(true);
        next();
    },

    methods: {
        getDescription(project) {
            return project.description[this.$i18n.locale] || project.description['en'];
        },
    }
};
</script>
