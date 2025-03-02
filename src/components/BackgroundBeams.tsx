"use client";
import {cn} from "../utils/utils";
import {AnimatePresence, motion} from "framer-motion";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";

export const BackgroundBeamsWithCollision = ({
                                                 children,
                                                 className,
                                                 lightMode,
                                                 beamSpeed = 1,
                                                 beamCount = 50,
                                             }: {
    children: React.ReactNode;
    className?: string;
    lightMode: boolean;
    beamSpeed?: number; // Beam speed (1-8)
    beamCount?: number; // Beam quantity
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const windowSizeRef = useRef(typeof window !== 'undefined' ? window.outerWidth : 1000);
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [windowWidth, setWindowWidth] = useState(windowSizeRef.current);

    // Handle window resize with improved memory management
    useEffect(() => {
        const handleResize = () => {
            windowSizeRef.current = window.outerWidth;

            // Clear any existing timeout to prevent memory leaks
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
                resizeTimeoutRef.current = null;
            }

            // Set new timeout and store reference
            resizeTimeoutRef.current = setTimeout(() => {
                setWindowWidth(windowSizeRef.current);
                resizeTimeoutRef.current = null;
            }, 200);
        };

        window.addEventListener('resize', handleResize);

        // Proper cleanup to prevent memory leaks
        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
                resizeTimeoutRef.current = null;
            }
        };
    }, []);

    // Calculate speed factor based on beamSpeed (1-8)
    const speedFactor = useMemo(() => {
        return 2 - ((beamSpeed - 1) * 0.25);
    }, [beamSpeed]);

    // Memoize beam calculations with windowWidth dependency
    // Limit beam count based on device capacity
    const adaptedBeamCount = useMemo(() => {
        // Reduce beam count on smaller screens to save memory
        return window.innerWidth < 768 ? Math.min(30, beamCount) : beamCount;
    }, [beamCount]);

    // Generate raindrops with varying sizes - now much larger
    const raindrops = useMemo(() => {
        return Array.from({length: adaptedBeamCount}, () => {
            const randomPosition = Math.random();

            // Randomize raindrop properties
            const isSmall = Math.random() > 0.7; // 30% chance for smaller raindrops
            const isVerySmall = Math.random() > 0.9; // 10% chance for very small raindrops
            const isLarge = Math.random() > 0.8; // 20% chance for extra large raindrops

            // Set raindrop dimensions based on screen size and random factors
            // Significantly increased all sizes
            let dropWidth, dropHeight, dropOpacity;

            if (isLarge) {
                dropWidth = window.innerWidth < 480 ? 12 : 22;
                dropHeight = window.innerWidth < 480 ? 20 : 38;
                dropOpacity = 0.85 + Math.random() * 0.15;
            } else if (isVerySmall) {
                dropWidth = window.innerWidth < 480 ? 5 : 10;
                dropHeight = window.innerWidth < 480 ? 10 : 18;
                dropOpacity = 0.7 + Math.random() * 0.2;
            } else if (isSmall) {
                dropWidth = window.innerWidth < 480 ? 8 : 15;
                dropHeight = window.innerWidth < 480 ? 15 : 25;
                dropOpacity = 0.75 + Math.random() * 0.2;
            } else {
                dropWidth = window.innerWidth < 480 ? 10 : 18;
                dropHeight = window.innerWidth < 480 ? 18 : 32;
                dropOpacity = 0.8 + Math.random() * 0.2;
            }

            // Calculate fall speed based on size (larger drops fall faster)
            const baseSpeed = (Math.random() * 2 + 6) * speedFactor;
            const speedModifier = isSmall ? 0.9 : (isVerySmall ? 0.8 : (isLarge ? 1.3 : 1.1));

            return {
                initialX: randomPosition * windowWidth,
                translateX: (randomPosition * windowWidth) + (Math.random() * 10 - 5), // Add slight horizontal variation
                duration: baseSpeed * speedModifier,
                repeatDelay: Math.random() * 1.5 + 0.5,
                delay: Math.random() * 2,
                width: dropWidth,
                height: dropHeight,
                opacity: dropOpacity,
                blur: isSmall ? '0.5px' : (isVerySmall ? '0px' : '1px'),
            };
        });
    }, [windowWidth, adaptedBeamCount, speedFactor]);

    return (
        <div
            ref={parentRef}
            className={cn(
                "h-96 md:h-[40rem] from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
                className
            )}
        >
            {raindrops.map((raindrop, index) => (
                <RaindropCollision
                    key={`raindrop-${index}-${windowWidth}-${beamSpeed}`}
                    raindropOptions={raindrop}
                    containerRef={containerRef}
                    parentRef={parentRef}
                    lightMode={lightMode}
                />
            ))}
            {children}
            <div
                ref={containerRef}
                className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
                style={{
                    boxShadow:
                        "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                }}
            />
        </div>
    );
};

// Renamed to RaindropCollision to better reflect the new appearance
const RaindropCollision = React.memo(
    React.forwardRef<
        HTMLDivElement,
        {
            containerRef: React.RefObject<HTMLDivElement | null>;
            parentRef: React.RefObject<HTMLDivElement | null>;
            raindropOptions?: {
                initialX?: number;
                translateX?: number;
                initialY?: number;
                translateY?: number;
                rotate?: number;
                duration?: number;
                delay?: number;
                repeatDelay?: number;
                width?: number;
                height?: number;
                opacity?: number;
                blur?: string;
            };
            lightMode: boolean;
        }
    >(({parentRef, containerRef, raindropOptions = {}, lightMode}) => {
        const raindropRef = useRef<HTMLDivElement>(null);
        const animationFrameRef = useRef<number | null>(null);
        const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
        const isActiveRef = useRef(true);
        const collisionCheckedRef = useRef(false);

        // Consolidated collision state
        const [collisionState, setCollisionState] = useState({
            detected: false,
            coordinates: null as { x: number; y: number } | null,
        });

        // Helper function to clear all timeouts safely
        const clearAllTimeouts = useCallback(() => {
            timeoutsRef.current.forEach(timeout => {
                clearTimeout(timeout);
            });
            timeoutsRef.current = [];
        }, []);

        // Helper function to safely add a new timeout
        const safeSetTimeout = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
            const timeoutId = setTimeout(() => {
                // Remove this timeout from our tracking array when it completes
                timeoutsRef.current = timeoutsRef.current.filter(id => id !== timeoutId);
                callback();
            }, delay);

            // Add to our tracking array
            timeoutsRef.current.push(timeoutId);
            return timeoutId;
        }, []);

        // Memoize the checkCollision function
        const checkCollision = useCallback(() => {
            if (collisionCheckedRef.current) return false;

            if (raindropRef.current && containerRef.current && parentRef.current) {
                const raindropRect = raindropRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                const parentRect = parentRef.current.getBoundingClientRect();

                if (raindropRect.bottom >= containerRect.top) {
                    const relativeX = raindropRect.left - parentRect.left + raindropRect.width / 2;
                    const relativeY = raindropRect.bottom - parentRect.top;

                    setCollisionState({
                        detected: true,
                        coordinates: {x: relativeX, y: relativeY},
                    });

                    collisionCheckedRef.current = true;
                    return true;
                }
            }
            return false;
        }, [containerRef, parentRef]);

        // Optimized RAF for collision detection
        useEffect(() => {
            isActiveRef.current = true;

            // Only run collision detection every n milliseconds for performance
            let lastCheckTime = 0;
            const checkInterval = 50; // ms between checks

            const animate = (timestamp: number) => {
                if (!isActiveRef.current || collisionCheckedRef.current) return;

                // Throttle collision checks
                if (timestamp - lastCheckTime > checkInterval) {
                    lastCheckTime = timestamp;
                    const hasCollision = checkCollision();
                    if (hasCollision) return;
                }

                if (isActiveRef.current) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);

            // Comprehensive cleanup
            return () => {
                isActiveRef.current = false;

                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }

                clearAllTimeouts();
            };
        }, [checkCollision, clearAllTimeouts]);

        // Handle collision state
        useEffect(() => {
            if (collisionState.detected) {
                // Use our safe setTimeout helper
                safeSetTimeout(() => {
                    setCollisionState({
                        detected: false,
                        coordinates: null,
                    });

                    safeSetTimeout(() => {
                        collisionCheckedRef.current = false;
                    }, 100);
                }, 1000); // Reduce splash duration for raindrops
            }

            // No cleanup needed here since clearAllTimeouts is called in the animation effect cleanup
        }, [collisionState.detected, safeSetTimeout]);

        // Cleanup on unmount
        useEffect(() => {
            return () => {
                isActiveRef.current = false;

                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }

                clearAllTimeouts();
            };
        }, [clearAllTimeouts]);

        // Define the colors based on lightMode - making them more vibrant
        const dropGradient = lightMode
            ? "linear-gradient(to bottom, rgba(255, 140, 50, 0.4), rgba(255, 80, 10, 0.95))" // More intense fiery orange for light mode
            : "linear-gradient(to bottom, rgba(60, 180, 255, 0.5), rgba(140, 230, 255, 0.95))"; // Brighter blue for dark mode

        const dropShadow = lightMode
            ? "0 0 6px rgba(255, 140, 30, 0.8)" // Stronger orange glow for light mode
            : "0 0 6px rgba(120, 230, 255, 0.8)"; // Stronger blue glow for dark mode

        return (
            <>
                <motion.div
                    ref={raindropRef}
                    initial={{
                        translateY: raindropOptions.initialY || "-200px",
                        translateX: raindropOptions.initialX || "0px",
                        rotate: raindropOptions.rotate || 0,
                    }}
                    animate={{
                        translateY: raindropOptions.translateY || "1800px",
                        translateX: raindropOptions.translateX || "0px",
                        rotate: raindropOptions.rotate || 0,
                    }}
                    transition={{
                        duration: raindropOptions.duration || 8,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: raindropOptions.delay || 0,
                        repeatDelay: raindropOptions.repeatDelay || 0,
                    }}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "20px",
                        width: `${raindropOptions.width || 18}px`,
                        height: `${raindropOptions.height || 32}px`,
                        background: dropGradient,
                        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", // Teardrop shape
                        opacity: raindropOptions.opacity || 0.9,
                        filter: `blur(${raindropOptions.blur || '0.5px'})`,
                        boxShadow: dropShadow
                    }}
                />
                <AnimatePresence>
                    {collisionState.detected && collisionState.coordinates && (
                        <WaterSplash
                            style={{
                                left: `${collisionState.coordinates.x}px`,
                                top: `${collisionState.coordinates.y}px`,
                                transform: "translate(-50%, -50%)",
                            }}
                            lightMode={lightMode}
                            smallScreen={window.innerWidth < 768}
                            dropSize={raindropOptions.width || 18}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    })
);

