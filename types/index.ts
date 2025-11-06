/**
 * Common type definitions for the portfolio application
 */

export interface About {
  name: string
  email: string
  phone?: string
  links?: {
    github?: string
    linkedin?: string
    instagram?: string
    twitter?: string
  }
}

export interface Project {
  id: number | string
  name: string
  description: string
  image?: string
  link?: string
  github?: string
  tags?: string[]
  featured?: boolean
}

export interface Skill {
  name: string
  level?: number
  category?: string
  icon?: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credential?: string
  link?: string
  image?: string
}

export interface Job {
  title: string
  company: string
  startDate: string
  endDate?: string
  description?: string
  location?: string
}

export interface TimelineEntry {
  date: string
  title: string
  description?: string
  type?: 'education' | 'work' | 'achievement'
}

export interface Language {
  code: string
  region?: string
  name: string
}

export interface CVData {
  traditional?: Record<string, string>
  europass?: string[]
}
