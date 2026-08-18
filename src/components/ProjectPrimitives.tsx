import React from 'react';
import type {ProjectKind, ProjectMetric, ProjectStatus} from '../assets/projects/types';
import {projectTheme} from './projectTheme';

// ─── StatusChip ──────────────────────────────────────────────
// "● Live" style badge — the honesty signal almost no portfolio has.

const STATUS_LABEL: Record<ProjectStatus, string> = {
    'live': 'Live',
    'in-development': 'In development',
    'completed': 'Completed',
    'archived': 'Archived',
};

/** Status colors are theme tokens so they can never drift from the system. */
const statusColor = (status: ProjectStatus, t: ReturnType<typeof projectTheme>): string => {
    switch (status) {
        case 'live': return t.success;
        case 'in-development': return t.accentWarmText;
        case 'completed': return t.accentText;
        case 'archived': return t.textMuted;
    }
};

export const StatusChip: React.FC<{status: ProjectStatus; isDark?: boolean; className?: string}> = ({
    status,
    isDark = false,
    className = '',
}) => {
    const t = projectTheme(isDark);
    const color = statusColor(status, t);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${className}`}
            style={{
                color,
                background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.85)',
                border: `1px solid ${t.hairline}`,
            }}
        >
            <span
                aria-hidden="true"
                style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: color,
                    display: 'inline-block',
                    boxShadow: status === 'live' ? `0 0 6px ${color}` : undefined,
                }}
            />
            {STATUS_LABEL[status]}
        </span>
    );
};

// ─── ProjectBadge ────────────────────────────────────────────
// "Personal" vs "Client" chip so the mixed grid stays legible.

export const ProjectBadge: React.FC<{kind: ProjectKind; isDark?: boolean; className?: string}> = ({
    kind,
    isDark = false,
    className = '',
}) => {
    const isClient = kind === 'client';
    const t = projectTheme(isDark);
    const style: React.CSSProperties = isClient
        ? {
            background: t.accentWarmSoftBg,
            color: t.accentWarmText,
            border: `1px solid ${t.accentWarmBorder}`,
        }
        : {
            background: t.accentSoftBg,
            color: t.accentText,
            border: `1px solid ${isDark ? 'rgba(96,165,250,0.35)' : 'rgba(37,99,235,0.30)'}`,
        };
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${className}`}
            style={style}
        >
            <span
                aria-hidden="true"
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'currentColor',
                    display: 'inline-block',
                }}
            />
            {isClient ? 'Client work' : 'Personal'}
        </span>
    );
};

// ─── TechChips ───────────────────────────────────────────────

export const TechChips: React.FC<{
    items: string[];
    isDark?: boolean;
    size?: 'sm' | 'md';
    max?: number;
    className?: string;
}> = ({items, isDark = false, size = 'sm', max, className = ''}) => {
    const shown = max ? items.slice(0, max) : items;
    const overflow = max && items.length > max ? items.length - max : 0;
    const pad = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
    const t = projectTheme(isDark);
    const chipStyle: React.CSSProperties = {
        background: t.chipBg,
        color: t.chipText,
        border: `1px solid ${t.hairline}`,
    };
    return (
        <div className={`flex flex-wrap gap-1.5 ${className}`}>
            {shown.map((t) => (
                <span key={t} className={`rounded-md font-medium ${pad}`} style={chipStyle}>
                    {t}
                </span>
            ))}
            {overflow > 0 && (
                <span className={`rounded-md font-medium ${pad}`} style={{...chipStyle, opacity: 0.75}}>
                    +{overflow}
                </span>
            )}
        </div>
    );
};

// ─── StatRow ─────────────────────────────────────────────────
// Big-number metric tiles — "the receipts".

export const StatRow: React.FC<{metrics: ProjectMetric[]; isDark?: boolean; className?: string}> = ({
    metrics,
    isDark = false,
    className = '',
}) => {
    if (!metrics.length) return null;
    const t = projectTheme(isDark);
    return (
        <div
            className={`grid gap-3 ${className}`}
            style={{gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`}}
        >
            {metrics.map((m) => (
                <div
                    key={`${m.value}-${m.label}`}
                    className="rounded-lg px-4 py-3"
                    style={{
                        background: t.panelBg,
                        border: `1px solid ${t.hairline}`,
                    }}
                >
                    <div
                        className="text-2xl font-bold leading-tight tracking-tight"
                        style={{color: t.textPrimary, fontVariantNumeric: 'tabular-nums'}}
                    >
                        {m.value}
                    </div>
                    <div className="mt-0.5 text-xs" style={{color: t.textMuted}}>
                        {m.label}
                    </div>
                </div>
            ))}
        </div>
    );
};
