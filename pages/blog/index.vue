// get data from https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bryceed

<script>

export default {
    name: "Blog",
    data() {
        return {
            posts: [],
            feed: {}
        }
    },
    async mounted() {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bryceed');
        const data = await response.json();
        this.posts = data.items;
        this.feed = data.feed;
    },
    watch: {
        posts() {
            (this.posts || []).forEach(post => {
                post.pubDate = new Date(post.pubDate).toLocaleDateString();
            });
            if (this.posts == []) {
                console.log('No posts found');
            }
        }
    }
}
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

<template>
    <div>
        <div class="blog-minibio">
            <span></span>
            <h1>Blog</h1>
            <div class="minibio_side">
                <img :src="feed.image" alt="Blog logo" />
                <p>medium.com/@bryceed</p>
                <p><b>{{ posts.length }} posts</b></p>
                <div class="icons">
                    <a :href="feed.link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-medium"></i>
                    </a>
                </div>
            </div>
        </div>

        <div v-if="posts.length == 0">
            <p>Trying to load posts...</p>
        </div>
        <div v-else class="blog-posts">
            <div v-for="post in posts" :key="post.title" class="blog-post" :class="{ 'loaded': post.pubDate }">
                <h2>{{ post.title }}</h2>
                <p>{{ post.pubDate }}</p>
                <p v-html="post.description"></p>
                <a :href="post.link">Read more</a>
            </div>
        </div>
    </div>
</template>