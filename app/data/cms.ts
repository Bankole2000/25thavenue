// Shapes of the content served by the 25th Avenue WordPress plugin (wp-plugin/25th-avenue).
// Staff edit this content in WP Admin under the "25th Avenue" menu.

export interface CmsImage {
  src: string
  alt: string
}

export interface ServiceGroup {
  title: string
  items: string[]
}

export interface Faq {
  question: string
  answer: string
}

export interface Service {
  // The service's slug, used in links such as /services#brand-creation and /book?service=brand-creation.
  id: string
  title: string
  summary: string
  description: string
  // A Material Design icon name, e.g. "mdi-web". Ignored when iconImage is set.
  icon: string
  iconImage?: CmsImage
  groups: ServiceGroup[]
  processTitle: string
  process: string[]
  faqs?: Faq[]
}

export interface Project {
  id: string
  client: string
  // Slug of the project's service, or "" if none is set.
  serviceId: string
  serviceTitle: string
  brief: string
  deliverables: string[]
  outcome: string
  tags: string[]
  featured: boolean
  hasBeforeAfter: boolean
  image?: CmsImage
  beforeImage?: CmsImage
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  url?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: CmsImage
  url?: string
}

export interface Video {
  id: string
  title: string
  summary: string
  // "" while the video isn't out yet; the card then shows "Coming soon".
  url: string
  // Set when url is a YouTube link, so the video can play on the page. "" for other links.
  youtubeId: string
  featured: boolean
  // Overrides the YouTube thumbnail.
  preview?: CmsImage
}

export interface SocialLink {
  name: string
  icon: string
  url: string
}

// Pages that can have a header image, set in 25th Avenue → Site details.
export type HeroPage = 'home' | 'about' | 'services' | 'work' | 'blog' | 'videos' | 'contact' | 'book'

// Site details from 25th Avenue → Site details.
export interface SiteSettings {
  heroImages: Partial<Record<HeroPage, CmsImage>>
  email: string
  phoneDisplay: string
  phoneHref: string
  whatsappNumber: string
  address: string
  calendlyUrl: string
  socials: SocialLink[]
  appointmentTimes: string[]
}

// What the contact form and booking flow send to POST /enquiries.
export interface EnquiryPayload {
  type: 'contact' | 'booking'
  name: string
  email: string
  phone: string
  // Titles of the services the visitor is interested in. Required for bookings, optional for messages.
  services?: string[]
  message?: string
  preferred_date?: string
  preferred_time?: string
  // Honeypot. Real visitors never see or fill it in.
  company_website?: string
}
