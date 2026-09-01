/* ============================================================
   Teerth module — TeerthHomeScreen / TeerthPackageDetailScreen /
   TeerthBookingScreen / TeerthBookingConfirmationScreen.

   Section names follow the APK widgets (TeerthHeroSection,
   TeerthBenefitsRow, PackageOverview/Highlights/Inclusions/Itinerary/
   Places/Rules/Reviews/Faqs, AccommodationOption, PackageBookingBar).
   ============================================================ */

/** Featured pilgrimage banner — a carousel, Ayodhya first as documented. */
export const TEERTH_HERO = [
  {
    id: 'ayodhya',
    place: 'Ayodhya',
    hindi: 'श्री राम जन्मभूमि',
    line: 'Where the Sarayu still carries the name of Ram',
    img: '/img/t_night.jpg',
  },
  {
    id: 'kashi',
    place: 'Kashi',
    hindi: 'काशी विश्वनाथ',
    line: 'The city Mahadev never leaves',
    img: '/img/gal_3.jpg',
  },
  {
    id: 'kedarnath',
    place: 'Kedarnath',
    hindi: 'केदारनाथ धाम',
    line: 'The highest of the twelve Jyotirlingas',
    img: '/img/temple_hero.jpg',
  },
]

/** TeerthBenefitsRow — the four documented booking benefits. */
export const TEERTH_BENEFITS = [
  { i: '👵', t: 'Senior-Friendly', s: 'Paced and arranged so elders can travel comfortably.' },
  { i: '🏨', t: 'Stay Close to Sites', s: 'Accommodation within reach of the temple, not an hour away.' },
  { i: '🧭', t: 'Guided Tours', s: 'A coordinator with you through the darshan and transfers.' },
  { i: '🛕', t: 'Priority Darshan', s: 'Priority access at selected temples on the itinerary.' },
]

/** Divine Darshan — circular destination cards, horizontally scrollable. */
export const DIVINE_DARSHAN = [
  { id: 'somnath', name: 'Somnath', img: '/img/t_hampi.jpg' },
  { id: 'mallikarjun', name: 'Mallikarjun', img: '/img/gal_3.jpg' },
  { id: 'mahakaleshwar', name: 'Mahakaleshwar', img: '/img/gal_4.jpg' },
  { id: 'kedarnath', name: 'Kedarnath', img: '/img/t_kedar.jpg' },
  { id: 'kashi', name: 'Kashi Vishwanath', img: '/img/t_night.jpg' },
  { id: 'vrindavan', name: 'Vrindavan', img: '/img/t_prem.jpg' },
]

/** AccommodationOption — standard / deluxe / premium, priced as a delta. */
export const ACCOMMODATIONS = [
  { id: 'standard', name: 'Standard', delta: 0, note: 'Clean 3-star stay, twin sharing' },
  { id: 'deluxe', name: 'Deluxe', delta: 2500, note: '4-star stay closer to the temple', popular: true },
  { id: 'premium', name: 'Premium', delta: 6000, note: '5-star stay with temple-view rooms' },
]

export const INSURANCE = { name: 'Travel Insurance', price: 349, note: 'Covers trip delay, medical and baggage' }

const commonInclusions = [
  'AC Transport',
  'All transfers & sightseeing in AC vehicle',
  'All permits & entry tickets',
  'Breakfast & Dinner',
  'Guided Pilgrimage Tour',
  'Accommodation on twin sharing',
]

const commonExclusions = [
  'Airfare / train fare unless stated',
  'Lunch and personal expenses',
  'Pony, palki or helicopter charges',
  'Anything not listed under inclusions',
]

const commonRules = [
  'Carry a government photo ID for every traveller — it is checked at temple entry.',
  'Itinerary may shift with weather, temple timings or administration orders.',
  'Priority darshan is subject to the temple trust on the day.',
  'Cancellation up to 15 days before departure is refunded less 10%.',
  'Modest dress is required at all the temples on the itinerary.',
]

const commonFaqs = [
  { q: 'Is the yatra suitable for elders?', a: 'Yes. The pace is set for senior travellers, stays are close to the temples, and a coordinator is with the group throughout.' },
  { q: 'What if the temple is closed on our date?', a: 'The coordinator reworks the day so the darshan happens on another slot within the trip. If it cannot, that portion is refunded.' },
  { q: 'Are meals vegetarian?', a: 'Entirely. All meals on the itinerary are satvik vegetarian, and Jain food can be arranged on request.' },
  { q: 'How many people are in a group?', a: 'Groups are capped at 24 travellers so the darshan and transfers stay manageable.' },
]

