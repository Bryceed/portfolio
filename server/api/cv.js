export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { lang } = body;

  if (!lang) {
    return {
      error: 'Idioma não especificado',
      success: false
    };
  }

  // ...arquivo removido, pois agora os dados de CV são servidos como arquivos estáticos em /files/cv/...

  return {
    error: 'Arquivo de CV não encontrado',
    success: false
  };
});
