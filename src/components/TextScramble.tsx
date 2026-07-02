import {useEffect, useRef, useState, useCallback} from 'react';
import styles from './TextScramble.module.scss';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';
const SCRAMBLE_DURATION = 1000; // ms

export const TextScramble = ({text}: { text: string }) => {
    const [displayedText, setDisplayedText] = useState(text);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const animationRunning = useRef(false);
    const rafRef = useRef<number | null>(null);
    const animationCompletedRef = useRef(false);

    const cancelAnimation = () => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        animationRunning.current = false;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                // If component becomes invisible, ensure animation can restart when visible again
                if (!entry.isIntersecting) {
                    cancelAnimation();

                    // Only reset if animation didn't complete
                    if (!animationCompletedRef.current) {
                        setDisplayedText(text);
                    }
                }
            },
            {threshold: 0.1}
        );

        if (elementRef.current) observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, [text]);

    const runScrambleAnimation = useCallback(() => {
        // Don't run if already running or animation has been completed
        if (animationRunning.current || animationCompletedRef.current) return;
        animationRunning.current = true;

        const originalText = text.split('');
        let startTime: number | null = null;

        setDisplayedText(
            originalText.map((char) => (char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])).join('')
        );

        const tick = (now: number) => {
            if (startTime === null) startTime = now;
            const progress = Math.min((now - startTime) / SCRAMBLE_DURATION, 1);

            setDisplayedText(
                originalText
                    .map((char, index) => (char === ' ' ? ' ' : index / originalText.length < progress ? char : CHARS[Math.floor(Math.random() * CHARS.length)]))
                    .join('')
            );

            if (progress >= 1) {
                rafRef.current = null;
                animationRunning.current = false;
                animationCompletedRef.current = true;
                setDisplayedText(text);
                return;
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
    }, [text]);

    // Reset animation state when text changes
    useEffect(() => {
        animationCompletedRef.current = false;
        setDisplayedText(text);
    }, [text]);

    useEffect(() => {
        if (isVisible) runScrambleAnimation();
        return () => {
            cancelAnimation();
        };
    }, [isVisible, text, runScrambleAnimation]);

    return (
        <div ref={elementRef} className={styles.scramble}>
            {displayedText}
        </div>
    );
};
