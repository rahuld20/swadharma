/* ============================================================
   Store module — EcommerceHomeScreen / EcomAllProductsScreen /
   EcomProductDetailScreen / EcomWishlistScreen.

   Sections follow the APK widgets (EcomBestSellersSection,
   EcomPopularProductsSection, EcomDeitySection, ShopByPurposeSection,
   EcomCollectionGridSection, EcomGemStoneSection, EcomUniqueCollectionSection)
   and the Store Tab section of the documentation.
   ============================================================ */

/** Circular quick categories under the search bar. */
export const QUICK_CATS = [
  { id: 'astro-diyas', label: 'Astro Diyas', img: '/img/shop_temple_product.jpg' },
  { id: 'health', label: 'Health & Wellness', img: '/img/concern/ic_health.png', contain: true },
  { id: 'gemstone', label: 'Gemstone', img: '/img/prod_lapis.jpg' },
  { id: 'jap-mala', label: 'Jap Mala', img: '/img/shop_pooja_essentials.jpg' },
  { id: 'murti', label: 'Puja Murti', img: '/img/shop_puja_murti.jpg' },
  { id: 'gifting', label: 'Gifting', img: '/img/shop_gifting.jpg' },
]

export const STORE_TRUST = [
  { i: '🕐', t: '24/7 assistance' },
  { i: '✅', t: 'Authentic products' },
  { i: '🔒', t: 'Secure checkout' },
]

export const STORE_BANNERS = [
  {
    id: 'zodiac',
    kicker: 'NEW ARRIVAL',
    title: 'Zodiac Pendant',
    sub: 'Your sign, cast in sterling silver',
    img: '/img/prod_lapis.jpg',
    grad: 'linear-gradient(120deg, #2b2f77, #5b3a8e)',
  },
  {
    id: 'brass',
    kicker: 'HANDCRAFTED',
    title: 'Brass Idol Collection',
    sub: 'Cast by artisans in Moradabad',
    img: '/img/shop_puja_murti.jpg',
    grad: 'linear-gradient(120deg, #7a3b12, #a8621f)',
  },
]

/* ---------- discovery axes ---------- */
export const DEITIES = [
  { id: 'balaji', label: 'Balaji', img: '/img/deity_hanuman.jpg' },
  { id: 'durga', label: 'Maa Durga', img: '/img/gal_3.jpg' },
  { id: 'lakshmi', label: 'Maa Lakshmi', img: '/img/concern/ic_finance.png', contain: true },
  { id: 'ganesha', label: 'Ganesha', img: '/img/shop_puja_murti.jpg' },
  { id: 'shiva', label: 'Shiva', img: '/img/deity_shiva.jpg' },
  { id: 'krishna', label: 'Krishna', img: '/img/t_prem.jpg' },
]

export const PURPOSES = [
  { id: 'gifting', label: 'Gifting', img: '/img/shop_gifting.jpg' },
  { id: 'spiritual-wear', label: 'Spiritual Wear', img: '/img/shop_spiritual_wear.jpg' },
  { id: 'spiritual-home', label: 'Spiritual Home', img: '/img/shop_spiritual_home.jpg' },
  { id: 'pooja-essentials', label: 'Pooja Essentials', img: '/img/shop_pooja_essentials.jpg' },
  { id: 'puja-murti', label: 'Puja Murti', img: '/img/shop_puja_murti.jpg' },
  { id: 'temple-product', label: 'Temple Products', img: '/img/shop_temple_product.jpg' },
]

export const LIFE_GOALS = [
  { id: 'love', label: 'Love & Relationship', img: '/img/concern/ic_love.png' },
  { id: 'protection', label: 'Protection & Peace', img: '/img/concern/ic_protection.png' },
  { id: 'career', label: 'Career & Success', img: '/img/concern/ic_career.png' },
  { id: 'spiritual', label: 'Spiritual Growth', img: '/img/concern/ic_graha_shanti.png' },
  { id: 'health', label: 'Health & Wellness', img: '/img/concern/ic_health.png' },
  { id: 'wealth', label: 'Wealth & Prosperity', img: '/img/concern/ic_finance.png' },
]

