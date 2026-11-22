<script setup lang="ts">
import type { Service } from '~/data/cms'

defineProps<{
  service: Service
  tone?: 'background' | 'surface'
}>()
</script>

<template>
  <AppSection :id="service.id" :tone="tone" :title="service.title" :lead="service.description">
    <v-row v-if="service.groups.length">
      <v-col
        v-for="group in service.groups"
        :key="group.title"
        cols="12"
        :md="service.groups.length > 2 ? 4 : 6"
      >
        <v-card class="pa-6 h-100">
          <h3 class="type-subheading">
            {{ group.title }}
          </h3>
          <v-list density="compact" class="pa-0 mt-2 bg-transparent">
            <v-list-item
              v-for="item in group.items"
              :key="item"
              prepend-icon="mdi-check"
              class="px-0"
            >
              <span class="service-detail__item">{{ item }}</span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="service.process.length">
      <h3 class="type-subheading mt-10">
        {{ service.processTitle || 'How it works' }}
      </h3>
      <ol class="service-detail__process type-body mt-3">
        <li v-for="step in service.process" :key="step">
          {{ step }}
        </li>
      </ol>
    </template>

    <template v-if="service.faqs?.length">
      <h3 class="type-subheading mt-10 mb-4">
        Frequently asked questions
      </h3>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          v-for="faq in service.faqs"
          :key="faq.question"
          :title="faq.question"
          :text="faq.answer"
        />
      </v-expansion-panels>
    </template>

    <div class="d-flex flex-wrap ga-4 mt-10">
      <v-btn :to="`/book?service=${service.id}`" color="secondary" size="large">
        Book a consultation
      </v-btn>
      <v-btn :to="`/work?service=${service.id}`" variant="outlined" size="large">
        See example work
      </v-btn>
    </div>
  </AppSection>
</template>

<style scoped>
.service-detail__process {
  padding-left: 1.25rem;
}

.service-detail__process li {
  padding-block: 4px;
}

.service-detail__item {
  white-space: normal;
}
</style>
