<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlog'

defineProps<{ post: BlogPost }>()
</script>

<template>
  <v-card :to="`/blog/${post.slug}`" class="h-100">
    <v-img
      v-if="post.image"
      :src="post.image.src"
      :alt="post.image.alt"
      :aspect-ratio="16 / 9"
      cover
    />
    <div class="pa-6">
      <v-chip size="small" color="secondary" variant="tonal">
        {{ post.category }}
      </v-chip>
      <h3 class="type-subheading mt-3">
        {{ post.title }}
      </h3>
      <p class="type-body text-muted-ink mt-2">
        {{ post.excerpt }}
      </p>
      <p class="text-muted-ink mt-3">
        {{ formatPostDate(post.date) }}
      </p>
    </div>
  </v-card>
</template>
