import styles from "./HeroSection.module.scss";
import {Timeline} from "../components/Timeline.tsx";
import {timelineData} from "../components/TimelineData.tsx";
import {useThemeContext} from '../App';
import {CSSProperties} from "react";

// Summer uses tiled timeline backgrounds
const summerTimelineBg: CSSProperties = {
    backgroundImage: [
        "url('/assets/timelineBG/bg1.png')",
        "url('/assets/timelineBG/bg2.png')",
        "url('/assets/timelineBG/bg3.png')",
        "url('/assets/timelineBG/bg4.png')",
        "url('/assets/timelineBG/bg5.png')",
    ].join(', '),
    backgroundPosition: '0% 0%, 0% 25%, 0% 50%, 0% 75%, 0% 100%',
    backgroundSize: '100% 25%, 100% 25%, 100% 25%, 100% 25%, 100% 25%',
    backgroundRepeat: 'no-repeat',
};

const TimelineSection = () => {
    const {season, backgrounds, palette} = useThemeContext();
    const data = timelineData(season);

    const sectionStyle: CSSProperties = season === 'summer'
        ? summerTimelineBg
        : backgrounds.timeline
            ? {backgroundImage: `url('${backgrounds.timeline}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}
            : {};

    return (
        <section
            id="section3"
            className={styles.section2}
            style={{
                ...sectionStyle,
                color: palette.textPrimary,
            }}
        >
            <Timeline
                titleClassName={styles.timelineTitle}
                data={data}
                containerClassname={styles.timelineParent}
            />
        </section>
    );
};

export default TimelineSection;
