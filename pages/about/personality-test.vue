<template>
    <div class="mbti-result-resume">
        <div>
            <img src="/images/MBTI/16personalities-intp.svg" alt="INTP" />
        </div>
        <div>
            <h2>Personalidade</h2>
            <h1>INTP-T</h1>
            <h3>Lógico</h3>

        </div>
        <div>
            <h2>Introdução</h2>
            <p>Os INTPs são pensadores criativos e lógicos, com uma paixão por desafiar o status quo. Eles são capazes
                de analisar problemas complexos para encontrar soluções eficazes.</p>
            <p>São conhecidos por sua curiosidade e habilidade de pensar de forma abstrata. Eles são capazes de
                ver o mundo de uma perspectiva única e muitas vezes têm ideias que desafiam o status quo. Os INTPs são
                introvertidos, intuitivos, pensadores e prospectivos. Eles são conhecidos por sua capacidade de analisar
                problemas complexos e encontrar soluções criativas. Os INTPs são muitas vezes descritos como pensadores
                profundos e inovadores.</p>
        </div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <PersonalityResult primaryColor="#4298B4" :percentage="81" percentageType="introverted" />
        <PersonalityResult primaryColor="#E4AE3A" :percentage="91" percentageType="intuitive" />
        <PersonalityResult primaryColor="#33A474" :percentage="74" percentageType="thinking" />
        <PersonalityResult primaryColor="#96637C" :percentage="92" percentageType="prospecting" />
        <PersonalityResult primaryColor="#F25E62" :percentage="51" percentageType="turbulent" />
    </div>
    <div class="credits">
        Estudo e <a href="https://www.16personalities.com/profiles/1b0e2ee7ed173" target="_blank">resultado</a> baseado
        no
        teste
        Myers-Briggs Type Indicator (MBTI). Saiba mais em <a href="https://www.16personalities.com/pt"
            target="_blank">16personalities</a>
    </div>
</template>

<script>
import PersonalityResult from '~/components/personality/result.vue';

export default {
    components: {
        PersonalityResult
    }
};
</script>

<style>
.mbti-result-resume {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin: 2rem 40px;
    gap: 2rem;
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