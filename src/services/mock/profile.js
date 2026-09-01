/* ============================================================
   Profile module — ProfileScreen and the account screens beneath it
   (FamilyProfilesScreen, VoucherScreen, ReferEarnScreen,
   PaymentMethodsScreen, SelectAddressScreen, SupportScreen,
   ReportIssueScreen, FaqScreen).
   ============================================================ */

export const USER = {
  name: 'Ayush Parashar',
  id: 'SD-4821-9073',
  phone: '+91 98765 43210',
  email: 'ayush@example.com',
  since: 'Member since March 2026',
}

/* ---------- vouchers ---------- */
export const VOUCHER_CATS = ['All', 'Puja', 'Astro', 'Teerth', 'Store']

export const VOUCHERS = [
  { code: 'SWA10', cat: 'Puja', pct: 10, title: '10% off on any puja booking', valid: '31 Dec 2026', min: 1000 },
  { code: 'ASTRO5', cat: 'Astro', pct: 5, title: '5% off on wallet recharge', valid: '30 Sep 2026', min: 200 },
  { code: 'YATRA8', cat: 'Teerth', pct: 8, title: '8% off on any yatra package', valid: '31 Mar 2027', min: 15000 },
  { code: 'FIRST20', cat: 'Store', pct: 20, title: 'Flat 20% off on your first order', valid: '31 Dec 2026', min: 499 },
  { code: 'SWA5', cat: 'Store', pct: 5, title: 'Extra 5% off above ₹1499', valid: '31 Oct 2026', min: 1499 },
  { code: 'CHAD15', cat: 'Puja', pct: 15, title: '15% off on chadhava offerings', valid: '30 Nov 2026', min: 500 },
]

/* ---------- refer & earn ---------- */
export const REFERRAL = {
  code: 'AYUSH100',
  reward: 100,
  steps: [
    'Share your code with a friend.',
    'They sign up and place their first eligible order.',
    'Both of you get ₹100 in your wallet after verification.',
  ],
}

/* ---------- payment methods ---------- */
export const PAYMENT_KINDS = [
  { id: 'upi', label: 'UPI ID', icon: '📱', hint: 'name@bank' },
  { id: 'card', label: 'Card', icon: '💳', hint: '16-digit number' },
  { id: 'bank', label: 'Bank Account', icon: '🏦', hint: 'Account number + IFSC' },
]

export const DEFAULT_PAYMENTS = [
  { id: 'p1', kind: 'upi', label: 'ayush@okhdfcbank', sub: 'HDFC Bank', isDefault: true },
  { id: 'p2', kind: 'card', label: 'Card — •••• 4521', sub: 'Visa · expires 09/28', isDefault: false },
]

/* ---------- addresses ---------- */
export const ADDRESS_TAGS = ['Home', 'Work', 'Other']

export const DEFAULT_ADDRESSES = [
  {
    id: 'a1', label: 'Home', name: 'Ayush Parashar',
    line: '12, Sector 17-A', city: 'Chandigarh', pin: '160017',
    phone: '+91 98765 43210', isDefault: true,
  },
]

/* ---------- languages ---------- */
export const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'bn', label: 'Bengali', native: 'বাংলা' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'te', label: 'Telugu', native: 'తెలుగు' },
  { id: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
]

/* ---------- help & support ---------- */
export const SUPPORT_TOPICS = [
  { id: 'orders', i: '📦', t: 'Orders and payments', s: 'Delivery, refunds, failed payments' },
  { id: 'puja', i: '🪔', t: 'Puja and Chadhava', s: 'Booking, sankalp details, prasad' },
  { id: 'astro', i: '🔮', t: 'Astrology consultations', s: 'Sessions, minutes, astrologers' },
  { id: 'store', i: '🛍', t: 'Store products', s: 'Returns, damage, wrong item' },
  { id: 'wallet', i: '👛', t: 'Wallet and account', s: 'Balance, recharge, login' },
]

/** Report an Issue — what the complaint can be about. */
export const ISSUE_SUBJECTS = [
  { id: 'puja', label: 'Puja' },
  { id: 'chadhava', label: 'Chadhava' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'astro', label: 'Astro' },
]

/** Resolution Options, as documented. */
export const RESOLUTIONS = [
  { id: 'refund', label: 'Refund to wallet', s: 'Credited back to your SwaDharma wallet' },
  { id: 'reschedule', label: 'Reschedule', s: 'Move the booking or consultation to another slot' },
  { id: 'clarify', label: 'Clarification', s: 'Someone explains what happened' },
  { id: 'callback', label: 'Request a callback', s: 'Support calls you back' },
]

export const PROFILE_FAQS = [
  { q: 'How do I change my registered mobile number?', a: 'Open Profile, tap your name, and update the number. A verification code is sent to the new number before the change is saved.' },
  { q: 'When is a refund credited?', a: 'Wallet refunds are instant once approved. Refunds to a card or bank take 5–7 working days depending on your bank.' },
  { q: 'Can I book on behalf of a family member?', a: 'Yes. Add them under Profile → Profile List, then pick their name during the sankalp step of any booking.' },
  { q: 'How do I delete my account?', a: 'Send a request to support@swadharma.com from your registered email ID and the account is closed within seven working days.' },
  { q: 'Why was my session ended automatically?', a: 'Chat and call sessions are billed per minute. When the wallet balance cannot cover the next minute, the session ends on its own.' },
]

export const GENDERS = ['Male', 'Female', 'Other']
export const RELATIONS = ['Self', 'Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister', 'Other']
