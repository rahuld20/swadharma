/**
 * Services - where data comes from.
 *
 * One repository per area, each with the same two branches: read from the
 * in-memory mock, or call the API. Which one runs is decided once, by whether
 * VITE_API_URL is set, so switching the whole app from demo data to a live
 * backend is a build-time environment variable and nothing more.
 *
 * Only controllers import from here.
 */
export { astrologyRepository } from './astrology.repository'
export { catalogRepository } from './catalog.repository'
export { homeRepository } from './home.repository'
export { profileRepository } from './profile.repository'
export { storeRepository } from './store.repository'
export { teerthRepository } from './teerth.repository'
export { walletRepository } from './wallet.repository'
export { endpoints } from './endpoints'
export { ApiError, http, invalidate } from './http'
export { isMock, isPromise, once, resolveAll } from './source'
