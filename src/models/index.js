/**
 * Models — the M in MVC.
 *
 * A model owns two things and nothing else:
 *
 *   1. `from(raw)` — the wire shape. Every record entering the app passes
 *      through it, so the rest of the codebase sees one stable shape whether
 *      the record came from the mock source or from the live API.
 *   2. Domain rules — `isSpecial`, `filter`, `discount`, `nextCutoff`. Pure
 *      functions over plain data: no React, no fetch, no imports from views,
 *      controllers or services.
 *
 * Because they are pure they are also the easiest layer to test.
 */
export { Astrologer } from './astrologer'
export { Chadhava } from './chadhava'
export { Product } from './product'
export { Puja } from './puja'
export { TeerthPackage } from './teerth-package'
export { Temple } from './temple'
export { User } from './user'
export { Wallet } from './wallet'
export { arr, bool, num, pick, str } from './normalise'
