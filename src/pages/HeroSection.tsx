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
                        alt={`Hero illustration ${i + 1}`}
                        src={src}
                        style={{
                            position: 'absolute',
                            left: `${i * 25}%`,
                        }}
                        loading={i === 0 ? 'eager' : undefined}
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
                        <TextScramble text="Full Stack Developer"/>
                    </div>
                    <SeasonPicker
                        currentSeason={season}
                        onSeasonChange={setSeason}
                    />
                </div>
            </BackgroundBeamsWithCollision>
        </section>
    );
};

export default HeroSection;
