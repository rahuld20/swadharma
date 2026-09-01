import { Astrologer } from '@/models'
import * as mock from './mock/astro'
import * as dash from './mock/astro-dashboard'
import { endpoints } from './endpoints'
import { http } from './http'
import { isMock, once } from './source'

const astrologers = once(() => Astrologer.list(mock.ASTROLOGERS))

/**
 * A bare list request returns the catalogue in its own order, exactly as an
 * unfiltered GET would. Sorting only happens when a screen asks for it - the
 * default sort is a filter parameter, not something a plain read applies.
 */
const asked = (params) => Boolean(params) && Object.keys(params).length > 0

/** Astrologers, their taxonomy, and the astrology dashboard's own content. */
export const astrologyRepository = {
  astrologers(params = {}) {
    if (isMock()) return asked(params) ? Astrologer.filter(astrologers(), params) : astrologers()
    return http.get(endpoints.astrologers, params).then(Astrologer.list)
  },

  astrologer(id) {
    if (isMock()) return Astrologer.byId(astrologers(), id)
    return http.get(endpoints.astrologer(id)).then(Astrologer.from)
  },

  facets() {
    if (isMock()) {
      return {
        sorts: mock.ASTRO_SORTS,
        specializations: mock.SPECIALIZATIONS,
        languages: mock.LANGUAGES,
        concernTags: mock.CONCERN_TAGS,
        reviews: mock.ASTRO_REVIEWS,
        chatReplies: mock.CHAT_REPLIES,
      }
    }
    return http.get(endpoints.astrologyFacets)
  },

  dashboard() {
    if (isMock()) {
      return {
        concerns: dash.ASTRO_CONCERNS,
        faqs: dash.ASTRO_FAQS,
        stats: dash.ASTRO_STATS,
        birthPlaces: dash.BIRTH_PLACES,
        genders: dash.GENDERS,
        horoscope: dash.HOROSCOPE,
        horoscopeDays: dash.HOROSCOPE_DAYS,
        houses: dash.HOUSES,
        kundliSteps: dash.KUNDLI_STEPS,
        panchangCities: dash.PANCHANG_CITIES,
        panchangData: dash.PANCHANG_DATA,
        planets: dash.PLANETS,
        quickAccess: dash.QUICK_ACCESS,
        talks: dash.TALKS,
        topCategories: dash.TOP_CATEGORIES,
        zodiac: dash.ZODIAC,
      }
    }
    return http.get(endpoints.astroDashboard)
  },
}
