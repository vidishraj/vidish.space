import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {motion, useAnimation, useInView} from "framer-motion";
import Modal, {type ModalData} from "./Modal.tsx";
import ProjectCard from "./ProjectCard.tsx";
import {useThemeContext} from '../App';
import type {Project, ProjectKind} from "../assets/projects/types";

type Filter = 'all' | ProjectKind;

interface ProjectsGridProps {
    projects: Project[];
    /** Show the Personal / Client filter tabs. */
    showFilter?: boolean;
    sectionRef?: React.RefObject<HTMLElement>;
}

/** Map a Project onto the Modal's data shape. */
function toModalData(p: Project): ModalData {
    return {
        title: p.title,
        sections: p.sections.map(s => ({
            title: s.title,
            description: s.description,
            imgSrc: s.imgSrc,
            videoUrl: s.videoUrl,
        })),
        links: p.links,
        gradientColors: p.gradientColors,
        kind: p.kind,
        tagline: p.tagline,
        metrics: p.metrics,
        techStack: p.techStack,
        client: p.client,
    };
}

export function ProjectsGrid({projects, showFilter = true}: ProjectsGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const {season} = useThemeContext();
    const isDark = season === 'monsoon';
    const isInView = useInView(gridRef, {once: true, amount: 0.15});
    const controls = useAnimation();
    const [filter, setFilter] = useState<Filter>('all');
    const [active, setActive] = useState<Project | null>(null);

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [isInView, controls]);

    const counts = useMemo(() => ({
        all: projects.length,
        personal: projects.filter(p => p.kind === 'personal').length,
        client: projects.filter(p => p.kind === 'client').length,
    }), [projects]);

    const visible = useMemo(
        () => (filter === 'all' ? projects : projects.filter(p => p.kind === filter)),
        [projects, filter],
    );

    const open = useCallback((p: Project) => setActive(p), []);
    const close = useCallback(() => setActive(null), []);

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
                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)'}`,
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
                                            ? (isDark ? 'rgba(96,165,250,0.22)' : '#ffffff')
                                            : 'transparent',
                                        color: selected
                                            ? (isDark ? '#bfdbfe' : '#1d4ed8')
                                            : (isDark ? '#cbd5e1' : '#475569'),
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
                <Modal
                    isOpen={!!active}
                    onClose={close}
                    data={toModalData(active)}
                    season={season}
                />
            )}
        </div>
    );
}
