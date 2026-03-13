import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | boolean)[]) {
    return twMerge(clsx(inputs));
}

// Re-export season system for backwards compatibility during migration
export {
    type Season,
    SEASON_STORAGE_KEY,
    SEASON_QUERY_PARAM,
    getInitialSeason,
    persistSeason,
    getAutoSeason,
    seasonPalettes,
    seasonBackgrounds,
    seasonHeroImages,
    seasonParticleMode,
    nextSeason,
} from './seasonConfig';
