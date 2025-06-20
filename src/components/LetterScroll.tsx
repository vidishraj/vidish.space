import {useEffect, useRef, useState} from "react";
import {useAnimationFrame} from "framer-motion";
import styles from './LetterScroll.module.scss';
import { useThemeContext } from '../App';

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
    // Create a position value to animate
    const [position, setPosition] = useState(0);
    const directionFactor = direction === 'left' ? -1 : 1;
    const speed = baseVelocity * directionFactor;
    const { isDarkMode } = useThemeContext();
    // Container and content measurement references
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    // Track content width and repetitions needed
    const [contentWidth, setContentWidth] = useState(0);
    const [repeats, setRepeats] = useState(10);

    // Measure single content item width
    useEffect(() => {
        const measureContent = () => {
            if (innerRef.current) {
                // Get content width from a single item
                const width = innerRef.current.offsetWidth;
                setContentWidth(width);

                // Calculate how many repeats we need
                if (containerRef.current) {
                    const containerWidth = containerRef.current.offsetWidth;
                    // Add extra copies to ensure no empty space
                    const needed = Math.ceil((containerWidth * 3) / width) + 2;
                    setRepeats(needed);
                }
            }
        };

        // Measure on mount and resize
        measureContent();
        window.addEventListener('resize', measureContent);

        return () => window.removeEventListener('resize', measureContent);
    }, [children]);

    // Animation frame for smooth continuous motion
    useAnimationFrame((_, delta) => {
        if (contentWidth === 0) return;

        // Calculate new position with delta time for smooth animation
        const moveBy = speed * (delta / 1000);
        let newPosition = position + moveBy;

        // Wrap around logic for seamless looping
        // If moving left and past the boundary, reset position
        if (direction === 'left' && newPosition < -contentWidth) {
            newPosition = 0;
        }
        // If moving right and past the boundary, reset position
        else if (direction === 'right' && newPosition > 0) {
            newPosition = -contentWidth;
        }

        setPosition(newPosition);
    });


    return (
        <div
            ref={containerRef}
            className={styles.parallaxContainer}
            style={{
                background: isDarkMode ? '#161f27' : '#f5f5f5',
                color: isDarkMode ? '#ffffff' : '#000000'
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
                {/* First reference element to measure width */}
                <div
                    ref={innerRef}
                    className={styles.textItem}
                >
                    {children}
                </div>

                {/* Additional copies to ensure continuous scrolling */}
                {Array.from({length: repeats}).map((_, index) => (
                    <div
                        key={index}
                        className={styles.textItem}
                    >
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ParallaxText;