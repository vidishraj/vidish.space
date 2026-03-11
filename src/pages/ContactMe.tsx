import styles from './ContactMe.module.scss'
import Lottie from "lottie-react";
import animationData from '../assets/lottieAnimations/lastAnimation.json'
import SocialLinks from "../components/ContactLinks.tsx";
import {useThemeContext} from '../App';

export const ContactMe = () => {
    const {backgrounds} = useThemeContext();

    return (
        <section
            className={styles.section4}
            id="section5"
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                ...(backgrounds.contact ? {backgroundImage: `url('${backgrounds.contact}')`} : {}),
            }}
        >
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
