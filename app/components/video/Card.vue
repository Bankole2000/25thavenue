<script setup lang="ts">
import type { Video } from '~/data/cms'

const props = defineProps<{ video: Video }>()

// The YouTube player only loads after a click, which keeps pages light on mobile data.
const playing = ref(false)

const preview = computed(() => props.video.preview?.src
  ?? (props.video.youtubeId ? `https://i.ytimg.com/vi/${props.video.youtubeId}/hqdefault.jpg` : ''))
</script>

<template>
  <v-card class="h-100">
    <div class="video-card__frame">
      <AppMediaPlaceholder
        v-if="!video.url"
        :label="`Video coming soon: ${video.title}`"
        icon="mdi-play-circle-outline"
      />
      <iframe
        v-else-if="playing"
        :src="`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`"
        :title="video.title"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <button
        v-else-if="video.youtubeId"
        type="button"
        class="video-card__play"
        :aria-label="`Play ${video.title}`"
        @click="playing = true"
      >
        <img :src="preview" alt="" loading="lazy">
        <v-icon icon="mdi-play-circle" size="64" color="white" />
      </button>
      <!-- Videos hosted elsewhere (Instagram, TikTok, Vimeo...) open on that site. -->
      <a
        v-else
        :href="video.url"
        target="_blank"
        rel="noopener"
        class="video-card__play"
        :aria-label="`Watch ${video.title} (opens in a new tab)`"
      >
        <img v-if="preview" :src="preview" alt="" loading="lazy">
        <v-icon icon="mdi-open-in-new" size="48" color="white" />
      </a>
    </div>
    <div class="pa-6">
      <h3 class="type-subheading">
        {{ video.title }}
      </h3>
      <p v-if="video.summary" class="type-body text-muted-ink mt-2">
        {{ video.summary }}
      </p>
    </div>
  </v-card>
</template>

<style scoped>
.video-card__frame {
  aspect-ratio: 16 / 9;
}

.video-card__frame iframe,
.video-card__play {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.video-card__play {
  position: relative;
  cursor: pointer;
  background: rgb(var(--v-theme-surface-variant));
}

.video-card__play img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-card__play .v-icon {
  position: absolute;
  inset: 0;
  margin: auto;
}
</style>
