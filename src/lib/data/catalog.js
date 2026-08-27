/* ============================================================
   Catalog — mirrors the app's temple → puja / chadhava hierarchy.
   Temples own their pujas and chadhavas, exactly like TempleDetailScreen.
   ============================================================ */

export const DEITIES = [
  'Lord Shiva', 'Lord Krishna', 'Lord Ganesha', 'Lord Vishnu', 'Lord Rama',
  'Lord Hanuman', 'Goddess Durga', 'Goddess Lakshmi', 'Goddess Saraswati', 'Goddess Kali',
]

export const LOCATIONS = [
  'Uttarakhand', 'Varanasi', 'Hampi', 'Vrindavan', 'Rajasthan',
  'Dwarka', 'Madurai', 'Maharashtra', 'Jammu & Kashmir', 'Mumbai',
]

export const TEMPLE_SORTS = [
  { k: 'pop', label: 'Popularity' },
  { k: 'disc', label: 'Discount : High to Low' },
  { k: 'price', label: 'Price : Low to High' },
  { k: 'rating', label: 'Customer Top Rated' },
  { k: 'new', label: 'New Arrivals' },
]

/* ---- puja categories: the app splits Normal / Special / Havan ---- */
export const PUJA_TYPES = [
  { id: 'all', label: 'All Puja' },
  { id: 'normal', label: 'Normal Puja' },
  { id: 'special', label: 'Special Puja' },
  { id: 'havan', label: 'Havan Puja' },
]

/* ---- chadhava categories: the app splits Normal / Special, plus combos ---- */
export const CHADHAVA_TYPES = [
  { id: 'all', label: 'All Chadhava' },
  { id: 'normal', label: 'Normal Chadhava' },
  { id: 'special', label: 'Special Chadhava' },
  { id: 'combos', label: 'Chadhava Combos' },
]

/* ---- booking modes offered on a puja (Individual / Partner / Participate) ---- */
export const PUJA_MODES = [
  {
    id: 'individual',
    name: 'Individual Pooja',
    people: 1,
    mult: 1,
    note: 'Performed solely in your name',
    perks: ['Sankalp with your name & gotra', 'Puja video on WhatsApp', 'Tirth prasad delivered home'],
  },
  {
    id: 'partner',
    name: 'Partner Pooja',
    people: 2,
    mult: 1.6,
    popular: true,
    note: 'For you and your partner together',
    perks: ['Sankalp for two names', 'Puja video on WhatsApp', 'Prasad + Tulsi mala', 'Priority slot'],
  },
  {
    id: 'participate',
    name: 'Participate Puja',
    people: 4,
    mult: 0.45,
    note: 'Join a collective puja with other devotees',
    perks: ['Your name added to the samuhik sankalp', 'Group puja video', 'Prasad delivered home'],
  },
]

/* ---- shared detail content ---- */
export const SACRED_PROCESS = [
  { t: 'Select Puja package', s: 'Choose the seva that fits your sankalp.' },
  { t: 'Provide Sankalp details', s: 'Share your name and gotra for the ritual.' },
  { t: 'Pandit performs Puja', s: 'Vedic pandits perform the rituals on your behalf.' },
  { t: 'Receive Prasad', s: 'Blessed prasad delivered to your home.' },
]

export const BENEFITS = [
  { i: '🌸', t: 'Divine Grace', c: 'b-pink' },
  { i: '💧', t: 'Purification', c: 'b-blue' },
  { i: '🛡', t: 'Protection', c: 'b-green' },
  { i: '🪙', t: 'Prosperity', c: 'b-gold' },
]

export const REVIEWS = [
  { name: 'Vinod Nayar', stars: 5, text: 'Truly a blessing. The puja was performed exactly as promised and I received the recording and prasad on time.' },
  { name: 'Ananya Sharma', stars: 5, text: 'Very smooth experience and the pandit ji explained every step. Felt deeply connected. Highly recommended.' },
  { name: 'Rakesh Iyer', stars: 4, text: 'Booking was simple and the video came through the same evening. Prasad took a week but arrived well packed.' },
]

export const FAQS = [
  { q: 'What if I miss the live puja?', a: 'You will receive a full recording of your puja along with the prasad, so you never miss the blessings.' },
  { q: 'When will I receive the Prasad?', a: 'Prasad is dispatched within 3–5 working days after the puja is performed and reaches you in 5–7 days.' },
  { q: 'Is the donation eligible for tax benefit?', a: 'Yes, all temple donations are eligible for 80G tax exemption. A receipt is shared on email.' },
  { q: 'Can I book for someone else?', a: 'Yes. Enter their name and gotra in the sankalp details — the puja will be performed in their name.' },
]

export const GALLERY = ['/img/gal_1.jpg', '/img/gal_3.jpg', '/img/gal_4.jpg', '/img/gal_2.jpg', '/img/gal_5.jpg', '/img/temple_hero.jpg']

/* ============================================================
   Temples
   ============================================================ */
