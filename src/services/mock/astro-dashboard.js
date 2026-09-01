/* ============================================================
   Astro dashboard content — sections per the Super App documentation
   (Astro Tab: quick access, recharge banner, top astrologers, my sessions,
   talks, FAQ, life concerns, trust stats).
   ============================================================ */

/** Quick access cards: Free Kundli / Horoscope / Panchang. */
export const QUICK_ACCESS = [
  { id: 'kundli', label: 'Free Kundli', sub: 'Generate your birth chart', img: '/img/qa_kundli.png', to: 'kundli' },
  { id: 'horoscope', label: 'Horoscope', sub: 'Your day, sign by sign', img: '/img/qa_horoscope.png', to: 'horoscope' },
  { id: 'panchang', label: 'Panchang', sub: 'Today tithi and muhurat', img: '/img/qa_panchang.png', to: 'panchang' },
]

/** Top Astrologers category filter — Vedic / Astro / Numero, as documented. */
export const TOP_CATEGORIES = ['Vedic', 'Astro', 'Numero']

/** Astrologers for Life Concerns. */
export const ASTRO_CONCERNS = [
  { id: 'love', label: 'Love', img: '/img/concern/ic_love.png' },
  { id: 'education', label: 'Education', img: '/img/concern/ic_education.png' },
  { id: 'career', label: 'Career', img: '/img/concern/ic_career.png' },
  { id: 'marriage', label: 'Marriage', img: '/img/concern/ic_marriage.png' },
  { id: 'health', label: 'Health', img: '/img/concern/ic_health.png' },
  { id: 'finance', label: 'Finance', img: '/img/concern/ic_finance.png' },
]

/** Talks by Astro — short video cards. */
export const TALKS = [
  { id: 'v1', title: 'When is the right time to change your career?', who: 'Astro Rohini', len: '4:12', thumb: '/img/av_1.jpg' },
  { id: 'v2', title: 'What your Moon sign says about your temperament', who: 'Astro Ashi', len: '6:38', thumb: '/img/av_5.jpg' },
  { id: 'v3', title: 'Kaal Sarp Dosh — what it actually means', who: 'Astro Pari', len: '5:04', thumb: '/img/av_3.jpg' },
  { id: 'v4', title: 'Reading Shani transit without fear', who: 'Astro Vikram', len: '7:21', thumb: '/img/av_4.jpg' },
]

export const ASTRO_FAQS = [
  {
    q: 'How does an astrology consultation work?',
    a: 'Pick an astrologer, start a chat or call session, and pay only for the minutes you use. The consultation can be ended at any time.',
  },
  {
    q: 'Are the astrologers verified?',
    a: 'Every astrologer is interviewed for their tradition and experience, and background checked before being listed. The green tick on a profile marks a verified astrologer.',
  },
  {
    q: 'Is my consultation private?',
    a: 'Yes. Chats and calls stay between you and the astrologer. Your birth details are not shared further, and transcripts are visible only to you.',
  },
  {
    q: 'What if I am not satisfied with a session?',
    a: 'Raise it from the session in your history within 24 hours. If the consultation did not take place as promised, the minutes are credited back to your wallet.',
  },
]

export const ASTRO_STATS = [
  { value: '4.8', label: 'Customer Rating' },
  { value: '500+', label: 'Verified Astrologers' },
  { value: '10L+', label: 'Consultations Done' },
  { value: '24x7', label: 'Live Support' },
]

/* ---------- Kundli ---------- */
export const GENDERS = ['Male', 'Female', 'Other']

export const KUNDLI_STEPS = ['Name', 'Gender', 'Date of Birth', 'Birth Time', 'Birth Place']

export const BIRTH_PLACES = [
  'Mumbai, Maharashtra', 'Delhi, India', 'Bengaluru, Karnataka', 'Varanasi, Uttar Pradesh',
  'Chandigarh, India', 'Kolkata, West Bengal', 'Jaipur, Rajasthan', 'Pune, Maharashtra',
]

/** Twelve houses of a north-Indian chart, used to render the generated kundli. */
export const HOUSES = [
  { n: 1, sign: 'Mesh', lord: 'Mangal', means: 'Self, body, vitality' },
  { n: 2, sign: 'Vrishabh', lord: 'Shukra', means: 'Wealth, speech, family' },
  { n: 3, sign: 'Mithun', lord: 'Budh', means: 'Courage, siblings, effort' },
  { n: 4, sign: 'Kark', lord: 'Chandra', means: 'Home, mother, comfort' },
  { n: 5, sign: 'Simha', lord: 'Surya', means: 'Children, learning, purva punya' },
  { n: 6, sign: 'Kanya', lord: 'Budh', means: 'Debt, disease, enemies' },
  { n: 7, sign: 'Tula', lord: 'Shukra', means: 'Marriage, partnership' },
  { n: 8, sign: 'Vrishchik', lord: 'Mangal', means: 'Longevity, sudden change' },
  { n: 9, sign: 'Dhanu', lord: 'Guru', means: 'Dharma, fortune, father' },
  { n: 10, sign: 'Makar', lord: 'Shani', means: 'Career, karma, status' },
  { n: 11, sign: 'Kumbh', lord: 'Shani', means: 'Gains, network, elder siblings' },
  { n: 12, sign: 'Meen', lord: 'Guru', means: 'Loss, moksha, foreign lands' },
]

