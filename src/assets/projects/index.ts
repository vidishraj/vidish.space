import type {Project} from './types';

export type {Project, ProjectKind, ProjectMetric, ProjectSection} from './types';

// ─────────────────────────────────────────────────────────────
// PERSONAL PROJECTS
// All entries use the typed content-block case-study format.
// ─────────────────────────────────────────────────────────────

const akkountant: Project = {
    id: 'akkountant',
    kind: 'personal',
    featured: true,
    title: 'Akkountant',
    tagline: 'A personal wealth platform with an AI agent that reads your statements, answers portfolio questions, and briefs you every morning.',
    hookMetric: {value: '6 banks', label: 'auto-ingested from Gmail'},
    tags: ['Python', 'React', 'Claude SDK', 'MCP', 'MySQL'],
    image: '/assets/projects/akkountant/card.webp',
    facts: {
        role: 'Creator & sole developer',
        timeline: 'v1 2023 → actively developed',
        status: 'live',
        team: 'Solo',
        platform: 'Web',
    },
    tldr: [
        'Auto-ingests statements from 6 banks via Gmail and tracks 6 investment types — the foundation layer.',
        'An LLM agent (with MCP tools) chats over your portfolio, reads uploaded receipts and statements, and inserts investments for you.',
        'Engineered like production infra: zero-loss coverage gates on every rate feed, a 112-test regression suite, nightly processing windows.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: `Personal finances fragment across banks, brokers, and funds — and every tracking app dies the same death: manual entry. Akkountant started as the fix for that (statements auto-ingested from Gmail, investments tracked across 6 types).

The current generation asks the next question: once the system holds all your financial data, **why are you still clicking through dashboards?** You should just ask.`,
                },
            ],
        },
        {
            title: 'The solution',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '🤖', title: 'AI investment agent', body: 'Chat over your portfolio in natural language — upload receipts, statements, or screenshots and the agent reads them, answers, and inserts investments via MCP tools.'},
                        {icon: '📬', title: 'Daily wealth digest', body: 'A proactive AI briefing summarising portfolio changes and actionable items, generated on schedule.'},
                        {icon: '📄', title: 'Hybrid statement extraction', body: 'Known bank layouts parse via patterns; everything else — masked, scanned, novel formats — falls through to LLM extraction. Same interface, far broader coverage.'},
                        {icon: '🛡️', title: 'Zero-loss rate ingestion', body: 'Every rate feed (MF NAV, gold, NPS, PPF, EPF) is coverage-gated: a degraded fetch can never overwrite last-known-good data.'},
                        {icon: '🧾', title: 'Freelance invoicing & document vault', body: 'Create, sign, and track invoices with a revenue dashboard; keep important documents in a labelled vault alongside the finances they relate to.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/home.webp',
                    alt: 'Akkountant home screen with four modules: Investments, Transactions, Freelance, Files',
                    caption: 'Four modules, one login — Investments, Transactions, Freelance, and Files. The "Ask about investments…" bar in the header is the agent.',
                },
            ],
        },
        {
            title: 'The portfolio at a glance',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"How am I doing, overall, right now?"* — answered in one screen without opening six broker apps.

The Investments view opens on a single total asset value with invested vs. current, absolute and percentage change, an allocation bar across all six asset classes, and realized gains split by equity vs. F&O. Every number on it arrived automatically: statements from Gmail, prices from the nightly rate jobs.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/portfolio.webp',
                    alt: 'Portfolio overview: total asset value, invested vs current, allocation bar, realized gains, and an invested-vs-current bar chart per asset class',
                    caption: 'One number to rule them all — then the allocation bar and the invested-vs-current chart show *where* the change came from.',
                },
                {
                    type: 'text',
                    md: `Below the headline, each asset class gets its own card — total, invested, change, change % — with inline actions: **refresh** prices, **upload** a statement, **add** an entry, or, for stocks, **link** a broker. Six asset types, six different data sources, one consistent surface.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/asset-cards.webp',
                    alt: 'Six asset-class cards — Stocks, Mutual Funds, NPS, EPF, PPF, Gold — each with total, invested, change, and action buttons',
                    caption: 'Stocks, mutual funds, NPS, EPF, PPF, gold — every class with its own refresh, upload, and add actions.',
                },
            ],
        },
        {
            title: 'Drilling into holdings',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"Which positions are actually carrying the portfolio — and which are dragging it?"*

Open any asset class and you get the full ledger: holdings sorted by P&L, each with live price, average cost, quantity, and the per-position gain — plus tabs for **equity history**, **F&O history**, and the **source emails** the data was parsed from. Realized and unrealized P&L are kept honestly separate, so the number you see is the number you'd get.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/stocks.webp',
                    alt: 'Stocks detail: total asset value, invested, change, realized and F&O P&L, and a holdings list sorted by P&L with live price, average cost, and quantity',
                    caption: 'The stocks ledger — every holding with live price, average cost, quantity, and P&L, sortable; history and source emails one tab away.',
                },
            ],
        },
        {
            title: 'Beyond investments',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"Where did the money actually go this month — and is every statement accounted for?"*

The **Transactions** module is the foundation layer in action: a calendar marks each day a statement or transaction email arrived, Gmail and Google Drive show as connected sources, and the ledger runs to **11,418 transactions** with credit/debit/net totals, bank and month filters, and a one-click **Scan** to pull anything new.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/transactions.webp',
                    alt: 'Transactions view: monthly calendar with statement markers, Gmail and Drive connected, credit/debit/net totals, and a filterable ledger of 11,418 transactions',
                    caption: 'Transactions — 11,418 rows that typed themselves in. Transaction references redacted.',
                },
                {
                    type: 'text',
                    md: `Behind it sits the **Statements** view: every parsed statement as a card — bank, period, items extracted vs. inserted, processing status — with per-bank counts across the six supported formats. When a statement shows "no items extracted," that's the hybrid extractor telling you a layout needs attention, not silently skipping it.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/statements.webp',
                    alt: 'Statements view: 121 statements across 6 banks, each card showing period, items extracted and inserted, and processed status',
                    caption: '121 statements across six banks — each one auditable down to how many items it yielded.',
                },
                {
                    type: 'text',
                    md: `**Use case:** *"As a freelancer, what did I earn, who still owes me, and how is it trending?"*

The **Freelance** module is a small invoicing product in its own right: create, manage, and sign invoices, sign documents, export, manage customers — and a dashboard with paid vs. unpaid value, a six-month average with trend, invoice status distribution, monthly earnings, and a client split.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/freelance.webp',
                    alt: 'Freelance dashboard: paid earnings, unpaid value, monthly average with trend, invoice status bar, monthly earnings chart, and a client-distribution donut',
                    caption: 'Freelance — invoicing, signing, and a revenue dashboard. Client names redacted from the distribution chart.',
                },
                {
                    type: 'text',
                    md: `And the **Document Vault**: folders, labelled files, and upload — the important paperwork kept next to the finances it relates to, instead of scattered across a downloads folder.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/vault.webp',
                    alt: 'Document Vault: two folders, a labelled tax ZIP, and a row of document cards with download and delete actions — document contents redacted',
                    caption: 'The Document Vault — folders, labels, and a row of documents. Document contents and names redacted; they’re identity papers.',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'text',
                    md: 'Two services on a Linux box: an HTTP surface (Flask + FastAPI) for the app and agent chat, and a window-gated scheduler that does the heavy ingestion between **1–7 AM IST**. MySQL underneath; Claude via the agent SDK with MCP tools on top.',
                },
                {
                    type: 'decision',
                    decision: 'Stale-but-accurate beats fresh-but-empty: coverage gates on every rate write',
                    why: 'A vendor outage once returned an empty payload that silently overwrote last-good gold rates — the dashboard showed ₹0 gains. Now a shared BaseRateTask refuses any write below a 98% success ratio, with a hard floor at 50% and a refuse-on-empty guard.',
                    tradeoff: 'Rates can run a day stale during vendor outages — acceptable for a money app where "fresh but wrong" is the worst outcome.',
                },
                {
                    type: 'decision',
                    decision: 'One SQLAlchemy instance owned by the app, never per-call engines',
                    why: 'Agent conversation writes were silently splitting across sessions, corrupting chat state. All DB access now routes through the app-owned instance with per-task session cleanup in the scheduler loop.',
                    tradeoff: 'The migration itself briefly broke the scheduler (a hotfix-grade regression) — but it eliminated an entire class of session-drift bugs.',
                },
                {
                    type: 'decision',
                    decision: 'SSE-over-POST chat with a battle-tested polyfill instead of hand-rolled streaming',
                    why: 'iOS Safari tears down fetch-driven SSE streams after the first frame; the Microsoft fetch-event-source polyfill handles WebKit correctly.',
                    tradeoff: 'One more third-party dependency on a financial app — mitigated with a pinned, integrity-hashed lockfile.',
                },
            ],
        },
        {
            title: 'Running it like production',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"Did last night's jobs actually run — and can I trust today's numbers?"*

A one-user app still needs operations. The **Jobs** panel shows every scheduled task — mail checks, statement parsing, each rate feed, the wealth digest — as a run-history strip with success rate, priority, and a health badge. **Degraded** isn't hidden; it's the whole point of the coverage gates: a feed can report trouble without ever corrupting the data underneath. Any job can be triggered on demand.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/jobs.webp',
                    alt: 'Jobs Management panel: per-job run-history strips with success rate, priority, and Healthy/Degraded health badges, plus a run-now job picker',
                    caption: 'Jobs Management — run history per task, success rates, health badges, and a "Run now" picker. Degraded is a signal, not a secret.',
                },
                {
                    type: 'text',
                    md: `Two smaller panels close the loop on trust: **File Timestamps** shows exactly when each rate file was last refreshed (the receipts behind "stale-but-accurate"), and a **Visitors** view tracks who's hitting the app — IP, city, ISP, browser — which on a personal finance tool doubles as a lightweight intrusion check.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/timestamps.webp',
                    alt: 'File Timestamps panel listing each rate file (EPF, Gold, MF, NPS, PPF, Stocks) with its last-refresh time',
                    caption: 'File Timestamps — the provenance of every number on the dashboard, one glance.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/visitors.webp',
                    alt: 'Portfolio Visitors panel: unique visitors, total visits, live tracked, countries, and a per-visit table with city, country, ISP, browser — IP column redacted',
                    caption: 'Visitors — unique/total/live/countries at the top, every hit below. On a money app this is a security panel as much as analytics. (Visitor IPs redacted — their data, not mine.)',
                },
            ],
        },
        {
            title: 'Hard problems',
            blocks: [
                {
                    type: 'challenge',
                    problem: 'A rate-vendor outage silently overwrote last-known-good prices with empty data — the dashboard showed ₹0 balances, indistinguishable from a real crash.',
                    approach: 'Built a three-tier coverage gate at the write boundary (refuse-on-empty → 50% hard floor → 98% partial-success gate), hoisted it into a shared base class, and migrated all five rate feeds to inherit it.',
                    result: 'Verified against a real vendor 503: the dashboard held last-good values. Zero silent-loss incidents since; the gate logic carries a 112-test regression suite.',
                },
                {
                    type: 'challenge',
                    problem: 'The AI agent confidently "read" attachments it could not actually see — hallucinating receipt contents because the SDK silently dropped mis-shaped image blocks.',
                    approach: 'Traced the mismatch between the API’s nested content-block shape and the SDK’s MCP shape; fixed the block format, added PDF text-extraction (PDFs aren’t a valid image block), and hardened the prompt with a verbatim-citation rule: if you can’t quote the attachment, say you can’t see it.',
                    result: 'No hallucinated attachment content since — verified against a corpus of receipts, statements, and screenshots.',
                },
            ],
        },
        {
            title: 'Results',
            blocks: [
                {
                    type: 'callout',
                    label: 'The shape of it',
                    text: 'One-user production, engineered like a fleet: every rate source coverage-gated, statements from six banks ingesting themselves nightly, and an AI agent that answers questions the dashboards used to make you dig for.',
                },
                {
                    type: 'text',
                    md: 'Live and in daily development. The platform runs unattended: Gmail ingest, nightly rate refreshes, reconciliation backstops, and the morning wealth digest all happen without a human in the loop.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/agent-chat.webp',
                    pending: true,
                    capture: 'The AI agent chat ("Ask about investments…") answering a question — ideally with an uploaded receipt in the thread.',
                    caption: 'The investment agent — ask in plain language, attach a receipt, and it does the bookkeeping.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/akkountant/wealth-digest.webp',
                    pending: true,
                    capture: 'The daily wealth digest (email or in-app panel).',
                    caption: 'The morning wealth digest — the portfolio explains itself before you ask.',
                },
            ],
        },
    ],
    metrics: [
        {value: '6', label: 'bank statement formats auto-ingested'},
        {value: '5', label: 'rate feeds with zero-loss coverage gates'},
        {value: '112', label: 'tests in the rate-pipeline regression suite'},
        {value: '1–7 AM', label: 'IST nightly processing window'},
    ],
    techStack: ['Python', 'Flask', 'FastAPI', 'SQLAlchemy', 'MySQL', 'systemd', 'React 18', 'TypeScript', 'Vite', 'MUI', 'Firebase Auth', 'Anthropic Claude SDK', 'MCP', 'PyMuPDF', 'Gmail API', 'SSE', 'Nginx', 'GitHub Actions'],
    // Repo links intentionally omitted pending Overseer confirmation that the
    // current repos are public (per akkountant_lead).
    links: {website: 'https://akkountant.vidish.online'},
};