export const TEMPLES = [
  {
    id: 'kedarnath',
    name: 'Kedarnath Temple – Uttarakhand',
    short: 'Kedarnath Temple',
    loc: 'Uttarakhand',
    deity: 'Lord Shiva',
    img: '/img/t_kedar.jpg',
    hero: '/img/temple_hero.jpg',
    rating: 4.8, pop: 1, disc: 30, price: 499, isNew: false,
    sub: 'Kedarnath Jyotirlinga — one of the twelve sacred abodes of Mahadev',
    story: 'Kedarnath Mandir, nestled in the Himalayas, is one of the holiest shrines dedicated to Lord Shiva. It stands at 3,583 metres, surrounded by snow-clad peaks, symbolising faith, resilience and divine serenity. After the Kurukshetra war, the Pandavas sought Lord Shiva\'s blessings here to absolve themselves of the sin of killing their kin.',
    highlights: [
      { i: '🛕', c: 'ic-blue', t: 'Divine Deities', s: 'Home to the Kedarnath Jyotirlinga, one of the twelve Jyotirlingas of Bharat.' },
      { i: '🔥', c: 'ic-orange', t: 'Daily Rituals', s: 'Mangala aarti, rudrabhishek and sandhya aarti performed every day.' },
      { i: '🙏', c: 'ic-green', t: 'Vibrant Community', s: 'A pilgrimage hub for the Char Dham yatra and Vedic learning.' },
    ],
    timings: [
      { i: '🌅', t: 'Morning Darshan', s: 'Mangala Aarti begins at 4:30 AM · Best time for meditation', time: '4:30 AM – 1:00 PM' },
      { i: '🌆', t: 'Evening Darshan', s: 'Sandhya Aarti at sunset', time: '4:30 PM – 8:30 PM' },
    ],
    legend: 'Experience bhakti by offering chadhava at one of the holiest temples of Bharat. Every chadhava is performed by verified pandits and you receive photo and video proof of your offering, from the comfort of your home.',
  },
  {
    id: 'kashi',
    name: 'Kashi Vishwanath Temple',
    short: 'Kashi Vishwanath',
    loc: 'Varanasi',
    deity: 'Lord Shiva',
    img: '/img/t_night.jpg',
    hero: '/img/t_night.jpg',
    rating: 4.7, pop: 2, disc: 25, price: 399, isNew: false,
    sub: 'The eternal city of Mahadev on the banks of the Ganga',
    story: 'Kashi Vishwanath stands in the oldest living city in the world. It is said that Mahadev himself never leaves Kashi, and that a soul that departs here attains moksha. The temple has been rebuilt many times across the centuries, and its golden spire still draws millions of devotees every year.',
    highlights: [
      { i: '🛕', c: 'ic-blue', t: 'Divine Deities', s: 'The Vishwanath Jyotirlinga, worshipped as the lord of the universe.' },
      { i: '🔥', c: 'ic-orange', t: 'Daily Rituals', s: 'Five daily aartis including the famous Ganga Aarti at Dashashwamedh Ghat.' },
      { i: '🙏', c: 'ic-green', t: 'Vibrant Community', s: 'Centre of Vedic scholarship and Sanskrit learning for centuries.' },
    ],
    timings: [
      { i: '🌅', t: 'Morning Darshan', s: 'Mangala Aarti at 3:00 AM · Bhog aarti at 11:15 AM', time: '3:00 AM – 12:00 PM' },
      { i: '🌆', t: 'Evening Darshan', s: 'Sapta Rishi Aarti at 7:00 PM', time: '12:00 PM – 11:00 PM' },
    ],
    legend: 'Offer your chadhava at the Vishwanath Jyotirlinga. The pujari performs the offering in your name during the aarti, and the prasad reaches your home.',
  },
  {
    id: 'radha-raman',
    name: 'Shri Radha Raman Temple',
    short: 'Radha Raman Temple',
    loc: 'Vrindavan',
    deity: 'Lord Krishna',
    img: '/img/t_prem.jpg',
    hero: '/img/t_prem.jpg',
    rating: 4.9, pop: 3, disc: 20, price: 599, isNew: true,
    sub: 'One of the seven self-manifested deities of Vrindavan',
    story: 'Radha Raman Ji appeared from a shaligram shila in 1542 at the prayer of Gopala Bhatta Goswami. The deity has been worshipped without a break for nearly five centuries, and the original fire lit at the time of installation still burns in the temple kitchen.',
    highlights: [
      { i: '🛕', c: 'ic-blue', t: 'Divine Deities', s: 'Self-manifested Radha Raman Ji, served in unbroken tradition since 1542.' },
      { i: '🔥', c: 'ic-orange', t: 'Daily Rituals', s: 'Eight daily darshans following the ashtakaliya seva of Vrindavan.' },
      { i: '🙏', c: 'ic-green', t: 'Vibrant Community', s: 'A hub for kirtan, Gaudiya discourse and Braj culture.' },
    ],
    timings: [
      { i: '🌅', t: 'Morning Darshan', s: 'Mangala Aarti at 4:00 AM · Shringar darshan follows', time: '4:00 AM – 12:00 PM' },
      { i: '🌆', t: 'Evening Darshan', s: 'Sandhya Aarti and shayan darshan', time: '5:30 PM – 8:30 PM' },
    ],
    legend: 'Offer morpankh, makhan-mishri and tulsi to Radha Raman Ji. Every offering is made during the shringar aarti and recorded for you.',
  },
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar Jyotirlinga',
    short: 'Trimbakeshwar',
    loc: 'Maharashtra',
    deity: 'Lord Shiva',
    img: '/img/gal_3.jpg',
    hero: '/img/gal_3.jpg',
    rating: 4.8, pop: 4, disc: 18, price: 459, isNew: false,
    sub: 'Source of the Godavari, in the Brahmagiri hills of Nashik',
    story: 'Worship the sacred Jyotirlinga at the source of the Godavari, nestled in the Brahmagiri hills of Nashik. Trimbakeshwar is the only Jyotirlinga with three faces representing Brahma, Vishnu and Mahesh, and is the principal place for Kaal Sarp Dosh and Narayan Nagbali rituals.',
    highlights: [
      { i: '🛕', c: 'ic-blue', t: 'Divine Deities', s: 'The three-faced Jyotirlinga of Brahma, Vishnu and Mahesh.' },
      { i: '🔥', c: 'ic-orange', t: 'Daily Rituals', s: 'Rudrabhishek and the famous Kaal Sarp Dosh nivaran puja.' },
      { i: '🙏', c: 'ic-green', t: 'Vibrant Community', s: 'The recognised seat for Narayan Nagbali and Pitru Dosh rituals.' },
    ],
    timings: [
      { i: '🌅', t: 'Morning Darshan', s: 'Kakad Aarti at 5:30 AM', time: '5:30 AM – 1:00 PM' },
      { i: '🌆', t: 'Evening Darshan', s: 'Sandhya Aarti at 7:00 PM', time: '4:00 PM – 9:00 PM' },
    ],
    legend: 'Chadhava at Trimbakeshwar is offered during the morning abhishek, with the complete rudrabhishek samagri arranged fresh at the temple.',
  },
  {
    id: 'virupaksha',
    name: 'Virupaksha Temple, Hampi',
    short: 'Virupaksha Temple',
    loc: 'Hampi',
    deity: 'Lord Shiva',
    img: '/img/t_hampi.jpg',
    hero: '/img/t_hampi.jpg',
    rating: 4.6, pop: 5, disc: 15, price: 299, isNew: true,
    sub: 'Continuously worshipped since the 7th century, in the Vijayanagara capital',
    story: 'Virupaksha is among the oldest functioning temples in Bharat, worshipped without interruption since the 7th century. Its towering gopuram rises above the ruins of Hampi, and the temple survived the fall of the Vijayanagara empire to remain a living place of worship.',
    highlights: [
      { i: '🛕', c: 'ic-blue', t: 'Divine Deities', s: 'Lord Virupaksha, a form of Shiva, with Pampa Devi.' },
      { i: '🔥', c: 'ic-orange', t: 'Daily Rituals', s: 'Daily abhishek and the temple elephant Lakshmi\'s morning blessing.' },
      { i: '🙏', c: 'ic-green', t: 'Vibrant Community', s: 'A UNESCO World Heritage site and living temple.' },
    ],
    timings: [
      { i: '🌅', t: 'Morning Darshan', s: 'Opens with suprabhata seva at 6:00 AM', time: '6:00 AM – 12:30 PM' },
      { i: '🌆', t: 'Evening Darshan', s: 'Evening deeparadhana at 6:30 PM', time: '3:00 PM – 9:00 PM' },
    ],
    legend: 'Deepdaan and abhishek at Virupaksha are performed in the ancient sanctum, with photo and video proof shared with you.',
  },
  {
    id: 'siddhivinayak',
    name: 'Shree Siddhivinayak Temple',
    short: 'Siddhivinayak',
    loc: 'Mumbai',
    deity: 'Lord Ganesha',
    img: '/img/gal_5.jpg',
    hero: '/img/gal_5.jpg',
    rating: 4.7, pop: 6, disc: 22, price: 529, isNew: false,
    sub: 'The vighnaharta of Mumbai, worshipped before every new beginning',
    story: 'Built in 1801, Siddhivinayak houses a Ganesha murti carved from a single black stone, with the trunk turned to the right — the rarer and more austere siddhi-peeth form. Devotees come before starting anything new, from a business to an examination.',
    highlights: [
      { i: '🛕', c: 'ic-blue', t: 'Divine Deities', s: 'Right-trunked Siddhivinayak carved from a single black stone.' },
      { i: '🔥', c: 'ic-orange', t: 'Daily Rituals', s: 'Kakad aarti, madhyan aarti and the Tuesday maha aarti.' },
      { i: '🙏', c: 'ic-green', t: 'Vibrant Community', s: 'One of the most visited temples in Bharat, open till late.' },
    ],
    timings: [
      { i: '🌅', t: 'Morning Darshan', s: 'Kakad Aarti at 5:30 AM', time: '5:30 AM – 12:15 PM' },
      { i: '🌆', t: 'Evening Darshan', s: 'Aarti at 7:30 PM · Busiest on Tuesdays', time: '5:00 PM – 9:50 PM' },
    ],
    legend: 'Modak bhog and sankalp puja at Siddhivinayak are offered on Tuesday and Sankashti Chaturthi, in your name.',
  },
]

