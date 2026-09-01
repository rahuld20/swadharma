import { useState } from 'react'
import { useWalletOptions } from '@/controllers/use-wallet'
import { Link } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import '@/styles/pages.css'

export default function Wallet() {
  const { walletPacks } = useWalletOptions()
  const { balance, txns, addMoney } = useStore()
  const [amount, setAmount] = useState(500)
  const [custom, setCustom] = useState('')

  const value = custom ? Math.max(0, Number(custom) || 0) : amount

  return (
    <div className="wrap flow-page">
      <div className="flow-top">
        <Link className="flow-back" to="astrologers" aria-label="Back">←</Link>
        <h1>Wallet</h1>
      </div>

      <div className="flow-grid">
        <div className="flow-main">
          <div className="wal-balance">
            <small>Available balance</small>
            <b>₹{balance.toLocaleString('en-IN')}</b>
            <span>Used for astrology chat and call sessions</span>
          </div>

          <section className="flow-card">
            <h2>Add Money</h2>
            <div className="wal-packs">
              {walletPacks.map((p) => (
                <button
                  key={p}
                  className={`wal-pack${!custom && amount === p ? ' sel' : ''}`}
                  onClick={() => { setAmount(p); setCustom('') }}
                >
                  ₹{p}
                </button>
              ))}
            </div>
            <div className="bf-fields" style={{ marginTop: 16 }}>
              <label>
                <span>Or enter an amount</span>
                <input
                  inputMode="numeric"
                  value={custom}
                  placeholder="Enter amount"
                  onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </label>
            </div>
          </section>

          <section className="flow-card">
            <h2>Transactions</h2>
            {txns.length === 0 ? (
              <p className="flow-note">No transactions yet.</p>
            ) : (
              <div className="wal-txns">
                {txns.map((t) => (
                  <div className="wal-txn" key={t.id}>
                    <span className={`wal-ic ${t.kind}`}>{t.kind === 'credit' ? '↓' : '↑'}</span>
                    <div><strong>{t.label}</strong><small>{t.when}</small></div>
                    <b className={t.kind}>{t.kind === 'credit' ? '+' : '−'}₹{t.amount}</b>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="flow-side">
          <h2>Summary</h2>
          <dl className="bf-price">
            <div><dt>Current balance</dt><dd>₹{balance}</dd></div>
            <div><dt>Adding</dt><dd>₹{value}</dd></div>
            <div className="grand"><dt>New balance</dt><dd>₹{balance + value}</dd></div>
          </dl>
          <button className="cta-wide" disabled={value <= 0} onClick={() => { addMoney(value); setCustom('') }}>
            Add ₹{value} <span className="arrow">→</span>
          </button>
          <p className="co-secure">🔒 Payments are processed securely</p>
        </aside>
      </div>
    </div>
  )
}