export const COLLECTIONS = [
  { id: 'brass-idols', label: 'Brass Idols', sub: 'Traditional idols cast in solid brass', img: '/img/shop_puja_murti.jpg' },
  { id: 'vastu', label: 'Vastu', sub: 'For balance and positive surroundings', img: '/img/shop_spiritual_home.jpg' },
  { id: 'yantra', label: 'Yantra Collection', sub: 'Energised yantras for daily practice', img: '/img/shop_temple_product.jpg' },
]

export const GEM_CATEGORIES = [
  { id: 'bracelets', label: 'Bracelets', sub: 'Crystal & gem bracelets', img: '/img/prod_black_agate.jpg' },
  { id: 'pendants', label: 'Pendants', sub: 'Sterling silver settings', img: '/img/prod_lapis.jpg' },
  { id: 'rudraksha', label: 'Rudraksha', sub: 'Certified Nepali beads', img: '/img/shop_pooja_essentials.jpg' },
  { id: 'gemstones', label: 'Gemstones', sub: 'Lab-certified stones', img: '/img/shop_spiritual_wear.jpg' },
  { id: 'pyramids', label: 'Pyramids', sub: 'Vastu and meditation pyramids', img: '/img/shop_spiritual_home.jpg' },
  { id: 'anklets', label: 'Anklets', sub: 'Crystal anklets', img: '/img/concern/ic_love.png', contain: true },
]

export const STORE_STATS = [
  { value: '1–3 Days', label: 'Fast pan-India delivery' },
  { value: '500+', label: 'Curated products' },
  { value: '4.8', label: 'Customer rating' },
  { value: 'Easy returns', label: 'Hassle-free policy' },
]

/* ---------- listing filters ---------- */
export const PRODUCT_CATS = ['Bracelets', 'Pendants', 'Idols', 'Malas', 'Diyas', 'Thali', 'Gifting']

export const PRODUCT_SORTS = [
  { k: 'popular', label: 'Popularity' },
  { k: 'low', label: 'Price : Low to High' },
  { k: 'high', label: 'Price : High to Low' },
  { k: 'rating', label: 'Customer Top Rated' },
  { k: 'new', label: 'New Arrivals' },
]

export const PRICE_BANDS = [
  { id: 'u500', label: 'Under ₹500', min: 0, max: 499 },
  { id: '500-1000', label: '₹500 – ₹1000', min: 500, max: 1000 },
  { id: '1000-2500', label: '₹1000 – ₹2500', min: 1000, max: 2500 },
  { id: 'o2500', label: 'Above ₹2500', min: 2501, max: Infinity },
]

const COLOURS = ['Natural', 'Black', 'Gold']
const SIZES = ['Small', 'Medium', 'Large']

