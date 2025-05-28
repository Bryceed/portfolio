<template>
    <div>
        <CommonAlertsPride v-if="isPrideMonth" />
        <HomeAboutMe />
    </div>

    <div class="projects-carousel">
        <div class="carousel-header">
            <h2>{{ $t('html.home.featuredProjects') || 'Featured Projects' }}</h2>
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
                                    <a :href="'/project/' + project.id" class="action-btn">{{ $t('html.home.details') || 'Details' }}</a>
                                    <a v-if="project.link" :href="project.link" target="_blank" class="action-btn primary">{{ $t('html.home.visit') || 'Visit' }}</a>
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
    
    <!-- Seção de Habilidades -->
    <div class="section skills-section">
        <HomeSkills />
    </div>
    
    <!-- Seção de Timeline de Experiência -->
    <div class="section timeline-section">
        <div class="section-header">
            <h2>{{ $t('html.home.experience') || 'Professional Experience' }}</h2>
            <NuxtLink to="/about" class="view-more-btn">
                <span>{{ $t('html.home.viewMore') || 'View More' }}</span>
                <i class="material-icons">arrow_forward</i>
            </NuxtLink>
        </div>
        
        <div class="timeline-preview">
            <div v-for="event in recentExperience" :key="event.id" class="timeline-card" 
                 :style="{'--card-color': event.color || '#6a4caf'}">
                <div class="timeline-card-header">
                    <div class="company-info">
                        <div class="company-logo">
                            <img v-if="event.companyLogo" :src="event.companyLogo" :alt="event.company" 
                                 @error="$event.target.src = event.companyLogoFallback || ''">
                        </div>
                        <div class="company-details">
                            <h3>{{ event.company }}</h3>
                            <h4>{{ event.jobRole }}</h4>
                        </div>
                    </div>
                    <div class="date-badge">{{ event.date }}</div>
                </div>
                <p>{{ event.jobDescription }}</p>
                <div class="tech-tags">
                    <span v-for="(tag, index) in event.jobtags.slice(0, 5)" :key="index" class="tech-tag">
                        {{ tag }}
                    </span>
                    <span v-if="event.jobtags.length > 5" class="more-tags">
                        +{{ event.jobtags.length - 5 }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Certificações -->
    <div class="section certifications-section">
        <HomeCertifications />
    </div>
    
    <!-- Call to Action -->
    <div class="section cta-section">
        <div class="cta-container">
            <h2>{{ $t('html.home.ctaTitle') || 'Let\'s Work Together' }}</h2>
            <p>{{ $t('html.home.ctaText') || 'Have a project in mind? Looking for a developer to join your team? Let\'s talk!' }}</p>
            <div class="cta-buttons">
                <NuxtLink to="/contact" class="btn btn--primary">
                    <i class="material-icons">email</i>
                    <span>{{ $t('html.home.contactMe') || 'Contact Me' }}</span>
                </NuxtLink>
                <NuxtLink to="/projects" class="btn btn--secondary">
                    <i class="material-icons">work</i>
                    <span>{{ $t('html.home.viewProjects') || 'View Projects' }}</span>
                </NuxtLink>
            </div>
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

// Estilos para as novas seções
.section {
    padding: 3rem 20px;
    margin: 0 auto;
    max-width: 1340px;
    
    &:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
    }
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h2 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
    }
    
    .view-more-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--dark-primary-color, #9871F6);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateX(5px);
        }
        
        i {
            font-size: 1.2rem;
        }
    }
}

// Estilos para a seção de Timeline
.timeline-section {
    position: relative;
}

