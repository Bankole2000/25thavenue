export interface Value {
  title: string
  text: string
  icon: string
}

// Testimonials and team members are managed in WordPress (25th Avenue menu). See useTestimonials() and useTeam().

export const values: Value[] = [
  { title: 'Ambition', text: 'We take big goals seriously, whatever size your business is today.', icon: 'mdi-flag-outline' },
  { title: 'Craft', text: 'We care about the details, because customers notice them.', icon: 'mdi-pencil-ruler' },
  { title: 'Honesty', text: 'We give you straight advice and clear terms before you commit.', icon: 'mdi-handshake-outline' },
]

export const differences: Value[] = [
  { title: 'Everything in one place', text: 'Brand, creative work and growth strategy from one team that knows your business.', icon: 'mdi-view-grid-outline' },
  { title: 'Financing as well as ideas', text: 'We also help businesses access power and expansion funds, with flexible payment plans.', icon: 'mdi-solar-power' },
  { title: 'Built for your stage', text: 'We focus on entrepreneurs and small businesses that are building or rebranding.', icon: 'mdi-sprout-outline' },
]
