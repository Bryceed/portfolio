<template>
    <div>
        <CommonAlertsPride v-if="isPrideMonth" />
        <HomeAboutMe />
    </div>

    <div class="projects-carousel">
        <div class="carousel-header">
            <h2>Featured Projects</h2>
            <div class="carousel-controls">
                <button class="control-btn" @click="prevSlide" :disabled="currentIndex === 0">
                    <span class="arrow">&#8249;</span>
                </button>
                <button class="control-btn" @click="nextSlide" :disabled="currentIndex >= minishelf.length - slidesToShow">
                    <span class="arrow">&#8250;</span>
                </button>
            </div>
        </div>

        <div class="carousel-wrapper">
            <div class="carousel-container" ref="carousel">
                <div 
                    v-for="(project, index) in minishelf" 
                    :key="project.id"
                    class="carousel-item"
                    :style="{ transform: `translateX(${-100 * currentIndex / slidesToShow}%)` }"
                    :class="{ 'active': index >= currentIndex && index < currentIndex + slidesToShow }"
                >
                    <div class="project-card">
                        <div class="project-image">
                            <img :src="project.placeholder" :alt="project.title">
                            <div class="project-overlay">
                                <div class="project-actions">
                                    <a :href="'/project/' + project.id" class="action-btn">Details</a>
                                    <a :href="project.link" target="_blank" class="action-btn primary">Visit</a>
                                </div>
                            </div>
                        </div>
                        <div class="project-content">
                            <h3>{{ project.title }}</h3>
                            <p>{{ getDescription(project) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="carousel-dots">
            <button 
                v-for="n in Math.ceil(minishelf.length / slidesToShow)" 
                :key="n" 
                class="dot"
                :class="{ 'active': currentIndex >= (n-1) * slidesToShow && currentIndex < n * slidesToShow }"
                @click="goToSlide((n-1) * slidesToShow)"
            ></button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.projects-carousel {
    margin: 2rem 20px ;
    position: relative;

    .carousel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 10px;

        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #fff;
            margin: 0;
        }

        .carousel-controls {
            display: flex;
            gap: 10px;

            .control-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #2a2a2a;
                border: none;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.25s ease;

                &:hover {
                    background: #3a3a3a;
                    transform: scale(1.05);
                }

                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .arrow {
                    font-size: 1.5rem;
                    line-height: 1;
                }
            }
        }
    }

    .carousel-wrapper {
        position: relative;
        overflow: hidden;
        margin: 0 -10px;
    }

    .carousel-container {
        display: flex;
        padding: 10px;
    }

    .carousel-item {
        flex: 0 0 calc(100% / var(--slides-per-view));
        padding: 0 10px;
        transition: transform 0.5s ease;
    }

    .project-card {
        border-radius: 12px;
        background: #1d1d1d;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        height: 100%;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

            .project-overlay {
                opacity: 1;
            }
        }
    }

    .project-image {
        position: relative;
        height: 200px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .project-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .project-actions {
            display: flex;
            gap: 10px;

            .action-btn {
                padding: 8px 16px;
                border-radius: 4px;
                font-weight: 500;
                text-decoration: none;
                transition: all 0.3s ease;
                background: #333;
                color: #fff;

                &.primary {
                    background: #007bff;

                    &:hover {
                        background: #0069d9;
                    }
                }

                &:hover {
                    transform: scale(1.05);
                    background: #444;
                }
            }
        }
    }

    .project-content {
        padding: 20px;

        h3 {
            margin: 0 0 10px;
            font-size: 1.2rem;
            font-weight: 600;
            color: #fff;
        }

        p {
            margin: 0;
            color: #b0b0b0;
            font-size: 0.9rem;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    .carousel-dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 20px;

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #555;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;

            &.active {
                background: #007bff;
                transform: scale(1.2);
            }

            &:hover {
                background: #666;
            }
        }
    }
}

@media (max-width: 1200px) {
    .projects-carousel {
        --slides-per-view: 3;
    }
}

@media (max-width: 768px) {
    .projects-carousel {
        --slides-per-view: 2;
    }
}

@media (max-width: 480px) {
    .projects-carousel {
        --slides-per-view: 1;
    }
}
</style>

<script>
import { getPageTitle } from '../utils/pageTitle';
import projects from '../data/projects.json';

export default {
    name: 'Home',

    data() {
        const date = new Date();
        const isPrideMonth = date.getMonth() === 5;

        return {
            isPrideMonth,
            minishelf: [],
            currentIndex: 0,
            slidesToShow: 4, // Default for desktop
        };
    },

    mounted() {
        document.title = getPageTitle({ mainPage: 'Home' });

        // Load projects
        this.$nextTick(() => {
            try {
                this.minishelf = projects.projects || [];
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        });

        // Set responsive slidesToShow based on screen size
        this.updateSlidesPerView();
        window.addEventListener('resize', this.updateSlidesPerView);
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.updateSlidesPerView);
    },

    methods: {
        getDescription(project) {
            return project.description[this.$i18n.locale] || project.description['en'];
        },

        nextSlide() {
            if (this.currentIndex < this.minishelf.length - this.slidesToShow) {
                this.currentIndex++;
            }
        },

        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },

        goToSlide(index) {
            this.currentIndex = index;
        },

        updateSlidesPerView() {
            if (window.innerWidth <= 480) {
                this.slidesToShow = 1;
            } else if (window.innerWidth <= 768) {
                this.slidesToShow = 2;
            } else if (window.innerWidth <= 1200) {
                this.slidesToShow = 3;
            } else {
                this.slidesToShow = 4;
            }
            
            // Update CSS variable for responsive design
            document.documentElement.style.setProperty('--slides-per-view', this.slidesToShow);
        }
    }
};
</script>

