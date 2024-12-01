<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-display">
            <button class="close-button" @click="close">X</button>
            <div class="modal-gradient-top"></div>
            <div class="modal-content">
                <div v-if="fetchStatus === 'loading'" class="loading-spinner"></div>
                <div v-else-if="fetchStatus === 'error'">
                    <p>Error loading post: {{ fetchError }}</p>
                </div>
                <div v-else class="post-content">
                    <h1 class="post-title">{{ post.title }}</h1>
                    <img :src="reconstructLink(post, post.thumbnail)" :alt="post.title" class="post-thumbnail" />
                    <div v-html="post.article" class="post-article"></div>
                </div>
            </div>
            <div class="modal-gradient-bottom"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    postId: {
        type: String,
        required: true
    }
});
const emit = defineEmits(['close']);

const baseUrl = 'https://services.rydermais.com';
const post = ref(null);
const fetchStatus = ref('loading');
const fetchError = ref(null);

const close = () => {
    emit('close');
};

const reconstructLink = (source, link) => {
    return baseUrl + '/api/files/' + source.collectionId + '/' + source.id + '/' + link;
};

const fetchPost = async (id) => {
    fetchStatus.value = 'loading';
    try {
        const response = await $fetch(`${baseUrl}/api/collections/blog_posts/records/${id}`);
        post.value = response;
        fetchStatus.value = 'success';
    } catch (error) {
        fetchStatus.value = 'error';
        fetchError.value = error.message;
    }
};

watch(() => props.postId, (newId) => {
    if (newId) {
        fetchPost(newId);
    }
});

onMounted(() => {
    if (props.postId) {
        fetchPost(props.postId);
    }
});
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 4rem + 40px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.4s ease-out;
}

.modal-overlay:after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(31, 31, 31, 0.502);
    backdrop-filter: blur(5px);
    z-index: -1;
}

html.light .modal-overlay:after {
    background: #d9d9d9cb;
}

.modal-display {
    background: #131313da;
    border-radius: 8px;
    width: 100%;
    margin: 0 20px;
    max-height: calc(100dvh - (4rem + 40px));
    animation: slideUp 0.3s ease-in-out;
    scrollbar-width: thin;
    scrollbar-color: #ccc #f4f4f4;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: calc(100dvh - 4rem);
}

html.light .modal-display {
    background: rgba(248, 248, 248, 0.842);
}

.modal-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    height: 100%;
    width: 100%;
    position: relative;
    overflow-y: auto;
}

.modal-gradient-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: linear-gradient(180deg, #131313da 0%, #13131300 100%);
    z-index: 4;
}

html.light .modal-gradient-top {
    background: linear-gradient(180deg, #f8f8f8 0%, #f8f8f800 100%);
}

.modal-gradient-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: linear-gradient(0deg, #131313da 0%, #13131300 100%);
    z-index: 4;
}

html.light .modal-gradient-bottom {
    background: linear-gradient(0deg, #f8f8f8 0%, #f8f8f800 100%);
}

.modal-display .close-button {
    position: fixed;
    top: calc(5rem + 40px);
    right: 2.2rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    background: #8585851c;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    z-index: 5;

    &:hover {
        background: #8585854d;
    }
}

.modal-content .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top-color: #782fee;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Post content */
.post-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    gap: 2rem;
}

.post-title {
    font-size: 2rem;
    font-weight: 700;
    color: #782fee;
    margin-bottom: 1rem;
    text-align: center;
}

.post-thumbnail {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.post-article {
    font-size: 1.4rem;
    font-weight: 400;
    color: #f4f4f4;
    line-height: 1.5;
    text-align: justify;
    margin: 0 1rem 1rem;
    font-family: 'Quicksand', sans-serif;
}

html.light .post-article {
    color: #131313;
}

.post-article h1,
.post-article h2,
.post-article h3,
.post-article h4,
.post-article h5,
.post-article h6 {
    color: #b5a8ee !important;
    font-weight: 700;
    font-family: 'Quicksand', sans-serif;
    margin: 2rem 0 1rem;
}

html.light .post-article h1,
html.light .post-article h2,
html.light .post-article h3,
html.light .post-article h4,
html.light .post-article h5,
html.light .post-article h6 {
    color: #782fee !important;
}

.post-article p {
    margin: 1rem 0;
}

.post-article a {
    color: #636cee;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
        color: #c9aef3;
        text-decoration: underline;
    }
}

html.light .post-article a {
    color: #782fee;
}

.post-article code {
    background: rgba(244, 244, 244, 0.144);
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
}

html.light .post-article code {
    background: rgba(51, 51, 51, 0.068);
}


@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>