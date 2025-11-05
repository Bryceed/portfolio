<template>
    <div class="mbti-container" v-if="personalityType && $i18n.locale">
        <div class="mbti-header" :style="{ backgroundColor: primaryColor }">
            <h1>{{ title }}</h1>
            <svg class="mbti-svg" viewBox="0 0 100 5">
                <polygon points="0,0 100,0 85,3 65,2 25,5 0,0" :fill="primaryColor"></polygon>
            </svg>
        </div>
        <div class="mbti-content">
            <div class="mbti-image" :style="{
                backgroundImage:
                    `url(https://www.16personalities.com/static/images/theory/traits/16personalities_trait_${currentType}.svg)`,
            }"></div>
            <div class="mbti-text">
                <h2>
                    {{
                        percentage + "% " + personalityType.title[$i18n.locale]
                    }}
                    <span>
                        ({{ personalityType.abbreviation }})
                    </span>
                </h2>
                <div class="progress-bar">
                    <div class="progress" :style="{
                        width: leftPercentage + '%',
                        backgroundColor: leftColor,
                    }"></div>
                    <div class="progress opposite" :style="{
                        width: rightPercentage + '%',
                        backgroundColor: rightColor,
                    }"></div>
                </div>
                <div class="legends">
                    <div :style="{ color: leftColor }">
                        <span>{{ leftPercentage }}%</span>
                        <span>{{ table.types[leftType].title[$i18n.locale] }}</span>

                    </div>
                    <div :style="{ color: rightColor }">
                        <span>{{ rightPercentage }}%</span>
                        <span>{{ table.types[rightType].title[$i18n.locale] }}</span>
                    </div>
                </div>
                <p class="mbti-description">
                    {{ personalityType.description[$i18n.locale] }}
                </p>
                <h3>{{ getLocalizedWhatIs() }} {{ title.toLowerCase() }}?</h3>
                <p class="quote">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import table from '~/data/mbti';
export default {
    props: {
        primaryColor: {
            type: String,
            required: true,
        },
        secondaryColor: {
            type: String,
            default: '#f1f1f1',
        },
        percentage: {
            type: Number,
            default: 79,
        },
        percentageType: {
            type: String,
            default: 'introverted',
        },
        title: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        // característica em inglês (energia, mente, natureza, táticas)
    },
    data() {
        const locale = this.$i18n.locale;
        const personalityType = table.types[this.percentageType];

        let comparationCategory, leftType, rightType;
        Object.keys(table.pairs).find((key) => {
            if (table.pairs[key] === this.percentageType) {
                // the comparationCategory is the display key of the table, but can be at the left or right side
                comparationCategory = table.display[key + '_' + this.percentageType] || table.display[this.percentageType + '_' + key];
                leftType = table.display[key + '_' + this.percentageType] ? key : this.percentageType;
                rightType = table.display[this.percentageType + '_' + key] ? key : this.percentageType;
                return true;
            }
        }).split('_');
        // get the title and desc

        // get the left and right percentages based on the comparationCategory order
        const leftPercentage = this.percentageType === leftType ? this.percentage : 100 - this.percentage;
        const rightPercentage = 100 - leftPercentage;

        const oppositeType = table.pairs[this.percentageType];

        const title = this.title || (table.titles[comparationCategory] && table.titles[comparationCategory].title[locale]);
        const description = this.description || (table.titles[comparationCategory] && table.titles[comparationCategory].description[locale]);

        const leftColor = this.percentageType === leftType ? this.primaryColor : this.secondaryColor;
        const rightColor = this.percentageType === rightType ? this.primaryColor : this.secondaryColor;

        // get the left and right colors based on the comparationCategory order
        return {
            title,
            description,
            personalityType,
            percentageType: this.percentageType,
            comparationCategory,
            currentType: this.percentageType,
            oppositeType,
            leftType,
            rightType,
            leftPercentage,
            rightPercentage,
            leftColor,
            rightColor,
            table,
            locale
        };

    },
    computed: {
        getComponentId() {
            return 'mbti-component-' + this._uid;
        },
    },
    watch: {
        '$i18n.locale': function (newLocale) {
            this.updateLocale(newLocale);
        }
    },
    methods: {
        updateLocale(newLocale) {
            const personalityType = table.types[this.percentageType];
            const title = this.title || (table.titles[this.comparationCategory] && table.titles[this.comparationCategory].title[newLocale]);
            const description = this.description || (table.titles[this.comparationCategory] && table.titles[this.comparationCategory].description[newLocale]);

            this.personalityType = personalityType;
            this.title = title;
            this.description = description;
        },
        getLocalizedWhatIs() {
            const locale = this.$i18n.locale;
            switch (locale) {
                case 'en':
                    return 'What is';
                case 'es':
                    return '¿Qué es';
                case 'fr':
                    return 'Qu\'est-ce que';
                case 'jp':
                    return 'とは何ですか';
                case 'ko':
                    return '무엇입니까';
                case 'pt-BR':
                default:
                    return 'O que é';
            }
        }
    },
    mounted() {
        // next tick to get the component id
        this.$nextTick(() => {
            const component = document.getElementById(this.getComponentId);
            if (component) {
                component.style.setProperty('--primary-color', this.primaryColor);
                component.style.setProperty('--secondary-color', this.secondaryColor);
            }

            this.$refs.component.setAttribute('id', 'component-' + this._uid);


        });
        // quando a tela redimensionar, atualize o tamanho da fonte para a largura do .mbti-container
        // set font as css var
        window.addEventListener('resize', () => {
            const fontSize = document.querySelector('.mbti-container').offsetWidth / 100;
            document.documentElement.style.setProperty('--font-size', fontSize.toFixed(1));
        });

        // set font size based on window width
        const fontSize = document.querySelector('.mbti-container').offsetWidth / 100;
        document.documentElement.style.setProperty('--font-size', fontSize.toFixed(1));
        console.table(this.$data);
    },
};
</script>

