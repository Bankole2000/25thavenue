// Sets the title, description and social-sharing tags for a page.
export function usePageSeo(title: string, description: string, image?: string) {
  useHead({ htmlAttrs: { lang: 'en' } })
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage: image,
  })
}
