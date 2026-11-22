export type PostBlock =
  | { type: 'paragraph', text: string }
  | { type: 'heading', text: string }
  | { type: 'list', items: string[] }
  | { type: 'image', caption: string }

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  blocks: PostBlock[]
}

export const postCategories = ['Branding', 'Business Growth', 'Financing', 'Creative', 'General']

// Sample seed articles. Review or replace these before publishing.
export const posts: Post[] = [
  {
    slug: 'when-to-rebrand-your-business',
    title: 'When to rebrand your business',
    excerpt: 'Five signs your brand no longer matches the business you\'ve built.',
    category: 'Branding',
    date: '2026-10-28',
    author: '25th Avenue team',
    blocks: [
      { type: 'paragraph', text: 'A rebrand costs time and money, so it should solve a real problem. These are the signs that it\'s worth doing.' },
      { type: 'heading', text: 'Signs it may be time' },
      { type: 'list', items: ['You now serve different customers', 'Your name or logo is easily confused with a competitor', 'Your materials look different on every channel', 'You feel the need to apologise for your website', 'Your prices have grown, but your brand hasn\'t'] },
      { type: 'image', caption: 'Placeholder for an article image' },
      { type: 'heading', text: 'Start with the reason' },
      { type: 'paragraph', text: 'Write down what you want the rebrand to change. If the answer is only that you\'re tired of the logo, a smaller refresh may be enough.' },
    ],
  },
  {
    slug: 'writing-a-one-page-growth-plan',
    title: 'Writing a one-page growth plan',
    excerpt: 'A short plan you\'ll keep using beats a long one you\'ll never open.',
    category: 'Business Growth',
    date: '2026-10-14',
    author: '25th Avenue team',
    blocks: [
      { type: 'paragraph', text: 'A growth plan doesn\'t need to be long. It needs to tell your team what matters most for the next twelve months.' },
      { type: 'heading', text: 'What to include' },
      { type: 'list', items: ['Where the business stands today', 'One main goal for the year', 'Three actions that lead to that goal', 'Who owns each action'] },
      { type: 'paragraph', text: 'Review the page every month. If an action no longer helps, replace it.' },
    ],
  },
  {
    slug: 'paying-for-business-solar-over-time',
    title: 'Paying for business solar over time',
    excerpt: 'What to think about before you take on a payment plan for power.',
    category: 'Financing',
    date: '2026-09-30',
    author: '25th Avenue team',
    blocks: [
      { type: 'paragraph', text: 'Reliable power can change how a business runs, but the upfront cost can be hard to meet. A payment plan spreads that cost out.' },
      { type: 'heading', text: 'Questions to ask first' },
      { type: 'list', items: ['What does the business spend on power today?', 'Which equipment does it need to keep running?', 'What can it comfortably pay each month?', 'What happens if a payment is late?'] },
      { type: 'paragraph', text: 'Get these answers in writing, and make sure you understand the total cost before you commit.' },
    ],
  },
  {
    slug: 'getting-more-from-a-product-shoot',
    title: 'Getting more from a product shoot',
    excerpt: 'Plan one day of photography so it gives you months of content.',
    category: 'Creative',
    date: '2026-09-16',
    author: '25th Avenue team',
    blocks: [
      { type: 'paragraph', text: 'A little planning before a shoot can multiply what you get from it.' },
      { type: 'heading', text: 'Before the day' },
      { type: 'list', items: ['List every place the images will appear', 'Plan both tall and wide shots', 'Record short videos between photos'] },
      { type: 'image', caption: 'Placeholder for an article image' },
      { type: 'paragraph', text: 'Organise the finished files by product and format so your team can find them.' },
    ],
  },
  {
    slug: 'what-to-bring-to-a-first-consultation',
    title: 'What to bring to a first consultation',
    excerpt: 'A little preparation helps you get more from your first meeting.',
    category: 'General',
    date: '2026-09-02',
    author: '25th Avenue team',
    blocks: [
      { type: 'paragraph', text: 'You don\'t need a perfect brief for a first consultation. A few notes will make the time more useful.' },
      { type: 'list', items: ['What your business does and who it serves', 'What you want to change, and why now', 'Examples of work you like', 'Your rough budget and timeline'] },
    ],
  },
]

export const postsByDate = [...posts].sort((a, b) => b.date.localeCompare(a.date))
