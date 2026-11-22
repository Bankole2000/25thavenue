<script setup lang="ts">
withDefaults(defineProps<{
  id?: string
  title?: string
  lead?: string
  tone?: 'background' | 'surface' | 'primary'
}>(), {
  id: undefined,
  title: undefined,
  lead: undefined,
  tone: 'background',
})
</script>

<template>
  <section
    :id="id"
    class="app-section anchor-target"
    :class="`app-section--${tone}`"
    :aria-label="title"
  >
    <v-container>
      <div v-if="title" class="mb-8">
        <h2 class="type-heading app-section__title">
          {{ title }}
        </h2>
        <p v-if="lead" class="type-lead mt-3" :class="{ 'text-muted-ink': tone !== 'primary' }">
          {{ lead }}
        </p>
      </div>
      <slot />
    </v-container>
  </section>
</template>

<style scoped>
.app-section {
  padding-block: clamp(56px, 8vw, 96px);
}

/* Each tone is a subtle diagonal gradient in neutral dark greys. */
.app-section--background {
  background: linear-gradient(160deg, #141414 0%, #0e0e0e 100%);
}

.app-section--surface {
  background: linear-gradient(160deg, #1c1c1c 0%, #151515 100%);
}

/* Brand maroon. White text on it is well above WCAG AA contrast. */
.app-section--primary {
  background: linear-gradient(135deg, #7a0a08 0%, #4d0100 100%);
  color: rgb(var(--v-theme-on-primary));
}

/* A short brand-yellow stroke under each section title. */
.app-section__title::after {
  content: '';
  display: block;
  width: 48px;
  height: 4px;
  margin-top: 14px;
  border-radius: 2px;
  background: rgb(var(--v-theme-secondary));
}
</style>
