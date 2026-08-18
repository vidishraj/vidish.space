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
| 4 | `public/assets/projects/akkountant/agent-chat.webp` | Akkountant · The solution | Agent chat answering a portfolio question, ideally with an uploaded receipt in-thread (**mask data**) |
| 5 | `public/assets/projects/akkountant/wealth-digest.webp` | Akkountant · Results | The daily wealth digest — email or in-app panel (**mask data**) |
| 6 | `public/assets/projects/tripsplit/balances.webp` | TripSplit · The solution | Balances / settle-up screen with a few multi-currency expenses |
| 7 | `public/assets/projects/leetcode-to-git/synced-repo.webp` | LeetcodeToGit · How it works | GitHub repo after a sync — folder tree + generated commit history |

## Card images (grid thumbnails — currently using old images, swap when ready)

| # | Path | Replaces | Capture |
|---|------|----------|---------|
| 8 | `public/assets/projects/akkountant/card.webp` | `akkountantModal/akkountant.webp` | Dashboard overview — the strongest single screen (**mask data**) |
| 9 | `public/assets/projects/tripsplit/card.webp` | `tripsplitModal/tripsplit.webp` | Trip home screen |
| 10 | `public/assets/projects/vidish-space/card.webp` | `vidishSpaceModal/vidishSpaceDark.webp` | The current site — monsoon or winter full-page looks best on cards |

*(LeetcodeToGit's card (`gitLeet.webp`) is a logo lock-up, still fine.)*

## How to hand them over

Drop files at the exact paths above inside the repo (any checkout), or just
give them to vidish_space_lead with the slot number — placement, WebP
conversion, and the `pending` flag flips are handled from there.
