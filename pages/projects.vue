<template>
  <ProjectsHero
    :title="$t('html.projets.title')"
    :description="$t('html.projects.intro')"
    icon="hugeicons:computer-programming-01"
    :gradient="'linear-gradient(0deg, #067E87FF 0%, #1FAE0CFF 100%)'"
    baseClass="projects-hero"
    :showMenuOverlay="true"
    :showParticles="true"
    :particlesHeight="180"
  />
  <div class="projects projects-bg-wrapper">
    <div class="project-item" v-for="project in projects" :key="project.id"
        :style="{ 'color': project.colors.primary ? `${project.colors.primary}` : '#e6e6e6' }" :id="project.id">
      <div class="_left">
        <img :src="project.placeholder" :alt="project.name" />
      </div>
      <div class="_underneath"
        :style="{ 'background': project.colors.primary ? `linear-gradient(90deg, ${project.colors.primary}, transparent)` : 'transparent', 'color': project.colors.secondary ? `${project.colors.secondary}` : '#ece6ef' }">
        <h3>{{ project.title }}</h3>
        <p>{{ getDescription(project) }}</p>
      </div>
      <div class="_right"
        :style="{ 'color': project.colors.secondary ? `${project.colors.secondary}` : '#ece6ef' }">
        <div class="actions"
          :style="{ 'color': project.colors.primary ? `${project.colors.primary}` : '#e6e6e6' }">
          <template v-if="project.page" class="project-page">
            <NuxtLink :to="`/project/${project.id}`"><i class="material-icons">arrow_forward</i></NuxtLink>
          </template>
          <template v-if="project.code" class="project-code">
            <a :href="project.code" target="_blank"><i class="material-icons">code</i></a>
          </template>
          <template v-if="project.link" class="project-link">
            <a :href="project.link" target="_blank"><i class="material-icons">launch</i></a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projects } from "../data/projects.json";
import { getPageTitle } from '@/utils/page/pageTitle';
import ProjectsHero from '@/components/common/ProjectsHero.vue';

export default {
    name: 'Projects',
    components: { ProjectsHero },
    data() {
        return {
            projects
        };
    },
    methods: {
        getDescription(project) {
            return project.description[this.$i18n.locale] || project.description['en'];
        },
        linkTo(page) {
            if (page) {
                this.$router.push({ path: page });
            }
        }
    },
    mounted() {
        document.title = getPageTitle({ mainPage: 'Projects' });
        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', () => {
                this.linkTo(`/project/${item.id}`);
            });
        });
    }
}
</script>

<style scoped>
h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 1rem 0;
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
    margin: 0 auto 3rem;
    max-width: 1340px;
    padding: 0 20px;
    gap: 20px;
    position: relative;
    z-index: 1;
}

.projects-bg-wrapper {
  position: relative;
  width: 100%;
  min-height: 180px;
}

.projects-bg-particles {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  min-width: 100vw;
  z-index: 0;
  pointer-events: none;
  height: 160px !important;
}

.project-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #1b1b1b;
    border-radius: 1em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 10px 0;
    width: clamp(360px, 100%, 600px);
    height: 140px;
    transition: all .1s ease-in-out;
    color: #fff;
    overflow: hidden;
}

html.light .project-item {
    background: #ece6ef;
    color: #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.project-item:hover {
    box-shadow: 0 0 0 5px #222222, 0 0 0 8px #d1d1d1, 0 0 30px rgba(203, 203, 203, 0.585);
    transition: all .1s ease-in-out;
    height: 160px;
    margin: 0;
}

html.light .project-item:hover {
    box-shadow: 0 0 0 5px #D1D1D1, 0 0 0 8px currentColor, 0 0 40px currentColor;
    transition: all .1s ease-in-out;
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
    transition: all .15s ease-in-out;
}

.project-item:hover ._left img {
    border-bottom-left-radius: 8px;
    transition: all .15s ease-in-out;
}

.project-item ._underneath {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 60%;
    height: 100%;
    padding: 7px 20px 0;
    overflow: hidden;
    position: relative;
}

.project-item ._underneath h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: .5rem;
    margin-top: 0rem;
    text-align: left;
    font-family: 'Parkinsans', 'Roboto', sans-serif !important;
}
.project-item:hover ._underneath h3 {
    font-size: 1.75rem;
    transition: all .1s ease-in;
    margin-top: .25rem;
}

.project-item:not(:hover) ._underneath h3 {

    transition: all .1s ease-in-out;
}

.project-item ._underneath p {
    font-size: 1rem;
    font-weight: 400;
    color: #eee;
    margin-bottom: 20px;
    text-align: left;
}

.project-item:hover ._underneath p {
    font-weight: 500;
    transition: all .1s ease-in;
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
    border-radius: .7rem;
    transition: all .1s ease-out;
}

html.light .project-item ._right {
    background-color: currentColor;
    transition: all .15s ease-in;
    border-radius: 0 8px 8px 0;
    font-size: 0;
}

html.light .project-item:hover ._right .actions {
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: -5px;
    width: 40px;
    height: 40px;

    transition: all .1s ease-in-out;
}

.project-item:hover ._right .actions a {
    left: 0;
}

.project-item:not(:hover) ._right .actions :not([class^="project-"]):not(:first-of-type) {
    opacity: 0.2 !important;
}

.project-item ._right .actions a:hover {
    color: #000000;
    background-color: rgb(255, 255, 255);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.project-item ._right .actions a i.material-icons {
    position: relative;
    top: -4px;
}

.projects-hero-section {
  position: relative;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
}
.projects-hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  height: auto;
  z-index: 0;
  pointer-events: none;
  border-radius: 2rem;
}
.projects-hero-particles {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 180px !important;
  z-index: 1;
}
.projects-hero-gradient {
  position: absolute;
  inset: 0;
  width: 100dvw;
  background: linear-gradient(0deg, #067E87FF 0%, #1FAE0CFF 100%);
  opacity: 0.85;
  z-index: 0;
  border-radius: 2rem;
}
.projects-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding-top: 4rem;
  gap: .5rem;
}
.projects-hero-logo {
  width: 90px;
  height: 90px;
  object-fit: cover;
  color: #fff;
}
.projects-hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #111;
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  line-height: 1.1;
  text-shadow: 0 2px 16px #00000044;
}
html.light .projects-hero-title {
  color: #fff;
  text-shadow: 0 2px 16px #00000044;
}
.projects-hero-desc {
  font-size: 1.2rem;
  color: #e0e0e0;
  text-align: center;
  max-width: 600px;
  margin: 0.5rem 0 1rem;
}
@media (max-width: 700px) {
  .projects-hero-section {
    min-height: 160px;
  }
  .projects-hero-bg, .projects-hero-gradient {
    height: 160px;
  }
  .projects-hero-logo {
    width: 60px;
    height: 60px;
  }
  .projects-hero-title {
    font-size: 1.5rem;
  }
}
</style>