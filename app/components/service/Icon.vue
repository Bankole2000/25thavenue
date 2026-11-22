<script setup lang="ts">
import type { Service } from '~/data/cms'

// A service's custom icon image when it has one, otherwise its Material Design icon.
withDefaults(defineProps<{
  service: Pick<Service, 'icon' | 'iconImage'>
  size?: number
  color?: string
}>(), {
  size: 24,
  color: undefined,
})
</script>

<template>
  <img
    v-if="service.iconImage"
    :src="service.iconImage.src"
    alt=""
    :width="size"
    :height="size"
    class="service-icon__image"
  >
  <v-icon v-else-if="service.icon" :icon="service.icon" :color="color" :size="size" />
</template>

<style scoped>
.service-icon__image {
  display: inline-block;
  object-fit: contain;
  vertical-align: middle;
}
</style>
