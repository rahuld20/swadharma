import { User } from '@/models'
import * as mock from './mock/profile'
import { endpoints } from './endpoints'
import { http } from './http'
import { isMock, once } from './source'

/** The signed-in devotee's account: details, addresses, vouchers, support. */
/* One normalised copy, so the store can seed from it without a fresh object
   arriving on every render. */
const me = once(() => User.from(mock.USER))

export const profileRepository = {
  me() {
    if (isMock()) return me()
    return http.get(endpoints.profile).then(User.from)
  },

  addresses() {
    if (isMock()) return mock.DEFAULT_ADDRESSES
    return http.get(endpoints.addresses)
  },

  paymentMethods() {
    if (isMock()) return mock.DEFAULT_PAYMENTS
    return http.get(endpoints.paymentMethods)
  },

  vouchers() {
    if (isMock()) return { vouchers: mock.VOUCHERS, cats: mock.VOUCHER_CATS }
    return http.get(endpoints.vouchers)
  },

  referral() {
    if (isMock()) return mock.REFERRAL
    return http.get(endpoints.referral)
  },

  /** Static reference lists the account screens need. */
  reference() {
    if (isMock()) {
      return {
        addressTags: mock.ADDRESS_TAGS,
        genders: mock.GENDERS,
        languages: mock.LANGUAGES,
        paymentKinds: mock.PAYMENT_KINDS,
        relations: mock.RELATIONS,
        issueSubjects: mock.ISSUE_SUBJECTS,
        resolutions: mock.RESOLUTIONS,
        supportTopics: mock.SUPPORT_TOPICS,
        faqs: mock.PROFILE_FAQS,
      }
    }
    return http.get(endpoints.faqs)
  },
}
