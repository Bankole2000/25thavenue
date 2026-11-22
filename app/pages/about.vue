<script setup lang="ts">
import { differences, values } from '~/data/people'

const [site, { data: team }] = await Promise.all([useSite(), useTeam()])
const founder = computed(() => site.value.founder)

usePageSeo('About us', 'Meet 25th Avenue, a creative and business solutions brand helping businesses build, grow and access the funding they need.')
</script>

<template>
  <div>
    <AppPageHero
      page="about"
      title="About 25th Avenue"
      lead="We're a creative and business solutions brand for entrepreneurs and small businesses with big plans."
    />

    <AppSection tone="surface" title="Our story">
      <p class="type-body">
        Add the real story of how 25th Avenue started here. The sample copy below explains why the brand exists.
      </p>
      <p class="type-body mt-4">
        Good businesses often need more than one kind of help: a brand people remember, creative work that gets noticed,
        a plan for growth and sometimes the funds or power to make it all possible. We bring that support together in one place.
      </p>
    </AppSection>

    <AppSection id="founder" :title="founder.name ? `Meet ${founder.name}` : 'Meet our founder'">
      <v-row align="center">
        <v-col cols="12" md="6">
          <div class="founder-photos">
            <img
              src="/images/team/founder.jpg"
              :alt="`${founder.name || 'The founder of 25th Avenue'}, smiling, in a dark suit`"
              class="founder-photos__main"
              width="1000"
              height="1000"
              loading="lazy"
            >
            <img
              src="/images/team/founder-laughing.jpg"
              :alt="`${founder.name || 'The founder of 25th Avenue'}, laughing, in a white shirt and tie`"
              class="founder-photos__inset"
              width="1000"
              height="1000"
              loading="lazy"
            >
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <p v-if="founder.name" class="font-weight-bold text-secondary">
            {{ founder.role }}
          </p>
          <p class="type-lead mt-2">
            25th Avenue is a creative house for building brands and solving real-world business problems.
          </p>
          <p class="type-body text-muted-ink mt-4">
            Our founder started it to turn ambition into workable strategy: understanding a business first,
            then bringing brand, creative, tech and growth support together into one plan.
          </p>
          <v-btn to="/book" color="secondary" size="large" class="mt-8">
            Book a consultation
          </v-btn>
        </v-col>
      </v-row>
    </AppSection>

    <AppSection tone="surface" title="Our company overview" lead="Our capabilities, how we work, selected client work and engagement options, in one document.">
      <AppBrochureButtons />
    </AppSection>

    <AppSection title="Our mission">
      <p class="type-lead">
        To help ambitious businesses look the part, reach the right people and access what they need to grow.
      </p>
      <h3 class="type-subheading mt-10 mb-4">
        Our values
      </h3>
      <v-row>
        <v-col v-for="value in values" :key="value.title" cols="12" md="4">
          <AppFeatureCard v-bind="value" />
        </v-col>
      </v-row>
    </AppSection>

    <AppSection v-if="team.length" tone="surface" title="Meet the team">
      <v-row>
        <v-col v-for="member in team" :key="member.name" cols="12" sm="6" md="4">
          <TeamCard :member="member" />
        </v-col>
      </v-row>
    </AppSection>

    <AppSection title="What makes us different">
      <v-row>
        <v-col v-for="difference in differences" :key="difference.title" cols="12" md="4">
          <AppFeatureCard v-bind="difference" />
        </v-col>
      </v-row>
    </AppSection>

    <AppCtaBand />
  </div>
</template>

<style scoped>
/* The main portrait with a second, smaller one overlapping its corner. */
.founder-photos {
  position: relative;
  max-width: 480px;
  padding: 0 14% 14% 0;
}

.founder-photos img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.founder-photos__inset {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 46% !important;
  border: 4px solid rgb(var(--v-theme-secondary));
  box-shadow: 0 12px 32px rgb(0 0 0 / 45%);
}
</style>