/* ---------- products ---------- */
export const PRODUCTS = [
  {
    id: 'black-agate-bracelet',
    name: 'Black Agate Protection Bracelet',
    cat: 'Bracelets', purpose: 'spiritual-wear', deity: 'shiva', goal: 'protection', gem: 'bracelets',
    price: 499, mrp: 799, rating: 4.7, reviews: 1284, sold: 8400,
    img: '/img/prod_black_agate.jpg',
    material: '8mm black agate, elastic thread',
    badge: 'BESTSELLER', isNew: false, stock: 42,
    colours: COLOURS, sizes: SIZES,
    about: 'Black agate is worn for grounding and for keeping a clear head under pressure. Beads are hand-knotted on elastic so the bracelet sits flat and does not roll on the wrist.',
    images: ['/img/pr/black-agate-bracelet_1.jpg', '/img/pr/black-agate-bracelet_2.jpg', '/img/pr/black-agate-bracelet_3.jpg'],
    highlights: [{ t: 'Certified', tone: 'ok' }, { t: 'Energised at temple', tone: 'ok' }, { t: 'Free delivery', tone: 'info' }],
    specs: [{ k: 'Bead size', v: '8 mm' }, { k: 'Beads', v: '21 + guru bead' }, { k: 'Thread', v: 'Double elastic' }, { k: 'Wrist fit', v: '6.5 - 8 inch' }, { k: 'Origin', v: 'Khambhat, Gujarat' }, { k: 'Certificate', v: 'Included' }],
    recommendedFor: ['Saturn transit', 'Public speaking', 'Anxiety'],
    outOfStockSizes: ['Large'],
    zodiac: ['Capricorn', 'Aquarius', 'Scorpio'],
  },
  {
    id: 'lapis-bracelet',
    name: 'Lapis Lazuli Stone Bracelet',
    cat: 'Bracelets', purpose: 'spiritual-wear', deity: 'durga', goal: 'career', gem: 'bracelets',
    price: 499, mrp: 899, rating: 4.6, reviews: 962, sold: 6100,
    img: '/img/prod_lapis.jpg',
    material: '8mm lapis lazuli, elastic thread',
    badge: 'BESTSELLER', isNew: false, stock: 28,
    colours: COLOURS, sizes: SIZES,
    about: 'Lapis is the stone of clear speech. Worn by people who need to be understood — in a classroom, a courtroom or a boardroom.',
    images: ['/img/pr/lapis-bracelet_1.jpg', '/img/pr/lapis-bracelet_2.jpg', '/img/pr/lapis-bracelet_3.jpg'],
    highlights: [{ t: 'Lab certified', tone: 'ok' }, { t: 'Natural stone', tone: 'ok' }, { t: 'Free delivery', tone: 'info' }],
    specs: [{ k: 'Bead size', v: '8 mm' }, { k: 'Beads', v: '21 + guru bead' }, { k: 'Thread', v: 'Double elastic' }, { k: 'Wrist fit', v: '6.5 - 8 inch' }, { k: 'Origin', v: 'Afghanistan lapis' }, { k: 'Certificate', v: 'Included' }],
    recommendedFor: ['Students', 'Negotiation', 'Throat chakra'],
    outOfStockSizes: [],
    zodiac: ['Sagittarius', 'Libra', 'Taurus'],
  },
  {
    id: 'amethyst-bracelet',
    name: 'Amethyst Healing Bracelet',
    cat: 'Bracelets', purpose: 'spiritual-wear', deity: 'shiva', goal: 'health', gem: 'bracelets',
    price: 599, mrp: 999, rating: 4.8, reviews: 2140, sold: 11200,
    img: '/img/shop_spiritual_wear.jpg',
    material: '8mm natural amethyst',
    badge: 'TRENDING', isNew: true, stock: 65,
    colours: COLOURS, sizes: SIZES,
    about: 'Amethyst is the calming stone — worn for sleep, for anxiety, and by people who overthink at night.',
    images: ['/img/pr/amethyst-bracelet_1.jpg', '/img/pr/amethyst-bracelet_2.jpg', '/img/pr/amethyst-bracelet_3.jpg'],
    highlights: [{ t: 'Natural amethyst', tone: 'ok' }, { t: 'Energised', tone: 'ok' }, { t: 'New arrival', tone: 'info' }],
    specs: [{ k: 'Bead size', v: '8 mm' }, { k: 'Beads', v: '22' }, { k: 'Thread', v: 'Double elastic' }, { k: 'Wrist fit', v: '6.5 - 8 inch' }, { k: 'Origin', v: 'Brazil' }, { k: 'Certificate', v: 'Included' }],
    recommendedFor: ['Sleep', 'Overthinking', 'Meditation'],
    outOfStockSizes: ['Small'],
    zodiac: ['Pisces', 'Aquarius', 'Virgo'],
  },
  {
    id: 'brass-ganesha',
    name: 'Brass Ganesha Idol',
    cat: 'Idols', purpose: 'puja-murti', deity: 'ganesha', goal: 'career', gem: null,
    price: 1899, mrp: 2600, rating: 4.9, reviews: 640, sold: 3100,
    img: '/img/shop_puja_murti.jpg',
    material: 'Solid brass, 5 inch, antique finish',
    badge: 'BESTSELLER', isNew: false, stock: 17,
    colours: ['Antique', 'Polished'], sizes: ['4 inch', '5 inch', '7 inch'],
    about: 'Cast in solid brass by artisans in Moradabad, then hand-finished. Weight and detail you can feel — this is not a hollow plated piece.',
    images: ['/img/pr/brass-ganesha_1.jpg', '/img/pr/brass-ganesha_2.jpg', '/img/pr/brass-ganesha_3.jpg'],
    highlights: [{ t: 'Solid brass', tone: 'ok' }, { t: 'Hand finished', tone: 'ok' }, { t: 'Made in Moradabad', tone: 'info' }],
    specs: [{ k: 'Height', v: '5 inch' }, { k: 'Weight', v: '1.2 kg' }, { k: 'Material', v: 'Solid brass' }, { k: 'Finish', v: 'Antique' }, { k: 'Base', v: 'Flat, non-slip' }, { k: 'Care', v: 'Dry cloth only' }],
    recommendedFor: ['New home', 'Business start', 'Study room'],
    outOfStockSizes: ['7 inch'],
    zodiac: [],
  },
  {
    id: 'camphor-burner',
    name: 'Brass Camphor Aarti Burner',
    cat: 'Diyas', purpose: 'temple-product', deity: 'shiva', goal: 'protection', gem: null,
    price: 749, mrp: 1099, rating: 4.7, reviews: 418, sold: 2600,
    img: '/img/shop_temple_product.jpg',
    material: 'Brass with wooden handle',
    badge: null, isNew: false, stock: 33,
    colours: ['Brass'], sizes: ['Standard'],
    about: 'For the camphor aarti at the end of a puja. The wooden handle stays cool, which matters when the flame runs a while.',
    images: ['/img/pr/camphor-burner_1.jpg', '/img/pr/camphor-burner_2.jpg', '/img/pr/camphor-burner_3.jpg'],
    highlights: [{ t: 'Brass body', tone: 'ok' }, { t: 'Heat-safe handle', tone: 'ok' }, { t: 'Free delivery', tone: 'info' }],
    specs: [{ k: 'Length', v: '9 inch' }, { k: 'Weight', v: '280 g' }, { k: 'Material', v: 'Brass' }, { k: 'Handle', v: 'Seasoned wood' }, { k: 'Use', v: 'Camphor aarti' }, { k: 'Care', v: 'Dry cloth only' }],
    recommendedFor: ['Daily aarti', 'Festivals', 'Temple use'],
    outOfStockSizes: [],
    zodiac: [],
  },
  {
    id: 'rudraksha-mala',
    name: 'Rudraksha Mala 108 Beads',
    cat: 'Malas', purpose: 'pooja-essentials', deity: 'shiva', goal: 'spiritual', gem: 'rudraksha',
    price: 1299, mrp: 1899, rating: 4.8, reviews: 1820, sold: 9400,
    img: '/img/shop_pooja_essentials.jpg',
    material: '5-mukhi Nepali rudraksha, cotton thread',
    badge: 'BESTSELLER', isNew: false, stock: 51,
    colours: ['Natural'], sizes: ['6mm', '8mm'],
    about: 'Certified 5-mukhi Nepali beads, knotted between each bead so the mala does not scatter if the thread gives. 108 plus the sumeru.',
    images: ['/img/pr/rudraksha-mala_1.jpg', '/img/pr/rudraksha-mala_2.jpg', '/img/pr/rudraksha-mala_3.jpg'],
    highlights: [{ t: '5-mukhi certified', tone: 'ok' }, { t: 'Knotted', tone: 'ok' }, { t: 'Nepali beads', tone: 'info' }],
    specs: [{ k: 'Beads', v: '108 + sumeru' }, { k: 'Bead size', v: '8 mm' }, { k: 'Mukhi', v: '5' }, { k: 'Thread', v: 'Knotted cotton' }, { k: 'Origin', v: 'Nepal' }, { k: 'Certificate', v: 'Included' }],
    recommendedFor: ['Japa', 'Shiva sadhana', 'Daily wear'],
    outOfStockSizes: [],
    zodiac: [],
  },
  {
    id: 'pooja-thali',
    name: 'Silver Pooja Thali Set',
    cat: 'Thali', purpose: 'pooja-essentials', deity: 'lakshmi', goal: 'wealth', gem: null,
    price: 2499, mrp: 3400, rating: 4.9, reviews: 512, sold: 1900,
    img: '/img/thali.png', contain: true,
    material: 'Silver-plated brass, 7 pieces',
    badge: 'TRENDING', isNew: false, stock: 12,
    colours: ['Silver'], sizes: ['7 piece', '11 piece'],
    about: 'A complete thali — diya, kumkum, akshat, agarbatti stand, ghanti, chammach and the thali itself. Silver-plated over brass, so it holds up to daily use.',
    images: ['/img/pr/pooja-thali_1.jpg', '/img/pr/pooja-thali_2.jpg', '/img/pr/pooja-thali_3.jpg'],
    highlights: [{ t: 'Silver plated', tone: 'ok' }, { t: '7 pieces', tone: 'ok' }, { t: 'Gift boxed', tone: 'info' }],
    specs: [{ k: 'Pieces', v: '7' }, { k: 'Thali width', v: '10 inch' }, { k: 'Material', v: 'Silver-plated brass' }, { k: 'Includes', v: 'Diya, ghanti, chammach' }, { k: 'Finish', v: 'Mirror polish' }, { k: 'Care', v: 'Silver cloth' }],
    recommendedFor: ['Wedding gift', 'Griha pravesh', 'Diwali'],
    outOfStockSizes: ['11 piece'],
    zodiac: [],
  },
  {
    id: 'sandalwood-gift-box',
    name: 'Sandalwood Gift Box',
    cat: 'Gifting', purpose: 'gifting', deity: 'lakshmi', goal: 'love', gem: null,
    price: 1599, mrp: 2199, rating: 4.7, reviews: 306, sold: 1400,
    img: '/img/shop_gifting.jpg',
    material: 'Sandalwood incense, oil and soap',
    badge: 'NEW', isNew: true, stock: 24,
    colours: ['Natural'], sizes: ['Standard'],
    about: 'Mysore sandalwood incense, a small bottle of oil and a soap, boxed for gifting. The usual choice for a housewarming or a wedding.',
    images: ['/img/pr/sandalwood-gift-box_1.jpg', '/img/pr/sandalwood-gift-box_2.jpg', '/img/pr/sandalwood-gift-box_3.jpg'],
    highlights: [{ t: 'Mysore sandalwood', tone: 'ok' }, { t: 'Gift boxed', tone: 'ok' }, { t: 'New arrival', tone: 'info' }],
    specs: [{ k: 'Contents', v: 'Incense, oil, soap' }, { k: 'Incense', v: '40 sticks' }, { k: 'Oil', v: '10 ml' }, { k: 'Soap', v: '100 g' }, { k: 'Origin', v: 'Mysore' }, { k: 'Shelf life', v: '24 months' }],
    recommendedFor: ['Housewarming', 'Wedding', 'Corporate gift'],
    outOfStockSizes: [],
    zodiac: [],
  },
  {
    id: 'akhand-jyoti-diya',
    name: 'Pure Brass Akhand Jyoti Diya',
    cat: 'Diyas', purpose: 'spiritual-home', deity: 'durga', goal: 'protection', gem: null,
    price: 899, mrp: 1299, rating: 4.8, reviews: 726, sold: 4200,
    img: '/img/shop_temple_product.jpg',
    material: 'Brass, glass chimney',
    badge: null, isNew: false, stock: 38,
    colours: ['Brass'], sizes: ['Small', 'Large'],
    about: 'A covered diya that keeps a ghee flame going through the night without the wick guttering. Used for akhand jyoti during Navratri.',
    images: ['/img/pr/akhand-jyoti-diya_1.jpg', '/img/pr/akhand-jyoti-diya_2.jpg', '/img/pr/akhand-jyoti-diya_3.jpg'],
    highlights: [{ t: 'Wind proof', tone: 'ok' }, { t: 'Brass body', tone: 'ok' }, { t: 'Free delivery', tone: 'info' }],
    specs: [{ k: 'Height', v: '7 inch' }, { k: 'Material', v: 'Brass + glass' }, { k: 'Burn time', v: '10-12 hours' }, { k: 'Fuel', v: 'Ghee or oil' }, { k: 'Chimney', v: 'Removable' }, { k: 'Care', v: 'Dry cloth only' }],
    recommendedFor: ['Navratri', 'Akhand jyoti', 'Daily diya'],
    outOfStockSizes: [],
    zodiac: [],
  },
  {
    id: 'ghee-diya-batti',
    name: 'Cow Ghee Diya Batti (Pack of 100)',
    cat: 'Diyas', purpose: 'pooja-essentials', deity: 'lakshmi', goal: 'wealth', gem: null,
    price: 349, mrp: 549, rating: 4.6, reviews: 1140, sold: 7800,
    img: '/img/chad_laddu.jpg',
    material: 'Cow ghee wicks, ready to light',
    badge: 'BESTSELLER', isNew: false, stock: 120,
    colours: ['Natural'], sizes: ['100 pcs', '200 pcs'],
    about: 'Pre-rolled cow ghee wicks — no pouring, no mess. Each burns about 45 minutes.',
    images: ['/img/pr/ghee-diya-batti_1.jpg', '/img/pr/ghee-diya-batti_2.jpg', '/img/pr/ghee-diya-batti_3.jpg'],
    highlights: [{ t: 'Pure cow ghee', tone: 'ok' }, { t: 'Ready to light', tone: 'ok' }, { t: 'Bulk pack', tone: 'info' }],
    specs: [{ k: 'Pieces', v: '100' }, { k: 'Burn time', v: '45 min each' }, { k: 'Fuel', v: 'Cow ghee' }, { k: 'Wick', v: 'Cotton' }, { k: 'Smoke', v: 'Low' }, { k: 'Shelf life', v: '12 months' }],
    recommendedFor: ['Daily puja', 'Festivals', 'Temple donation'],
    outOfStockSizes: [],
    zodiac: [],
  },
  {
    id: 'rose-quartz-heart',
    name: 'Rose Quartz Heart Stone',
    cat: 'Gemstones', purpose: 'spiritual-wear', deity: 'krishna', goal: 'love', gem: 'gemstones',
    price: 699, mrp: 1099, rating: 4.7, reviews: 884, sold: 5200,
    img: '/img/concern/ic_love.png', contain: true,
    material: 'Natural rose quartz, polished',
    badge: 'TRENDING', isNew: true, stock: 46,
    colours: ['Pink'], sizes: ['Small', 'Medium'],
    about: 'Rose quartz is the stone kept for relationships — carried, or placed in the bedroom rather than the puja room.',
    images: ['/img/pr/rose-quartz-heart_1.jpg', '/img/pr/rose-quartz-heart_2.jpg', '/img/pr/rose-quartz-heart_3.jpg'],
    highlights: [{ t: 'Natural stone', tone: 'ok' }, { t: 'Hand polished', tone: 'ok' }, { t: 'Trending', tone: 'info' }],
    specs: [{ k: 'Size', v: '45 mm' }, { k: 'Weight', v: '60 g' }, { k: 'Material', v: 'Natural rose quartz' }, { k: 'Finish', v: 'Hand polished' }, { k: 'Origin', v: 'Brazil' }, { k: 'Certificate', v: 'Included' }],
    recommendedFor: ['Relationships', 'Self-care', 'Bedroom'],
    outOfStockSizes: [],
    zodiac: ['Taurus', 'Libra', 'Cancer'],
  },
  {
    id: 'lakshmi-coin',
    name: 'Lakshmi Ganesh Silver Coin',
    cat: 'Gifting', purpose: 'gifting', deity: 'lakshmi', goal: 'wealth', gem: null,
    price: 1249, mrp: 1699, rating: 4.8, reviews: 402, sold: 2300,
    img: '/img/concern/ic_finance.png', contain: true,
    material: '10g, 999 silver, hallmarked',
    badge: 'NEW', isNew: true, stock: 19,
    colours: ['Silver'], sizes: ['5g', '10g', '20g'],
    about: 'A hallmarked 999 silver coin with Lakshmi and Ganesh, boxed. Bought for Dhanteras, and given at weddings.',
    images: ['/img/pr/lakshmi-coin_1.jpg', '/img/pr/lakshmi-coin_2.jpg', '/img/pr/lakshmi-coin_3.jpg'],
    highlights: [{ t: '999 silver', tone: 'ok' }, { t: 'Hallmarked', tone: 'ok' }, { t: 'Gift boxed', tone: 'info' }],
    specs: [{ k: 'Weight', v: '10 g' }, { k: 'Purity', v: '999 silver' }, { k: 'Diameter', v: '27 mm' }, { k: 'Finish', v: 'Proof' }, { k: 'Hallmark', v: 'BIS' }, { k: 'Packaging', v: 'Velvet box' }],
    recommendedFor: ['Dhanteras', 'Wedding gift', 'Investment'],
    outOfStockSizes: ['20g'],
    zodiac: [],
  },
]

