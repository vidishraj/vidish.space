import React, {useState} from 'react';

/**
 * Click-to-play embed for Loom / YouTube share URLs.
 * The heavy iframe is only created after the user clicks — a static poster
 * with a play button is rendered until then, so opening a modal tab never
 * pulls in third-party scripts up front.
 */

function toEmbedUrl(url: string): {src: string; poster?: string} | null {
    try {
        const u = new URL(url);
        // Loom: https://www.loom.com/share/<id>  →  /embed/<id>
        if (u.hostname.endsWith('loom.com')) {
            const id = u.pathname.split('/').filter(Boolean).pop();
            if (!id) return null;
            return {src: `https://www.loom.com/embed/${id}?autoplay=1&hide_owner=true&hide_share=true&hideEmbedTopBar=true`};
        }
        // YouTube: watch?v=, youtu.be/, /embed/
        if (u.hostname.endsWith('youtube.com') || u.hostname === 'youtu.be') {
            const id = u.hostname === 'youtu.be'
                ? u.pathname.slice(1)
                : u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop();
            if (!id) return null;
            return {
                src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
                poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            };
        }
        return {src: url};
    } catch {
        return null;
    }
}

export const VideoEmbed: React.FC<{url: string; title?: string; poster?: string; isDark?: boolean}> = ({
    url,
    title = 'Project demo video',
    poster,
    isDark = false,
}) => {
    const [playing, setPlaying] = useState(false);
    const embed = toEmbedUrl(url);
    if (!embed) return null;
    const posterSrc = poster || embed.poster;

    return (
        <div
            className="relative w-full overflow-hidden rounded-lg shadow-lg"
            style={{
                aspectRatio: '16 / 9',
                background: isDark ? '#0b1220' : '#e2e8f0',
            }}
        >
            {playing ? (
                <iframe
                    src={embed.src}
                    title={title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0}}
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play: ${title}`}
                    className="group absolute inset-0 flex w-full items-center justify-center"
                    style={{
                        background: posterSrc
                            ? `center / cover no-repeat url("${posterSrc}")`
                            : isDark
                                ? 'linear-gradient(135deg, #1e293b, #0f172a)'
                                : 'linear-gradient(135deg, #f1f5f9, #cbd5e1)',
                        cursor: 'pointer',
                        border: 0,
                        padding: 0,
                    }}
                >
                    <span
                        className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
                        style={{
                            width: 64,
                            height: 64,
                            background: 'rgba(255,255,255,0.92)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                        }}
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="#0f172a" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                    <span
                        className="absolute bottom-3 left-3 rounded-md px-2 py-1 text-xs font-medium"
                        style={{background: 'rgba(0,0,0,0.55)', color: '#fff'}}
                    >
                        ▶ Watch demo
                    </span>
                </button>
            )}
        </div>
    );
};

export default VideoEmbed;
