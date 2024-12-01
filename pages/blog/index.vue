<template>
    <div class="blog-minibio">
        <h1>{{ title[$i18n.locale] }}</h1>
        <p>{{ description[$i18n.locale] }}</p>

    </div>

    <div class="blog-posts">
        <div v-for="post in posts" :key="post.id" class="blog-post" v-if="fetchStatus === 'success'">
            <h2>{{ post.title }}</h2>
            <img :src="reconstructLink(post, post.thumbnail)" :alt="post.title"
                onerror="this.src='/assets/images/generic/placeholder.webp'" />
            <p>{{ post.article }}</p>
            <a @click="openModal(post.id)">Read more</a>
        </div>
        <div class="flex justify-center items-center h-32 w-full mt-8"
            v-else-if="fetchStatus === 'loading' || fetchStatus === 'pending'">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
        <div v-else-if="fetchStatus === 'error'">
            <p>Error fetching posts: {{ fetchError.value }}</p>
        </div>
    </div>
    <div class="w-full flex justify-center items-center mt-8">
        <div class="disclaimer my-6 mx-auto inline-block" v-if="$i18n.locale != 'pt-BR'">{{
            mistakesByIATranslationWarning[$i18n.locale]
            }}</div>
    </div>
    <PostModal v-if="isModalOpen" :postId="selectedPostId" @close="closeModal" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PostModal from '@/components/PostModal.vue'; // Import the new component

const baseUrl = 'https://services.rydermais.com'

const posts = ref([]);
const fetchStatus = ref('pending');
const fetchError = ref(null);

// set texts and lang
const title = {
    'pt-BR': 'Publicações',
    'en': 'Posts',
    'es': 'Publicaciones',
    'fr': 'Publications',
    'ko': '게시물',
    'jp': '投稿'
};
const description = {
    'pt-BR': 'Posts sobre tecnologia, desenvolvimento de software e outras coisas interessantes.',
    'en': 'Posts about technology, software development and other interesting things.',
    'es': 'Publicaciones sobre tecnología, desarrollo de software y otras cosas interesantes.',
    'fr': 'Publications sur la technologie, le développement de logiciels et d\'autres choses intéressantes.',
    'ko': '기술, 소프트웨어 개발 및 기타 흥미로운 주제에 대한 게시물.',
    'jp': '技術、ソフトウェア開発、その他興味深いトピックに関する投稿。'
};
const mistakesByIATranslationWarning = {
    'pt-BR': 'Textos traduzidos com IA. Pode conter erros.',
    'en': 'Assisted translated texts with AI. May contain errors.',
    'es': 'Traducción asistida de textos con IA en inglés. Puede contener errores.',
    'fr': 'Assisté traduit avec IA de l\'anglais. Peut contenir des erreurs.',
    'ko': 'AI에 의해 번역 된 영어 텍스트. 오류가 포함 될 수 있습니다.',
    'jp': 'AIによる英語のテキストの翻訳。エラーが含まれる可能性があります。'
};

const isModalOpen = ref(false);
const selectedPostId = ref(null);

const openModal = (postId) => {
    selectedPostId.value = postId;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedPostId.value = null;
};

onMounted(async () => {

    if (sessionStorage.getItem('cachedPosts')) {
        posts.value = JSON.parse(sessionStorage.getItem('cachedPosts'));
        fetchStatus.value = 'success';
    } else {
        fetchStatus.value = 'loading';
        try {
            const response = await $fetch(
                baseUrl + '/api/collections/blog_posts/records',
                {
                    params: {
                        fields: '*,article:excerpt(200,true)',
                        sort: '-created,id',
                    },
                }
            );
            console.log(response);
            posts.value = response.items;
            fetchStatus.value = 'success';
            // Cache the data
            sessionStorage.setItem('cachedPosts', JSON.stringify(response.items));
        } catch (error) {
            fetchStatus.value = 'error';
            fetchError.value = error.message;

            console.error(error);
        }
    }
});

const reconstructLink = (source, link) => {
    return baseUrl + '/api/files/' + source.collectionId + '/' + source.id + '/' + link;
};
</script>

<style scoped lang="scss">
.blog-posts {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    margin: 0 auto;
    max-width: 1340px;
    padding: 0 2rem;

    .blog-post {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 8px;
        background: #fff;
        box-shadow: 1px 5px 4px 2px #98989863;
        transition: all 0.3s ease;

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #782fee;
            margin-bottom: 0.5rem;
        }

        p {
            font-size: 1rem;
            font-weight: 400;
            margin-bottom: 0.5rem;
        }

        a {
            font-size: 1rem;
            font-weight: 700;
            color: #782fee;
            text-decoration: none;
            transition: all 0.3s ease;

            &:hover {
                color: #782fee;
                text-decoration: underline;
            }
        }

        &.loaded {
            background: #f5f5f5;
        }
    }
}

.disclaimer {
    font-size: 0.8rem;
    font-weight: 400;
    color: #b8b8b8;
    border-radius: 4rem;
    background: #782fee;
    padding: .1rem 1rem;
}
.blog-minibio {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 2rem;

    h1 {
        font-size: 3rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 1rem;
    }

    
    .minibio_side {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        img {
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            image-rendering: -moz-crisp-edges;
            image-rendering: -o-crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
        }

        p {
            font-size: 1rem;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .icons {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            a {
                color: #782fee;
                text-decoration: none;
                font-size: 1.5rem;
                margin: 0 10px;
            }
        }
    }
}

html.dark {
    .blog-minibio {
        h1 {
            color: #ffffff;
        }

        .minibio_side {
            p {
                color: #b8b8b8;
            }

            .icons {
                a {
                    color: #782fee;
                }
            }
        }
    }

    .blog-posts {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        margin: 0 auto 2rem;
        max-width: 1340px;
        padding: 0 2rem;

        .blog-post {
            background: #1c1c1c !important;
            box-shadow: 1px 5px 4px 2px #00000063;
            transition: all 0.3s ease;
            position: relative;
            top: 0;
            margin: 1rem 0;
            filter: contrast(1) brightness(1);

            &:hover {
                background: #2c2c2c !important;
                box-shadow: 1px 5px 4px 2px #00000063;
                top: -5px;
            }

            &:active {
                background: #3c3c3c !important;
                box-shadow: 1px 5px 4px 2px #00000063;
                top: 0;
                filter: contrast(1.5) brightness(1.5);
            }

            h2 {
                color: #782fee;
            }

            p {
                color: #c1c1c1;
            }

            a {
                color: #782fee;

                &:hover {
                    color: #782fee;
                }
            }
        }
    }

}
</style>