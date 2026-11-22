<script setup lang="ts">
import { site } from '~/data/site'

usePageSeo(`${site.name}: ${site.tagline}`, site.valueProposition)

const [{ data: services }, { data: projects }, { data: testimonials }, { data: videos }] = await Promise.all([
  useServices(),
  useProjects(),
  useTestimonials(),
  useVideos(),
])
const featuredProjects = computed(() => projects.value.filter(project => project.featured))
const featuredVideos = computed(() => videos.value.filter(video => video.featured))

const { data: posts } = await useBlogPosts()
const latestPosts = computed(() => (posts.value ?? []).slice(0, 3))
</script>

<template>
  <div>
    <HomeHero />

    <AppSection v-if="services.length" tone="surface" title="What we do" lead="The ways we help your business move forward.">
      <v-row>
        <v-col v-for="service in services" :key="service.id" cols="12" sm="6" :md="services.length % 3 === 0 ? 4 : 6">
          <ServiceCard :service="service" />
        </v-col>
      </v-row>
    </AppSection>

    <AppSection v-if="featuredProjects.length" title="Featured work">
      <v-row>
        <v-col v-for="project in featuredProjects" :key="project.id" cols="12" md="4">
          <WorkCard :project="project" />
        </v-col>
      </v-row>
      <v-btn to="/work" variant="outlined" size="large" class="mt-8">
        See all work
      </v-btn>
    </AppSection>

    <AppSection v-if="testimonials.length" tone="surface" title="What clients say">
      <v-row>
        <v-col v-for="testimonial in testimonials" :key="testimonial.quote" cols="12" md="4">
          <TestimonialCard :testimonial="testimonial" />
        </v-col>
      </v-row>
    </AppSection>

    <AppSection v-if="featuredVideos.length" title="Watch">
      <v-row>
        <v-col v-for="video in featuredVideos" :key="video.id" cols="12" md="6">
          <VideoCard :video="video" />
        </v-col>
      </v-row>
      <v-btn to="/videos" variant="outlined" size="large" class="mt-8">
        See all videos
      </v-btn>
    </AppSection>

    <AppSection v-if="latestPosts.length" tone="surface" title="From the blog">
      <v-row>
        <v-col v-for="post in latestPosts" :key="post.slug" cols="12" md="4">
          <BlogCard :post="post" />
        </v-col>
      </v-row>
      <v-btn to="/blog" variant="outlined" size="large" class="mt-8">
        Read all articles
      </v-btn>
    </AppSection>

    <AppCtaBand />
  </div>
</template>
