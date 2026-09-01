import { useMemo } from 'react'
import { homeRepository } from '@/services/home.repository'
import { useResource } from './use-resource'

const EMPTY = []

/** The home feed - banners, categories, panchang and featured products. */
export function useHomeFeed() {
  const { data, loading, error } = useResource(() => homeRepository.feed(), [], {})
  return useMemo(() => ({
    loading,
    error,
    banners: data?.banners || EMPTY,
    categories: data?.categories || EMPTY,
    panchang: data?.panchang || {},
    products: data?.products || EMPTY,
    productFilters: data?.productFilters || EMPTY,
    purposes: data?.purposes || EMPTY,
    trustStats: data?.trustStats || EMPTY,
  }), [data, loading, error])
}
