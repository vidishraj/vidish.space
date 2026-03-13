import {cn} from "../utils/utils";
import {motion, useAnimation} from "framer-motion";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ParticleMode} from "../utils/seasonConfig";

interface ParticleOptions {
    positionPct: number;
    horizontalDrift: number;
    duration: number;
    repeatDelay: number;
    delay: number;
    width: number;
    height: number;
    opacity: number;
    blur: string;
    rotation: number;
    color: string;
    pathIndex: number;
}

export const BackgroundBeamsWithCollision = ({
    children,
    className,
    style,
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    particleMode?: ParticleMode;
    beamSpeed?: number;
    beamCount?: number;
}) => {
    return (
        <div
            className={cn(
                "h-[50vh] relative flex items-center w-full justify-center",
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
};

// ─── Leaf SVG paths (viewBox 0 0 100 100) ────────────────────
const LEAF_PATHS = [
    // Maple leaf
    `M50 95 L50 55
     M50 55 C45 50 30 52 20 42 C25 42 30 40 35 42 C30 35 20 30 15 18
     C22 22 28 25 35 28 C32 20 28 10 30 2 C35 10 40 20 42 28
     C45 22 48 12 50 5 C52 12 55 22 58 28 C60 20 65 10 70 2
     C72 10 68 20 65 28 C72 25 78 22 85 18 C80 30 70 35 65 42
     C70 40 75 42 80 42 C70 52 55 50 50 55Z`,
    // Simple oval leaf
    `M50 5
     C35 5 15 20 12 45
     C10 60 20 80 50 95
     C80 80 90 60 88 45
     C85 20 65 5 50 5Z
     M50 20 L50 85`,
    // Asymmetric elm leaf
    `M50 5
     C40 8 25 18 18 35
     C12 50 18 70 35 82
     C42 88 48 93 50 95
     C52 93 58 88 65 82
     C78 72 85 55 82 38
     C78 22 62 8 50 5Z
     M50 15 L50 88
     M50 35 C40 30 30 35 25 40
     M50 50 C60 45 70 48 75 55
     M50 65 C42 60 34 63 28 68`,
    // Heart-shaped linden leaf
    `M50 95 L50 50
     M50 50
     C48 45 40 35 30 30
     C18 24 8 35 10 50
     C12 65 25 78 50 50
     M50 50
     C75 78 88 65 90 50
     C92 35 82 24 70 30
     C60 35 52 45 50 50Z
     M50 55 L50 90`,
    // Oak leaf
    `M50 95 L50 50
     M50 50
     C48 45 42 40 35 42
     C28 44 22 38 20 30
     C25 32 30 30 33 35
     C30 28 25 20 22 12
     C28 15 34 18 38 25
     C38 18 38 10 42 5
     C46 8 48 15 48 22
     C50 15 52 8 55 5
     C60 8 60 18 58 25
     C64 18 70 15 75 12
     C72 20 68 28 65 35
     C68 30 72 32 78 30
     C76 38 70 44 63 42
     C56 40 52 45 50 50Z`,
];

// ─── Leaf SVG renderer ───────────────────────────────────────
const LeafSVG = React.memo(({size, color, pathIndex}: {size: number; color: string; pathIndex: number}) => {
    const path = LEAF_PATHS[pathIndex % LEAF_PATHS.length];
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{overflow: 'visible'}}>
            <path d={path} fill={color} stroke={color} strokeWidth="1" fillRule="evenodd" />
            <path d={path} fill="url(#leafShine)" fillRule="evenodd" opacity="0.15" />
            <defs>
                <linearGradient id="leafShine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
        </svg>
    );
});
LeafSVG.displayName = 'LeafSVG';

// ─── Snowflake SVG ───────────────────────────────────────────
const SnowflakeSVG = React.memo(({size, color}: {size: number; color: string}) => {
    const half = size / 2;
    const arm = half * 0.85;
    const branch = arm * 0.35;
    const branchPos = arm * 0.55;
    const sw = Math.max(size * 0.08, 0.8);
    const arms: string[] = [];
    for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        arms.push(`M${half},${half} L${half + cos * arm},${half + sin * arm}`);
        const bx = half + cos * branchPos;
        const by = half + sin * branchPos;
        arms.push(`M${bx},${by} L${bx + Math.cos(angle + Math.PI / 4) * branch},${by + Math.sin(angle + Math.PI / 4) * branch}`);
        arms.push(`M${bx},${by} L${bx + Math.cos(angle - Math.PI / 4) * branch},${by + Math.sin(angle - Math.PI / 4) * branch}`);
    }
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow: 'visible', filter: 'drop-shadow(0 0 2px rgba(100,160,210,0.5))'}}>
            <path d={arms.join(' ')} stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" opacity={0.9} />
            <circle cx={half} cy={half} r={sw} fill={color} opacity={0.8} />
        </svg>
    );
});
SnowflakeSVG.displayName = 'SnowflakeSVG';

