import { Product } from '@/models'
import * as mock from './mock/home'
import { endpoints } from './endpoints'
import { http } from './http'
import { isMock } from './source'

/** The home feed: banners, categories, panchang strip and featured products. */
export const homeRepository = {
  feed() {
    if (isMock()) {
      return {
        banners: mock.BANNERS,
        categories: mock.CATEGORIES,
        panchang: mock.PANCHANG,
        products: Product.list(mock.PRODUCTS),
        productFilters: mock.PRODUCT_FILTERS,
        purposes: mock.PURPOSES,
        trustStats: mock.TRUST_STATS,
      }
    }
    return http.get(endpoints.homeFeed).then((d) => ({
      ...d,
      products: Product.list(d.products),
    }))
  },
}
