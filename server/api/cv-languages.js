export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { type } = body;

  try {
    // Usando o sistema de arquivos para ler o JSON
    const fs = await import('fs/promises');
    
    try {
      const fileContent = await fs.readFile(`${process.cwd()}/data/cv/index.json`, 'utf-8');
      const data = JSON.parse(fileContent);
      
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
      console.error(`Erro ao carregar idiomas disponíveis:`, error);
      return {
        error: 'Arquivo de configuração não encontrado',
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