// ─── Falling leaf / snowflake ────────────────────────────────
// Uses Framer Motion keyframes: fall → rest at bottom → fade out → loop.
// No collision detection needed. The "stacking" effect comes from many particles
// at different phases, some resting at full opacity while others are fading.
const FallingParticle = React.memo(({
    options,
    particleMode,
    travelDistance,
    snowStartYRef,
}: {
    options: ParticleOptions;
    particleMode: ParticleMode;
    travelDistance: number;
    snowStartYRef: React.MutableRefObject<number>;
}) => {
    const controls = useAnimation();
    const mountedRef = useRef(true);
    const size = Math.max(options.width, options.height);
    const isSnow = particleMode === 'snow';

    const restFraction = particleMode === 'leaves' ? 0.35 : 0.3;
    const fallEnd = 1 - restFraction;
    const restRotation = useMemo(() =>
        particleMode === 'leaves'
            ? options.rotation + (Math.random() > 0.5 ? 60 : -60)
            : options.rotation,
    [particleMode, options.rotation]);

    const runCycle = useCallback(async () => {
        if (!mountedRef.current) return;

        // Read latest snowStartY from ref — no re-render needed
        const startY = isSnow ? snowStartYRef.current : -80;
        const travel = travelDistance - (isSnow ? startY : 0);
        const effectiveDuration = isSnow ? travel / 80 : options.duration;
        const totalDuration = effectiveDuration / (1 - restFraction);

        try {
            await controls.start({
                translateY: [startY, travelDistance, travelDistance],
                translateX: [0, options.horizontalDrift, options.horizontalDrift],
                rotate: [0, options.rotation, restRotation],
                opacity: [options.opacity, options.opacity, 0],
                transition: {
                    duration: totalDuration,
                    times: [0, fallEnd, 1],
                    ease: "linear",
                },
            });
        } catch {
            return; // Animation cancelled on unmount
        }

        if (!mountedRef.current) return;

        if (options.repeatDelay > 0) {
            await new Promise(r => setTimeout(r, options.repeatDelay * 1000));
        }

        if (mountedRef.current) runCycle();
    }, [controls, travelDistance, isSnow, snowStartYRef, options, restFraction, fallEnd, restRotation]);

    useEffect(() => {
        mountedRef.current = true;
        const timeout = setTimeout(() => {
            if (mountedRef.current) runCycle();
        }, options.delay * 1000);

        return () => {
            mountedRef.current = false;
            clearTimeout(timeout);
            controls.stop();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            animate={controls}
            initial={{
                translateY: isSnow ? snowStartYRef.current : -80,
                translateX: 0,
                rotate: 0,
                opacity: options.opacity,
            }}
            style={{
                position: "absolute",
                left: `${options.positionPct}%`,
                top: 0,
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            {particleMode === 'leaves' ? (
                <LeafSVG size={size} color={options.color} pathIndex={options.pathIndex} />
            ) : (
                <SnowflakeSVG size={size} color={options.color} />
            )}
        </motion.div>
    );
});
FallingParticle.displayName = 'FallingParticle';

// ─── Rain drop (with collision ref) ─────────────────────────
const RainDrop = React.memo(({
    index,
    registerRef,
    options,
    travelDistance,
}: {
    index: number;
    registerRef: (idx: number, el: HTMLDivElement | null) => void;
    options: ParticleOptions;
    travelDistance: number;
}) => {
    const refCallback = useCallback((el: HTMLDivElement | null) => {
        registerRef(index, el);
    }, [index, registerRef]);

    return (
        <motion.div
            ref={refCallback}
            initial={{
                translateY: -80,
                translateX: 0,
            }}
            animate={{
                translateY: travelDistance,
                translateX: options.horizontalDrift,
            }}
            transition={{
                duration: options.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: options.delay,
                repeatDelay: options.repeatDelay,
            }}
            style={{
                position: "absolute",
                left: `${options.positionPct}%`,
                top: 0,
                width: `${options.width}px`,
                height: `${options.height}px`,
                background: 'linear-gradient(to bottom, rgba(140, 200, 255, 0.3), rgba(140, 200, 255, 0.8))',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                opacity: options.opacity,
            }}
        />
    );
});
RainDrop.displayName = 'RainDrop';

// ─── Rain splash ─────────────────────────────────────────────
const RainSplash = React.memo(({
    smallScreen = false,
    particleSize = 14,
    ...props
}: React.HTMLProps<HTMLDivElement> & {
    smallScreen?: boolean;
    particleSize?: number;
}) => {
    const splashScale = Math.min(particleSize / 10, 2.0);
    const particleCount = smallScreen ? 6 : 10;
    const splashColor = 'rgba(140, 200, 255, 0.8)';

    const splashParticles = useMemo(() => {
        return Array.from({length: particleCount}, (_, i) => {
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = (Math.random() * 0.5 + 0.7) * 20 * splashScale;
            return {
                id: i,
                directionX: Math.cos(angle) * distance,
                directionY: Math.sin(angle) * distance - (distance * 0.3),
                duration: 0.4 + Math.random() * 0.3,
                size: smallScreen ? 2 + Math.random() * 2 : 3 + Math.random() * 3,
            };
        });
    }, [particleCount, smallScreen, splashScale]);

    return (
        <div {...props} className={cn("absolute z-10", props.className)}>
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
                }}
            />
            {splashParticles.map((particle) => (
                <motion.span
                    key={particle.id}
                    initial={{x: 0, y: 0, opacity: 0.8, scale: 0}}
                    animate={{
                        x: particle.directionX,
                        y: -particle.directionY,
                        opacity: 0,
                        scale: 1,
                    }}
                    transition={{duration: particle.duration, ease: "circOut"}}
                    style={{
                        position: "absolute",
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        borderRadius: "50%",
                        background: splashColor,
                        left: "50%",
                        bottom: "1px",
                        transform: "translateX(-50%)",
                    }}
                />
            ))}
        </div>
    );
});
RainSplash.displayName = "RainSplash";

export default RainSplash;

// ─── Rain overlay with single shared collision loop ─────────
const RainOverlay = React.memo(({
    particles,
    travelDistance,
}: {
    particles: ParticleOptions[];
    travelDistance: number;
}) => {
    const dropRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [splashes, setSplashes] = useState<Map<number, {x: number; y: number; key: number}>>(new Map());
    const lastSplashTime = useRef<number[]>([]);
    const splashCounter = useRef(0);
    const smallScreen = window.innerWidth < 480;

    useEffect(() => {
        lastSplashTime.current = new Array(particles.length).fill(0);
    }, [particles.length]);

    useEffect(() => {
        let rafId: number;
        let lastCheck = 0;

        const check = (time: number) => {
            // Throttle to ~30fps to save CPU
            if (time - lastCheck < 33) {
                rafId = requestAnimationFrame(check);
                return;
            }
            lastCheck = time;
            const now = Date.now();

            for (let i = 0; i < dropRefs.current.length; i++) {
                const el = dropRefs.current[i];
                if (!el || now - (lastSplashTime.current[i] || 0) < 800) continue;

                const transform = el.style.transform || getComputedStyle(el).transform;
                if (!transform || transform === 'none') continue;

                const match = transform.match(/translateY\(([\d.-]+)px\)/);
                if (!match) continue;

                const y = parseFloat(match[1]);
                if (y >= travelDistance - 8 && y <= travelDistance + 2) {
                    lastSplashTime.current[i] = now;
                    const rect = el.getBoundingClientRect();
                    const parentRect = el.offsetParent?.getBoundingClientRect();
                    if (parentRect) {
                        const id = splashCounter.current++;
                        setSplashes(prev => {
                            const next = new Map(prev);
                            next.set(id, {
                                x: rect.left - parentRect.left + rect.width / 2,
                                y: rect.top - parentRect.top + rect.height,
                                key: id,
                            });
                            return next;
                        });
                        setTimeout(() => {
                            setSplashes(prev => {
                                const next = new Map(prev);
                                next.delete(id);
                                return next;
                            });
                        }, 600);
                    }
                }
            }
            rafId = requestAnimationFrame(check);
        };

        rafId = requestAnimationFrame(check);
        return () => cancelAnimationFrame(rafId);
    }, [travelDistance, particles.length]);

    const registerRef = useCallback((idx: number, el: HTMLDivElement | null) => {
        dropRefs.current[idx] = el;
    }, []);

    return (
        <>
            {particles.map((particle, index) => (
                <RainDrop
                    key={`rain-${index}`}
                    index={index}
                    registerRef={registerRef}
                    options={particle}
                    travelDistance={travelDistance}
                />
            ))}
            {Array.from(splashes.values()).map(s => (
                <RainSplash
                    key={s.key}
                    smallScreen={smallScreen}
                    particleSize={14}
                    style={{
                        left: s.x,
                        top: s.y,
                    }}
                />
            ))}
        </>
    );
});
RainOverlay.displayName = 'RainOverlay';

// ─── Lightweight particle overlay for any section ────────────
export const ParticleOverlay = React.memo(({
    particleMode,
    count = 20,
}: {
    particleMode: ParticleMode;
    count?: number;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isSnow = particleMode === 'snow';
    const [containerHeight, setContainerHeight] = useState(
        isSnow ? window.innerHeight : window.innerHeight
    );
    // Dynamic snow start: 45vh while hero visible, 0 once hero scrolls out
    // Ref avoids re-renders — each particle reads latest value at cycle start
    const snowStartYRef = useRef(isSnow ? window.innerHeight * 0.45 : 0);

    useEffect(() => {
        if (!isSnow) return;
        const onScroll = () => {
            const scrolled = window.scrollY >= window.innerHeight * 0.5;
            snowStartYRef.current = scrolled ? 0 : window.innerHeight * 0.45;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, [isSnow]);

    useEffect(() => {
        if (isSnow) {
            // Snow uses fixed positioning — only needs viewport height
            const onResize = () => setContainerHeight(window.innerHeight);
            onResize();
            window.addEventListener('resize', onResize, {passive: true});
            return () => window.removeEventListener('resize', onResize);
        }
        // Non-snow: measure parent container
        const measure = () => {
            if (containerRef.current?.parentElement) {
                const h = containerRef.current.parentElement.offsetHeight;
                if (h > 0) setContainerHeight(h);
            }
        };
        measure();
        const delayed = setTimeout(measure, 500);
        const observer = new ResizeObserver(measure);
        if (containerRef.current?.parentElement) {
            observer.observe(containerRef.current.parentElement);
        }
        window.addEventListener('resize', measure, {passive: true});
        return () => {
            clearTimeout(delayed);
            observer.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [isSnow]);

    const leafColors = useMemo(() => [
        '#c0392b', '#e74c3c', '#d35400', '#e67e22',
        '#f39c12', '#b7950b', '#935116', '#a04000',
        '#cb4335', '#dc7633', '#f0b27a', '#873600',
    ], []);

    const snowColors = useMemo(() => [
        '#8bb8d6', '#7aafc9', '#9ac4db', '#6da3c0',
        '#85b5d2', '#a0cce3', '#78adc8', '#8fbdd8',
    ], []);

    const particles = useMemo(() => {
        const baseScale = window.innerWidth < 480 ? 0.7 : 1;

        return Array.from({length: count}, (_, idx): ParticleOptions => {
            const positionPct = Math.random() * 100;
            const isSmall = Math.random() > 0.5;
            const isVerySmall = Math.random() > 0.8;

            let dropWidth: number, dropHeight: number, dropOpacity: number, color: string;

            if (particleMode === 'snow') {
                color = snowColors[Math.floor(Math.random() * snowColors.length)];
                if (isVerySmall) {
                    dropWidth = 10 * baseScale; dropHeight = 10 * baseScale;
                    dropOpacity = 0.5 + Math.random() * 0.2;
                } else if (isSmall) {
                    dropWidth = 18 * baseScale; dropHeight = 18 * baseScale;
                    dropOpacity = 0.6 + Math.random() * 0.2;
                } else {
                    dropWidth = 28 * baseScale; dropHeight = 28 * baseScale;
                    dropOpacity = 0.7 + Math.random() * 0.2;
                }
            } else if (particleMode === 'leaves') {
                color = leafColors[Math.floor(Math.random() * leafColors.length)];
                if (isVerySmall) {
                    dropWidth = 10 * baseScale; dropHeight = 8 * baseScale;
                    dropOpacity = 0.8 + Math.random() * 0.15;
                } else if (isSmall) {
                    dropWidth = 16 * baseScale; dropHeight = 13 * baseScale;
                    dropOpacity = 0.85 + Math.random() * 0.15;
                } else {
                    dropWidth = 22 * baseScale; dropHeight = 18 * baseScale;
                    dropOpacity = 0.9 + Math.random() * 0.1;
                }
            } else {
                color = 'rgba(140, 200, 255, 0.8)';
                if (isVerySmall) {
                    dropWidth = 5 * baseScale; dropHeight = 10 * baseScale;
                    dropOpacity = 0.6 + Math.random() * 0.3;
                } else if (isSmall) {
                    dropWidth = 8 * baseScale; dropHeight = 14 * baseScale;
                    dropOpacity = 0.7 + Math.random() * 0.3;
                } else {
                    dropWidth = 14 * baseScale; dropHeight = 24 * baseScale;
                    dropOpacity = 0.75 + Math.random() * 0.25;
                }
            }

            const sizeRatio = dropHeight / 24;
            // Slow down on mobile — smaller screens have shorter travel distance
            // so same duration = visually faster. Scale up duration on small screens.
            const mobileSlowdown = window.innerWidth < 480 ? 2
                : window.innerWidth < 768 ? 1.5
                : 1;
            const baseSpeed = particleMode === 'leaves'
                    ? (2.5 + sizeRatio * 2) * mobileSlowdown
                    : particleMode === 'rain'
                        ? (1.5 + sizeRatio * 1.2) * mobileSlowdown
                        : 0; // snow handled separately below
            const speedVariation = particleMode === 'snow' ? 1 : 0.85 + Math.random() * 0.3;

            const horizontalDrift = particleMode === 'snow'
                ? (Math.random() * 80 - 40)
                : particleMode === 'leaves'
                    ? (Math.random() * 120 - 60)
                    : (Math.random() * 8 - 4);

            const rotation = particleMode === 'leaves'
                ? (Math.random() * 540 - 270)
                : particleMode === 'snow'
                    ? (Math.random() * 180 - 90)
                    : 0;

            return {
                positionPct,
                horizontalDrift,
                duration: baseSpeed * speedVariation,
                repeatDelay: particleMode === 'snow' ? 0 : Math.random() * 0.6,
                delay: particleMode === 'snow'
                    ? (window.innerWidth < 768 ? Math.random() * 0.5 : Math.random() * 2)
                    : Math.random() * 3,
                width: dropWidth,
                height: dropHeight,
                opacity: dropOpacity,
                blur: '0px',
                rotation,
                color,
                pathIndex: idx % LEAF_PATHS.length,
            };
        });
    }, [count, particleMode, leafColors, snowColors, containerHeight]);

    const travelDistance = containerHeight - 20;

    return (
        <div
            ref={containerRef}
            style={{
                position: isSnow ? 'fixed' : 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: isSnow ? 5 : 10,
            }}
        >
            {particleMode === 'rain' ? (
                <RainOverlay particles={particles} travelDistance={travelDistance} />
            ) : (
                particles.map((particle, index) => (
                    <FallingParticle
                        key={`overlay-${index}`}
                        options={particle}
                        particleMode={particleMode}
                        travelDistance={travelDistance}
                        snowStartYRef={snowStartYRef}
                    />
                ))
            )}
        </div>
    );
});
ParticleOverlay.displayName = 'ParticleOverlay';