const tripsplit: Project = {
    id: 'tripsplit',
    kind: 'personal',
    title: 'TripSplit',
    tagline: 'A traveller\u2019s ledger for group trips \u2014 multi-currency splits kept honest by an AI operator that files the numbers from plain English.',
    hookMetric: {value: '11', label: 'AI operator tools'},
    tags: ['Claude Agent SDK', 'React', 'Flask', 'Multi-currency', 'PWA'],
    image: '/assets/projects/tripsplit/card.webp',
    facts: {
        role: 'Creator & sole developer',
        status: 'live',
        team: 'Solo',
        platform: 'Web \u00b7 installable PWA',
    },
    tldr: [
        'Trips are boarding passes: create one with up to 3 currencies; friends request to join with a 6-character code and an existing member approves \u2014 an ID alone grants nothing.',
        '\u201cTrip Telegraph\u201d \u2014 a Claude agent with 11 trip-scoped tools \u2014 files expenses from plain English or a photographed receipt, audits the ledger on request, and answers \u201cwho owes whom\u201d.',
        'Every amount is converted once, at entry-time rates; settlement nets all positions and clears the trip in at most n\u22121 transfers.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: 'Group trips end one of two ways: one exhausted person playing accountant in a spreadsheet, or total amnesia about who paid for what. Add multiple currencies \u2014 the India-trip rupees, the layover euros \u2014 and even the spreadsheet person gives up. TripSplit started as the fix for that; its latest incarnation adds the missing piece \u2014 nobody wants to do data entry on holiday, so an operator now does it for you.',
                },
            ],
        },
        {
            title: 'The solution',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '\ud83c\udfab', title: 'Trips as boarding passes', body: 'Create a trip with up to 3 currencies; friends join with a 6-character code plus a join-request an existing member must approve. Every endpoint re-verifies identity and membership \u2014 the ID is an address, not a key.'},
                        {icon: '\ud83d\udcb1', title: 'Multi-currency, converted once', body: 'Enter any expense in any trip currency \u2014 it\u2019s converted at the live rate in effect at entry and stored in INR, so totals never drift when rates move later.'},
                        {icon: '\u2696\ufe0f', title: 'Live balances & minimum-transfer settle-up', body: 'Who owes whom, personal (unsplit) spend, and the exact transfers that clear the trip \u2014 recomputed from the ledger on every view.'},
                        {icon: '\ud83d\udcee', title: 'An operator on duty', body: '\u201cTrip Telegraph\u201d \u2014 tell it what happened in plain English (or paste the receipt) and the expense is filed, converted, and split.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/projects/tripsplit/manifest.webp',
                    caption: 'Departures \u2014 every trip is a boarding pass with a tear-off stub. (Trip IDs redacted: they\u2019re join addresses for live ledgers.)',
                    alt: 'TripSplit Departures board showing the trip manifest as ticket stubs, including a Household ledger and a three-currency Europe trip',
                },
            ],
        },
        {
            title: 'The Telegraph desk',
            blocks: [
                {
                    type: 'text',
                    md: 'The headline of the update: an in-trip chat agent (**Claude Haiku 4.5** via the **Claude Agent SDK**) that operates the ledger. It holds **11 tools \u2014 7 read, 4 write** \u2014 and every one is constructed as a closure over the current trip and requesting user, so it is structurally incapable of reaching any other trip\u2019s data.',
                },
                {
                    type: 'features',
                    items: [
                        {icon: '\u2709\ufe0f', title: 'Plain English in, ledger entries out', body: 'Biased toward action: sensible defaults (today\u2019s date, you paid, equal split) and at most one clarifying question \u2014 it files and narrates rather than interrogating.'},
                        {icon: '\ud83e\uddfe', title: 'Receipt \u2192 expense', body: 'Paste up to 4 photos per message; the model\u2019s native vision extracts amount, currency, date and merchant \u2014 no OCR pipeline. Images are read once and wiped after the turn, never persisted.'},
                        {icon: '\ud83d\udd0e', title: 'Emergent forensic audits', body: '\u201cCheck for duplicate entries\u201d isn\u2019t a feature \u2014 the agent pulls the whole ledger through one flat read tool and does the cross-referencing (same merchant, different dates and amounts) in-model.'},
                        {icon: '\ud83d\udcdc', title: 'A shared transcript', body: 'Every operator conversation is stored per-trip and visible to all members \u2014 what the agent did, and why, is part of the trip\u2019s record.'},
                    ],
                },
                {
                    type: 'decision',
                    decision: 'The agent gets no edit tool \u2014 corrections are delete-and-re-file',
                    why: 'The write surface is kept minimal: add, delete, settle, note. Fixing a mis-filed \u20ac1,000 as \u20b91,000 means deleting the wrong entry and filing a fresh one \u2014 two visible mutations in the shared transcript instead of one silent in-place change.',
                    tradeoff: 'Two ledger events per correction \u2014 noisier history, but nothing the agent does is ever invisible.',
                },
                {
                    type: 'challenge',
                    problem: 'A pasted receipt is untrusted input handed to an agent that holds a filesystem Read tool \u2014 a hostile image could carry injected instructions like \u201cread the server\u2019s key file and quote it back\u201d.',
                    approach: 'A pre-tool-use hook hard-denies any read outside the per-turn image directory, with paths resolved via realpath so symlinks and ../ can\u2019t escape. Trip data never flows through the filesystem \u2014 only through the trip-scoped tools.',
                    result: 'Prompt injection via receipt can\u2019t exfiltrate credentials \u2014 verified with a canary test in the hardening pass.',
                },
                {
                    type: 'callout',
                    label: 'Honest tradeoff',
                    text: 'There is no confirmation step and no undo \u2014 by design. Containment does the work instead: trip-scoped tools, integrity checks (splits must sum, balances must net to zero or the write rolls back), instant ledger refresh after any mutation, a visible transcript, and hard limits (10 agent turns per request, 30 requests/hour).',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/tripsplit/telegraph.webp',
                    caption: 'The operator at work \u2014 one plain-English message deletes the wrong entry, files the right one, audits the full ledger for duplicates, and answers the balance.',
                    alt: 'Trip Telegraph chat where the agent corrects a mis-filed expense, reports no duplicate entries, and answers who owes whom',
                },
            ],
        },
        {
            title: 'A ledger, not an app',
            blocks: [
                {
                    type: 'text',
                    md: 'One May 2026 commit \u2014 46 files, **+4,329/\u221285,291 lines** \u2014 reskinned the whole product into a traveller\u2019s-ledger fiction without touching the stack: the deletions were six Lottie animations replaced by CSS and SVG. A hand-built design system (crop marks, perforated tear-lines, rotated rubber stamps, a boarding-pass-with-stub card) rides on a paper-and-ink token palette with a ledger-rule background and film-grain overlay. Type is **Fraunces** (driven through its SOFT/WONK variable axes) for display, **Crimson Pro** for body, **JetBrains Mono** for figures.\n\nThe fiction goes all the way down: trips are a *Departures board*, the expense list is *Folio II \u2014 the ledger*, settlement is *Folio III \u2014 Customs declaration*, rates live at the *Bureau de change*, users are *bearers*, and the chat is the *Telegraph desk*.',
                },
                {
                    type: 'text',
                    md: 'Since July 2026 it\u2019s also a proper **PWA**: a branded manifest, full icon set, and a Workbox service worker that precaches the app shell \u2014 the installed app opens and renders with no network round-trip (ledger data still needs a connection). The paper-colored theme even extends into the installed window chrome.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/tripsplit/ledger.webp',
                    caption: 'Folio II \u2014 the ledger. Sixty-five entries on file for one European trip. (Trip ID redacted.)',
                    alt: 'TripSplit in-trip view of the Europe ledger with tabs for settlement, members, FX rates, notes and requests',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'text',
                    md: 'A deliberately boring stack doing careful work: **Flask 3 + SQLAlchemy 2 on MySQL** behind a **React 18 + TypeScript + MUI** front-end, **Firebase** email auth with the token re-verified server-side on every request, and GitHub Actions SSH-deploying the backend as a systemd service with an atomic front-end swap.',
                },
                {
                    type: 'decision',
                    decision: 'Per-expense ledger entries are stored; net balances and the settlement plan are always derived, never persisted',
                    why: 'Each expense atomically writes its per-member ledger rows, validated to net to zero \u2014 those rows are source data. Net positions and the transfer plan are recomputed from them on every view, so no screen can drift out of sync with the ledger.',
                    tradeoff: 'More computation per view on large trips \u2014 irrelevant at trip scale, priceless for correctness.',
                },
                {
                    type: 'decision',
                    decision: 'Currency conversion happens once, at entry time, at real rates',
                    why: 'The amount and every split share are converted to INR at the rate in effect when the expense is logged, and stored in INR \u2014 every member sees a stable view, and settlement runs purely in INR.',
                    tradeoff: 'A trip settled late uses entry-time rates rather than settlement-day rates \u2014 predictability beats precision here.',
                },
                {
                    type: 'text',
                    md: 'Settlement is the classic min-cash-flow heuristic, implemented with two heaps: net each member\u2019s position, then repeatedly match the largest debtor against the largest creditor \u2014 transferring the smaller of the two amounts and re-queuing the remainder \u2014 until every balance clears, guaranteeing at most n\u22121 transfers for n members. Exchange rates come from a keyless public FX feed, INR-base, fetched on demand with a 5-minute in-memory cache that falls back to the last good rates.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/tripsplit/fx-rates.webp',
                    caption: 'The Bureau de change \u2014 live rates, at most five minutes old, converted once at entry and never again.',
                    alt: 'TripSplit FX rates dialog showing live Euro, British Pound and Indian Rupee rates',
                },
            ],
        },
        {
            title: 'Results',
            blocks: [
                {
                    type: 'callout',
                    label: 'Field-tested',
                    text: 'Eleven trips on file and counting \u2014 including a two-person European trip with 65 entries across three currencies. The \u201cwho owes whom\u201d conversation now takes exactly one screen, and filing the numbers takes a sentence.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/tripsplit/customs.webp',
                    caption: 'Customs declaration \u2014 the argument, resolved to exact transfers. A real trip, declared and settled to the paisa.',
                    alt: 'TripSplit settlement view showing a settled trip: total declared, minimum-transaction plan, and a zero balance between members',
                },
            ],
        },
    ],
    metrics: [
        {value: '11', label: 'trips on file'},
        {value: '\u2264 n\u22121', label: 'transfers to settle n members'},
        {value: '7+4', label: 'agent tools \u00b7 read / write'},
    ],
    techStack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'React', 'TypeScript', 'MUI', 'Firebase Auth', 'Claude Agent SDK', 'Workbox'],
    links: {
        github: 'https://github.com/vidishraj/trip_split_ui',
        website: 'https://tripsplit.vidish.online/trip',
    },
};

