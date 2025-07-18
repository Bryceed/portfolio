<template>
    <CommonAlertsPride v-if="isPrideMonth" />
    <HomeAboutMe />
    <ProjectsHighlightsDisplay />
    <div class="flex flex-row justify-between gap-4 h-80vh 
        items-start flex-wrap mx-auto">
        <HomeAboutTrajectory class="max-w-400px x2-sp h-full" />
        <HomeSkills class="flex-1 max-w-400px pr-8" />
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

<script setup>
const date = new Date();
const isPrideMonth = date.getMonth() === 5;

definePageMeta({
  layout: 'default',
  backgroundType: 'gradient',
  backgroundGradient: 'linear-gradient(135deg, #f7b42c 0%, #fc575e 100%)',
  backgroundColor: '', // pode ser usado se quiser cor sólida
  backgroundSrc: '',   // pode ser usado se quiser imagem
  backgroundTransitionDuration: 1200
});
</script>

<style lang="scss">
// CTA Section
.cta-section {
    padding: 5rem 20px;
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
        color: var(--dark-text-color, #9871F6);
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
    .cta-section {
        color: #333;
        
        h2 {
            color: #9871F6;
        }
        
        p {
            color: rgba(0, 0, 0, 0.8);
        }
        
        .cta-buttons {
            .btn--primary {
                background-color: #9871F6;
                color: #fff;
                
                &:hover {
                    background-color: #8459d3;
                }
            }
            
            .btn--secondary {
                background-color: rgba(255, 255, 255, 0.3);
                color: #fff;
                
                &:hover {
                    background-color: rgba(255, 255, 255, 0.4);
                }
            }
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

