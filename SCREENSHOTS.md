# Screenshot manifest — Projects revamp

Every slot below renders as a dashed **📸 Screenshot slot** placeholder on
dev.vidish.online until the real file exists at the listed path. Hand the
captures over in any batch/order; each one is a data-only swap (`pending` flag
off), no code changes.

## Format guidance

- **WebP preferred** (PNG fine — will be converted), width **≥ 1400px**, browser at 100% zoom
- Crop to the product surface — no OS chrome / bookmarks bar
- ⚠️ **Akkountant shows real money**: mask amounts & account numbers, or use demo data, before capturing
- Client projects need **no screenshots** (NDA treatment: logos only)

## In-page slots (visible placeholders on dev)

| # | Path | Project · Section | Capture |
|---|------|-------------------|---------|
| 1 | `public/assets/projects/vidish-space/hero-summer.webp` | Vidish.Online · The solution | Full hero in **summer**, leaves mid-fall, season picker visible |
| 2 | `public/assets/projects/vidish-space/weather-monsoon.webp` | Vidish.Online · Hard problems | Hero in **monsoon** mid-rain — lightning flash if you can catch it (20–45 s cycle) |
| 3 | `public/assets/projects/vidish-space/case-study.webp` | Vidish.Online · Results | This case-study page or the new Projects grid — the newest surface |
| 4 | `public/assets/projects/akkountant/agent-chat.webp` | Akkountant · Results | Agent chat ("Ask about investments…") answering a question, ideally with an uploaded receipt in-thread — **if the receipt shows a counterparty name/address/card tail, mask it (third-party data)** |
| 5 | `public/assets/projects/akkountant/wealth-digest.webp` | Akkountant · Results | The daily wealth digest — email or in-app panel |
| ~~19–24~~ ✅ | `akkountant/{home,portfolio,asset-cards,stocks,jobs,timestamps}.webp` | Akkountant · 4 sections | **DELIVERED** 2026-08-19 — 6 Overseer captures, raw; write-up restructured around them |
| ~~26–28~~ ✅ | `akkountant/{transactions,statements,freelance}.webp` | Akkountant · Beyond investments | **DELIVERED** 2026-08-19 — transactions (refs solid-filled), statements (raw), freelance (client labels solid-filled) |
| ~~29~~ ✅ | `public/assets/projects/akkountant/vault.webp` | Akkountant · Beyond investments | **DELIVERED** 2026-08-19 — six identity-document cards solid-filled (thumbnail + name/label) per Overseer 'censor the vault files'; folders/ZIP/UI raw |
| ~~25~~ ✅ | `public/assets/projects/akkountant/visitors.webp` | Akkountant · Running it like production | **DELIVERED** 2026-08-19 — IP column **solid-filled** (third-party personal data), rest raw. Use a solid fill, never a mosaic: pixelation at sub-character cell size is reversible against a small alphabet in a known font |
| ~~6~~ | *(superseded)* | TripSplit · The solution | Replaced 2026-08-20 by the redesign capture set (slots 37–40) — the pre-redesign "balances" framing no longer exists in the product |
| ~~37~~ ✅ | `public/assets/projects/tripsplit/fx-rates.webp` | TripSplit · How it works | **DELIVERED** 2026-08-20 — Bureau de change modal; bottom cropped above the creditor row (third-party name fragment) |
| 38 | `public/assets/projects/tripsplit/manifest.webp` | TripSplit · The solution | **ON HOLD — Overseer decision pending**: Household ticket reveals shared-finances arrangement; both live trip IDs to be solid-filled per owner verdict (live ledgers + unthrottled join endpoint) |
| 39 | `public/assets/projects/tripsplit/telegraph.webp` | TripSplit · The Telegraph desk | **ON HOLD — Overseer decision pending**: third-party username + their chat messages verbatim (raw with consent / solid-fill name / skip) |
| 40 | `public/assets/projects/tripsplit/ledger.webp` | TripSplit · A ledger, not an app | **ON HOLD — Overseer decision pending**: third-party name in settlement rows + trip ID to fill |
| 41 | `public/assets/projects/tripsplit/customs.webp` | TripSplit · Results | **ON HOLD — Overseer decision pending**: third-party name as creditor (their out-of-pocket total also visible in the companion audit capture — not placed, available if cleared) |
| ~~11–12, 30–33~~ ✅ | `makaan/{map,search,places,prices,valuation,chat}.webp` | Makaan · 5 sections | **DELIVERED** 2026-08-19 — 6 Overseer captures, all raw (aggregated public-listing data, demo chat; nothing to redact); write-up restructured one section per product tab |
| ~~13, 34–36~~ ✅ | `satte-nights/{lobby,setup,options,table}.webp` | Satte Nights · 3 sections | **DELIVERED** 2026-08-20 — 4 raw phone captures ('tester' account, demo room; expired room code visible with disclosure caption). *Optional upgrade: a busy mid-hand table shot can later replace table.webp* |
| ~~16~~ ✅ | `public/assets/projects/united-majdoors/dashboard.webp` | United Majdoors · The solution | **DELIVERED** 2026-08-19 — RAW per explicit Overseer instruction |
| ~~17~~ ✅ | `public/assets/projects/united-majdoors/terminal.webp` | United Majdoors · Results | **DELIVERED** 2026-08-19 — Settings view (accounts + usage), emails-only redaction per Overseer |

## Card images (grid thumbnails — currently using old images, swap when ready)

| # | Path | Replaces | Capture |
|---|------|----------|---------|
| ~~8~~ ✅ | `public/assets/projects/akkountant/card.webp` | *(was illustration)* | **DELIVERED** 2026-08-19 — portfolio overview, raw |
| ~~9~~ ✅ | `public/assets/projects/tripsplit/card.webp` | `tripsplitModal/tripsplit.webp` | **DELIVERED** 2026-08-20 — the redesigned landing page ("A ledger for the road"), raw (no personal data by construction) |
| 10 | `public/assets/projects/vidish-space/card.webp` | `vidishSpaceModal/vidishSpaceDark.webp` | The current site — monsoon or winter full-page looks best on cards |
| ~~14~~ ✅ | `public/assets/projects/makaan/card.webp` | *(was monogram)* | **DELIVERED** 2026-08-19 — the map, raw |
| ~~15~~ ✅ | `public/assets/projects/satte-nights/card.webp` | *(was none — card was text-only)* | **DELIVERED** 2026-08-20 — composed 3-up phone montage (lobby · table · setup) on brand green |
| ~~18~~ ✅ | `public/assets/projects/united-majdoors/card.webp` | *(was monogram)* | **DELIVERED** 2026-08-19 — Overseer-supplied akkountant-filtered board, RAW (clean by construction; also the How-it-works figure) |

## How to hand them over

Drop files at the exact paths above inside the repo (any checkout), or just
give them to vidish_space_lead with the slot number — placement, WebP
conversion, and the `pending` flag flips are handled from there.

> Notes: LeetcodeToGit removed (Overseer, 2026-08-18). Makaan + Satte Nights case-studies added — their slots are 11-15 above. Slot numbering keeps gaps intentionally (7 removed) so in-flight captures never go stale.
