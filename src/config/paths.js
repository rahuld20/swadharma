/**
 * Every top-level hash segment the app answers to.
 *
 * `Link` and `go` from `@/lib/router` prepend the `#/`, so these are the bare
 * segments — `paths.pujaDetail` is reached as `#/puja/<slug>`.
 */
export const paths = {
  home: 'home',

  login: 'login',
  verify: 'verify',
  signup: 'signup',

  puja: 'puja',
  pujas: 'pujas',
  chadhava: 'chadhava',
  chadhavas: 'chadhavas',

  temple: 'temple',
  temples: 'temples',
  favourites: 'favourites',

  book: 'book',
  cart: 'cart',
  checkout: 'checkout',
  success: 'success',
  orders: 'orders',

  profile: 'profile',

  astro: 'astro',
  astrologer: 'astrologer',
  astrologers: 'astrologers',
  chat: 'chat',
  call: 'call',
  sessionComplete: 'session-complete',
  sessions: 'sessions',
  kundli: 'kundli',
  horoscope: 'horoscope',
  panchang: 'panchang',

  wallet: 'wallet',
  teerth: 'teerth',
  store: 'store',
}
