import { useState } from 'react'
import { payWithRazorpay } from '@/services/payments.repository'
import { useStore } from '@/controllers/app-store'

/**
 * One place for "take money, then do the thing".
 *
 * Every paid action in the app runs through this so they all behave the same:
 * login is required first (per the doc), the gateway is opened, and the
 * caller's `onPaid` only runs once the payment is confirmed.
 *
 *   const { pay, paying } = usePayment()
 *   pay({ amount: total, receipt: 'SD1042', name: 'Puja booking', next: 'checkout' },
 *       (res) => { placeOrder({ paymentId: res.paymentId }); go('success') })
 */
export function usePayment() {
  const { requireAuth, user, notify } = useStore()
  const [paying, setPaying] = useState(false)

  async function pay({ amount, receipt, name, next = '' }, onPaid) {
    // "Users must log in before proceeding with any booking or participation."
    if (!requireAuth(next)) return false
    if (paying) return false

    setPaying(true)
    try {
      const res = await payWithRazorpay({
        amount,
        receipt: receipt || `SD${Date.now().toString(36).toUpperCase()}`,
        name,
        customer: { name: user?.name, phone: user?.phone, email: user?.email },
      })
      await onPaid?.(res)
      return true
    } catch (err) {
      // a cancelled checkout is a normal thing to do, not an error to shout about
      if (err.code !== 'CANCELLED') notify(err.message || 'Payment failed')
      return false
    } finally {
      setPaying(false)
    }
  }

  return { pay, paying }
}
