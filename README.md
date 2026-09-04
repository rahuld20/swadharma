# SwaDharma — Website

React (Vite) rebuild of the SwaDharma super-app, matched to `app-release.apk`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Architecture — MVC

`@/` resolves to `src/` (see `vite.config.js` and `jsconfig.json`).

```
src/
|-- models/          M  what the data IS
|     puja.js temple.js chadhava.js product.js astrologer.js
|     teerth-package.js user.js wallet.js normalise.js
|-- services/           where the data COMES FROM
|     http.js           the only module that calls fetch
|     endpoints.js      every API path, in one table
|     source.js         the mock/API switch
|     mock/             the in-memory data set
|     *.repository.js   catalog, home, astrology, store, teerth,
|                       profile, wallet, auth, payments
|-- controllers/     C  what a screen needs, and what it can do
|     use-resource.js   binds a repository to a view
|     use-*.js          one per area
|     app-store.jsx     cart, wallet, session, favourites
|-- views/           V  what it looks like
|     pages/            one module per screen
|     layouts/          header, footer, bottom-nav, main-layout
|     components/       ui/ plus per-area view components
|-- app/                composition root: provider, router, app shell
|-- config/             paths, brand, environment flags
|-- lib/                router
`-- styles/             global stylesheets
```

**Imports run one way and never back:**

```
views  ->  controllers  ->  services  ->  models
```

- A **model** is pure. It knows the shape of a record and the rules about it
  (`Puja.isSpecial`, `Product.filter`, `Chadhava.nextCutoff`) and imports nothing
  from the other three layers. No React, no fetch.
- A **service** is the only layer that knows where data lives. Each repository
  has the same two branches — read the mock, or call the API — and returns
  records already normalised by a model.
- A **controller** is the only thing a view may take data from. It gathers what
  a screen needs, sometimes across two repositories, and hands back plain values
  plus the actions available.
- A **view** renders. It imports no service and no `fetch`, and holds no
  knowledge of where its data came from.

## Swapping the mock for a real API

The whole data source is one environment variable:

```bash
VITE_API_URL=https://api.swadharma.tech   # live backend
VITE_API_URL=                             # empty -> in-memory mock
```

Nothing else changes. No view, controller or model is edited, because the branch
lives in the repositories and is read once through `IS_MOCK` in `config/app.js`.

**How it stays working either way.** A repository returns a plain value against
the mock and a promise against the API. `useResource` accepts both:

- synchronous source -> the value is there on the first render, no loading state,
  no extra pass — the screens behave exactly as they did when the data was a
  module constant;
- asynchronous source -> `loading` is true until the promise settles and `data`
  holds a safe empty value, so a `.map()` never throws mid-flight.

**Fitting your backend.** Three files, and only these three:

| To change | Edit |
|---|---|
| a URL or path | `services/endpoints.js` |
| the response shape | the model's `from()` — it maps aliases (`birth_place` -> `birthPlace`), coerces types and fills defaults |
| headers, auth, retries, error text | `services/http.js` |

`http.js` already unwraps a `{ data: ... }` envelope, so both house styles work
unchanged. Every model spreads the raw record before normalising, so a field the
backend adds arrives in the view without any edit at all.

`server/` is a reference implementation of the auth and payment routes.

## Where the design came from

The APK is a Flutter app, so the UI is compiled into `libapp.so`. Reference was pulled from:

- `assets/flutter_assets/assets/**` — real temple, puja, chadhava and footer artwork
- `libapp.so` string table — routes, screen/section names, and UI copy (`Mandir`, `Puja`,
  `Chadhava`, `Temple Deity`, `Story & Legends`, `Visitor Guidelines`, `Booking Preview`,
  `Normal Puja`, `Special Puja`, `Individual Pooja`, `Partner Pooja`, `Participate Puja`, …)
- `FontManifest.json` + binary strings — **DM Sans** body, **Playfair Display** accent
- `~/Desktop/Figma/` — the app's HTML prototype (`temples.js`, `detail.js`, `flows.js`)
  and the `p21.png` / `p22.png` screen mockups, for exact colours and section order

### Tokens (`src/styles/global.css`)

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#FFFFFF` | page body, cards |
| `--cream` | `#FFF8F1` | hero bands, footer |
| `--bg-alt` | `#FFFAF5` | inset fields, search |
| `--ink` | `#1F1512` | headings, primary type |
| `--ink-soft` | `#5A4A42` | secondary type, nav |
| `--grey` | `#8C7B73` | captions |
| `--line` | `#ECE3DC` | hairline rules and borders |
| `--brand` | `#A8402F` | accent type, active states, badges |
| `--brand-soft` | `#C85030` | the logo's own wordmark tone |
| `--orange` | `#D04725` | CTA fills |
| `--orange-deep` | `#B03A1C` | CTA hover, accent links |

**The chrome is light; colour is spent only where it works.** Header, hero bands and
footer are white and warm cream separated by hairlines, not colour blocks. The
saffron CTA and the terracotta accents are the only saturated things on the page, so
they read as the things to act on. This is the same structure Astrotalk uses, applied
to SwaDharma's own logo colours.

Two rules hold it together:

1. **Every neutral sits on a warm axis.** `--ink` is a warm near-black, `--line` a warm
   hairline, `--bg-alt` a warm cream. Cool greys beside a terracotta accent are what
   read as cheap; warming the whole ramp is most of the "expensive" feel.
2. **Colour earns its place.** Chrome is neutral, so a CTA does not have to shout to be
   seen. `--orange` is the deepest saffron that still carries white text at AA (4.56:1)
   — vivid, but not the flat coral it replaced (2.74:1).

Contrast across the system:

| | ratio | |
|---|---|---|
| `--ink` on `--bg` | 15.6:1 | body type |
| `--ink-soft` on `--cream` | 7.9:1 | nav, secondary type |
| white on `--orange` | 4.56:1 | CTA labels |
| `--brand` on `--bg` | 6.1:1 | accent type |

`public/img/logo_lockup.png` is a header lockup composed from `logo_color.png` —
wheel plus wordmark, no tagline. The supplied stacked logo renders its tagline at
about 3px in a 38px header, which is what read as unpolished; the footer prints that
tagline as live text (`.ftr-tag`) instead. Source logo files are untouched.

### Mobile app shell

Below 860px the site becomes an app shell modelled on `app-release.apk`; above
that breakpoint nothing changes at all.

- **`views/layouts/bottom-nav/`** — the APK's floating tab bar: a dark pill
  over the content, active tab in a saffron disc. Five tabs (brand, Puja, Astro,
  Teerth, Store); a deep route keeps its section lit, so `#/astrologers` shows
  Astro. It removes itself on immersive screens (chat, call, book, checkout,
  session-complete), the way the app hides its own bar.
- **Header** — matches the app: logo, a search icon that expands a row, cart, and
  the menu. The full-width search field and the nav row are mobile-hidden since
  navigation lives at the bottom.
- **Footer** — same content as desktop, restructured. Four open columns is a
  desktop pattern, so on a phone the brand block, contact details and social
  links stack, and the four link columns become four labelled sections that
  open on tap — 24 links as four taps rather than a wall to scroll past. The
  app-download strip and the legal line follow. It used to collapse to the
  legal line alone, which put the contact details and store links out of reach
  on a phone entirely.

  The two layouts need different markup rather than different styling, so
  `views/hooks/use-media-query.js` asks the breakpoint in JavaScript and the
  section headings render as plain text above 860px. The desktop tree is
  therefore exactly what it was — no button, no state in it at all.
- **Touch feel** — no tap highlight, no rubber-band overscroll, momentum on the
  rails, press-scale on cards, `env(safe-area-inset-*)` for notched phones.
- **Installable** — `public/manifest.webmanifest` plus apple-touch-icon and
  `viewport-fit=cover`. Add to Home Screen launches standalone with no browser
  chrome, which is most of what makes it read as an app.

Sticky page CTAs (`.pd-bar`, `.td-cartbar`) are lifted to `80px` so they stack
above the bar rather than under it, and `body` gets matching bottom padding.

**Desktop is unchanged, and that is enforced rather than assumed.** Every rule in
this shell sits inside `@media (max-width: 860px)`; the two new components are
`display: none` by default so no desktop-scoped rule exists to turn them off.
`scratchpad/cssdiff.py` diffs the built bundles rule-by-rule and fails if any
non-mobile rule is added, removed or changed.

### Promo slider

`src/views/components/ui/promo-slider/` is shared by the home hero and the Puja page.
A slide is either a finished poster (`image`) or a designed panel (`gradient`
plus `kicker` / `heading` / `sub`); both render in the same frame with the CTA
in the same place, so a mixed set still reads as one carousel.

```js
<PromoSlider slides={...} perView={2} label="Latest pujas and offers" />
```

`perView` 1 is the full-width home hero; 2 keeps the Puja page's original
paired-card proportions and slides through the rest. Below 900px it is always
one per view and the arrows hide in favour of swiping. Autoplay pauses on hover
and on focus so a slide cannot move out from under a click.

To add a promo, append to `BANNERS` in `src/services/mock/home.js` or
`PUJA_BANNERS` in `src/services/mock/puja.js` — the dots and controls follow.

`promo_navratri.jpg` / `promo_kaalsarp.jpg` are the banner artwork with the old
navy frame cropped off; the originals are still in `public/img/`.

### Page shape

Every module page follows the home page: **brand header → brand hero band with rounded
bottom corners → light body → brand footer.** `src/styles/module.css` owns this.

- `.module-hero` is the brand band. On Temples and Chadhava it holds the title, description,
  search and filter chips; on Puja it holds the image hero, promo banners and trust strip;
  on Gallery just the title.
- `.module-page` is the light body below it — listings, type tabs, cards.

Anything that was styled white-on-brand (type tabs, sort control, temple selector labels,
challenge labels) has a light counterpart in `module.css`, so the same components read
correctly in both zones.

## Booking flows — Normal vs Special

The app ships **two flows per product**, which the binary makes explicit: an `isSpecial`
flag, two puja entry points (`BookPujaScreen` at `/book-puja` and `PujaBookingFlowScreen`
at `/puja-booking-flow`, the latter using `BookingStepsHeader`), and a separate chadhava
flow (`ChadhavaBookingFlowScreen` → `/chadhava-combos` → `/chadhava-date-selection` →
`/chadhava-address` → `/chadhava-booking-preview`). Both are implemented in
`src/views/pages/book-flow.jsx`, driven by `FLOW_STEPS` in `catalog.js`.

| | Steps | Notes |
|---|---|---|
| **Special / Havan Puja** | Select Package → Devotee Details → Add-Ons → Select Address → Booking Preview | Date is **fixed** to the muhurat. Package tiers: Individual / Partner / Participate. Carries the Last-Minute Add-Ons step. |
| **Normal Puja** | Select Date → Devotee Details → Select Address → Booking Preview | **You pick the date.** No package tier — a devotee-count stepper instead. |
| **Special Chadhava** | Select Package → Devotee Details → Select Address → Booking Preview | Packages by number of persons. No date step — a booking countdown governs the window. Card CTA is **Participate**. |
| **Normal Chadhava** | Select Date → Devotee Details → Select Address → Booking Preview | You choose the day. Card CTA is **Book**. |

**Chadhava never touches the cart.** The documented flow is
*Chadhava List → Select Chadhava → Select Devotee → Select/Add Address → Pay & Book*,
and the APK's only cart is `EcomCartScreen`. The cart and `#/checkout` are store-only.

The Add-Ons step ("Add a puja or chadhava to this booking") is what produces the app's
combined `/my-puja-chadhava-orders`.

### The detail pages differ too

The PDP is not a shared template — the type changes what the page offers.

| | Special | Normal |
|---|---|---|
| **Puja** | Orange type tag · fixed-muhurat strip ("the muhurat is fixed and cannot be changed") · **Select Puja package** (Individual / Partner / Participate) with per-tier perks · a full package-comparison block in the body | Blue type tag · recurring-seva strip ("you choose the day") · **per-devotee rate** · devotee-count stepper · read-only **Upcoming dates** preview · no package tier anywhere |
| **Chadhava** | "Booked as a dated seva" strip · **Select Offering** (Single / Family / Navdin) · **Chadhava Combos** section in the body · single **Offer Now** into the dated flow | "Offered with the next daily aarti" strip · plain **Quantity** stepper · **Add to Cart** + **Buy Now** · live cart link · no offering tiers, no combos |

The normal puja PDP passes its devotee count into the flow as `?people=N`; the special one
passes `?mode=<tier>`.

### Booking cut-off countdown (special only)

The binary carries `_CountdownCard`, `_startCountdown`, `_buildCountdown` and
`_parseTimeRemaining`, with uppercase `DAYS` / `HOURS` unit labels and the string
`Offer ends in `. `src/views/components/ui/countdown/countdown.jsx` reproduces it: a live DAYS/HOURS/MINS/SECS
card that ticks every second, drops the days box once inside a day, and switches to a red
urgent palette under 24 hours. It appears on the special PDP (body + buy panel) and as a
compact pill in the special booking-flow header. Normal puja and normal chadhava never
show it — there is no cut-off to count down to.

- **Special puja** — counts down to `closesAt` on the puja, a real timestamp set a little
  before the muhurat. Recurring specials (the havan pujas on amavasya / purnima / sankashti)
  deliberately have **no** `closesAt`, so no countdown is invented for them.
- **Special chadhava** — a rolling same-day cut-off from `nextChadhavaCutoff()`:
  offerings confirmed before 6:00 PM go into the next morning aarti, and the deadline rolls
  to the following day once it passes. Change `CHADHAVA_CUTOFF_HOUR` in `catalog.js` to move it.

Note the sample puja dates were March 2026 — already past — so the dated specials were moved
to September 2026 / March 2027 to give the countdown something real to run against.

### Where the Normal/Special split shows up

`type` on each chadhava (and `type` on each puja) drives every surface, not just the flow:

- **Chadhava listing** — tabs for All / **Normal Chadhava** / **Special Chadhava** / Combos,
  with live counts that respect the selected temple, mirroring the puja page's type tabs.
- **Chadhava cards** — a NORMAL / SPECIAL chip, separate from the marketing badge
  (`MOST BOOKED` / `TRENDING` / `NEW`). `badge` used to double as the type marker; it is now
  marketing only, so the chip is the single source of truth.
- **Temple → Puja tab** — sub-tabs for All / **Normal Puja** / **Special Puja** / **Havan Puja**,
  counted for that temple. Every tab stays clickable even at zero; selecting an empty one shows
  what the temple has instead, with a link through to that type at other temples.
- **Temple → Chadhava tab** — sub-tabs for All / **Normal Chadhava** / **Special Chadhava** /
  **Combos** (same clickable-when-empty behaviour), with a one-line explainer under the
  selected type and per-type CTAs:
  *Offer Now* into the dated flow for special, *+ Add* into the cart for normal.
- **Home / Puja chadhava strips** — same chip, same split CTA.

Which pujas are special is `type !== 'normal'` in `catalog.js`; which chadhavas are special
is `type === 'special'`. Both are single-line switches if the mapping needs flipping.

## Routes

Hash routing, no dependency (`src/lib/router.jsx`):

| Route | Page | App equivalent |
|---|---|---|
| `#/` | Home | `ParentHomeScreen` |
| `#/temples` | Temple list + filters | `AllTemplesScreen` |
| `#/favourites` | Saved temples | favourites list |
| `#/temple/<id>` | Temple detail — **Mandir** tab | `TempleDetailScreen` |
| `#/temple/<id>/puja?type=` | Temple detail — **Puja** tab, optionally filtered to a type | `TempleDetailTabs` |
| `#/temple/<id>/chadhava?type=` | Temple detail — **Chadhava** tab, optionally filtered | `TempleDetailTabs` |
| `#/temple/<id>/gallery` | Photo gallery | `TempleGalleryScreen` |
| `#/puja?type=` | Puja home + type tabs (deep-linkable) | `PujaHomeScreen` |
| `#/puja/<slug>` | Puja detail | `PujaDetailScreen` |
| `#/book/puja/<slug>` | Puja booking flow | `BookPujaScreen` / `PujaBookingFlowScreen` |
| `#/book/chadhava/<slug>` | Special chadhava flow | `ChadhavaBookingFlowScreen` |
| `#/chadhava?type=` | Chadhava listing (deep-linkable) | `AllChadavasScreen` |
| `#/chadhava/<slug>` | Chadhava detail | `ChadavaDetailScreen` |
| `#/cart` | Booking preview | `ChadhavaBookingPreviewScreen` |
| `#/checkout` | Address + payment | `PaymentSummaryScreen` |
| `#/success` | Confirmation | `RechargeSuccessScreen` |
| `#/orders` | Order history | `MyOrdersScreen` |
| `#/store` | Store dashboard | `EcommerceHomeScreen` |
| `#/store/products` | Listing + filters + sort | `EcomAllProductsScreen` |
| `#/store/product/<id>` | Product detail | `EcomProductDetailScreen` |
| `#/store/wishlist` | Wishlist | `EcomWishlistScreen` |
| `#/teerth` | Teerth dashboard | `TeerthHomeScreen` |
| `#/teerth/packages` | All yatra packages (sortable) | — |
| `#/teerth/<slug>` | Package detail | `TeerthPackageDetailScreen` |
| `#/teerth/book/<slug>` | Booking form | `TeerthBookingScreen` |
| `#/teerth/confirmation` | Booking confirmation | `TeerthBookingConfirmationScreen` |
| `#/teerth/orders` | My yatras | `TeerthOrdersScreen` |
| `#/astro` | Astro dashboard (the module tab) | Astro Screen |
| `#/astrologers` | Astrologer list + filters | `AstrologerListScreen` |
| `#/astrologer/<id>` | Astrologer detail | `AstrologerDetailScreen` |
| `#/chat/<id>` | Live chat session | `ChatScreen` |
| `#/call/<id>` | Voice call session | `CallScreen` |
| `#/session-complete` | Session summary + rating | `SessionCompletedScreen` |
| `#/wallet` | Balance + transactions | `WalletScreen` |
| `#/wallet/add` | Add money, amount + offers | Add Money to Wallet |
| `#/wallet/payment` | GST, coupon, UPI methods | Recharge Payment |
| `#/wallet/success` | Receipt + balance | Recharge Successful |
| `#/sessions` | Active Now, Chats/Calls tabs | Session History |
| `#/kundli` | Saved kundlis | `KundliListScreen` |
| `#/kundli/create` | Five-step creation | `CreateKundliScreen` |
| `#/kundli/<id>` | Chart, planets, houses | `KundliDetailScreen` |
| `#/horoscope` | Sign + day, lucky facts | `HoroscopeScreen` |
| `#/panchang` | Today's panchang | `PanchangScreen` |

## The three flows

**Temple** — list with live search, **Sort** (popularity / discount / price / rating /
new arrivals), **Deity** and **Location** multi-select bottom sheets, chip counts and
Clear All, plus a heart to save favourites. Opening a temple gives the three app tabs:

- **Mandir** — deity carousel, story & legends, highlights, visitor guidelines, darshan timings
- **Puja** — sub-tabbed by type (All / Normal / Special / Havan), each card badged with its type
- **Chadhava** — sub-tabbed by type (All / Normal / Special / Combos), then the
  "Legends of sacred Chadhava" card, spiritual benefits and the sacred process, with a
  sticky cart bar once you add something

**Puja** — the home page splits by type (All / **Normal Puja** / **Special Puja** /
**Havan Puja**) with live counts, and the "Pujas for Your Challenges" grid filters the same
list. A puja detail carries why-perform, legend, deity carousel, the sacred process,
spiritual benefits, reviews, FAQs, and the three booking modes the app offers —
**Individual Pooja**, **Partner Pooja**, **Participate Puja** — each repricing the panel.
Booking goes: detail → sankalp details (date, people stepper, name/gotra/rashi per devotee)
→ checkout → confirmation.

**Chadhava** — listing with search, temple selector strip, sort, and **Items / Combos**
tabs. Add from the listing, the temple's Chadhava tab, or the detail page (Single /
Family / Navdin quantities) → booking preview with quantity steppers → checkout → confirmation.

Both flows converge on the same checkout: editable delivery address, sankalp recap,
order summary, coupon (`SWA10`), and UPI / card / wallet / net-banking selection.

## Astro module

Built against `Swadharma_Super_App_Documentation.docx` (Astro Tab section) plus the
`horoscope.json` / `panchang.json` the APK bundles, so the field names and values match
what the app ships.

`#/astro` is the module dashboard and carries every documented section:

1. header with wallet balance and a session-history icon
2. quick access — **Free Kundli / Horoscope / Panchang**
3. the 50% cashback recharge banner
4. **Top Astrologers** with the Vedic / Astro / Numero category filter and View buttons
5. **My Sessions** — past consultations with Session History and Call Again
6. **Talks by Astro** — video cards
7. **FAQ** accordion
8. **Astrologers for Life Concerns** — Love, Education, Career, Marriage, Health, Finance
9. trust stats — 4.8 rating, 500+ astrologers, 10L+ consultations, 24x7 support

**Kundli** follows the documented five steps (Name → Gender → Date of Birth → Birth Time →
Birth Place) and generates a chart with planetary positions and house tables.
**Horoscope** takes a sign and a day and shows lucky colour, planet of the day, lucky
numbers, lucky time and the five predictions. **Panchang** shows month/paksha, Brahma
Muhurat, Rahu Kalam, sunrise/moonrise and tithi/nakshatra/yog/karana with end times, and
the location is editable.

**Recharge** runs Amount + offers → Payment (GST at 18%, coupon `ASTRO5`, UPI methods) →
Success with a receipt. Offers tier at ₹100 / ₹500 / ₹1000.

`src/services/mock/astro.js` holds six astrologers with skills, languages, experience, rate and
online / busy / offline status. The list sorts online-first, then by the chosen sort,
and filters by skill, language and life concern.

A session is genuinely metered. `Session.jsx` drives both `ChatScreen` and `CallScreen`
— the billing, timer and cutoff are identical, only the body differs:

1. the first minute is charged when the astrologer connects
2. each further minute is charged on the 60-second tick
3. when the wallet cannot cover the next minute the session ends itself
4. the summary shows duration, minutes billed and amount deducted, and takes a rating

`Wallet.jsx` holds the balance, quick top-up packs, a custom amount and the running
transaction list — every session minute appears there as a debit.

## Store module

Built from the documentation's Store Tab section and the APK's `Ecom*` widgets
(`EcomBestSellersSection`, `EcomPopularProductsSection`, `EcomDeitySection`,
`ShopByPurposeSection`, `EcomCollectionGridSection`, `EcomGemStoneSection`,
`EcomUniqueCollectionSection`). Product names are the app's own — Black Agate Protection
Bracelet, Amethyst Healing Bracelet, Brass Camphor Aarti Burner, Rudraksha Mala 108 Beads,
Cow Ghee Diya Batti and the rest all appear in the binary.

`#/store` carries every documented section: header with wishlist and cart, search with a
voice button, circular quick categories, the trust strip (24/7 assistance, authentic
products, secure checkout), promo banners, **Best Sellers**, **Popular Products** with
category filters, and then the five discovery axes the documentation calls out —

| Axis | Question it answers |
|---|---|
| Shop by Deity | who the user follows |
| Shop by Purpose | what the user wants |
| Shop by Life Goal | what the user wants to achieve |
| Your Zodiac | what matches the user's sign |
| Gemstone Categories / Unique Collection | what interests the user |

Each axis deep-links into the listing (`?deity=`, `?purpose=`, `?goal=`, `?gem=`, `?cat=`),
which has search, sort and filters for category, price band, rating and stock.

### Product detail

`ProductDetail.jsx` reproduces `EcomProductDetailScreen` section for section — the widget
names in that compilation unit spell the page out:

| APK widget | On the page |
|---|---|
| `_buildImageThumbnails` | three-image gallery with thumbnail rail and an n/N counter |
| `_FlatOfferBanner` + `_startCountdown` | "Flat 20% off" banner with a live *Offer ends in* countdown |
| `_HighlightCard` / `_buildBenefits` | highlight chips (certified, energised, free delivery) |
| `_buildDescription` | description |
| `_buildRecommendedFor` + `_RecommendationChip` | "Recommended for" chips |
| `_buildSpecifications` | two-column specification table |
| `_buildCompatibilitySection` + `_CompatibilityResultCard` | compatibility read against a **saved kundli**, with a good / ok / poor result card and reset |
| `EcomBundleItem` + `_addBundleToCart` | Frequently Bought Together with **toggleable** items and a live combo price |
| `_buildReviewsSection` + `_AddReviewSheet` | reviews plus a Write-a-review sheet that posts to the list |
| `EcomSizeAvailability` | out-of-stock sizes struck through and non-purchasable |
| `_buildFaqs`, `_buyNow` | FAQs, Add to Cart and Buy Now |

Product galleries are built from each product's single APK shot — a square crop, a detail
crop and a wider framing — rather than repeating one frame three times.

### Checkout

`CheckoutAddOn` is implemented as a cross-sell block above the payment method: products
frequently added alongside the cart, excluding anything already in it. The summary is a
**Bill Summary** — Total MRP, product discount, coupon, platform fee, To Pay — with a
"You save ₹X on this order" line. Savings are computed from each product's real MRP, and
non-product items (puja, chadhava, yatra) contribute no phantom discount.

The **wishlist** supports Move to Cart per item and Move All to Cart. Products join the same
cart and checkout as puja and chadhava, so an order can mix them.

## Teerth module

Built from the documentation's Teerth Tab section and the APK's package widgets
(`TeerthHeroSection`, `TeerthBenefitsRow`, `PackageHeroCarousel`, `PackageOverview` /
`Highlights` / `Inclusions` / `Itinerary` / `Places` / `Rules` / `Reviews` / `Faqs`,
`AccommodationOption`, `PackageBookingBar`, `PackageEnquirySheet`).

`#/teerth` carries every documented section: the featured destination carousel (Ayodhya
first), the four booking benefits (Senior-Friendly, Stay Close to Sites, Guided Tours,
Priority Darshan), Divine Darshan circles, and the pilgrimage packages with **WITH FLIGHT**
and **BUDGET FRIENDLY** badges.

A package detail carries seven tabbed sections and a sticky booking bar. **Post an Enquiry**
opens the enquiry sheet (name, phone, special request). **Booking** takes travellers
(adults + children at 35% off), a batch departure date, accommodation (Standard / Deluxe /
Premium priced as a delta), travel insurance per traveller, coupon `YATRA8` and wallet
balance — then confirmation with a Booking ID, coordinator call and preparation steps.

Inclusion copy is the app's own: *AC Transport*, *All transfers & sightseeing in AC vehicle*,
*All permits & entry tickets*, *Breakfast & Dinner*, *Guided Pilgrimage Tour*. The itinerary
opens and closes on the app's lines — *Assemble at Kashi station. Har Har Mahadev!* and
*Har Har Mahadev! We hope your yatra was blissful.*

## Responsive

Breakpoints: **<640 phone · 640–899 tablet · 900+ desktop.**

Card rails stay a swipeable row on phones, as in the app, and wrap into a grid from
tablet up — a scrolling row leaves cards sliced at the edge, which reads as broken on a
wide screen. The header keeps its search bar down to 620px and only then falls back to
logo + burger.

Note when testing with screenshots: **Chrome headless clamps its layout width to about
406px**, so a 390px capture is really a 406px layout with the right edge cropped. To see
a true phone viewport, load the site in an iframe of the target width from the same
origin rather than shrinking the window.

## Cart, wishlist and badges

The cart belongs to the **Store alone** — puja, chadhava and yatra each book through their
own flow. `#/cart` → `#/checkout` → `#/success` is the product path.

The header carries Wallet, Wishlist and Cart, and the last two show live counts from
`src/controllers/app-store.jsx` (`count` and `wishlist.length`). The store dashboard and product listing
carry the same two icons with the same counts.

## State

`src/controllers/app-store.jsx` (React context) holds the cart, favourites, address, payment method and
order history. `src/services/mock/catalog.js` is the single source of truth — temples own their
pujas and chadhavas, mirroring `TempleDetailScreen`. Swap it for API calls when the
backend is ready; the endpoints are already visible in the binary (`/api/v1/...`).

## Known gaps

- **Temple and destination photography repeats.** The APK ships four temple photos plus a
  Kedarnath gallery, so Trimbakeshwar and Siddhivinayak borrow shrine shots, and the Teerth
  packages reuse them — there is no Kashi, Ayodhya or Dwarka photography in the APK at all.
  Drop real images into `public/img/` and update `TEMPLES` in `catalog.js` and `PACKAGES`
  in `teerth.js`.
- **Ritual copy is written, not extracted.** The binary exposed section names and short
  labels only — puja descriptions, legends and process steps were authored to match the
  app's tone. Worth a review before going live.
- Astrologers, Teerth, Store, Kundli and Panchang are still stubs.
