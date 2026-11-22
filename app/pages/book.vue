<script setup lang="ts">
const site = await useSite()

usePageSeo('Book a consultation', 'Choose the services you want to discuss and a preferred time to book a consultation with 25th Avenue.')
</script>

<template>
  <div>
    <AppPageHero
      page="book"
      title="Book a consultation"
      lead="Choose what you'd like to discuss and a time that suits you, then send us your request."
    />

    <AppSection tone="surface">
      <iframe
        v-if="site.calendlyUrl"
        :src="site.calendlyUrl"
        title="Book a consultation with 25th Avenue"
        class="book-calendly"
      />
      <BookingFlow v-else />
    </AppSection>
  </div>
</template>

<style scoped>
.book-calendly {
  width: 100%;
  height: 720px;
  border: 0;
}
</style>
