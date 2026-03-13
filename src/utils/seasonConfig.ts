export type Season = 'summer' | 'monsoon' | 'winter';

export const SEASON_STORAGE_KEY = 'portfolio-season';
export const SEASON_QUERY_PARAM = 'season';

// --- Auto-detection from real-world month ---
// Northern hemisphere Indian seasons:
// Summer: March–June, Monsoon: July–October, Winter: November–February
export const getAutoSeason = (): Season => {
    const month = new Date().getMonth(); // 0-indexed
    if (month >= 2 && month <= 5) return 'summer';
    if (month >= 6 && month <= 9) return 'monsoon';
    return 'winter';
};

export const getInitialSeason = (): Season => {
    const urlParams = new URLSearchParams(window.location.search);
    const seasonFromUrl = urlParams.get(SEASON_QUERY_PARAM) as Season | null;

    if (seasonFromUrl === 'summer' || seasonFromUrl === 'monsoon' || seasonFromUrl === 'winter') {
        localStorage.setItem(SEASON_STORAGE_KEY, seasonFromUrl);
        return seasonFromUrl;
    }

    const savedSeason = localStorage.getItem(SEASON_STORAGE_KEY) as Season | null;
    if (savedSeason === 'summer' || savedSeason === 'monsoon' || savedSeason === 'winter') {
        return savedSeason;
    }

    return getAutoSeason();
};

export const persistSeason = (season: Season) => {
    localStorage.setItem(SEASON_STORAGE_KEY, season);
    const url = new URL(window.location.href);
    url.searchParams.set(SEASON_QUERY_PARAM, season);
    window.history.replaceState({}, '', url.toString());
};

// --- Season color palettes ---
export interface SeasonPalette {
    // Page backgrounds
    pageBg: string;
    pageBgAlt: string;
    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    // Accents
    accent: string;
    accentSoft: string;
    // Cards
    cardBg: string;
    cardBorder: string;
    // Nav
    navBg: string;
    navText: string;
    // Particle colors
    particleGradient: string;
    particleShape: string;
    splashColor: string;
    // Hero section
    heroTextBg: string;
    heroIconGradient: string;
    // Timeline card colors
    timelineCards: string[];
    // Tags
    tagBg: string;
    tagColor: string;
    tagBorder: string;
    // Contact
    contactLinkBg: string;
    contactIconBg: string;
    // Loader
    loaderBg: string;
    loaderText: string;
    // Parallax text
    parallaxBg: string;
    parallaxText: string;
    // Divider
    dividerGradient: string;
    // Service card palettes
    serviceCards: Array<{
        bg: string;
        accent: string;
        tagBg: string;
        tagColor: string;
        border: string;
    }>;
    // Testimonial section
    testimonialCardBg: string;
    testimonialCardBorder: string;
    testimonialQuoteColor: string;
}

