import { useMemo } from 'react'
import { Wallet } from '@/models'
import { walletRepository } from '@/services/wallet.repository'
import { useResource } from './use-resource'

const EMPTY = []

/** Wallet top-up: packs, offers, payment methods and the tax rule. */
export function useWalletOptions() {
  const { data, loading, error } = useResource(() => walletRepository.options(), [], {})
  return useMemo(() => {
    const offers = data?.offers || EMPTY
    return {
      loading,
      error,
      walletPacks: data?.packs || EMPTY,
      rechargeOffers: offers,
      upiMethods: data?.upiMethods || EMPTY,
      gstRate: data?.gstRate ?? Wallet.GST_RATE,
      offerFor: (amount) => Wallet.offerFor(offers, amount),
    }
  }, [data, loading, error])
}