<style scoped lang="scss">
html,
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
}

.mbti-container {
    width: 100%;
    padding-bottom: 56.25%;
    aspect-ratio: 4/3;
    position: relative;
    background-color: #FFF;
    border-radius: 1rem;
    overflow: hidden;
    // escalar fontes com base na largura do container
    font-size: var(--font-size);
}

.mbti-header {
    background-color: var(--personalityCardColor);
    padding: 2% 0;
    padding-bottom: 0;
    text-align: center;
    position: absolute;
    top: 0;
    width: 100%;
    color: white;
    margin-bottom: 4%;
}

.mbti-header h1 {
    font-size: calc(var(--font-size) * 3px);
    font-weight: 700;
    margin: 0;
    padding: 0;
}

.mbti-svg {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
}

.mbti-about {
    padding: 2%;
    font-size: calc(var(--font-size) * 1px);
    line-height: 1em;
    color: #333;
    width: 80%;
    margin: 0 auto;
}

.mbti-content {
    display: flex;
    justify-content: space-evenly;
    align-items: start;
    padding: 2%;
    gap: 2%;
    position: absolute;
    top: 15%;
    width: 100%;
}

.mbti-image {
    width: calc(var(--font-size) * 30px);
    display: flex;
    justify-content: center;
    align-items: start;
    align-self: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding-bottom: 25%;
}

.mbti-text {
    width: calc(var(--font-size) * 60px);
    padding: 2%;
}

.mbti-text h2 {
    font-size: calc(var(--font-size) * 5.5px);
    color: #333;
    display: flex;
    justify-content: start;
    align-items: start;
    margin-bottom: 2%;
    gap: 1%;
}

.mbti-text h2 span {
    font-size: calc(var(--font-size) * 2.5px);
    color: #707070;
    opacity: 0.8;
    display: inline-block;
    margin-top: 1%;
}

.mbti-text p {
    font-size: calc(var(--font-size) * 2.2px);
    line-height: 1.3;
    color: #333;
    white-space: pre-line;
}

