import {useEffect, useRef, useState} from "react";
import {useAnimationFrame} from "framer-motion";
import styles from './LetterScroll.module.scss';
import {useThemeContext} from '../App';

interface ParallaxProps {
    children: string;
    baseVelocity?: number;
    direction?: 'left' | 'right';
}

function ParallaxText({
                          children,
                          baseVelocity = 100,
                          direction = 'left'
                      }: ParallaxProps) {
    const [position, setPosition] = useState(0);
    const directionFactor = direction === 'left' ? -1 : 1;
    const speed = baseVelocity * directionFactor;
    const {palette} = useThemeContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const [contentWidth, setContentWidth] = useState(0);
    const [repeats, setRepeats] = useState(10);

    useEffect(() => {
        let cancelled = false;

        const measureContent = () => {
            if (innerRef.current) {
                const width = innerRef.current.offsetWidth;
                setContentWidth(width);

                // Guard against width 0 (pre-layout) — dividing by it would
                // yield Infinity repeats.
                if (containerRef.current && width > 0) {
                    const containerWidth = containerRef.current.offsetWidth;
                    const needed = Math.ceil((containerWidth * 3) / width) + 2;
                    setRepeats(needed);
                }
            }
        };

        measureContent();
        // Re-measure once the web font is ready: text measured against the
        // fallback font has a different width, which skews the wrap point.
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
                if (!cancelled) measureContent();
            });
        }
        window.addEventListener('resize', measureContent);
        return () => {
            cancelled = true;
            window.removeEventListener('resize', measureContent);
        };
    }, [children]);

    useAnimationFrame((_, delta) => {
        if (contentWidth === 0) return;

        const moveBy = speed * (delta / 1000);
        let newPosition = position + moveBy;

        if (direction === 'left' && newPosition < -contentWidth) {
            newPosition = 0;
        } else if (direction === 'right' && newPosition > 0) {
            newPosition = -contentWidth;
        }

        setPosition(newPosition);
    });

    return (
        <div
            ref={containerRef}
            className={styles.parallaxContainer}
            style={{
                background: palette.parallaxBg,
                color: palette.parallaxText,
            }}
        >
            <div
                className={styles.scrollTrack}
                style={{
                    transform: `translateX(${position}px)`,
                    display: 'flex',
                    flexWrap: 'nowrap'
                }}
            >
                <div ref={innerRef} className={styles.textItem}>
                    {children}
                </div>
                {Array.from({length: repeats}).map((_, index) => (
                    <div key={index} className={styles.textItem}>
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ParallaxText;
