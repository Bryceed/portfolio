const siteName = 'Wellington N.'

interface PageTitleOptions {
  mainPage?: string
  title?: string
}

/**
 * Generates a formatted page title for the application
 * @param options - Options for the page title generation
 * @returns Formatted page title string
 */
export function getPageTitle(options: PageTitleOptions = {}): string {
  const { mainPage, title } = options

  if (title) {
    return `${title} - ${mainPage} | ${siteName}`
  } else if (mainPage) {
    return `${mainPage} | ${siteName}`
  } else {
    return `${siteName} portfolio`
  }
}
