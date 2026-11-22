// Opens WhatsApp with an optional pre-filled message. `number` is digits only, including the country code.
export function buildWhatsAppLink(number: string, text?: string) {
  const base = `https://wa.me/${number}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

// Fixed locale and time zone so the server and browser render the same text.
export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
