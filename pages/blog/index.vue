<template>
    <div class="blog-minibio">
        <h1>{{ title[$i18n.locale] }}</h1>
        <p>{{ description[$i18n.locale] }}</p>

    </div>

    <div class="blog-posts">
        <div v-for="post in posts" :key="post.id" class="blog-post" v-if="fetchStatus === 'success'">

            <div class="post-card-header">
                <div class="post-card-image" @click="openModal(post.id)"
                    :style="{ backgroundImage: 'url(' + reconstructLink(post, post.thumbnail) + '?thumb=100x50)' }">

                    <h2>{{ post.title }} demais para que isso aconteça um dia</h2>
                    <div class="post-card-details">
                        <p>{{ formatDate(post.created) }}</p>
                    </div>
                </div>
                <div class="post-card-surface">
                    <a @click="openModal(post.id)" class="btn btn-primary">{{ btnText[$i18n.locale] }}</a>
                </div>
            </div>

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
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
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
    'ja-JP': '投稿'
};
const description = {
    'pt-BR': 'Posts sobre tecnologia, desenvolvimento de software e outras coisas que acho interessantes.',
    'en': 'Posts about technology, software development and other things I find interesting.',
    'es': 'Publicaciones sobre tecnología, desarrollo de software y otras cosas que encuentro interesantes.',
    'fr': 'Publications sur la technologie, le développement de logiciels et d\'autres choses qui m\'intéressent.',
    'ko': '기술, 소프트웨어 개발 및 기타 흥미로운 주제에 대한 게시물.',
    'ja-JP': '技術、ソフトウェア開発、その他興味深いことに関する投稿。'
};
const mistakesByIATranslationWarning = {
    'pt-BR': 'Textos traduzidos com IA. Pode conter erros.',
    'en': 'Assisted translated texts with AI. May contain errors.',
    'es': 'Traducción asistida de textos con IA en inglés. Puede contener errores.',
    'fr': 'Assisté traduit avec IA de l\'anglais. Peut contenir des erreurs.',
    'ko': 'AI에 의해 번역 된 영어 텍스트. 오류가 포함 될 수 있습니다.',
    'ja-JP': 'AIによる英語のテキストの翻訳。エラーが含まれる可能性があります。'
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

const { locale } = useI18n();
let formatDate = (date) => {
    return new Date(date).toLocaleDateString(locale.value, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
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

watch(locale, (newLocale) => {
    formatDate = (date) => {
        return new Date(date).toLocaleDateString(newLocale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
});

const reconstructLink = (source, link) => {
    return baseUrl + '/api/files/' + source.collectionId + '/' + source.id + '/' + link;
};
const btnText = {
    'pt-BR': 'Leia mais',
    'en': 'Read more',
    'es': 'Leer más',
    'fr': 'Lire la suite',
    'ko': '더 읽기',
    'ja-JP': '続きを読む'
};
</script>

<style scoped lang="scss">
.blog-posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin: 0 auto 2rem;
    max-width: 1340px;
    padding: 0 2rem;

    .blog-post {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        border-radius: 8px;
        background: #1c1c1c !important;
        box-shadow: 1px 5px 4px 2px #00000063;
        transition: all 0.3s ease;
        position: relative;
        top: 0;
        filter: contrast(1) brightness(1);

        &:hover {
            background: #2c2c2c !important;
            top: -5px;
        }

        &:active {
            background: #3c3c3c !important;
            filter: contrast(1.5) brightness(1.5);
        }

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #782fee;
            margin-bottom: 0.5rem;
        }

        p {
            font-size: 1rem;
            font-weight: 400;
            color: #c1c1c1;
            margin-bottom: 0.5rem;
        }

        a {
            font-size: 1rem;
            font-weight: 700;
            color: #782fee;
            text-decoration: none;
            transition: all 0.3s ease;

            &:hover {
                text-decoration: underline;
            }
        }

        .post-card-header {
            background-size: cover;
            background-position: center;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: start;
            position: relative;

            .post-card-image {
                width: 100%;
                border-radius: 8px;
                aspect-ratio: 3/2;
                background-size: cover;
                background-position: center;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                h2 {
                    color: #ffffff;
                    margin: 0;
                    line-height: 1.2;
                    height: 6.65ch;
                    font-size: 1.4rem;
                    padding: 1rem;
                    // break overflow text with ellipsis (...) if exceeds 2 lines
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                    z-index: 2;
                }

                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 8px;
                    z-index: 1;
                    backdrop-filter: blur(5px);
                }
            }

            .post-card-details {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: start;
                gap: 0.2rem;
                z-index: 2;

                p {
                    color: #ffffff;
                    text-align: right;
                    width: 100%;
                    margin: 1rem 0 0;
                }
            }

            .post-card-surface {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: start;
                gap: 0.2rem;
                z-index: 2;
                display: none !important;

                a {
                    color: #ffffff;
                    font-size: 1rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
            }

            p {
                color: #ffffff;
            }

            a {
                color: #ffffff;
                font-size: 1rem;
                font-weight: 700;
                text-decoration: none;
                transition: all 0.3s ease;
            }
        }

        .post-card-details {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            gap: 0.2rem;
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
    text-align: center;
    margin: 2rem 0;

    h1 {
        color: #ffffff;
        font-size: 3rem;
        font-weight: 700;
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

html.light {
    .blog-post {
        background: #f4f4f4 !important;
        color: #131313;

        .post-card-header {
            background: #f4f4f4 !important;

            h2 {
                color: #782fee;
            }

            p {
                color: #131313;
            }

            a {
                color: #782fee;
            }
        }
    }

    .disclaimer {
        background: #782fee;
        color: #f4f4f4;
    }

    .blog-minibio {
        h1 {
            color: #131313;
        }

        p {
            color: #131313;
        }

        .minibio_side {
            p {
                color: #131313;
            }

            .icons {
                a {
                    color: #782fee;
                }
            }
        }
    }
}
</style>