/* ============================================================
   Pujas — each belongs to a temple and a type
   ============================================================ */
const process = (a, b, c, d, e) => [
  { step: 'Sankalp', text: a },
  { step: 'Abhishek', text: b },
  { step: 'Jaap & Path', text: c },
  { step: 'Havan & Aarti', text: d },
  { step: 'Prasad Dispatch', text: e },
]

export const PUJAS = [
  {
    slug: 'kaal-sarp-yog',
    name: 'Kaal Sarp Dosh Shanti Puja',
    hindi: 'काल सर्प दोष शांति पूजा',
    type: 'special',
    tag: 'दोष निवारण पूजा',
    temple: 'trimbakeshwar',
    deity: 'Lord Shiva',
    concerns: ['dosha', 'graha', 'protection'],
    price: 3100, mrp: 5000,
    rating: 4.8, reviews: 1240, bookings: '80+ Bookings',
    image: '/img/banner_kaalsarp.jpg',
    card: '/img/puja_1.jpg',
    date: '21 September 2026',
    closesAt: '2026-09-21T06:00:00',
    why: 'This ancient ritual is performed to remove the obstruction Kaal Sarp Dosh creates in career, marriage and health. It invokes the grace of Mahadev for clarity, stability and steady progress.',
    legend: 'Kaal Sarp Dosh forms when all planets sit between Rahu and Ketu. Trimbakeshwar, the three-faced Jyotirlinga at the source of the Godavari, is the recognised seat for its nivaran — the ritual has been performed here for centuries.',
    benefits: ['Relief from repeated obstacles and delays', 'Peace from recurring bad dreams and anxiety', 'Support for career growth and financial stability', 'Harmony in marriage and family matters'],
    process: process(
      'The pandit takes your name, gotra and intention before the deity.',
      'Abhishek of the Jyotirlinga with milk, honey, ghee and Gangajal.',
      '11,000 Mahamrityunjaya mantras chanted by Vedic pandits.',
      'Purnahuti havan followed by aarti in your name.',
      'Tirth prasad and rudraksha couriered to your address.',
    ),
  },
  {
    slug: 'maha-mrityunjaya-jaap',
    name: 'Maha Mrityunjaya Jaap & Rudra Abhishek',
    hindi: 'महामृत्युंजय जाप',
    type: 'special',
    tag: 'आरोग्य पूजा',
    temple: 'kashi',
    deity: 'Lord Shiva',
    concerns: ['health', 'protection', 'dosha'],
    price: 2500, mrp: 4000,
    rating: 4.9, reviews: 980, bookings: '120+ Bookings',
    image: '/img/puja_wide.jpg',
    card: '/img/puja_3.jpg',
    date: '14 September 2026',
    closesAt: '2026-09-14T05:00:00',
    why: 'The Mahamrityunjaya mantra is the Vedic prayer for healing and longevity. It is performed for recovery from illness, freedom from fear, and protection through a difficult period.',
    legend: 'Markandeya was destined to die at sixteen. He embraced the Shiva lingam and chanted the Mahamrityunjaya mantra, and Mahadev appeared to grant him immortality — which is why the mantra is chanted for life and healing to this day.',
    benefits: ['Support during illness and recovery', 'Relief from fear and mental unrest', 'Protection from accidents and untimely harm', 'Longevity and vitality for the family'],
    process: process(
      'Taken in the name of the person the jaap is for.',
      'Rudra Abhishek at the Kashi Vishwanath Jyotirlinga.',
      '1.25 lakh Mahamrityunjaya jaap over eleven days.',
      'Dashansh havan with bilva patra and samagri.',
      'Bhasm, rudraksha and prasad sent to you.',
    ),
  },
  {
    slug: 'chamunda-bhairav-anushthan',
    name: 'Chamunda-Bhairav Maharaksha Ratri Anushthan',
    hindi: 'चामुंडा भैरव महारक्षा अनुष्ठान',
    type: 'special',
    tag: 'रक्षा अनुष्ठान',
    temple: 'kashi',
    deity: 'Goddess Durga',
    concerns: ['protection', 'dosha'],
    price: 3100, mrp: 5000,
    rating: 4.8, reviews: 1240, bookings: '50+ Bookings',
    image: '/img/puja_1.jpg',
    card: '/img/puja_1.jpg',
    date: '5 September 2026',
    closesAt: '2026-09-05T18:00:00',
    why: 'This ancient ritual is specifically performed to remove fear, negative energies and obstacles. It invokes the protective grace of Maa Chamunda and Bhairav for safety, courage and prosperity.',
    legend: 'According to ancient scriptures, Maa Chamunda emerged from the brow of Goddess Durga to vanquish the demons Chanda and Munda. Her fierce form represents the destruction of evil and the protection of devotees.',
    benefits: ['Protection from negative energy and nazar', 'Courage and clarity in difficult decisions', 'Removal of obstacles in new beginnings', 'Peace and security within the home'],
    process: process(
      'Sankalp taken at midnight before Maa Chamunda.',
      'Abhishek with panchamrit and red chunri offering.',
      'Chamunda kavach and Bhairav ashtakam recited through the night.',
      'Raksha havan at brahma muhurta with purnahuti.',
      'Raksha kavach and prasad couriered to your home.',
    ),
  },
  {
    slug: 'chaitra-navratri-mahapuja',
    name: 'Chaitra Navratri Mahapuja',
    hindi: 'चैत्र नवरात्रि महापूजा',
    type: 'special',
    tag: 'नवरात्रि विशेष',
    temple: 'kashi',
    deity: 'Goddess Durga',
    concerns: ['protection', 'finance', 'health'],
    price: 2100, mrp: 3500,
    rating: 4.9, reviews: 2890, bookings: '300+ Bookings',
    image: '/img/banner_navratri.jpg',
    card: '/img/puja_2.jpg',
    date: '19 – 27 March 2027',
    closesAt: '2027-03-18T20:00:00',
    why: 'Nine days of Durga Saptashati path, kanya pujan and daily havan. Booked for protection from negative energy, for courage in difficult phases, and for the prosperity that follows the blessing of Maa Durga.',
    legend: 'Maa Durga fought Mahishasura for nine nights and slew him on the tenth. The nine nights of Navratri honour her nine forms, and the puja performed across them is held to clear whatever stands in a devotee\'s way.',
    benefits: ['Protection from negative energy and nazar', 'Courage and clarity in difficult decisions', 'Removal of obstacles in new beginnings', 'Prosperity and abundance at home'],
    process: process(
      'Ghatasthapana and kalash sthapana in your name.',
      'Daily abhishek and shringar of the Devi.',
      'Durga Saptashati path recited daily for nine days.',
      'Concluding havan on Navami with your sankalp.',
      'Chunri, prasad and shringar sent to your home.',
    ),
  },
  {
    slug: 'rudrabhishek-seva',
    name: 'Rudra Abhishek Seva',
    hindi: 'रुद्राभिषेक सेवा',
    type: 'normal',
    tag: 'साप्ताहिक सेवा',
    temple: 'kedarnath',
    deity: 'Lord Shiva',
    concerns: ['health', 'graha'],
    price: 1100, mrp: 1600,
    rating: 4.8, reviews: 3120, bookings: '200+ Bookings',
    image: '/img/temple_hero.jpg',
    card: '/img/gal_1.jpg',
    date: 'Every Monday & Pradosh',
    why: 'Rudrabhishek is the simplest and most complete worship of Mahadev. Performed weekly for steady health, peace at home, and the removal of small obstructions before they grow.',
    legend: 'When the devas and asuras churned the ocean, the poison halahala rose first. Mahadev drank it to save creation, and the abhishek of cool milk, water and honey is offered to soothe him to this day.',
    benefits: ['Peace and steadiness at home', 'Support for health and recovery', 'Relief from planetary affliction', 'Clarity of mind and purpose'],
    process: process(
      'Sankalp with your name and gotra.',
      'Abhishek with milk, curd, ghee, honey and Gangajal.',
      'Rudri path recited by the temple pandits.',
      'Aarti offered in your name at the sanctum.',
      'Bhasm and prasad couriered to your home.',
    ),
  },
  {
    slug: 'ganpati-atharvashirsha',
    name: 'Ganpati Atharvashirsha Path',
    hindi: 'गणपति अथर्वशीर्ष पाठ',
    type: 'normal',
    tag: 'विघ्न निवारण',
    temple: 'siddhivinayak',
    deity: 'Lord Ganesha',
    concerns: ['career', 'education', 'finance'],
    price: 1500, mrp: 2200,
    rating: 4.7, reviews: 1520, bookings: '150+ Bookings',
    image: '/img/deity_hanuman.jpg',
    card: '/img/deity_hanuman.jpg',
    date: 'Every Tuesday & Sankashti Chaturthi',
    why: 'Ganpati is invoked first before any new beginning. Booked before a new job, a business launch, an exam or a house move — to clear obstacles from the path before you walk it.',
    legend: 'Ganpati was made to guard Parvati\'s door and stopped even Shiva. In the reconciliation that followed he was given the elephant head and the boon that no undertaking would succeed unless he were worshipped first.',
    benefits: ['Obstacles cleared before new ventures', 'Focus and success in exams and interviews', 'Growth in business and profession', 'Buddhi, siddhi and steady progress'],
    process: process(
      'Your name, gotra and wish offered to Ganpati.',
      'Panchamrit abhishek of the Siddhivinayak murti.',
      '21 recitations of Ganapati Atharvashirsha.',
      'Modak bhog offered and aarti performed in your name.',
      'Modak prasad and a Ganpati coin sent home.',
    ),
  },
  {
    slug: 'navagraha-shanti-havan',
    name: 'Navagraha Shanti Havan',
    hindi: 'नवग्रह शांति हवन',
    type: 'havan',
    tag: 'ग्रह शांति',
    temple: 'trimbakeshwar',
    deity: 'Lord Shiva',
    concerns: ['graha', 'career', 'finance'],
    price: 4100, mrp: 6500,
    rating: 4.7, reviews: 640, bookings: '60+ Bookings',
    image: '/img/gal_2.jpg',
    card: '/img/gal_2.jpg',
    date: 'Performed on Amavasya',
    why: 'A full havan for all nine planets, performed when a chart shows several afflictions at once rather than a single one. Booked for a difficult running dasha or a prolonged rough patch.',
    legend: 'The navagraha are held to be the instruments through which karma returns to us. The havan does not remove that karma, but the shanti it invokes softens how it arrives.',
    benefits: ['Relief across multiple planetary afflictions', 'Support through a difficult mahadasha', 'Stability in career and finances', 'Peace of mind and better sleep'],
    process: process(
      'Sankalp taken with your birth details and gotra.',
      'Navagraha sthapana and abhishek of the nine planets.',
      'Mantra jaap for each graha as prescribed in the chart.',
      'Full navagraha havan with nine samidha and purnahuti.',
      'Navagraha yantra and prasad couriered to you.',
    ),
  },
  {
    slug: 'satyanarayan-havan',
    name: 'Satyanarayan Katha & Havan',
    hindi: 'सत्यनारायण कथा एवं हवन',
    type: 'havan',
    tag: 'मंगल कार्य',
    temple: 'radha-raman',
    deity: 'Lord Vishnu',
    concerns: ['finance', 'marriage', 'protection'],
    price: 2100, mrp: 3200,
    rating: 4.9, reviews: 2100, bookings: '180+ Bookings',
    image: '/img/t_prem.jpg',
    card: '/img/gal_3.jpg',
    date: 'Every Purnima',
    why: 'The katha performed after a wedding, a house move, a new business or the fulfilment of a wish. It is the household puja of gratitude, and is booked on purnima through the year.',
    legend: 'The katha tells of a merchant who promised the puja if his wish were granted, forgot it once fortune came, and lost everything — regaining it only when he kept his word. It is read as a reminder that gratitude is part of the asking.',
    benefits: ['Gratitude offered for a wish fulfilled', 'Auspicious start for a new home or venture', 'Harmony and prosperity in the household', 'Blessings for a marriage or new beginning'],
    process: process(
      'Sankalp taken in the name of the household.',
      'Kalash sthapana and abhishek of Lord Satyanarayan.',
      'All five chapters of the Satyanarayan katha recited.',
      'Havan with purnahuti followed by aarti.',
      'Sheera prasad and tulsi couriered to your home.',
    ),
  },
  {
    slug: 'virupaksha-abhishek',
    name: 'Virupaksha Rudra Abhishek',
    hindi: 'विरूपाक्ष रुद्राभिषेक',
    type: 'normal',
    tag: 'नित्य सेवा',
    temple: 'virupaksha',
    deity: 'Lord Shiva',
    concerns: ['health', 'protection'],
    price: 900, mrp: 1400,
    rating: 4.6, reviews: 720, bookings: '90+ Bookings',
    image: '/img/t_hampi.jpg',
    card: '/img/t_hampi.jpg',
    date: 'Every day at 6:30 AM',
    why: 'The daily abhishek at one of the oldest continuously worshipped shrines in Bharat. Booked for steady health, peace at home, and protection through an unsettled period.',
    legend: 'Pampa Devi performed severe penance on the banks of the Tungabhadra to win Lord Shiva. He appeared as Virupaksha and married her, and the temple has been worshipped without a break since the 7th century.',
    benefits: ['Peace and steadiness at home', 'Support for health and recovery', 'Protection from unseen harm', 'Clarity of mind and purpose'],
    process: process(
      'Sankalp with your name and gotra at the sanctum.',
      'Abhishek with milk, curd, honey, ghee and Tungabhadra jal.',
      'Rudri path recited by the temple pandits.',
      'Deeparadhana offered in your name.',
      'Vibhuti and prasad couriered to your home.',
    ),
  },
  {
    slug: 'pampa-devi-shringar',
    name: 'Pampa Devi Shringar Seva',
    hindi: 'पंपा देवी श्रृंगार सेवा',
    type: 'normal',
    tag: 'देवी सेवा',
    temple: 'virupaksha',
    deity: 'Goddess Durga',
    concerns: ['marriage', 'love', 'protection'],
    price: 1400, mrp: 2100,
    rating: 4.7, reviews: 540, bookings: '70+ Bookings',
    image: '/img/gal_3.jpg',
    card: '/img/gal_3.jpg',
    date: 'Every Friday',
    why: 'Shringar of Pampa Devi is booked for marriage prospects, harmony between partners, and the protection a mother gives her children.',
    legend: 'Pampa is the old name of the Tungabhadra. The Devi who won Shiva through penance is worshipped here as the one who makes a difficult union possible.',
    benefits: ['Support for marriage prospects', 'Harmony between partners', 'Protection for the family', 'Confidence in difficult decisions'],
    process: process(
      'Sankalp taken before Pampa Devi in your name.',
      'Abhishek with panchamrit and rose water.',
      'Lalita Sahasranama recited during the shringar.',
      'Kumkum archana and evening aarti in your name.',
      'Kumkum and chunri prasad couriered home.',
    ),
  },
  {
    slug: 'kedarnath-jalabhishek',
    name: 'Kedarnath Jalabhishek Seva',
    hindi: 'केदारनाथ जलाभिषेक सेवा',
    type: 'normal',
    tag: 'नित्य सेवा',
    temple: 'kedarnath',
    deity: 'Lord Shiva',
    concerns: ['health', 'dosha', 'graha'],
    price: 800, mrp: 1200,
    rating: 4.8, reviews: 2410, bookings: '260+ Bookings',
    image: '/img/gal_1.jpg',
    card: '/img/gal_1.jpg',
    date: 'Daily during yatra season',
    why: 'The simplest seva at Kedarnath — Gangajal poured over the Jyotirlinga in your name during the morning darshan.',
    legend: 'The Pandavas pursued Shiva to Kedarnath seeking absolution. He took the form of a bull and dived into the ground; the hump that remained is the lingam worshipped here.',
    benefits: ['Relief from accumulated karma', 'Support for health and vitality', 'Peace of mind through hard phases', 'Blessings for a Char Dham sankalp'],
    process: process(
      'Sankalp with your name and gotra.',
      'Jalabhishek of the Kedarnath lingam with Gangajal.',
      'Om Namah Shivaya jaap during the abhishek.',
      'Morning aarti offered in your name.',
      'Bhasm and prasad couriered to your home.',
    ),
  },
  {
    slug: 'radha-raman-shringar',
    name: 'Radha Raman Shringar Darshan Seva',
    hindi: 'राधा रमण श्रृंगार सेवा',
    type: 'normal',
    tag: 'नित्य सेवा',
    temple: 'radha-raman',
    deity: 'Lord Krishna',
    concerns: ['love', 'marriage', 'finance'],
    price: 950, mrp: 1450,
    rating: 4.9, reviews: 3180, bookings: '310+ Bookings',
    image: '/img/t_prem.jpg',
    card: '/img/t_prem.jpg',
    date: 'Every morning shringar aarti',
    why: 'Shringar seva at Radha Raman is booked for love and harmony in relationships, and for the abundance that follows the pleasure of Krishna.',
    legend: 'Radha Raman Ji appeared from a shaligram shila in 1542. The deity is bathed, dressed and fed eight times a day in a tradition unbroken for nearly five centuries.',
    benefits: ['Harmony in love and marriage', 'Sweetness and peace at home', 'Abundance and steady income', 'Devotional focus and calm'],
    process: process(
      'Sankalp taken before Radha Raman Ji.',
      'Panchamrit abhishek during the mangala aarti.',
      'Full shringar with fresh flowers and ornaments.',
      'Bhog offered and shringar aarti performed in your name.',
      'Maha prasad and tulsi couriered to your home.',
    ),
  },
  {
    slug: 'ganpati-havan',
    name: 'Sankashti Ganpati Havan',
    hindi: 'संकष्टी गणपति हवन',
    type: 'havan',
    tag: 'विघ्न निवारण',
    temple: 'siddhivinayak',
    deity: 'Lord Ganesha',
    concerns: ['career', 'finance', 'education'],
    price: 2600, mrp: 3900,
    rating: 4.8, reviews: 890, bookings: '110+ Bookings',
    image: '/img/deity_hanuman.jpg',
    card: '/img/deity_hanuman.jpg',
    date: 'Every Sankashti Chaturthi',
    why: 'A full havan performed on Sankashti Chaturthi, the day set aside for removing obstacles. Booked when a venture has stalled or a decision keeps slipping.',
    legend: 'Sankashti means deliverance from difficulty. The fast and havan on this day are held to move what has refused to move.',
    benefits: ['Stalled work begins to move', 'Obstacles cleared in business', 'Success in examinations and interviews', 'Confidence in decision-making'],
    process: process(
      'Sankalp taken with your name, gotra and intention.',
      'Panchamrit abhishek of the Siddhivinayak murti.',
      '108 recitations of the Sankatnashan Ganesh Stotra.',
      'Havan with durva and modak purnahuti.',
      'Modak prasad and a Ganpati yantra sent home.',
    ),
  },
]

