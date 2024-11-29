<template>
    <div class="mx-auto mbti-result-resume flex flex-col items-center gap-4">
        <div class="flex flex-row items-center gap-4 my-6">
            <div class="flex flex-col items-center">
                <img src="/images/MBTI/16personalities-intp.svg" alt="INTP" />
            </div>
            <div class="text-start">
                <h2>{{ translations[$i18n.locale].personality }}</h2>
                <h1>INTP-T</h1>
                <h3>{{ translations[$i18n.locale].logical }}</h3>
            </div>
        </div>
        <div class="flex flex-col items-start md:w-2/3 mx-8 md:mx-auto lg:w-1/2 mb-6">
            <h2 class="mb-4">{{ translations[$i18n.locale].introduction }}</h2>
            <p>{{ translations[$i18n.locale].introText1 }}</p>
            <p>{{ translations[$i18n.locale].introText2 }}</p>
        </div>
    </div>

    <div class=" grid grid-cols-1 md:grid-cols-1 md:gap-4 md:w-2/3 mx-8 md:mx-auto lg:w-1/2 mb-4">
        <PersonalityResult primaryColor="#4298B4" :percentage="81" percentageType="introverted" />
        <PersonalityResult primaryColor="#E4AE3A" :percentage="91" percentageType="intuitive" />
        <PersonalityResult primaryColor="#33A474" :percentage="74" percentageType="thinking" />
        <PersonalityResult primaryColor="#96637C" :percentage="92" percentageType="prospecting" />
        <PersonalityResult primaryColor="#F25E62" :percentage="51" percentageType="turbulent" />
    </div>
    <div class="credits">
        {{ translations[$i18n.locale].credits }} <a :href="translations[$i18n.locale].resultLink" target="_blank">{{
            translations[$i18n.locale].result }}</a>
        {{ translations[$i18n.locale].basedOn }}
        <a :href="translations[$i18n.locale].learnMoreLink" target="_blank">{{ translations[$i18n.locale].learnMore
            }}</a>
    </div>
</template>

<script>
import PersonalityResult from '~/components/personality/result.vue';

