# Wellington N. - Portfolio

A modern, multilingual portfolio website built with Nuxt 3, Vue 3, and TypeScript.

## Features

- 🌍 Multi-language support (English, Portuguese, Spanish, French, German, Russian, Japanese, Korean)
- 🎨 Dark/Light theme toggle
- 📱 Fully responsive design
- ⚡ Built with Nuxt 3 and Vue 3
- 🔒 TypeScript for type safety
- 🎯 Clean architecture with composables and utilities
- 📄 Dynamic CV generation in multiple formats
- 🧪 MBTI personality test integration

## Project Structure

```
portfolio/
├── composables/     # Reusable Vue composables
├── components/      # Vue components (auto-imported)
├── pages/          # File-based routing
├── utils/          # Utility functions organized by domain
├── types/          # TypeScript type definitions
├── data/           # Static data and content
├── locales/        # i18n translation files
└── plugins/        # Nuxt plugins
```

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed documentation.

## Setup

Make sure to install the dependencies:

```bash
# yarn (recommended)
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Technology Stack

- **Framework**: Nuxt 3
- **Language**: TypeScript
- **Styling**: UnoCSS, SCSS
- **i18n**: Vue I18n
- **Content**: Nuxt Content
- **Icons**: Nuxt Icon
- **UI**: Custom components

## Documentation

- [Architecture Documentation](./docs/ARCHITECTURE.md) - Detailed project structure and patterns
- [Nuxt 3 Documentation](https://nuxt.com/docs) - Official Nuxt documentation

## License

See [LICENSE.txt](./public/LICENSE.txt)
