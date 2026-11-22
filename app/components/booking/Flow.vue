<script setup lang="ts">
const [site, { data: services }] = await Promise.all([useSite(), useServices()])
const { send, sending, error, fieldErrors } = useEnquiry()

const route = useRoute()

const step = ref(1)
// Ids of the services the visitor wants to discuss, in the order they're listed.
const chosen = ref<string[]>([])
const chosenTitles = computed(() => services.value
  .filter(item => chosen.value.includes(item.id))
  .map(item => item.title))

// A "Book a consultation" link on a service can pre-tick it (/book?service=brand-creation).
// Prerendered pages have no query string, so read it once the page is live in the browser.
onMounted(() => {
  const requested = String(route.query.service ?? '')
  if (services.value.some(item => item.id === requested)) chosen.value = [requested]
})

const date = ref<Date | null>(null)
const time = ref('')
const name = ref('')
const email = ref('')
const phone = ref('')
const notes = ref('')
// Honeypot: hidden from people, so only bots fill it in.
const companyWebsite = ref('')
const sent = ref(false)
const detailsForm = ref()
const today = new Date()

const stepTitles = ['Services', 'Date and time', 'Your details', 'Send request']

const required = (value: string) => !!value?.trim() || 'Enter this detail to continue.'
const validEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value ?? '') || 'Enter an email address like name@example.com.'

const dateLabel = computed(() => date.value
  ? new Date(date.value).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  : '')

const message = computed(() => [
  'Hello 25th Avenue, I\'d like to book a consultation.',
  '',
  `Services: ${chosenTitles.value.join(', ')}`,
  `Preferred time: ${dateLabel.value}, ${time.value}`,
  `Name: ${name.value}`,
  `Email: ${email.value}`,
  `Phone: ${phone.value}`,
  ...(notes.value.trim() ? [`Notes: ${notes.value.trim()}`] : []),
].join('\n'))

const whatsAppLink = computed(() => buildWhatsAppLink(site.value.whatsappNumber, message.value))

// The date picker gives a Date at local midnight. Send the calendar date the visitor picked, not a UTC shift of it.
function isoDate(value: Date) {
  const pad = (number: number) => String(number).padStart(2, '0')
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
}

async function sendRequest() {
  if (!date.value) return
  const ok = await send({
    type: 'booking',
    name: name.value,
    email: email.value,
    phone: phone.value,
    services: chosenTitles.value,
    preferred_date: isoDate(new Date(date.value)),
    preferred_time: time.value,
    message: notes.value.trim(),
    company_website: companyWebsite.value,
  })
  if (ok) {
    sent.value = true
  }
  else if (fieldErrors.value.services) {
    step.value = 1
  }
  else if (Object.keys(fieldErrors.value).some(field => ['name', 'email', 'phone'].includes(field))) {
    step.value = 3
  }
}

async function submitDetails() {
  const { valid } = await detailsForm.value.validate()
  if (valid) step.value = 4
}
</script>