export default {
    components: {
        PersonalityResult
    },
    data() {
        return {
            translations: {
                en: {
                    personality: 'Personality',
                    logical: 'Logical',
                    introduction: 'Introduction',
                    introText1: 'INTPs are creative and logical thinkers with a passion for challenging the status quo. They are able to analyze complex problems to find effective solutions.',
                    introText2: 'They are known for their curiosity and ability to think abstractly. They can see the world from a unique perspective and often have ideas that challenge the status quo. INTPs are introverted, intuitive, thinking, and prospecting. They are known for their ability to analyze complex problems and find creative solutions. INTPs are often described as deep and innovative thinkers.',
                    credits: 'Study and',
                    result: 'result',
                    basedOn: 'based on the Myers-Briggs Type Indicator (MBTI) test. Learn more at',
                    learnMore: '16personalities',
                    resultLink: 'https://www.16personalities.com/profiles/1b0e2ee7ed173',
                    learnMoreLink: 'https://www.16personalities.com'
                },
                es: {
                    personality: 'Personalidad',
                    logical: 'Lógico',
                    introduction: 'Introducción',
                    introText1: 'Los INTP son pensadores creativos y lógicos con una pasión por desafiar el status quo. Son capaces de analizar problemas complejos para encontrar soluciones efectivas.',
                    introText2: 'Son conocidos por su curiosidad y capacidad para pensar de manera abstracta. Pueden ver el mundo desde una perspectiva única y a menudo tienen ideas que desafían el status quo. Los INTP son introvertidos, intuitivos, pensadores y prospectivos. Son conocidos por su capacidad para analizar problemas complejos y encontrar soluciones creativas. Los INTP a menudo son descritos como pensadores profundos e innovadores.',
                    credits: 'Estudio y',
                    result: 'resultado',
                    basedOn: 'basado en la prueba Myers-Briggs Type Indicator (MBTI). Aprende más en',
                    learnMore: '16personalities',
                    resultLink: 'https://www.16personalities.com/profiles/1b0e2ee7ed173',
                    learnMoreLink: 'https://www.16personalities.com/es'
                },
                ko: {
                    personality: '성격',
                    logical: '논리적',
                    introduction: '소개',
                    introText1: 'INTP는 현상 유지를 도전하는 것에 열정을 가진 창의적이고 논리적인 사상가입니다. 그들은 복잡한 문제를 분석하여 효과적인 해결책을 찾을 수 있습니다.',
                    introText2: '그들은 호기심과 추상적으로 생각하는 능력으로 알려져 있습니다. 그들은 독특한 관점에서 세상을 볼 수 있으며 종종 현상 유지를 도전하는 아이디어를 가지고 있습니다. INTP는 내향적, 직관적, 사고적, 탐구적입니다. 그들은 복잡한 문제를 분석하고 창의적인 해결책을 찾는 능력으로 알려져 있습니다. INTP는 종종 깊고 혁신적인 사상가로 묘사됩니다.',
                    credits: '연구 및',
                    result: '결과',
                    basedOn: 'Myers-Briggs Type Indicator (MBTI) 테스트를 기반으로 합니다. 자세히 알아보기',
                    learnMore: '16personalities',
                    resultLink: 'https://www.16personalities.com/profiles/1b0e2ee7ed173',
                    learnMoreLink: 'https://www.16personalities.com/ko'
                },
                'pt-BR': {
                    personality: 'Personalidade',
                    logical: 'Lógico',
                    introduction: 'Introdução',
                    introText1: 'Os INTPs são pensadores criativos e lógicos, com uma paixão por desafiar o status quo. Eles são capazes de analisar problemas complexos para encontrar soluções eficazes.',
                    introText2: 'São conhecidos por sua curiosidade e habilidade de pensar de forma abstrata. Eles são capazes de ver o mundo de uma perspectiva única e muitas vezes têm ideias que desafiam o status quo. Os INTPs são introvertidos, intuitivos, pensadores e prospectivos. Eles são conhecidos por sua capacidade de analisar problemas complexos e encontrar soluções criativas. Os INTPs são muitas vezes descritos como pensadores profundos e inovadores.',
                    credits: 'Estudo e',
                    result: 'resultado',
                    basedOn: 'baseado no teste Myers-Briggs Type Indicator (MBTI). Saiba mais em',
                    learnMore: '16personalities',
                    resultLink: 'https://www.16personalities.com/profiles/1b0e2ee7ed173',
                    learnMoreLink: 'https://www.16personalities.com/pt'
                },
                jp: {
                    personality: '性格',
                    logical: '論理的',
                    introduction: '紹介',
                    introText1: 'INTPは現状を挑戦することに情熱を持つ創造的で論理的な思考者です。彼らは複雑な問題を分析して効果的な解決策を見つけることができます。',
                    introText2: '彼らは好奇心と抽象的に考える能力で知られています。彼らは独自の視点から世界を見ることができ、しばしば現状を挑戦するアイデアを持っています。INTPは内向的、直感的、思考的、探求的です。彼らは複雑な問題を分析し、創造的な解決策を見つける能力で知られています。INTPはしばしば深く革新的な思考者として描写されます。',
                    credits: '研究と',
                    result: '結果',
                    basedOn: 'Myers-Briggs Type Indicator (MBTI)テストに基づいています。詳細はこちら',
                    learnMore: '16personalities',
                    resultLink: 'https://www.16personalities.com/profiles/1b0e2ee7ed173',
                    learnMoreLink: 'https://www.16personalities.com/jp'
                },
                fr: {
                    personality: 'Personnalité',
                    logical: 'Logique',
                    introduction: 'Introduction',
                    introText1: 'Les INTP sont des penseurs créatifs et logiques avec une passion pour défier le statu quo. Ils sont capables d\'analyser des problèmes complexes pour trouver des solutions efficaces.',
                    introText2: 'Ils sont connus pour leur curiosité et leur capacité à penser de manière abstraite. Ils peuvent voir le monde d\'une perspective unique et ont souvent des idées qui défient le statu quo. Les INTP sont introvertis, intuitifs, penseurs et prospectifs. Ils sont connus pour leur capacité à analyser des problèmes complexes et à trouver des solutions créatives. Les INTP sont souvent décrits comme des penseurs profonds et innovants.',
                    credits: 'Étude et',
                    result: 'résultat',
                    basedOn: 'basé sur le test Myers-Briggs Type Indicator (MBTI). En savoir plus sur',
                    learnMore: '16personalities',
                    resultLink: 'https://www.16personalities.com/profiles/1b0e2ee7ed173',
                    learnMoreLink: 'https://www.16personalities.com/fr'
                }
            }
        };
    }
};
</script>

<style>
.mbti-result-resume {
}

.mbti-result-resume img {
    width: 200px;
}

.mbti-result-resume h1 {
    font-size: 4.2rem;
    margin: 0;
    white-space: nowrap;
    color: #95627B;

}

.mbti-result-resume h2 {
    font-size: 1.5rem;
    margin: 0;
    color: #584164
}

.mbti-result-resume h3 {
    font-size: 1.2rem;
    margin: 0;
    color: #584164;
}

.mbti-result-resume p {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.credits {
    background: linear-gradient(0deg, #00000017, transparent 25%), linear-gradient(180deg, #c69cb0, #96637c);
    text-align: center;
    margin: 0 auto !important;
    border-radius: 1rem 1rem 0 0;
    background-color: #F1F1F1;
    padding: .7rem 2rem;
    display: table;
    color: #eee;
    font-size: 0.8rem;
}

.credits a {
    color: #c8b8c0;
    text-decoration: underline;
    cursor: help;
}
</style>