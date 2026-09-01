/* ============================================================
   Astro module — mirrors AstrologerListScreen / AstrologerDetailScreen /
   ChatScreen / CallScreen / SessionCompletedScreen / WalletScreen.
   ============================================================ */

export const SPECIALIZATIONS = ['Vedic', 'Tarot', 'Numerology', 'Vastu', 'Nadi', 'Face Reading']

export const LANGUAGES = ['Hindi', 'English', 'Marathi', 'Bengali', 'Punjabi', 'Tamil']

export const ASTRO_SORTS = [
  { k: 'popular', label: 'Popularity' },
  { k: 'exp', label: 'Experience : High to Low' },
  { k: 'low', label: 'Price : Low to High' },
  { k: 'high', label: 'Price : High to Low' },
  { k: 'rating', label: 'Customer Top Rated' },
]

/** Life concerns reused from the puja module, so the two filter the same way. */
export const CONCERN_TAGS = [
  { id: 'love', label: 'Love & Marriage' },
  { id: 'career', label: 'Career' },
  { id: 'finance', label: 'Business' },
  { id: 'health', label: 'Health' },
  { id: 'education', label: 'Education' },
  { id: 'dosha', label: 'Dosha' },
]

export const ASTROLOGERS = [
  {
    id: 'ashi',
    name: 'Astro Ashi',
    img: '/img/av_5.jpg',
    spec: ['Vedic', 'Numerology'],
    langs: ['Hindi', 'English'],
    concerns: ['love', 'career', 'dosha'],
    exp: 12,
    rating: 4.9,
    orders: 18400,
    price: 30,
    status: 'online',
    followers: '42k',
    about:
      'Ashi ji reads a chart the traditional way — parashari, with dasha and transit checked together. She is direct about timing: what is running now, what turns, and roughly when. Most of her consultations are on marriage delays and career direction.',
  },
  {
    id: 'sushma',
    name: 'Astro Sushma',
    img: '/img/av_6.jpg',
    spec: ['Tarot', 'Vedic'],
    langs: ['Hindi', 'Marathi'],
    concerns: ['love', 'health'],
    exp: 9,
    rating: 4.8,
    orders: 11250,
    price: 25,
    status: 'online',
    followers: '28k',
    about:
      'Sushma ji works tarot alongside the birth chart — the cards for the immediate question, the chart for the longer arc. Devotees come to her when a situation needs a decision this month rather than this year.',
  },
  {
    id: 'rohini',
    name: 'Astro Rohini',
    img: '/img/av_1.jpg',
    spec: ['Numerology', 'Face Reading'],
    langs: ['Hindi', 'English', 'Bengali'],
    concerns: ['career', 'finance', 'education'],
    exp: 15,
    rating: 4.9,
    orders: 24800,
    price: 40,
    status: 'busy',
    followers: '61k',
    about:
      'Fifteen years on names, dates and numbers. Rohini ji is usually consulted before a business is registered or a child is named, and she is careful to explain why a correction is suggested rather than simply prescribing one.',
  },
  {
    id: 'meera',
    name: 'Astro Meera Joshi',
    img: '/img/av_2.jpg',
    spec: ['Vastu', 'Vedic'],
    langs: ['Hindi', 'Marathi', 'English'],
    concerns: ['finance', 'health', 'dosha'],
    exp: 18,
    rating: 4.7,
    orders: 15900,
    price: 45,
    status: 'online',
    followers: '37k',
    about:
      'Meera ji surveys a home or a shop from its plan and tells you what can be changed without breaking a wall. She is practical about vastu — a handful of corrections that matter, rather than a long list.',
  },
  {
    id: 'pari',
    name: 'Astro Pari',
    img: '/img/av_3.jpg',
    spec: ['Nadi', 'Vedic'],
    langs: ['Hindi', 'Tamil'],
    concerns: ['dosha', 'health', 'love'],
    exp: 7,
    rating: 4.6,
    orders: 6300,
    price: 20,
    status: 'online',
    followers: '14k',
    about:
      'Pari ji trained in the nadi tradition and reads for pitru dosha, kaal sarp and the long-running afflictions that show across a family rather than one chart.',
  },
  {
    id: 'vikram',
    name: 'Astro Vikram',
    img: '/img/av_4.jpg',
    spec: ['Vedic', 'Tarot'],
    langs: ['Hindi', 'English', 'Punjabi'],
    concerns: ['career', 'education', 'finance'],
    exp: 11,
    rating: 4.8,
    orders: 13100,
    price: 35,
    status: 'offline',
    followers: '31k',
    about:
      'Vikram ji focuses on career and study — which line suits a chart, when a change is supported, and what to do in a year that is not. He answers in plain language and does not oversell remedies.',
  },
]

export const ASTRO_REVIEWS = [
  { name: 'Kavita R.', stars: 5, text: 'Explained my dasha clearly and did not push any remedy. Felt like an honest reading.' },
  { name: 'Sandeep M.', stars: 5, text: 'Very accurate on the timing of my job change. Worth every minute.' },
  { name: 'Priya N.', stars: 4, text: 'Kind and patient. The call ran a little short but the answers were useful.' },
]

/** Canned replies so a chat session feels alive without a backend. */
export const CHAT_REPLIES = [
  'Namaste 🙏 Please share your date, time and place of birth.',
  'Thank you. Let me look at your chart for a moment.',
  'I can see Guru is transiting your tenth house right now — that is a supportive period for work.',
  'The delay you are describing usually eases once the current antardasha ends. That is about four months away.',
  'I would suggest a simple remedy rather than an expensive one. Offer water to the Sun on Sundays and keep it consistent.',
  'Is there anything specific about the timing you would like me to check?',
]

export const WALLET_PACKS = [100, 200, 500, 1000, 2000]

export const getAstrologer = (id) => ASTROLOGERS.find((a) => a.id === id)

export function filterAstrologers({ q = '', sort = 'popular', spec = [], langs = [], concern = null } = {}) {
  let out = ASTROLOGERS.slice()
  if (spec.length) out = out.filter((a) => a.spec.some((s) => spec.includes(s)))
  if (langs.length) out = out.filter((a) => a.langs.some((l) => langs.includes(l)))
  if (concern) out = out.filter((a) => a.concerns.includes(concern))
  if (q.trim()) {
    const s = q.toLowerCase().trim()
    out = out.filter((a) => (a.name + a.spec.join(' ') + a.langs.join(' ')).toLowerCase().includes(s))
  }
  const by = {
    exp: (a, b) => b.exp - a.exp,
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    popular: (a, b) => b.orders - a.orders,
  }
  // online first, then the chosen sort
  const rank = { online: 0, busy: 1, offline: 2 }
  return out.sort((a, b) => rank[a.status] - rank[b.status] || by[sort](a, b))
}
