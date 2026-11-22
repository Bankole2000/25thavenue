// Content from the 25th Avenue WordPress plugin.
//
// Content is loaded twice:
// 1. At build time, so every page ships with its content already in the HTML (good for search
//    engines and link previews, and the page still works if WordPress is slow or down).
// 2. In the visitor's browser once the page has loaded, so edits made in WordPress show up
//    straight away without rebuilding the site. If that request fails, the built-in content stays.

import type { EnquiryPayload, Project, Service, SiteSettings, TeamMember, Testimonial, Video } from '~/data/cms'
import { site as siteDefaults } from '~/data/site'

// A WordPress REST API URL. "?rest_route=" works whether or not the CMS uses pretty permalinks.
export function useCmsApiUrl(route: string) {
  return `${useRuntimeConfig().public.cmsUrl}/?rest_route=${route}`
}

// Content fetched in this browser session, kept so it survives moving between pages. Without this,
// each page would fall back to the content that was current at build time.
const latest = new Map<string, unknown>()
const refreshing = new Set<string>()

// Nuxt's usual cache lookup, except content fetched in the browser takes priority.
function latestOrCached(key: string, nuxtApp: ReturnType<typeof useNuxtApp>, context: { cause?: string }) {
  if (latest.has(key)) return latest.get(key)
  if (nuxtApp.isHydrating) return nuxtApp.payload.data[key]
  if (context.cause !== 'refresh:manual' && context.cause !== 'refresh:hook') return nuxtApp.static.data[key]
}

const emptyList = () => []
const emptyObject = () => ({})

// Content built into the page, then replaced with the latest from the CMS once the page has loaded
// (once per browser session and key). If the refresh fails, the built content stays.
// Without a fallback, a failed load at build time leaves `error` set for the page to handle.
export async function useLiveData<T>(key: string, fetcher: () => Promise<T>, fallback?: () => T) {
  const result = useAsyncData<T>(key, fallback
    ? () => fetcher().catch((error: Error) => {
        console.warn(`[cms] Couldn't load ${key}: ${error.message}`)
        return fallback()
      })
    : fetcher, { default: fallback, getCachedData: latestOrCached })

  if (import.meta.client && !latest.has(key) && !refreshing.has(key)) {
    refreshing.add(key)
    onNuxtReady(async () => {
      try {
        const fresh = await fetcher()
        latest.set(key, fresh)
        result.data.value = fresh
        result.error.value = undefined
      }
      catch (error) {
        console.warn(`[cms] Couldn't refresh ${key}, showing the content from the last build: ${(error as Error).message}`)
      }
      finally {
        refreshing.delete(key)
      }
    })
  }

  return await result
}

function useCmsData<T>(key: string, route: string, fallback: () => T) {
  const url = useCmsApiUrl(route)
  return useLiveData<T>(key, () => $fetch<T>(url), fallback)
}

export const useServices = () => useCmsData<Service[]>('cms-services', '/25a/v1/services', emptyList)
export const useProjects = () => useCmsData<Project[]>('cms-projects', '/25a/v1/projects', emptyList)
export const useTestimonials = () => useCmsData<Testimonial[]>('cms-testimonials', '/25a/v1/testimonials', emptyList)
export const useTeam = () => useCmsData<TeamMember[]>('cms-team', '/25a/v1/team', emptyList)
export const useVideos = () => useCmsData<Video[]>('cms-videos', '/25a/v1/videos', emptyList)

// Site details, where anything left blank in WordPress falls back to the value in data/site.ts.
export async function useSite() {
  const { data } = await useCmsData<Partial<SiteSettings>>('cms-settings', '/25a/v1/settings', emptyObject)

  return computed(() => {
    const merged = { ...siteDefaults }
    for (const [key, value] of Object.entries(data.value ?? {})) {
      const filled = Array.isArray(value)
        ? value.length > 0
        : value && typeof value === 'object' ? Object.keys(value).length > 0 : Boolean(value)
      if (filled && key in merged) Object.assign(merged, { [key]: value })
    }
    return merged
  })
}

// Sends the contact form or a booking request to the CMS.
export function useEnquiry() {
  const url = useCmsApiUrl('/25a/v1/enquiries')
  const sending = ref(false)
  const error = ref('')
  const fieldErrors = ref<Record<string, string>>({})

  async function send(payload: EnquiryPayload) {
    sending.value = true
    error.value = ''
    fieldErrors.value = {}
    try {
      await $fetch(url, { method: 'POST', body: payload })
      return true
    }
    catch (caught) {
      const response = (caught as { data?: { message?: string, data?: { fields?: Record<string, string> } } }).data
      fieldErrors.value = response?.data?.fields ?? {}
      error.value = response?.message && !response.data?.fields
        ? response.message
        : Object.keys(fieldErrors.value).length
          ? 'Some details need correcting. Check the highlighted fields.'
          : 'We couldn\'t send your message. Check your connection and try again, or message us on WhatsApp.'
      return false
    }
    finally {
      sending.value = false
    }
  }

  return { send, sending, error, fieldErrors }
}
