<script setup lang="ts">
import type { Testimonial } from '~/data/cms'

defineProps<{ testimonial: Testimonial }>()
</script>

<template>
  <v-card tag="figure" class="pa-6 h-100 ma-0">
    <blockquote class="type-body ma-0">
      {{ testimonial.quote }}
    </blockquote>
    <figcaption class="mt-4">
      <a v-if="testimonial.url" :href="testimonial.url" target="_blank" rel="noopener" class="testimonial-card__link">
        <strong>{{ testimonial.name }}</strong>
      </a>
      <strong v-else>{{ testimonial.name }}</strong>
      <template v-if="testimonial.role">
        <br>
        <span class="text-muted-ink">{{ testimonial.role }}</span>
      </template>
    </figcaption>
  </v-card>
</template>

<style scoped>
.testimonial-card__link {
  color: inherit;
  text-underline-offset: 3px;
}
</style>
