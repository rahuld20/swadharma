import { num, pick, str } from './normalise'

/** User — the signed-in devotee. */
export const User = {
  from(raw) {
    if (!raw) return null
    const first = str(pick(raw, 'firstName', 'first_name'))
    const last = str(pick(raw, 'lastName', 'last_name'))
    return {
      ...raw,
      id: str(pick(raw, 'id', 'user_id')),
      name: str(pick(raw, 'name', 'full_name')) || `${first} ${last}`.trim(),
      firstName: first,
      lastName: last,
      phone: str(pick(raw, 'phone', 'mobile')),
      email: str(pick(raw, 'email')),
      gender: str(pick(raw, 'gender')),
      dob: str(pick(raw, 'dob', 'date_of_birth')),
      tob: str(pick(raw, 'tob', 'time_of_birth')),
      birthPlace: str(pick(raw, 'birthPlace', 'birth_place')),
      wallet: num(pick(raw, 'wallet', 'wallet_balance')),
    }
  },

  initials: (u) => str(u?.name).trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase(),
}
