import styles from './ContactMe.module.scss'
import Lottie from "lottie-react";
import animationData from '../assets/lottieAnimations/lastAnimation.json'
import {useGlobal} from "../GlobalContext.tsx";
import SocialLinks from "../components/ContactLinks.tsx";

export const ContactMe = () => {
    const {isToggled} = useGlobal();
    return (

        <section className={!isToggled ? styles.section4 : `${styles.section4Dark} ${styles.section4}`}
                 id="section4"
                 style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            {/* Your section 4 content */}
            <div className={"flex item-center justify-center"} style={{height: '60vh', backgroundColor: ''}}>
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