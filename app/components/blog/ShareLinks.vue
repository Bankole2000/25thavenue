<script setup lang="ts">
import { site } from '~/data/site'

const props = defineProps<{
  title: string
  path: string
}>()

const links = computed(() => {
  const url = encodeURIComponent(`${site.url}${props.path}`)
  const text = encodeURIComponent(props.title)
  return [
    { name: 'WhatsApp', icon: 'mdi-whatsapp', href: `https://wa.me/?text=${text}%20${url}` },
    { name: 'X (Twitter)', icon: 'mdi-twitter', href: `https://x.com/intent/post?text=${text}&url=${url}` },
    { name: 'Facebook', icon: 'mdi-facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: 'LinkedIn', icon: 'mdi-linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
  ]
})
</script>

<template>
  <div class="d-flex flex-wrap align-center ga-2">
    <span class="font-weight-bold mr-2">Share this article</span>
    <v-btn
      v-for="link in links"
      :key="link.name"
      :href="link.href"
      :icon="link.icon"
      :aria-label="`Share on ${link.name}`"
      target="_blank"
      rel="noopener"
      variant="tonal"
      color="secondary"
      density="comfortable"
    />
  </div>
</template>
