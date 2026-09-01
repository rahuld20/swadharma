import { useMemo } from 'react'
import { profileRepository } from '@/services/profile.repository'
import { useResources } from './use-resource'

const EMPTY = []

/** The account screens: vouchers, referral and the reference lists they need. */
export function useProfileData() {
  const { data, loading, error } = useResources(() => ({
    vouchers: profileRepository.vouchers(),
    referral: profileRepository.referral(),
    reference: profileRepository.reference(),
  }), [])

  return useMemo(() => {
    const voucherData = data.vouchers || {}
    const ref = data.reference || {}
    return {
      loading,
      error,
      vouchers: voucherData.vouchers || EMPTY,
      voucherCats: voucherData.cats || EMPTY,
      referral: data.referral || {},
      addressTags: ref.addressTags || EMPTY,
      genders: ref.genders || EMPTY,
      languages: ref.languages || EMPTY,
      paymentKinds: ref.paymentKinds || EMPTY,
      relations: ref.relations || EMPTY,
      issueSubjects: ref.issueSubjects || EMPTY,
      resolutions: ref.resolutions || EMPTY,
      supportTopics: ref.supportTopics || EMPTY,
      profileFaqs: ref.faqs || EMPTY,
    }
  }, [data, loading, error])
}
