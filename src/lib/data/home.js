/* Content mirrors the SwaDharma app's Parent Home screen. */

export const CATEGORIES = [
  { id: 'astro',    label: 'ASTRO',    img: '/img/cat_astro.png',  href: 'astro' },
  { id: 'puja',     label: 'PUJA',     img: '/img/cat_puja.png',   href: 'puja' },
  { id: 'teerth',   label: 'TEERTH',   img: '/img/cat_teerth.png', href: 'teerth' },
  { id: 'store',    label: 'STORE',    img: '/img/cat_store.png',  href: 'store' },
  { id: 'chadhava', label: 'CHADHAVA', img: '/img/cat_chadhava.png', href: 'chadhava' },
  { id: 'kundli',   label: 'KUNDLI',   img: '/img/cat_kundli.png',   href: 'kundli' },
]

export const BANNERS = [
  {
    id: 'kaalsarp',
    slug: 'kaal-sarp-yog',
    image: '/img/promo_kaalsarp.jpg',
    title: 'Kaal Sarp Yog Puja',
    cta: 'Book Now',
  },
  {
    id: 'navratri',
    slug: 'chaitra-navratri-mahapuja',
    gradient: 'linear-gradient(135deg, #7b2ff7, #b3236b)',
    kicker: 'दोष निवारण पूजा',
    heading: 'Chaitra Navratri\nMahapuja',
    sub: 'Book your sankalp today',
    title: 'Chaitra Navratri Mahapuja',
    cta: 'Book Now',
  },
  {
    id: 'rudra',
    slug: 'rudrabhishek-seva',
    gradient: 'linear-gradient(135deg, #e8590c, #c1121f)',
    kicker: 'TRENDING',
    heading: 'Rudra Abhishek\nSeva',
    sub: 'At Kedarnath Mandir',
    title: 'Rudra Abhishek Seva',
    cta: 'Book Now',
  },
]

export const PANCHANG = {
  tithi: { label: "TODAY'S TITHI", value: 'Shukla Paksha', sub: 'Ekadashi' },
  nakshatra: { label: 'NAKSHATRA', value: 'Rohini', sub: 'Moon in Taurus' },
}

export const TEMPLES = [
  { id: 1, name: 'Kedarnath Temple – Uttarakhand', meta: '5 Poojas | 5 Chadhavas', img: '/img/t_kedar.jpg', trusted: true },
  { id: 2, name: 'Prem Mandir – Vrindavan',        meta: '5 Poojas | 4 Chadhavas', img: '/img/t_prem.jpg',  trusted: true },
  { id: 3, name: 'Virupaksha Temple – Hampi',      meta: '4 Poojas | 3 Chadhavas', img: '/img/t_hampi.jpg', trusted: true },
  { id: 4, name: 'Kashi Vishwanath – Varanasi',    meta: '6 Poojas | 5 Chadhavas', img: '/img/t_night.jpg', trusted: true },
]

export const PURPOSES = [
  { id: 'gifting',          label: 'Gifting',          img: '/img/shop_gifting.jpg' },
  { id: 'spiritual-wear',   label: 'Spiritual Wear',   img: '/img/shop_spiritual_wear.jpg' },
  { id: 'spiritual-home',   label: 'Spiritual Home',   img: '/img/shop_spiritual_home.jpg' },
  { id: 'pooja-essentials', label: 'Pooja Essentials', img: '/img/shop_pooja_essentials.jpg' },
  { id: 'puja-murti',       label: 'Puja Murti',       img: '/img/shop_puja_murti.jpg' },
  { id: 'temple-product',   label: 'Temple Product',   img: '/img/shop_temple_product.jpg' },
]

export const ASTRO_FILTERS = ['Love', 'Career', 'Marriage', 'Business']

export const ASTROLOGERS = [
  { id: 1, name: 'Astro Ashi',   rating: 4.5, tags: ['LOVE & MARRIAGE', 'BUSINESS'], price: 30, img: '/img/astro1.png', pos: '50% 18%', verified: true },
  { id: 2, name: 'Astro Sushma', rating: 4.5, tags: ['LOVE & MARRIAGE', 'BUSINESS'], price: 30, img: '/img/astro2.png', pos: '50% 22%', verified: true },
  { id: 3, name: 'Astro Pari',   rating: 4.7, tags: ['NUMEROLOGY', 'CAREER'],        price: 25, img: '/img/astro1.png', pos: '58% 26%', verified: true },
  { id: 4, name: 'Astro Meera',  rating: 4.8, tags: ['VASTU', 'GRAHA SHANTI'],       price: 40, img: '/img/astro2.png', pos: '42% 30%', verified: true },
]

export const PRODUCT_FILTERS = ['Giftings', 'Astro', 'Spiritual wear', 'Essentials']

export const PRODUCTS = [
  { id: 1, name: 'Black Agate Healing Bracelet', price: 499, mrp: 799, img: '/img/prod_black_agate.jpg', badge: 'BESTSELLER' },
  { id: 2, name: 'Lapis Lazuli Stone Bracelet',  price: 499, mrp: 899, img: '/img/prod_lapis.jpg',       badge: 'BESTSELLER' },
  { id: 3, name: 'Seven Chakra Crystal Bracelet', price: 599, mrp: 999, img: '/img/shop_spiritual_wear.jpg', badge: 'NEW' },
  { id: 4, name: 'Pure Brass Akhand Diya',        price: 499, mrp: 749, img: '/img/shop_temple_product.jpg', badge: 'BESTSELLER' },
]

export const TRUST_STATS = [
  { value: '2+ Years',  label: 'Devotee Experience' },
  { value: '100+',      label: 'Verified Astrologers' },
  { value: '100+',      label: 'Trusted Temples' },
  { value: '1 lakh+',   label: 'Chadhavas Offered' },
]
