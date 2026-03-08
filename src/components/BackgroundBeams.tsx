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
    const [windowWidth, setWindowWidth] = useState(() => {
        return typeof window !== 'undefined' ? window.innerWidth : 1400;
    });
    const [modeKey, setModeKey] = useState(lightMode ? 'light' : 'dark'); // Add mode key to force re-render

    // Handle window resize with debouncing for performance
    useEffect(() => {
        let debounceTimeout: number;

        const handleResize = () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = window.setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 200);
        };

        // Set initial width
        setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(debounceTimeout);
        };
    }, []);

    // Reset particles when light mode changes to prevent incorrect splashes
    useEffect(() => {
        setModeKey(lightMode ? 'light' : 'dark');
    }, [lightMode]);

    // Improved speed calculation that provides smoother transitions
    // Lower values = faster animation (inverse relationship)
    const speedFactor = useMemo(() => {
        // Ensure beamSpeed is within range 1-8
        const normalizedSpeed = Math.max(1, Math.min(8, beamSpeed));

        // Create a non-linear mapping for more natural speed progression
        // At speed 1: factor = 1.4 (slower)
        // At speed 8: factor = 0.4 (faster)
        return 1.5 - (normalizedSpeed * 0.14);
    }, [beamSpeed]);

    // Optimize beam count based on device capabilities
    const adaptedBeamCount = useMemo(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 480) {
                return Math.min(20, beamCount); // More conservative for mobile
            } else if (window.innerWidth < 768) {
                return Math.min(30, beamCount);
            }
        }
        return beamCount;
    }, [beamCount]);

    // Generate particles with optimized size calculations
    const particles = useMemo(() => {
        return Array.from({length: adaptedBeamCount}, () => {
            const randomPosition = Math.random();

            // Randomize particle properties
            const isSmall = Math.random() > 0.5; // 50% chance for smaller particles
            const isVerySmall = Math.random() > 0.8; // 20% chance for very small particles

            // Set particle dimensions based on screen size to maintain proportion
            const baseScale = typeof window !== 'undefined' && window.innerWidth < 480 ? 0.7 : 1;

            let dropWidth, dropHeight, dropOpacity;

            if (isVerySmall) {
                dropWidth = 5 * baseScale;
                dropHeight = lightMode ? 8 * baseScale : 10 * baseScale; // Shorter fire particles
                dropOpacity = 0.6 + Math.random() * 0.3;
            } else if (isSmall) {
                dropWidth = 8 * baseScale;
                dropHeight = lightMode ? 12 * baseScale : 14 * baseScale;
                dropOpacity = 0.7 + Math.random() * 0.3;
            } else {
                dropWidth = 14 * baseScale;
                dropHeight = lightMode ? 20 * baseScale : 24 * baseScale;
                dropOpacity = 0.75 + Math.random() * 0.25;
            }

            // Calculate fall speed based on size and speed factor
            // Improved physics model with better size-to-speed relationship
            const sizeRatio = dropHeight / 24; // Normalize to the size of large drops

            // Apply speed factor with a more natural curve
            // In light mode (fire), particles rise slightly faster
            const baseSpeed = lightMode
                ? (3.5 + (sizeRatio * 2)) * speedFactor
                : (4 + (sizeRatio * 2.5)) * speedFactor;

            // Add slight variation to prevent uniform movement
            const speedVariation = 0.85 + (Math.random() * 0.3);
            const finalSpeed = baseSpeed * speedVariation;

            return {
                initialX: randomPosition * windowWidth,
                translateX: (randomPosition * windowWidth) + (Math.random() * 8 - 4), // Slightly more drift for large screens
                duration: finalSpeed, // Physics-based speed with variation
                repeatDelay: Math.random() * 0.6, // Reduced delay for smoother flow
                delay: Math.random() * 1, // Staggered start for natural effect
                width: dropWidth,
                height: dropHeight,
                opacity: dropOpacity,
                blur: isSmall ? '0.5px' : (isVerySmall ? '0px' : '0.7px'), // Reduced blur
            };
        });
    }, [windowWidth, adaptedBeamCount, speedFactor, lightMode]);

    return (
        <div
            ref={parentRef}
            className={cn(
                "h-[50vh] from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
                className
            )}
        >
            {particles.map((particle, index) => (
                <ParticleCollision
                    key={`particle-${index}-${windowWidth}-${modeKey}-${beamSpeed}`} // Include beamSpeed in key to force re-render
                    particleOptions={particle}
                    containerRef={containerRef}
                    parentRef={parentRef}
                    lightMode={lightMode}
                />
            ))}
            {children}
            <div
                ref={containerRef}
                className="absolute bottom-0 w-full inset-x-0 h-2 pointer-events-none"
                // Increased height to 2px for better collision detection
                style={{
                    opacity: 0,
                    background: 'transparent'
                }}
            />
        </div>
    );
};

