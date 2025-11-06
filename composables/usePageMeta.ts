import { getPageTitle } from '@/utils/page/pageTitle'

interface PageMetaOptions {
  title?: string
  mainPage?: string
  description?: string
}

/**
 * Composable for managing page metadata (title, description, etc.)
 */
export const usePageMeta = () => {
  const setPageMeta = (options: PageMetaOptions = {}) => {
    const title = getPageTitle({
      mainPage: options.mainPage,
      title: options.title
    })

    useHead({
      title,
      meta: options.description ? [
        { name: 'description', content: options.description }
      ] : []
    })
  }

  return {
    setPageMeta
  }
}
