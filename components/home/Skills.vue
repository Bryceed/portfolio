<template>
    <div class="skills">
        <h2>Habilidades</h2>
        <div class="skills__container" :class="{ active: selectedItem }">
            <div v-for="category in skills" :key="category.name" class="skills__container__carousel__category">
                <h2>{{ category.emoji }} {{ category.name }} <span>({{ category.items.length }})</span></h2>
                <button v-if="category.showLeftArrow" class="nav-button left"
                    @click="scrollLeft(category)">&#9664;</button>
                <div :ref="'carousel-' + category.name" class="skills__container__carousel"
                    @scroll="handleScroll(category)" @mousedown="startDrag($event, category)">
                    <div class="skills__container__carousel__items">
                        <div v-for="item in category.items" :key="item.name" class="_item" @click="showDetails(item)">
                            <div class="_item__name">{{ item.name }}</div>
                            <CommonMeter :value="item.value" />
                        </div>
                    </div>
                </div>
                <button v-if="category.showRightArrow" class="nav-button right"
                    @click="scrollRight(category)">&#9654;</button>
            </div>
        </div>
        <div class="side-panel" :class="{ open: selectedItem }">
            <button class="close-button" @click="closeDetails">X</button>
            <div v-if="selectedItem">
                <h2>{{ selectedItem.name }}</h2>
                <CommonMeter :value="selectedItem.value" />
            </div>
        </div>
    </div>
</template>

<script>
import skills from '@/data/skills.json';

export default {
    name: 'Skills',
    data() {
        return {
            skills: skills.map(category => ({
                ...category,
                showLeftArrow: false,
                showRightArrow: true,
                isDragging: false,
                startX: 0,
                scrollLeft: 0
            })),
            selectedItem: null
        };
    },
    methods: {
        scrollLeft(category) {
            const carousel = this.$refs['carousel-' + category.name][0];
            if (carousel) {
                carousel.scrollBy({ left: -carousel.clientWidth * 0.75, behavior: 'smooth' });
            }
        },
        scrollRight(category) {
            const carousel = this.$refs['carousel-' + category.name][0];
            if (carousel) {
                carousel.scrollBy({ left: carousel.clientWidth * 0.75, behavior: 'smooth' });
            }
        },
        showDetails(item) {
            this.selectedItem = item;
        },
        closeDetails() {
            this.selectedItem = null;
        },
        handleScroll(category) {
            const carousel = this.$refs['carousel-' + category.name][0];
            if (carousel) {
                category.showLeftArrow = carousel.scrollLeft > 0;
                category.showRightArrow = carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth;
            }
        },
        startDrag(event, category) {
            const carousel = this.$refs['carousel-' + category.name][0];
            if (carousel) {
                category.isDragging = true;
                category.startX = event.pageX - carousel.offsetLeft;
                category.scrollLeft = carousel.scrollLeft;
                carousel.classList.add('dragging');
                document.addEventListener('mousemove', this.onDrag.bind(this, category));
                document.addEventListener('mouseup', this.stopDrag.bind(this, category));
            }
        },
        onDrag(category, event) {
            if (!category.isDragging) return;
            const carousel = this.$refs['carousel-' + category.name][0];
            const x = event.pageX - carousel.offsetLeft;
            const walk = (x - category.startX) * 2; // scroll-fast
            carousel.scrollLeft = category.scrollLeft - walk;
        },
        stopDrag(category) {
            category.isDragging = false;
            const carousel = this.$refs['carousel-' + category.name][0];
            carousel.classList.remove('dragging');
            document.removeEventListener('mousemove', this.onDrag);
            document.removeEventListener('mouseup', this.stopDrag);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.skills.forEach(category => this.handleScroll(category));
        });
    }
}
</script>

<style scoped>
.skills {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 48px 0;
}

.skills h2 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}

html.light h2 {
    color: #000;
}

.skills__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    transition: margin-right 0.3s;
    gap: 2.5rem;
}

.skills__container.active {
    margin-right: 300px;
}

.skills__container__carousel {
    width: 100%;
    display: flex;
    overflow-x: hidden;
    align-items: flex-start;
    flex-direction: row;
    scroll-behavior: smooth;
    cursor: grab;
    user-select: none;
}

.skills__container__carousel.dragging {
    cursor: grabbing;
}

.skills__container__carousel__category {
    min-width: 200px;
    margin: 0 10px;
    position: relative;
}

.skills__container__carousel__items {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.skills__container__carousel__category h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff9b;
    margin-bottom: 5px;
    margin-left: 20px;
}

.skills__container__carousel__category h2 span {
    font-size: 1rem;
    font-weight: 400;
    color: #ffffff2e;
}

html.light .skills__container__carousel__category h2 {
    color: #000;
}

.skills__container__carousel__items ._item:first-of-type {
    margin-left: 68px;
}

._item {
    height: 100%;
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin: 10px 0;
    padding: 0px 7px 5px;
    background-color: rgba(255, 255, 255, .03);
    border-radius: 5px;
    cursor: pointer;
}

._item__name {
    font-size: 1.2rem;
    font-weight: 700;
    margin: .2rem 0 .3rem;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

html.light ._item {
    background-color: rgba(255, 255, 255, 0.492);
}

html.light ._item__name {
    color: #777;
}

.nav-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

.nav-button.left {
    left: 0;
}

.nav-button.right {
    right: 0;
}

.side-panel {
    position: fixed;
    right: -300px;
    top: 100px;
    bottom: 10px;
    max-width: 280px;
    width: 100%;
    overflow: visible;
    background-color: rgba(0, 0, 0, 0.8);
    transition: right 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 999;
    backdrop-filter: blur(7px);
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.2);
}

.side-panel.open {
    right: 20px;
    transform-origin: 110% 50%;
    animation: openSidePanel .4s;
}

@keyframes openSidePanel {
    0% {
        right: -30px;
        opacity: 1;
        transform: perspective(800px) rotateY(90deg);
    }

    100% {
        right: 20px;
        opacity: 1;
        transform: perspective(800px) rotateY(0deg);
    }
}

/* when close, animate the side panel to the right */
.side-panel:not(.open) {
    animation: closeSidePanel 0.3s;
}

@keyframes closeSidePanel {
    0% {
        opacity: 1;
        transform: perspective(800px) rotateY(0deg);
    }

    100% {
        opacity: 0;
        transform: perspective(800px) rotateY(-60deg);
    }
}

/* add darker background to overlay the rest of the page when side panel is open */
.side-panel::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(72, 72, 72, 0.63), rgba(27, 27, 27, 0.63));
    z-index: -1;
    border-radius: 6px;
}

html.light .side-panel {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px rgba(73, 73, 73, 0.2), 0 0 40px rgba(0, 0, 0, 0.234), inset 0 0 0 2px #ffffff;
}

html.light .side-panel::before {
    background: linear-gradient(rgba(255, 255, 255, 0.725), rgb(221, 221, 221));
}

.close-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    align-self: flex-end;
}
</style>