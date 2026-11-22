<script setup lang="ts">
defineProps<{
  title: string
  text: string
  icon: string
}>()
</script>

<template>
  <v-card class="pa-6 h-100">
    <v-icon :icon="icon" color="secondary" size="36" />
    <h3 class="type-subheading mt-4">
      {{ title }}
    </h3>
    <p class="type-body text-muted-ink mt-2">
      {{ text }}
    </p>
  </v-card>
</template>
