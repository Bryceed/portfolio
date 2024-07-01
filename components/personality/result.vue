<template>
    <div class="mbti-container">
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
                        percentage + "% " + personalityType.title
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
                        <span>{{ table.types[leftType].title }}</span>

                    </div>
                    <div :style="{ color: rightColor }">
                        <span>{{ rightPercentage }}%</span>
                        <span>{{ table.types[rightType].title }}</span>
                    </div>
                </div>
                <p class="mbti-description">
                    {{ personalityType.description }}
                </p>
                <h3>O que é {{ title.toLowerCase() }}?</h3>
                <p class="quote">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>

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
        let table = {
            titles: {
                energy: {
                    title: 'Energia',
                    description: 'A energia é a característica que determina como você interage com o mundo exterior, seja por meio de ações ou reflexões. A energia é dividida em dois aspectos: extroversão e introversão. A extroversão é a tendência a se concentrar no mundo exterior, enquanto a introversão é a tendência a se concentrar no mundo interior.'
                },
                mind: {
                    title: 'Mente',
                    description: 'A mente é a característica que determina como você toma decisões e lida com informações. A mente é dividida em dois aspectos: observação e intuição. A observação é a tendência a se concentrar em informações concretas e no que pode ser visto, ouvido, sentido ou experimentado. A intuição é a tendência a se concentrar em informações abstratas e nas possibilidades futuras.'
                },
                nature: {
                    title: 'Natureza',
                    description: 'A natureza é a característica que determina como você lida com emoções e situações estressantes. A natureza é dividida em dois aspectos: sentimento e pensamento. O sentimento é a tendência a tomar decisões com base em emoções e valores pessoais. O pensamento é a tendência a tomar decisões com base na lógica e na razão.'
                },
                tactics: {
                    title: 'Tática',
                    description: 'As táticas são a característica que determina como você lida com planejamento e tomada de decisões. As táticas são divididas em dois aspectos: julgamento e prospecção. O julgamento é a tendência a se concentrar em resultados e em seguir um plano. Prospecção é a tendência a se concentrar em possibilidades e em manter as opções em aberto.'
                },
                identity: {
                    title: 'Identidade',
                    description: 'A identidade é a característica que determina como você lida com a confiança, a autoestima e a determinação. A identidade é dividida em dois aspectos: assertividade e turbulência. A assertividade é a tendência a se sentir confiante e a assumir o controle de uma situação. A turbulência é a tendência a se sentir ansioso e a se preocupar com o futuro.'
                }
            },
            types: {
                introverted: {
                    title: 'Introvertido',
                    abbreviation: 'I',
                    description: 'Os introvertidos tendem a ser mais reservados e a se concentrar em seu mundo interior. Eles preferem atividades solitárias ou em pequenos grupos e podem se sentir sobrecarregados em ambientes sociais. Os introvertidos geralmente precisam de tempo sozinhos para recarregar suas energias.'
                },
                extroverted: {
                    title: 'Extrovertido',
                    abbreviation: 'E',
                    description: 'Os extrovertidos tendem a ser mais sociáveis e a se concentrar no mundo exterior. Eles preferem atividades em grupo e podem se sentir entediados ou solitários quando estão sozinhos. Os extrovertidos geralmente se sentem energizados em ambientes sociais.'
                },
                observant: {
                    title: 'Observador',
                    abbreviation: 'S',
                    description: 'Os observadores tendem a ser mais práticos e a se concentrar em detalhes concretos. Eles preferem informações objetivas e confiáveis e podem ter dificuldade em lidar com incertezas ou ambiguidades. Os observadores geralmente confiam em suas experiências passadas e em seus sentidos para tomar decisões.'
                },
                intuitive: {
                    title: 'Intuitivo',
                    abbreviation: 'N',
                    description: 'Os intuitivos tendem a ser mais imaginativos e a se concentrar em possibilidades futuras. Eles preferem informações abstratas e teóricas e podem ter dificuldade em lidar com fatos concretos ou com o presente imediato. Os intuitivos geralmente confiam em sua intuição e em sua imaginação para tomar decisões.'
                },
                thinking: {
                    title: 'Pensamento',
                    abbreviation: 'T',
                    description: 'Os pensadores tendem a ser mais lógicos e a se concentrar na razão. Eles preferem analisar informações objetivas e imparciais e podem ter dificuldade em lidar com emoções ou valores pessoais. Os pensadores geralmente confiam em sua capacidade de raciocínio e em sua objetividade para tomar decisões.'
                },
                feeling: {
                    title: 'Sentimento',
                    abbreviation: 'F',
                    description: 'Os sentimentais tendem a ser mais emocionais e a se concentrar em valores pessoais. Eles preferem tomar decisões com base em suas emoções e em suas crenças pessoais e podem ter dificuldade em lidar com lógica ou com a razão. Os sentimentais geralmente confiam em sua intuição e em seus valores para tomar decisões.'
                },
                judging: {
                    title: 'Julgador',
                    abbreviation: 'J',
                    description: 'Os julgadores tendem a ser mais organizados e a se concentrar em resultados. Eles preferem seguir um plano e tomar decisões de forma rápida e eficiente. Os julgadores geralmente têm dificuldade em lidar com mudanças de última hora ou com situações imprevisíveis.'
                },
                prospecting: {
                    title: 'Prospecção',
                    abbreviation: 'P',
                    description: 'Os prospectores tendem a ser mais flexíveis e a se concentrar em possibilidades. Eles preferem manter as opções em aberto e explorar diferentes alternativas antes de tomar uma decisão. Os desbravadores geralmente têm dificuldade em seguir um plano rígido ou em se comprometer com uma única opção.'
                },
                assertive: {
                    title: 'Assertivo',
                    abbreviation: 'A',
                    description: 'Os assertivos tendem a ser mais confiantes e a se concentrar em seus objetivos. Eles preferem tomar a iniciativa e assumir o controle de uma situação. Os assertivos geralmente têm dificuldade em lidar com indecisões ou com situações em que não têm controle.'
                },
                turbulent: {
                    title: 'Turbulento',
                    abbreviation: 'T',
                    description: 'Os turbulentos tendem a ser mais ansiosos e a se concentrar em suas emoções. Eles preferem ter um plano de backup e estar preparados para o pior cenário. Os turbulentos geralmente têm dificuldade em lidar com incertezas ou com situações imprevisíveis, sendo mais propensos a se preocuparem com o futuro e a terem dificuldade em relaxar.'
                }
            },
            pairs: {
                introverted: 'extroverted',
                extroverted: 'introverted',
                observant: 'intuitive',
                intuitive: 'observant',
                thinking: 'feeling',
                feeling: 'thinking',
                judging: 'prospecting',
                prospecting: 'judging',
                assertive: 'turbulent',
                turbulent: 'assertive'
            },
            display: {
                introverted_extroverted: 'energy',
                observant_intuitive: 'mind',
                thinking_feeling: 'nature',
                judging_prospecting: 'tactics',
                assertive_turbulent: 'identity'
            }
        }
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

        const title = this.title || (table.titles[comparationCategory] && table.titles[comparationCategory].title);
        const description = this.description || (table.titles[comparationCategory] && table.titles[comparationCategory].description);

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
            table
        };

    },
    computed: {
        getComponentId() {
            return 'mbti-component-' + this._uid;
        },
    },
    beforeMount() {
        this.$el.setAttribute('id', 'component-' + this._uid);
    },
    mounted() {
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
    width: calc(100% - 64px);
    height: fit-content;
    padding: relative;
    background-color: #FFF;
    margin: 32px;
    border-radius: 0 0 1rem 1rem;
}

