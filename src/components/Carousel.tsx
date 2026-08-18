import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {motion, useAnimation, useInView} from "framer-motion";
import ProjectPage from "./ProjectPage.tsx";
import ProjectCard from "./ProjectCard.tsx";
import {useThemeContext} from '../App';
import type {Project, ProjectKind} from "../assets/projects/types";
import {projectTheme} from "./projectTheme";

type Filter = 'all' | ProjectKind;

interface ProjectsGridProps {
    projects: Project[];
    /** Show the Personal / Client filter tabs. */
    showFilter?: boolean;
    sectionRef?: React.RefObject<HTMLElement>;
}

const HASH_PREFIX = '#/project/';

const projectIdFromHash = (): string | null =>
    window.location.hash.startsWith(HASH_PREFIX)
        ? decodeURIComponent(window.location.hash.slice(HASH_PREFIX.length))
        : null;

export function ProjectsGrid({projects, showFilter = true}: ProjectsGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const {season} = useThemeContext();
    const isDark = season === 'monsoon';
    const t = projectTheme(isDark);
    const isInView = useInView(gridRef, {once: true, amount: 0.15});
    const controls = useAnimation();
    const [filter, setFilter] = useState<Filter>('all');
    const [active, setActive] = useState<Project | null>(null);
    // Whether the current open state has a history entry we pushed (vs deep link)
    const pushedRef = useRef(false);

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [isInView, controls]);

    // Deep link: open a project if the page loads with #/project/<id>
    useEffect(() => {
        const id = projectIdFromHash();
        if (id) {
            const match = projects.find(p => p.id === id);
            if (match) {
                pushedRef.current = false; // we didn't push this entry
                setActive(match);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Browser back/forward
    useEffect(() => {
        const onPop = () => {
            const id = projectIdFromHash();
            const match = id ? projects.find(p => p.id === id) ?? null : null;
            pushedRef.current = !!match; // entries reached via history are navigable back
            setActive(match);
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, [projects]);

    const open = useCallback((p: Project) => {
        setActive(p);
        window.history.pushState({vsProject: p.id}, '', `${HASH_PREFIX}${encodeURIComponent(p.id)}`);
        pushedRef.current = true;
    }, []);

    /** Switch project inside the page view (prev/next) — push so back walks history. */
    const select = useCallback((p: Project) => {
        setActive(p);
        window.history.pushState({vsProject: p.id}, '', `${HASH_PREFIX}${encodeURIComponent(p.id)}`);
        pushedRef.current = true;
    }, []);

    const close = useCallback(() => {
        setActive(null);
        if (pushedRef.current) {
            // Leave via history so back-button state stays consistent
            window.history.back();
        } else {
            // Deep-linked entry: just strip the hash without navigating away
            window.history.replaceState({}, '', window.location.pathname + window.location.search);
        }
        pushedRef.current = false;
    }, []);

    const counts = useMemo(() => ({
        all: projects.length,
        personal: projects.filter(p => p.kind === 'personal').length,
        client: projects.filter(p => p.kind === 'client').length,
    }), [projects]);

    const visible = useMemo(
        () => (filter === 'all' ? projects : projects.filter(p => p.kind === filter)),
        [projects, filter],
    );

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {staggerChildren: 0.08, delayChildren: 0.15}},
    };
    const itemVariants = {
        hidden: {y: 40, opacity: 0},
        visible: {y: 0, opacity: 1, transition: {type: "spring", stiffness: 110, damping: 16}},
    };

    const filters: {key: Filter; label: string}[] = [
        {key: 'all', label: `All (${counts.all})`},
        {key: 'personal', label: `Personal (${counts.personal})`},
        {key: 'client', label: `Client work (${counts.client})`},
    ];

    return (
        <div ref={gridRef} className="relative w-full mt-5 py-12 px-4 md:px-8">
            {showFilter && counts.personal > 0 && counts.client > 0 && (
                <div className="mb-8 flex justify-center" role="tablist" aria-label="Filter projects">
                    <div
                        className="inline-flex rounded-full p-1"
                        style={{
                            background: t.chipBg,
                            border: `1px solid ${t.hairline}`,
                        }}
                    >
                        {filters.map(f => {
                            const selected = filter === f.key;
                            return (
                                <button
                                    key={f.key}
                                    role="tab"
                                    aria-selected={selected}
                                    onClick={() => setFilter(f.key)}
                                    className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors border-0"
                                    style={{
                                        background: selected
                                            ? (isDark ? t.accentSoftBg : t.surface)
                                            : 'transparent',
                                        color: selected ? t.accentText : t.textBody,
                                        boxShadow: selected && !isDark ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                                    }}
                                >
                                    {f.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <motion.div
                key={filter}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-6 md:gap-8"
                style={{gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))'}}
            >
                {visible.map(p => (
                    <motion.div
                        key={p.id}
                        variants={itemVariants}
                        className={p.featured ? 'lg:col-span-2' : ''}
                    >
                        <ProjectCard project={p} isDark={isDark} onOpen={open} />
                    </motion.div>
                ))}
            </motion.div>

            {active && (
                <ProjectPage
                    project={active}
                    projects={projects}
                    onClose={close}
                    onSelect={select}
                    season={season}
                />
            )}
        </div>
    );
}
