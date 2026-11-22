<script setup lang="ts">
const [site, { data: videos }] = await Promise.all([useSite(), useVideos()])

usePageSeo('Videos', 'Watch videos from 25th Avenue on branding, creative work, business growth and financing.')

const channel = site.value.socials.find(social => social.name === 'YouTube')
</script>

<template>
  <div>
    <AppPageHero
      page="videos"
      title="Videos"
      lead="Ideas and advice for building your brand and growing your business."
    >
      <v-btn
        v-if="channel"
        :href="channel.url"
        target="_blank"
        rel="noopener"
        prepend-icon="mdi-youtube"
        color="primary"
        size="large"
        class="mt-8"
      >
        Visit our YouTube channel
      </v-btn>
    </AppPageHero>

    <AppSection tone="surface">
      <v-row v-if="videos.length">
        <v-col v-for="video in videos" :key="video.id" cols="12" md="6">
          <VideoCard :video="video" />
        </v-col>
      </v-row>
      <p v-else class="type-lead text-muted-ink">
        New videos are on the way. Check back soon<template v-if="channel">, or visit our YouTube channel in the meantime</template>.
      </p>
    </AppSection>

    <AppCtaBand />
  </div>
</template>
