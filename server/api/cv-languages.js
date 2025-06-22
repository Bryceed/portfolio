export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { type } = body;

  try {
    if (type === 'traditional') {
      // Para CV tradicional, retornar as chaves do objeto traditional
      return {
        languages: Object.keys(data.traditional || {}),
        success: true
      };
    } else if (type === 'europass') {
      // Para CV Europass, retornar o array de idiomas
      return {
        languages: data.europass || [],
        success: true
      };
    } else {
      return {
        error: 'Tipo não especificado ou inválido',
        success: false
      };
    }
  } catch (error) {
    console.error('Erro ao processar solicitação de idiomas:', error);
    return {
      error: 'Erro interno ao processar solicitação',
      success: false
    };
  }
});
