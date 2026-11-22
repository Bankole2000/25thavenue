<script setup lang="ts">
const { data: services } = await useServices()

const titles = services.value.map(service => service.title.toLowerCase())
usePageSeo('Services', titles.length
  ? `${titles.slice(0, -1).join(', ')}${titles.length > 1 ? ' and ' : ''}${titles.at(-1)} from 25th Avenue.`.replace(/^./, letter => letter.toUpperCase())
  : 'Services from 25th Avenue.')

useSchemaOrg(services.value.map(service => ({
  '@type': 'Service',
  'name': service.title,
  'description': service.summary,
  'provider': { '@type': 'Organization', 'name': '25th Avenue' },
})))
</script>

<template>
  <div>
    <AppPageHero
      page="services"
      title="Our services"
      lead="Choose the support your business needs now, or talk to us about how our services work together."
    >
      <div class="d-flex flex-wrap ga-2 mt-8">
        <v-btn
          v-for="service in services"
          :key="service.id"
          :to="`#${service.id}`"
          variant="outlined"
        >
          <template #prepend>
            <ServiceIcon :service="service" :size="20" />
          </template>
          {{ service.title }}
        </v-btn>
      </div>
    </AppPageHero>

    <ServiceDetail
      v-for="(service, index) in services"
      :key="service.id"
      :service="service"
      :tone="index % 2 === 0 ? 'surface' : 'background'"
    />

    <AppCtaBand title="Not sure where to start?" lead="Book a consultation and we'll help you work out what your business needs first." />
  </div>
</template>
