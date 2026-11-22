<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  lead?: string
}>(), {
  title: 'Ready for your next stage?',
  lead: 'Book a consultation and tell us where you want your business to go.',
})
</script>

<template>
  <AppSection tone="primary" :title="title" :lead="lead">
    <v-btn to="/book" color="secondary" size="x-large">
      Book a consultation
    </v-btn>
  </AppSection>
</template>
