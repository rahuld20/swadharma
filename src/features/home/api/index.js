/**
 * Home feature data access.
 *
 * Feature code never reaches into `@/lib/data` directly — it goes through this
 * barrel, so the underlying source can be swapped for a real endpoint later.
 */
export {
  BANNERS,
  CATEGORIES,
  PANCHANG,
  PRODUCTS,
  PRODUCT_FILTERS,
  PURPOSES,
  TRUST_STATS,
} from '@/lib/data/home'
