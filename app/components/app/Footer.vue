<script setup lang="ts">
import { navigation } from '~/data/site'

const [site, { data: services }] = await Promise.all([useSite(), useServices()])

const year = new Date().getFullYear()
</script>

<template>
  <v-footer color="ink" class="app-footer pa-0">
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="4">
          <NuxtLink to="/" class="app-footer__logo" :aria-label="`${site.name} home`">
            <img src="/images/brand/logo-yellow.png" alt="" width="544" height="270">
          </NuxtLink>
          <p class="mt-3 mb-4">
            {{ site.tagline }}
          </p>
          <AppSocialLinks />
          <p class="mt-4">
            <a :href="site.brochure.url" target="_blank" rel="noopener" class="app-footer__brochure">
              <v-icon icon="mdi-book-open-page-variant-outline" size="20" />
              Company brochure (PDF)
            </a>
          </p>
        </v-col>

        <v-col cols="6" md="2">
          <h2 class="app-footer__title">
            Explore
          </h2>
          <ul class="plain-list">
            <li v-for="item in navigation" :key="item.to">
              <NuxtLink :to="item.to">
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </v-col>

        <v-col v-if="services.length" cols="6" md="3">
          <h2 class="app-footer__title">
            Services
          </h2>
          <ul class="plain-list">
            <li v-for="service in services" :key="service.id">
              <NuxtLink :to="`/services#${service.id}`">
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </v-col>

        <v-col cols="12" md="3">
          <h2 class="app-footer__title">
            Contact
          </h2>
          <ul class="plain-list">
            <li><a :href="`mailto:${site.email}`">{{ site.email }}</a></li>
            <li><a :href="site.phoneHref">{{ site.phoneDisplay }}</a></li>
            <li>
              <a :href="buildWhatsAppLink(site.whatsappNumber)" target="_blank" rel="noopener">Message us on WhatsApp</a>
            </li>
            <li>{{ site.address }}</li>
          </ul>
        </v-col>
      </v-row>
      <p class="mt-8">
        &copy; {{ year }} {{ site.name }}
      </p>
    </v-container>
  </v-footer>
</template>

<style scoped>
.app-footer {
  flex: 0 0 auto;
}

.app-footer__title {
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 800;
}

.app-footer li {
  padding-block: 4px;
}

.app-footer a {
  color: inherit;
  text-underline-offset: 3px;
}

.app-footer a:hover {
  color: rgb(var(--v-theme-secondary));
}

.app-footer__logo img {
  display: block;
  width: auto;
  height: 64px;
}

.app-footer__brochure {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
