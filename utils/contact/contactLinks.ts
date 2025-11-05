import about from '@/data/about.json'

interface ContactButton {
  icon: string
  text: string
  class: string
}

interface ContactButtons {
  whatsapp: ContactButton
  email: ContactButton
  github: ContactButton
  linkedin: ContactButton
  discord: ContactButton
}

interface ContactLinks {
  whatsapp: string
  email: string
  github: string
  linkedin: string
  discord: string
}

/**
 * Formats phone number by removing all non-digit characters
 */
const formatPhone = (phone?: string): string => {
  return phone ? phone.replace(/\D/g, '') : ''
}

/**
 * Centralized contact links
 */
export const contactLinks: ContactLinks = {
  whatsapp: about.phone ? `https://api.whatsapp.com/send?phone=${formatPhone(about.phone)}` : '',
  email: about.email ? `mailto:${about.email}` : '',
  github: about.links?.github || '',
  linkedin: about.links?.linkedin || '',
  discord: 'https://discord.gg/uYvVeha'
}

/**
 * Button configurations for contact components
 */
export const contactButtons: ContactButtons = {
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
}

export default contactLinks
