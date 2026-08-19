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
| 4 | `public/assets/projects/akkountant/agent-chat.webp` | Akkountant · Results | Agent chat ("Ask about investments…") answering a question, ideally with an uploaded receipt in-thread |
| 5 | `public/assets/projects/akkountant/wealth-digest.webp` | Akkountant · Results | The daily wealth digest — email or in-app panel |
| ~~19–24~~ ✅ | `akkountant/{home,portfolio,asset-cards,stocks,jobs,timestamps}.webp` | Akkountant · 4 sections | **DELIVERED** 2026-08-19 — 6 Overseer captures, raw; write-up restructured around them |
| 25 | `public/assets/projects/akkountant/visitors.webp` | Akkountant · Running it like production | Portfolio Visitors panel. **REDACT the IP column** — the rows are real third-party visitors; the stat cards + city/ISP/browser columns carry the point |
| 6 | `public/assets/projects/tripsplit/balances.webp` | TripSplit · The solution | Balances / settle-up screen with a few multi-currency expenses |
| 11 | `public/assets/projects/makaan/price-map.webp` | Makaan · The solution | Interactive price map (Bangalore) with locality overlays |
| 12 | `public/assets/projects/makaan/valuation.webp` | Makaan · Results | A "Value My Property" result — estimate, rent, comparables |
| 13 | `public/assets/projects/satte-nights/table.webp` | Satte Nights · The solution | Busy table mid-hand on a phone — play chips visible, **no real usernames** |
| ~~16~~ ✅ | `public/assets/projects/united-majdoors/dashboard.webp` | United Majdoors · The solution | **DELIVERED** 2026-08-19 — RAW per explicit Overseer instruction |
| ~~17~~ ✅ | `public/assets/projects/united-majdoors/terminal.webp` | United Majdoors · Results | **DELIVERED** 2026-08-19 — Settings view (accounts + usage), emails-only redaction per Overseer |

## Card images (grid thumbnails — currently using old images, swap when ready)

| # | Path | Replaces | Capture |
|---|------|----------|---------|
| ~~8~~ ✅ | `public/assets/projects/akkountant/card.webp` | *(was illustration)* | **DELIVERED** 2026-08-19 — portfolio overview, raw |
| 9 | `public/assets/projects/tripsplit/card.webp` | `tripsplitModal/tripsplit.webp` | Trip home screen |
| 10 | `public/assets/projects/vidish-space/card.webp` | `vidishSpaceModal/vidishSpaceDark.webp` | The current site — monsoon or winter full-page looks best on cards |
| 14 | `public/assets/projects/makaan/card.webp` | *(none — card currently text-only)* | Makaan dashboard/map — strongest single screen |
| 15 | `public/assets/projects/satte-nights/card.webp` | *(none — card currently text-only)* | A table mid-hand — **no real usernames** |
| ~~18~~ ✅ | `public/assets/projects/united-majdoors/card.webp` | *(was monogram)* | **DELIVERED** 2026-08-19 — Overseer-supplied akkountant-filtered board, RAW (clean by construction; also the How-it-works figure) |

## How to hand them over

Drop files at the exact paths above inside the repo (any checkout), or just
give them to vidish_space_lead with the slot number — placement, WebP
conversion, and the `pending` flag flips are handled from there.

> Notes: LeetcodeToGit removed (Overseer, 2026-08-18). Makaan + Satte Nights case-studies added — their slots are 11-15 above. Slot numbering keeps gaps intentionally (7 removed) so in-flight captures never go stale.
