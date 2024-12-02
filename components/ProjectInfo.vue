<template>
    <div class="flex flex-col items-center justify-center w-full">
        <div class="project-info md:w-10/12 md:offset-2">
            <h2>Project Information</h2>
            <div v-html="info" class="info"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    projectId: {
        type: String,
        required: true
    }
});

const info = ref('');
const team = ref([]);
const baseUrl = 'https://services.rydermais.com';
const langFetch = ref('');
const fetchProjectInfo = async (projectId) => {
    langFetch.value = localStorage.getItem('lang') || 'en';
    try {
        const response = await $fetch(`${baseUrl}/api/collections/project_info/records`, {
            params: {
                filter: `(project_id='${projectId}' && lang='${langFetch.value}')`,
            },
        });
        if (response.items.length > 0) {
            info.value = response.items[0].info;
            team.value = response.items[0].team;
        }
    } catch (error) {
        console.error('Error fetching project info:', error);
    }
};

onMounted(() => {
    fetchProjectInfo(props.projectId);
});
</script>

<style scoped>
@import url('~/assets/css/markdown.css');
.project-info {
    margin-bottom: 2rem;    color: #fff;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 3rem;
    position: relative;
    z-index: 2;
}

.project-info h2,
.project-info h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    z-index: 2;
    font-family: 'Parkinsans', sans-serif;
    font-weight: 600;
}

.project-info .info {
    list-style-type: disc;
    padding-left: 1.5rem;
    z-index: 2;
    text-align: left !important;
    border-left: 2px solid var(--primary-color);
    color: rgba(255, 255, 255, .7)
    }
</style>