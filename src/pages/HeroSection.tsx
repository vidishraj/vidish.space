import styles from './HeroSection.module.scss';
import {TextScramble} from "../components/TextScramble.tsx";
import {BackgroundBeamsWithCollision} from "../components/BackgroundBeams.tsx";
import SeasonPicker from "../components/SeasonPicker.tsx";
import {useThemeContext} from '../App';

const HeroSection = () => {
    const {season, setSeason, palette, particleMode, heroImages, backgrounds} = useThemeContext();

    const isMonsoon = season === 'monsoon';
    const isSummer = season === 'summer';

    const heroBottomBg = backgrounds.heroBottom || undefined;

    return (
        <section id="section1">
            <div
                className={`${styles.iconContainer} ${isMonsoon ? styles.monsoonMode : styles.defaultMode}`}
                style={{
                    background: backgrounds.heroTop,
                    '--hero-fade-color': isSummer ? '#5f443a' : isMonsoon ? '#0a0f1a' : '#cddcea',
                } as React.CSSProperties}
            >
                {heroImages.map((src, i) => (
                    <img
                        key={`hero-${season}-${i}`}
                        alt=""
                        aria-hidden="true"
                        src={src}
                        style={{
                            position: 'absolute',
                            left: `${i * 25}%`,
                        }}
                        loading={i === 0 ? 'eager' : undefined}
                        onError={(e) => {
                            e.currentTarget.style.visibility = 'hidden';
                        }}
                        className={styles.icon}
                    />
                ))}
            </div>
            <BackgroundBeamsWithCollision
                particleMode={particleMode}
                className={styles.textContainer}
                style={heroBottomBg ? {background: heroBottomBg} : undefined}
            >
                <div style={{
                    color: palette.textPrimary,
                    textAlign: 'center',
                    background: isMonsoon ? '#161f27' : undefined,
                }}>
                    <h1 id="startPoint" className={styles.title}>
                        <TextScramble text="Vidish Raj"/>
                    </h1>
                    <div className={styles.description}>
                        <TextScramble text="Full-Stack Developer · AI & Agentic Systems"/>
                    </div>
                    <SeasonPicker
                        currentSeason={season}
                        onSeasonChange={setSeason}
                    />

                    {/* Conversion layer: what I do, proof, and the next step. */}
                    <p className={styles.heroPitch} style={{color: palette.textSecondary}}>
                        I build complete products solo: backend, mobile, AI, and the
                        infrastructure they run on.
                    </p>

                    <div
                        className={styles.heroAvailability}
                        style={{
                            color: palette.textPrimary,
                            border: `1px solid ${isMonsoon ? 'rgba(52,211,153,0.4)' : 'rgba(5,150,105,0.35)'}`,
                            background: isMonsoon ? 'rgba(52,211,153,0.08)' : 'rgba(5,150,105,0.07)',
                        }}
                    >
                        <span className={styles.heroDot} aria-hidden="true"/>
                        Available for projects
                    </div>

                    <div className={styles.heroCtas}>
                        <a
                            href="#section4"
                            className={styles.heroCta}
                            style={{background: palette.accent, color: isMonsoon ? '#0a0f1a' : '#ffffff'}}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('section4')?.scrollIntoView({behavior: 'smooth'});
                            }}
                        >
                            See the work →
                        </a>
                        <a
                            href="#section5"
                            className={styles.heroCta}
                            style={{
                                color: palette.textPrimary,
                                border: `1px solid ${palette.textSecondary}`,
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('section5')?.scrollIntoView({behavior: 'smooth'});
                            }}
                        >
                            Start a project
                        </a>
                    </div>

                    <div className={styles.heroProof} style={{color: palette.textSecondary}}>
                        <span>10+ clients</span>
                        <span aria-hidden="true">·</span>
                        <span>2 apps shipped to the App Store</span>
                        <span aria-hidden="true">·</span>
                        <span>3.5 yrs banking infrastructure</span>
                        <span aria-hidden="true">·</span>
                        <span>AI agents in production</span>
                    </div>

                    <div className={styles.scrollHint} aria-hidden="true" style={{color: palette.textPrimary}}/>
                </div>
            </BackgroundBeamsWithCollision>
        </section>
    );
};

export default HeroSection;
