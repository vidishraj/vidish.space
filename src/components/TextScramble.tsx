import {useEffect, useRef, useState} from 'react';
import styles from './TextScramble.module.scss';

export const TextScramble = ({text}: { text: string }) => {
    const [displayedText, setDisplayedText] = useState(text);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);
    const animationRunning = useRef(false);
    const intervalRef = useRef(null);
    const animationCompletedRef = useRef(false);

    const chars = '!<>-_\\/[]{}—=+*^?#________';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                // If component becomes invisible, ensure animation can restart when visible again
                if (!entry.isIntersecting) {
                    // Clear any running animation
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    animationRunning.current = false;

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

    const runScrambleAnimation = () => {
        // Don't run if already running or animation has been completed
        if (animationRunning.current || animationCompletedRef.current) return;
        animationRunning.current = true;

        let frameCount = 0;
        const totalFrames = 30;
        const originalText = text.split('');

        setDisplayedText(
            originalText.map((char) => (char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])).join('')
        );

        // @ts-expect-error- It'll be defined, no worries
        intervalRef.current = setInterval(() => {
            frameCount++;
            const progress = frameCount / totalFrames;

            setDisplayedText(
                originalText
                    .map((char, index) => (char === ' ' ? ' ' : index / originalText.length < progress ? char : chars[Math.floor(Math.random() * chars.length)]))
                    .join('')
            );

            if (frameCount >= totalFrames) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                animationRunning.current = false;
                animationCompletedRef.current = true;
                setDisplayedText(text);
            }
        }, 33);
    };

    // Reset animation state when text changes
    useEffect(() => {
        animationCompletedRef.current = false;
        setDisplayedText(text);
    }, [text]);

    useEffect(() => {
        if (isVisible) runScrambleAnimation();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isVisible, text]);

    return (
        <div ref={elementRef} className={styles.scramble}>
            {displayedText}
        </div>
    );
};