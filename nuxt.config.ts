import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      cmsUrl: 'https://cms.25thavenuecreative.com', // override with NUXT_PUBLIC_CMS_URL
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#0f0f0f' }],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,      // follow <NuxtLink>s from the homepage
      failOnError: false,    // don't kill the build over one bad link
    },
  },

   hooks: {
    // Add every blog post slug, even ones nothing links to
    async 'prerender:routes'(ctx) {
      const cms = process.env.NUXT_PUBLIC_CMS_URL || 'https://cms.25thavenuecreative.com'
      // WordPress answers unknown routes with an error object rather than a list.
      // "?rest_route=" works whether or not the CMS uses pretty permalinks.
      const get = async (path: string): Promise<{ slug: string }[]> => {
        const [route, query] = path.split('?')
        const response = await fetch(`${cms}/?rest_route=/wp/v2/${route}&${query}`)
        const data = await response.json()
        if (response.ok && Array.isArray(data)) return data
        console.warn(`[prerender] Skipping "${path}": CMS returned ${response.status} (${data?.code ?? 'unexpected response'})`)
        return []
      }

      const posts = await get('posts?per_page=100&_fields=slug')
      posts.forEach((p: { slug: string }) => ctx.routes.add(`/blog/${p.slug}`))
    },
  },

  modules: ['@nuxtjs/leaflet', '@nuxtjs/seo', 'dragon-editor', '@nuxt/icon/module', '@nuxt/image', '@nuxt/fonts'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  // Placeholder domain taken from the PRD's preferred Nigerian TLD. Confirm before launch.
  site: {
    url: 'https://25thavenue.ng',
    name: '25th Avenue',
    description: 'Brand creation, creative solutions, business growth and financing assistance for ambitious businesses.',
    defaultLocale: 'en',
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: '25th Avenue',
      url: 'https://25thavenue.ng',
    },
  },
  ogImage: { enabled: false },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
