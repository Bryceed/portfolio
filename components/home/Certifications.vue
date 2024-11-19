<template>
    <div class="certifications">
        <h2>Certificações</h2>
        <div class="certifications__container">
            <div v-for="certification in certifications" :key="certification.id" class="certification-item">
                <h3>{{ certification.title }}</h3>
                <p>{{ certification.description }}</p>
                <a :href="certification.link" target="_blank">Ver Certificado</a>
            </div>
        </div>
    </div>
</template>

<script>
import certifications from '@/data/certifications.json';

export default {
    name: 'Certifications',
    data() {
        return {
            certifications
        };
    }
}
</script>

<style scoped>
.certifications {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 48px 30px;
}

.certifications h2 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}

html.light .certifications h2 {
    color: #000;
}

.certifications__container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.certification-item {
    background: #1b1b1b;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 300px;
    aspect-ratio: 16/9;
    text-align: center;
}

html.light .certification-item {
    background: #ece6ef;
    color: #000;
}

.certification-item h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.certification-item p {
    font-size: 1rem;
    margin-bottom: 10px;
}

.certification-item a {
    color: #1e90ff;
    text-decoration: none;
    font-weight: bold;
}

.certification-item a:hover {
    text-decoration: underline;
}
</style>