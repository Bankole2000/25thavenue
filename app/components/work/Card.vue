<script setup lang="ts">
import type { Project } from '~/data/cms'

defineProps<{ project: Project }>()
</script>

<template>
  <v-card class="h-100">
    <div class="work-card__media" :class="{ 'work-card__media--compare': project.hasBeforeAfter }">
      <template v-if="project.hasBeforeAfter">
        <div class="work-card__frame">
          <img v-if="project.beforeImage" :src="project.beforeImage.src" :alt="project.beforeImage.alt" class="cms-image" loading="lazy">
          <AppMediaPlaceholder v-else :label="`Before: ${project.client}`" />
          <span class="work-card__label">Before</span>
        </div>
        <div class="work-card__frame">
          <img v-if="project.image" :src="project.image.src" :alt="project.image.alt" class="cms-image" loading="lazy">
          <AppMediaPlaceholder v-else :label="`After: ${project.client}`" />
          <span class="work-card__label">After</span>
        </div>
      </template>
      <img v-else-if="project.image" :src="project.image.src" :alt="project.image.alt" class="cms-image" loading="lazy">
      <AppMediaPlaceholder v-else :label="`Project image: ${project.client}`" />
    </div>

    <div class="pa-6">
      <v-chip v-if="project.serviceTitle" size="small" color="secondary" variant="tonal">
        {{ project.serviceTitle }}
      </v-chip>
      <h3 class="type-subheading mt-3">
        {{ project.client }}
      </h3>

      <dl class="work-card__details type-body mt-3">
        <template v-if="project.brief">
          <dt>Brief</dt>
          <dd>{{ project.brief }}</dd>
        </template>
        <template v-if="project.deliverables.length">
          <dt>Deliverables</dt>
          <dd>{{ project.deliverables.join(', ') }}</dd>
        </template>
        <template v-if="project.outcome">
          <dt>Outcome</dt>
          <dd>{{ project.outcome }}</dd>
        </template>
      </dl>

      <div v-if="project.tags.length" class="d-flex flex-wrap ga-1 mt-4" aria-label="Tags">
        <v-chip v-for="tag in project.tags" :key="tag" size="x-small" variant="outlined">
          {{ tag }}
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.work-card__media {
  height: 180px;
}

.work-card__media--compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.cms-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-card__frame {
  position: relative;
  height: 100%;
}

.work-card__label {
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 2px 8px;
  border-radius: 0px;
  background: rgb(0 0 0 / 60%);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}

.work-card__details dt {
  margin-top: 12px;
  font-weight: 800;
}

.work-card__details dd {
  margin: 0;
  color: rgb(var(--v-theme-muted));
}
</style>