.timeline-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    
    .timeline-card {
        background-color: rgba(34, 34, 34, 0.4);
        border-radius: 12px;
        padding: 1.5rem;
        flex: 1 1 300px;
        max-width: calc(50% - 1.5rem);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border-top: 3px solid var(--card-color);
        backdrop-filter: blur(10px);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .timeline-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            
            .company-info {
                display: flex;
                gap: 1rem;
                align-items: center;
                
                .company-logo {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                
                .company-details {
                    h3 {
                        font-size: 1.2rem;
                        margin: 0 0 0.3rem;
                        font-weight: 700;
                    }
                    
                    h4 {
                        font-size: 1rem;
                        margin: 0;
                        color: var(--card-color);
                        font-weight: 600;
                    }
                }
            }
            
            .date-badge {
                font-size: 0.9rem;
                background-color: rgba(255, 255, 255, 0.1);
                padding: 0.4rem 0.8rem;
                border-radius: 20px;
                white-space: nowrap;
                color: var(--card-color);
                font-weight: 600;
            }
        }
        
        p {
            margin-bottom: 1rem;
            font-size: 0.95rem;
            line-height: 1.5;
            color: #b0b0b0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            height: 4.5rem;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            
            .tech-tag {
                background-color: rgba(255, 255, 255, 0.1);
                padding: 0.3rem 0.6rem;
                border-radius: 20px;
                font-size: 0.8rem;
                color: #e0e0e0;
            }
            
            .more-tags {
                background-color: var(--card-color);
                color: #fff;
                padding: 0.3rem 0.6rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
    }
}

// CTA Section
.cta-section {
    padding: 5rem 20px;
    background: linear-gradient(135deg, var(--dark-primary-color, #9871F6) 0%, var(--dark-secondary-color, #7F58E2) 100%);
    text-align: center;
    border-radius: 12px;
    margin: 3rem auto;
    max-width: 1300px;
    
    .cta-container {
        max-width: 800px;
        margin: 0 auto;
    }
    
    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #fff;
    }
    
    p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color: rgba(255, 255, 255, 0.9);
    }
    
    .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        
        .btn {
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            transition: all 0.3s ease;
            
            i {
                font-size: 1.2rem;
            }
            
            &--primary {
                background-color: #fff;
                color: var(--dark-primary-color, #9871F6);
                
                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
                }
            }
            
            &--secondary {
                background-color: rgba(255, 255, 255, 0.2);
                color: #fff;
                
                &:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-5px);
                }
            }
        }
    }
}

// Tema claro
html.light {
    .projects-carousel {
        h2 {
            color: #333;
        }
        
        .project-card {
            background: #f5f5f5;
            
            .project-content {
                h3 {
                    color: #333;
                }
                
                p {
                    color: #555;
                }
            }
        }
        
        .control-btn {
            background: #e0e0e0;
            color: #333;
            
            &:hover {
                background: #d0d0d0;
            }
        }
    }
    
    .timeline-preview .timeline-card {
        background-color: rgba(255, 255, 255, 0.7);
        
        p {
            color: #555;
        }
        
        .tech-tag {
            background-color: rgba(0, 0, 0, 0.05);
            color: #333;
        }
    }
    
    .section:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.03);
    }
}

@media (max-width: 1200px) {
    .projects-carousel {
        --slides-per-view: 3;
    }
    
    .timeline-preview .timeline-card {
        max-width: 100%;
    }
}

@media (max-width: 768px) {
    .projects-carousel {
        --slides-per-view: 2;
    }
    
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .cta-section {
        padding: 3rem 20px;
        
        h2 {
            font-size: 2rem;
        }
        
        .cta-buttons {
            flex-direction: column;
        }
    }
}

@media (max-width: 480px) {
    .projects-carousel {
        --slides-per-view: 1;
    }
    
    .timeline-preview {
        flex-direction: column;
        
        .timeline-card {
            max-width: 100%;
        }
    }
}
</style>

<script>
import { getPageTitle } from '../utils/pageTitle';
import projects from '../data/projects.json';
import timeline from '../data/timeline.json';
import certifications from '../data/certifications.json';

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
            recentExperience: [],
            certifications: []
        };
    },

    mounted() {
        document.title = getPageTitle({ mainPage: 'Home' });

        // Load projects
        this.$nextTick(() => {
            try {
                this.minishelf = projects.projects || [];
                
                // Carregar experiências recentes (últimas 4)
                if (timeline && timeline.events) {
                    this.recentExperience = timeline.events
                        .filter(event => event.jobRole) // Filtra apenas experiências profissionais
                        .sort((a, b) => {
                            // Ordena pela data de início mais recente
                            const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
                            const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
                            return dateB - dateA;
                        })
                        .slice(0, 4); // Pega apenas as 4 mais recentes
                }
                
                // Carregar certificações
                if (certifications && certifications.items) {
                    this.certifications = certifications.items;
                }
            } catch (error) {
                console.error('Error loading data:', error);
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

