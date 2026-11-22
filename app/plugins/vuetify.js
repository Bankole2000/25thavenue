// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'avenue',
      themes: {
        // Neutral dark palette with the two brand colours used sparingly:
        // - primary, brand maroon #6F0100: filled action buttons, selected chips, the CTA band, the street sign.
        //   Too dark to read as text on dark backgrounds, so never use it for text or icons.
        // - secondary, brand yellow #FFCC01: "Book a consultation", icons, links, focus and small accents.
        // Text colours keep at least WCAG AA contrast on background and surface.
        avenue: {
          dark: true,
          colors: {
            'primary': '#6F0100',
            'on-primary': '#ffffff',
            'secondary': '#FFCC01',
            'on-secondary': '#2b0100',
            'background': '#0f0f0f',
            'on-background': '#ededed',
            'surface': '#181818',
            'on-surface': '#ededed',
            'surface-bright': '#232323',
            'surface-variant': '#2c2c2c',
            'on-surface-variant': '#ededed',
            'ink': '#0a0a0a',
            'on-ink': '#ededed',
            'muted': '#b0b0b0',
          },
        },
      },
    },
    defaults: {
      VBtn: { flat: true, rounded: 'sm' },
      VCard: { flat: true, rounded: 'lg', border: false },
      VTextField: { variant: 'outlined', color: 'secondary' },
      VTextarea: { variant: 'outlined', color: 'secondary' },
      VSelect: { variant: 'outlined', color: 'secondary' },
      VCheckbox: { color: 'secondary' },
    },
  })
  app.vueApp.use(vuetify)
})
