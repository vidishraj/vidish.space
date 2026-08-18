/**
 * Single source of truth for the Projects section's visual tokens.
 * Every project component (grid, cards, pages, blocks, primitives) derives
 * its colors from here — one slate/blue system across light and dark.
 *
 * Rationale for the split accents:
 *  - `accent`     draws non-text emphasis (eyebrows, borders, icons)
 *  - `accentText` is the higher-contrast variant for text/links on the page bg
 */
export interface ProjectTheme {
    /** 1px separator/border color */
    hairline: string;
    /** Translucent panel (facts, TL;DR, feature rows, stat tiles) */
    panelBg: string;
    /** Solid elevated surface (grid cards) */
    surface: string;
    /** Behind letterboxed media */
    mediaBg: string;
    textPrimary: string;
    textBody: string;
    textMuted: string;
    accent: string;
    accentText: string;
    /** Soft accent wash (callouts, active nav pill) */
    accentSoftBg: string;
    /** Neutral chip (tech tags) */
    chipBg: string;
    chipText: string;
    /** Success emphasis (challenge results) */
    success: string;
    successSoftBg: string;
    /** Warm accent — the "client work" family (badges, client eyebrows) */
    accentWarmText: string;
    accentWarmSoftBg: string;
    accentWarmBorder: string;
}

const DARK: ProjectTheme = {
    hairline: 'rgba(255,255,255,0.10)',
    panelBg: 'rgba(255,255,255,0.04)',
    surface: '#1e293b',
    mediaBg: '#0b1220',
    textPrimary: '#f1f5f9',
    textBody: '#cbd5e1',
    textMuted: '#94a3b8',
    accent: '#60a5fa',
    accentText: '#93c5fd',
    accentSoftBg: 'rgba(96,165,250,0.12)',
    chipBg: 'rgba(148,163,184,0.12)',
    chipText: '#cbd5e1',
    success: '#34d399',
    successSoftBg: 'rgba(52,211,153,0.08)',
    accentWarmText: '#fcd34d',
    accentWarmSoftBg: 'rgba(251,191,36,0.14)',
    accentWarmBorder: 'rgba(251,191,36,0.35)',
};

const LIGHT: ProjectTheme = {
    hairline: 'rgba(15,23,42,0.08)',
    panelBg: 'rgba(255,255,255,0.7)',
    surface: '#ffffff',
    mediaBg: '#f8fafc',
    textPrimary: '#0f172a',
    textBody: '#334155',
    textMuted: '#64748b',
    accent: '#2563eb',
    accentText: '#1d4ed8',
    accentSoftBg: 'rgba(37,99,235,0.08)',
    chipBg: 'rgba(15,23,42,0.05)',
    chipText: '#334155',
    success: '#059669',
    successSoftBg: 'rgba(16,185,129,0.07)',
    accentWarmText: '#b45309',
    accentWarmSoftBg: 'rgba(217,119,6,0.10)',
    accentWarmBorder: 'rgba(217,119,6,0.30)',
};

export const projectTheme = (isDark: boolean): ProjectTheme => (isDark ? DARK : LIGHT);
