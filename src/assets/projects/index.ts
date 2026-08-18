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
    image: '/assets/akkountantModal/akkountant.webp',
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
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/akkountantModal/akkountant_transactions.png',
                    caption: 'The transactions dashboard — every entry arrived here on its own, parsed from a bank email.',
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
    tagline: 'Group-trip expenses split fairly across currencies — no spreadsheets, no "who owes whom" arguments.',
    hookMetric: {value: '3', label: 'currencies per trip'},
    tags: ['Flask', 'React', 'Firebase', 'Multi-currency'],
    image: '/assets/tripsplitModal/tripsplit.webp',
    facts: {
        role: 'Creator & sole developer',
        status: 'live',
        team: 'Solo',
        platform: 'Web',
    },
    tldr: [
        'Create a trip, share a 6-character code, and everyone logs expenses in their own currency.',
        'Real-time exchange rates convert everything automatically; balances update live.',
        'Settle-up tells each person exactly who to pay and how much — the argument is over.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: 'Group trips end one of two ways: one exhausted person playing accountant in a spreadsheet, or total amnesia about who paid for what. Add multiple currencies — the India-trip rupees, the layover euros — and even the spreadsheet person gives up.',
                },
            ],
        },
        {
            title: 'The solution',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '🎫', title: 'Trips as shareable codes', body: 'Create a trip with up to 3 currencies; friends join with a 6-character code and a join-request flow existing members approve.'},
                        {icon: '💱', title: 'Multi-currency expenses', body: 'Enter any expense in any trip currency — real-time exchange rates convert it for everyone automatically.'},
                        {icon: '⚖️', title: 'Live balances & settle-up', body: 'Who owes whom, personal (unsplit) expenses, and the exact transfers that settle the trip.'},
                        {icon: '👥', title: 'Member management', body: 'Join requests, safe removal (only when not tied to expenses), rename/delete guarded by trip state.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/tripsplitModal/tripsplit_home.png',
                    caption: 'A trip dashboard — expenses, members, and running balances in one place.',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'text',
                    md: 'A deliberately boring stack doing careful work: **Flask + SQLAlchemy** behind a **React** front-end, **Firebase** email auth, and a rates API for live conversion.',
                },
                {
                    type: 'decision',
                    decision: 'Balances are computed, never stored',
                    why: 'Storing running balances invites drift the moment an expense is edited or a member removed — recomputing from the expense ledger makes every screen self-consistent by construction.',
                    tradeoff: 'More computation per view on large trips — irrelevant at trip scale, priceless for correctness.',
                },
                {
                    type: 'decision',
                    decision: 'Currency conversion happens at entry time, at real rates',
                    why: 'Converting once, when the expense is logged, gives every member a stable view — totals don’t mysteriously shift when rates move a week later.',
                    tradeoff: 'A trip settled late uses entry-time rates rather than settlement-day rates — predictability beats precision here.',
                },
            ],
        },
        {
            title: 'Results',
            blocks: [
                {
                    type: 'callout',
                    label: 'Field-tested',
                    text: 'Built for real trips and used on them — the "who owes whom" conversation now takes exactly one screen.',
                },
            ],
        },
    ],
    metrics: [
        {value: '3', label: 'currencies per trip'},
        {value: '6-char', label: 'join code'},
        {value: 'Live', label: 'rates & settle-up balances'},
    ],
    techStack: ['Python', 'Flask', 'SQLAlchemy', 'React', 'Firebase Auth', 'REST APIs', 'Nginx'],
    links: {
        github: 'https://github.com/vidishraj/trip_split_backend',
        designDoc: 'https://github.com/vidishraj/trip_split_ui',
        website: 'https://tripsplit.vidish.online/trip',
    },
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
                    src: '/assets/vidishSpaceModal/vidishSpace_hero.png',
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
                    src: '/assets/vidishSpaceModal/vidishSpace_timeline.png',
                    caption: 'The career timeline — scroll-driven progress line, lazy-loaded Lottie scenes, themed per season.',
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

const leetcodeToGit: Project = {
    id: 'leetcode-to-git',
    kind: 'personal',
    title: 'LeetcodeToGit',
    tagline: 'Every accepted LeetCode solution, automatically committed to GitHub — a versioned coding journal with zero effort.',
    hookMetric: {value: '0', label: 'manual steps per solve'},
    tags: ['Python', 'GraphQL', 'GitHub API', 'CLI'],
    image: '/assets/leetcodeToGitModal/gitLeet.webp',
    facts: {
        role: 'Creator',
        status: 'completed',
        team: 'Solo',
        platform: 'Developer tool (CLI)',
    },
    tldr: [
        'Pulls your accepted solutions from LeetCode’s GraphQL API.',
        'Commits each one to a GitHub repo, organised by problem, with language detection.',
        'Your grind becomes a public, versioned portfolio artifact instead of dying in a browser tab.',
    ],
    sections: [
        {
            title: 'The problem',
            blocks: [
                {
                    type: 'text',
                    md: 'Hundreds of hours of LeetCode practice produce… nothing visible. Solutions live inside LeetCode’s editor, unversioned, unshareable, and invisible to anyone looking at your GitHub. The work deserves a repository.',
                },
            ],
        },
        {
            title: 'How it works',
            blocks: [
                {
                    type: 'features',
                    items: [
                        {icon: '🔍', title: 'Fetch via GraphQL', body: 'Reads your accepted submissions directly from LeetCode’s GraphQL API.'},
                        {icon: '🗂️', title: 'Organise & dedupe', body: 'One folder per problem, language-aware filenames, existing solutions skipped.'},
                        {icon: '⬆️', title: 'Commit via GitHub API', body: 'Each solution lands as a proper commit — a real contribution history from your practice.'},
                    ],
                },
                {
                    type: 'figure',
                    src: '/assets/leetcodeToGitModal/LG_remote.png',
                    caption: 'The synced repository — every accepted solution, versioned and public.',
                },
            ],
        },
        {
            title: 'Outcome',
            blocks: [
                {
                    type: 'callout',
                    label: 'Outcome',
                    text: 'A one-command bridge between practice and portfolio — the coding journal maintains itself.',
                },
            ],
        },
    ],
    metrics: [
        {value: 'GraphQL', label: 'LeetCode API'},
        {value: 'Auto', label: 'commit per accepted solution'},
    ],
    techStack: ['Python', 'GraphQL', 'GitHub REST API', 'CLI'],
    links: {github: 'https://github.com/vidishraj/LeetcodeToGit'},
};

