<template>
    <div class="about x-sp">
        <div class="about__container">
            <div class="about__container__image">
                <img :src="about.picture || 'https://avatars.githubusercontent.com/u/42657376?v=4'" :alt="getFullName()" />
            </div>
            <div class="about__container__text">
                <h1 v-html="$t('html.home.greetings', { name: 'Wellington' })"></h1>
                <p v-html="$t('html.home.description[0]', {
                    years: personal.age,
                    occupation: 'Full Stack Developer'
                })"></p>
                <p v-html="$t('html.home.description[1]', {
                    profession1: 'UI/UX Design',
                    profession2: 'Web Development'
                })"></p>
                <p v-html="$t('html.home.description[2]', {
                    business: currentJob.company || 'N/A',
                    time: currentJob.period || 'N/A',
                })" v-if="currentJob && currentJob.company !== 'N/A'"></p>
                <p v-html="$t('html.home.description[3]')"></p>

                <div class="about__container__text__buttons">
                    <NuxtLink to="/about" class="btn btn--primary">
                        <i class="material-icons">person</i>
                        <span v-html="$t('html.home.actions[2].label')"></span>
                    </NuxtLink>
                    <NuxtLink to="/contact" class="btn btn--secondary">
                        <i class="material-icons">email</i>
                        <span v-html="$t('html.home.actions[1].label')"></span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import timeline from '@/data/timeline.json';
import about from '@/data/about.json';

export default {
    name: "HomeAboutMe",
    data() {
        return {
            about: about,
            currentJob: null,
            personal: {
                age: 0
            },
            primaryColor: "#3498db" // Example primary color
        };
    },

    created() {
        this.personal.age = "-";
        this.currentJob = "-";
    },

    mounted() {
        try {
            this.personal.age = this.getPersonalAge();
            this.currentJob = this.getCurrentJob();
        } catch (error) {
            console.error("Error initializing data:", error);
            this.personal.age = 25; // Fallback value
        }
    },

    computed: {
        currentJobDescription() {
            if (this.currentJob && this.currentJob.company !== "N/A") {
                return `<a href="${this.currentJob.company}" target="_blank">${this.currentJob.jobRole} <i class="material-icons">open_in_new</i></a>`;
            }
            return "Em busca de oportunidade";
        },

        aboutPicture() {
            return this.about.picture || "https://avatars.githubusercontent.com/u/42657376?v=4";
        },

        generateTextJobPeriod(startDate, endDate, lang = this.$i18n.locale) {
            try {
                if (!startDate) {
                    throw new Error("Start date is required");
                }
            } catch (error) {
                console.error("Error generating job period text:", error);
                return "-";
            }
            const start = new Date(startDate);
            const end = endDate ? new Date(endDate) : new Date();
            const options = { year: 'numeric', month: 'short' };
            return `${start.toLocaleDateString(lang, options)} - ${end.toLocaleDateString(lang, options)}`;
        }
    },

    methods: {
        getFullName() {
            if (this.about && this.about.name) {
                return `${this.about.name.first} ${this.about.name.middle} ${this.about.name.last}`;
            }
            return "Wellington do Nascimento";
        },

        getCurrentJob() {
            const today = new Date();
            const jobs = timeline.events
                .filter(event => event.startDate && (!event.endDate || new Date(event.endDate) >= today))
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            if (jobs.length > 0) {
                return {
                    ...jobs[0],
                    period: this.generateTextJobPeriod(jobs[0].startDate, jobs[0].endDate, lang= this.$i18n.locale)
                };
            }

            return jobs.length > 0 ? jobs[0] : { jobRole: "Em busca de oportunidade", company: "N/A" };
        },

        getPersonalAge() {
            if (!this.about || !this.about.birth) {
                return null;
            }
            const { day, month, year } = this.about.birth;
            const birthDate = new Date(year, month - 1, day);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        getPersonalBirthDate() {
            if (!this.about || !this.about.birth) {
                return null;
            }
            const { day, month, year } = this.about.birth;

            return new Date(year, month - 1, day).toLocaleDateString(this.$i18n.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    },

    head() {
        return {
            title: "Wellington | Full Stack Developer",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Wellington | Full Stack Developer"
                }
            ]
        };
    }
};
</script>

<style>
.about {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #222;
    width: calc(100% - 5.5rem);
    margin: 0 auto;
    border-radius: 1rem;
}

html.light .about {
    background: linear-gradient(35deg, rgb(74 0 255), rgb(0 255 150 / 27%));
}

.about a {
    color: #fff;
}

.about__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 20px auto;
    aspect-ratio: 3;
    padding: 2rem .5rem;
}
.about__container__text {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    text-align: center;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15),
        2px 2px 3px rgba(0, 0, 0, 0.15);
}

.about__container__text h1 {
    font-size: clamp(1.5em, 4.5vmin, 2.5em);
    font-weight: 700;
    color: #fff;
    margin-bottom: 48px;
}

.about__container__text h1 span {
    color: #5f0de4;
    font-weight: 900;
}

.about__container__text p {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
    font-size: clamp(1em, 2.25vmin, 1.5em);
    font-weight: 400;
    color: #fff;
    margin-bottom: 20px;
}

.about__container__text p span {
    font-weight: 700;
}

.about__container__text p span a {
    text-decoration: none;
    color: #2924cc;
    background-color: white;
    padding: 0 5px;
    border-radius: 5px;
}

.about__container__text p span a i {
    position: relative;
    top: 2px;
    left: -2px;
    zoom: .8;
    transition: all .1s ease;
}

.about__container__text p span a:hover {
    background-color: #2924cc;
    color: white;
}

.about__container__text p span a:hover i {
    color: white;
    zoom: 1;
    margin: 0 0;
}

.about__container__text__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
}

.about__container__text__buttons a {
    margin: 0 .5rem;
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 700;
    padding: .5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    background-color: rgba(95, 13, 228, 0.791);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.15s ease-out;
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.5;
    font-family: 'Parkinsans', 'Roboto', sans-serif !important;
}

.about__container__text__buttons a:hover {
    background-color: rgba(142, 72, 255, 0.787);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1),
        0 0 0 3px rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    transition: all 0.2s ease-out;
}
.about__container__text__buttons a:active {
    background-color: rgb(96, 0, 250);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1),
        0 0 0 6px rgba(255, 255, 255, 1);
    transform: translateY(2px);
    transition: all 0.1s ease-out;
}

.about__container__text__buttons a .material-icons {
    position: relative;
    top: -.3rem;
        font-size: 1.65rem;
}

.about__container__image {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0 !important;
    margin-bottom: 40px;
}

.about__container__image img {
    width: 70%;
    max-width: 500px;
    border-radius: 50%;
    border: 5px solid #0a1b28;
    filter: drop-shadow(0 0 10px #f3f3f3) contrast(1.5) brightness(1);
    z-index: 0 !important;
    position: relative;
}
html.light .about__container__image img {
    filter: drop-shadow(0 0 10px #6624e7) brightness(1.2);
    border: 5px solid #dbe5eb;
}

.about__header {
    text-align: center;
    padding: 20px;
    color: white;
}

.about__header-svg {
    margin-top: 10px;
}

@media (max-width: 1024px) {
    .about__container {
        flex-direction: column;
    }

    .about__container__text {
        margin-bottom: 20px;
    }
    .about__container__text__buttons {
        margin-top: 3rem;
        flex-direction: column;
        gap: 1.5rem;
        flex-flow: wrap;
    }
}
</style>
