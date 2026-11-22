<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlog'

const route = useRoute()
const slug = String(route.params.slug)

const [{ data, error }, { data: allPosts }] = await Promise.all([
  useBlogPost(slug),
  useBlogPosts(),
])

if (error.value) {
  throw createError({ statusCode: 503, statusMessage: 'Article could not be loaded', fatal: true })
}

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

// The built post, until the browser fetches the latest version from WordPress.
const initialPost = data.value
const post = computed(() => data.value ?? initialPost)

// Unpublished or deleted since the last build.
watch(data, (latest) => {
  if (latest === null) showError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
})

usePageSeo(initialPost.title, initialPost.excerpt, initialPost.image?.src ?? initialPost.thumbnail?.src)

useSchemaOrg([
  defineArticle({
    headline: initialPost.title,
    description: initialPost.excerpt,
    datePublished: initialPost.date,
    image: initialPost.image?.src ?? initialPost.thumbnail?.src,
    author: { name: initialPost.author },
  }),
])

// Prefer articles in the same category, then fill up with the newest others.
const relatedPosts = computed(() => {
  const otherPosts = (allPosts.value ?? []).filter(item => item.slug !== post.value.slug)
  const shared = (item: BlogPost) => item.categories.some(name => post.value.categories.includes(name))
  return [...otherPosts.filter(shared), ...otherPosts.filter(item => !shared(item))].slice(0, 3)
})
</script>

<template>
  <div>
    <article>
      <AppPageHero page="blog" :title="post.title" :lead="post.excerpt">
        <div class="d-flex flex-wrap align-center ga-3 mt-6">
          <v-chip color="secondary" variant="tonal">
            {{ post.category }}
          </v-chip>
          <span class="text-muted-ink">{{ formatPostDate(post.date) }}, by {{ post.author }}</span>
        </div>
      </AppPageHero>

      <AppSection tone="surface">
        <v-img
          v-if="post.image"
          :src="post.image.src"
          :alt="post.image.alt"
          :aspect-ratio="16 / 9"
          cover
          rounded="lg"
          class="mb-8"
        />
        <!-- Content comes from the team's own WordPress site, so it's trusted as HTML. -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="article-body type-body" v-html="post.html" />
        <BlogShareLinks :title="post.title" :path="route.path" class="mt-10" />
      </AppSection>
    </article>

    <AppSection v-if="relatedPosts.length" title="Related articles">
      <v-row>
        <v-col v-for="item in relatedPosts" :key="item.slug" cols="12" md="4">
          <BlogCard :post="item" />
        </v-col>
      </v-row>
    </AppSection>

    <AppCtaBand />
  </div>
</template>

<style scoped>
/* WordPress supplies this markup, so the styles need :deep to reach it. */
.article-body :deep(> * + *) {
  margin-top: 16px;
}

.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  margin-top: 32px;
  font-weight: 800;
  line-height: 1.2;
}

.article-body :deep(h2) {
  font-size: 1.75rem;
}

.article-body :deep(h3) {
  font-size: 1.375rem;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 1.25rem;
}

.article-body :deep(li) {
  padding-block: 4px;
}

.article-body :deep(a) {
  color: rgb(var(--v-theme-secondary));
  text-underline-offset: 3px;
}

.article-body :deep(img),
.article-body :deep(video),
.article-body :deep(iframe) {
  max-width: 100%;
}

.article-body :deep(img) {
  height: auto;
  border-radius: 0px;
}

.article-body :deep(figure) {
  margin-inline: 0;
}

.article-body :deep(figcaption) {
  margin-top: 8px;
  color: rgb(var(--v-theme-muted));
  font-size: 0.9375rem;
}

.article-body :deep(blockquote) {
  margin-inline: 0;
  padding-left: 16px;
  border-left: 4px solid rgb(var(--v-theme-secondary));
}

/* Wrap rather than scroll, because WordPress code blocks can't take keyboard focus. */
.article-body :deep(pre) {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
</style>
