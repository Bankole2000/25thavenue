<script setup lang="ts">
const site = await useSite()

usePageSeo('Contact us', 'Get in touch with 25th Avenue by message, phone, email or WhatsApp.')
</script>

<template>
  <div>
    <AppPageHero
      page="contact"
      title="Contact us"
      lead="Tell us about your business and what you'd like to do next."
    />

    <AppSection tone="surface">
      <v-row>
        <v-col cols="12" md="7">
          <ContactForm />
        </v-col>
        <v-col cols="12" md="5">
          <v-card class="pa-6">
            <h2 class="type-subheading mb-2">
              Other ways to reach us
            </h2>
            <ul class="plain-list contact-details type-body">
              <li>
                <v-icon icon="mdi-email-outline" />
                <a :href="`mailto:${site.email}`">{{ site.email }}</a>
              </li>
              <li>
                <v-icon icon="mdi-phone-outline" />
                <a :href="site.phoneHref">{{ site.phoneDisplay }}</a>
              </li>
              <li>
                <v-icon icon="mdi-whatsapp" />
                <a :href="buildWhatsAppLink(site.whatsappNumber)" target="_blank" rel="noopener">Message us on WhatsApp</a>
              </li>
              <li>
                <v-icon icon="mdi-map-marker-outline" />
                <span>{{ site.address }}</span>
              </li>
            </ul>
            <h3 class="font-weight-bold mt-4 mb-2">
              Follow us
            </h3>
            <AppSocialLinks />
          </v-card>
        </v-col>
      </v-row>
    </AppSection>
  </div>
</template>

<style scoped>
.contact-details li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-block: 8px;
}

.contact-details a {
  color: inherit;
  overflow-wrap: anywhere;
  text-underline-offset: 3px;
}
</style>
