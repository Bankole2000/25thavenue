<script setup lang="ts">
import type { Service } from '~/data/cms'

defineProps<{ service: Service }>()
</script>

<template>
  <v-card :to="`/services#${service.id}`" class="pa-6 h-100">
    <ServiceIcon :service="service" color="secondary" :size="40" />
    <h3 class="type-subheading mt-4">
      {{ service.title }}
    </h3>
    <p class="type-body text-muted-ink mt-2">
      {{ service.summary || service.description }}
    </p>
  </v-card>
</template>