.mbti-text h3 {
    font-size: calc(var(--font-size) * 2.8px);
    color: #333;
    margin-top: 4%;
    margin-bottom: 0;
    font-weight: 500;
}

.mbti-text p.quote {
    font-size: calc(var(--font-size) * 1.7px);
    line-height: 1.4em;
    color: #707070;
    border-left: 3px solid #7070706c;
    padding-left: 2%;
    margin: 2% 0;
}

.mbti-text .legends {
    display: flex;
    justify-content: space-between;
    margin: 2% 0 5%;
}

.mbti-text .legends div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mbti-text .legends div:first-child {
    text-align: left;
    align-items: flex-start;
    font-size: calc(var(--font-size) * 2.8px);
    line-height: 1.1em;
}

.mbti-text .legends div:last-child {
    text-align: right;
    align-items: flex-end;
    font-size: calc(var(--font-size) * 2.8px);
    line-height: 1.1em;
}

.mbti-text .legends div span:first-child {
    font-weight: bold;
    filter: contrast(.8);
}

.mbti-text .legends div span:last-child {
    font-size: 0.8em;
    font-weight: normal;
    filter: contrast(.7);
}

.mbti-text .legends .middleMarker span {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #707070;
}

.progress-bar {
    width: 100%;
    height: calc(var(--font-size) * 1.5px);
    background-color: #f1f1f1;
    border-radius: 10px;
    overflow: hidden;
    margin: 1% 0;
    position: relative;
}

.progress {
    height: 100%;
    position: absolute;
    left: 0;
    animation: width 1.6s ease-out forwards;
    transform-origin: left;
}

.progress.opposite {
    animation: width 1.6s ease-out forwards;
    transform-origin: right;
    right: 0;
    left: auto;
}

@keyframes width {
    from {
        opacity: 0.1;
        transform: scaleX(0);
    }

    to {
        opacity: 1;
        transform: scaleX(1);
    }
}

html.dark {
    --personalityCardColor: #912e2e;

    .mbti-container {
        background-color: #000000b4;
    }

    .mbti-header {
        background-color: var(--personalityCardColor);
    }

    .mbti-text h2 {
        color: #f1f1f1;
    }

    .mbti-text p {
        color: #f1f1f1;
    }

    .mbti-text h3 {
        color: #f1f1f1;
    }

    .mbti-text p.quote {
        color: #f1f1f1;
        border-left: 3px solid #f1f1f1;
    }

    .mbti-text .legends div span:first-child {
        filter: contrast(1.2);
    }

    .mbti-text .legends div span:last-child {
        filter: contrast(1.1);
    }
}

@media (max-width: 1280px) {
    .mbti-container {
        height: fit-content;
        margin-bottom: 0;
        aspect-ratio: auto;
        padding-bottom: 0px;
    }

    .mbti-content {
        flex-direction: column;
        gap: 2%;
        position: relative;
    }

    .mbti-image {
        width: 100%;
        padding-bottom: 50%;
    }

    .mbti-text {
        width: 100%;
    }

    .mbti-text h2 {
        font-size: calc(var(--font-size) * 6px);
    }

    .mbti-text h2 span {
        font-size: calc(var(--font-size) * 3px);
    }

    .mbti-text p {
        font-size: calc(var(--font-size) * 3px);
    }

    .mbti-text h3 {
        font-size: calc(var(--font-size) * 3.5px);
    }

    .mbti-text p.quote {
        font-size: calc(var(--font-size) * 2.5px);
    }

    .mbti-text .legends div {
        font-size: calc(var(--font-size) * 3.5px);
    }

    .mbti-text .legends div span:first-child {
        font-size: calc(var(--font-size) * 3.5px);
    }

    .mbti-text .legends div span:last-child {
        font-size: calc(var(--font-size) * 2.5px);
    }

    .progress-bar {
        height: calc(var(--font-size) * 2px);
    }
}
</style>
