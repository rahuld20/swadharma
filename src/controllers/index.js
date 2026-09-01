/**
 * Controllers - the C in MVC.
 *
 * A controller is the only thing a view may import data from. It calls the
 * repositories in @/services, applies the rules the models define, and hands
 * the view plain values plus the actions it can take. Nothing here renders,
 * and nothing here knows whether the data came from the mock source or the
 * network.
 *
 * The one-way rule for the whole codebase:
 *
 *     views  ->  controllers  ->  services  ->  models
 *
 * A view never imports a service; a service never imports a controller.
 */
export { useAstroDashboard, useAstrologyCatalog } from './use-astrology'
export { useBookingCatalog } from './use-booking'
export {
  useChadhavaCatalog, usePuja, usePujaCatalog, useTemple, useTempleCatalog,
} from './use-catalog'
export { useHomeFeed } from './use-home'
export { usePayment } from './use-payment'
export { useProfileData } from './use-profile'
export { useStoreCatalog } from './use-store'
export { useTeerthCatalog } from './use-teerth'
export { useWalletOptions } from './use-wallet'
export { useResource, useResources } from './use-resource'
export { StoreProvider, useStore } from './app-store'
export { signupAt, startAuthAt } from './auth-entry'
