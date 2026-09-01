/**
 * Every backend path the app knows, in one table.
 *
 * Repositories reference these names rather than literal strings, so when the
 * API moves or gains a version prefix it is edited here once.
 */
export const endpoints = {
  /* catalogue */
  pujas: '/pujas',
  puja: (slug) => `/pujas/${slug}`,
  pujaTypes: '/pujas/types',
  pujaModes: '/pujas/modes',
  pujaContent: '/pujas/content',
  pujaPage: '/pujas/page',
  chadhavas: '/chadhavas',
  chadhava: (slug) => `/chadhavas/${slug}`,
  chadhavaTypes: '/chadhavas/types',
  combos: '/combos',
  temples: '/temples',
  temple: (id) => `/temples/${id}`,
  templeFacets: '/temples/facets',

  /* home */
  homeFeed: '/home',

  /* astrology */
  astrologers: '/astrologers',
  astrologer: (id) => `/astrologers/${id}`,
  astrologyFacets: '/astrologers/facets',
  astroDashboard: '/astro/dashboard',
  horoscope: '/astro/horoscope',
  panchang: '/astro/panchang',

  /* store */
  products: '/products',
  product: (id) => `/products/${id}`,
  storeFacets: '/products/facets',
  storeContent: '/store/content',

  /* teerth */
  packages: '/teerth/packages',
  packageBySlug: (slug) => `/teerth/packages/${slug}`,
  teerthContent: '/teerth/content',

  /* account */
  profile: '/me',
  addresses: '/me/addresses',
  paymentMethods: '/me/payment-methods',
  vouchers: '/me/vouchers',
  referral: '/me/referral',
  support: '/support',
  faqs: '/support/faqs',

  /* wallet */
  wallet: '/wallet',
  rechargeOffers: '/wallet/offers',

  /* auth */
  loginInitiate: '/auth/login/initiate',
  loginVerify: '/auth/login/verify',
  signupInitiate: '/auth/signup/initiate',
  signupVerify: '/auth/signup/verify',

  /* payments */
  paymentOrder: '/payments/order',
  paymentVerify: '/payments/verify',
}
