# SwaDharma API

The website is a static SPA, so it cannot take payments or send OTPs on its
own — both need a secret that must never reach a browser. This small service
holds those secrets.

## Run

```bash
npm install express cors razorpay
RAZORPAY_KEY_ID=rzp_test_xxx \
RAZORPAY_KEY_SECRET=xxx \
node server/index.js
```

Then in the website's `.env`:

```
VITE_API_URL=http://localhost:8787
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
```

Rebuild the site and payments run against Razorpay's test mode. Use their test
cards / UPI id `success@razorpay` to complete a payment.

## Routes

| Route | Purpose |
|---|---|
| `POST /payments/order` | Creates a Razorpay order. Amount in paise. |
| `POST /payments/verify` | Verifies the HMAC signature. This is what proves payment. |
| `POST /payments/webhook` | Razorpay's retried callback — fulfil orders here. |
| `POST /auth/otp/send` | Generates and SMSes a code. |
| `POST /auth/otp/verify` | Checks the code, returns `isNewUser`. |
| `POST /auth/signup` | Persists the profile, issues a session. |

## Before going live

- [ ] Recompute the payment amount server-side from your own cart record —
      never trust the amount the browser sends.
- [ ] Fulfil orders from the **webhook**, not from `/verify`. The user can
      close the tab before `/verify` runs; the webhook is retried.
- [ ] Rate-limit `/auth/otp/send` by phone and by IP. An open OTP endpoint is
      an SMS-bill attack.
- [ ] Store OTPs hashed with a TTL and an attempt counter (the in-memory `Map`
      here is for local development only).
- [ ] Issue real signed JWTs instead of the placeholder token.
- [ ] Set `ALLOWED_ORIGIN` to your domain rather than `*`.