export const PRODUCT_REVIEWS = [
  { name: 'Meenakshi R.', stars: 5, text: 'Packed carefully and arrived in four days. The finish is much better than what I expected at this price.' },
  { name: 'Arun S.', stars: 5, text: 'Bought two — one for home and one as a gift. Both were identical in quality, which is rare.' },
  { name: 'Deepa V.', stars: 4, text: 'Good product. The size runs slightly small, so order a size up if you are unsure.' },
]

export const PRODUCT_FAQS = [
  { q: 'Are the gemstones certified?', a: 'Every gemstone and rudraksha ships with a lab certificate. The certificate number is printed on the box and matches the product page.' },
  { q: 'Do the products need to be energised?', a: 'Bracelets, malas and yantras are energised at a partner temple before dispatch. The puja details are on the insert in the box.' },
  { q: 'What is the return window?', a: 'Seven days from delivery for an unused product in its original packaging. Energised items can be returned only if unopened.' },
  { q: 'How long does delivery take?', a: 'One to three days across most of India, and up to five for the north-east and island territories.' },
]

export const SHIPPING = [
  { i: '🚚', t: 'Free delivery', s: 'On orders above ₹499' },
  { i: '↩️', t: '7-day returns', s: 'Unused, in original packaging' },
  { i: '🔒', t: 'Secure payment', s: 'UPI, cards and wallet' },
]

