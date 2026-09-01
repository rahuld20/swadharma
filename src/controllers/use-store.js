import { useMemo } from 'react'
import { Product } from '@/models'
import { storeRepository } from '@/services/store.repository'
import { useResources } from './use-resource'

const EMPTY = []

/** The store: products, facets, and the copy around them. */
export function useStoreCatalog() {
  const { data, loading, error } = useResources(() => ({
    products: storeRepository.products(),
    facets: storeRepository.facets(),
    content: storeRepository.content(),
  }), [])

  return useMemo(() => {
    const products = data.products || EMPTY
    const facets = data.facets || {}
    const content = data.content || {}
    return {
      loading,
      error,
      products,
      productCats: facets.cats || EMPTY,
      quickCats: facets.quickCats || EMPTY,
      productSorts: facets.sorts || EMPTY,
      priceBands: facets.priceBands || EMPTY,
      collections: facets.collections || EMPTY,
      deities: facets.deities || EMPTY,
      purposes: facets.purposes || EMPTY,
      lifeGoals: facets.lifeGoals || EMPTY,
      gemCategories: facets.gemCategories || EMPTY,
      zodiac: facets.zodiac || EMPTY,
      storeBanners: content.banners || EMPTY,
      storeStats: content.stats || EMPTY,
      storeTrust: content.trust || EMPTY,
      shipping: content.shipping || EMPTY,
      flatOffer: content.flatOffer || {},
      productFaqs: content.faqs || EMPTY,
      productReviews: content.reviews || EMPTY,
      checkoutAddons: content.checkoutAddons || EMPTY,
      getProduct: (id) => Product.byId(products, id),
      filterProducts: (params) =>
        Product.filter(products, { ...params, bandTable: facets.priceBands || EMPTY }),
      offerDeadline: Product.offerDeadline,
    }
  }, [data, loading, error])
}
