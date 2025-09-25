import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | boolean)[]) {
    return twMerge(clsx(inputs));
}

// Theme management utilities
export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEME_QUERY_PARAM = 'theme';

export type Theme = 'dark' | 'light';

export const getInitialTheme = (): Theme => {
    // First check URL query param
    const urlParams = new URLSearchParams(window.location.search);
    const themeFromUrl = urlParams.get(THEME_QUERY_PARAM) as Theme | null;
    
    if (themeFromUrl === 'dark' || themeFromUrl === 'light') {
        // Save to localStorage for future visits
        localStorage.setItem(THEME_STORAGE_KEY, themeFromUrl);
        return themeFromUrl;
    }
    
    // Then check localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }
    
    // Default to dark theme
    return 'dark';
};

export const setTheme = (theme: Theme) => {
    // Update localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // Update URL query param without page reload
    const url = new URL(window.location.href);
    url.searchParams.set(THEME_QUERY_PARAM, theme);
    window.history.replaceState({}, '', url.toString());
};