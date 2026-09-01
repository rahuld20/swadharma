import { num, pick } from './normalise'

/** Wallet — balance, recharge offers and the tax rule. */
export const Wallet = {
  GST_RATE: 0.18,

  /** Best recharge offer that a given amount qualifies for, if any. */
  offerFor: (offers, amount) =>
    [...(offers || [])].reverse().find((o) => amount >= o.min) || null,

  /** What a recharge actually costs once GST is added. */
  totalFor: (amount, rate = Wallet.GST_RATE) => Math.round(amount * (1 + rate)),

  balanceOf: (raw) => num(pick(raw, 'balance', 'wallet', 'wallet_balance')),
}
