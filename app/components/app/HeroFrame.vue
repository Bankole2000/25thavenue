<script setup lang="ts">
import type { CmsImage, HeroPage } from '~/data/cms'

// The backdrop of a page header, under a black-to-transparent gradient. It extends up behind the
// see-through top bar. Uses, in order: an image passed in, the page's header image set in WordPress
// (25th Avenue → Site details), or the site's default background (public/images/hero-background.svg).
const props = defineProps<{
  page?: HeroPage
  image?: CmsImage
}>()

const defaultBackdrop = '/images/hero-background.svg'

const site = await useSite()
const backdrop = computed(() => props.image?.src
  ?? (props.page ? site.value.heroImages[props.page]?.src : undefined)
  ?? defaultBackdrop)
</script>

<template>
  <header class="hero-frame">
    <img :src="backdrop" alt="" class="hero-frame__photo" fetchpriority="high">
    <div class="hero-frame__overlay" aria-hidden="true" />
    <slot />
  </header>
</template>

<style scoped>
.hero-frame {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  margin-top: calc(-1 * var(--v-layout-top, 72px));
  padding-top: var(--v-layout-top, 72px);
  /* Shows through the transparent parts of the default background. */
  background: #0a0a0a;
  color: #fff;
}

.hero-frame__photo {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-frame__overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  /* Deep purple-black fading to transparent. Dark enough behind the title for white text. */
  background: linear-gradient(90deg, rgb(20 8 36 / 78%) 0%, rgb(42 16 74 / 35%) 40%, rgb(60 24 104 / 0%) 70%);
}

/* On narrow screens the text spans the full width, so keep the whole image dark enough to read over. */
@media (max-width: 760px) {
  .hero-frame__overlay {
    background: linear-gradient(90deg, rgb(20 8 36 / 78%) 0%, rgb(42 16 74 / 45%) 100%);
  }
}

.hero-frame :deep(.text-muted-ink) {
  color: rgb(255 255 255 / 82%);
}
</style>
