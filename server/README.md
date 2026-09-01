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
| `POST /auth/login/initiate` | Code for an existing account. 404 if unknown. |
| `POST /auth/login/verify` | Checks the code, issues a session. |
| `POST /auth/signup/initiate` | Code for a new account. 409 if it already exists. |
| `POST /auth/signup/verify` | Creates the account, issues a session. |

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

## The rest of the API

This service covers only what needs a secret. Setting `VITE_API_URL` points the
**whole** site at it, so every other read has to be answered too — the catalogue,
the store, the account, and so on.

`src/services/endpoints.js` is the complete list of paths the site calls, and each
repository in `src/services/*.repository.js` shows the exact shape it expects: the
mock branch of a method returns precisely what its API branch has to return.
`GET /pujas` returns what `PUJAS` holds; `GET /temples/facets` returns the object
that method builds; and so on.

Two things make fitting an existing backend easier than matching that shape by hand:

- **Envelopes** — a bare array or object works, and so does `{ "data": ... }`.
  `src/services/http.js` unwraps the second.
- **Field names** — each model in `src/models` accepts aliases and coerces types,
  so `birth_place`, `list_price` and `is_new` arrive as `birthPlace`, `mrp` and
  `isNew` without a view knowing. Add your own aliases there rather than
  reshaping the payload on the server.

Reads are cached for five minutes and de-duplicated while in flight, so a page
of thirty cards asking for the same temple list makes one request.
