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

const vidishSpace: Project = {
    id: 'vidish-space',
    kind: 'personal',
    title: 'Vidish.Online',
    tagline: 'This site — a seasonal, weather-animated portfolio built for performance and personality.',
    hookMetric: {value: '3', label: 'seasonal themes'},
    tags: ['React 18', 'TypeScript', 'Framer Motion', 'Vite'],
    image: '/assets/vidishSpaceModal/vidishSpaceDark.webp',
    // Drop the "Coming Soon" placeholder tab from the legacy JSON
    sections: vidishSpaceInfo.sections.filter(s => !/coming soon/i.test(s.title)),
    metrics: [
        {value: '3', label: 'seasons: summer · monsoon · winter'},
        {value: '4.2 MB', label: 'assets trimmed in perf pass'},
        {value: 'GPU', label: 'composited weather particles'},
    ],
    techStack: ['React 18', 'TypeScript', 'Vite 6', 'Framer Motion', 'Tailwind', 'SCSS Modules', 'Lottie', 'GitHub Actions', 'Nginx'],
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
        sections: [
            {
                title: 'Context',
                description: '<p>A mission-critical regulatory data pipeline at a global bank, running on an aging Java 8 monolith with a legacy JSP front-end and manual deployments.</p>',
            },
            {
                title: 'My role',
                description: '<ul><li>Built and maintained <strong>5+ Spring Boot microservices</strong> handling large-scale banking data processing.</li><li>Developed the new <strong>React + TypeScript</strong> front-end that replaced the JSP application.</li><li>Set up CI/CD with Jenkins, containerised services with Docker, deployed via <strong>AWS ECS/ECR</strong>.</li><li>Worked directly with cross-functional French teams on architecture and sprint delivery.</li></ul>',
            },
            {
                title: 'Outcome',
                description: '<p>Platform migrated to Java 17 microservices on AWS, serving <strong>1,000+ users</strong>, carried through to the pre-prod phase with a modern, containerised delivery pipeline.</p>',
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
        sections: [
            {
                title: 'Context',
                description: '<p>A sports-operations platform that needed intelligent handling of inbound SMS/email and tighter integration with the CRMs its customers already used.</p>',
            },
            {
                title: 'My role',
                description: '<ul><li>Built <strong>SMS/email AI pipelines</strong> and a vector database with a knowledge base for intelligent query handling.</li><li>Integrated <strong>LeagueApps and Salesforce</strong> CRMs for seamless data sync.</li><li>Developed an insights engine and <strong>lead scoring v2</strong> with multi-location support.</li></ul>',
            },
            {
                title: 'Outcome',
                description: '<p><strong>84 commits</strong> across backend (55 merged PRs) and frontend in a 3-month engagement — AI features and CRM integrations shipped to production.</p>',
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
        sections: [
            {
                title: 'Context',
                description: '<p>A Capacitor + React mobile app that had grown to 154 MB with security gaps, an untyped codebase, and a video experience that needed a rethink.</p>',
            },
            {
                title: 'My role',
                description: '<ul><li>Refactored the app end-to-end — <strong>security hardening</strong>, TypeScript migration, architecture overhaul.</li><li>Rewrote the video player as a <strong>reels-style feed</strong>.</li><li>Set up the deployment pipeline for streamlined releases.</li></ul>',
            },
            {
                title: 'Outcome',
                description: '<p>App size cut from <strong>154 MB to 20 MB</strong>, with a hardened, typed codebase and a repeatable release pipeline — delivered in a single two-week sprint.</p>',
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
        sections: [
            {
                title: 'Context',
                description: '<p>An early-stage wellness startup that needed a full product — mobile app, backend, and web presence — with a single engineer owning all of it.</p>',
            },
            {
                title: 'My role',
                description: '<ul><li>Built the platform <strong>end-to-end</strong>: Node/Express backend, React Native mobile app, and landing website.</li><li>Designed and implemented <strong>AI-powered wellness features</strong> with conversational interfaces.</li><li>Owned infrastructure — Docker, CI/CD, cloud deployment — plus architecture, testing, and releases.</li></ul>',
            },
            {
                title: 'Outcome',
                description: '<p><strong>216 commits</strong> over 6 months as the sole developer; a complete, deployed product from a blank repo.</p>',
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
        sections: [
            {
                title: 'Context',
                description: '<p>A genomics company needing to exchange sensitive data across organisational boundaries under strict access control.</p>',
            },
            {
                title: 'My role',
                description: '<ul><li>Implemented a <strong>custom data plane</strong> for the Eclipse Dataspace Connector (EDC).</li><li>Integrated <strong>Keycloak IAM</strong> for authentication and authorisation across the connector.</li><li>Delivered architectural improvements beyond the original scope.</li></ul>',
            },
            {
                title: 'Outcome',
                description: '<p>A working, IAM-secured connector for genomic data exchange, delivered in a one-month engagement.</p>',
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
        sections: [
            {
                title: 'Context',
                description: '<p>A physical container return/deposit kiosk requiring reliable communication between a Raspberry Pi controller and STM32 hardware.</p>',
            },
            {
                title: 'My role',
                description: '<ul><li>Built the Pi-side system communicating with the <strong>STM32 via UART</strong>.</li><li>Implemented <strong>QR scanning</strong>, server sync, and audit logging.</li><li>Developed a <strong>hardware simulator</strong> so the stack could be tested without physical devices.</li></ul>',
            },
            {
                title: 'Outcome',
                description: '<p>A testable, auditable embedded system — <strong>71 commits</strong> over 3.5 months, including a simulator that decoupled software progress from hardware availability.</p>',
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
        sections: [
            {
                title: 'Context',
                description: '<p>Contract auditing at a Big-4 firm relied on slow, manual PDF review.</p>',
            },
            {
                title: 'My role',
                description: '<ul><li>Built a proof-of-concept contract management tool — <strong>Tkinter GUI + Flask backend</strong>.</li><li>Implemented <strong>PDF parsing</strong> to automate auditing workflows.</li><li>Deployed on Windows Server via uWSGI + IIS.</li></ul>',
            },
            {
                title: 'Outcome',
                description: '<p>A deployed POC that automated contract auditing and saved hours of manual review.</p>',
            },
        ],
        techStack: ['Python', 'Flask', 'Tkinter', 'PDF Parsing', 'Windows Server', 'uWSGI', 'IIS'],
    },
];

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────

export const personalProjects: Project[] = [
    ...newProjectPlaceholders,
    akkountant,
    tripsplit,
    vidishSpace,
    leetcodeToGit,
];

export {clientProjects};

/** All projects, personal first, featured first within each group. */
export const allProjects: Project[] = [
    ...[...personalProjects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    ...clientProjects,
];
