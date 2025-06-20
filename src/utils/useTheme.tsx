import { useState, useEffect } from 'react';
import { Theme, getInitialTheme, setTheme as setThemeUtil } from './utils';

export const useTheme = () => {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        setThemeUtil(newTheme);
    };

    // Effect to handle URL changes
    useEffect(() => {
        const handleUrlChange = () => {
            const newTheme = getInitialTheme();
            setThemeState(newTheme);
        };

        window.addEventListener('popstate', handleUrlChange);
        return () => window.removeEventListener('popstate', handleUrlChange);
    }, []);

    return {
        theme,
        setTheme,
        isDarkMode: theme === 'dark'
    };
}; 