// ─────────────────────────────────────────────────────────────
// THE FLAGSHIP — United Majdoors (bead vs-cux: smorgasbord_lead,
// verified + hardened by the system's builder). Publish constraints (§8):
// Gas Town/Beads credited, control-plane framing, private repo (no link),
// neutral multi-workspace language, roles not personas, no tenant names.
// ─────────────────────────────────────────────────────────────

const unitedMajdoors: Project = {
    id: 'united-majdoors',
    kind: 'personal',
    featured: true,
    title: 'United Majdoors',
    tagline: 'A command centre for a fleet of autonomous AI coding agents — one person operating a 50-seat software team from a browser. This site is the fleet’s work.',
    hookMetric: {value: '50+', label: 'agent seats across 11 rigs'},
    tags: ['TypeScript', 'Next.js', 'WebSockets', 'node-pty', 'Claude Agent SDK'],
    image: '/assets/projects/united-majdoors/card.webp',
    facts: {
        role: 'Creator & fleet operator',
        timeline: 'Jan 2026 → present · ~7 months in production',
        status: 'live',
        team: 'Solo — plus the fleet itself',
        platform: 'Internal platform (private)',
    },
    tldr: [
        'A browser command centre that runs dozens of autonomous Claude agents organised into per-project teams — dashboard, kanban, live terminals, push notifications.',
        'Built on Steve Yegge’s open-source Gas Town framework: the original work is the control plane, the central cross-workspace relay, and operating a real production fleet.',
        'The proof is recursive — this portfolio, including the page you’re reading, is built and maintained by agents inside it.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: `One person running many AI coding agents hits a wall fast: agents live in terminal multiplexers you can’t see into, they die mid-task on provider errors, messages between them silently vanish across workspace boundaries — and no human can watch fifty terminals at once.

[Gas Town](https://github.com/gastownhall/gastown), Steve Yegge’s open-source agent-fleet framework, provides the primitives: agents, work-tracking, command-line tools. The gap United Majdoors fills is everything between those primitives and *one person actually operating a production fleet*: the eyes, the controls, and the nervous system.`,
                },
            ],
        },
        {
            title: 'The solution',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '🖥️', title: 'Live terminals in the browser', body: 'Every agent’s real terminal, streamed over WebSockets — watch an agent think in real time, attach and detach, survive a refresh.'},
                        {icon: '📋', title: 'Fleet operations dashboard', body: 'Per-project teams (a lead, crew, reviewers) on a kanban of durable work items — assign, track, and message from one screen.'},
                        {icon: '📡', title: 'A central cross-workspace relay', body: 'The nervous system: any agent can message any other, even across workspace boundaries the native tooling can’t cross.'},
                        {icon: '🔔', title: 'Push when humans matter', body: 'Service-worker notifications the moment an agent needs input — operate the fleet from a phone.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/projects/united-majdoors/dashboard.webp',
                    alt: 'The United Majdoors dashboard with three live agent panes',
                    caption: 'The command centre — three agents live at once, mid-conversation.',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'text',
                    md: 'A Next.js + TypeScript app around a custom Node server that owns every agent process: **node-pty** spawns real terminals, **xterm.js** renders them live over WebSockets, and 28 REST route groups drive fleet operations. Underneath: Gas Town’s runtime and **Beads** — issues in a database — as the durable work record.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/united-majdoors/card.webp',
                    alt: 'The beads work board filtered to one project, showing 118 of 2,131 fleet issues',
                    caption: 'One project’s slice of the board — 118 of 2,131 issues of durable work across the fleet.',
                },
                {
                    type: 'decision',
                    decision: 'The durable unit of work is a database record — messages are only ephemeral nudges',
                    why: 'Agents die: provider errors, restarts, crashes. If work lived in chat, a dead agent meant lost work. With work-as-data, a restarted agent reads its record and resumes exactly where it left off.',
                    tradeoff: 'More ceremony — nothing counts until it’s written down. A message alone is never "done."',
                },
                {
                    type: 'decision',
                    decision: 'Drive agents through their real terminals, not a hidden headless API',
                    why: 'Full fidelity: the operator sees exactly what the agent sees, can attach and detach at will, and the same session survives a browser refresh.',
                    tradeoff: 'The server must manage real OS processes and PTY lifecycles — heavier than stateless HTTP, worth every gram.',
                },
                {
                    type: 'decision',
                    decision: 'One central relay process that owns every agent in every workspace',
                    why: 'Native peer messaging only reaches agents in the same workspace; a fleet spans several. The one process that owns all of them can bridge any two.',
                    tradeoff: 'The relay becomes a hub the whole fleet depends on — restarting it bounces everyone. Mitigated by staggered recovery and the durable work layer: a bounce loses nothing.',
                },
            ],
        },
        {
            title: 'Hard problems',
            blocks: [
                {
                    type: 'challenge',
                    problem: 'The islands problem: agents in different workspaces couldn’t message each other — deliveries silently vanished with no error, just dropped.',
                    approach: 'Built a central relay into the one process that owns every agent’s session: messages push straight into the target’s live terminal — no polling, no database round-trip — with self-configuring credentials written fresh on every startup.',
                    result: 'Any agent reaches any other, across any workspace, reliably. The flagship engineering story of the platform.',
                },
                {
                    type: 'challenge',
                    problem: 'The fleet’s merge authority ran in its own isolated workspace — unlistable, unmessageable, failing with opaque errors — so ready-to-ship work stalled with nowhere to go.',
                    approach: 'Taught the relay to resolve the isolated operations agents by their fixed on-disk locations and route to them explicitly, making one command the single dependable channel.',
                    result: 'Handoffs to the merge authority became instant and reliable — ready work stopped stalling.',
                },
                {
                    type: 'challenge',
                    problem: 'A database-backed mailbox for agent comms added write pressure, polling latency, and could loop on acknowledgements.',
                    approach: 'Retired mail entirely for push: the agent harness’s native in-session delivery within a workspace, and the relay bridging everything across workspaces — with the durable work record as the only source of truth underneath.',
                    result: 'Dramatically less database pressure, zero inbox polling — comms became instant nudges over durable work.',
                },
                {
                    type: 'challenge',
                    problem: 'Agents crash mid-task, and a fleet-wide restart bounces every agent at once — either could strand hours of work.',
                    approach: '"Stopped is not dead": a watcher auto-starts any idle agent the moment work lands on its record; restarts recover on a staggered ramp; each agent reloads its identity and context on resume.',
                    result: 'A self-healing fleet — many full restarts and provider outages in seven months of production, zero lost work.',
                },
            ],
        },
        {
            title: 'Results',
            blocks: [
                {
                    type: 'callout',
                    label: 'The recursive proof',
                    text: 'Every page of this portfolio — including the case study you are reading — was written, reviewed, and deployed by agents running inside United Majdoors. The system’s output is the site itself.',
                },
                {
                    type: 'text',
                    md: 'Seven months of continuous production running a real multi-project fleet. There is no public demo — the control plane drives a private fleet and holds its keys — so the observable output is the work the fleet ships.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/united-majdoors/terminal.webp',
                    alt: 'United Majdoors settings: per-workspace account logins and live rate-limit utilization',
                    caption: 'Operations, not just orchestration — per-workspace logins managed from the dashboard, with live rate-limit utilization so the operator sees the fleet’s fuel gauge.',
                },
            ],
        },
    ],
    metrics: [
        {value: '45,399', label: 'lines of TypeScript/TSX'},
        {value: '204', label: 'commits · ~7 months in production'},
        {value: '11', label: 'rigs · 50+ agent seats'},
        {value: '28', label: 'REST API route groups'},
    ],
    techStack: ['TypeScript', 'Next.js (App Router)', 'React', 'Tailwind', 'Node.js', 'node-pty', 'xterm.js', 'WebSockets', 'web-push', 'Claude Agent SDK', 'Gas Town (Go)', 'Beads / Dolt', 'systemd', 'Vitest'],
    // Repo is private by design (it holds the fleet's keys) — no links.
    // Gas Town is credited with a public link inside "The problem".
};

