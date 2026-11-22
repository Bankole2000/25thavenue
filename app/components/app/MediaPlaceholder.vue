<script setup lang="ts">
// Stands in for a photo until real images are supplied.
withDefaults(defineProps<{
  label: string
  icon?: string
}>(), {
  icon: 'mdi-image-outline',
})
</script>

<template>
  <div class="media-placeholder" role="img" :aria-label="label">
    <v-icon :icon="icon" size="32" />
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.media-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  min-height: 160px;
  padding: 16px;
  background: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-muted));
  font-weight: 600;
  text-align: center;
}
</style>
