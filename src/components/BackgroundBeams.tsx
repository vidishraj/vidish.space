"use client";
import {cn} from "../utils/utils";
import {AnimatePresence, motion} from "framer-motion";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from "./BackgroundBeams.module.scss";

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
    beamSpeed?: number; // New prop for beam speed (1-8)
    beamCount?: number; // New prop for beam quantity
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.outerWidth : 1000
    );

    // Handle window resize with debounce
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowWidth(window.outerWidth);
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    // Calculate speed factor based on beamSpeed (1-8)
    const speedFactor = useMemo(() => {
        // Speed factor ranges from 2 (slowest) to 0.25 (fastest)
        return 2 - ((beamSpeed - 1) * 0.25);
    }, [beamSpeed]);

    // Memoize beam calculations with windowWidth dependency
    const beams = useMemo(() => {
        return Array.from({length: beamCount}, () => {
            const randomPosition = Math.random();
            return {
                initialX: randomPosition * windowWidth,
                translateX: randomPosition * windowWidth,
                // Apply speed factor to duration
                duration: (Math.random() * 3 + 5) * speedFactor,
                repeatDelay: Math.random() * 1.5 + 0.5,
                delay: Math.random() * 2,
                className: `h-${Math.floor(Math.random() * 16) + 5}`,
            };
        });
    }, [windowWidth, beamCount, speedFactor]);

    return (
        <div
            ref={parentRef}
            className={cn(
                "h-96 md:h-[40rem] from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
                className
            )}
        >
            {beams.map((beam, index) => (
                <CollisionMechanism
                    key={`beam-${index}-${windowWidth}-${beamSpeed}`}
                    beamOptions={beam}
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

// Rest of your code for CollisionMechanism and Explosion components remain the same

const CollisionMechanism = React.memo(
    React.forwardRef<
        HTMLDivElement,
        {
            containerRef: React.RefObject<HTMLDivElement | null>;
            parentRef: React.RefObject<HTMLDivElement | null>;
            beamOptions?: {
                initialX?: number;
                translateX?: number;
                initialY?: number;
                translateY?: number;
                rotate?: number;
                className?: string;
                duration?: number;
                delay?: number;
                repeatDelay?: number;
            };
            lightMode: boolean;
        }
    >(({parentRef, containerRef, beamOptions = {}, lightMode}) => {
        const beamRef = useRef<HTMLDivElement>(null);
        const animationFrameRef = useRef<number>(null);
        const collisionTimeoutRef = useRef<NodeJS.Timeout>(null);
        const beamKeyTimeoutRef = useRef<NodeJS.Timeout>(null);

        const [collision, setCollision] = useState<{
            detected: boolean;
            coordinates: { x: number; y: number } | null;
        }>({detected: false, coordinates: null});
        const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

        // Optimize collision check with RAF
        const checkCollision = useCallback(() => {
            if (!cycleCollisionDetected && beamRef.current && containerRef.current && parentRef.current) {
                const beamRect = beamRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                const parentRect = parentRef.current.getBoundingClientRect();

                if (beamRect.bottom >= containerRect.top) {
                    const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
                    const relativeY = beamRect.bottom - parentRect.top;

                    setCollision({
                        detected: true,
                        coordinates: {x: relativeX, y: relativeY},
                    });
                    setCycleCollisionDetected(true);
                    return true;
                }
            }
            return false;
        }, [containerRef, parentRef, cycleCollisionDetected]);

        // Use RAF for collision detection
        useEffect(() => {
            let isActive = true;

            const animate = () => {
                if (isActive && !cycleCollisionDetected) {
                    const hasCollision = checkCollision();
                    if (!hasCollision) {
                        animationFrameRef.current = requestAnimationFrame(animate);
                    }
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);

            return () => {
                isActive = false;
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [checkCollision, cycleCollisionDetected]);

        // Handle collision state
        useEffect(() => {
            if (collision.detected && collision.coordinates) {
                collisionTimeoutRef.current = setTimeout(() => {
                    setCollision({detected: false, coordinates: null});
                    setCycleCollisionDetected(false);
                }, 2000);

                beamKeyTimeoutRef.current = setTimeout(() => {
                    setCycleCollisionDetected(false);
                }, 2000);
            }

            return () => {
                if (collisionTimeoutRef.current) clearTimeout(collisionTimeoutRef.current);
                if (beamKeyTimeoutRef.current) clearTimeout(beamKeyTimeoutRef.current);
            };
        }, [collision]);

        return (
            <>
                <motion.div
                    ref={beamRef}
                    initial={{
                        translateY: beamOptions.initialY || "-200px",
                        translateX: beamOptions.initialX || "0px",
                        rotate: beamOptions.rotate || 0,
                    }}
                    animate={{
                        translateY: beamOptions.translateY || "1800px",
                        translateX: beamOptions.translateX || "0px",
                        rotate: beamOptions.rotate || 0,
                    }}
                    transition={{
                        duration: beamOptions.duration || 8,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: beamOptions.delay || 0,
                        repeatDelay: beamOptions.repeatDelay || 0,
                    }}
                    className={cn(
                        `absolute left-0 top-20 m-auto h-8 w-px px rounded-full bg-gradient-to-t from-yellow-500 via-red-500 to-transparent`,
                        lightMode ? styles.beamColor : styles.beamColorDark
                    )}
                    style={{
                        width: '10px',
                        borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
                    }}
                />
                <AnimatePresence>
                    {collision.detected && collision.coordinates && (
                        <Explosion
                            style={{
                                left: `${collision.coordinates.x}px`,
                                top: `${collision.coordinates.y}px`,
                                transform: "translate(-50%, -50%)",
                            }}
                            lightMode={lightMode}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    })
);

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = React.memo(({lightMode, ...props}: React.HTMLProps<HTMLDivElement> & { lightMode: boolean }) => {
    const spans = useMemo(() =>
            Array.from({length: 20}, (_, index) => ({
                id: index,
                directionX: Math.floor(Math.random() * 80 - 40),
                directionY: Math.floor(Math.random() * -50 - 10),
            })),
        []
    );

    return (
        <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1.5, ease: "easeOut"}}
                className={cn(
                    "absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent blur-sm",
                    lightMode ? styles.explosionColor : styles.explosionColorDark
                )}
            />
            {spans.map((span) => (
                <motion.span
                    key={span.id}
                    initial={{x: 0, y: 0, opacity: 1}}
                    animate={{
                        x: span.directionX,
                        y: span.directionY,
                        opacity: 0,
                    }}
                    transition={{duration: Math.random() * 1.5 + 0.5, ease: "easeOut"}}
                    className={cn(
                        "absolute h-1 w-1 rounded-full bg-gradient-to-b from-red-500 to-yellow-500",
                        lightMode ? styles.explosionColor : styles.explosionColorDark
                    )}
                />
            ))}
        </div>
    );
});

Explosion.displayName = "Explosion";

export default Explosion;