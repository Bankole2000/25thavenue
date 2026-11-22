<script setup lang="ts">
import { site } from '~/data/site'

// "View" opens the PDF in the browser's own reader in a new tab; "Download" saves it.
withDefaults(defineProps<{
  size?: 'default' | 'large' | 'x-large'
}>(), {
  size: 'large',
})

const { brochure } = site
</script>

<template>
  <div class="d-flex flex-wrap ga-3">
    <v-btn
      :href="brochure.url"
      target="_blank"
      rel="noopener"
      color="primary"
      :size="size"
      prepend-icon="mdi-book-open-page-variant-outline"
    >
      View brochure
      <span class="d-sr-only">(PDF, opens in a new tab)</span>
    </v-btn>
    <v-btn
      :href="brochure.url"
      :download="brochure.fileName"
      variant="outlined"
      :size="size"
      prepend-icon="mdi-download"
    >
      Download PDF ({{ brochure.size }})
    </v-btn>
  </div>
</template>
