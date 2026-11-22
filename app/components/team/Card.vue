<script setup lang="ts">
import type { TeamMember } from '~/data/cms'

const props = defineProps<{ member: TeamMember }>()

const isLinkedIn = computed(() => /linkedin\.com/i.test(props.member.url ?? ''))
</script>

<template>
  <v-card class="h-100">
    <div class="team-card__photo">
      <img v-if="member.photo" :src="member.photo.src" :alt="member.photo.alt" class="team-card__image" loading="lazy">
      <AppMediaPlaceholder v-else :label="`Photo of ${member.name}`" icon="mdi-account-outline" />
    </div>
    <div class="pa-6">
      <h3 class="type-subheading">
        {{ member.name }}
      </h3>
      <p class="font-weight-bold mt-1">
        {{ member.role }}
      </p>
      <p class="type-body text-muted-ink mt-2">
        {{ member.bio }}
      </p>
      <v-btn
        v-if="member.url"
        :href="member.url"
        target="_blank"
        rel="noopener"
        :prepend-icon="isLinkedIn ? 'mdi-linkedin' : 'mdi-open-in-new'"
        variant="text"
        color="secondary"
        class="mt-2 px-0"
      >
        {{ isLinkedIn ? 'LinkedIn' : 'Profile' }}
        <span class="d-sr-only">: {{ member.name }}</span>
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.team-card__photo {
  aspect-ratio: 4 / 3;
}

.team-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
