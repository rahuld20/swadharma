import { useMemo } from 'react'
import { Chadhava, Product, Puja, Temple } from '@/models'
import { catalogRepository } from '@/services/catalog.repository'
import { storeRepository } from '@/services/store.repository'
import { useResources } from './use-resource'

const EMPTY = []

/**
 * The booking funnel.
 *
 * It spans two repositories - the ritual being booked, and the store items
 * offered at checkout - which is exactly the kind of composition a controller
 * exists to do, and the reason no view talks to a repository directly.
 */
export function useBookingCatalog() {
  const { data, loading, error } = useResources(() => ({
    pujas: catalogRepository.pujas(),
    chadhavas: catalogRepository.chadhavas(),
    temples: catalogRepository.temples(),
    content: catalogRepository.content(),
    products: storeRepository.products(),
    storeContent: storeRepository.content(),
  }), [])

  return useMemo(() => {
    const pujas = data.pujas || EMPTY
    const chadhavas = data.chadhavas || EMPTY
    const temples = data.temples || EMPTY
    const products = data.products || EMPTY
    const content = data.content || {}
    return {
      loading,
      error,
      pujas,
      chadhavas,
      pujaModes: content.pujaModes || EMPTY,
      flowSteps: content.flowSteps || {},
      stepLabel: content.stepLabel || {},
      checkoutAddons: (data.storeContent || {}).checkoutAddons || EMPTY,
      getPuja: (slug) => Puja.bySlug(pujas, slug),
      getChadhava: (slug) => Chadhava.bySlug(chadhavas, slug),
      getTemple: (id) => Temple.byId(temples, id),
      getProduct: (id) => Product.byId(products, id),
      isSpecialPuja: Puja.isSpecial,
      isSpecialChadhava: Chadhava.isSpecial,
      nextChadhavaCutoff: Chadhava.nextCutoff,
    }
  }, [data, loading, error])
}
