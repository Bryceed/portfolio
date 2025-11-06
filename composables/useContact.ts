import { contactLinks, contactButtons } from '@/utils/contact/contactLinks'
import about from '@/data/about.json'

/**
 * Composable for handling contact information and links
 */
export const useContact = () => {
  const formatPhone = (phone?: string): string => {
    return phone ? phone.replace(/\D/g, '') : ''
  }

  const getWhatsAppLink = (phone?: string): string => {
    if (!phone) return ''
    return `https://api.whatsapp.com/send?phone=${formatPhone(phone)}`
  }

  const getEmailLink = (email?: string): string => {
    if (!email) return ''
    return `mailto:${email}`
  }

  const contactInfo = {
    email: about.email,
    phone: about.phone,
    links: {
      github: about.links?.github || '',
      linkedin: about.links?.linkedin || '',
      whatsapp: getWhatsAppLink(about.phone),
      instagram: about.links?.instagram || ''
    }
  }

  return {
    contactInfo,
    contactLinks,
    contactButtons,
    formatPhone,
    getWhatsAppLink,
    getEmailLink
  }
}