RaindropCollision.displayName = "RaindropCollision";

// Renamed to WaterSplash for the raindrop theme
const WaterSplash = React.memo(({
                                    lightMode,
                                    smallScreen = false,
                                    dropSize = 18,
                                    ...props
                                }: React.HTMLProps<HTMLDivElement> & {
    lightMode: boolean,
    smallScreen?: boolean,
    dropSize?: number
}) => {
    // Scale splash size based on drop size
    const splashScale = useMemo(() => {
        return dropSize / 8; // Base scaling on default size of 8px
    }, [dropSize]);

    // Determine particle count based on device capabilities and drop size
    const particleCount = useMemo(() => {
        const baseCount = smallScreen ? 8 : 16;
        return Math.max(6, Math.round(baseCount * splashScale * 0.7));
    }, [smallScreen, splashScale]);

    // Define splash colors based on mode - make more vivid
    const splashColor = lightMode
        ? "rgba(255, 100, 20, 0.9)" // More vivid fiery orange for light mode
        : "rgba(100, 210, 255, 0.95)"; // Brighter blue for dark mode

    // Generate splash particles with memoization
    const splashParticles = useMemo(() =>
            Array.from({length: particleCount}, (_, index) => {
                // Create a radial pattern - particles spread out in all directions
                const angle = (index / particleCount) * Math.PI * 2;
                const distance = Math.random() * 22 * splashScale + 8; // Increased splash distance

                return {
                    id: index,
                    directionX: Math.cos(angle) * distance * (smallScreen ? 0.7 : 1),
                    directionY: Math.sin(angle) * distance * (smallScreen ? 0.7 : 1) - 8, // More upward bias
                    duration: Math.random() * 0.7 + 0.4, // Slightly longer animation
                    scale: Math.random() * 0.6 + 0.6, // Larger particle sizes
                };
            }),
        [particleCount, smallScreen, splashScale]
    );

    return (
        <div {...props} className={cn("absolute z-50", props.className)}>
            {/* Larger circular ripple effect */}
            <motion.div
                initial={{scale: 0, opacity: 0.9}}
                animate={{scale: 3 * splashScale, opacity: 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.8, ease: "easeOut"}}
                style={{
                    position: "absolute",
                    width: smallScreen ? "12px" : "16px", // Larger ripple
                    height: smallScreen ? "3px" : "4px",
                    borderRadius: "50%",
                    background: splashColor,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Larger splash particles */}
            {splashParticles.map((particle) => (
                <motion.span
                    key={particle.id}
                    initial={{x: 0, y: 0, opacity: 0.9, scale: 0}}
                    animate={{
                        x: particle.directionX,
                        y: particle.directionY,
                        opacity: 0,
                        scale: particle.scale,
                    }}
                    transition={{
                        duration: particle.duration,
                        ease: "easeOut"
                    }}
                    style={{
                        position: "absolute",
                        width: smallScreen ? "3px" : "5px", // Larger particles
                        height: smallScreen ? "3px" : "5px",
                        borderRadius: "50%",
                        background: splashColor,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}
        </div>
    );
});

WaterSplash.displayName = "WaterSplash";

export default WaterSplash;