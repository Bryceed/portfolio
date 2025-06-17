import {
    defineConfig, presetAttributify, presetIcons,
    presetTypography, presetUno, presetWebFonts,
    transformerDirectives, transformerVariantGroup
  } from 'unocss'

export default defineConfig({
    presets: [
        presetAttributify(),
        presetTypography(),
        presetUno(),
        presetWebFonts(),
        presetIcons({
            extraProperties: {
                'vertical-align': 'middle',
                'display': 'inline-block',
                'fill': 'currentColor',
            }
        })
    ],
    theme: {
        colors: {
            primary: '#6a4caf',  // Cor roxa
            secondary: '#ff4081', // Cor rosa/pink
            accent: '#03dac6',    // Cor teal/verde água
        }
    },
    // Habilitar transformers para diretivas @apply
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ]
})
