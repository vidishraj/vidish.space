import {useEffect, useRef, useState, useCallback} from 'react';
import {cn} from '../utils/utils';

interface InfiniteMovingCardsProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
    pauseOnHover?: boolean;
    className?: string;
}

function InfiniteMovingCards<T>({
    items,
    renderItem,
    direction = 'left',
    speed = 'normal',
    pauseOnHover = true,
    className,
}: InfiniteMovingCardsProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [started, setStarted] = useState(false);

    // All position state in refs to avoid re-renders
    const position = useRef(0);
    const rafId = useRef(0);
    const paused = useRef(false);
    const hovering = useRef(false);

    // Drag state
    const isDragging = useRef(false);
    const dragActivated = useRef(false);
    const startX = useRef(0);
    const dragStartPos = useRef(0);
    const velocity = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);
    const momentumRafId = useRef(0);

    const DRAG_THRESHOLD = 5;
    const isHorizontalDrag = useRef(false);
    const startY = useRef(0);

    const getSpeed = useCallback(() => {
        // px per frame at ~60fps
        if (speed === 'fast') return 1.5;
        if (speed === 'normal') return 0.75;
        return 0.4;
    }, [speed]);

    const directionMultiplier = direction === 'left' ? -1 : 1;

    const getHalfWidth = useCallback(() => {
        if (!scrollerRef.current) return 1;
        return scrollerRef.current.scrollWidth / 2;
    }, []);

    const wrapPosition = useCallback((pos: number) => {
        const half = getHalfWidth();
        if (half <= 0) return pos;
        // Keep position in range [-halfWidth, 0]
        let p = pos % half;
        if (p > 0) p -= half;
        if (p < -half) p += half;
        return p;
    }, [getHalfWidth]);

    const applyPosition = useCallback(() => {
        if (scrollerRef.current) {
            scrollerRef.current.style.transform = `translateX(${position.current}px)`;
        }
    }, []);

    // Main auto-scroll loop
    const animate = useCallback(() => {
        if (!paused.current && !isDragging.current && !hovering.current) {
            position.current += getSpeed() * directionMultiplier;
            position.current = wrapPosition(position.current);
            applyPosition();
        }
        rafId.current = requestAnimationFrame(animate);
    }, [getSpeed, directionMultiplier, wrapPosition, applyPosition]);

    useEffect(() => {
        if (!containerRef.current) return;
        setStarted(true);
        rafId.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId.current);
    }, [animate]);

    // Momentum deceleration after drag
    const applyMomentum = useCallback(() => {
        if (Math.abs(velocity.current) < 0.3) {
            // Momentum done, auto-scroll resumes via main loop
            return;
        }
        velocity.current *= 0.97;
        position.current += velocity.current;
        position.current = wrapPosition(position.current);
        applyPosition();
        momentumRafId.current = requestAnimationFrame(applyMomentum);
    }, [wrapPosition, applyPosition]);

    const handleDragStart = useCallback((clientX: number, clientY?: number) => {
        isDragging.current = true;
        dragActivated.current = false;
        isHorizontalDrag.current = false;
        startX.current = clientX;
        startY.current = clientY ?? 0;
        dragStartPos.current = position.current;
        velocity.current = 0;
        lastX.current = clientX;
        lastTime.current = performance.now();
        cancelAnimationFrame(momentumRafId.current);
    }, []);

    const handleDragMove = useCallback((clientX: number, clientY?: number, e?: TouchEvent) => {
        if (!isDragging.current) return;

        if (!dragActivated.current) {
            const dx = Math.abs(clientX - startX.current);
            const dy = Math.abs((clientY ?? 0) - startY.current);

            if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) return;

            // Determine drag direction — if more vertical, let browser handle scroll
            if (dy > dx) {
                isDragging.current = false;
                return;
            }

            isHorizontalDrag.current = true;
            dragActivated.current = true;
            dragStartPos.current = position.current;
            startX.current = clientX;
            if (containerRef.current) {
                containerRef.current.style.cursor = 'grabbing';
            }
        }

        // Prevent vertical page scroll while dragging horizontally
        if (isHorizontalDrag.current && e) {
            e.preventDefault();
        }

        const now = performance.now();
        const dt = now - lastTime.current;
        if (dt > 0) {
            velocity.current = (clientX - lastX.current) / dt * 16;
        }
        lastX.current = clientX;
        lastTime.current = now;

        position.current = dragStartPos.current + (clientX - startX.current);
        position.current = wrapPosition(position.current);
        applyPosition();
    }, [wrapPosition, applyPosition]);

    const handleDragEnd = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;

        if (containerRef.current) {
            containerRef.current.style.cursor = '';
        }

        if (!dragActivated.current) return;

        // Apply momentum if there's velocity
        if (Math.abs(velocity.current) > 1) {
            momentumRafId.current = requestAnimationFrame(applyMomentum);
        }
    }, [applyMomentum]);

    // Hover pause
    useEffect(() => {
        if (!pauseOnHover) return;
        const container = containerRef.current;
        if (!container) return;

        const onEnter = () => { hovering.current = true; };
        const onLeave = () => { hovering.current = false; };

        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);
        return () => {
            container.removeEventListener('mouseenter', onEnter);
            container.removeEventListener('mouseleave', onLeave);
        };
    }, [pauseOnHover]);

    // Mouse events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            handleDragStart(e.clientX);
        };
        const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
        const onMouseUp = () => handleDragEnd();
        const onClick = (e: MouseEvent) => {
            if (dragActivated.current) {
                e.stopPropagation();
                e.preventDefault();
            }
        };

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('click', onClick, true);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            container.removeEventListener('mousedown', onMouseDown);
            container.removeEventListener('click', onClick, true);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [handleDragStart, handleDragMove, handleDragEnd]);

    // Touch events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
        const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
        const onTouchEnd = () => handleDragEnd();

        container.addEventListener('touchstart', onTouchStart, {passive: true});
        container.addEventListener('touchmove', onTouchMove, {passive: false});
        container.addEventListener('touchend', onTouchEnd);

        return () => {
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);
        };
    }, [handleDragStart, handleDragMove, handleDragEnd]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cancelAnimationFrame(rafId.current);
            cancelAnimationFrame(momentumRafId.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn('scroller relative z-[1] overflow-hidden', className)}
            style={{
                maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
                cursor: 'grab',
                userSelect: 'none',
                touchAction: 'pan-y',
            }}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    'flex w-max min-w-full shrink-0 gap-4 flex-nowrap',
                    started && 'will-change-transform',
                )}
            >
                {items.map((item, idx) => (
                    <li key={`a-${idx}`} className="flex-shrink-0">
                        {renderItem(item, idx)}
                    </li>
                ))}
                {items.map((item, idx) => (
                    <li key={`b-${idx}`} className="flex-shrink-0" aria-hidden>
                        {renderItem(item, idx)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InfiniteMovingCards;
