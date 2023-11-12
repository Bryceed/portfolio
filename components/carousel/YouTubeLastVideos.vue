<script lang="ts">
import { build } from 'vite';
import 'xhr2';
interface Video {
    videoId: string;
    title: string;
    link: string | null;
    thumbnail: string | null;
}

interface VideosData {
    videos: Video[];
}

export default {
    data(): { loading: boolean; failed: boolean; videosData: VideosData } {
        return {
            loading: true,
            failed: false,
            videosData: {
                videos: [],
            },
        };
    },
    mounted() {
        try {
            const xhr = new XMLHttpRequest();
            
            xhr.open(
                'GET',
                'http://129.151.32.92:8081/https://www.youtube.com/feeds/videos.xml?channel_id=UCN_W-bGmVEZYSWJ0yphqm6Q'
            );
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');// xml
            xhr.setRequestHeader('Content-Type', 'application/xml');
            xhr.responseType = 'document';
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            const videos: Video[] = [];

            const self = this; // add this line

            xhr.onload = function () {
                const xml = xhr.responseXML as XMLDocument; // add type assertion
                const entries = xml.getElementsByTagName('entry');

                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    const videoId = entry.getElementsByTagName('yt:videoId')[0].innerHTML;
                    const title = entry.getElementsByTagName('title')[0].innerHTML;
                    const link = entry.getElementsByTagName('link')[0].getAttribute('href');
                    const thumbnail = entry
                        .getElementsByTagName('media:thumbnail')[0]
                        .getAttribute('url');

                    videos.push({
                        videoId,
                        title,
                        link,
                        thumbnail,
                    });
                }

                self.videosData.videos = videos;
                self.loading = false;
            }
            xhr.send();

            
        } catch (error) {
            console.error("Failed to fetch YouTube data: ", error);
            this.failed = true;
        }
    },

    methods: {
        buildCarousel() {
            this.loading = false;

            const carousel = document.getElementsByClassName('.carousel')[0] as HTMLElement;
            const inner = document.getElementsByClassName('.carousel__inner')[0] as HTMLElement;
            const items = Array.from(document.getElementsByClassName('carousel__item') as HTMLCollectionOf<HTMLElement>);
            console.log("ITEMS:", items);
            const nextBtn = document.getElementsByClassName('.carousel__next')[0] as HTMLElement;
            const prevBtn = document.getElementsByClassName('.carousel__prev')[0] as HTMLElement;

            let currentIndex = 0;
            let transform = 0;
            let step = 100 / items.length;
            let steps = items.length - 1;
            let maxTranslate = 0;
            let isMouseOver = false;

            function setMaxTranslate() {
                maxTranslate = (items.length - 1) * -step;
            };

            function setTransform() {
                transform = currentIndex * -step;
                inner.style.transform = `translateX(${transform}%)`;
                updateActive();
            };

            function updateActive() {
                items.forEach((item) => {
                    item.classList.remove('active');
                });
                items[currentIndex].classList.add('active');
            };

            function next() {
                currentIndex++;
                if (currentIndex > steps) {
                    currentIndex = 0;
                }
                setTransform();
            };

            function prev() {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = steps;
                }
                setTransform();
            };

            function handleMouseOver() {
                isMouseOver = true;
            };

            function handleMouseOut() {
                isMouseOver = false;
            };

            function autoplay() {
                if (!isMouseOver) {
                    next();
                }
            };

            function init() {
                setMaxTranslate();
                setTransform();
                setInterval(autoplay, 5000);
                carousel?.addEventListener('mouseover', handleMouseOver);
                carousel?.addEventListener('mouseout', handleMouseOut);
                nextBtn?.addEventListener('click', next);
                prevBtn?.addEventListener('click', prev);
            };

            init();
        },
    },
    watch: {
        videosData: {
            immediate: false,
            handler() {
                this.buildCarousel();
            },
        },
    },
};
</script>

<template>
    <div class="carousel">
        <div class="carousel__inner" v-if="!loading && !failed">
            <div class="carousel__item" v-for="(video, index) in videosData.videos" :key="index">
                <a :href="video.link || undefined">
                    <div class="carousel__item__inner">
                        <div class="carousel__item__inner__thumbnail">
                            <figure>
                                <img :src="video.thumbnail || undefined" alt="Thumbnail" />
                            </figure>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="carousel__loading" v-if="loading && !failed">
            <div class="carousel__loading__inner">
                <div class="carousel__loading__inner__spinner">
                    <div class="carousel__loading__inner__spinner__inner">Loading...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .carousel {
        position: relative;
        width: 100%;
        overflow: hidden;
        border-radius: 0.5em;
        margin-top: 2em;
    }
    .carousel__inner {
        transition: transform 0.5s ease-in-out;
        display: grid;
        background: black;
        overflow: auto;
        justify-items: center;
        grid-auto-flow: column;
        gap: 2em;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .carousel__item {
        min-width: 120px;
        width: 33vw;
        max-width: 380px;
    }
    .carousel__item.active {
        transform: scale(1.1);
    }
    .carousel__item img, .carousel__item a {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }

</style>