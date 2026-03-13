import {useState, useEffect, useMemo} from 'react';
import {
    Season,
    getInitialSeason,
    persistSeason,
    seasonPalettes,
    seasonParticleMode,
    seasonBackgrounds,
    seasonHeroImages,
} from './seasonConfig';

export const useSeason = () => {
    const [season, setSeasonState] = useState<Season>(getInitialSeason);

    const setSeason = (newSeason: Season) => {
        setSeasonState(newSeason);
        persistSeason(newSeason);
    };

    useEffect(() => {
        const handleUrlChange = () => {
            const newSeason = getInitialSeason();
            setSeasonState(newSeason);
        };
        window.addEventListener('popstate', handleUrlChange);
        return () => window.removeEventListener('popstate', handleUrlChange);
    }, []);

    const palette = useMemo(() => seasonPalettes[season], [season]);
    const particleMode = useMemo(() => seasonParticleMode[season], [season]);
    const backgrounds = useMemo(() => seasonBackgrounds[season], [season]);
    const heroImages = useMemo(() => seasonHeroImages[season], [season]);

    const isMonsoon = season === 'monsoon';
    const isSummer = season === 'summer';
    const isWinter = season === 'winter';

    return {
        season,
        setSeason,
        palette,
        particleMode,
        backgrounds,
        heroImages,
        isMonsoon,
        isSummer,
        isWinter,
    };
};
