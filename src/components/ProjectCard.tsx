import React, {useRef, useState} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import type {Project} from '../assets/projects/types';
import {ProjectBadge, StatusChip, TechChips} from './ProjectPrimitives';
import {projectTheme} from './projectTheme';

interface ProjectCardProps {
    project: Project;
    isDark: boolean;
    onOpen: (project: Project) => void;
    className?: string;
}

/**
 * The 10-second layer: everything a recruiter needs without clicking.
 * Name → outcome-first tagline → one hook metric → 3-5 tech chips.
 * Clear "View details" affordance; card video (if any) plays on hover.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({project, isDark, onOpen, className = ''}) => {
    const reduceMotion = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [imgFailed, setImgFailed] = useState(false);
    const isClient = project.kind === 'client';
    const t = projectTheme(isDark);

    const handleEnter = () => {
        if (reduceMotion) return;
        videoRef.current?.play().catch(() => {});
    };
    const handleLeave = () => {
        const v = videoRef.current;
        if (v) {
            v.pause();
            v.currentTime = 0;
        }
    };

    const open = () => onOpen(project);

    return (
        <motion.article
            role="button"
            tabIndex={0}
            aria-label={`${project.title} — view details`}
            onClick={open}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open();
                }
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${className}`}
            style={{
                backgroundColor: t.surface,
                border: `1px solid ${t.hairline}`,
                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.08)',
            }}
            whileHover={reduceMotion ? undefined : {
                y: -8,
                boxShadow: isDark ? '0 16px 36px rgba(0,0,0,0.65)' : '0 16px 36px rgba(0,0,0,0.14)',
                transition: {type: 'spring', stiffness: 400, damping: 22},
            }}
            whileTap={reduceMotion ? undefined : {scale: 0.99}}
        >
            {/* Media */}
            <div
                className="relative w-full flex-shrink-0 overflow-hidden"
                style={{
                    // One media-band height for EVERY card so titles/bodies
                    // start at the same y across a row, personal or client.
                    height: 168,
                    background: isDark
                        ? 'linear-gradient(135deg, #0b1220, #1e293b)'
                        : 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                }}
            >
                {project.image && !imgFailed ? (
                    <img
                        src={project.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        onError={() => setImgFailed(true)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : project.client?.logo ? (
                    // Client work: logo lock-up instead of a product screenshot
                    <div className="flex h-full w-full items-center justify-center">
                        <img
                            src={project.client.logo}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            style={{
                                maxHeight: 56,
                                maxWidth: '60%',
                                objectFit: 'contain',
                                background: project.client.logoBg || 'rgba(255,255,255,0.92)',
                                borderRadius: 10,
                                padding: 8,
                            }}
                        />
                    </div>
                ) : (
                    // No screenshot yet: a deliberate monogram, not a void.
                    // Replaced automatically once the card image lands.
                    <div aria-hidden="true" className="flex h-full w-full items-center justify-center">
                        <span
                            className="select-none text-8xl font-bold leading-none"
                            style={{color: t.textPrimary, opacity: 0.07}}
                        >
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}

                {project.cardVideo && !reduceMotion && (
                    <video
                        ref={videoRef}
                        src={project.cardVideo}
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                )}

                <ProjectBadge kind={project.kind} isDark={isDark} className="absolute left-3 top-3 shadow-sm" />
                {project.facts?.status && (
                    <StatusChip status={project.facts.status} isDark={isDark} className="absolute right-3 top-3 shadow-sm" />
                )}

                {project.hookMetric && (
                    <div
                        className="absolute bottom-3 right-3 rounded-lg px-2.5 py-1.5 text-right shadow-sm backdrop-blur-sm"
                        style={{
                            background: isDark ? 'rgba(15,23,42,0.78)' : 'rgba(255,255,255,0.88)',
                            border: `1px solid ${t.hairline}`,
                        }}
                    >
                        <div
                            className="text-base font-bold leading-none tracking-tight"
                            style={{color: t.textPrimary, fontVariantNumeric: 'tabular-nums'}}
                        >
                            {project.hookMetric.value}
                        </div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-wider" style={{color: t.textMuted}}>
                            {project.hookMetric.label}
                        </div>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-grow flex-col p-5">
                {isClient && project.client && (
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider" style={{color: t.accentWarmText}}>
                        {project.client.name} · {project.client.role}
                    </div>
                )}
                <h3 className="mb-1.5 text-lg font-semibold leading-snug" style={{color: t.accentText}}>
                    {project.title}
                </h3>
                <p
                    className="mb-4 flex-grow text-sm leading-relaxed"
                    style={{
                        color: t.textBody,
                        // Equal-height cards: reserve three lines and truncate
                        // past three, so short and long taglines take the same
                        // vertical space.
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '4.3rem',
                    }}
                >
                    {project.tagline}
                </p>
                <TechChips items={project.tags} isDark={isDark} max={5} />

                <div
                    className="mt-4 flex items-center justify-between text-xs font-semibold"
                    style={{color: t.accentText}}
                >
                    <span className="transition-transform group-hover:translate-x-0.5">
                        View details →
                    </span>
                    {project.links?.website && (
                        <span className="opacity-70" aria-hidden="true">Live ↗</span>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
