<script lang="ts">
import { ref } from 'vue';
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
    data(): { 
        loading: boolean; 
        failed: boolean; 
        isModalOpen: boolean;
        videosData: VideosData 
    } {
        return {
            loading: true,
            failed: false,
            isModalOpen: false,
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
                'https://129.151.32.92:8081/https://www.youtube.com/feeds/videos.xml?channel_id=UCN_W-bGmVEZYSWJ0yphqm6Q'
            );
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');// xml
            xhr.setRequestHeader('Content-Type', 'application/xml');
            xhr.responseType = 'document';
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('X-Ignore-Certificate-Errors', '1');

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

            function dragScroll() {
                let isDown = false;
                let startX = 0;
                let scrollLeft = 0;

                inner.addEventListener('mousedown', (e) => {
                    isDown = true;
                    inner.classList.add('active');
                    startX = e.pageX - inner.offsetLeft;
                    scrollLeft = inner.scrollLeft;
                });

                inner.addEventListener('mouseleave', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });

                inner.addEventListener('mouseup', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });

                inner.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - inner.offsetLeft;
                    const walk = (x - startX) * 3;
                    inner.scrollLeft = scrollLeft - walk;
                });

                inner.addEventListener('touchstart', (e) => {
                    isDown = true;
                    inner.classList.add('active');
                    startX = e.touches[0].pageX - inner.offsetLeft;
                    scrollLeft = inner.scrollLeft;
                });

                inner.addEventListener('touchend', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });

                inner.addEventListener('touchmove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.touches[0].pageX - inner.offsetLeft;
                    const walk = (x - startX) * 3;
                    inner.scrollLeft = scrollLeft - walk;
                });

                inner.addEventListener('touchcancel', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });

                inner.addEventListener('touchleave', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });

                inner.addEventListener('touchenter', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });

                inner.addEventListener('touchmove', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });

                inner.addEventListener('touchend', () => {
                    isDown = false;
                    inner.classList.remove('active');
                });
            };

            function init() {
                setMaxTranslate();
                setTransform();
                setInterval(autoplay, 5000);
                carousel?.addEventListener('mouseover', handleMouseOver);
                carousel?.addEventListener('mouseout', handleMouseOut);
                nextBtn?.addEventListener('click', next);
                prevBtn?.addEventListener('click', prev);
                dragScroll();
            };

            init();
        },

        embedOnModal(type: string, url) {
            const modal = document.getElementById('youtube-modal') as HTMLElement;
            const embed = document.getElementById('youtube-embed') as HTMLIFrameElement;
            const embedUrl = new URL(url);
            const videoId = embedUrl.searchParams.get('v');
            const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&autohide=1&mute=0`;

            embed ? embed.src = embedSrc : console.error('Unknown modal');

            modal.style.display = 'block';
            this.isModalOpen = true;
        },
        modal(action: string) {
            const modal = document.getElementById('youtube-modal') as HTMLElement;
            const embed = document.getElementById('youtube-embed') as HTMLIFrameElement;

            if (action === 'open') {
                this.isModalOpen = true;
            } else {
                this.isModalOpen = false;
                embed.src = '';
            }
        }
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
        <img class="youtube" src="https://upload.wikimedia.org/wikipedia/commons/1/1f/YouTube_light_logo_(2017).svg" alt="YouTube Logo" />
        <div class="carousel__inner" v-if="!loading && !failed">
            <div class="carousel__item" v-for="(video, index) in videosData.videos" :key="index">
                <a :href="video.link || undefined" target="_blank" @click.prevent="embedOnModal('youtube', video.link)">
                    <div class="carousel__item__inner">
                        <div class="carousel__item__inner__thumbnail">
                            <div class="_overflow"></div>
                            <img :src="video.thumbnail || undefined" alt="Thumbnail" />
                        </div>
                        <div class="carousel__item__inner__text">
                            <span class="_title">{{ video.title }}</span>
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

    <div id="youtube-modal" class="modal" :style="{'display': isModalOpen ? 'block' : 'none'}">
        <div class="modal__inner">
            <div class="modal__inner__close" @click="modal('close')">
                <i class="material-icons">close</i>
            </div>
            <div class="modal__inner__content">
                <iframe
                    id="youtube-embed"
                    width="560"
                    height="315"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .carousel {
        position: relative;
        width: 100%;
        overflow: auto !important;
        border-radius: 0 0 0.5em 0.5em;
        margin-top: 2em;
        background: #282626;
    }
    .carousel:after, .carousel:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        /* height: 200px; */
        width: 30px;
        background: linear-gradient(90deg,#282626, #282626aa, #28262611);
    }
    .carousel:before {left: 0;}
    .carousel:after {right: 0; rotate: 180deg;}
    .carousel .youtube {
        max-width: 200px;
        margin: 2em auto 0;
    }
    .carousel__inner {
        transition: transform 0.5s ease-in-out;
        display: grid;
        overflow: auto;
        justify-items: center;
        grid-auto-flow: column;
        gap: 2em;
        padding: 0 2em;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-bottom: 1em;
        padding-bottom: 1em;
    }
    .carousel__item {
        min-width: 120px;
        width: 33vw;
        max-width: 380px;
    }
    .carousel__item.active {
        transform: scale(1.1);
    }
    .carousel__item__inner {
        position: relative;
    }
    .carousel__item__inner__thumbnail {position: relative;}
    .carousel__item__inner__text {
        position: absolute;
        top: 90%;
        z-index: 3;
    }
    .carousel__item__inner__text ._title {
        font-size: clamp(5px, 1.4vw, 16px);
    }
    .carousel__item ._overflow {
        position: absolute;
        top: 0;
        right: -1px;
        left: -1px;
        height: 100%;
        background: linear-gradient(180deg, #282626 12.5%, transparent 12.5%, transparent 87.5%, #282626 87.5%);
        z-index: 3;
    }
    .carousel__item img, .carousel__item a {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }

    .modal {
        display: block;
        position: fixed;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.7);
        padding: 94px 20px 20px 20px;
        backdrop-filter: blur(3px);
        z-index: 9;
    }
    .modal .modal__inner {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .modal .modal__inner .modal__inner__close {
        position: absolute;
        right: 0;
        zoom: 2;
        text-shadow: 1px 1px rgba(0,0,0,.2);
        z-index: 9;
    }
    .modal .modal__inner .modal__inner__close i {
        cursor: pointer;
    }
    .modal .modal__inner .modal__inner__content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    
    .modal .modal__inner .modal__inner__content #youtube-embed {
        width: 100%;
        height: 100%;
    }

    html.light .modal {
        background: rgb(221 221 221 / 70%);
    }
    html.light .modal .modal__inner .modal__inner__close i {
        color: #000;
        text-shadow: 1px 1px rgba(255,255,255,.2);
    } 
    html.light .youtube {
        filter: brightness(0.22);
    }

    html.light .carousel {
        background: white;
    }
    html.light .carousel__item ._overflow {
        background: linear-gradient(180deg, #FFF 12.5%, transparent 12.5%, transparent 87.5%, #FFF 87.5%);
    }


    /* Firefox */
    * {
    scrollbar-width: thin;
    scrollbar-color: #07e84a #202122;
    }
    html.light * {
        scrollbar-color: #AD09FF #DFE9EB;
    }

    /* Chrome, Edge and Safari */
    *::-webkit-scrollbar {
    height: 11px;
    width: 11px;
    }
    *::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #282626;
    border: 2px solid #282626;
    margin: 0 30px;
    }

    *::-webkit-scrollbar-track:hover {
    background-color: #222222;
    }

    *::-webkit-scrollbar-track:active {
    background-color: #111111;
    }

    *::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #7707E8;
    border: 2px solid #282626;
    margin: 0 20px;
    }

    *::-webkit-scrollbar-thumb:hover {
    background-color: #AD09FF;
    }

    *::-webkit-scrollbar-thumb:active {
    background-color: #CD03FF;
    }

    html.light *::-webkit-scrollbar-track {
        background-color: #DFE9EB;
        border: 2px solid #F2FCFF;
    }
    html.light *::-webkit-scrollbar-track:hover {
        background-color: #B8C0C2;
    }
    html.light *::-webkit-scrollbar-track:active {
        background-color: #B8C0C2;
    }
    html.light *::-webkit-scrollbar-thumb {
        background-color: #AD09FF;
        border: 2px solid #FFFFFF;
    }
    html.light *::-webkit-scrollbar-thumb:hover {
        background-color: #AD09FF;
    }
    html.light *::-webkit-scrollbar-thumb:active {
        background-color: #CD03FF;
    }

</style>