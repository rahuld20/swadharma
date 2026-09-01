/**
 * Authentication controller.
 *
 * Login and signup are actions rather than page data, so this is a thin pass
 * through to the repository, plus the one piece of flow logic the views share:
 * where an authentication attempt should start.
 */
export {
  BIRTH_CITIES,
  GENDERS,
  OTP_LENGTH,
  OTP_TTL,
  channelOf,
  identify,
  isValidEmail,
  isValidPhone,
  loginInitiate,
  loginVerify,
  normalisePhone,
  signupInitiate,
  signupVerify,
} from '@/services/auth.repository'

export { signupAt, startAuthAt } from './auth-entry'