// ─────────────────────────────────────────────────────────────
// TODO(overseer): NEW PERSONAL PROJECTS — fill in from Overseer's material.
// Each becomes a full deep-dive entry like the ones above. Suggested tabs:
// Overview → Demo (videoUrl) → Architecture (diagram imgSrc) → Hard problems
// → Stack & numbers (metrics + techStack). Delete these placeholders once
// real entries exist.
// ─────────────────────────────────────────────────────────────

const newProjectPlaceholders: Project[] = [
    // {
    //     id: 'new-project-1',
    //     kind: 'personal',
    //     featured: true,
    //     title: 'New Project 1',
    //     tagline: 'One-line outcome-first pitch.',
    //     hookMetric: {value: '—', label: 'strongest number'},
    //     tags: ['Stack', 'Chips'],
    //     image: '/assets/newProject1/hero.webp',
    //     sections: [
    //         {title: 'Overview', description: '<p>…</p>', imgSrc: '/assets/newProject1/hero.webp'},
    //         {title: 'Demo', description: '<p>60–90s walkthrough.</p>', videoUrl: 'https://www.loom.com/share/…'},
    //         {title: 'Architecture', description: '<ul><li>…</li></ul>', imgSrc: '/assets/newProject1/architecture.png'},
    //         {title: 'Hard problems', description: '<p>…</p>'},
    //     ],
    //     metrics: [{value: '—', label: '—'}],
    //     techStack: [],
    //     links: {github: '', website: ''},
    // },
];

// ─────────────────────────────────────────────────────────────
// CLIENT WORK — short write-ups (context → role → outcome → stack).
// NDA-safe: no product screenshots by default; logos only.
// ─────────────────────────────────────────────────────────────

const clientProjects: Project[] = [
    {
        id: 'client-socgen',
        kind: 'client',
        title: 'Regulatory pipeline — monolith to cloud',
        tagline: 'Migrated a mission-critical Java 8 monolith to Java 17 microservices on AWS for 1,000+ users.',
        hookMetric: {value: '3.5 yrs', label: 'platform ownership'},
        tags: ['Java 17', 'Spring Boot', 'AWS', 'React'],
        client: {
            name: 'Societe Generale',
            logo: '/assets/clients/socgen_logo.svg',
            role: 'Software Engineer',
            duration: 'Jul 2022 – Feb 2026',
        },
        facts: {role: 'Software Engineer', timeline: 'Jul 2022 – Feb 2026', status: 'completed', platform: 'Banking · AWS'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'A mission-critical regulatory data pipeline at a global bank, running on an aging Java 8 monolith with a legacy JSP front-end and manual deployments.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🧩', title: '5+ Spring Boot microservices', body: 'Built and maintained services handling large-scale banking data processing.'},
                        {icon: '⚛️', title: 'React + TypeScript front-end', body: 'Developed the platform UI that replaced the legacy JSP application.'},
                        {icon: '🔁', title: 'CI/CD and containerisation', body: 'Jenkins pipelines, Docker images, deployment via AWS ECS & ECR.'},
                        {icon: '🤝', title: 'Cross-team architecture', body: 'Worked directly with French teams on architecture decisions and sprint delivery.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'Platform migrated to Java 17 microservices on AWS, serving 1,000+ users — carried through to pre-prod with a fully containerised delivery pipeline.'},
                ],
            },
        ],
        techStack: ['Java 17', 'Spring Boot', 'React', 'TypeScript', 'AWS ECS/ECR', 'Docker', 'Jenkins', 'PostgreSQL'],
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
                    {type: 'text', md: 'Contract auditing at a Big-4 firm relied on slow, manual PDF review.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🖥️', title: 'POC contract tool', body: 'Tkinter GUI with a Flask backend.'},
                        {icon: '📄', title: 'PDF-parsing automation', body: 'Automated the contract auditing workflow.'},
                        {icon: '📦', title: 'Windows Server deployment', body: 'Shipped via uWSGI + IIS.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'A deployed proof-of-concept that automated contract auditing and saved hours of manual review.'},
                ],
            },
        ],
        techStack: ['Python', 'Flask', 'Tkinter', 'PDF Parsing', 'Windows Server', 'uWSGI', 'IIS'],
    },
];

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────

// Vidish.Online leads — it's the flagship (and the visitor is standing in it).
export const personalProjects: Project[] = [
    vidishSpace,
    ...newProjectPlaceholders,
    akkountant,
    tripsplit,
    leetcodeToGit,
];

export {clientProjects};

/** All projects, personal first, featured first within each group. */
export const allProjects: Project[] = [
    ...[...personalProjects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    ...clientProjects,
];
