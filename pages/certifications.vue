<template>
    <div class="certifications-page">
        <div class="certifications-header">
            <h1>{{ $t('html.certifications.title') || 'Certificações' }}</h1>
            <p>{{ $t('html.certifications.description') || 'Minhas certificações e conquistas profissionais' }}</p>
        </div>
        <div class="certifications-content">
            <div class="certifications-filter">
                <div class="search-box">
                    <i class="material-icons">search</i>
                    <input 
                        type="text" 
                        v-model="searchQuery" 
                        :placeholder="$t('html.certifications.searchPlaceholder') || 'Buscar certificações...'" 
                    />
                </div>
                <div class="filter-tags">
                    <button 
                        v-for="tag in sortedTags" 
                        :key="tag" 
                        class="filter-tag" 
                        :class="{ active: selectedTags.includes(tag) }"
                        @click="toggleTag(tag)"
                    >
                        {{ tag }}
                    </button>
                </div>
            </div>
            
            <div class="certifications-grid" v-if="filteredCertifications.length">
                <div v-for="cert in filteredCertifications" :key="cert.id" class="certification-card" data-tilt data-tilt-max="10">
                    <div class="certificate-image">
                        <img :src="cert.image || '/images/certs/certificate-placeholder.jpg'" :alt="cert.title" @error="handleImageError($event)" />
                        <div class="certificate-overlay">
                            <div class="certificate-actions">
                                <a v-if="cert.link" :href="cert.link" target="_blank" class="action-btn primary">
                                    <i class="material-icons">visibility</i>
                                    <span>{{ $t('html.certifications.view') || 'Ver Certificado' }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="certificate-content">
                        <div class="certificate-issuer">
                            <img v-if="cert.issuerLogo" :src="cert.issuerLogo" :alt="cert.emissor" class="issuer-logo" @error="handleIssuerLogoError($event)" />
                            <span>{{ cert.emissor }}</span>
                        </div>
                        <h3 class="certificate-name">{{ cert.title }}</h3>
                        <p class="certificate-desc">{{ cert.description }}</p>
                        <div class="certificate-meta">
                            <span class="certificate-date">{{ formatDate(cert.date) }}</span>
                            <span v-if="cert.expirationDate" class="certificate-expiry" :class="{ expired: isExpired(cert.expirationDate) }">
                                {{ isExpired(cert.expirationDate) ? $t('html.certifications.expired') || 'Expirado' : $t('html.certifications.validUntil') || 'Válido até' }} {{ formatDate(cert.expirationDate) }}
                            </span>
                        </div>
                        <div class="certificate-tags">
                            <span v-for="(tag, index) in cert.tags" :key="index" class="certificate-tag">{{ tag }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="no-results" v-else>
                <i class="material-icons">search_off</i>
                <p>{{ $t('html.certifications.noResults') || 'Nenhuma certificação encontrada com os filtros atuais.' }}</p>
                <button class="clear-filters" @click="clearFilters">
                    {{ $t('html.certifications.clearFilters') || 'Limpar Filtros' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { getPageTitle } from '../utils/pageTitle';
import certifications from '../data/certifications.json';

export default {
    name: 'CertificationsPage',
    
    data() {
        return {
            certifications: certifications.items || [],
            searchQuery: '',
            selectedTags: []
        };
    },
    
    computed: {
        allTags() {
            const tags = new Set();
            this.certifications.forEach(cert => {
                if (cert.tags && Array.isArray(cert.tags)) {
                    cert.tags.forEach(tag => tags.add(tag));
                }
            });
            return Array.from(tags);
        },
        
        sortedTags() {
            return this.allTags.sort();
        },
        
        filteredCertifications() {
            return this.certifications.filter(cert => {
                // Filtrar por texto na busca
                const searchLower = this.searchQuery.toLowerCase();
                const matchesSearch = this.searchQuery === '' || 
                    cert.title.toLowerCase().includes(searchLower) ||
                    (cert.emissor && cert.emissor.toLowerCase().includes(searchLower)) ||
                    (cert.description && cert.description.toLowerCase().includes(searchLower));
                
                // Filtrar por tags selecionadas
                const matchesTags = this.selectedTags.length === 0 || 
                    this.selectedTags.some(tag => cert.tags && cert.tags.includes(tag));
                
                return matchesSearch && matchesTags;
            });
        }
    },
    
    mounted() {
        document.title = getPageTitle({ mainPage: 'Certificações' });
        
        // Inicializar vanilla-tilt para os cartões
        this.$nextTick(() => {
            if (window.VanillaTilt && document.querySelectorAll('[data-tilt]').length) {
                window.VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
                    max: 8,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.2,
                });
            }
        });
    },
    
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString(this.$i18n.locale || 'pt-BR', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                });
            } catch (e) {
                return dateString;
            }
        },
        
        isExpired(dateString) {
            if (!dateString) return false;
            
            try {
                const expiryDate = new Date(dateString);
                const now = new Date();
                return expiryDate < now;
            } catch (e) {
                return false;
            }
        },
        
        handleImageError(event) {
            event.target.src = '/images/certs/certificate-placeholder.jpg';
        },
        
        handleIssuerLogoError(event) {
            event.target.style.display = 'none';
        },
        
        toggleTag(tag) {
            if (this.selectedTags.includes(tag)) {
                this.selectedTags = this.selectedTags.filter(t => t !== tag);
            } else {
                this.selectedTags.push(tag);
            }
        },
        
        clearFilters() {
            this.searchQuery = '';
            this.selectedTags = [];
        }
    }
};
</script>