/** Flat offer banner shown on the PDP, with a live countdown. */
export const FLAT_OFFER = {
  label: 'Flat 20% off on your first order',
  sub: 'Applied automatically at checkout',
  code: 'FIRST20',
}

/** Rolling midnight deadline so the PDP countdown is always live. */
export function offerDeadline(now = new Date()) {
  const d = new Date(now)
  d.setHours(23, 59, 59, 0)
  if (d <= now) d.setDate(d.getDate() + 1)
  return d
}

/** CheckoutAddOn - cross-sell shown in the cart and at checkout. */
export const CHECKOUT_ADDONS = ['ghee-diya-batti', 'camphor-burner', 'rose-quartz-heart', 'lakshmi-coin']

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

export function filterProducts({ q = '', sort = 'popular', cats = [], bands = [], minRating = 0, inStock = false, purpose = null, deity = null, goal = null, gem = null } = {}) {
  let out = PRODUCTS.slice()
  if (cats.length) out = out.filter((p) => cats.includes(p.cat))
  if (bands.length) {
    out = out.filter((p) => bands.some((id) => {
      const b = PRICE_BANDS.find((x) => x.id === id)
      return b && p.price >= b.min && p.price <= b.max
    }))
  }
  if (minRating) out = out.filter((p) => p.rating >= minRating)
  if (inStock) out = out.filter((p) => p.stock > 0)
  if (purpose) out = out.filter((p) => p.purpose === purpose)
  if (deity) out = out.filter((p) => p.deity === deity)
  if (goal) out = out.filter((p) => p.goal === goal)
  if (gem) out = out.filter((p) => p.gem === gem)
  if (q.trim()) {
    const s = q.toLowerCase().trim()
    out = out.filter((p) => (p.name + p.cat + p.material).toLowerCase().includes(s))
  }
  const by = {
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    new: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
    popular: (a, b) => b.sold - a.sold,
  }
  return out.sort(by[sort] || by.popular)
}
