import {ReactNode} from "react";
import {motion} from "framer-motion";

export const AnimatedText = ({children, className, delay = 0}: {
    children: ReactNode,
    className?: string,
    delay: number
}) => {
    return (
        <motion.div
            className={className || ""}
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.7, delay: delay}}
            viewport={{once: true}}
        >
            {children}
        </motion.div>
    );
};