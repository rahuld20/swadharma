import { useMemo } from 'react'
import { Astrologer } from '@/models'
import { astrologyRepository } from '@/services/astrology.repository'
import { useResource, useResources } from './use-resource'

const EMPTY = []

/** Astrologer list, its facets, and the lookups the astro screens use. */
export function useAstrologyCatalog() {
  const { data, loading, error } = useResources(() => ({
    astrologers: astrologyRepository.astrologers(),
    facets: astrologyRepository.facets(),
  }), [])

  return useMemo(() => {
    const astrologers = data.astrologers || EMPTY
    const facets = data.facets || {}
    return {
      loading,
      error,
      astrologers,
      astroSorts: facets.sorts || EMPTY,
      specializations: facets.specializations || EMPTY,
      languages: facets.languages || EMPTY,
      concernTags: facets.concernTags || EMPTY,
      astroReviews: facets.reviews || EMPTY,
      chatReplies: facets.chatReplies || EMPTY,
      getAstrologer: (id) => Astrologer.byId(astrologers, id),
      filterAstrologers: (params) => Astrologer.filter(astrologers, params),
    }
  }, [data, loading, error])
}

/** The astrology dashboard: kundli, horoscope, panchang and their copy. */
export function useAstroDashboard() {
  const { data, loading, error } = useResource(() => astrologyRepository.dashboard(), [], {})
  return useMemo(() => ({
    loading,
    error,
    astroConcerns: data?.concerns || EMPTY,
    astroFaqs: data?.faqs || EMPTY,
    astroStats: data?.stats || EMPTY,
    birthPlaces: data?.birthPlaces || EMPTY,
    genders: data?.genders || EMPTY,
    horoscope: data?.horoscope || {},
    horoscopeDays: data?.horoscopeDays || EMPTY,
    houses: data?.houses || EMPTY,
    kundliSteps: data?.kundliSteps || EMPTY,
    panchangCities: data?.panchangCities || EMPTY,
    panchangData: data?.panchangData || {},
    planets: data?.planets || EMPTY,
    quickAccess: data?.quickAccess || EMPTY,
    talks: data?.talks || EMPTY,
    topCategories: data?.topCategories || EMPTY,
    zodiac: data?.zodiac || EMPTY,
  }), [data, loading, error])
}
