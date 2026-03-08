import styles from './ContactMe.module.scss'
import Lottie from "lottie-react";
import animationData from '../assets/lottieAnimations/lastAnimation.json'
import SocialLinks from "../components/ContactLinks.tsx";
import { useThemeContext } from '../App';

export const ContactMe = () => {
    const { isDarkMode } = useThemeContext();
    
    return (
        <section className={!isDarkMode ? styles.section4 : `${styles.section4Dark} ${styles.section4}`}
                 id="section4"
                 style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <div className={"flex items-center justify-center"} style={{height: '60vh'}}>
                <SocialLinks/>
            </div>
            <Lottie animationData={animationData}
                    style={{
                        alignSelf: 'flex-end',
                        height: '40vh',
                        width: '100vw',
                    }}/>
        </section>
    );
};

export default ContactMe;