.mbti-header {
    /* use the primaryColor prop as the background color */
    background-color: var(--personalityCardColor);
    padding: 20px 0;
    padding-bottom: 0;
    text-align: center;
    position: relative;
    width: 100%;
    color: white;
    margin-bottom: 40px;
}

.mbti-header h1 {
    font-size: 2rem;
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
    padding: 20px;
    font-size: 1em;
    line-height: 1em;
    color: #333;
    width: 70%;
    margin: 0 auto;
}

.mbti-content {
    display: flex;
    justify-content: space-evenly;
    align-items: start;
    padding: 20px;
    gap: 20px;
    position: relative;
}

.mbti-image {
    width: calc(50% - 20px);
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
    width: calc(50% - 20px);
    padding: 20px;
}

.mbti-text h2 {
    font-size: 3em;
    color: #333;
    display: flex;
    justify-content: start;
    align-items: start;
    margin-bottom: 20px;
    gap: 10px;
}

.mbti-text h2 span {
    font-size: 0.5em;
    color: #707070;
    opacity: 0.8;
    display: inline-block;
    margin-top: 10px;
}

.mbti-text p {
    font-size: 1.5em;
    line-height: 1.5em;
    color: #333;
    white-space: pre-line;
}

.mbti-text h3 {
    font-size: 2em;
    color: #333;
    margin-top: 48px;
    margin-bottom: 0px;
}

.mbti-text p.quote {
    font-size: 1.2em;
    line-height: 1.4em;
    color: #707070;
    border-left: 3px solid #7070706c;
    padding-left: 20px;
    margin: 20px 0;
}

.mbti-text .legends {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 50px;
}

.mbti-text .legends div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mbti-text .legends div:first-child {
    text-align: left;
    align-items: flex-start;
    font-size: 1.5em;
    line-height: 1.1em;
}

.mbti-text .legends div:last-child {
    text-align: right;
    align-items: flex-end;
    font-size: 1.5em;
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
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    color: #707070;
}

.progress-bar {
    width: 100%;
    height: 12px;
    background-color: #f1f1f1;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0;
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
    --personalityCardColor: #111;

    .mbti-container {
        background-color: #333;
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
    .mbti-content {
        flex-direction: column;
    }

    .mbti-image {
        width: 100%;
        padding-bottom: 50%;
    }

    .mbti-text {
        width: 100%;
    }
}
</style>
