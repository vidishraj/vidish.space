/**
 * Project data model for the Projects section.
 *
 * Two kinds of entries share one grid:
 *  - `personal` projects: full deep-dive modal (tabbed sections, demo video,
 *    architecture, metrics, links)
 *  - `client`  projects: short write-up (context → role → outcome → stack),
 *    often NDA-bound so no screenshots by default
 */

export type ProjectKind = 'personal' | 'client';

/** A big-number stat shown in a StatRow (e.g. { value: '154→20 MB', label: 'app size' }). */
export interface ProjectMetric {
    value: string;
    label: string;
}

/**
 * Typed content blocks — the professional case-study layer. Each block type
 * has a distinct, consistent rendering so every project page reads as one
 * designed system instead of freeform prose.
 */
export type ContentBlock =
    /** Short prose (markdown). Keep under ~120 words. */
    | {type: 'text'; md: string}
    /** Scannable feature/contribution rows: icon + bold lead + one-liner. */
    | {type: 'features'; items: {icon?: string; title: string; body?: string}[]}
    /** Architecture Decision Record: what was chosen, why, and the cost. */
    | {type: 'decision'; decision: string; why: string; tradeoff?: string}
    /** Hard-problem card: Problem → Approach → Result. */
    | {type: 'challenge'; problem: string; approach: string; result: string}
    /** Captioned media. Captions are what separate a case study from an image dump. */
    | {type: 'figure'; src?: string; videoUrl?: string; caption?: string; alt?: string}
    /** Highlighted statement / outcome strip. */
    | {type: 'callout'; text: string; label?: string};

/**
 * One section of a project page. New content should use `blocks`;
 * `description` (markdown/HTML) is the legacy fallback and still renders.
 */
export interface ProjectSection {
    title: string;
    description?: string;
    imgSrc?: string;
    /** Optional click-to-play video (Loom/YouTube share URL) shown above the description. */
    videoUrl?: string;
    blocks?: ContentBlock[];
}

export type ProjectStatus = 'live' | 'in-development' | 'completed' | 'archived';

/** "At a glance" spec-sheet facts shown in the project-page hero. */
export interface ProjectFacts {
    role?: string;
    timeline?: string;
    status?: ProjectStatus;
    team?: string;
    platform?: string;
}

export interface ProjectLinks {
    github?: string;
    website?: string;
    designDoc?: string;
}

export interface Project {
    id: string;
    kind: ProjectKind;
    /** Card + modal title */
    title: string;
    /** One-line value proposition — outcome, not category. Shown on the card. */
    tagline: string;
    /** Single strongest number for the card hook (e.g. '45k req / 5 min'). */
    hookMetric?: ProjectMetric;
    /** Headline stack — 3-5 chips on the card. Full list can live in `techStack`. */
    tags: string[];
    /** Card image (screenshot). Optional for client work. */
    image?: string;
    /** Short muted looping video for the card (webm/mp4). Overrides image on hover. */
    cardVideo?: string;
    /** Deep-dive tabs (personal) or short sections (client). */
    sections: ProjectSection[];
    /** Stat row shown at the bottom of the modal. */
    metrics?: ProjectMetric[];
    /** Full technology list for the modal's Stack tab. */
    techStack?: string[];
    links?: ProjectLinks;
    /** Client-only extras */
    client?: {
        name: string;
        logo?: string;
        logoBg?: string;
        role: string;
        duration: string;
    };
    /** Spec-sheet facts for the "At a glance" panel. */
    facts?: ProjectFacts;
    /** 3-bullet TL;DR for skimmers, shown under the tagline. */
    tldr?: string[];
    /** Show a "featured" treatment (larger card / first position). */
    featured?: boolean;
    /** Optional per-project modal gradient. */
    gradientColors?: {color1: string; color2: string; color3: string};
}
