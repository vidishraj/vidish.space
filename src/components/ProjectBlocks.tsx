import React from 'react';
import {marked} from 'marked';
import DOMPurify from 'dompurify';
import type {ContentBlock} from '../assets/projects/types';
import VideoEmbed from './VideoEmbed';

export const renderMarkdown = (md: string): string =>
    DOMPurify.sanitize(marked(md, {async: false}) as string);

interface BlockProps {
    block: ContentBlock;
    isDark: boolean;
    projectTitle: string;
}

const Label: React.FC<{children: React.ReactNode; color?: string; isDark?: boolean}> = ({children, color, isDark}) => (
    <span
        className="text-[11px] font-bold uppercase tracking-widest"
        style={{color: color || (isDark ? '#94a3b8' : '#64748b')}}
    >
        {children}
    </span>
);

const Block: React.FC<BlockProps> = ({block, isDark, projectTitle}) => {
    const hairline = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.08)';
    const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)';
    const muted = isDark ? '#94a3b8' : '#64748b';
    const accent = isDark ? '#60a5fa' : '#2563eb';

    switch (block.type) {
        case 'text':
            return (
                <div
                    className={`prose max-w-none text-sm sm:text-base ${isDark ? 'prose-invert text-gray-200' : 'text-gray-700'}`}
                    dangerouslySetInnerHTML={{__html: renderMarkdown(block.md)}}
                />
            );

        case 'features':
            return (
                <ul className={`grid gap-3 ${block.items.length > 4 ? 'sm:grid-cols-2' : ''}`} style={{listStyle: 'none', padding: 0, margin: 0}}>
                    {block.items.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 rounded-lg px-4 py-3"
                            style={{background: cardBg, border: `1px solid ${hairline}`}}
                        >
                            {item.icon && (
                                <span aria-hidden="true" className="mt-0.5 text-lg leading-none">{item.icon}</span>
                            )}
                            <div className="min-w-0">
                                <div className="text-sm font-semibold" style={{color: isDark ? '#f1f5f9' : '#0f172a'}}>
                                    {item.title}
                                </div>
                                {item.body && (
                                    <div className="mt-0.5 text-sm leading-relaxed" style={{color: muted}}>
                                        {item.body}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            );

        case 'decision':
            return (
                <div
                    className="rounded-lg px-5 py-4"
                    style={{background: cardBg, border: `1px solid ${hairline}`, borderLeft: `3px solid ${accent}`}}
                >
                    <Label color={accent}>Decision</Label>
                    <p className="mb-3 mt-1 text-sm font-semibold sm:text-base" style={{color: isDark ? '#f1f5f9' : '#0f172a'}}>
                        {block.decision}
                    </p>
                    <Label isDark={isDark}>Why</Label>
                    <p className={`mt-1 text-sm leading-relaxed ${block.tradeoff ? 'mb-3' : ''}`} style={{color: isDark ? '#cbd5e1' : '#334155'}}>
                        {block.why}
                    </p>
                    {block.tradeoff && (
                        <>
                            <Label isDark={isDark}>Tradeoff</Label>
                            <p className="mt-1 text-sm leading-relaxed" style={{color: muted}}>
                                {block.tradeoff}
                            </p>
                        </>
                    )}
                </div>
            );

        case 'challenge': {
            const rows: {label: string; text: string; strong?: boolean}[] = [
                {label: 'Problem', text: block.problem},
                {label: 'Approach', text: block.approach},
                {label: 'Result', text: block.result, strong: true},
            ];
            return (
                <div className="overflow-hidden rounded-lg" style={{border: `1px solid ${hairline}`}}>
                    {rows.map((r, i) => (
                        <div
                            key={r.label}
                            className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:gap-6"
                            style={{
                                background: r.strong
                                    ? (isDark ? 'rgba(52,211,153,0.08)' : 'rgba(16,185,129,0.07)')
                                    : cardBg,
                                borderTop: i > 0 ? `1px solid ${hairline}` : undefined,
                            }}
                        >
                            <div className="w-24 flex-shrink-0 pt-0.5">
                                <Label
                                    isDark={isDark}
                                    color={r.strong ? (isDark ? '#34d399' : '#059669') : undefined}
                                >
                                    {r.label}
                                </Label>
                            </div>
                            <p
                                className="m-0 text-sm leading-relaxed"
                                style={{
                                    color: r.strong
                                        ? (isDark ? '#d1fae5' : '#065f46')
                                        : (isDark ? '#cbd5e1' : '#334155'),
                                    fontWeight: r.strong ? 500 : 400,
                                }}
                            >
                                {r.text}
                            </p>
                        </div>
                    ))}
                </div>
            );
        }

        case 'figure':
            return (
                <figure className="m-0">
                    {block.videoUrl ? (
                        <VideoEmbed
                            url={block.videoUrl}
                            title={`${projectTitle} — ${block.caption || 'demo'}`}
                            poster={block.src}
                            isDark={isDark}
                        />
                    ) : block.src ? (
                        <div className="overflow-hidden rounded-xl" style={{border: `1px solid ${hairline}`}}>
                            <img
                                src={block.src}
                                alt={block.alt || block.caption || ''}
                                loading="lazy"
                                className="w-full object-contain"
                                style={{maxHeight: '58vh', background: isDark ? '#0b1220' : '#f8fafc'}}
                                onError={(e) => {
                                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                                }}
                            />
                        </div>
                    ) : null}
                    {block.caption && (
                        <figcaption className="mt-2 text-center text-xs italic" style={{color: muted}}>
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case 'callout':
            return (
                <div
                    className="rounded-lg px-5 py-4"
                    style={{
                        background: isDark ? 'rgba(96,165,250,0.09)' : 'rgba(37,99,235,0.06)',
                        borderLeft: `3px solid ${accent}`,
                    }}
                >
                    {block.label && (
                        <div className="mb-1">
                            <Label color={accent}>{block.label}</Label>
                        </div>
                    )}
                    <p className="m-0 text-base font-medium leading-relaxed sm:text-lg" style={{color: isDark ? '#e2e8f0' : '#1e293b'}}>
                        {block.text}
                    </p>
                </div>
            );

        default:
            return null;
    }
};

export const ProjectBlockList: React.FC<{blocks: ContentBlock[]; isDark: boolean; projectTitle: string}> = ({
    blocks,
    isDark,
    projectTitle,
}) => (
    <div className="space-y-5">
        {blocks.map((b, i) => (
            <Block key={i} block={b} isDark={isDark} projectTitle={projectTitle} />
        ))}
    </div>
);

export default ProjectBlockList;