<style scoped lang="scss">
.certifications-page {
    max-width: 1340px;
    margin: 0 auto;
    padding: 0 20px 3rem;
}

.certifications-header {
    text-align: center;
    margin: 2rem 0 3rem;
    
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    p {
        font-size: 1.2rem;
        max-width: 700px;
        margin: 0 auto;
        opacity: 0.8;
    }
}

.certifications-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.certifications-filter {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .search-box {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 0.5rem 1rem;
        
        i {
            color: #b0b0b0;
            margin-right: 0.5rem;
        }
        
        input {
            background: transparent;
            border: none;
            color: #fff;
            font-size: 1rem;
            width: 100%;
            outline: none;
            
            &::placeholder {
                color: #b0b0b0;
            }
        }
    }
    
    .filter-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        .filter-tag {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 20px;
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
            color: #b0b0b0;
            cursor: pointer;
            transition: all 0.3s ease;
            
            &:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            &.active {
                background: var(--dark-primary-color, #9871F6);
                color: #fff;
            }
        }
    }
}

.certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
            height: 200px;
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
                
                .issuer-logo {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
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
                margin: 0 0 1rem;
                line-height: 1.5;
            }
            
            .certificate-meta {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                margin-bottom: 1rem;
                
                .certificate-date, .certificate-expiry {
                    font-size: 0.85rem;
                    color: #b0b0b0;
                }
                
                .certificate-expiry.expired {
                    color: #ff5252;
                }
            }
            
            .certificate-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                
                .certificate-tag {
                    background: rgba(var(--dark-primary-color-rgb, 152, 113, 246), 0.15);
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    color: var(--dark-primary-color, #9871F6);
                }
            }
        }
    }
}

.no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 0;
    
    i {
        font-size: 3rem;
        color: #b0b0b0;
    }
    
    p {
        font-size: 1.2rem;
        color: #b0b0b0;
        text-align: center;
    }
    
    .clear-filters {
        background: var(--dark-primary-color, #9871F6);
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
    }
}

// Tema claro
html.light {
    .certifications-header {
        h1, p {
            color: #333;
        }
    }
    
    .certifications-filter {
        .search-box {
            background: rgba(0, 0, 0, 0.05);
            
            i {
                color: #555;
            }
            
            input {
                color: #333;
                
                &::placeholder {
                    color: #555;
                }
            }
        }
        
        .filter-tags .filter-tag {
            background: rgba(0, 0, 0, 0.05);
            color: #555;
            
            &:hover {
                background: rgba(0, 0, 0, 0.1);
            }
        }
    }
    
    .certifications-grid .certification-card {
        background-color: rgba(255, 255, 255, 0.7);
        
        .certificate-content {
            .certificate-name {
                color: #333;
            }
            
            .certificate-desc, .certificate-issuer span, .certificate-meta .certificate-date, .certificate-meta .certificate-expiry {
                color: #555;
            }
            
            .certificate-meta .certificate-expiry.expired {
                color: #d32f2f;
            }
        }
    }
    
    .no-results {
        i, p {
            color: #555;
        }
    }
}

@media (max-width: 768px) {
    .certifications-header {
        h1 {
            font-size: 2rem;
        }
        
        p {
            font-size: 1rem;
        }
    }
    
    .certifications-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 480px) {
    .certifications-header {
        margin: 1.5rem 0 2rem;
    }
    
    .certifications-grid {
        grid-template-columns: 1fr;
    }
}
</style>