/* ============================================================
   Chadhava — items and combos, per temple
   ============================================================ */
export const CHADHAVAS = [
  {
    slug: 'morpankh-makhan-mishri',
    type: 'special',
    name: 'Offer Morpankh, Makhan-Mishri and Tulsi',
    temple: 'radha-raman', badge: 'MOST BOOKED',
    price: 240, mrp: 351, rating: 4.5, reviews: 1284,
    img: '/img/thali.png', contain: true,
    short: 'Offering Morpankh, Makhan-Mishri and Tulsi to Radha Raman Ji brings purity, good fortune and divine prosperity at home.',
    about: 'Radha Raman Ji is one of the seven self-manifested deities of Vrindavan. Morpankh is offered because Krishna wears it in his crown, makhan-mishri because it is what he loves most, and tulsi because no bhog is complete without it. This chadhava is offered in your name during the morning shringar aarti.',
    includes: ['Morpankh (peacock feather)', 'Makhan-Mishri bhog', 'Tulsi dal', 'Sankalp in your name', 'Photo & video of the offering', 'Prasad couriered home'],
  },
  {
    slug: 'rudrabhishek-samagri',
    type: 'normal',
    name: 'Rudrabhishek Samagri Chadhava',
    temple: 'kedarnath', badge: 'MOST BOOKED',
    price: 551, mrp: 751, rating: 4.8, reviews: 3120,
    img: '/img/chad_3.jpg',
    short: 'Bilva patra, Gangajal, milk and honey offered at the Kedarnath Jyotirlinga for health and protection.',
    about: 'Kedarnath is the highest of the twelve Jyotirlingas. This chadhava carries the complete rudrabhishek samagri — bilva patra, Gangajal, raw milk, honey, ghee and bhasm — offered at the lingam on your behalf during the morning abhishek.',
    includes: ['Bilva patra (108)', 'Gangajal abhishek', 'Panchamrit', 'Sankalp in your name', 'Photo & video of the offering', 'Bhasm prasad couriered home'],
  },
  {
    slug: 'chunri-shringar',
    type: 'special',
    name: 'Chunri & Shringar Offering',
    temple: 'kashi', badge: 'TRENDING',
    price: 401, mrp: 599, rating: 4.7, reviews: 2045,
    img: '/img/chad_shringar.jpg',
    short: 'Red chunri, bangles and full shringar offered to Maa for marriage harmony and family well-being.',
    about: 'Shringar is offered to the Devi as a mother is honoured by her children. Red chunri, bangles, sindoor, bindi and mahavar are placed at the feet of the deity, and the sankalp is taken in your name during the evening aarti.',
    includes: ['Red chunri', 'Bangles & sindoor', 'Full shringar samagri', 'Sankalp in your name', 'Photo & video of the offering', 'Chunri prasad couriered home'],
  },
  {
    slug: 'akhand-jyoti',
    type: 'normal',
    name: 'Akhand Jyoti Deepdaan',
    temple: 'virupaksha', badge: 'NEW',
    price: 301, mrp: 451, rating: 4.6, reviews: 876,
    img: '/img/shop_temple_product.jpg',
    short: 'A ghee lamp lit continuously in your name for nine days at the temple sanctum.',
    about: 'Deepdaan is the offering of light. A pure ghee lamp is lit in your name in the temple sanctum and kept burning without a break for nine days, tended by the temple pujari. Lighting a lamp is said to clear the darkness that sits over a household.',
    includes: ['Pure ghee akhand jyoti', 'Nine days continuous', 'Sankalp in your name', 'Daily photo update', 'Video of the deepdaan', 'Prasad couriered home'],
  },
  {
    slug: 'laddu-bhog',
    type: 'normal',
    name: 'Laddu Bhog & Annadaan',
    temple: 'radha-raman', badge: 'MOST BOOKED',
    price: 851, mrp: 1100, rating: 4.9, reviews: 4310,
    img: '/img/chad_laddu.jpg',
    short: 'Laddu bhog offered to the deity, then served as annadaan to devotees at the temple.',
    about: 'The bhog is first offered to the deity, then distributed. Annadaan — the giving of food — is held to be the highest form of daan. This chadhava feeds 51 devotees at the temple in your name after the bhog is offered.',
    includes: ['Laddu bhog offering', 'Annadaan for 51 devotees', 'Sankalp in your name', 'Photo & video of the seva', 'Certificate of annadaan', 'Prasad couriered home'],
  },
  {
    slug: 'nandi-shringar',
    type: 'special',
    name: 'Nandi Shringar & Abhishek',
    temple: 'kedarnath', badge: 'TRENDING',
    price: 451, mrp: 651, rating: 4.7, reviews: 1560,
    img: '/img/chad_nandi.jpg',
    short: 'Shringar of Nandi, who carries every prayer to Mahadev, performed in your name.',
    about: 'Nandi sits before every Shiva temple, and it is said that a wish whispered to Nandi reaches Mahadev. This chadhava performs Nandi shringar and abhishek in your name before the main darshan.',
    includes: ['Nandi abhishek', 'Full shringar', 'Bilva patra offering', 'Sankalp in your name', 'Photo & video of the offering', 'Prasad couriered home'],
  },
  {
    slug: 'modak-bhog',
    type: 'normal',
    name: 'Modak Bhog & Durva Offering',
    temple: 'siddhivinayak', badge: 'MOST BOOKED',
    price: 351, mrp: 501, rating: 4.8, reviews: 2760,
    img: '/img/chad_laddu.jpg',
    short: 'Twenty-one modak and durva grass offered to Siddhivinayak on Tuesday.',
    about: 'Ganpati is offered twenty-one modak and twenty-one blades of durva grass — the count is prescribed and the offering is made on Tuesday, the day of Siddhivinayak. The bhog is offered in your name and the prasad returned to you.',
    includes: ['21 modak bhog', '21 durva blades', 'Red jaswand flowers', 'Sankalp in your name', 'Photo & video of the offering', 'Modak prasad couriered home'],
  },
  {
    slug: 'gangajal-abhishek',
    type: 'special',
    name: 'Gangajal Abhishek at Trimbakeshwar',
    temple: 'trimbakeshwar', badge: 'NEW',
    price: 501, mrp: 751, rating: 4.7, reviews: 1120,
    img: '/img/gal_2.jpg',
    short: 'Abhishek of the three-faced Jyotirlinga with Gangajal drawn at the Godavari source.',
    about: 'Trimbakeshwar is the only Jyotirlinga with three faces, and it sits at the source of the Godavari. This chadhava performs abhishek with water drawn from the Kushavarta kund, offered at the lingam in your name.',
    includes: ['Kushavarta Gangajal', 'Bilva patra offering', 'Panchamrit abhishek', 'Sankalp in your name', 'Photo & video of the offering', 'Tirth jal couriered home'],
  },
]

