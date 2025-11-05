# Portfolio Architecture Documentation

## Overview
This document describes the architecture and organization of the portfolio application built with Nuxt 3.

## Project Structure

```
portfolio/
├── app/                      # App-level configuration
│   └── router.options.ts    # Router configuration
├── assets/                   # Static assets (CSS, fonts, images)
├── components/              # Vue components
│   ├── common/             # Reusable common components
│   ├── home/               # Home page specific components
│   ├── personality/        # Personality test components
│   ├── projects/           # Project-related components
│   ├── carousel/           # Carousel components
│   └── theme/              # Theme-related components
├── composables/            # Vue composables (reusable logic)
│   ├── useContact.ts      # Contact information management
│   ├── useLanguage.ts     # Language/locale management
│   └── usePageMeta.ts     # Page metadata helpers
├── data/                   # Static data files
│   ├── cv/                # CV data in multiple languages
│   └── *.json            # Configuration and content data
├── layouts/               # Nuxt layouts
├── locales/              # i18n translation files
├── middleware/           # Nuxt middleware
├── pages/               # Nuxt pages (file-based routing)
├── plugins/            # Nuxt plugins
│   ├── i18n.ts        # i18n configuration
│   ├── i18n-watcher.client.ts  # i18n reactivity handler
│   └── vanilla-tilt.client.js  # Vanilla Tilt integration
├── public/            # Public static files
├── server/           # Server-side code
│   └── api/         # API endpoints
├── types/           # TypeScript type definitions
│   └── index.ts    # Common types
└── utils/          # Utility functions
    ├── contact/   # Contact-related utilities
    ├── page/      # Page-related utilities
    └── index.ts   # Central export point
```

## Key Concepts

### Composables
Composables are reusable functions that encapsulate stateful logic. They follow Vue 3's Composition API patterns.

- **useLanguage**: Manages language selection and locale conversions
- **useContact**: Provides contact information and formatting utilities
- **usePageMeta**: Handles page title and metadata generation

### Utilities Organization
Utilities are organized by domain:
- `utils/contact/` - Contact and communication utilities
- `utils/page/` - Page metadata and title utilities
- `utils/index.ts` - Central export for easy imports

### Type Safety
TypeScript types are defined in `types/index.ts` for:
- About information
- Projects
- Skills
- Certifications
- CV data
- And more...

### Internationalization (i18n)
The application supports multiple languages through vue-i18n:
- Translation files in `locales/`
- Plugin configuration in `plugins/i18n.ts`
- Reactive updates via `plugins/i18n-watcher.client.ts`

### Data Management
Static data is stored in JSON files in the `data/` directory:
- `about.json` - Personal information
- `projects.json` - Project portfolio
- `skills.json` - Technical skills
- `certifications.json` - Professional certifications
- `cv/` - CV data in multiple formats and languages
- `mbti.ts` - Personality test data with type definitions

## Best Practices

### Importing Utilities
Always import from the central export point:
```typescript
import { contactLinks } from '@/utils'
import { getPageTitle } from '@/utils'
```

Or use specific paths:
```typescript
import { contactLinks } from '@/utils/contact/contactLinks'
```

### Using Composables
Import and use composables in components:
```typescript
import { useContact } from '@/composables/useContact'

const { contactInfo, formatPhone } = useContact()
```

### Type Definitions
Import types from the central types file:
```typescript
import type { Project, Skill } from '@/types'
```

## Code Quality

### TypeScript
- All utilities and composables are written in TypeScript
- Proper type definitions for data structures
- Type safety across the codebase

### Code Organization
- Components are organized by feature
- Utilities are grouped by domain
- Clear separation of concerns

### Build Process
The project uses Nuxt 3's build system:
- Vite for development
- Optimized production builds
- Auto-import of components and composables

## Migration Notes

### Recent Changes
1. Converted JavaScript utilities to TypeScript
2. Reorganized utils into domain-specific folders
3. Created reusable composables
4. Simplified i18n plugin (35% size reduction)
5. Removed unused API endpoints
6. Added comprehensive type definitions

### Breaking Changes
None - all imports have been updated to maintain compatibility.
