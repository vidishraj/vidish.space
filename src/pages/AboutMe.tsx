import styles from "./HeroSection.module.scss";
import {Timeline} from "../components/Timeline.tsx";
import {timelineData} from "../components/TimelineData.tsx";
import {useThemeContext} from '../App';
import {CSSProperties} from "react";

const summerTimelineGradient: CSSProperties = {
    background: 'linear-gradient(170deg, #fcf3ea 0%, #fdf5ee 15%, #fdf7f2 30%, #fef9f5 45%, #fefbf8 60%, #fffdfa 75%, #fffefc 90%, #fffffe 100%)',
};

const TimelineSection = () => {
    const {season, backgrounds, palette} = useThemeContext();
    const data = timelineData(season);

    const winterTimelineGradient: CSSProperties = {
        background: 'linear-gradient(170deg, #8ca8c2 0%, #87a4bf 15%, #82a0bc 30%, #7d9cb9 45%, #7898b6 60%, #7394b3 75%, #6e90b0 90%, #698cad 100%)',
    };

    const sectionStyle: CSSProperties = season === 'summer'
        ? summerTimelineGradient
        : season === 'winter'
            ? winterTimelineGradient
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