export const COMBOS = [
  {
    slug: 'complete-bhakti',
    name: 'Complete Bhakti Combo',
    price: 899, mrp: 1250,
    img: '/img/thali.png', contain: true,
    items: ['Full shringar offering', 'Bhog and prasad', 'Deepdaan for the day', 'Sankalp in your name'],
    short: 'Shringar, bhog and deepdaan offered together in a single seva.',
  },
  {
    slug: 'aarti-diya',
    name: 'Aarti & Diya Combo',
    price: 649, mrp: 899,
    img: '/img/shop_temple_product.jpg',
    items: ['Ghee diya for the aarti', 'Camphor and dhoop', 'Flower offering', 'Sankalp in your name'],
    short: 'Diya, dhoop and flowers offered during the evening aarti.',
  },
  {
    slug: 'festive-special',
    name: 'Festive Special Combo',
    price: 1099, mrp: 1550,
    img: '/img/chad_laddu.jpg',
    items: ['Festive bhog', 'Full shringar', 'Annadaan for 21 devotees', 'Sankalp in your name'],
    short: 'The complete festival seva — bhog, shringar and annadaan.',
  },
]


/* ============================================================
   Booking flows — the app ships two per product.

   Puja
     Special  -> PujaBookingFlowScreen (/puja-booking-flow), stepped with
                 BookingStepsHeader. Date is fixed by the muhurat, so the
                 flow opens on Select Package and carries Last-Minute Add-Ons.
     Normal   -> BookPujaScreen (/book-puja). You pick the date; there is no
                 package tier, just a devotee count.

   Chadhava
     Special  -> ChadhavaBookingFlowScreen (/chadhava-booking-flow) ->
                 /chadhava-combos -> /chadhava-date-selection ->
                 /chadhava-address -> /chadhava-booking-preview
     Normal   -> ChadavaDetailScreen (/chadava-detail/:id): straight into the
                 cart, then the shared checkout.
   ============================================================ */

