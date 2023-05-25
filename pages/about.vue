<template>
    <div>
        <vue-slick-carousel v-bind="carouselOptions">
            <img v-for="item in items" :key="item.id" :src="item.src" />
        </vue-slick-carousel>
    </div>
</template>
  
<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import VueSlickCarousel from 'vue-slick-carousel'



export default {
    components: {
        VueSlickCarousel,
    },
    data() {
        return {
            items: [
                { id: 1, src: 'https://via.placeholder.com/350x150' },
                { id: 2, src: 'https://via.placeholder.com/350x150' },
                { id: 3, src: 'https://via.placeholder.com/350x150' },
            ],
            carouselOptions: {
                dots: true,
                infinite: false,
                lazyLoad: 'ondemand',
                autoplay: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '60px',
                focusOnSelect: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1,
                        },
                    },
                ],
            },
        };
    },
};
</script>