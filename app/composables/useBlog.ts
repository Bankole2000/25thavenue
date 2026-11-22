// Blog content comes from the WordPress REST API. Like the other CMS content, it's built into the
// pages and refreshed in the browser after load, so new and edited posts show without a rebuild.
// Pages for posts published after the last build are served by the 200.html app shell (see
// public/.htaccess) and load entirely in the browser.

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  categories: string[]
  date: string
  author: string
  // The featured image set in WordPress, full size. Shown at the top of the article.
  image?: { src: string, alt: string }
  // For previews (cards, link previews): the featured image at a card-friendly size, or failing that
  // the first image in the post's content.
  thumbnail?: { src: string, alt: string }
  // Only present when a single post is fetched. This is HTML from WordPress.
  html?: string
}

interface WordPressPost {
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content?: { rendered: string }
  _embedded?: {
    'author'?: { name?: string }[]
    'wp:term'?: { name: string, taxonomy: string }[][]
    'wp:featuredmedia'?: {
      source_url?: string
      alt_text?: string
      media_details?: { sizes?: Record<string, { source_url?: string }> }
    }[]
  }
}

const listFields = 'slug,date,title,excerpt,_links,_embedded'
// Lists also fetch the content, only to find a preview image for posts without a featured image.
const listWithContentFields = `${listFields},content`
const embeds = 'author,wp:term,wp:featuredmedia'
const pageSize = 100

const namedEntities: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: '\'',
  nbsp: ' ',
  hellip: '…',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
}

// WordPress encodes titles and excerpts as HTML, but these are rendered as plain text.
function htmlToText(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
      if (entity[0] !== '#') return namedEntities[entity.toLowerCase()] ?? match
      const isHex = entity[1]?.toLowerCase() === 'x'
      return String.fromCodePoint(Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10))
    })
    .trim()
}

// The first image in a post's HTML, picking a medium-sized version from its srcset when there is one.
function firstContentImage(html: string | undefined, fallbackAlt: string) {
  const tag = html?.match(/<img\b[^>]*>/i)?.[0]
  if (!tag) return undefined
  const attribute = (name: string) => tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1]
  const src = attribute('src')
  if (!src) return undefined
  const candidates = (attribute('srcset') ?? '')
    .split(',')
    .map(part => part.trim().split(/\s+/))
    .map(([url, width]) => ({ url, width: Number.parseInt(width ?? '', 10) }))
    .filter(candidate => candidate.url && candidate.width >= 600)
    .sort((a, b) => a.width - b.width)
  return { src: candidates[0]?.url ?? src, alt: htmlToText(attribute('alt') ?? '') || fallbackAlt }
}

function toBlogPost(post: WordPressPost, includeHtml = true): BlogPost {
  const categories = (post._embedded?.['wp:term'] ?? [])
    .flat()
    .filter(term => term.taxonomy === 'category')
    .map(term => (term.name === 'Uncategorized' ? 'General' : htmlToText(term.name)))
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const title = htmlToText(post.title.rendered)
  const image = media?.source_url ? { src: media.source_url, alt: media.alt_text || title } : undefined
  const sizes = media?.media_details?.sizes
  const cardSrc = sizes?.medium_large?.source_url ?? sizes?.large?.source_url ?? media?.source_url

  return {
    slug: post.slug,
    title,
    excerpt: htmlToText(post.excerpt.rendered),
    category: categories[0] ?? 'General',
    categories: categories.length ? categories : ['General'],
    date: post.date.slice(0, 10),
    author: htmlToText(post._embedded?.author?.[0]?.name ?? '25th Avenue team'),
    image,
    thumbnail: image && cardSrc ? { src: cardSrc, alt: image.alt } : firstContentImage(post.content?.rendered, title),
    html: includeHtml ? post.content?.rendered : undefined,
  }
}

function usePostsEndpoint() {
  return useCmsApiUrl('/wp/v2/posts')
}

// All published posts, newest first, without their full content.
export function useBlogPosts() {
  const endpoint = usePostsEndpoint()

  return useLiveData('blog-posts', async () => {
    const posts: WordPressPost[] = []
    let page = 1
    let totalPages = 1
    do {
      const response = await $fetch.raw<WordPressPost[]>(endpoint, {
        query: { per_page: pageSize, page, _fields: listWithContentFields, _embed: embeds },
      })
      posts.push(...(response._data ?? []))
      totalPages = Number(response.headers.get('X-WP-TotalPages') ?? 1)
      page++
    } while (page <= totalPages)
    return posts.map(post => toBlogPost(post, false))
  })
}

// One post with its full content, or null when the slug doesn't exist.
export function useBlogPost(slug: string) {
  const endpoint = usePostsEndpoint()

  return useLiveData(`blog-post-${slug}`, async () => {
    const [post] = await $fetch<WordPressPost[]>(endpoint, {
      query: { slug, _fields: `${listFields},content`, _embed: embeds },
    })
    return post ? toBlogPost(post) : null
  })
}