// Flagship entry — authored as the exemplar for the project-page format:
// the fixed narrative spine (Problem → Solution → How it works → Hard
// problems → Results) rendered with typed content blocks.
const vidishSpace: Project = {
    id: 'vidish-space',
    kind: 'personal',
    featured: true,
    title: 'Vidish.Online',
    tagline: "You're looking at it — a hand-built portfolio with three seasonal worlds, a real-time weather engine, and its own CI/CD pipeline.",
    hookMetric: {value: '60 fps', label: 'weather, GPU-composited'},
    tags: ['React 18', 'TypeScript', 'Framer Motion', 'Vite', 'CI/CD'],
    image: '/assets/vidishSpaceModal/vidishSpaceDark.webp',
    facts: {
        role: 'Design + Engineering',
        timeline: '2025 — present',
        status: 'live',
        team: 'Solo',
        platform: 'Web (SPA)',
    },
    tldr: [
        'Hand-built portfolio — no template, no CMS; the site itself is the demo.',
        'Three full seasonal themes with a GPU-composited weather engine (leaves, rain, snow, lightning).',
        'Self-hosted with a fail-loud CI/CD pipeline and isolated dev/prod environments.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: `Every developer portfolio looks the same: a template, a hero line, a grid of cards. For someone selling **full-stack craft**, that's a missed opportunity — the portfolio is the one project where the visitor experiences your work instead of reading about it.

The brief I set myself: build a site that *demonstrates* rather than *lists* — with real engineering constraints (60 fps, fast first paint, accessibility) so the personality never costs credibility.`,
                },
            ],
        },
        {
            title: 'The solution',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '🍂', title: 'Three seasonal worlds', body: 'Summer, monsoon, winter — each a complete theme: palette, hero art, backgrounds, and live weather. Persisted and shareable via ?season=winter.'},
                        {icon: '⛈️', title: 'A real-time weather engine', body: 'Fluttering leaves, slanted rain with splash collisions and lightning, depth-layered snow — all GPU-composited.'},
                        {icon: '📖', title: 'Deep-linkable project pages', body: 'Full-page case studies (like this one) with section navigation, browser-back support, and shareable URLs.'},
                        {icon: '🚀', title: 'Its own delivery pipeline', body: 'Self-hosted, two environments, auto-deploy on push — the site ships itself.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/projects/vidish-space/hero-summer.webp',
                    pending: true,
                    capture: 'Full hero section in SUMMER with leaves mid-fall — include the season picker.',
                    caption: 'The hero in summer — switch seasons up top and every pixel of this site changes with you.',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'text',
                    md: 'Three decisions shaped the architecture more than any framework choice:',
                },
                {
                    type: 'decision',
                    decision: 'One typed season config drives every visual decision',
                    why: 'Palettes, backgrounds, hero art, card colors, and particle behavior all flow from a single source of truth — no component hardcodes a color twice, and adding a fourth season is config, not a rewrite.',
                    tradeoff: 'Every new component must be themed against all three seasons up front — slower to add, impossible to drift.',
                },
                {
                    type: 'decision',
                    decision: 'Animation budget: transform/opacity keyframes only, no per-frame JS',
                    why: 'The browser composites the entire weather show on the GPU — 30+ concurrent particles hold 60 fps even on mobile.',
                    tradeoff: 'Complex motion (a leaf’s pendulum flutter) must be expressed as keyframe waypoints instead of a physics loop — more authoring effort, dramatically cheaper runtime.',
                },
                {
                    type: 'decision',
                    decision: 'Client-rendered SPA with hash-based deep links',
                    why: 'Simple to ship and host; project pages are still shareable and back-button friendly via the History API.',
                    tradeoff: 'Individual projects aren’t separately indexable by search engines yet — real routes with prerendering are the planned next iteration.',
                },
            ],
        },
        {
            title: 'Hard problems',
            blocks: [
                {
                    type: 'challenge',
                    problem: 'Falling leaves in a straight line look like a screensaver from 2003 — but real physics simulation costs CPU the site can’t spare.',
                    approach: 'Encoded realism into keyframes: randomized pendulum sway waypoints, 3D tumble via rotateX/rotateY with perspective, and fast "slip" segments between slow flutters — plus a shared wind layer and cursor-following spring so the whole field reacts to you.',
                    result: 'Leaves that flutter, tumble, and lean toward your mouse — at 60 fps with zero per-frame JavaScript.',
                },
                {
                    type: 'challenge',
                    problem: 'Rain needs splashes where drops actually land, but tracking 40+ drops per frame in React would thrash the render loop.',
                    approach: 'One shared collision loop (not one per drop) reads CSS transforms at a throttled 30 fps outside React, spawning splash particles imperatively only when a drop crosses the ground line.',
                    result: 'Physically-plausible splashes and random lightning, with the collision check as the only per-frame code on the entire site.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/vidish-space/weather-monsoon.webp',
                    pending: true,
                    capture: 'Hero in MONSOON mid-rain — bonus points if you catch the lightning flash (20-45s cycle).',
                    caption: 'The monsoon world — slanted rain, splash collisions, and the occasional lightning strike.',
                },
                {
                    type: 'challenge',
                    problem: 'The deploy pipeline once reported green while silently shipping stale code — the worst kind of failure.',
                    approach: 'Rebuilt it fail-loud: fast-forward-only pulls, set -euo pipefail, build-before-docroot-swap, and an isolated noindex dev environment for previewing every change before production.',
                    result: 'A push is either fully live in ~1 minute or fails visibly — never silently wrong. This page went through that pipeline.',
                },
            ],
        },
        {
            title: 'Results',
            blocks: [
                {
                    type: 'callout',
                    label: 'The receipt',
                    text: 'Everything described above is running in the tab you have open — switch seasons, wait for the lightning, resize the window, turn on reduced-motion. The site is the proof.',
                },
                {
                    type: 'text',
                    md: `Performance held the bar: every section code-split and lazy-loaded, fonts preloaded with proper weights, a **4.2 MB** asset trim, rAF-throttled scroll tracking, and full \`prefers-reduced-motion\` support — the show disappears politely for users who ask.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/vidish-space/case-study.webp',
                    pending: true,
                    capture: 'This very case-study page (or the Projects grid) — the newest part of the site, meta and current.',
                    caption: 'The project case-study system — typed content blocks, facts panels, and deep links.',
                },
            ],
        },
    ],
    metrics: [
        {value: '3', label: 'full seasonal themes'},
        {value: '60 fps', label: 'GPU-composited weather'},
        {value: '4.2 MB', label: 'dead weight removed in perf pass'},
        {value: '~1 min', label: 'push → live, fail-loud CI/CD'},
    ],
    techStack: ['React 18', 'TypeScript', 'Vite 6', 'Framer Motion', 'Tailwind', 'SCSS Modules', 'Lottie', 'GitHub Actions', 'Nginx', "Let's Encrypt", 'Oracle Cloud'],
    links: {github: 'https://github.com/vidishraj/vidish.online', website: 'https://vidish.online'},
};

// ─────────────────────────────────────────────────────────────
// NEW FLAGSHIP PROJECTS — authored from rig-lead context
// (real_estate_lead: bead vs-c4z · workbench_lead: bead vs-vjl)
// ─────────────────────────────────────────────────────────────

const makaan: Project = {
    id: 'makaan',
    kind: 'personal',
    featured: true,
    title: 'Makaan',
    tagline: "~300,000 live property listings from India's biggest portals, unified into one trustworthy market-intelligence dashboard — with an AI analyst on top.",
    hookMetric: {value: '~300k', label: 'listings, de-duplicated across 3 portals'},
    tags: ['TypeScript', 'Node.js', 'React', 'SQLite', 'Claude SDK'],
    image: '/assets/projects/makaan/card.webp',
    facts: {
        role: 'Creator & sole developer',
        timeline: '5-week build → actively developed',
        status: 'live',
        team: 'Solo',
        platform: 'Web',
    },
    tldr: [
        'Aggregates and de-duplicates ~300k residential listings from 99acres, MagicBricks and Housing.com across Bangalore and Kolkata.',
        'Interactive price maps, buy-vs-rent analytics, and an AI chat that grounds every answer in a live SQL query.',
        'Paste a Google Maps link, get a valuation: median-based comparables within an adaptive 1–5 km radius.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: `Researching Indian real estate means juggling three portals that overlap, disagree, and skew: "starting-from" project prices posing as listings, duplicates everywhere, localities fragmented across a dozen spellings. There is no single trustworthy view of a city's market.

So I built one — as a personal market-research project.`,
                },
            ],
        },
        {
            title: 'The solution',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '🗺️', title: 'Interactive price maps', body: 'Locality-level price intelligence on themed map tiles — plus locality and builder comparisons and buy-vs-rent views.'},
                        {icon: '🧹', title: 'One canonical dataset', body: 'Three portals normalized to a single schema with stable-id dedup: ~300k listings, zero duplicate IDs.'},
                        {icon: '🤖', title: 'AI market analyst', body: 'Natural-language market Q&A where every number comes from a live SQL query — streamed, and never fabricated.'},
                        {icon: '🏷️', title: 'Value My Property', body: 'Paste a Google Maps link or address → estimated sale price and expected rent from nearby comparable listings.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/projects/makaan/map.webp',
                    alt: 'Makaan map view of Bangalore: 163K listings across 499 localities plotted as colour-coded price dots, with per-source counts and 2,37,358 of 2,45,682 listings geolocated',
                    caption: 'The map — 163K Bangalore listings across 499 localities, colour-coded by price, with every source counted. 2,37,358 of 2,45,682 listings geolocated.',
                },
            ],
        },
        {
            title: 'Search the whole market at once',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"Show me every 3-BHK apartment under ₹2 Cr in the city — from all three portals, no duplicates."*

One search across everything: buy or rent, BHK, property type, furnishing, and price band, with live per-source counts so you can see exactly where a result came from. The header does the arithmetic for you — matching listings, average price, median ₹/sqft — before you've opened a single one.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/makaan/search.webp',
                    alt: 'Makaan search: filters for buy/rent, BHK, type, furnishing and price, per-source counts (99acres 27,759 · magicbricks 70,568 · housing 49,653), and 1,39,262 matching listings with avg ₹2.79 Cr and median ₹10,760/sqft',
                    caption: 'Search — 1,39,262 matches across three sources in one result table, each row tagged to the portal it came from.',
                },
            ],
        },
        {
            title: 'Where the portals disagree',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"Is this locality actually expensive, or is one portal skewing it?"*

The Places view puts the three portals' median prices side by side for 407 localities and sorts by the **gap between them** — which turns the dataset's messiness into a feature. A +496% disagreement isn't noise to hide; it's the single most useful thing a buyer can know before trusting any one site's number.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/makaan/places.webp',
                    alt: 'Places view titled "Where the portals disagree": 407 localities with 99acres, magicbricks and housing medians side by side, sorted by source gap, with value ranges',
                    caption: '"Where the portals disagree" — per-locality medians from each source, ranked by gap. The disagreement is the insight.',
                },
            ],
        },
        {
            title: 'The shape of the market',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"What does this city actually sell — and what's normal?"*

Prices gives the structural view over 1,00,475 buy listings: mean and median (they differ, deliberately — medians resist "starting-from" outliers), the full price distribution by band, the BHK mix with median per configuration, and a ranked spread from the most affordable to the most expensive localities by ₹/sqft.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/makaan/prices.webp',
                    alt: 'Prices view: mean ₹2.60 Cr, median ₹2.01 Cr, median ₹11,519/sqft; price distribution by band; BHK mix with 3 BHK dominant at 42,751 listings; affordable-to-expensive locality ranking',
                    caption: 'Price structure — distribution, BHK mix (3 BHK dominates at 42,751 listings), and the affordable↔expensive locality ladder.',
                },
            ],
        },
        {
            title: 'Value My Property & the analyst',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"What's this specific flat worth — to buy, and to rent out?"*

Paste a Google Maps link or an address. Makaan finds comparable listings within an adaptive 1–5 km radius and returns a median-based sale estimate and expected rent with a confidence band — add details (BHK, area, floor) to sharpen it.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/makaan/valuation.webp',
                    alt: 'Value My Property: "What\'s it worth?" — paste a Google Maps link or type an address to get an expected sale price and rent grounded in nearby listings',
                    caption: '"What\'s it worth?" — a Google Maps link in, a grounded sale-and-rent estimate out.',
                },
                {
                    type: 'text',
                    md: `And when the question doesn't fit a filter — *"plotted gated-community land in Kolkata, preferably new launches?"* — the **AI analyst** answers with tables of real projects, localities, listing counts and price ranges, every figure pulled from a live SQL query. It also says what it *can't* certify (launch dates the data doesn't carry) instead of making something up.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/makaan/chat.webp',
                    alt: 'Makaan AI chat answering a question about plotted gated-community land in Kolkata with tables of projects, localities, listing counts and price ranges, and an explicit note about what the data cannot certify',
                    caption: 'The analyst — real projects, counts and price ranges from the database, plus an honest "here\'s what I can\'t certify."',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'text',
                    md: 'A TypeScript/Node pipeline — scrapers → normalizer → analysis → REST API — around a WAL-mode SQLite store, with a Vite + React dashboard and a Claude-powered agent, all on one pm2-managed VM behind nginx.',
                },
                {
                    type: 'decision',
                    decision: 'Single-box SQLite (WAL) instead of a hosted warehouse',
                    why: 'Simplest possible operations for a one-machine research lab: fast local reads, zero infra overhead, trivially backed up.',
                    tradeoff: 'Vertical scaling only — and the database eventually earned its own block volume as it grew.',
                },
                {
                    type: 'decision',
                    decision: 'Three messy sources, one canonical schema with stable-id upserts',
                    why: 'The portals overlap and disagree; a single schema plus deduplication is what turns three feeds into one dataset you can trust.',
                    tradeoff: 'Heavy per-source normalization — locality naming, free-text property types, and coordinate quality all needed dedicated handling.',
                },
                {
                    type: 'decision',
                    decision: 'The AI analyst must ground every number in a live SQL query',
                    why: 'A market analyst that fabricates prices is worse than none. Tool-use forces every figure in a chat answer to come from the data.',
                    tradeoff: 'Slower than freeform generation — token streaming keeps the experience feeling immediate.',
                },
            ],
        },
        {
            title: 'Hard problems',
            blocks: [
                {
                    type: 'challenge',
                    problem: 'Each portal caps how many results any search can return — so naive collection silently misses most of the market.',
                    approach: 'Built an exhaustive slicing strategy over the portals’ public data channels — locality → price band → BHK → property type — so complete coverage comes from many small, well-formed queries with polite pacing, not brute force.',
                    result: 'One source’s coverage went ~32k → ~72k listings; another city grew ~5× to its true unique ceiling.',
                },
                {
                    type: 'challenge',
                    problem: 'Exhaustively crawling thousands of locality slices per city ran for days.',
                    approach: 'A category-level saturation detector stops crawling once net-new-unique rows plateau — with big-inventory localities crawled first, so the plateau only trips after real inventory is captured.',
                    result: 'Multi-day crawls now finish in hours, with wasted requests eliminated.',
                },
                {
                    type: 'challenge',
                    problem: '"Starting-from" project prices, placeholder coordinates, and fragmented locality names made naive averages meaningless.',
                    approach: 'A dedicated data-quality layer: median/percentile statistics instead of means, sane-value bounds, coordinate validation, locality normalization, and per-unit vs project-aggregate separation.',
                    result: 'Grounded medians and real comparables — 96–98% valid coordinates, 90–100% of listings carrying prices.',
                },
            ],
        },
        {
            title: 'Results',
            blocks: [
                {
                    type: 'callout',
                    label: 'The dataset',
                    text: '~300,000 de-duplicated listings across Bangalore and Kolkata, refreshed daily (~27k updates in a recent week) — queryable by map, chart, or plain English. Built solo in about five weeks.',
                },
            ],
        },
    ],
    metrics: [
        {value: '~300k', label: 'listings across 3 portals'},
        {value: '0', label: 'duplicate listing IDs'},
        {value: '96–98%', label: 'valid coordinates'},
        {value: '~5 wks', label: 'solo build — ~197 commits, ~14.5k LOC'},
    ],
    techStack: ['TypeScript', 'Node.js', 'SQLite (WAL)', 'React', 'Vite', 'react-leaflet', 'Claude Agent SDK', 'Commander CLI', 'pm2', 'Nginx', 'Oracle Cloud'],
    links: {website: 'https://makaan.vidish.online'},
};

