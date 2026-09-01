import { TeerthPackage } from '@/models'
import * as mock from './mock/teerth'
import { endpoints } from './endpoints'
import { http } from './http'
import { isMock, once } from './source'

const packages = once(() => TeerthPackage.list(mock.PACKAGES))

/** Teerth yatra: pilgrimage packages and the page's editorial content. */
export const teerthRepository = {
  packages(params = {}) {
    if (isMock()) return packages()
    return http.get(endpoints.packages, params).then(TeerthPackage.list)
  },

  package(slug) {
    if (isMock()) return TeerthPackage.bySlug(packages(), slug)
    return http.get(endpoints.packageBySlug(slug)).then(TeerthPackage.from)
  },

  content() {
    if (isMock()) {
      return {
        hero: mock.TEERTH_HERO,
        benefits: mock.TEERTH_BENEFITS,
        accommodations: mock.ACCOMMODATIONS,
        divineDarshan: mock.DIVINE_DARSHAN,
        insurance: mock.INSURANCE,
        prepSteps: mock.PREP_STEPS,
        reviews: mock.REVIEWS,
      }
    }
    return http.get(endpoints.teerthContent)
  },
}
