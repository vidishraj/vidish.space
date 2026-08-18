import type {Project} from './types';
import akkountantInfo from '../modalInfo/akkountantInfo.json';
import tripsplitInfo from '../modalInfo/tripsplitInfo.json';
import vidishSpaceInfo from '../modalInfo/vidishSpaceInfo.json';
import leetcodeToGitInfo from '../modalInfo/leetcodeToGitInfo.json';

export type {Project, ProjectKind, ProjectMetric, ProjectSection} from './types';

/** Drop empty-string link values from the legacy JSONs so no dead icons render. */
const cleanLinks = (links?: {github?: string; designDoc?: string; website?: string}) => {
    if (!links) return undefined;
    const out: {github?: string; designDoc?: string; website?: string} = {};
    if (links.github) out.github = links.github;
    if (links.designDoc) out.designDoc = links.designDoc;
    if (links.website) out.website = links.website;
    return Object.keys(out).length ? out : undefined;
};

// ─────────────────────────────────────────────────────────────
// PERSONAL PROJECTS
// Deep-dive tabs come from the existing modalInfo JSONs (rich HTML content
// authored earlier); card-level hooks/metrics/tags are defined here.
// ─────────────────────────────────────────────────────────────

const akkountant: Project = {
    id: 'akkountant',
    kind: 'personal',
    featured: true,
    title: 'Akkountant',
    tagline: 'Tracks every rupee across 6 banks and 6 investment types — automatically, from your inbox.',
    hookMetric: {value: '45k req / 5 min', label: 'price refresh cycle'},
    tags: ['Flask', 'React', 'Gmail API', 'Cron', 'Multiprocessing'],
    image: '/assets/akkountantModal/akkountant.webp',
    sections: akkountantInfo.sections,
    metrics: [
        {value: '6', label: 'bank formats parsed'},
        {value: '6', label: 'investment types tracked'},
        {value: '23', label: 'API endpoints'},
        {value: '45k+', label: 'HTTP requests per refresh, in 5 min'},
    ],
    techStack: ['Python', 'Flask', 'SQLAlchemy', 'React', 'Firebase Auth', 'Gmail API', 'Google Drive API', 'Cron', 'Multiprocessing', 'Nginx'],
    links: cleanLinks(akkountantInfo.links),
};

const tripsplit: Project = {
    id: 'tripsplit',
    kind: 'personal',
    title: 'TripSplit',
    tagline: 'Group-trip expenses, split fairly across currencies — no more "who owes whom".',
    hookMetric: {value: '3', label: 'currencies per trip'},
    tags: ['Flask', 'React', 'Firebase', 'Multi-currency'],
    image: '/assets/tripsplitModal/tripsplit.webp',
    sections: tripsplitInfo.sections,
    metrics: [
        {value: '3', label: 'currencies per trip'},
        {value: '6-char', label: 'join code'},
        {value: 'Live', label: 'settle-up balances'},
    ],
    techStack: ['Python', 'Flask', 'React', 'Firebase Auth', 'REST APIs'],
    links: cleanLinks(tripsplitInfo.links),
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
    links: cleanLinks(vidishSpaceInfo.links),
};

const leetcodeToGit: Project = {
    id: 'leetcode-to-git',
    kind: 'personal',
    title: 'LeetcodeToGit',
    tagline: 'Pushes every accepted LeetCode solution to GitHub — a versioned coding journal, zero effort.',
    hookMetric: {value: '0', label: 'manual steps per solve'},
    tags: ['Python', 'GraphQL', 'GitHub API', 'CLI'],
    image: '/assets/leetcodeToGitModal/gitLeet.webp',
    // Fix a case-mismatched image path (LG_stage1.png → Lg_stage1.png on disk)
    sections: leetcodeToGitInfo.sections.map(s => ({
        ...s,
        imgSrc: s.imgSrc === '/assets/leetcodeToGitModal/LG_stage1.png'
            ? '/assets/leetcodeToGitModal/Lg_stage1.png'
            : s.imgSrc,
    })),
    metrics: [
        {value: 'GraphQL', label: 'LeetCode API'},
        {value: 'Auto', label: 'commit per accepted solution'},
    ],
    techStack: ['Python', 'GraphQL', 'GitHub REST API', 'CLI'],
    links: cleanLinks(leetcodeToGitInfo.links),
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
        title: 'Mobile app refactor — 154 MB → 20 MB',
        tagline: 'Two-week sprint: security hardening, TypeScript migration, reels-style video player, and an 87% smaller app.',
        hookMetric: {value: '154→20 MB', label: 'app size'},
        tags: ['React', 'TypeScript', 'Capacitor', 'CI/CD'],
        client: {
            name: 'Raheee',
            logo: '/assets/clients/rahee_logo.avif',
            role: 'Full-Stack Developer',
            duration: '2-week sprint (~118 hrs)',
        },
        facts: {role: 'Full-Stack Developer', timeline: '2-week sprint (~118 hrs)', status: 'completed', platform: 'Mobile (Capacitor)'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'A Capacitor + React mobile app that had grown to 154 MB with security gaps, an untyped codebase, and a video experience that needed a rethink.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🛡️', title: 'End-to-end refactor', body: 'Security hardening, TypeScript migration, architecture overhaul.'},
                        {icon: '🎬', title: 'Reels-style video player', body: 'Complete rewrite of the video experience.'},
                        {icon: '🚀', title: 'Release pipeline', body: 'Set up the deployment pipeline for streamlined releases.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: 'App size cut from 154 MB to 20 MB — an 87% reduction — with a hardened, typed codebase, delivered in a single two-week sprint.'},
                ],
            },
        ],
        techStack: ['React', 'TypeScript', 'Capacitor', 'Mobile', 'Video Player', 'CI/CD'],
    },
    {
        id: 'client-soultalk',
        kind: 'client',
        title: 'Wellness AI platform — sole developer',
        tagline: 'Built the entire product end-to-end: Node/Express backend, React Native app, landing site, and infra.',
        hookMetric: {value: '216', label: 'commits, solo, 6 months'},
        tags: ['Node.js', 'React Native', 'Docker', 'AI'],
        client: {
            name: 'SoulTalk',
            logo: '/assets/clients/soultalk_logo.svg',
            role: 'Sole Developer',
            duration: '6 months',
        },
        facts: {role: 'Sole Developer', timeline: '6 months', status: 'completed', team: 'Solo', platform: 'Mobile + Web'},
        sections: [
            {
                title: 'Context',
                blocks: [
                    {type: 'text', md: 'An early-stage wellness startup that needed a full product — mobile app, backend, and web presence — with a single engineer owning all of it.'},
                ],
            },
            {
                title: 'My role',
                blocks: [
                    {type: 'features', items: [
                        {icon: '🏗️', title: 'The entire platform', body: 'Node/Express backend, React Native mobile app, and landing website — from a blank repo.'},
                        {icon: '🤖', title: 'AI wellness features', body: 'Designed and implemented conversational interfaces.'},
                        {icon: '⚙️', title: 'All the infrastructure', body: 'Docker, CI/CD pipelines, cloud deployment — plus architecture, testing, and releases.'},
                    ]},
                ],
            },
            {
                title: 'Outcome',
                blocks: [
                    {type: 'callout', label: 'Outcome', text: '216 commits over 6 months as the sole developer — a complete, deployed product from a blank repo.'},
                ],
            },
        ],
        techStack: ['Node.js', 'Express', 'React Native', 'React', 'Docker', 'CI/CD', 'AI/ML'],
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
