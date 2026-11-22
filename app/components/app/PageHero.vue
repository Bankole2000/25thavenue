<script setup lang="ts">
import type { CmsImage, HeroPage } from '~/data/cms'

defineProps<{
  title: string
  lead: string
  // Which page's header image (from WordPress) to show behind the title.
  page?: HeroPage
  // Use this image instead, e.g. a blog post's featured image.
  image?: CmsImage
}>()
</script>

<template>
  <AppHeroFrame :page="page" :image="image">
    <v-container class="page-hero">
      <h1 class="type-display page-hero__title">
        {{ title }}
      </h1>
      <p class="type-lead text-muted-ink mt-6">
        {{ lead }}
      </p>
      <slot />
    </v-container>
  </AppHeroFrame>
</template>

<style scoped>
.page-hero {
  padding-block: clamp(56px, 9vw, 120px);
}

.page-hero__title {
  max-width: 18ch;
}
</style>
