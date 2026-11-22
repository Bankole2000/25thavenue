<script setup lang="ts">
usePageSeo('Blog', 'Practical articles on branding, business growth, financing and creative work from 25th Avenue.')

const { data, error } = await useBlogPosts()
const posts = computed(() => data.value ?? [])

const categories = computed(() => [...new Set(posts.value.flatMap(post => post.categories))].sort())

const category = ref('All')
const search = ref<string | null>('')

const visiblePosts = computed(() => {
  const term = (search.value ?? '').trim().toLowerCase()
  return posts.value.filter((post) => {
    const inCategory = category.value === 'All' || post.categories.includes(category.value)
    const matchesSearch = !term || `${post.title} ${post.excerpt}`.toLowerCase().includes(term)
    return inCategory && matchesSearch
  })
})

function clearFilters() {
  category.value = 'All'
  search.value = ''
}
</script>

<template>
  <div>
    <AppPageHero
      page="blog"
      title="Blog"
      lead="Practical advice for building a stronger brand and a healthier business."
    />

    <AppSection tone="surface">
      <v-alert v-if="error" type="error" variant="tonal">
        Articles couldn't be loaded. Reload the page or try again later.
      </v-alert>

      <p v-else-if="!posts.length" class="type-body">
        No articles have been published yet. Check back soon.
      </p>

      <template v-else>
        <v-text-field
          v-model="search"
          label="Search articles"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          class="blog-search"
        />
        <v-chip-group v-model="category" mandatory column selected-class="bg-primary" class="mt-4" aria-label="Filter by category">
          <v-chip value="All" variant="outlined">
            All
          </v-chip>
          <v-chip
            v-for="item in categories"
            :key="item"
            :value="item"
            variant="outlined"
          >
            {{ item }}
          </v-chip>
        </v-chip-group>

        <v-row v-if="visiblePosts.length" class="mt-4">
          <v-col v-for="post in visiblePosts" :key="post.slug" cols="12" sm="6" md="4">
            <BlogCard :post="post" />
          </v-col>
        </v-row>
        <div v-else class="mt-8" role="status">
          <p class="type-body mb-4">
            No articles match your search. Try another word or category.
          </p>
          <v-btn variant="outlined" @click="clearFilters">
            Clear search and filters
          </v-btn>
        </div>
      </template>
    </AppSection>
  </div>
</template>

<style scoped>
.blog-search {
  max-width: 520px;
}
</style>
