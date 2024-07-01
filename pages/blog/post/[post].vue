<template>
    <div class="loading" v-if="!post.title">
        Loading
    </div>
    <div class="blog-article" v-else>
        <h1>{{ post.title }}</h1>
        <p>{{ post.pubDate }}</p>
        <div v-html="post.content"></div>
        <div class="author">
            <img :src="feed.image" alt="Blog logo" />
            <p>By {{ post.author }}</p>
        </div>
        <div class="back">
            <NuxtLink to="/blog" class="btn btn-primary">Back to blog</NuxtLink>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const postId = ref(route.params.post);
        const post = ref({});
        const feed = ref({});

        onMounted(async () => {
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bryceed');
            const data = await response.json();
            const posts = data.items;
            feed.value = data.feed;

            console.table(posts);

            posts.forEach(article => {
                if (postId.value && postId.value == article.link.split('/').pop().split('?')[0].split('#')[0]) {
                    post.value = article;
                    //date and time in UTC format
                    const options = { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: false,
                        timeZoneName: 'short' 
                    };
                    post.value.pubDate = new Date(article.pubDate).toLocaleString('en-US', options);
                    return; // Stop the iteration when a valid article is found
                }
            });
        });

        return {
            post,
            feed
        };
    }
}
</script>
