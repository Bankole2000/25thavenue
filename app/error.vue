<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: () => (notFound.value ? 'Page not found' : 'Something went wrong') })
</script>

<template>
  <v-app>
    <NuxtLayout>
      <AppSection>
        <h1 class="type-heading">
          {{ notFound ? 'This page doesn\'t exist' : 'Something went wrong' }}
        </h1>
        <p class="type-lead text-muted-ink mt-4 mb-8">
          {{ notFound
            ? 'The link may be out of date. Head back to the homepage to find what you need.'
            : 'Reload the page, or head back to the homepage and try again.' }}
        </p>
        <v-btn color="primary" size="large" @click="clearError({ redirect: '/' })">
          Go to the homepage
        </v-btn>
      </AppSection>
    </NuxtLayout>
  </v-app>
</template>