// Optimized ParticleCollision component
const ParticleCollision = React.memo(
    ({parentRef, containerRef, particleOptions = {}, lightMode}: {
        containerRef: React.RefObject<HTMLDivElement | null>;
        parentRef: React.RefObject<HTMLDivElement | null>;
        particleOptions?: {
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
    }) => {
        const particleRef = useRef<HTMLDivElement>(null);
        const [collisionState, setCollisionState] = useState({
            detected: false,
            coordinates: null as { x: number; y: number } | null,
        });

        // Track animation phase to better manage collision timing
        const animationPhaseRef = useRef({
            active: true,
            collided: false,
            startTime: Date.now(),
            duration: (particleOptions.duration || 8) * 1000, // Convert to ms
            delay: (particleOptions.delay || 0) * 1000, // Convert to ms
        });

        const animationFrameRef = useRef<number | null>(null);

        // Reset animation tracking when component mounts or key properties change
        useEffect(() => {
            animationPhaseRef.current = {
                active: true,
                collided: false,
                startTime: Date.now(),
                duration: (particleOptions.duration || 8) * 1000,
                delay: (particleOptions.delay || 0) * 1000,
            };

            return () => {
                animationPhaseRef.current.active = false;
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [particleOptions.duration, particleOptions.delay, lightMode]);

        // Improved collision detection with better timing and accuracy
        const checkCollision = useCallback(() => {
            const {active, collided, startTime, duration, delay} = animationPhaseRef.current;

            if (!active || collided) return;
            if (!particleRef.current || !containerRef.current || !parentRef.current) return;

            const now = Date.now();
            // Don't check for collisions until delay has passed and animation is active
            if (now - startTime < delay) return;

            // Calculate animation progress as a percentage (0-1)
            const animationProgress = Math.min(1, (now - startTime - delay) / duration);

            // Only start checking for collisions in the later part of the animation
            // This prevents false positives when the particle is still high up
            if (animationProgress < 0.65) return;

            const particleRect = particleRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const parentRect = parentRef.current.getBoundingClientRect();

            // Calculate the bottom position of the container relative to the parent
            const bottomY = containerRect.top - parentRect.top + containerRect.height;

            // Check if particle has reached the collision surface
            // Add a small tolerance to ensure detection isn't missed
            if (particleRect.bottom >= containerRect.top - 2) {
                animationPhaseRef.current.collided = true;

                // Calculate position for splash effect
                const splashX = particleRect.left - parentRect.left + (particleRect.width / 2);

                setCollisionState({
                    detected: true,
                    coordinates: {x: splashX, y: bottomY}
                });

                // Reset collision state after animation completes
                const timeout = setTimeout(() => {
                    if (animationPhaseRef.current.active) {
                        setCollisionState({
                            detected: false,
                            coordinates: null
                        });
                    }
                }, 600); // Better timing matched with splash animation duration

                return () => clearTimeout(timeout);
            }
        }, [containerRef, parentRef]);

        // Set up RAF loop for collision detection with adaptive timing
        useEffect(() => {
            let lastRafTime = 0;

            const rafCallback = (time: number) => {
                if (!animationPhaseRef.current.active) return;

                // Adjust check frequency based on animation speed
                // Faster animations need more frequent checks
                const checkInterval = Math.min(33, 15 + (animationPhaseRef.current.duration / 1000 * 2));

                if (time - lastRafTime > checkInterval) {
                    lastRafTime = time;
                    checkCollision();
                }

                animationFrameRef.current = requestAnimationFrame(rafCallback);
            };

            animationFrameRef.current = requestAnimationFrame(rafCallback);

            return () => {
                animationPhaseRef.current.active = false;
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [checkCollision]);

        // Create water drop or fire particle depending on light mode
        const particleStyle = lightMode
            ? `linear-gradient(to bottom, rgba(255, 180, 60, 0.5), rgba(255, 80, 0, 0.8))`
            : `linear-gradient(to bottom, rgba(140, 200, 255, 0.3), rgba(140, 200, 255, 0.8))`;

        // Adjust particle shape for fire vs water
        const particleShape = lightMode
            ? "50% 50% 20% 80% / 60% 30% 70% 40%" // More flame-like in light mode
            : "50% 50% 50% 50% / 60% 60% 40% 40%"; // Teardrop for water in dark mode

        // Improved calculation for travel distance based on container height
        const travelDistance = typeof window !== 'undefined'
            ? Math.max(window.innerHeight * 1.2, 1000) // Increase for larger screens
            : 1800;

        return (
            <>
                <motion.div
                    ref={particleRef}
                    initial={{
                        translateY: particleOptions.initialY || "-100px",
                        translateX: particleOptions.initialX || "0px",
                    }}
                    animate={{
                        translateY: particleOptions.translateY || `${travelDistance}px`,
                        translateX: particleOptions.translateX || "0px",
                    }}
                    transition={{
                        duration: particleOptions.duration || 8,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: particleOptions.delay || 0,
                        repeatDelay: particleOptions.repeatDelay || 0,
                    }}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "20px",
                        width: `${particleOptions.width || 14}px`,
                        height: `${particleOptions.height || 24}px`,
                        background: particleStyle,
                        borderRadius: particleShape,
                        opacity: particleOptions.opacity || 0.8,
                        filter: `blur(${particleOptions.blur || '0.5px'})`,
                        willChange: "transform", // Optimization for animation performance
                    }}
                    onAnimationComplete={() => {
                        // Reset collision state at the end of each animation cycle
                        if (animationPhaseRef.current.active) {
                            animationPhaseRef.current.collided = false;
                        }
                    }}
                />
                <AnimatePresence mode="wait">
                    {collisionState.detected && collisionState.coordinates && (
                        <ParticleSplash
                            style={{
                                left: `${collisionState.coordinates.x}px`,
                                bottom: "0px", // Position at bottom
                                transform: "translate(-50%, 0)",
                            }}
                            lightMode={lightMode}
                            smallScreen={typeof window !== 'undefined' && window.innerWidth < 768}
                            particleSize={particleOptions.width || 14}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    }
);

ParticleCollision.displayName = "ParticleCollision";

// Optimized ParticleSplash component
const ParticleSplash = React.memo(({
                                       lightMode,
                                       smallScreen = false,
                                       particleSize = 14,
                                       ...props
                                   }: React.HTMLProps<HTMLDivElement> & {
    lightMode: boolean,
    smallScreen?: boolean,
    particleSize?: number
}) => {
    // Scale splash based on particleSize but limit maximum scale for performance
    const splashScale = useMemo(() => {
        return Math.min(particleSize / 10, 2.0);
    }, [particleSize]);

    // Optimize particle count based on device capabilities
    const particleCount = useMemo(() => {
        return smallScreen ? 6 : 10;
    }, [smallScreen]);

    // Set colors based on theme
    const splashColor = lightMode
        ? "rgba(255, 120, 40, 0.8)" // Orange-red for fire in light mode
        : "rgba(140, 200, 255, 0.8)"; // Blue for water in dark mode

    // Generate splash particles more efficiently
    const splashParticles = useMemo(() => {
        return Array.from({length: particleCount}, (_, index) => {
            // Create a radial pattern with physics-based properties
            const angle = (index / particleCount) * Math.PI * 2;

            // Use trigonometry for a natural splash arc
            const distance = (Math.random() * 0.5 + 0.7) * 20 * splashScale;

            return {
                id: index,
                directionX: Math.cos(angle) * distance,
                directionY: Math.sin(angle) * distance - (distance * 0.3), // Upward bias
                duration: 0.4 + (Math.random() * 0.3), // Faster for better performance
                size: smallScreen ? 2 + Math.random() * 2 : 3 + Math.random() * 3,
            };
        });
    }, [particleCount, smallScreen, splashScale]);

    return (
        <div {...props} className={cn("absolute z-10", props.className)}>
            {/* Circular ripple effect */}
            <motion.div
                initial={{scale: 0, opacity: 0.7}}
                animate={{scale: 2 * splashScale, opacity: 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.6, ease: "easeOut"}}
                style={{
                    position: "absolute",
                    width: smallScreen ? "8px" : "12px",
                    height: smallScreen ? "2px" : "3px",
                    borderRadius: "50%",
                    background: splashColor,
                    left: "50%",
                    bottom: "2px",
                    transform: "translateX(-50%)",
                    willChange: "transform, opacity", // Performance optimization
                }}
            />

            {/* Splash particles */}
            {splashParticles.map((particle) => (
                <motion.span
                    key={particle.id}
                    initial={{x: 0, y: 0, opacity: 0.8, scale: 0}}
                    animate={{
                        x: particle.directionX,
                        y: -particle.directionY, // Invert for bottom-up splash
                        opacity: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: particle.duration,
                        ease: "circOut" // More natural physics
                    }}
                    style={{
                        position: "absolute",
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        borderRadius: "50%",
                        background: splashColor,
                        left: "50%",
                        bottom: "1px",
                        transform: "translateX(-50%)",
                        willChange: "transform, opacity", // Performance optimization
                    }}
                />
            ))}
        </div>
    );
});

ParticleSplash.displayName = "ParticleSplash";

export default ParticleSplash;