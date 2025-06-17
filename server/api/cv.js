export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { lang } = body;

  if (!lang) {
    return {
      error: 'Idioma não especificado',
      success: false
    };
  }

  try {
    // Usando o sistema de arquivos para ler o JSON
    // Mais seguro porque o arquivo não fica diretamente acessível via URL
    const path = `data/cv/${lang}.json`;
    const fs = await import('fs/promises');
    
    try {
      const fileContent = await fs.readFile(`${process.cwd()}/${path}`, 'utf-8');
      const data = JSON.parse(fileContent);
      return {
        data,
        success: true
      };
    } catch (error) {
      console.error(`Erro ao carregar CV (${lang}):`, error);
      
      // Se o arquivo solicitado não existir, tente o fallback para pt-BR
      if (lang !== 'pt-BR') {
        try {
          const fallbackContent = await fs.readFile(`${process.cwd()}/data/cv/pt-BR.json`, 'utf-8');
          const fallbackData = JSON.parse(fallbackContent);
          return {
            data: fallbackData,
            fallback: true,
            success: true
          };
        } catch (fallbackError) {
          return {
            error: 'Arquivo de CV não encontrado, mesmo após fallback',
            success: false
          };
        }
      }
      
      return {
        error: 'Arquivo de CV não encontrado',
        success: false
      };
    }
  } catch (error) {
    console.error('Erro ao processar solicitação de CV:', error);
    return {
      error: 'Erro interno ao processar solicitação',
      success: false
    };
  }
});
