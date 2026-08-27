/* Mirrors the app's PujaHomeScreen / PujaDetailScreen content. */

export const PUJA_HERO = {
  image: '/img/puja_hero.jpg',
  title: 'चैत्र नवरात्रि विशेष',
  date: '19 से 27 मार्च 2026, गुरुवार से आरंभ',
  sub: 'मुख्य दोषों की शांति, आर्थिक वृद्धि,\nभाग्य जागरण तथा शत्रुओं से रक्षा के लिए',
}

/* Slides for the Puja page carousel — latest pujas, offers and seasonal
   campaigns. Add an entry here and it appears in the slider. A slide is either
   a finished poster (`image`) or a designed panel (`gradient` + copy). */
export const PUJA_BANNERS = [
  {
    id: 'navratri',
    image: '/img/promo_navratri.jpg',
    kicker: 'Chaitra Navratri Mahapuja',
    title: 'Chaitra Navratri Mahapuja',
    slug: 'chaitra-navratri-mahapuja',
    cta: 'Book Now',
  },
  {
    id: 'kaalsarp',
    image: '/img/promo_kaalsarp.jpg',
    kicker: 'दोष निवारण पूजा',
    title: 'Kaal Sarp Yog Puja',
    slug: 'kaal-sarp-yog',
    cta: 'Book Now',
  },
  {
    id: 'rudra',
    gradient: 'linear-gradient(135deg, #8a2f14, #c1451d)',
    kicker: 'TRENDING',
    heading: 'Rudra Abhishek\nSeva',
    sub: 'At Kedarnath Mandir · from ₹1,100',
    title: 'Rudra Abhishek Seva',
    slug: 'rudrabhishek-seva',
    cta: 'Book Now',
  },
  {
    id: 'navagraha',
    gradient: 'linear-gradient(135deg, #3f2d5c, #6d4a8f)',
    kicker: 'OFFER · 37% OFF',
    heading: 'Navagraha Shanti\nHavan',
    sub: 'At Trimbakeshwar · ₹4,100 (was ₹6,500)',
    title: 'Navagraha Shanti Havan',
    slug: 'navagraha-shanti-havan',
    cta: 'View Offer',
  },
]

export const PUJA_TRUST = [
  { icon: 'temple', label: 'Puja performed in Sacred Temples' },
  { icon: 'check', label: 'Verified & Experienced Pandits' },
]

export const CHALLENGES = [
  { id: 'love', label: 'Love &\nRelationship', img: '/img/ch_love.jpg' },
  { id: 'education', label: 'Education', img: '/img/ch_education.jpg' },
  { id: 'career', label: 'Career &\nSuccess', img: '/img/ch_career.jpg' },
  { id: 'marriage', label: 'Marriage', img: '/img/ch_marriage.jpg' },
  { id: 'health', label: 'Health &\nWellness', img: '/img/ch_health.jpg' },
  { id: 'finance', label: 'Finance &\nBusiness', img: '/img/ch_finance.jpg' },
  { id: 'dosha', label: 'Dosha\nNivaran', img: '/img/ch_dosha.jpg' },
  { id: 'protection', label: 'Protection &\nSpiritual', img: '/img/ch_protection.jpg' },
  { id: 'graha', label: 'Graha\nShanti', img: '/img/ch_graha.jpg' },
]

const pkg = (a, b, c) => [
  {
    id: 'individual',
    name: 'Individual',
    people: '1 person',
    price: a,
    perks: ['Sankalp with your name & gotra', 'Puja video on WhatsApp', 'Prasad delivered home'],
  },
  {
    id: 'family',
    name: 'Family',
    people: 'Up to 4 people',
    price: b,
    popular: true,
    perks: ['Sankalp for 4 family members', 'Puja video on WhatsApp', 'Prasad + Tulsi mala', 'Priority slot'],
  },
  {
    id: 'group',
    name: 'Group',
    people: 'Up to 8 people',
    price: c,
    perks: ['Sankalp for 8 members', 'Full puja video + photos', 'Prasad hamper', 'Dedicated pandit call'],
  },
]

