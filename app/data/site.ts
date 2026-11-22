// Business details used across the site. Read them with useSite(), not directly.
// Contact details, socials, appointment times and the Calendly link are managed in WordPress
// (25th Avenue → Site details). The values below are only used when that field is left blank there.
import type { CmsImage, HeroPage } from './cms'

export const site = {
  name: '25th Avenue',
  tagline: 'Boulevard of Dreams',
  valueProposition: 'Brand, creative, tech, growth and financing support for businesses ready for their next stage.',
  url: 'https://25thavenue.ng',
  email: '25thavenuecreative@gmail.com',
  phoneDisplay: '+234 913 532 9678',
  phoneHref: 'tel:+2349135329678',
  // Digits only, including the country code, as wa.me requires.
  whatsappNumber: '2349135329678',
  address: 'Otoba close, Niyi Isola estate, elebu, Akala express, Ibadan, oyo state, Nigeria',
  // Add a Calendly scheduling link to replace the built-in booking request form.
  calendlyUrl: '',
  // These point at each network's home page until the real profile links are known.
  // Remove any channel the business doesn't actively use.
  socials: [
    { name: 'Instagram', icon: 'mdi-instagram', url: 'https://www.instagram.com/the_25thavenue' },
    { name: 'Facebook', icon: 'mdi-facebook', url: 'https://www.facebook.com/25thaveune' },
    // { name: 'LinkedIn', icon: 'mdi-linkedin', url: 'https://www.linkedin.com/' },
    { name: 'TikTok', icon: 'mdi-music-note', url: 'https://www.tiktok.com/@25th.avenue7' },
    { name: 'YouTube', icon: 'mdi-youtube', url: 'https://youtube.com/@25thavenuecreative' },
    { name: 'X (Twitter)', icon: 'mdi-twitter', url: 'https://x.com/25thavenue01' },
  ],
  // Preferred appointment times offered in the booking form. These aren't live availability.
  // Page header images. These only come from WordPress.
  heroImages: {} as Partial<Record<HeroPage, CmsImage>>,
  appointmentTimes: ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM'],
  // The company overview PDF in public/files. Replace the file (same name) to update it.
  brochure: {
    url: '/files/25th-avenue-corporate-portfolio-2026.pdf',
    fileName: '25th Avenue - Corporate Portfolio 2026.pdf',
    size: '2.8 MB',
  },
  // Shown in "Meet our founder" on the About page. Add the founder's name to show it there.
  founder: {
    name: '',
    role: 'Founder, 25th Avenue',
  },
}

export const navigation = [
  { title: 'About', to: '/about' },
  { title: 'Services', to: '/services' },
  { title: 'Work', to: '/work' },
  { title: 'Blog', to: '/blog' },
  { title: 'Videos', to: '/videos' },
  { title: 'Contact', to: '/contact' },
]