export const PACKAGES = [
  {
    slug: 'kashi-ayodhya-5d4n',
    name: 'Kashi – Ayodhya Yatra',
    duration: '5 Days / 4 Nights',
    from: 24999,
    mrp: 31999,
    rating: 4.8,
    reviews: 412,
    badges: ['WITH FLIGHT', 'BUDGET FRIENDLY'],
    img: '/img/t_night.jpg',
    gallery: ['/img/t_night.jpg', '/img/gal_3.jpg', '/img/gal_5.jpg', '/img/gal_1.jpg'],
    places: ['Kashi Vishwanath', 'Ganga Aarti, Dashashwamedh', 'Ram Janmabhoomi', 'Hanuman Garhi', 'Sarayu Ghat'],
    overview:
      'Five days across the two cities that hold the Ram katha and the Shiva katha together. Kashi for the Vishwanath darshan and the evening Ganga aarti, then Ayodhya for the Ram Janmabhoomi and the Sarayu. Transfers, permits and darshan slots are arranged, so the days are spent at the temples rather than in queues.',
    highlights: [
      'Rudrabhishek at Kashi Vishwanath in your name',
      'Reserved seating at the Dashashwamedh Ganga aarti',
      'Priority darshan at Ram Janmabhoomi',
      'Boat ride on the Sarayu at sunrise',
      'Coordinator with the group for all five days',
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      { d: 1, t: 'Arrive Kashi', s: 'Assemble at Kashi station. Har Har Mahadev! Transfer to the hotel, rest, then the evening Ganga aarti at Dashashwamedh Ghat from reserved seating.' },
      { d: 2, t: 'Kashi Vishwanath', s: 'Early Mangala aarti darshan, rudrabhishek in your name, then Kaal Bhairav and Annapurna temples. Afternoon free for the ghats.' },
      { d: 3, t: 'Kashi to Ayodhya', s: 'Sarnath in the morning, then drive to Ayodhya. Evening Sarayu aarti and rest.' },
      { d: 4, t: 'Ram Janmabhoomi', s: 'Priority darshan at Ram Janmabhoomi, then Hanuman Garhi, Kanak Bhawan and Nageshwarnath.' },
      { d: 5, t: 'Sarayu and departure', s: 'Sunrise boat ride on the Sarayu, prasad collection, then transfer for departure. Har Har Mahadev! We hope your yatra was blissful.' },
    ],
    rules: commonRules,
    faqs: commonFaqs,
  },
  {
    slug: 'char-dham-11d10n',
    name: 'Do Dham — Kedarnath & Badrinath',
    duration: '8 Days / 7 Nights',
    from: 38999,
    mrp: 47999,
    rating: 4.9,
    reviews: 268,
    badges: ['WITH FLIGHT'],
    img: '/img/t_kedar.jpg',
    gallery: ['/img/t_kedar.jpg', '/img/temple_hero.jpg', '/img/gal_1.jpg', '/img/gal_2.jpg'],
    places: ['Kedarnath', 'Badrinath', 'Haridwar', 'Rishikesh', 'Guptkashi'],
    overview:
      'The two Garhwal dhams over eight days, paced for the altitude. Haridwar and Rishikesh at the start to acclimatise, then Kedarnath and Badrinath with a rest day built in between. Helicopter transfer to Kedarnath can be added at booking.',
    highlights: [
      'Kedarnath darshan with the group coordinator',
      'Badrinath abhishek arranged in your name',
      'Ganga aarti at Har Ki Pauri, Haridwar',
      'Rest day built in for the altitude',
      'Oxygen and a medical kit with the group',
    ],
    inclusions: commonInclusions,
    exclusions: [...commonExclusions, 'Helicopter to Kedarnath (add-on)'],
    itinerary: [
      { d: 1, t: 'Arrive Haridwar', s: 'Transfer from Dehradun, then the evening Ganga aarti at Har Ki Pauri.' },
      { d: 2, t: 'Haridwar to Guptkashi', s: 'Drive through Devprayag and Rudraprayag, overnight at Guptkashi.' },
      { d: 3, t: 'Kedarnath', s: 'Early transfer to Sonprayag, trek or pony to Kedarnath, evening darshan.' },
      { d: 4, t: 'Kedarnath to Guptkashi', s: 'Morning aarti, then return and rest.' },
      { d: 5, t: 'Rest and acclimatise', s: 'A light day at Guptkashi before the drive to Badrinath.' },
      { d: 6, t: 'Badrinath', s: 'Drive to Badrinath, Tapt Kund, evening darshan and abhishek.' },
      { d: 7, t: 'Mana and Rishikesh', s: 'Mana village in the morning, then drive to Rishikesh.' },
      { d: 8, t: 'Departure', s: 'Triveni Ghat in the morning, then transfer for departure.' },
    ],
    rules: commonRules,
    faqs: commonFaqs,
  },
  {
    slug: 'dwarka-somnath-6d5n',
    name: 'Dwarka – Somnath Yatra',
    duration: '6 Days / 5 Nights',
    from: 21999,
    mrp: 27999,
    rating: 4.7,
    reviews: 194,
    badges: ['BUDGET FRIENDLY'],
    img: '/img/t_hampi.jpg',
    gallery: ['/img/t_hampi.jpg', '/img/gal_4.jpg', '/img/gal_2.jpg', '/img/gal_3.jpg'],
    places: ['Dwarkadhish', 'Somnath Jyotirlinga', 'Bet Dwarka', 'Nageshwar', 'Rukmini Temple'],
    overview:
      'Krishna at Dwarka and Mahadev at Somnath, with Bet Dwarka and Nageshwar on the way. Six days along the Saurashtra coast, at a pace that leaves time at each temple rather than rushing between them.',
    highlights: [
      'Dwarkadhish darshan with mangala aarti',
      'Somnath Jyotirlinga abhishek in your name',
      'Boat crossing to Bet Dwarka',
      'Evening light and sound show at Somnath',
      'Nageshwar Jyotirlinga on the itinerary',
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      { d: 1, t: 'Arrive Dwarka', s: 'Transfer from Jamnagar, evening Dwarkadhish aarti.' },
      { d: 2, t: 'Bet Dwarka', s: 'Boat to Bet Dwarka, then Nageshwar Jyotirlinga and Rukmini temple.' },
      { d: 3, t: 'Dwarka to Somnath', s: 'Drive along the coast, evening darshan at Somnath.' },
      { d: 4, t: 'Somnath', s: 'Morning abhishek, Bhalka Tirth and Triveni Sangam, evening light and sound show.' },
      { d: 5, t: 'Somnath and Gir', s: 'Free morning, optional Gir excursion in the afternoon.' },
      { d: 6, t: 'Departure', s: 'Prasad collection and transfer for departure.' },
    ],
    rules: commonRules,
    faqs: commonFaqs,
  },
  {
    slug: 'vrindavan-mathura-4d3n',
    name: 'Braj Darshan — Mathura & Vrindavan',
    duration: '4 Days / 3 Nights',
    from: 14999,
    mrp: 19999,
    rating: 4.8,
    reviews: 336,
    badges: ['BUDGET FRIENDLY'],
    img: '/img/t_prem.jpg',
    gallery: ['/img/t_prem.jpg', '/img/gal_3.jpg', '/img/gal_4.jpg', '/img/deity_hanuman.jpg'],
    places: ['Banke Bihari', 'Prem Mandir', 'Krishna Janmabhoomi', 'Govardhan', 'Radha Raman'],
    overview:
      'Four days in Braj — Banke Bihari and Radha Raman at Vrindavan, Krishna Janmabhoomi at Mathura, and the Govardhan parikrama. Timed around the shringar darshans, which is when these temples are worth seeing.',
    highlights: [
      'Banke Bihari shringar darshan',
      'Govardhan parikrama with the group',
      'Evening at Prem Mandir when the lights come on',
      'Radha Raman morning aarti',
      'Yamuna aarti at Vishram Ghat',
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      { d: 1, t: 'Arrive Mathura', s: 'Transfer from Delhi, Krishna Janmabhoomi darshan, evening Yamuna aarti at Vishram Ghat.' },
      { d: 2, t: 'Vrindavan', s: 'Banke Bihari shringar darshan, Radha Raman, ISKCON, then Prem Mandir after dark.' },
      { d: 3, t: 'Govardhan', s: 'Govardhan parikrama, Kusum Sarovar and Barsana.' },
      { d: 4, t: 'Departure', s: 'Morning darshan, prasad collection and transfer for departure.' },
    ],
    rules: commonRules,
    faqs: commonFaqs,
  },
]

export const REVIEWS = [
  { name: 'Suresh & Lata P.', stars: 5, text: 'We are both past seventy and it was managed so well. The coordinator stayed with us at every darshan.' },
  { name: 'Anita D.', stars: 5, text: 'The hotel was a five minute walk from the temple, which made all the difference in the mornings.' },
  { name: 'Ramesh K.', stars: 4, text: 'Good arrangements throughout. One day was reshuffled because of temple timings but it was handled well.' },
]

/** Preparation steps shown on the confirmation screen. */
export const PREP_STEPS = [
  'Carry a government photo ID for every traveller.',
  'Pack modest clothing that covers shoulders and knees.',
  'Comfortable walking shoes — there is a fair amount on foot.',
  'Any regular medication, plus a copy of the prescription.',
]

export const getPackage = (slug) => PACKAGES.find((p) => p.slug === slug)
