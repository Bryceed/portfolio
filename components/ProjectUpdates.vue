<template>
    <div class="project-updates">
        <h2 class="text-center w-full updates-title mt-6">Updates</h2>
        <div class="flex flex-col items-center justify-center w-full ">
            <div v-for="update in updates" :key="update.id" class="update-item md:w-10/12 md:offset-2"
                :style="{ animationDelay: (updates.indexOf(update) * 0.2) + 's' }" v-if="fetchStatus === 'success'">
                <h2>{{ update.title }}</h2>
                <p v-if="update.type === 'news'" v-html="update.content" class="update-content"></p>
                <img v-if="update.type === 'photo'" :src="update.content" alt="Project Update Photo" />
                <a v-if="update.type === 'link'" :href="update.content" target="_blank">{{ update.content }}</a>
                <div class="update-date">{{ formatDate(update.created) }} |
                    <img :src="reconstructLink(update, update.expand.author.avatar)" :alt="update.author.username"
                        class="avatar" />
                    {{ update.expand.author.username }}
                </div>
            </div>
            <div v-else-if="fetchStatus === 'loading'" class="loading-spinner">
                <div class="loading-spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
            <div v-else-if="fetchStatus === 'error'">
                <p>Error loading updates</p>
            </div>
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

const updates = ref([]);
const baseUrl = 'https://services.rydermais.com';
const langFetch = ref('');
const fetchStatus = ref('loading');

const fetchUpdates = async (projectId) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 3700)); // Delay of 3.7 seconds
        const response = await $fetch(`${baseUrl}/api/collections/project_updates/records`, {
            params: {
                filter: `(project_id='${projectId}')`,
                sort: '-created',
                expand: 'author',
            },
        });
        updates.value = response.items;
        fetchStatus.value = 'success';
    } catch (error) {
        fetchStatus.value = 'error';
        console.error('Error fetching updates:', error);
    }
};

onMounted(() => {
    langFetch.value = localStorage.getItem('lang') || 'en';
    fetchUpdates(props.projectId);
});

const formatDate = (date) => {
    return new Date(date).toLocaleDateString(langFetch.value, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const reconstructLink = (source, link) => {
    return baseUrl + '/api/files/_pb_users_auth_/' + source.expand.author.id + '/' + link;
};
</script>

<style scoped>
.project-updates {
    display: flex;
        flex-direction: column;
            gap: 1rem;
        }
        
        .updates-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            font-family: 'Parkinsans', sans-serif !important;
        }
        
        .update-item {
            color: white;
            padding: 1rem 1.25rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 1;
            animation: fadeIn 0.25s cubic-bezier(0.39, 0.575, 0.565, 1) backwards;
        }
        
        .update-item::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            border-left: 4px solid var(--secondary-color);
            border-radius: 8px;
            filter: contrast(1.1) brightness(1.1) saturate(1.2);
            z-index: -1;
        }
        
        
        .update-item h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            font-family: 'Parkinsans', sans-serif !important;
            font-weight: 500;
            z-index: 1;
        }
        
        .update-content {
            font-size: 1.1rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.5;
            text-align: left;
            max-width: 100%;
            display: flex;
            flex-direction: column;
        
        
        }
        
        .update-content * {
            margin-bottom: .45rem;
        }

.update-date {
    font-size: 0.8rem;
    color: var(--text-color);
    margin-top: 1rem;
    display: flex;
    align-items: start;
}

.avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 0.2rem;
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.bounce1,
.bounce2,
.bounce3 {
    width: 10px;
    height: 10px;
    background-color: var(--text-color);
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.4s infinite ease-in-out;
}

.bounce1 {
    animation-delay: -0.32s;
}

.bounce2 {
    animation-delay: -0.16s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
}

</style>