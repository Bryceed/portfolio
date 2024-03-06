<template>
    <div class="about x-sp">
        <div class="about__container">
            <div class="about__container__image">
                        <img
                            src="https://avatars.githubusercontent.com/u/42657376?v=4"
                            alt="Wellington"
                        />
                    </div>
                    <div class="about__container__text">
                        <h1
                            v-html="$t('html.home.greetings', { name: 'Wellington' })"
                        ></h1>
                        <p
                            v-html="$t('html.home.description[0]', {
                                years: personal.age,
                                occupation: 'Full Stack Developer'
                            })
                                "
                        ></p>
                        <p
                            v-html="$t('html.home.description[1]', {
                                profession1: 'UI/UX Design',
                                profession2: 'Web Development'
                            })
                                "
                        ></p>
                        <p
                            v-html="$t('html.home.description[2]', {
                                business: 'ESX',
                                time: getPeriod()
                            })
                                "
                        ></p>
                        <p v-html="$t('html.home.description[3]')"></p>

                        <div class="about__container__text__buttons">
                            <NuxtLink to="/projects" class="btn btn--primary">
                                <i class="material-icons">code</i>
                                <span v-html="$t('html.home.actions[0].label')"></span>
                            </NuxtLink>
                            <NuxtLink to="/contact" class="btn btn--secondary"
                                ><i class="material-icons">email</i
                                ><span v-html="$t('html.home.actions[1].label')"></span
                            ></NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { about } from "/data/about.json";

export default {
    name: "HomeAboutMe",
    data() {
        return {
            about,
            company: {
                name: "ESX",
                url: "https://esx.com.br/",
                entrance: "2022-07-17",
                period: "",
                exit: null
            },
            personal: {
                age: 0
            }
        };
    },

    created() {
        this.company.period = this.getPeriod();
        this.personal.age = this.getPersonalAge();
    },

    methods: {
        getPeriod() {
            const entrance = new Date(this.company.entrance);
            const exit = this.company.exit
                ? new Date(this.company.exit)
                : new Date();
            const diff = Math.abs(exit - entrance);
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));

            if (years > 0) {
                if (months > 0) {
                    const yearsText = this.$t("commons.timings.periodOf.year." + (years > 1 ? "plural" : "singular"), { periodOf: years });
                    const monthsText = this.$t("commons.timings.periodOf.month." + (months > 1 ? "plural" : "singular"), { periodOf: months });
                    const concatText = this.$t("commons.timings.periodOf.concat");
                    return yearsText + concatText + monthsText;
                } else {
                    return this.$t("commons.timings.periodOf.day." + (days > 1 ? "plural" : "singular"), { periodOf: days });
                }
            } else if (months > 0) {
                return this.$t("commons.timings.periodOf.month." + (months > 1 ? "plural" : "singular"), { periodOf: months });
            } else {
                return this.$t("commons.timings.periodOf.day." + (days > 1 ? "plural" : "singular"), { periodOf: days });
            }
        },
        getPersonalAge() {
            const lastUpdate = about.lastUpdate;
            const birth = new Date(
                `${about.birth.year}-${about.birth.month}-${about.birth.day}`
            );
            const today = new Date();
            const diff = Math.abs(today - birth);

            const todayDay = today.getDate();
            const birthDay = birth.getDate();
            const todayMonth = today.getMonth();
            const birthMonth = birth.getMonth();
            const todayYear = today.getFullYear();
            const birthYear = birth.getFullYear();

            let years = todayYear - birthYear;
            if (
                todayMonth < birthMonth ||
                (todayMonth === birthMonth && todayDay < birthDay)
            ) {
                years--;
            }

            // retorne um int com a idade
            return years;
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
    width: 100%;
    min-height: calc(100vh - 128px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(30, 30, 30, 0.197);
    border-radius: 5px;
    margin-top: 10px;
}
html.light .about {
    background: linear-gradient(35deg, rgb(74 0 255), rgb(0 255 150 / 27%));
}

.about__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 30px auto;
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
    font-size: clamp(1.5em, 8vmin, 3em);
    font-weight: 700;
    color: #fff;
    margin-bottom: 48px;
    font-family: "Keep Calm", sans-serif;
}

.about__container__text h1 span {
    color: #5f0de4;
    font-weight: 900;
}

.about__container__text p {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
    font-size: clamp(1em, 3vmin, 2em);
    font-weight: 400;
    color: #fff;
    margin-bottom: 20px;
}

.about__container__text p span {
    font-weight: 700;
}
.about__container__text p span a {
    text-decoration: underline;
    color: rgba(95, 13, 228, 0.791);
}

.about__container__text__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
}

.about__container__text__buttons a {
    margin: 0 10px;
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 700;
    padding: 5px 20px 10px;
    border-radius: 5px;
    transition: all 0.3s ease;
    background-color: rgba(95, 13, 228, 0.791);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.15s ease-out;
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.5;
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
    top: -2px;
    font-size: 1.6rem;
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

@media (max-width: 768px) {
    .about__container {
        flex-direction: column;
    }

    .about__container__text {
        margin-bottom: 20px;
    }
}
</style>
