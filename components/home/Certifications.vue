<template>
    <div class="certifications">
        <div class="section-header">
            <h2>{{ $t('html.home.certifications') || 'Certificações' }}</h2>
            <NuxtLink to="/certifications" class="view-more-btn">
                <span>{{ $t('html.home.viewMore') || 'Ver Mais' }}</span>
                <i class="material-icons">arrow_forward</i>
            </NuxtLink>
        </div>

        <div class="certifications-grid">
            <div v-for="certification in certifications.slice(0, 4)" :key="certification.id" class="certification-card" data-tilt data-tilt-max="10">
                <div class="certificate-image">
                    <img :src="certification.image || '/images/certs/certificate-placeholder.jpg'" :alt="certification.title" />
                    <div class="certificate-overlay">
                        <div class="certificate-actions">
                            <a :href="certification.link" target="_blank" class="action-btn primary">
                                <i class="material-icons">visibility</i>
                                <span>{{ $t('html.home.view') || 'Ver' }}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="certificate-content">
                    <div class="certificate-issuer">
                        <span>{{ certification.emissor || 'Emissor' }}</span>
                    </div>
                    <h3 class="certificate-name">{{ certification.title }}</h3>
                    <p class="certificate-desc">{{ certification.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
                max: 8,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
            });
        }
    }
}
</script>

<style scoped lang="scss">
.certifications {
    width: 100%;
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
        color: #fff;
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

.certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    
    .certification-card {
        background-color: rgba(34, 34, 34, 0.4);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        transform-style: preserve-3d;
        
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            
            .certificate-overlay {
                opacity: 1;
            }
        }
        
        .certificate-image {
            position: relative;
            height: 180px;
            overflow: hidden;
            
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .certificate-overlay {
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
                
                .certificate-actions {
                    .action-btn {
                        padding: 8px 16px;
                        border-radius: 4px;
                        font-weight: 500;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        transition: all 0.3s ease;
                        background: var(--dark-primary-color, #9871F6);
                        color: #fff;
                        
                        &:hover {
                            transform: scale(1.05);
                            background: var(--dark-secondary-color, #7F58E2);
                        }
                        
                        i {
                            font-size: 1.2rem;
                        }
                    }
                }
            }
        }
        
        .certificate-content {
            padding: 1.5rem;
            
            .certificate-issuer {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.75rem;
                
                span {
                    font-size: 0.9rem;
                    color: #b0b0b0;
                }
            }
            
            .certificate-name {
                margin: 0 0 0.75rem;
                font-size: 1.2rem;
                font-weight: 600;
                color: #fff;
                line-height: 1.4;
            }
              .certificate-desc {
                font-size: 0.9rem;
                color: #b0b0b0;
                margin: 0;
                line-height: 1.5;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}

// Tema claro
html.light {
    .section-header h2 {
        color: #333;
    }
    
    .certifications-grid .certification-card {
        background-color: rgba(255, 255, 255, 0.7);
        
        .certificate-content {
            .certificate-name {
                color: #333;
            }
            
            .certificate-desc, .certificate-issuer span {
                color: #555;
            }
        }
    }
}

@media (max-width: 768px) {
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .certifications-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 480px) {
    .certifications-grid {
        grid-template-columns: 1fr;
    }
}

html.light .certifications h2 {
    color: #000;
}

.certifications__container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.certification-item {
    background: #1b1b1b;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 300px;
    aspect-ratio: 16/9;
    text-align: center;
}

html.light .certification-item {
    background: #ece6ef;
    color: #000;
}

.certification-item h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.certification-item p {
    font-size: 1rem;
    margin-bottom: 10px;
}

.certification-item a {
    color: #1e90ff;
    text-decoration: none;
    font-weight: bold;
}

.certification-item a:hover {
    text-decoration: underline;
}
</style>