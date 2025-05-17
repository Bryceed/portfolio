// Arquivo para centralizar os links de contato
import about from '@/data/about.json'; // Correct import

// Extrair o número de telefone do formato +XX (XX) XXXXX-XXXX
const formatPhone = (phone) => {
  return phone ? phone.replace(/\D/g, '') : ''; // Add fallback for undefined phone
};

// Dados de contato centralizados
export const contactLinks = {
  whatsapp: about.phone ? `https://api.whatsapp.com/send?phone=${formatPhone(about.phone)}` : '',
  email: about.email ? `mailto:${about.email}` : '',
  github: about.links?.github || '',
  linkedin: about.links?.linkedin || '',
  discord: 'https://discord.gg/uYvVeha'
};

// Botões e textos para componentes
export const contactButtons = {
  whatsapp: {
    icon: 'whatsapp',
    text: 'Conversar no WhatsApp',
    class: 'btn-whatsapp'
  },
  email: {
    icon: 'email',
    text: 'Enviar E-mail',
    class: 'btn-email'
  },
  github: {
    icon: 'code',
    text: 'GitHub',
    class: 'btn-github'
  },
  linkedin: {
    icon: 'work',
    text: 'LinkedIn',
    class: 'btn-linkedin'
  },
  discord: {
    icon: 'forum',
    text: 'Discord',
    class: 'btn-discord'
  }
};

export default contactLinks;
