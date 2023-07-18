import {
    defineConfig, presetAttributify, presetIcons,
    presetTypography, presetUno, presetWebFonts,
    transformerDirectives, transformerVariantGroup
  } from 'unocss'

export default defineConfig({
    presets: [
        presetAttributify(),
        presetIcons(),
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
    ]
})
