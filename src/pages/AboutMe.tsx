import styles from "./HeroSection.module.scss";
import {Timeline} from "../components/Timeline.tsx";
import {timelineData} from "../components/TimelineData.tsx";
import { useThemeContext } from '../App';

const TimelineSection = () => {
    const { isDarkMode } = useThemeContext();
    const data = timelineData(isDarkMode);
    
    return (
        <section id="section2" className={!isDarkMode ? styles.section2 : styles.section2Dark}>
            <Timeline
                titleClassName={styles.timelineTitle}
                data={data}
                containerClassname={styles.timelineParent}
            />
        </section>
    );
};

export default TimelineSection;