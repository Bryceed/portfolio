import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * Composable para traduções reativas sem necessidade de reload
 * Garante que não mostre keys/placeholders quando tradução não existir
 */
export const useTranslation = () => {
    const i18n = useI18n();
    const forceUpdate = ref(0);

    /**
     * Traduz uma chave com fallback inteligente
     * @param {string} key - Chave de tradução (ex: 'menu.home')
     * @param {object} params - Parâmetros para interpolação
     * @param {string} defaultValue - Valor padrão se a tradução não existir
     * @returns {string} Tradução ou valor padrão
     */
    const t = (key, params = {}, defaultValue = '') => {
        try {
            // Força reatividade
            forceUpdate.value;

            const translation = i18n.t(key, params);

            // Verifica se é uma chave não traduzida (retorna a própria chave)
            if (translation === key || translation === '' || translation === undefined) {
                // Tenta com o locale de fallback (en)
                const currentLocale = i18n.locale.value;

                if (currentLocale !== 'en' && currentLocale !== 'en-US') {
                    // Tenta com inglês
                    const fallbackTranslation = i18n.tm(key);

                    if (fallbackTranslation && typeof fallbackTranslation === 'string') {
                        return interpolate(fallbackTranslation, params);
                    }
                }

                // Se ainda não encontrou, retorna o valor padrão ou uma string vazia
                return defaultValue || '';
            }

            return translation;
        } catch (error) {
            console.warn(`Translation error for key "${key}":`, error);
            return defaultValue || '';
        }
    };

    /**
     * Interpolação manual de parâmetros
     */
    const interpolate = (text, params) => {
        if (!params || Object.keys(params).length === 0) return text;

        let result = text;
        Object.keys(params).forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            result = result.replace(regex, params[key]);
        });

        return result;
    };

    /**
     * Verifica se uma tradução existe
     */
    const hasTranslation = (key) => {
        try {
            const translation = i18n.te(key);
            return translation;
        } catch {
            return false;
        }
    };

    /**
     * Obtém tradução com HTML seguro
     * Use com v-html quando necessário
     */
    const tHtml = (key, params = {}, defaultValue = '') => {
        return t(key, params, defaultValue);
    };

    /**
     * Força atualização das traduções
     * Útil após mudança de locale
     */
    const refresh = () => {
        forceUpdate.value++;
    };

    /**
     * Obtém locale atual de forma reativa
     */
    const currentLocale = computed(() => i18n.locale.value);

    /**
     * Obtém lista de locales disponíveis
     */
    const availableLocales = computed(() => i18n.availableLocales);

    /**
     * Muda o locale de forma reativa
     */
    const setLocale = (newLocale) => {
        try {
            i18n.locale.value = newLocale;

            // Salva no localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('lang', newLocale);
            }

            // Força atualização
            refresh();

            // Dispara evento customizado
            if (typeof document !== 'undefined') {
                document.dispatchEvent(new CustomEvent('locale:changed', {
                    detail: { locale: newLocale }
                }));
            }

            return true;
        } catch (error) {
            console.error('Error setting locale:', error);
            return false;
        }
    };

    /**
     * Traduz array de chaves
     */
    const tArray = (keys, params = {}) => {
        return keys.map(key => t(key, params));
    };

    /**
     * Traduz com pluralização
     */
    const tPlural = (key, count, params = {}) => {
        try {
            return i18n.tc(key, count, params);
        } catch (error) {
            console.warn(`Plural translation error for key "${key}":`, error);
            return t(key, { ...params, count });
        }
    };

    return {
        t,
        tHtml,
        tArray,
        tPlural,
        hasTranslation,
        currentLocale,
        availableLocales,
        setLocale,
        refresh
    };
};