export const PLANETS = [
  { p: 'Surya', sign: 'Simha', house: 5, deg: '12°44' },
  { p: 'Chandra', sign: 'Vrishabh', house: 2, deg: '03°18' },
  { p: 'Mangal', sign: 'Mesh', house: 1, deg: '21°05' },
  { p: 'Budh', sign: 'Kanya', house: 6, deg: '08°57' },
  { p: 'Guru', sign: 'Dhanu', house: 9, deg: '16°31' },
  { p: 'Shukra', sign: 'Tula', house: 7, deg: '27°12' },
  { p: 'Shani', sign: 'Makar', house: 10, deg: '05°49' },
  { p: 'Rahu', sign: 'Mithun', house: 3, deg: '19°22' },
  { p: 'Ketu', sign: 'Dhanu', house: 9, deg: '19°22' },
]

/* ---------- Horoscope (shape taken from the APK horoscope.json) ---------- */
export const ZODIAC = [
  { id: 1, name: 'Aries', symbol: '♈', dates: 'Mar 21 – Apr 19' },
  { id: 2, name: 'Taurus', symbol: '♉', dates: 'Apr 20 – May 20' },
  { id: 3, name: 'Gemini', symbol: '♊', dates: 'May 21 – Jun 20' },
  { id: 4, name: 'Cancer', symbol: '♋', dates: 'Jun 21 – Jul 22' },
  { id: 5, name: 'Leo', symbol: '♌', dates: 'Jul 23 – Aug 22' },
  { id: 6, name: 'Virgo', symbol: '♍', dates: 'Aug 23 – Sep 22' },
  { id: 7, name: 'Libra', symbol: '♎', dates: 'Sep 23 – Oct 22' },
  { id: 8, name: 'Scorpio', symbol: '♏', dates: 'Oct 23 – Nov 21' },
  { id: 9, name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 – Dec 21' },
  { id: 10, name: 'Capricorn', symbol: '♑', dates: 'Dec 22 – Jan 19' },
  { id: 11, name: 'Aquarius', symbol: '♒', dates: 'Jan 20 – Feb 18' },
  { id: 12, name: 'Pisces', symbol: '♓', dates: 'Feb 19 – Mar 20' },
]

export const HOROSCOPE_DAYS = [
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
]

export const HOROSCOPE = {
  title: 'A Day of New Opportunities',
  content:
    'Today brings a refreshing wave of self-awareness and clarity. You might notice that certain people or situations test your patience — take it as a reminder to trust your instincts and speak up for what feels right. Your calm but firm energy can shift how others see you.\n\nYou will find satisfaction not in external approval, but in knowing you stood by your values. A simple, confident refusal might be your biggest win today.',
  lucky_colour: 'Red, Green',
  planet_of_day: 'Venus',
  lucky_numbers: [2, 3, 8, 9],
  lucky_time: '2:15 PM – 3:45 PM',
  predictions: [
    { k: 'Love', v: 'Emotional honesty is your superpower today.' },
    { k: 'Career', v: 'A day for bold communication and self-assurance.' },
    { k: 'Money', v: 'Financially, you are encouraged to be mindful but optimistic.' },
    { k: 'Health', v: 'Your energy levels may fluctuate today.' },
    { k: 'Travel', v: 'A spontaneous urge to explore might strike today.' },
  ],
}

/* ---------- Panchang (shape taken from the APK panchang.json) ---------- */
export const PANCHANG_DATA = {
  location: 'Mumbai, India',
  hindi_month: 'Ashadha',
  paksha: 'Shukla',
  vikram_samvat: '2083',
  brahmaMuhurat: '4:50 AM → 5:42 AM',
  rahuKalam: '4:30 PM → 6:02 PM',
  sunrise: '6:28 AM',
  sunset: '6:33 PM',
  moonrise: '7:26 PM',
  moonset: '7:20 AM',
  sun_sign: 'Virgo',
  moon_sign: 'Virgo',
  tithi: 'Ekadashi',
  tithi_end_time: '10:42 PM',
  nakshatra: 'Hasta',
  nakshatra_end_time: '1:39 PM',
  yoga: 'Brahma',
  yoga_end_time: '10:42 PM',
  karana: 'Balava',
  karana_end_time: '3:50 PM',
}

export const PANCHANG_CITIES = [
  'Mumbai, India', 'Delhi, India', 'Bengaluru, India', 'Kolkata, India',
  'Chennai, India', 'Varanasi, India', 'Chandigarh, India', 'Pune, India',
]

/* ---------- Recharge ---------- */
export const RECHARGE_OFFERS = [
  { min: 100, pct: 10, label: '10% extra' },
  { min: 500, pct: 25, label: '25% extra' },
  { min: 1000, pct: 50, label: '50% cashback' },
]

export const UPI_METHODS = [
  { id: 'gpay', name: 'Google Pay', icon: '📱' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm UPI', icon: '🔵' },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
]

export const GST_RATE = 0.18

export const offerFor = (amt) => [...RECHARGE_OFFERS].reverse().find((o) => amt >= o.min) || null
