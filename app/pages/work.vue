<script setup lang="ts">
usePageSeo('Our work', 'Browse 25th Avenue projects across branding, creative work, business growth and financing assistance.')

const [{ data: projects }, { data: services }] = await Promise.all([useProjects(), useServices()])

// Only offer filters for services that have at least one project.
const filters = computed(() => services.value.filter(service => projects.value.some(project => project.serviceId === service.id)))

const route = useRoute()
const selected = ref('all')

// Follow links such as /work?service=brand-creation. Prerendered pages have no
// query string, so apply it once the page is live in the browser.
function applyServiceFromLink() {
  const service = route.query.service
  selected.value = services.value.some(item => item.id === service) ? String(service) : 'all'
}

onMounted(applyServiceFromLink)
watch(() => route.query.service, applyServiceFromLink)

const visibleProjects = computed(() => selected.value === 'all'
  ? projects.value
  : projects.value.filter(project => project.serviceId === selected.value))
</script>

<template>
  <div>
    <AppPageHero
      page="work"
      title="Our work"
      lead="See what we were asked to do, what we delivered and what changed as a result."
    />

    <AppSection tone="surface">
      <v-chip-group v-model="selected" mandatory column selected-class="bg-primary" aria-label="Filter by service">
        <v-chip value="all" variant="outlined">
          All work
        </v-chip>
        <v-chip
          v-for="service in filters"
          :key="service.id"
          :value="service.id"
          variant="outlined"
        >
          {{ service.title }}
        </v-chip>
      </v-chip-group>

      <v-row class="mt-4">
        <v-col v-for="project in visibleProjects" :key="project.id" cols="12" sm="6" md="4">
          <WorkCard :project="project" />
        </v-col>
      </v-row>
    </AppSection>

    <AppCtaBand title="Want results like these for your business?" />
  </div>
</template>