export const isSpecialPuja = (p) => p.type !== 'normal'
export const isSpecialChadhava = (c) => c.type === 'special'

export const FLOW_STEPS = {
  puja: {
    special: ['package', 'devotees', 'addons', 'address', 'preview'],
    normal: ['date', 'devotees', 'address', 'preview'],
  },
  chadhava: {
    special: ['package', 'devotees', 'address', 'preview'],
    normal: ['date', 'devotees', 'address', 'preview'],
  },
}

export const STEP_LABEL = {
  package: 'Select Package',
  offering: 'Select Offering',
  date: 'Select Date',
  devotees: 'Devotee Details',
  addons: 'Add-Ons',
  address: 'Select Address',
  preview: 'Booking Preview',
}

/* Special chadhava has a rolling same-day cut-off rather than a calendar
   deadline: offerings booked before 6pm go into the next morning aarti. */
export const CHADHAVA_CUTOFF_HOUR = 18

export function nextChadhavaCutoff(now = new Date()) {
  const d = new Date(now)
  d.setHours(CHADHAVA_CUTOFF_HOUR, 0, 0, 0)
  if (d <= now) d.setDate(d.getDate() + 1)
  return d
}

/* ---- helpers ---- */
export const getTemple = (id) => TEMPLES.find((t) => t.id === id)
export const getPuja = (slug) => PUJAS.find((p) => p.slug === slug)
export const getChadhava = (slug) => CHADHAVAS.find((c) => c.slug === slug)
export const getCombo = (slug) => COMBOS.find((c) => c.slug === slug)
export const pujasOf = (templeId) => PUJAS.filter((p) => p.temple === templeId)
export const chadhavasOf = (templeId) => CHADHAVAS.filter((c) => c.temple === templeId)

export function filterTemples({ q = '', sort = 'pop', deities = [], locations = [] } = {}) {
  let out = TEMPLES.slice()
  if (deities.length) out = out.filter((t) => deities.includes(t.deity))
  if (locations.length) out = out.filter((t) => locations.includes(t.loc))
  if (q.trim()) {
    const s = q.toLowerCase().trim()
    out = out.filter((t) => (t.name + t.deity + t.loc).toLowerCase().includes(s))
  }
  const by = {
    disc: (a, b) => b.disc - a.disc,
    price: (a, b) => a.price - b.price,
    rating: (a, b) => b.rating - a.rating,
    new: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
    pop: (a, b) => a.pop - b.pop,
  }
  return out.sort(by[sort] || by.pop)
}
