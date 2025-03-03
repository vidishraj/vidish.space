import styles from "./HeroSection.module.scss";
import {Timeline} from "../components/Timeline.tsx";
import {useGlobal} from "../GlobalContext.tsx";
import {timelineData} from "../components/TimelineData.tsx";

const TimelineSection = () => {
    const {isToggled} = useGlobal();
    const data = timelineData(isToggled)
    return (
        <section id="section2" className={!isToggled ? styles.section2 : styles.section2Dark}>
            <Timeline
                titleClassName={styles.timelineTitle}
                data={data}
                containerClassname={styles.timelineParent}
            />
        </section>
    );
};
export default TimelineSection;