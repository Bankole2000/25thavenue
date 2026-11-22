<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlog'

defineProps<{ post: BlogPost }>()
</script>

<template>
  <v-card :to="`/blog/${post.slug}`" class="h-100">
    <div class="blog-card__media">
      <img v-if="post.thumbnail" :src="post.thumbnail.src" :alt="post.thumbnail.alt" loading="lazy">
      <!-- Posts without any image get a branded panel, so the cards stay in line. -->
      <div v-else class="blog-card__placeholder" aria-hidden="true">
        <img src="/images/brand/logo-yellow.png" alt="" width="544" height="270">
      </div>
    </div>
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

<style scoped>
.blog-card__media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.blog-card__media > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card__placeholder {
  display: grid;
  place-items: center;
  height: 100%;
  background: linear-gradient(135deg, #7a0a08 0%, #4d0100 100%);
}

.blog-card__placeholder img {
  width: 38%;
  height: auto;
  opacity: 0.9;
}
</style>
