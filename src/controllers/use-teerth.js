import { useMemo } from 'react'
import { TeerthPackage } from '@/models'
import { teerthRepository } from '@/services/teerth.repository'
import { useResources } from './use-resource'

const EMPTY = []

/** Teerth yatra: packages and everything the pilgrimage pages display. */
export function useTeerthCatalog() {
  const { data, loading, error } = useResources(() => ({
    packages: teerthRepository.packages(),
    content: teerthRepository.content(),
  }), [])

  return useMemo(() => {
    const packages = data.packages || EMPTY
    const content = data.content || {}
    return {
      loading,
      error,
      packages,
      teerthHero: content.hero || EMPTY,
      teerthBenefits: content.benefits || EMPTY,
      accommodations: content.accommodations || EMPTY,
      divineDarshan: content.divineDarshan || EMPTY,
      insurance: content.insurance || EMPTY,
      prepSteps: content.prepSteps || EMPTY,
      reviews: content.reviews || EMPTY,
      getPackage: (slug) => TeerthPackage.bySlug(packages, slug),
    }
  }, [data, loading, error])
}