<template>
  <v-stepper v-model="step" :items="stepTitles" hide-actions flat border rounded="lg" mobile-breakpoint="md">
    <template #item.1>
      <fieldset class="booking-flow__services">
        <legend class="type-subheading mb-1">
          What would you like to talk about?
        </legend>
        <p class="text-muted-ink mb-4">
          Choose as many as you like.
        </p>
        <v-checkbox
          v-for="item in services"
          :key="item.id"
          v-model="chosen"
          :label="item.title"
          :value="item.id"
          density="compact"
          hide-details
        />
      </fieldset>
      <v-alert v-if="fieldErrors.services" type="error" variant="tonal" class="mt-4">
        {{ fieldErrors.services }}
      </v-alert>
      <v-btn color="primary" size="large" class="mt-6" :disabled="!chosen.length" @click="step = 2">
        Continue
      </v-btn>
    </template>

    <template #item.2>
      <h2 class="type-subheading mb-4">
        When would suit you?
      </h2>
      <v-row>
        <v-col cols="12" md="7">
          <v-date-picker
            v-model="date"
            :min="today"
            hide-header
            width="100%"
            max-width="420"
            color="primary"
          />
        </v-col>
        <v-col cols="12" md="5">
          <h3 class="font-weight-bold mb-2">
            Preferred time
          </h3>
          <v-chip-group v-model="time" column selected-class="bg-primary">
            <v-chip
              v-for="slot in site.appointmentTimes"
              :key="slot"
              :value="slot"
              variant="outlined"
            >
              {{ slot }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <div class="d-flex flex-wrap ga-3 mt-6">
        <v-btn variant="outlined" size="large" @click="step = 1">
          Back
        </v-btn>
        <v-btn color="primary" size="large" :disabled="!date || !time" @click="step = 3">
          Continue
        </v-btn>
      </div>
    </template>

    <template #item.3>
      <h2 class="type-subheading mb-4">
        How can we reach you?
      </h2>
      <v-form ref="detailsForm" @submit.prevent="submitDetails">
        <v-text-field v-model="name" label="Full name" autocomplete="name" :rules="[required]" :error-messages="fieldErrors.name" />
        <v-text-field v-model="email" label="Email" type="email" autocomplete="email" :rules="[required, validEmail]" :error-messages="fieldErrors.email" />
        <v-text-field v-model="phone" label="Phone number" type="tel" autocomplete="tel" :rules="[required]" :error-messages="fieldErrors.phone" />
        <v-textarea v-model="notes" label="Anything we should know? (optional)" rows="3" />
        <div class="booking-flow__trap" aria-hidden="true">
          <label for="booking-company-website">Leave this field empty</label>
          <input id="booking-company-website" v-model="companyWebsite" type="text" name="company_website" tabindex="-1" autocomplete="off">
        </div>
        <div class="d-flex flex-wrap ga-3 mt-2">
          <v-btn variant="outlined" size="large" @click="step = 2">
            Back
          </v-btn>
          <v-btn type="submit" color="primary" size="large">
            Review request
          </v-btn>
        </div>
      </v-form>
    </template>

    <template #item.4>
      <template v-if="sent">
        <v-alert type="success" variant="tonal" title="Request sent">
          Thanks, {{ name.split(' ')[0] }}. We've received your request for {{ dateLabel }} at {{ time }}.
          We'll contact you by email or phone to confirm your appointment.
        </v-alert>
        <v-btn to="/" variant="outlined" size="large" class="mt-6">
          Back to the home page
        </v-btn>
      </template>

      <template v-else>
        <h2 class="type-subheading mb-4">
          Check and send your request
        </h2>
        <dl class="booking-flow__summary type-body">
          <dt>{{ chosenTitles.length === 1 ? 'Service' : 'Services' }}</dt>
          <dd>{{ chosenTitles.join(', ') }}</dd>
          <dt>Preferred time</dt>
          <dd>{{ dateLabel }}, {{ time }}</dd>
          <dt>Name</dt>
          <dd>{{ name }}</dd>
          <dt>Email</dt>
          <dd>{{ email }}</dd>
          <dt>Phone</dt>
          <dd>{{ phone }}</dd>
        </dl>
        <v-alert type="info" variant="tonal" class="my-6">
          Your appointment is confirmed once we reply.
        </v-alert>
        <v-alert v-if="error" type="error" variant="tonal" class="mb-6">
          {{ error }}
        </v-alert>
        <div class="d-flex flex-wrap ga-3">
          <v-btn variant="outlined" size="large" :disabled="sending" @click="step = 3">
            Back
          </v-btn>
          <v-btn color="primary" size="large" prepend-icon="mdi-send-outline" :loading="sending" @click="sendRequest">
            Send request
          </v-btn>
          <v-btn :href="whatsAppLink" target="_blank" rel="noopener" variant="outlined" size="large" prepend-icon="mdi-whatsapp">
            Send on WhatsApp instead
          </v-btn>
        </div>
      </template>
    </template>
  </v-stepper>
</template>

<style scoped>
.booking-flow__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.booking-flow__services {
  border: 0;
  margin: 0;
  padding: 0;
}

.booking-flow__summary dt {
  margin-top: 12px;
  font-weight: 800;
}

.booking-flow__summary dd {
  margin: 0;
  color: rgb(var(--v-theme-muted));
  overflow-wrap: anywhere;
}
</style>