const satteNights: Project = {
    id: 'satte-nights',
    kind: 'personal',
    featured: true,
    title: 'Satte Nights',
    tagline: 'A private, real-time multiplayer poker night for a group of friends — five variants, play-money chips, installable on any phone.',
    hookMetric: {value: '5', label: 'poker variants, 9-max tables'},
    tags: ['TypeScript', 'Socket.IO', 'React', 'PWA', 'SQLite'],
    image: '/assets/projects/satte-nights/card.webp',
    facts: {
        role: 'Creator & sole developer',
        timeline: 'Actively developed',
        status: 'live',
        team: 'Solo',
        platform: 'Web · installable PWA (invite-only)',
    },
    tldr: [
        'A host opens a private table with a room code; friends join from their phones and play in real time — play-money chips only, no real currency anywhere.',
        'Server-authoritative engine: your hole cards are physically absent from everyone else’s network traffic.',
        'An append-only chip ledger keeps every game zero-sum — with exact-stack rejoins and a fewest-transfers who-owes-whom-in-chips answer across game nights.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: `Poker night with friends scattered across cities needs more than a video call: the variants people actually want to play, chips that survive people dropping in and out, and a table that fits a phone screen.

Public poker apps are bloated, ad-ridden, or built around real money. This is the opposite — a **private, invite-only home game with play chips**, built for exactly one friend group.`,
                },
            ],
        },
        {
            title: 'The solution',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '🃏', title: 'Five variants, home-game rules', body: "Texas Hold'em, Omaha, Omaha Double Board, Super Hold'em, Pineapple — plus bomb pots, dealer's choice, timed sessions, and a per-action clock."},
                        {icon: '📱', title: 'Installable PWA', body: 'Full-screen from the home screen on iOS and Android; join with a room code — no app store, no sign-up funnel.'},
                        {icon: '🔄', title: 'Life-proof sessions', body: 'Rebuys, sit-out/sit-in, leave and rejoin with your exact stack; a disconnect grace window with auto-act keeps the table moving.'},
                        {icon: '🧮', title: 'Settle Up', body: 'Pick any set of past games — it computes who owes whom in chips, with the fewest transfers. Play-chip accounting, nothing more.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/projects/satte-nights/lobby.webp',
                    alt: 'Satte Nights lobby on a phone: signed in as tester, buy-in in chips, and Create table / Join with code / My Results / Settle Up',
                    caption: 'The whole lobby — set a chip buy-in, create a table or join with a code. No store, no sign-up funnel, no money.',
                },
            ],
        },
        {
            title: 'Setting up a night',
            blocks: [
                {
                    type: 'text',
                    md: `**Use case:** *"Host tonight's game exactly the way this group likes to play."*

The host picks a variant — each card shows its hole-card count and betting structure — or hands the choice to the table with **dealer's choice**, sets the blinds, and tunes the house rules: a per-action clock from 10 to 45 seconds, a session length that ends the night cleanly after the current hand, and bomb-pot cadence with its ante.`,
                },
                {
                    type: 'figure',
                    src: '/assets/projects/satte-nights/setup.webp',
                    alt: 'Game setup: five variants with hole-card counts and betting structure, single game or dealer’s choice, and blind configuration',
                    caption: 'Five variants, each labelled with its shape — 2-card NL to 4-card PL double-board — plus blinds and dealer’s choice.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/satte-nights/options.webp',
                    alt: 'Table options: action clock from 10 to 45 seconds, session length from 15 to 60 minutes, and bomb pot frequency with ante',
                    caption: 'House rules — action clock, a session that ends after the current hand, bomb pots. The knobs a real home game argues about.',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'text',
                    md: 'A TypeScript monorepo: a shared types-and-events package, an authoritative Node + Socket.IO game server with SQLite underneath (accounts, ledger, snapshots), and a React + Vite PWA client. The server is the single source of truth — clients only render what they’re told.',
                },
                {
                    type: 'decision',
                    decision: 'The server builds a different view of the table for every player',
                    why: 'Anti-cheat by construction: a seat’s hole cards are only ever serialized to that seat (or at a legitimate reveal) — dev-tools snooping finds nothing, because the data was never sent.',
                    tradeoff: 'Per-viewer serialization on every state change instead of one broadcast — more server compute, bought deliberately.',
                },
                {
                    type: 'decision',
                    decision: 'Tables live for their whole session — even with zero players seated',
                    why: 'It matches a real poker night: the room is the evening. People drift in and out, and can always rejoin the same table.',
                    tradeoff: 'The server owns timer and teardown lifecycle independent of who’s seated — careful state management, plus hand-boundary snapshots so even a server restart can’t kill the night.',
                },
                {
                    type: 'decision',
                    decision: 'Every chip movement is an append-only ledger entry',
                    why: 'Grants, buy-ins, chip-outs and hand settlements that always balance make every game provably zero-sum — and exact-stack rejoins plus cross-night settlement fall out for free.',
                    tradeoff: 'Every feature that touches chips must be expressed as balanced ledger entries — no shortcuts allowed.',
                },
            ],
        },
        {
            title: 'Hard problems',
            blocks: [
                {
                    type: 'challenge',
                    problem: 'Real-time multiplayer poker must never leak a hidden card — and a browser client is the least trustworthy renderer imaginable.',
                    approach: 'One server-side reveal rule drives the per-viewer state: cards flow only to their own seat, to showdown contenders, or on a voluntary show — including folded bluff reveals.',
                    result: 'Hole cards are physically absent from the wire unless you’re allowed to see them; every reveal path flows through a single rule.',
                },
                {
                    type: 'challenge',
                    problem: 'Chips must be conserved across chaotic join/leave/rejoin — and friends want to settle across multiple nights.',
                    approach: 'The ledger banks a leaver’s stack keyed to account + room and restores it exactly on rejoin; Settle Up aggregates nets across chosen games and computes a minimal-transfer solve (largest-surplus vs largest-deficit).',
                    result: 'Exact-stack rejoins, and a one-tap "who-owes-whom in chips, fewest transfers" answer that provably balances — because every game is zero-sum by construction.',
                },
                {
                    type: 'challenge',
                    problem: 'A 9-max table with 2–4 hole cards per variant plus a 5-card community board must never overlap on a phone screen.',
                    approach: 'A geometry-driven seat ring with seat-count-responsive scaling — pods, cards, board, and bet chips all shrink as seats fill — plus explicit z-layering so the board can never hide behind a player.',
                    result: 'Zero visual overlaps from heads-up to a packed 9-seat table, on any variant.',
                },
            ],
        },
        {
            title: 'Results',
            blocks: [
                {
                    type: 'callout',
                    label: 'Built for exactly ten people',
                    text: 'No ads, no telemetry, no real money — a private table that survives disconnects, server restarts, and real life, backed by 150+ automated server-side tests.',
                },
                {
                    type: 'text',
                    md: 'Live as an installable PWA with zero-downtime client deploys — heavy iteration ships same-day without interrupting a game in progress.',
                },
                {
                    type: 'figure',
                    src: '/assets/projects/satte-nights/table.webp',
                    alt: 'A live table: room code in the header and share bar, variant and blinds shown, session clock counting down, one seat with play chips, waiting for players',
                    caption: 'A table the moment it opens — share the room code, and the session clock is already running. (Demo room; the code expired with its session.)',
                },
            ],
        },
    ],
    metrics: [
        {value: '5', label: 'poker variants'},
        {value: '9-max', label: 'tables, overlap-free on phones'},
        {value: '150+', label: 'automated server-side tests'},
        {value: '0', label: 'real money — play chips only'},
    ],
    techStack: ['TypeScript', 'Node.js', 'Socket.IO', 'React', 'Vite', 'PWA', 'better-sqlite3', 'bcrypt', 'npm workspaces', 'Web Audio', 'systemd', 'Nginx'],
    links: {website: 'https://poker.vidish.online'},
};

