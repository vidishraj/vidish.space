import {useEffect, RefObject} from 'react';

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus within `containerRef` while `isOpen` is true, moves
 * focus into the dialog on open, and restores focus to the previously focused
 * element on close. The container element must have tabIndex={-1} so it can
 * receive focus as a fallback.
 */
export function useFocusTrap(isOpen: boolean, containerRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!isOpen) return;
        const container = containerRef.current;
        if (!container) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;

        const getFocusable = () =>
            Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
                .filter((el) => el.offsetParent !== null || el === document.activeElement);

        // Move focus into the dialog.
        const focusables = getFocusable();
        (focusables[0] ?? container).focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            const items = getFocusable();
            if (items.length === 0) {
                e.preventDefault();
                container.focus();
                return;
            }
            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement;

            if (e.shiftKey) {
                if (active === first || !container.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else if (active === last || !container.contains(active)) {
                e.preventDefault();
                first.focus();
            }
        };

        container.addEventListener('keydown', handleKeyDown);
        return () => {
            container.removeEventListener('keydown', handleKeyDown);
            previouslyFocused?.focus?.();
        };
    }, [isOpen, containerRef]);
}
