import {useEffect, useRef, useState} from 'react';
import {useThemeContext} from '../App';

interface Day {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
    total: {lastYear?: number} & Record<string, number>;
    contributions: Day[];
}

const CACHE_KEY = 'gh-contributions-v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// GitHub's own level palettes, so the grid reads instantly as "GitHub".
const DARK_SCALE = ['rgba(255,255,255,0.07)', '#0e4429', '#006d32', '#26a641', '#39d353'];
const LIGHT_SCALE = ['rgba(0,0,0,0.08)', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

/**
 * The GitHub contribution calendar, hand-rolled: fetched from the public
 * contributions API (no new dependency), themed per season, cached for an
 * hour, and rendered as a scrollable 53-week grid. On any fetch failure it
 * renders nothing — the Contact page must never look broken because a
 * third-party endpoint had a bad day.
 */
const GithubCalendar = ({username}: {username: string}) => {
    const {season} = useThemeContext();
    const isMonsoon = season === 'monsoon';
    const [days, setDays] = useState<Day[] | null>(null);
    const [total, setTotal] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;

        const apply = (data: ApiResponse) => {
            if (cancelled) return;
            setDays(data.contributions);
            const t = data.total?.lastYear ?? Object.values(data.total ?? {})[0] ?? null;
            setTotal(typeof t === 'number' ? t : null);
        };

        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) {
                const {at, data} = JSON.parse(cached);
                if (Date.now() - at < CACHE_TTL_MS) {
                    apply(data);
                    return;
                }
            }
        } catch {
            // cache is best-effort only
        }

        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
            .then((data: ApiResponse) => {
                apply(data);
                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({at: Date.now(), data}));
                } catch {
                    // storage full/blocked: fine, we just refetch next time
                }
            })
            .catch(() => {
                // Silent: the section simply doesn't render.
            });

        return () => {
            cancelled = true;
        };
    }, [username]);

    // Most recent weeks are the interesting ones: start scrolled to the right.
    useEffect(() => {
        if (days && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [days]);

    if (!days || days.length === 0) return null;

    // Column-per-week, GitHub-style: pad the front so day-of-week rows align.
    const firstDow = new Date(days[0].date).getDay();
    const cells: (Day | null)[] = [...Array(firstDow).fill(null), ...days];
    const weeks: (Day | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    const scale = isMonsoon ? DARK_SCALE : LIGHT_SCALE;
    const panelBg = isMonsoon ? 'rgba(30,41,59,0.55)' : 'rgba(255,255,255,0.14)';
    const border = isMonsoon ? 'rgba(148,163,184,0.25)' : 'rgba(255,255,255,0.35)';
    const text = isMonsoon ? '#cbd5e1' : '#f1f5f9';

    return (
        <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${total ?? 'My'} GitHub contributions in the last year — open the GitHub profile`}
            style={{
                display: 'block',
                maxWidth: 'min(92vw, 780px)',
                padding: '1rem 1.25rem 0.9rem',
                borderRadius: 16,
                background: panelBg,
                border: `1px solid ${border}`,
                backdropFilter: 'blur(6px)',
                textDecoration: 'none',
                color: text,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '1rem',
                    marginBottom: '0.7rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                }}
            >
                <span>{total !== null ? `${total.toLocaleString()} contributions in the last year` : 'GitHub contributions'}</span>
                <span style={{opacity: 0.7, fontWeight: 500}}>@{username} ↗</span>
            </div>

            <div ref={scrollRef} style={{overflowX: 'auto', paddingBottom: 4}}>
                <div style={{display: 'flex', gap: 3, width: 'max-content'}}>
                    {weeks.map((week, wi) => (
                        <div key={wi} style={{display: 'flex', flexDirection: 'column', gap: 3}}>
                            {week.map((day, di) => (
                                <div
                                    key={di}
                                    title={day ? `${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}` : undefined}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 2,
                                        background: day ? scale[day.level] : 'transparent',
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: '0.6rem',
                    fontSize: '0.7rem',
                    opacity: 0.75,
                }}
            >
                Less
                {scale.map((c, i) => (
                    <span key={i} style={{width: 10, height: 10, borderRadius: 2, background: c, display: 'inline-block'}}/>
                ))}
                More
            </div>
        </a>
    );
};

export default GithubCalendar;