export const PUJAS = [
  {
    slug: 'kaal-sarp-yog',
    name: 'Kaal Sarp Yog Shanti Puja',
    hindi: 'काल सर्प दोष शांति पूजा',
    tag: 'दोष निवारण पूजा',
    temple: 'Trimbakeshwar Jyotirlinga',
    place: 'Nashik, Maharashtra',
    deity: 'Lord Shiva',
    concerns: ['dosha', 'graha', 'protection'],
    from: 2100,
    rating: 4.8,
    bookings: '12,400+',
    image: '/img/banner_kaalsarp.jpg',
    card: '/img/puja_1.jpg',
    date: 'Next available: Nag Panchami, 29 Jul',
    about:
      'Kaal Sarp Dosh forms when all planets sit between Rahu and Ketu. This Shanti Puja at Trimbakeshwar — one of the twelve Jyotirlingas — is performed to release the obstruction it creates in career, marriage and health, and to restore clarity, stability and progress.',
    benefits: [
      'Relief from repeated obstacles and delays',
      'Peace from recurring bad dreams and anxiety',
      'Support for career growth and financial stability',
      'Harmony in marriage and family matters',
    ],
    process: [
      { step: 'Sankalp', text: 'The pandit takes your name, gotra and intention before the deity.' },
      { step: 'Rudra Abhishek', text: 'Abhishek of the Jyotirlinga with milk, honey, ghee and Gangajal.' },
      { step: 'Naag Bali & Jaap', text: '11,000 Mahamrityunjaya mantras chanted by Vedic pandits.' },
      { step: 'Havan & Aarti', text: 'Purnahuti havan followed by aarti in your name.' },
      { step: 'Prasad Dispatch', text: 'Tirth prasad and rudraksha couriered to your address.' },
    ],
    packages: pkg(2100, 3100, 5100),
  },
  {
    slug: 'chaitra-navratri-mahapuja',
    name: 'Chaitra Navratri Mahapuja',
    hindi: 'चैत्र नवरात्रि महापूजा',
    tag: 'नवरात्रि विशेष',
    temple: 'Vaishno Devi Bhawan',
    place: 'Katra, Jammu & Kashmir',
    deity: 'Maa Durga',
    concerns: ['protection', 'finance', 'health'],
    from: 1100,
    rating: 4.9,
    bookings: '28,900+',
    image: '/img/banner_navratri.jpg',
    card: '/img/puja_2.jpg',
    date: '19 – 27 March 2026',
    about:
      'Nine days of Durga Saptashati path, kanya pujan and daily havan performed through Chaitra Navratri. Booked for protection from negative energy, for courage in difficult phases, and for the prosperity that follows the blessing of Maa Durga.',
    benefits: [
      'Protection from negative energy and nazar',
      'Courage and clarity in difficult decisions',
      'Removal of obstacles in new beginnings',
      'Prosperity and abundance at home',
    ],
    process: [
      { step: 'Ghatasthapana', text: 'Kalash sthapana on the first day in your name.' },
      { step: 'Durga Saptashati', text: 'Full path recited daily for nine days.' },
      { step: 'Kanya Pujan', text: 'Nine kanyas worshipped and fed on Ashtami.' },
      { step: 'Havan & Purnahuti', text: 'Concluding havan on Navami with your sankalp.' },
      { step: 'Prasad Dispatch', text: 'Chunri, prasad and shringar sent to your home.' },
    ],
    packages: pkg(1100, 2100, 4100),
  },
  {
    slug: 'maha-mrityunjaya-jaap',
    name: 'Maha Mrityunjaya Jaap',
    hindi: 'महामृत्युंजय जाप',
    tag: 'आरोग्य पूजा',
    temple: 'Kashi Vishwanath Temple',
    place: 'Varanasi, Uttar Pradesh',
    deity: 'Lord Shiva',
    concerns: ['health', 'protection', 'dosha'],
    from: 2500,
    rating: 4.9,
    bookings: '9,800+',
    image: '/img/puja_wide.jpg',
    card: '/img/puja_3.jpg',
    date: 'Performed every Monday & Pradosh',
    about:
      'The Mahamrityunjaya mantra is the Vedic prayer for healing and longevity. 1.25 lakh jaap is performed at Kashi Vishwanath for recovery from illness, freedom from fear, and protection through a difficult period.',
    benefits: [
      'Support during illness and recovery',
      'Relief from fear and mental unrest',
      'Protection from accidents and untimely harm',
      'Longevity and vitality for the family',
    ],
    process: [
      { step: 'Sankalp', text: 'Taken in the name of the person the jaap is for.' },
      { step: 'Rudra Abhishek', text: 'Abhishek at the Kashi Vishwanath Jyotirlinga.' },
      { step: '1.25 Lakh Jaap', text: 'Chanted over eleven days by eleven pandits.' },
      { step: 'Havan', text: 'Dashansh havan with bilva patra and samagri.' },
      { step: 'Prasad Dispatch', text: 'Bhasm, rudraksha and prasad sent to you.' },
    ],
    packages: pkg(2500, 4100, 7100),
  },
  {
    slug: 'siddhivinayak-puja',
    name: 'Siddhivinayak Sankalp Puja',
    hindi: 'सिद्धिविनायक संकल्प पूजा',
    tag: 'विघ्न निवारण',
    temple: 'Shree Siddhivinayak Temple',
    place: 'Mumbai, Maharashtra',
    deity: 'Lord Ganesha',
    concerns: ['career', 'education', 'finance'],
    from: 1500,
    rating: 4.7,
    bookings: '15,200+',
    image: '/img/puja_1.jpg',
    card: '/img/deity_hanuman.jpg',
    date: 'Every Tuesday & Sankashti Chaturthi',
    about:
      'Ganpati is invoked first before any new beginning. This sankalp puja at Siddhivinayak is booked before a new job, a business launch, an exam or a house move — to clear obstacles from the path before you walk it.',
    benefits: [
      'Obstacles cleared before new ventures',
      'Focus and success in exams and interviews',
      'Growth in business and profession',
      'Buddhi, siddhi and steady progress',
    ],
    process: [
      { step: 'Sankalp', text: 'Your name, gotra and wish offered to Ganpati.' },
      { step: 'Abhishek', text: 'Panchamrit abhishek of the Siddhivinayak murti.' },
      { step: 'Atharvashirsha Path', text: '21 recitations of Ganapati Atharvashirsha.' },
      { step: 'Modak Bhog & Aarti', text: 'Modak bhog offered, aarti in your name.' },
      { step: 'Prasad Dispatch', text: 'Modak prasad and Ganpati coin sent home.' },
    ],
    packages: pkg(1500, 2500, 4500),
  },
]

export const getPuja = (slug) => PUJAS.find((p) => p.slug === slug)
