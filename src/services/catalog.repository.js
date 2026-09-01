import { Chadhava, Puja, Temple } from '@/models'
import * as mock from './mock/catalog'
import * as pujaPage from './mock/puja'
import { endpoints } from './endpoints'
import { http } from './http'
import { isMock, once } from './source'

/* Mock records go through the models once, then keep their identity. */
const pujas = once(() => Puja.list(mock.PUJAS))
const temples = once(() => Temple.list(mock.TEMPLES))
const chadhavas = once(() => Chadhava.list(mock.CHADHAVAS))

/**
 * A bare list request returns the catalogue in its own order, exactly as an
 * unfiltered GET would. Sorting only happens when a screen asks for it - the
 * default sort is a filter parameter, not something a plain read applies.
 */
const asked = (params) => Boolean(params) && Object.keys(params).length > 0

/**
 * Catalogue data access — pujas, chadhavas, temples and the taxonomy around
 * them.
 *
 * Every method returns the records already normalised by a model. Against the
 * mock they return plain values; against the API they return promises. The
 * controllers handle both, so a view cannot tell the difference.
 */
export const catalogRepository = {
  pujas(params = {}) {
    if (isMock()) return asked(params) ? Puja.filter(pujas(), params) : pujas()
    return http.get(endpoints.pujas, params).then(Puja.list)
  },

  puja(slug) {
    if (isMock()) return Puja.bySlug(pujas(), slug)
    return http.get(endpoints.puja(slug)).then(Puja.from)
  },

  pujasOfTemple(templeId) {
    if (isMock()) return Puja.byTemple(pujas(), templeId)
    return http.get(endpoints.pujas, { temple: templeId }).then(Puja.list)
  },

  chadhavas(params = {}) {
    if (isMock()) {
      const all = chadhavas()
      return params.temple ? Chadhava.byTemple(all, params.temple) : all
    }
    return http.get(endpoints.chadhavas, params).then(Chadhava.list)
  },

  chadhava(slug) {
    if (isMock()) return Chadhava.bySlug(chadhavas(), slug)
    return http.get(endpoints.chadhava(slug)).then(Chadhava.from)
  },

  temples(params = {}) {
    if (isMock()) return asked(params) ? Temple.filter(temples(), params) : temples()
    return http.get(endpoints.temples, params).then(Temple.list)
  },

  temple(id) {
    if (isMock()) return Temple.byId(temples(), id)
    return http.get(endpoints.temple(id)).then(Temple.from)
  },

  combos() {
    if (isMock()) return mock.COMBOS
    return http.get(endpoints.combos)
  },

  /** Filter options: deities, locations and the sort orders offered. */
  facets() {
    if (isMock()) {
      return {
        deities: mock.DEITIES,
        locations: mock.LOCATIONS,
        templeSorts: mock.TEMPLE_SORTS,
        pujaTypes: mock.PUJA_TYPES,
        chadhavaTypes: mock.CHADHAVA_TYPES,
      }
    }
    return http.get(endpoints.templeFacets)
  },

  /** Editorial copy that hangs off the catalogue rather than one record. */
  content() {
    if (isMock()) {
      return {
        benefits: mock.BENEFITS,
        reviews: mock.REVIEWS,
        faqs: mock.FAQS,
        sacredProcess: mock.SACRED_PROCESS,
        gallery: mock.GALLERY,
        pujaModes: mock.PUJA_MODES,
        flowSteps: mock.FLOW_STEPS,
        stepLabel: mock.STEP_LABEL,
      }
    }
    return http.get(endpoints.pujaContent)
  },

  /** Copy that belongs to the puja landing page itself. */
  pujaPage() {
    if (isMock()) {
      return {
        challenges: pujaPage.CHALLENGES,
        pujaBanners: pujaPage.PUJA_BANNERS,
        pujaHero: pujaPage.PUJA_HERO,
        pujaTrust: pujaPage.PUJA_TRUST,
      }
    }
    return http.get(endpoints.pujaPage)
  },
}
