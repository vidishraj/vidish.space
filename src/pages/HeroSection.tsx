import {useRef, useState} from "react";
import {LottieRefCurrentProps} from "lottie-react";
import Icon1 from '../assets/heroPage/l1.webp';
import Icon2 from '../assets/heroPage/l2.webp';
import Icon3 from '../assets/heroPage/l3.webp';
import Icon4 from '../assets/heroPage/l4.webp';
import IconD1 from '../assets/heroPage/lm1.webp';
import IconD2 from '../assets/heroPage/lm2.webp';
import IconD3 from '../assets/heroPage/lm3.webp';
import IconD4 from '../assets/heroPage/lm4.webp';
import styles from './HeroSection.module.scss';
import {TextScramble} from "../components/TextScramble.tsx";
import {BackgroundBeamsWithCollision} from "../components/BackgroundBeams.tsx";
import ImageToggleButton from "../components/ImageToggleButton.tsx";
import {useGlobal} from "../GlobalContext.tsx";
import BeamControlButtons from "../components/BeamControlButtons.tsx";

const HeroSection = () => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    // Default speed is 5 (middle of 1-8 range)
    const [beamSpeed, setBeamSpeed] = useState(5);
    // Default beam count
    const [beamCount, setBeamCount] = useState(50);
    const {isToggled, setIsToggled} = useGlobal()
    const handleToggle = () => {
        if (lottieRef.current) {
            if (isToggled) {
                lottieRef.current.playSegments([80, 20], true);
            } else {
                lottieRef.current.playSegments([50, 100], true);
            }
        }
        setIsToggled(!isToggled);
    };

    // Handle speed changes
    const handleSpeedChange = (change: number) => {
        setBeamSpeed(prevSpeed => {
            // Ensure speed stays within 1-8 range
            const newSpeed = prevSpeed + change;
            return Math.max(1, Math.min(8, newSpeed));
        });

        // Adjust beam count based on speed
        // More beams when faster, fewer when slower
        setBeamCount(() => {
            const baseCount = 50;
            const newSpeed = beamSpeed + change;
            // Adjust count by 5 beams per speed level from the middle (50 at speed 5)
            const adjustment = (newSpeed - 5) * 5;
            return baseCount + adjustment;
        });
    };

    return (
        <section id="section1" style={{}}>
            <div className={isToggled ? `${styles.iconContainer} ${styles.darkMode}` : styles.iconContainer}>
                <img alt={'img1'} src={IconD1}
                     style={{
                         display: isToggled ? 'block' : 'none',
                         position: 'absolute',
                         left: 0
                     }}
                     className={styles.icon}/>
                <img alt={'img1'} src={IconD2} style={{
                    display: isToggled ? 'block' : 'none',
                    position: 'absolute',
                    left: "25%"
                }}
                     className={styles.icon}/>
                <img alt={'img1'} src={IconD3} style={{
                    display: isToggled ? 'block' : 'none',
                    position: 'absolute',
                    left: "50%"
                }}
                     className={styles.icon}/>
                <img alt={'img1'} src={IconD4} style={{
                    display: isToggled ? 'block' : 'none',
                    position: 'absolute',
                    left: "75%"
                }}
                     className={styles.icon}/>
                <img alt={'img1'} src={Icon1}
                     style={{
                         display: !isToggled ? 'block' : 'none',
                         position: 'absolute',
                         left: 0
                     }}
                     loading={'eager'}
                     className={styles.icon}/>
                <img alt={'img1'} src={Icon2}
                     style={{
                         display: !isToggled ? 'block' : 'none',
                         position: 'absolute',
                         left: "25%"
                     }}
                     className={styles.icon}/>
                <img alt={'img1'} src={Icon3}
                     style={{
                         display: !isToggled ? 'block' : 'none', position: 'absolute',
                         left: "50%"
                     }}
                     className={styles.icon}/>
                <img alt={'img1'} src={Icon4}
                     style={{
                         display: !isToggled ? 'block' : 'none', position: 'absolute',
                         left: "75%"
                     }}
                     className={styles.icon}/>
            </div>
            <BackgroundBeamsWithCollision
                lightMode={!isToggled}
                beamSpeed={beamSpeed}
                beamCount={beamCount}
                className={!isToggled ? styles.textContainer : `${styles.textContainer} ${styles.darkTextContainer}`}
            >
                <div className={!isToggled ? styles.textContainer : styles.darkContainer}>
                    <h1 id="startPoint" className={styles.title}>
                        <TextScramble text="Vidish Raj"/>
                    </h1>
                    <div className={styles.description}>
                        <TextScramble text="Full Stack Developer"/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <ImageToggleButton
                            checkedImage={"src/assets/heroPage/lightMode.png"}
                            uncheckedImage={"src/assets/heroPage/darkMode.png"}
                            onChange={handleToggle}
                            width={'150px'}
                            height={'44px'}
                            initialChecked={!isToggled}
                        />

                        {/* Add beam control buttons */}
                        <BeamControlButtons
                            onSpeedChange={handleSpeedChange}
                            currentSpeed={beamSpeed}
                            minSpeed={1}
                            maxSpeed={8}
                        />
                    </div>
                </div>
            </BackgroundBeamsWithCollision>
        </section>
    );
};


export default HeroSection;