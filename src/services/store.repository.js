import { Product } from '@/models'
import * as mock from './mock/store'
import { ZODIAC } from './mock/astro-dashboard'
import { endpoints } from './endpoints'
import { http } from './http'
import { isMock, once } from './source'

const products = once(() => Product.list(mock.PRODUCTS))

/**
 * A bare list request returns the catalogue in its own order, exactly as an
 * unfiltered GET would. Sorting only happens when a screen asks for it - the
 * default sort is a filter parameter, not something a plain read applies.
 */
const asked = (params) => Boolean(params) && Object.keys(params).length > 0

/** The spiritual store: products, their facets and the surrounding copy. */
export const storeRepository = {
  products(params = {}) {
    if (isMock()) {
      return asked(params)
        ? Product.filter(products(), { ...params, bandTable: mock.PRICE_BANDS })
        : products()
    }
    return http.get(endpoints.products, params).then(Product.list)
  },

  product(id) {
    if (isMock()) return Product.byId(products(), id)
    return http.get(endpoints.product(id)).then(Product.from)
  },

  facets() {
    if (isMock()) {
      return {
        cats: mock.PRODUCT_CATS,
        quickCats: mock.QUICK_CATS,
        sorts: mock.PRODUCT_SORTS,
        priceBands: mock.PRICE_BANDS,
        collections: mock.COLLECTIONS,
        deities: mock.DEITIES,
        purposes: mock.PURPOSES,
        lifeGoals: mock.LIFE_GOALS,
        gemCategories: mock.GEM_CATEGORIES,
        zodiac: ZODIAC,
      }
    }
    return http.get(endpoints.storeFacets)
  },

  content() {
    if (isMock()) {
      return {
        banners: mock.STORE_BANNERS,
        stats: mock.STORE_STATS,
        trust: mock.STORE_TRUST,
        shipping: mock.SHIPPING,
        flatOffer: mock.FLAT_OFFER,
        faqs: mock.PRODUCT_FAQS,
        reviews: mock.PRODUCT_REVIEWS,
        checkoutAddons: mock.CHECKOUT_ADDONS,
      }
    }
    return http.get(endpoints.storeContent)
  },
}
