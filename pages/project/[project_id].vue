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

        this.waitDocReady();
    },

    methods: {
        waitDocReady(removeClass = false) {
            if (document.readyState === "complete") {
                if (removeClass) {
                    return document.querySelector("body").classList.remove("bg-experience");
                }
                this.defineClassStyle({
                    ".bg-experience": {
                        "background": `linear-gradient(0deg, ${this.projects.colors.primary}, ${this.projects.colors.secondary}), linear-gradient(0deg, ${this.projects.colors.secondary}, transparent)`
                    },
                    ".bg-experience nav": {
                        "background": `linear-gradient(90deg, ${this.projects.colors.primary}, ${this.projects.colors.secondary}) !important`,
                        "box-shadow": "none !important"
                    },
                    ".bg-experience .footer": {
                        "background": `${this.projects.colors.secondary} !important`,
                        "box-shadow": "none !important",
                        "color": `${this.projects.colors.text} !important`
                    },
                    ".bg-experience .container": {
                        "color": `${this.projects.colors.text} !important`
                    },
                    ".bg-experience nav a, .bg-experience nav i": {
                        "color": `${this.projects.colors.text} !important`
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
                setTimeout(waitDocReady, 100);
            }
        },
        defineClassStyle(styles) {
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
        }
    },

    // on leave, remove the class from body
    beforeRouteLeave(to, from, next) {
        this.waitDocReady(true);
        next();
    },

    watch: {
        "$route.params.project_id": {
            immediate: true,
            handler() {
                this.route.params.project_id = this.$route.params.project_id;
            }
        },
    },
};
</script>