export const seasonPalettes: Record<Season, SeasonPalette> = {
    summer: {
        pageBg: '#fffbf0',
        pageBgAlt: '#f5f0e8',
        textPrimary: '#2d2418',
        textSecondary: '#1f2937',
        textMuted: '#6b5c4d',
        accent: '#d4880f',
        accentSoft: '#f0c989',
        cardBg: '#fff8ed',
        cardBorder: 'rgba(0,0,0,0.06)',
        navBg: 'rgba(255, 251, 240, 0.85)',
        navText: '#2d2418',
        particleGradient: 'linear-gradient(to bottom, rgba(200, 140, 40, 0.6), rgba(180, 80, 20, 0.9))',
        particleShape: '40% 60% 30% 70% / 50% 40% 60% 50%',
        splashColor: 'rgba(200, 140, 40, 0.8)',
        heroTextBg: 'light',
        heroIconGradient: 'linear-gradient(135deg, #f0c989, #ec9b6d)',
        timelineCards: ['#f0c989', '#f0c4a0', '#f5e0c0', '#f8edd8', '#f2e6d0'],
        tagBg: 'rgba(0,0,0,0.06)',
        tagColor: '#4a3f35',
        tagBorder: '#8b7355',
        contactLinkBg: 'whitesmoke',
        contactIconBg: 'rgba(240, 201, 137, 0.3)',
        loaderBg: '#ffffff',
        loaderText: '#2d2418',
        parallaxBg: '#f5f5f5',
        parallaxText: '#2d2418',
        dividerGradient: 'linear-gradient(90deg, transparent, #c9a97c, transparent)',
        serviceCards: [
            {bg: '#f0c989', accent: '#d4880f', tagBg: 'rgba(0,0,0,0.06)', tagColor: '#4a3f35', border: 'rgba(0,0,0,0.06)'},
            {bg: '#f0c4a0', accent: '#c97a4a', tagBg: 'rgba(0,0,0,0.06)', tagColor: '#4a3f35', border: 'rgba(0,0,0,0.06)'},
            {bg: '#e8e3dd', accent: '#8b7355', tagBg: 'rgba(0,0,0,0.06)', tagColor: '#4a3f35', border: 'rgba(0,0,0,0.06)'},
            {bg: '#c9dfd4', accent: '#5a8a7a', tagBg: 'rgba(0,0,0,0.06)', tagColor: '#4a3f35', border: 'rgba(0,0,0,0.06)'},
            {bg: '#d4c5b5', accent: '#8b7355', tagBg: 'rgba(0,0,0,0.06)', tagColor: '#4a3f35', border: 'rgba(0,0,0,0.06)'},
            {bg: '#dde0ca', accent: '#6a7a45', tagBg: 'rgba(0,0,0,0.06)', tagColor: '#4a3f35', border: 'rgba(0,0,0,0.06)'},
        ],
        testimonialCardBg: '#fff8ed',
        testimonialCardBorder: 'rgba(180, 140, 80, 0.2)',
        testimonialQuoteColor: '#d4880f',
    },
    monsoon: {
        pageBg: '#161f27',
        pageBgAlt: '#1a2430',
        textPrimary: '#e5e7eb',
        textSecondary: '#d1d5db',
        textMuted: '#9ca3af',
        accent: '#5b9bd5',
        accentSoft: '#8cbdea',
        cardBg: '#1e2a36',
        cardBorder: 'rgba(91, 155, 213, 0.15)',
        navBg: 'rgba(22, 31, 39, 0.9)',
        navText: '#e5e7eb',
        particleGradient: 'linear-gradient(to bottom, rgba(140, 200, 255, 0.3), rgba(140, 200, 255, 0.8))',
        particleShape: '50% 50% 50% 50% / 60% 60% 40% 40%',
        splashColor: 'rgba(140, 200, 255, 0.8)',
        heroTextBg: 'dark',
        heroIconGradient: 'linear-gradient(135deg, #2a3f55, #1a2a3a)',
        timelineCards: ['#161f27', '#161f27', '#161f27', '#161f27', '#161f27'],
        tagBg: 'rgba(91, 155, 213, 0.1)',
        tagColor: '#8cbdea',
        tagBorder: '#5b9bd5',
        contactLinkBg: 'rgba(30, 42, 54, 0.9)',
        contactIconBg: 'rgba(91, 155, 213, 0.15)',
        loaderBg: '#111827',
        loaderText: '#e5e7eb',
        parallaxBg: '#161f27',
        parallaxText: '#e5e7eb',
        dividerGradient: 'linear-gradient(90deg, transparent, #4b5563, transparent)',
        serviceCards: [
            {bg: '#19232e', accent: '#f0c989', tagBg: 'rgba(240, 201, 137, 0.09)', tagColor: '#f0c989', border: 'rgba(240, 201, 137, 0.19)'},
            {bg: '#1e2028', accent: '#ec9b6d', tagBg: 'rgba(236, 155, 109, 0.09)', tagColor: '#ec9b6d', border: 'rgba(236, 155, 109, 0.19)'},
            {bg: '#172029', accent: '#95d1cf', tagBg: 'rgba(149, 209, 207, 0.09)', tagColor: '#95d1cf', border: 'rgba(149, 209, 207, 0.19)'},
            {bg: '#1a1e2c', accent: '#b8a9d4', tagBg: 'rgba(184, 169, 212, 0.09)', tagColor: '#b8a9d4', border: 'rgba(184, 169, 212, 0.19)'},
            {bg: '#1c2126', accent: '#d4a87c', tagBg: 'rgba(212, 168, 124, 0.09)', tagColor: '#d4a87c', border: 'rgba(212, 168, 124, 0.19)'},
            {bg: '#1a2524', accent: '#7cc9a0', tagBg: 'rgba(124, 201, 160, 0.09)', tagColor: '#7cc9a0', border: 'rgba(124, 201, 160, 0.19)'},
        ],
        testimonialCardBg: '#19232e',
        testimonialCardBorder: 'rgba(91, 155, 213, 0.2)',
        testimonialQuoteColor: '#5b9bd5',
    },
    winter: {
        pageBg: '#f0f4f8',
        pageBgAlt: '#e8edf3',
        textPrimary: '#1e293b',
        textSecondary: '#334155',
        textMuted: '#64748b',
        accent: '#3b82c8',
        accentSoft: '#93c5fd',
        cardBg: '#f8fafc',
        cardBorder: 'rgba(59, 130, 200, 0.12)',
        navBg: 'rgba(240, 244, 248, 0.9)',
        navText: '#1e293b',
        particleGradient: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(200, 220, 255, 0.9))',
        particleShape: '50% 50% 50% 50% / 50% 50% 50% 50%',
        splashColor: 'rgba(200, 220, 255, 0.8)',
        heroTextBg: 'winter',
        heroIconGradient: 'linear-gradient(135deg, #d4e4f7, #b8cfe8)',
        timelineCards: ['#e8f0fe', '#dbe8f8', '#f0f4f8', '#d4e8f0', '#e0eaf4'],
        tagBg: 'rgba(59, 130, 200, 0.08)',
        tagColor: '#2563a0',
        tagBorder: '#3b82c8',
        contactLinkBg: 'rgba(248, 250, 252, 0.9)',
        contactIconBg: 'rgba(59, 130, 200, 0.1)',
        loaderBg: '#f0f4f8',
        loaderText: '#1e293b',
        parallaxBg: '#e8edf3',
        parallaxText: '#1e293b',
        dividerGradient: 'linear-gradient(90deg, transparent, #94a3b8, transparent)',
        serviceCards: [
            {bg: '#e8f0fe', accent: '#3b82c8', tagBg: 'rgba(59, 130, 200, 0.08)', tagColor: '#2563a0', border: 'rgba(59, 130, 200, 0.12)'},
            {bg: '#dbe8f8', accent: '#4a8ad4', tagBg: 'rgba(74, 138, 212, 0.08)', tagColor: '#2563a0', border: 'rgba(74, 138, 212, 0.12)'},
            {bg: '#f0f4f8', accent: '#64748b', tagBg: 'rgba(100, 116, 139, 0.08)', tagColor: '#475569', border: 'rgba(100, 116, 139, 0.12)'},
            {bg: '#e2ecf4', accent: '#6889b0', tagBg: 'rgba(104, 137, 176, 0.08)', tagColor: '#475569', border: 'rgba(104, 137, 176, 0.12)'},
            {bg: '#d4e8f0', accent: '#4a90a0', tagBg: 'rgba(74, 144, 160, 0.08)', tagColor: '#2563a0', border: 'rgba(74, 144, 160, 0.12)'},
            {bg: '#e0f0e8', accent: '#3a8a6a', tagBg: 'rgba(58, 138, 106, 0.08)', tagColor: '#2a6a50', border: 'rgba(58, 138, 106, 0.12)'},
        ],
        testimonialCardBg: '#e8f0fe',
        testimonialCardBorder: 'rgba(59, 130, 200, 0.15)',
        testimonialQuoteColor: '#3b82c8',
    },
};

