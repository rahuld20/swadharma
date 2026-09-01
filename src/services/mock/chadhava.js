/* Mirrors the app's AllChadavasScreen / ChadavaDetailScreen content. */

export const CHADHAVA_TEMPLES = [
  { id: 'kedarnath', name: 'Kedarnath Temple', img: '/img/t_kedar.jpg', place: 'Uttarakhand', deity: 'Lord Shiva' },
  { id: 'radha-raman', name: 'Radha Raman Temple', img: '/img/t_prem.jpg', place: 'Vrindavan', deity: 'Radha Raman Ji' },
  { id: 'virupaksha', name: 'Virupaksha Temple', img: '/img/t_hampi.jpg', place: 'Hampi', deity: 'Lord Virupaksha' },
  { id: 'kashi', name: 'Kashi Vishwanath', img: '/img/t_night.jpg', place: 'Varanasi', deity: 'Lord Shiva' },
]

export const CHADHAVAS = [
  {
    slug: 'morpankh-makhan-mishri',
    name: 'Offer Morpankh, Makhan-Mishri and Tulsi',
    temple: 'radha-raman',
    badge: 'SPECIAL',
    price: 240,
    mrp: 351,
    rating: 4.5,
    reviews: 1284,
    img: '/img/thali.png',
    contain: true,
    short: 'Offering Morpankh, Makhan-Mishri and Tulsi to Radha Raman Ji brings purity, good fortune and divine prosperity at home.',
    about:
      'Radha Raman Ji is one of the seven self-manifested deities of Vrindavan. Morpankh is offered because Krishna wears it in his crown, makhan-mishri because it is what he loves most, and tulsi because no bhog is complete without it. This chadhava is offered in your name during the morning shringar aarti.',
    includes: ['Morpankh (peacock feather)', 'Makhan-Mishri bhog', 'Tulsi dal', 'Sankalp in your name', 'Photo & video of the offering', 'Prasad couriered home'],
  },
  {
    slug: 'rudrabhishek-samagri',
    name: 'Rudrabhishek Samagri Chadhava',
    temple: 'kedarnath',
    badge: 'MOST BOOKED',
    price: 551,
    mrp: 751,
    rating: 4.8,
    reviews: 3120,
    img: '/img/chad_3.jpg',
    short: 'Bilva patra, Gangajal, milk and honey offered at the Kedarnath Jyotirlinga for health and protection.',
    about:
      'Kedarnath is the highest of the twelve Jyotirlingas. This chadhava carries the complete rudrabhishek samagri — bilva patra, Gangajal, raw milk, honey, ghee and bhasm — offered at the lingam on your behalf during the morning abhishek.',
    includes: ['Bilva patra (108)', 'Gangajal abhishek', 'Panchamrit', 'Sankalp in your name', 'Photo & video of the offering', 'Bhasm prasad couriered home'],
  },
  {
    slug: 'chunri-shringar',
    name: 'Chunri & Shringar Offering',
    temple: 'kashi',
    badge: 'SPECIAL',
    price: 401,
    mrp: 599,
    rating: 4.7,
    reviews: 2045,
    img: '/img/chad_shringar.jpg',
    short: 'Red chunri, bangles and full shringar offered to Maa for marriage harmony and family well-being.',
    about:
      'Shringar is offered to the Devi as a mother is honoured by her children. Red chunri, bangles, sindoor, bindi and mahavar are placed at the feet of the deity, and the sankalp is taken in your name during the evening aarti.',
    includes: ['Red chunri', 'Bangles & sindoor', 'Full shringar samagri', 'Sankalp in your name', 'Photo & video of the offering', 'Chunri prasad couriered home'],
  },
  {
    slug: 'akhand-jyoti',
    name: 'Akhand Jyoti Deepdaan',
    temple: 'virupaksha',
    badge: 'NEW',
    price: 301,
    mrp: 451,
    rating: 4.6,
    reviews: 876,
    img: '/img/shop_temple_product.jpg',
    short: 'A ghee lamp lit continuously in your name for nine days at the temple sanctum.',
    about:
      'Deepdaan is the offering of light. A pure ghee lamp is lit in your name in the temple sanctum and kept burning without a break for nine days, tended by the temple pujari. Lighting a lamp is said to clear the darkness that sits over a household.',
    includes: ['Pure ghee akhand jyoti', 'Nine days continuous', 'Sankalp in your name', 'Daily photo update', 'Video of the deepdaan', 'Prasad couriered home'],
  },
  {
    slug: 'laddu-bhog',
    name: 'Laddu Bhog & Annadaan',
    temple: 'radha-raman',
    badge: 'MOST BOOKED',
    price: 851,
    mrp: 1100,
    rating: 4.9,
    reviews: 4310,
    img: '/img/chad_laddu.jpg',
    short: 'Laddu bhog offered to the deity, then served as annadaan to devotees at the temple.',
    about:
      'The bhog is first offered to the deity, then distributed. Annadaan — the giving of food — is held to be the highest form of daan. This chadhava feeds 51 devotees at the temple in your name after the bhog is offered.',
    includes: ['Laddu bhog offering', 'Annadaan for 51 devotees', 'Sankalp in your name', 'Photo & video of the seva', 'Certificate of annadaan', 'Prasad couriered home'],
  },
  {
    slug: 'nandi-shringar',
    name: 'Nandi Shringar & Abhishek',
    temple: 'kedarnath',
    badge: 'SPECIAL',
    price: 451,
    mrp: 651,
    rating: 4.7,
    reviews: 1560,
    img: '/img/chad_nandi.jpg',
    short: 'Shringar of Nandi, who carries every prayer to Mahadev, performed in your name.',
    about:
      'Nandi sits before every Shiva temple, and it is said that a wish whispered to Nandi reaches Mahadev. This chadhava performs Nandi shringar and abhishek in your name before the main darshan.',
    includes: ['Nandi abhishek', 'Full shringar', 'Bilva patra offering', 'Sankalp in your name', 'Photo & video of the offering', 'Prasad couriered home'],
  },
]

export const COMBOS = [
  { id: 'single', name: 'Single Offering', qty: 1, multiplier: 1, note: 'Offered once in your name' },
  { id: 'family', name: 'Family Offering', qty: 4, multiplier: 3.4, note: 'Sankalp for 4 family members', popular: true },
  { id: 'monthly', name: 'Monthly Seva', qty: 4, multiplier: 3.6, note: 'Offered every week for a month' },
]

export const getChadhava = (slug) => CHADHAVAS.find((c) => c.slug === slug)
export const getTemple = (id) => CHADHAVA_TEMPLES.find((t) => t.id === id)
