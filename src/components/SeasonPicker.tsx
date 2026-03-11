import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Season, nextSeason} from '../utils/seasonConfig';

interface SeasonPickerProps {
    currentSeason: Season;
    onSeasonChange: (season: Season) => void;
    className?: string;
}

const seasonIcons: Record<Season, {icon: string; label: string; color: string}> = {
    summer: {icon: '☀️', label: 'Summer', color: '#f0c989'},
    monsoon: {icon: '🌧️', label: 'Monsoon', color: '#5b9bd5'},
    winter: {icon: '❄️', label: 'Winter', color: '#93c5fd'},
};

const SeasonPicker: React.FC<SeasonPickerProps> = ({
    currentSeason,
    onSeasonChange,
    className = '',
}) => {
    const [size, setSize] = useState({width: 160, height: 38});

    useEffect(() => {
        const updateSize = () => {
            const vw = window.innerWidth;
            if (vw < 480) setSize({width: 130, height: 32});
            else if (vw <= 768) setSize({width: 145, height: 35});
            else setSize({width: 160, height: 38});
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const seasons: Season[] = ['summer', 'monsoon', 'winter'];
    const activeIndex = seasons.indexOf(currentSeason);
    const segmentWidth = size.width / 3;
    const knobPad = 3;
    const knobWidth = segmentWidth - knobPad * 2;
    const knobHeight = size.height - knobPad * 2;

    const handleClick = () => {
        onSeasonChange(nextSeason(currentSeason));
    };

    const handleSegmentClick = (season: Season) => {
        if (season !== currentSeason) {
            onSeasonChange(season);
        }
    };

    const info = seasonIcons[currentSeason];
    const trackBg = currentSeason === 'monsoon'
        ? 'rgba(30, 42, 54, 0.9)'
        : currentSeason === 'winter'
            ? 'rgba(30, 40, 60, 0.75)'
            : 'rgba(60, 40, 20, 0.65)';

    const knobBg = currentSeason === 'monsoon'
        ? 'rgba(91, 155, 213, 0.35)'
        : currentSeason === 'winter'
            ? 'rgba(147, 197, 253, 0.4)'
            : 'rgba(240, 201, 137, 0.55)';

    return (
        <div className={`flex flex-col items-center gap-1.5 ${className}`}>
            <button
                className="relative outline-none focus:ring-0 focus:outline-none cursor-pointer"
                style={{
                    width: size.width,
                    height: size.height,
                    borderRadius: '999px',
                    background: trackBg,
                    border: `1px solid ${info.color}60`,
                    padding: 0,
                    backdropFilter: 'blur(8px)',
                }}
                onClick={handleClick}
                role="radiogroup"
                aria-label="Season picker"
                type="button"
            >
                {/* Sliding knob */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: knobWidth,
                        height: knobHeight,
                        top: knobPad,
                        background: knobBg,
                        border: `1px solid ${info.color}50`,
                    }}
                    initial={false}
                    animate={{
                        x: knobPad + activeIndex * segmentWidth,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 28,
                    }}
                />

                {/* Season segments */}
                <div className="relative flex h-full" style={{zIndex: 1}}>
                    {seasons.map((s) => {
                        const isActive = s === currentSeason;
                        return (
                            <button
                                key={s}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSegmentClick(s);
                                }}
                                className="flex-1 flex items-center justify-center cursor-pointer bg-transparent border-none outline-none focus:outline-none focus:ring-0"
                                style={{height: '100%', padding: 0}}
                                role="radio"
                                aria-checked={isActive}
                                aria-label={seasonIcons[s].label}
                                type="button"
                            >
                                <motion.span
                                    style={{fontSize: size.height * 0.5, lineHeight: 1}}
                                    animate={{
                                        scale: isActive ? 1.15 : 0.85,
                                        opacity: isActive ? 1 : 0.5,
                                    }}
                                    transition={{type: 'spring', stiffness: 300, damping: 20}}
                                >
                                    {seasonIcons[s].icon}
                                </motion.span>
                            </button>
                        );
                    })}
                </div>
            </button>

            {/* Season label */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentSeason}
                    initial={{opacity: 0, y: 4}}
                    animate={{opacity: 0.7, y: 0}}
                    exit={{opacity: 0, y: -4}}
                    transition={{duration: 0.2}}
                    style={{
                        fontSize: '0.65rem',
                        fontFamily: "'Zain', sans-serif",
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: info.color,
                        fontWeight: 600,
                    }}
                >
                    {info.label}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export default SeasonPicker;