// --- Background images per season per section ---
export const seasonBackgrounds: Record<Season, {
    heroTop: string;       // CSS background for hero icon container (top 50vh)
    heroBottom: string;    // CSS background for hero beams container (bottom 50vh)
    timeline: string;      // background-image URL for timeline section
    whatIDo: string;       // background-image URL for WhatIDo section
    testimonials: string;  // background-image URL for testimonials section
    projects: string;      // background-image URL for Projects section
    contact: string;       // background-image URL for Contact section
}> = {
    summer: {
        heroTop: 'linear-gradient(to bottom, #331f23, #312323, #191923, whitesmoke)',
        heroBottom: 'linear-gradient(160deg, #5f443a 0%, #7a5c3e 8%, #9a7a52 16%, #b8956a 24%, #d4ad78 32%, #e8c48a 40%, #f2d49a 48%, #f7dda8 56%, #f9e3b5 64%, #fae8c2 72%, #f8ebd0 80%, #f6eedd 88%, #f5eddd 94%, #f5eddd 100%)',
        timeline: '',   // uses CSS gradient (lighter yellows)
        whatIDo: '',  // uses warm gradient via CSS
        testimonials: '',  // uses CSS gradient
        projects: '',  // uses CSS gradient (yellow to white)
        contact: '/assets/backgrounds/contactBg.png',
    },
    monsoon: {
        heroTop: 'linear-gradient(to bottom, #3a636c, #000336, #000336, #000336)',
        heroBottom: "url('/assets/backgrounds/darkModeBg.webp') center/cover no-repeat",
        timeline: '/assets/backgrounds/darkModeBg.webp',
        whatIDo: '/assets/backgrounds/darkProjectBg.webp',
        testimonials: '/assets/backgrounds/darkProjectBg.webp',
        projects: '/assets/backgrounds/darkProjectBg.webp',
        contact: '/assets/backgrounds/darkContactBg.png',
    },
    winter: {
        heroTop: 'linear-gradient(to bottom, #e8f0f8, #dde8f2, #d4e2ee, #cddcea)',
        heroBottom: 'linear-gradient(to bottom, #cddcea, #c8d8e6, #c3d4e3, #bed0e0)',
        whatIDo: '',
        testimonials: '',
        timeline: '',
        projects: '',
        contact: '',
    },
};

// --- Hero images per season ---
export const seasonHeroImages: Record<Season, string[]> = {
    summer: ['/assets/heroPage/l1.webp', '/assets/heroPage/l2.webp', '/assets/heroPage/l3.webp', '/assets/heroPage/l4.webp'],
    monsoon: ['/assets/heroPage/lm1.webp', '/assets/heroPage/lm2.webp', '/assets/heroPage/lm3.webp', '/assets/heroPage/lm4.webp'],
    winter: ['/assets/heroPage/ln1.webp', '/assets/heroPage/ln2.webp', '/assets/heroPage/ln3.webp', '/assets/heroPage/ln4.webp'],
};

// --- Particle mode per season ---
export type ParticleMode = 'leaves' | 'rain' | 'snow';
export const seasonParticleMode: Record<Season, ParticleMode> = {
    summer: 'leaves',
    monsoon: 'rain',
    winter: 'snow',
};

// Cycle order for manual switching
const seasonOrder: Season[] = ['summer', 'monsoon', 'winter'];
export const nextSeason = (current: Season): Season => {
    const idx = seasonOrder.indexOf(current);
    return seasonOrder[(idx + 1) % seasonOrder.length];
};
