// LandingPage.tsx
import {motion} from 'framer-motion';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
    const text1 = "Hello, I am Vidish!";
    const text2 = "Welcome to my page!";

    const containerVariants = {
        initial: {opacity: 0},
        animate: {
            opacity: 1,
            transition: {duration: 1}
        }
    };

    const textVariants = {
        initial: {width: 0},
        animate: (custom: number) => ({
            width: "100%",
            transition: {
                delay: custom,
                duration: 2,
                ease: "easeOut"
            }
        })
    };

    return (
        <motion.div
            className={styles.landingContainer}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <div className={styles.textContainer}>
                <div className={styles.textWrapper}>
                    <motion.div
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        custom={0}
                        className={styles.animatedText}
                    >
                        <h1 className={styles.mainText}>{text1}</h1>
                    </motion.div>
                </div>
                <div className={styles.textWrapper}>
                    <motion.div
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        custom={2}
                        className={styles.animatedText}
                    >
                        <h2 className={styles.subText}>{text2}</h2>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default LandingPage;