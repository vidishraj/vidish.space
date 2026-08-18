import React, {useEffect, useRef, useState} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import type {Project} from '../assets/projects/types';
import {ProjectBadge, StatRow, StatusChip, TechChips} from './ProjectPrimitives';
import {ProjectBlockList, renderMarkdown} from './ProjectBlocks';
import VideoEmbed from './VideoEmbed';
import {useFocusTrap} from '../utils/useFocusTrap';
import {Season} from '../utils/seasonConfig';

interface ProjectPageProps {
    project: Project;
    /** Ordered list used for prev/next navigation. */
    projects: Project[];
    onClose: () => void;
    onSelect: (p: Project) => void;
    season?: Season;
}

/** Compact label for the in-page nav rail ("Transactions - All Your…" → "Transactions"). */
const shortLabel = (title: string) => {
    const head = title.split(/[-–—|:]/)[0].trim();
    return head.length > 2 ? head : title;
};

const sectionNo = (i: number) => String(i + 1).padStart(2, '0');

/**
 * Full-page project view — replaces the modal for project deep-dives.
 * A takeover layer with its own scroll: hero band → stacked sections with a
 * sticky section nav → metrics/stack receipts → prev/next project footer.
 */
const ProjectPage: React.FC<ProjectPageProps> = ({project, projects, onClose, onSelect, season = 'summer'}) => {
    const isDark = season === 'monsoon';
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [activeSec, setActiveSec] = useState(0);

    useFocusTrap(true, containerRef);

    // Lock the page behind the takeover
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Escape closes
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // Reset scroll when switching projects (prev/next)
    useEffect(() => {
        containerRef.current?.scrollTo({top: 0});
        setActiveSec(0);
    }, [project.id]);

    // Scroll-spy for the section nav
    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        setActiveSec(Number((en.target as HTMLElement).dataset.idx));
                    }
                });
            },
            {root, rootMargin: '-15% 0px -65% 0px'},
        );
        root.querySelectorAll('[data-ppage-section]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [project]);

    const jumpTo = (i: number) => {
        containerRef.current
            ?.querySelector(`#ppage-sec-${i}`)
            ?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
    };

    const idx = projects.findIndex((p) => p.id === project.id);
    const prev = idx > 0 ? projects[idx - 1] : null;
    const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;

    const pageBg = isDark
        ? 'linear-gradient(180deg, #0f172a 0%, #111827 60%, #0b1220 100%)'
        : 'linear-gradient(180deg, #fafcff 0%, #f2f6fb 60%, #eaf0f7 100%)';
    const textPrimary = isDark ? '#f1f5f9' : '#0f172a';
    const textMuted = isDark ? '#94a3b8' : '#64748b';
    const hairline = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.08)';
    const barBg = isDark ? 'rgba(15,23,42,0.82)' : 'rgba(250,252,255,0.85)';

    const linkBtn: React.CSSProperties = {
        border: `1px solid ${hairline}`,
        color: textPrimary,
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
    };

    return (
        <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            tabIndex={-1}
            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 28}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.32, ease: 'easeOut'}}
            className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
            style={{background: pageBg, color: textPrimary}}
        >
            {/* Top bar */}
            <div
                className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 backdrop-blur-md sm:px-8"
                style={{background: barBg, borderBottom: `1px solid ${hairline}`}}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                    style={linkBtn}
                >
                    <span aria-hidden="true">←</span> All projects
                </button>
                <div className="min-w-0 hidden sm:flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{project.title}</span>
                    <ProjectBadge kind={project.kind} isDark={isDark} />
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close project view"
                    className="rounded-full p-2 transition-colors"
                    style={linkBtn}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Hero band */}
            <header className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-8 sm:pt-14">
                <div className="flex flex-wrap items-center gap-2">
                    <ProjectBadge kind={project.kind} isDark={isDark} />
                    {project.facts?.status && <StatusChip status={project.facts.status} isDark={isDark} />}
                    {project.client && (
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{color: isDark ? '#fcd34d' : '#b45309'}}>
                            {project.client.name} · {project.client.role} · {project.client.duration}
                        </span>
                    )}
                </div>
                <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                    {project.title}
                </h1>
                <p className="mt-3 max-w-3xl text-base sm:text-lg" style={{color: textMuted}}>
                    {project.tagline}
                </p>

                {project.tldr && project.tldr.length > 0 && (
                    <ul
                        className="mt-5 max-w-3xl space-y-1.5 rounded-xl px-5 py-4"
                        style={{
                            listStyle: 'none',
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                            border: `1px solid ${hairline}`,
                        }}
                    >
                        {project.tldr.map((line, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base">
                                <span aria-hidden="true" className="mt-1 flex-shrink-0" style={{color: isDark ? '#60a5fa' : '#2563eb'}}>▸</span>
                                <span style={{color: isDark ? '#e2e8f0' : '#1e293b'}}>{line}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                    {project.links?.website && (
                        <a href={project.links.website} target="_blank" rel="noopener noreferrer"
                           className="rounded-full px-4 py-1.5 text-sm font-semibold"
                           style={{background: isDark ? '#2563eb' : '#1d4ed8', color: '#fff'}}>
                            Visit live ↗
                        </a>
                    )}
                    {project.links?.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                           className="rounded-full px-4 py-1.5 text-sm font-semibold" style={linkBtn}>
                            GitHub ↗
                        </a>
                    )}
                    {project.links?.designDoc && (
                        <a href={project.links.designDoc} target="_blank" rel="noopener noreferrer"
                           className="rounded-full px-4 py-1.5 text-sm font-semibold" style={linkBtn}>
                            Docs ↗
                        </a>
                    )}
                    <TechChips items={project.tags} isDark={isDark} size="md" />
                </div>

                {/* At a glance — spec-sheet facts */}
                {(project.facts || project.client) && (() => {
                    const facts: {label: string; value: React.ReactNode}[] = [];
                    const f = project.facts;
                    facts.push({label: 'Type', value: project.kind === 'client' ? 'Client engagement' : 'Personal project'});
                    if (f?.role || project.client?.role) facts.push({label: 'Role', value: f?.role ?? project.client?.role});
                    if (f?.timeline || project.client?.duration) facts.push({label: 'Timeline', value: f?.timeline ?? project.client?.duration});
                    if (f?.team) facts.push({label: 'Team', value: f.team});
                    if (f?.platform) facts.push({label: 'Platform', value: f.platform});
                    if (f?.status) facts.push({label: 'Status', value: <StatusChip status={f.status} isDark={isDark} />});
                    return (
                        <dl
                            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl px-6 py-5 sm:grid-cols-3 lg:grid-cols-6"
                            style={{
                                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                                border: `1px solid ${hairline}`,
                            }}
                        >
                            {facts.map((fact) => (
                                <div key={fact.label}>
                                    <dt className="text-[11px] font-bold uppercase tracking-widest" style={{color: textMuted}}>
                                        {fact.label}
                                    </dt>
                                    <dd className="mt-1 text-sm font-medium" style={{color: textPrimary, margin: 0}}>
                                        {fact.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    );
                })()}

                {project.image && (
                    <div className="mt-8 overflow-hidden rounded-2xl" style={{border: `1px solid ${hairline}`}}>
                        <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            className="w-full object-cover"
                            style={{maxHeight: '46vh'}}
                            onError={(e) => {
                                (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                            }}
                        />
                    </div>
                )}
            </header>

            {/* Body: sticky rail + sections */}
            <div className="mx-auto flex w-full max-w-5xl gap-10 px-4 pb-8 pt-10 sm:px-8 lg:pt-14">
                {/* Section nav rail */}
                {project.sections.length > 1 && (
                    <nav aria-label="Project sections" className="sticky top-24 hidden h-max w-48 flex-shrink-0 self-start lg:block">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{color: textMuted}}>
                            On this page
                        </p>
                        <ul className="space-y-1">
                            {project.sections.map((s, i) => (
                                <li key={i}>
                                    <button
                                        type="button"
                                        onClick={() => jumpTo(i)}
                                        aria-current={activeSec === i ? 'true' : undefined}
                                        className="flex w-full items-baseline gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors"
                                        style={{
                                            color: activeSec === i ? (isDark ? '#93c5fd' : '#1d4ed8') : textMuted,
                                            background: activeSec === i
                                                ? (isDark ? 'rgba(96,165,250,0.12)' : 'rgba(37,99,235,0.08)')
                                                : 'transparent',
                                            fontWeight: activeSec === i ? 600 : 400,
                                            border: 0,
                                        }}
                                    >
                                        <span className="text-[10px] font-bold tracking-wider opacity-60" style={{fontVariantNumeric: 'tabular-nums'}}>
                                            {sectionNo(i)}
                                        </span>
                                        <span className="min-w-0 truncate">{shortLabel(s.title)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}

                {/* Sections */}
                <div className="min-w-0 flex-1">
                    {project.sections.map((section, i) => (
                        <section
                            key={i}
                            id={`ppage-sec-${i}`}
                            data-ppage-section
                            data-idx={i}
                            className="mb-14"
                            style={{scrollMarginTop: 84}}
                        >
                            <div
                                className="mb-1 text-[11px] font-bold uppercase tracking-widest"
                                style={{color: isDark ? '#60a5fa' : '#2563eb', fontVariantNumeric: 'tabular-nums'}}
                            >
                                {sectionNo(i)}
                            </div>
                            <h2 className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
                                {section.title}
                            </h2>

                            {section.blocks && section.blocks.length > 0 ? (
                                // New format: typed content blocks
                                <ProjectBlockList blocks={section.blocks} isDark={isDark} projectTitle={project.title} />
                            ) : (
                                // Legacy format: markdown/HTML description (+ optional media),
                                // media alternating sides on desktop for visual rhythm
                                <>
                                    {section.videoUrl && (
                                        <div className="mb-5">
                                            <VideoEmbed
                                                url={section.videoUrl}
                                                title={`${project.title} — ${section.title}`}
                                                poster={section.imgSrc}
                                                isDark={isDark}
                                            />
                                        </div>
                                    )}
                                    <div className={`flex flex-col gap-5 ${section.imgSrc && !section.videoUrl ? (i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse') : ''}`}>
                                        {section.imgSrc && !section.videoUrl && (
                                            <div className="flex-shrink-0 self-start overflow-hidden rounded-xl lg:w-1/2" style={{border: `1px solid ${hairline}`}}>
                                                <img
                                                    src={section.imgSrc}
                                                    alt={section.title}
                                                    loading="lazy"
                                                    className="w-full object-contain"
                                                    style={{maxHeight: '58vh', background: isDark ? '#0b1220' : '#f8fafc'}}
                                                    onError={(e) => {
                                                        (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {section.description && (
                                            <div
                                                className={`prose min-w-0 max-w-none text-sm sm:text-base ${isDark ? 'prose-invert text-gray-200' : 'text-gray-700'}`}
                                                dangerouslySetInnerHTML={{__html: renderMarkdown(section.description)}}
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </section>
                    ))}

                    {/* Receipts */}
                    {(project.metrics?.length || project.techStack?.length) ? (
                        <section className="mb-14 border-t pt-8" style={{borderColor: hairline}}>
                            <h2 className="mb-5 text-xl font-bold tracking-tight sm:text-2xl">By the numbers</h2>
                            {project.metrics && project.metrics.length > 0 && (
                                <StatRow metrics={project.metrics} isDark={isDark} className="mb-6" />
                            )}
                            {project.techStack && project.techStack.length > 0 && (
                                <>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{color: textMuted}}>
                                        Full tech stack
                                    </p>
                                    <TechChips items={project.techStack} isDark={isDark} size="md" />
                                </>
                            )}
                        </section>
                    ) : null}
                </div>
            </div>

            {/* Prev / next footer */}
            <footer className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-8">
                <div className="grid gap-4 border-t pt-8 sm:grid-cols-2" style={{borderColor: hairline}}>
                    {prev ? (
                        <button
                            type="button"
                            onClick={() => onSelect(prev)}
                            className="rounded-xl p-5 text-left transition-transform hover:-translate-y-0.5"
                            style={{...linkBtn, borderRadius: 12}}
                        >
                            <div className="text-xs font-semibold uppercase tracking-wider" style={{color: textMuted}}>
                                ← Previous
                            </div>
                            <div className="mt-1 font-semibold">{prev.title}</div>
                            <div className="mt-0.5 truncate text-sm" style={{color: textMuted}}>{prev.tagline}</div>
                        </button>
                    ) : <div />}
                    {next ? (
                        <button
                            type="button"
                            onClick={() => onSelect(next)}
                            className="rounded-xl p-5 text-right transition-transform hover:-translate-y-0.5"
                            style={{...linkBtn, borderRadius: 12}}
                        >
                            <div className="text-xs font-semibold uppercase tracking-wider" style={{color: textMuted}}>
                                Next →
                            </div>
                            <div className="mt-1 font-semibold">{next.title}</div>
                            <div className="mt-0.5 truncate text-sm" style={{color: textMuted}}>{next.tagline}</div>
                        </button>
                    ) : <div />}
                </div>
            </footer>
        </motion.div>
    );
};

export default ProjectPage;
