import React, {useState, useRef, useEffect, useCallback} from 'react';
import {motion, AnimatePresence, useMotionValue, useSpring, useInView} from 'framer-motion';

interface PointerHighlightProps {
    children: React.ReactNode;
    rectangleClassName?: string;
    pointerClassName?: string;
    containerClassName?: string;
    /** When true, the pointer animates automatically in a loop instead of following the cursor */
    autoAnimate?: boolean;
    /** Duration in seconds for one full loop (default: 4) */
    loopDuration?: number;
}

export const PointerHighlight: React.FC<PointerHighlightProps> = ({
    children,
    rectangleClassName = '',
    pointerClassName = '',
    containerClassName = '',
    autoAnimate = false,
    loopDuration = 4,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({width: 0, height: 0});
    const animFrameRef = useRef<number>(0);
    const isInView = useInView(containerRef, {once: false, amount: 0.5});

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, {stiffness: 200, damping: 20});
    const springY = useSpring(y, {stiffness: 200, damping: 20});

    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setDimensions({width: rect.width, height: rect.height});
        }
    }, [children]);

    const isActive = autoAnimate ? isInView : isHovered;

    // Auto-animate: move the pointer along the perimeter of the container
    const startAutoAnimate = useCallback(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const pad = 12; // padding outside the text
        const startTime = performance.now();
        const durationMs = loopDuration * 1000;

        const animate = (now: number) => {
            const elapsed = (now - startTime) % durationMs;
            const t = elapsed / durationMs; // 0 to 1

            // Trace a rounded rectangle path: top → right → bottom → left
            const perimeter = 2 * (w + 2 * pad) + 2 * (h + 2 * pad);
            const topLen = w + 2 * pad;
            const rightLen = h + 2 * pad;
            const bottomLen = w + 2 * pad;

            const dist = t * perimeter;
            let px: number, py: number;

            if (dist < topLen) {
                // Top edge: left to right
                px = -pad + dist;
                py = -pad;
            } else if (dist < topLen + rightLen) {
                // Right edge: top to bottom
                px = w + pad;
                py = -pad + (dist - topLen);
            } else if (dist < topLen + rightLen + bottomLen) {
                // Bottom edge: right to left
                px = w + pad - (dist - topLen - rightLen);
                py = h + pad;
            } else {
                // Left edge: bottom to top
                px = -pad;
                py = h + pad - (dist - topLen - rightLen - bottomLen);
            }

            x.set(px);
            y.set(py);
            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);
    }, [loopDuration, x, y]);

    useEffect(() => {
        if (autoAnimate && isInView) {
            startAutoAnimate();
        }
        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, [autoAnimate, isInView, startAutoAnimate]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (autoAnimate || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={containerRef}
            className={`relative inline-block ${containerClassName}`}
            onMouseEnter={autoAnimate ? undefined : () => setIsHovered(true)}
            onMouseLeave={autoAnimate ? undefined : () => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{cursor: autoAnimate ? 'default' : 'default'}}
        >
            {children}

            <AnimatePresence>
                {isActive && (
                    <>
                        {/* Animated rectangle border */}
                        <motion.div
                            className={`absolute inset-0 pointer-events-none ${rectangleClassName}`}
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.95}}
                            transition={{duration: 0.3, ease: 'easeOut'}}
                            style={{
                                borderRadius: '8px',
                                border: '2px solid currentColor',
                                top: '-4px',
                                left: '-8px',
                                right: '-8px',
                                bottom: '-4px',
                            }}
                        />

                        {/* Pointer icon that follows cursor / auto-animates */}
                        <motion.div
                            className={`absolute pointer-events-none z-10 ${pointerClassName}`}
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0}}
                            transition={{duration: 0.2}}
                            style={{
                                x: springX,
                                y: springY,
                                translateX: '-50%',
                                translateY: '-50%',
                                width: dimensions.width > 0 ? undefined : 'auto',
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" />
                            </svg>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PointerHighlight;
