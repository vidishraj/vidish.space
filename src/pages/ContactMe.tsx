import styles from './ContactMe.module.scss'
import Lottie from "lottie-react";
import animationData from '../assets/lottieAnimations/lastAnimation.json'
import SocialLinks from "../components/ContactLinks.tsx";
import {useThemeContext} from '../App';

export const ContactMe = () => {
    const {season, backgrounds} = useThemeContext();

    const winterContactBg = season === 'winter' && !backgrounds.contact
        ? {background: 'linear-gradient(170deg, #467098 0%, #3f6590 15%, #385a88 30%, #314f80 45%, #2a4478 60%, #233970 75%, #1c2e68 90%, #152360 100%)'}
        : {};

    return (
        <section
            className={styles.section4}
            id="section5"
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                ...(backgrounds.contact ? {backgroundImage: `url('${backgrounds.contact}')`} : winterContactBg),
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
