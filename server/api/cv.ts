export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { lang } = body

  if (!lang) {
    return {
      error: 'Language not specified. Please provide a "lang" parameter (e.g., pt-BR, en-US, es, fr, de, ru, ja-JP, ko).',
      success: false
    }
  }

  // CV files are now served as static files in /files/cv/
  // This endpoint is kept for backwards compatibility but returns an error
  return {
    error: `CV file not found for language "${lang}". CV files are now served as static files. Please access them at /files/cv/index.json to see available formats and languages.`,
    success: false
  }
})
