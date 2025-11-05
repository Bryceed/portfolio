export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { lang } = body

  if (!lang) {
    return {
      error: 'Language not specified',
      success: false
    }
  }

  // CV files are now served as static files in /files/cv/
  // This endpoint is kept for backwards compatibility but returns an error
  return {
    error: 'CV file not found. Please use the static file endpoint at /files/cv/',
    success: false
  }
})
