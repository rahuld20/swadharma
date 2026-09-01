import { Wallet } from '@/models'
import { RECHARGE_OFFERS, UPI_METHODS } from './mock/astro-dashboard'
import { WALLET_PACKS } from './mock/astro'
import { endpoints } from './endpoints'
import { http } from './http'
import { isMock } from './source'

/** Wallet balance, top-up packs and the recharge offers. */
export const walletRepository = {
  options() {
    if (isMock()) {
      return {
        packs: WALLET_PACKS,
        offers: RECHARGE_OFFERS,
        upiMethods: UPI_METHODS,
        gstRate: Wallet.GST_RATE,
      }
    }
    return http.get(endpoints.rechargeOffers)
  },
}
