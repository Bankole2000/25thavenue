<script setup lang="ts">
const [site, { data: services }] = await Promise.all([useSite(), useServices()])
const { send, sending, error, fieldErrors } = useEnquiry()

const form = ref()
const name = ref('')
const email = ref('')
const phone = ref('')
// Ids of the services the visitor is interested in. Optional: none means they're not sure yet.
const interests = ref<string[]>([])
const message = ref('')
// Honeypot: hidden from people, so only bots fill it in.
const companyWebsite = ref('')
const sent = ref(false)

// In the order the services are listed, whatever order they were picked in.
const interestTitles = computed(() => services.value
  .filter(item => interests.value.includes(item.id))
  .map(item => item.title))

const required = (value: string) => !!value?.trim() || 'Enter this detail to continue.'
const validEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value ?? '') || 'Enter an email address like name@example.com.'

const composedMessage = computed(() => [
  message.value.trim(),
  '',
  `Name: ${name.value}`,
  `Email: ${email.value}`,
  `Phone: ${phone.value}`,
  `Services of interest: ${interestTitles.value.length ? interestTitles.value.join(', ') : 'Not sure yet'}`,
].join('\n'))

async function submit() {
  const { valid } = await form.value.validate()
  if (!valid) return

  const ok = await send({
    type: 'contact',
    name: name.value,
    email: email.value,
    phone: phone.value,
    services: interestTitles.value,
    message: message.value,
    company_website: companyWebsite.value,
  })
  if (ok) {
    sent.value = true
    form.value.reset()
    interests.value = []
  }
}

async function sendOnWhatsApp() {
  const { valid } = await form.value.validate()
  if (valid) window.open(buildWhatsAppLink(site.value.whatsappNumber, composedMessage.value), '_blank', 'noopener')
}
</script>

<template>
  <v-card class="pa-6">
    <h2 class="type-subheading mb-6">
      Send us a message
    </h2>

    <v-alert v-if="sent" type="success" variant="tonal" class="mb-6" closable @click:close="sent = false">
      Thanks, we've received your message and will be in touch soon.
    </v-alert>

    <v-form ref="form" @submit.prevent="submit">
      <v-text-field v-model="name" label="Full name" autocomplete="name" :rules="[required]" :error-messages="fieldErrors.name" />
      <v-text-field v-model="email" label="Email" type="email" autocomplete="email" :rules="[required, validEmail]" :error-messages="fieldErrors.email" />
      <v-text-field v-model="phone" label="Phone number" type="tel" autocomplete="tel" :rules="[required]" :error-messages="fieldErrors.phone" />
      <v-select
        v-model="interests"
        label="Services you're interested in (optional)"
        :items="services"
        item-title="title"
        item-value="id"
        hint="Choose any that apply, or leave it blank if you're not sure yet."
        persistent-hint
        multiple
        chips
        closable-chips
        class="mb-4"
      />
      <v-textarea v-model="message" label="Your message" rows="4" :rules="[required]" :error-messages="fieldErrors.message" />

      <div class="contact-form__trap" aria-hidden="true">
        <label for="contact-company-website">Leave this field empty</label>
        <input id="contact-company-website" v-model="companyWebsite" type="text" name="company_website" tabindex="-1" autocomplete="off">
      </div>

      <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
        {{ error }}
      </v-alert>

      <div class="d-flex flex-wrap ga-3">
        <v-btn type="submit" color="primary" size="large" prepend-icon="mdi-send-outline" :loading="sending">
          Send message
        </v-btn>
        <v-btn variant="outlined" size="large" prepend-icon="mdi-whatsapp" @click="sendOnWhatsApp">
          Send on WhatsApp instead
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style scoped>
.contact-form__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
