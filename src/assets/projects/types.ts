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

/** One tab in the deep-dive modal. `description` is markdown/HTML (sanitised on render). */
export interface ProjectSection {
    title: string;
    description: string;
    imgSrc?: string;
    /** Optional click-to-play video (Loom/YouTube share URL) shown above the description. */
    videoUrl?: string;
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
    /** Show a "featured" treatment (larger card / first position). */
    featured?: boolean;
    /** Optional per-project modal gradient. */
    gradientColors?: {color1: string; color2: string; color3: string};
}
