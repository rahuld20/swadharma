import { useMemo } from 'react'
import { Chadhava, Puja, Temple } from '@/models'
import { catalogRepository } from '@/services/catalog.repository'
import { useResource, useResources } from './use-resource'

/*
 * Catalogue controllers.
 *
 * Each hook gathers what one screen needs and hands the view plain data plus
 * the lookups it uses. Filtering stays client-side over the loaded list — the
 * same instant behaviour the app has today — while the repository also accepts
 * the same parameters server-side for the day the catalogue outgrows one
 * request.
 */

const EMPTY = []

/** Everything the puja landing page and puja cards read. */
export function usePujaCatalog() {
  const { data, loading, error } = useResources(() => ({
    pujas: catalogRepository.pujas(),
    chadhavas: catalogRepository.chadhavas(),
    temples: catalogRepository.temples(),
    facets: catalogRepository.facets(),
    content: catalogRepository.content(),
    page: catalogRepository.pujaPage(),
  }), [])

  return useMemo(() => {
    const pujas = data.pujas || EMPTY
    const chadhavas = data.chadhavas || EMPTY
    const temples = data.temples || EMPTY
    const facets = data.facets || {}
    const content = data.content || {}
    const page = data.page || {}
    return {
      loading,
      error,
      pujas,
      chadhavas,
      temples,
      pujaTypes: facets.pujaTypes || EMPTY,
      chadhavaTypes: facets.chadhavaTypes || EMPTY,
      pujaModes: content.pujaModes || EMPTY,
      benefits: content.benefits || EMPTY,
      faqs: content.faqs || EMPTY,
      reviews: content.reviews || EMPTY,
      sacredProcess: content.sacredProcess || EMPTY,
      gallery: content.gallery || EMPTY,
      challenges: page.challenges || EMPTY,
      pujaBanners: page.pujaBanners || EMPTY,
      pujaHero: page.pujaHero || {},
      pujaTrust: page.pujaTrust || EMPTY,
      getPuja: (slug) => Puja.bySlug(pujas, slug),
      getTemple: (id) => Temple.byId(temples, id),
      getChadhava: (slug) => Chadhava.bySlug(chadhavas, slug),
      isSpecialPuja: Puja.isSpecial,
      isSpecialChadhava: Chadhava.isSpecial,
    }
  }, [data, loading, error])
}

/** Temple list, its filter facets and the cross-references temples show. */
export function useTempleCatalog() {
  const { data, loading, error } = useResources(() => ({
    temples: catalogRepository.temples(),
    pujas: catalogRepository.pujas(),
    chadhavas: catalogRepository.chadhavas(),
    combos: catalogRepository.combos(),
    facets: catalogRepository.facets(),
    content: catalogRepository.content(),
  }), [])

  return useMemo(() => {
    const temples = data.temples || EMPTY
    const pujas = data.pujas || EMPTY
    const chadhavas = data.chadhavas || EMPTY
    const facets = data.facets || {}
    const content = data.content || {}
    return {
      loading,
      error,
      temples,
      pujas,
      chadhavas,
      combos: data.combos || EMPTY,
      deities: facets.deities || EMPTY,
      locations: facets.locations || EMPTY,
      templeSorts: facets.templeSorts || EMPTY,
      benefits: content.benefits || EMPTY,
      sacredProcess: content.sacredProcess || EMPTY,
      gallery: content.gallery || EMPTY,
      getTemple: (id) => Temple.byId(temples, id),
      pujasOf: (templeId) => Puja.byTemple(pujas, templeId),
      chadhavasOf: (templeId) => Chadhava.byTemple(chadhavas, templeId),
      filterTemples: (params) => Temple.filter(temples, params),
      isSpecialChadhava: Chadhava.isSpecial,
    }
  }, [data, loading, error])
}

/** Chadhava listing and detail. */
export function useChadhavaCatalog() {
  const { data, loading, error } = useResources(() => ({
    chadhavas: catalogRepository.chadhavas(),
    temples: catalogRepository.temples(),
    combos: catalogRepository.combos(),
    facets: catalogRepository.facets(),
    content: catalogRepository.content(),
  }), [])

  return useMemo(() => {
    const chadhavas = data.chadhavas || EMPTY
    const temples = data.temples || EMPTY
    const facets = data.facets || {}
    const content = data.content || {}
    return {
      loading,
      error,
      chadhavas,
      temples,
      combos: data.combos || EMPTY,
      chadhavaTypes: facets.chadhavaTypes || EMPTY,
      benefits: content.benefits || EMPTY,
      faqs: content.faqs || EMPTY,
      sacredProcess: content.sacredProcess || EMPTY,
      getChadhava: (slug) => Chadhava.bySlug(chadhavas, slug),
      getTemple: (id) => Temple.byId(temples, id),
      chadhavasOf: (templeId) => Chadhava.byTemple(chadhavas, templeId),
      isSpecialChadhava: Chadhava.isSpecial,
      nextChadhavaCutoff: Chadhava.nextCutoff,
    }
  }, [data, loading, error])
}

/** One puja, fetched by slug — the detail page's own record. */
export function usePuja(slug) {
  return useResource(() => catalogRepository.puja(slug), [slug], null)
}

/** One temple, by id. */
export function useTemple(id) {
  return useResource(() => catalogRepository.temple(id), [id], null)
}
