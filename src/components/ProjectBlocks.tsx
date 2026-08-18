import React from 'react';
import {marked} from 'marked';
import DOMPurify from 'dompurify';
import type {ContentBlock} from '../assets/projects/types';
import {projectTheme} from './projectTheme';
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
        style={{color: color || projectTheme(!!isDark).textMuted}}
    >
        {children}
    </span>
);

const Block: React.FC<BlockProps> = ({block, isDark, projectTitle}) => {
    const t = projectTheme(isDark);
    const hairline = t.hairline;
    const cardBg = t.panelBg;
    const muted = t.textMuted;
    const accent = t.accent;

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
                                <div className="text-sm font-semibold" style={{color: t.textPrimary}}>
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
                    <p className="mb-3 mt-1 text-sm font-semibold sm:text-base" style={{color: t.textPrimary}}>
                        {block.decision}
                    </p>
                    <Label isDark={isDark}>Why</Label>
                    <p className={`mt-1 text-sm leading-relaxed ${block.tradeoff ? 'mb-3' : ''}`} style={{color: t.textBody}}>
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
                                background: r.strong ? t.successSoftBg : cardBg,
                                borderTop: i > 0 ? `1px solid ${hairline}` : undefined,
                            }}
                        >
                            <div className="w-24 flex-shrink-0 pt-0.5">
                                <Label
                                    isDark={isDark}
                                    color={r.strong ? t.success : undefined}
                                >
                                    {r.label}
                                </Label>
                            </div>
                            <p
                                className="m-0 text-sm leading-relaxed"
                                style={{
                                    color: r.strong
                                        ? (isDark ? '#d1fae5' : '#065f46')
                                        : t.textBody,
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
            if (block.pending) {
                // Screenshot slot: visible on dev so the Overseer sees exactly
                // where each capture lands. Swap `pending` off when the real
                // asset exists at `src`.
                return (
                    <figure className="m-0">
                        <div
                            className="flex flex-col items-center justify-center gap-2 rounded-xl px-6 py-10 text-center"
                            style={{
                                border: `2px dashed ${isDark ? 'rgba(148,163,184,0.4)' : 'rgba(100,116,139,0.4)'}`,
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            }}
                        >
                            <span aria-hidden="true" style={{fontSize: 28}}>📸</span>
                            <span className="text-sm font-semibold" style={{color: t.textBody}}>
                                Screenshot slot
                            </span>
                            {block.capture && (
                                <span className="max-w-md text-sm" style={{color: muted}}>
                                    {block.capture}
                                </span>
                            )}
                            {block.src && (
                                <code
                                    className="mt-1 rounded px-2 py-1 text-xs"
                                    style={{
                                        background: t.chipBg,
                                        color: t.accentText,
                                    }}
                                >
                                    {block.src}
                                </code>
                            )}
                        </div>
                        {block.caption && (
                            <figcaption className="mt-2 text-center text-xs italic" style={{color: muted}}>
                                {block.caption}
                            </figcaption>
                        )}
                    </figure>
                );
            }
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
                                style={{maxHeight: '58vh', background: t.mediaBg}}
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
                        background: t.accentSoftBg,
                        borderLeft: `3px solid ${accent}`,
                    }}
                >
                    {block.label && (
                        <div className="mb-1">
                            <Label color={accent}>{block.label}</Label>
                        </div>
                    )}
                    <p className="m-0 text-base font-medium leading-relaxed sm:text-lg" style={{color: t.textPrimary}}>
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
