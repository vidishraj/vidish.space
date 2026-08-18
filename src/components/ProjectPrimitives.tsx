import React from 'react';
import type {ProjectKind, ProjectMetric, ProjectStatus} from '../assets/projects/types';

// ─── StatusChip ──────────────────────────────────────────────
// "● Live" style badge — the honesty signal almost no portfolio has.

const STATUS_META: Record<ProjectStatus, {label: string; color: string; colorDark: string}> = {
    'live': {label: 'Live', color: '#059669', colorDark: '#34d399'},
    'in-development': {label: 'In development', color: '#b45309', colorDark: '#fbbf24'},
    'completed': {label: 'Completed', color: '#1d4ed8', colorDark: '#93c5fd'},
    'archived': {label: 'Archived', color: '#64748b', colorDark: '#94a3b8'},
};

export const StatusChip: React.FC<{status: ProjectStatus; isDark?: boolean; className?: string}> = ({
    status,
    isDark = false,
    className = '',
}) => {
    const meta = STATUS_META[status];
    const color = isDark ? meta.colorDark : meta.color;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${className}`}
            style={{
                color,
                background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.85)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'}`,
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
            {meta.label}
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
    const style: React.CSSProperties = isClient
        ? {
            background: isDark ? 'rgba(251, 191, 36, 0.14)' : 'rgba(217, 119, 6, 0.10)',
            color: isDark ? '#fcd34d' : '#b45309',
            border: `1px solid ${isDark ? 'rgba(251,191,36,0.35)' : 'rgba(217,119,6,0.30)'}`,
        }
        : {
            background: isDark ? 'rgba(96, 165, 250, 0.14)' : 'rgba(37, 99, 235, 0.10)',
            color: isDark ? '#93c5fd' : '#1d4ed8',
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
    const chipStyle: React.CSSProperties = {
        background: isDark ? 'rgba(91,155,213,0.12)' : 'rgba(0,0,0,0.05)',
        color: isDark ? '#8cbdea' : '#4a3f35',
        border: `1px solid ${isDark ? 'rgba(91,155,213,0.22)' : 'rgba(0,0,0,0.06)'}`,
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
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.65)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                >
                    <div
                        className="text-2xl font-bold leading-tight tracking-tight"
                        style={{color: isDark ? '#f8fafc' : '#0f172a', fontVariantNumeric: 'tabular-nums'}}
                    >
                        {m.value}
                    </div>
                    <div className="mt-0.5 text-xs" style={{color: isDark ? '#94a3b8' : '#64748b'}}>
                        {m.label}
                    </div>
                </div>
            ))}
        </div>
    );
};