// ─────────────────────────────────────────────────────────────
// CLIENT WORK — short write-ups (context → role → outcome → stack).
// NDA-safe: no product screenshots by default; logos only.
// ─────────────────────────────────────────────────────────────

const clientProjects: Project[] = [
    {
        id: 'client-socgen',
        kind: 'client',
        title: 'Regulatory data platform — monolith to cloud',
        tagline: 'Three and a half years on a global bank’s regulatory data platform: a Java 8 monolith with a JSP front-end rebuilt as Java 17 microservices on AWS, serving 1,000+ daily users on 50K+ transactions a day.',
        hookMetric: {value: '50K+', label: 'transactions daily'},
        tags: ['Java 17', 'Spring Boot', 'AWS', 'React', 'PostgreSQL'],
        client: {
            name: 'Societe Generale',
            logo: '/assets/clients/socgen_logo.svg',
            role: 'Software Engineer',
            duration: 'Jul 2022 – Feb 2026',
        },
        facts: {role: 'Software Engineer', timeline: 'Jul 2022 – Feb 2026', status: 'completed', team: 'Team of 8 · India + France', platform: 'Banking · AWS'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'A mission-critical regulatory data pipeline at a global bank — the systems that process banking data the regulator gets to see — running on an aging Java 8 monolith with a legacy JSP front-end and manual deployments. Joined straight out of university in 2022; spent the first six months maintaining the microservice chain crunching that data, then moved onto the rebuild that became the next three years: replacing the monolith with **Java 17 Spring Boot microservices on AWS** and the JSP front-end with **React + TypeScript**.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🧩', title: '5+ Spring Boot microservices', body: 'Built and maintained the Java 17 services doing the platform’s large-scale banking-data processing.'},
                        {icon: '⚛️', title: 'React + TypeScript front-end', body: 'The UI that replaced the legacy JSP application — serving 1,000+ daily users, with a 25% improvement in UI responsiveness.'},
                        {icon: '🗄️', title: 'The data layer', body: 'PostgreSQL schema design and query optimisation for transaction processing at 50K+ transactions a day — query work that also cut API response times by 15%.'},
                        {icon: '📊', title: 'Analytics pipelines', body: 'Databricks for data-processing tasks — SQL plus workflow orchestration feeding the platform’s analytics.'},
                        {icon: '🔁', title: 'CI/CD and containerisation', body: 'Jenkins pipelines, Docker images, ECS/ECR task definitions, CloudWatch debugging, Secrets Manager configuration — deployment time down 20% and the delivery path documented.'},
                        {icon: '🤝', title: 'Distributed delivery', body: 'Sprint delivery and architecture decisions across teams in France and India — 90% sprint-commitment completion, code reviews in a team of 8, coverage held above 70%.'},
                    ]},
                ],
            },
            {
                title: 'Engineering discipline',
                blocks: [
                    {type: 'text', md: 'The unglamorous work that makes a regulated platform operable: comprehensive structured logging rolled out across the microservices — **cutting production-issue debugging time by 30%** — SOLID-principled services using deliberate design patterns (Factory, Singleton) to keep technical debt down, and delivery documentation maintained so deployments stopped being tribal knowledge.'},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'The platform migrated from a Java 8 monolith to Java 17 microservices on AWS, serving 1,000+ daily users — carried through to pre-prod on a fully containerised delivery pipeline, with a React front-end in place of the JSP legacy and deployment time down 20%.'},
                ],
            },
        ],
        metrics: [
            {value: '50K+', label: 'transactions processed daily'},
            {value: '1,000+', label: 'daily users on the front-end'},
            {value: '3.5 yrs', label: 'on the platform · team of 8'},
        ],
        techStack: ['Java 17', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Databricks', 'AWS ECS/ECR', 'RDS', 'Secrets Manager', 'CloudWatch', 'Docker', 'Jenkins'],
    },
    {
        id: 'client-movo',
        kind: 'client',
        title: 'AI pipelines & CRM integrations',
        tagline: 'SMS/email AI pipelines, a vector-DB knowledge base, and Salesforce/LeagueApps integrations for a sports-ops platform.',
        hookMetric: {value: '84', label: 'commits in 3 months'},
        tags: ['Node.js', 'LangChain', 'Vector DB', 'Salesforce'],
        client: {
            name: 'Movo',
            logo: '/assets/clients/movoai_logo.png',
            role: 'Full-Stack Developer',
            duration: 'Dec 2025 – Mar 2026',
        },
        facts: {role: 'Full-Stack Developer', timeline: 'Dec 2025 – Mar 2026', status: 'completed', platform: 'SaaS · AI'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'A sports-operations platform that needed intelligent handling of inbound SMS/email and tighter integration with the CRMs its customers already used.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🤖', title: 'SMS/email AI pipelines', body: 'Plus a vector database with a knowledge base for intelligent query handling.'},
                        {icon: '🔗', title: 'CRM integrations', body: 'LeagueApps and Salesforce wired in for seamless data sync.'},
                        {icon: '📊', title: 'Insights engine & lead scoring v2', body: 'With multi-location support.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: '84 commits across backend (55 merged PRs) and frontend in a 3-month engagement — AI features and CRM integrations shipped to production.'},
                ],
            },
        ],
        techStack: ['Node.js', 'React', 'LangChain', 'Vector DB', 'Salesforce API', 'LeagueApps API'],
    },
    {
        id: 'client-raheee',
        kind: 'client',
        title: 'Mobile app — attribution, parity & pipeline',
        tagline: 'Ongoing frontend-led engagement on a Capacitor + React mobile app: ad-attribution rebuilt natively, Android brought to iOS parity, and an automated App Store pipeline.',
        hookMetric: {value: '−40%', label: 'Android bundle size'},
        tags: ['React', 'Capacitor', 'TypeScript', 'iOS/Android'],
        client: {
            name: 'Raheee',
            logo: '/assets/clients/rahee_logo.avif',
            role: 'Frontend Lead (freelance)',
            duration: 'Ongoing · 2026 —',
        },
        facts: {role: 'Frontend Lead (freelance)', timeline: 'Ongoing · 2026 —', status: 'in-development', platform: 'Mobile (Capacitor 7, iOS + Android)'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'What began as a two-week rescue sprint (security hardening, TypeScript migration, and a major app-size reduction) grew into an ongoing, frontend-led engagement on a Capacitor 7 + React mobile app shipping in native iOS and Android shells — 110+ hours in June–July 2026 alone.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '📈', title: 'Ad-attribution rebuilt natively', body: 'A custom Capacitor bridge for Meta attribution — Android Install Referrer, iOS App Tracking Transparency, and app events wired end-to-end.'},
                        {icon: '🤖', title: 'Android parity with iOS', body: 'R8 minification, resource shrinking, theme/edge-to-edge fixes, back-button handling, verified App Links — a ~40% smaller bundle and faster cold start.'},
                        {icon: '🚢', title: 'Release pipeline', body: 'Replaced flaky hosted CI with a reliable Xcode-archive → TestFlight pipeline and automated App Store review submission.'},
                        {icon: '💬', title: 'Streamed conversational booking UI', body: 'An SSE-streamed, backend-driven booking flow rendered as a typed widget system, shipped behind a feature flag.'},
                        {icon: '🧹', title: 'The original rescue sprint', body: 'Security hardening, TypeScript migration, reels-style video player rewrite, and a dramatic app-size reduction.'},
                    ]},
                ],
            },
            {
                title: 'Hard problems',
                blocks: [
                    {
                        type: 'challenge',
                        problem: 'The Meta Ads dashboard showed ~0 attributed installs despite 50+ real installs a day — product events never reached the Meta SDK at all.',
                        approach: 'Diagnosed the missing native layers (Android Install Referrer + advertising-ID provider; iOS App Tracking Transparency + AEM lifecycle) and built a small native Capacitor bridge exposing standard and custom app events to the JS layer.',
                        result: 'Install and custom-event attribution restored end-to-end on both platforms.',
                    },
                    {
                        type: 'challenge',
                        problem: 'A bloated, crash-prone Android build lagged far behind the iOS experience.',
                        approach: 'R8 minification with resource shrinking and keep-rules, status-bar/edge-to-edge and theme fixes, hardware back-button handling, and native config hardening (permissions, network security, verified App Links).',
                        result: 'A ~40% smaller Android app bundle, faster cold start, and behavioral parity with iOS.',
                    },
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'An engagement that earned its own extension: from rescue sprint to ongoing frontend ownership — shipping continuously through TestFlight and app-store review with an automated submission pipeline.'},
                    {type: 'text', md: '[rahee.ai](https://rahee.ai)'},
                ],
            },
        ],
        techStack: ['React', 'TypeScript', 'Capacitor 7', 'iOS (Xcode)', 'Android (R8)', 'Meta SDK', 'SSE', 'TestFlight', 'CI/CD'],
        links: {website: 'https://rahee.ai'},
    },
    {
        id: 'client-soultalk',
        kind: 'client',
        title: 'LLM wellness platform — solo, to the App Store',
        tagline: 'Sole developer of an LLM-backed wellness platform: FastAPI backend, React Native iOS app, and infra — shipped to the Apple App Store.',
        hookMetric: {value: '808', label: 'commits, solo, 4 repos'},
        tags: ['FastAPI', 'React Native', 'Redis', 'AWS', 'LLM'],
        client: {
            name: 'SoulTalk',
            logo: '/assets/clients/soultalk_logo.svg',
            role: 'Sole Developer',
            duration: 'Beta May 2026 → App Store Aug 2026',
        },
        facts: {role: 'Sole Developer', timeline: 'Beta May 2026 → App Store Aug 2026', status: 'live', team: 'Solo', platform: 'iOS + Web'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'An early-stage wellness startup that needed a full product — iOS app, backend, marketing site, and infrastructure — with a single engineer owning all of it, from blank repo to the App Store.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🐍', title: 'Async Python backend (~32k LOC)', body: 'FastAPI + SQLAlchemy 2.0 + Pydantic v2, PostgreSQL on AWS RDS, S3, and a durable Redis-backed job queue.'},
                        {icon: '📱', title: 'React Native iOS app', body: 'Expo-based app with real-time streaming AI over WebSockets, push notifications, delivered via TestFlight to the App Store.'},
                        {icon: '🔒', title: 'Privacy engineering', body: 'GDPR/CCPA data export and hard-delete erasure built in from the start.'},
                        {icon: '⚙️', title: 'All the infrastructure', body: 'Docker, GitHub Actions CI/CD, migration deploys with auto-rollback, monitoring, backups, rate-limiting.'},
                    ]},
                ],
            },
            {
                title: 'Hard problems',
                blocks: [
                    {
                        type: 'challenge',
                        problem: 'LLM responses take seconds, a journaling UX must feel instant — and token cost scales with every user.',
                        approach: 'Streamed model output to the client over a WebSocket relay with mid-stream error recovery; deferred and parallelized heavier post-processing so the primary response renders first; cached stable prompt prefixes.',
                        result: '~30-50% lower input-token cost and ~0.5-1.5s faster time-to-first-token; long-form reports render in ~10-12s without blocking the UI.',
                    },
                    {
                        type: 'challenge',
                        problem: 'Each entry fans out to async AI jobs — crashes and retries caused duplicate processing or silently-dropped work, and plaintext in job args would break privacy guarantees.',
                        approach: 'Durable Redis-backed queue with per-generation idempotency keys, a recovery sweep with a retry ceiling, worker-liveness gating in deploys — and jobs carry only record IDs, never content, so erasure stays enforceable at the database.',
                        result: 'No duplicate AI runs, no silent drops, and GDPR-clean job arguments.',
                    },
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'Live on the Apple App Store (US + Canada) — ~808 commits across 4 repos as the sole developer, from blank repo to public launch in about six months, and still shipping.'},
                    {type: 'text', md: '[Marketing site](https://soultalkapp.com) · [On the App Store](https://apps.apple.com/app/id6759283325)'},
                ],
            },
        ],
        techStack: ['Python', 'FastAPI', 'SQLAlchemy 2.0', 'Pydantic v2', 'Redis (arq)', 'PostgreSQL (RDS)', 'AWS S3', 'React Native (Expo)', 'WebSockets', 'Docker', 'GitHub Actions', 'Nginx'],
        links: {website: 'https://soultalkapp.com'},
    },
    {
        id: 'client-cipherome',
        kind: 'client',
        title: 'Secure genomic data exchange',
        tagline: 'Custom Eclipse Dataspace Connector data plane with Keycloak IAM for sensitive genomic data.',
        hookMetric: {value: 'EDC', label: 'custom data plane'},
        tags: ['Java', 'Eclipse EDC', 'Keycloak'],
        client: {
            name: 'Cipherome',
            logo: '/assets/clients/cipherome_logo.png',
            role: 'Backend Developer',
            duration: '1 month',
        },
        facts: {role: 'Backend Developer', timeline: '1 month', status: 'completed', platform: 'Health data'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'A genomics company needing to exchange sensitive data across organisational boundaries under strict access control.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🔌', title: 'Custom EDC data plane', body: 'Implemented for the Eclipse Dataspace Connector.'},
                        {icon: '🔐', title: 'Keycloak IAM', body: 'Authentication and authorisation integrated across the connector.'},
                        {icon: '📐', title: 'Beyond-scope improvements', body: 'Architectural refinements delivered past the original brief.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'A working, IAM-secured connector for sensitive genomic data exchange — delivered in a one-month engagement.'},
                ],
            },
        ],
        techStack: ['Java', 'Eclipse EDC', 'Keycloak', 'IAM', 'REST APIs'],
    },
    {
        id: 'client-nyxidiom',
        kind: 'client',
        title: 'Embedded kiosk — Raspberry Pi × STM32',
        tagline: 'Container return/deposit kiosk: Pi ↔ STM32 over UART, QR scanning, server sync, and a hardware simulator.',
        hookMetric: {value: '71', label: 'commits, 3.5 months'},
        tags: ['Python', 'Raspberry Pi', 'UART', 'STM32'],
        client: {
            name: 'Nyxidiom',
            logo: '/assets/clients/nyxidiom_logo.webp',
            logoBg: '#1a1a2e',
            role: 'Embedded Systems Developer',
            duration: '3.5 months',
        },
        facts: {role: 'Embedded Systems Developer', timeline: '3.5 months', status: 'completed', platform: 'Embedded (Pi + STM32)'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'A physical container return/deposit kiosk requiring reliable communication between a Raspberry Pi controller and STM32 hardware.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '📡', title: 'Pi ↔ STM32 over UART', body: 'Built the Pi-side system and its hardware protocol.'},
                        {icon: '📷', title: 'QR scanning, sync, audit', body: 'Scanning, server synchronisation, and audit logging for the kiosk.'},
                        {icon: '🧪', title: 'Hardware simulator', body: 'The whole stack testable without physical devices.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'A testable, auditable embedded system — 71 commits over 3.5 months, with a simulator that decoupled software progress from hardware availability.'},
                ],
            },
        ],
        techStack: ['Python', 'Raspberry Pi', 'UART', 'STM32', 'QR Scanning', 'Embedded'],
    },
    {
        id: 'client-pwc',
        kind: 'client',
        title: 'Contract-audit automation POC',
        tagline: 'PDF-parsing contract management tool that cut hours of manual review, deployed on Windows Server.',
        hookMetric: {value: 'Hours', label: 'of manual review saved'},
        tags: ['Python', 'Flask', 'PDF Parsing'],
        client: {
            name: 'PwC India',
            logo: '/assets/clients/pwc_logo.jpeg',
            role: 'Intern',
            duration: 'Jan 2022 – May 2022',
        },
        facts: {role: 'Intern', timeline: 'Jan 2022 – May 2022', status: 'completed', platform: 'Windows Server'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'Contract auditing at a Big-4 firm relied on slow, manual PDF review and manual data entry. The internship brief: prove it could be automated — requirements gathered from the team doing the work, solutions demonstrated back to the stakeholders.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🖥️', title: 'Desktop contract tool', body: 'A Python/Tkinter application built on an MVC pattern for the internal team — cutting manual data-entry time by 15%.'},
                        {icon: '🗄️', title: 'The data layer', body: 'Database schema design with SQLAlchemy ORM over MySQL — consistent data and a 20% improvement in query response time.'},
                        {icon: '📄', title: 'PDF-parsing automation', body: 'Automated the contract-auditing workflow that had been hours of manual review.'},
                        {icon: '📦', title: 'Windows Server deployment', body: 'Shipped via IIS and Apache, working with the IT team through the compatibility issues — full lifecycle, requirements to production.'},
                        {icon: '🌱', title: 'Two proofs-of-concept', body: 'Requirements gathering, build, and stakeholder demos — plus Git, Jira, and collaborative development: where the professional habits started.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'Two proof-of-concept projects carried from requirements to Windows Server deployment — contract auditing automated, manual data entry down 15%, and a first full pass through the professional development lifecycle.'},
                ],
            },
        ],
        techStack: ['Python', 'Tkinter', 'Flask', 'SQLAlchemy', 'MySQL', 'PDF Parsing', 'Windows Server', 'IIS', 'Apache'],
    },
];

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────

// Vidish.Online leads — it's the flagship (and the visitor is standing in it).
export const personalProjects: Project[] = [
    unitedMajdoors,
    vidishSpace,
    makaan,
    satteNights,
    akkountant,
    tripsplit,
];

export {clientProjects};

/** All projects, personal first, featured first within each group. */
export const allProjects: Project[] = [
    ...[...personalProjects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    ...clientProjects,
];
