<script setup lang="ts">
const site = await useSite()
</script>

<template>
  <div class="d-flex flex-wrap align-center">
    <v-btn
      v-for="social in site.socials"
      :key="social.name"
      :href="social.url"
      :icon="social.icon"
      :aria-label="social.name"
      target="_blank"
      rel="noopener"
      variant="text"
      density="comfortable"
    />
  </div>
</template>
