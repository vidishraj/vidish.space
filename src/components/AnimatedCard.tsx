import React, {ReactNode, useEffect} from 'react';
import {motion, useAnimation, useScroll, useTransform} from 'framer-motion';
import {Season} from '../utils/seasonConfig';

interface AnimatedCardProps {
    title: string;
    description: string;
    image?: string;
    season?: Season;
    className?: string;
    children?: ReactNode;
    clickEvent: (e: React.MouseEvent) => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
                                                       title,
                                                       description,
                                                       image,
                                                       season = 'summer',
                                                       className = '',
                                                       children,
                                                       clickEvent
                                                   }) => {
    const controls = useAnimation();
    const {scrollYProgress} = useScroll();
    const isMonsoon = season === 'monsoon';

    // Transform values based on scroll position
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

    const cardStyle = {
        backgroundColor: isMonsoon ? "#1E1E1E" : 'white',
        borderColor: isMonsoon ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        boxShadow: isMonsoon
            ? '0 4px 12px rgba(0, 0, 0, 0.5)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const
    };

    useEffect(() => {
        controls.start({
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.1
            }
        });
    }, [controls]);

    return (
        <motion.div
            className={`rounded-lg overflow-hidden h-full ${className}`}
            initial={{y: 0, opacity: 0}}
            animate={controls}
            style={{...cardStyle, scale, opacity}}
            whileHover={{
                y: -8,
                boxShadow: isMonsoon
                    ? '0 10px 25px rgba(0, 0, 0, 0.7)'
                    : '0 10px 25px rgba(0, 0, 0, 0.1)',
                transition: {type: "spring", stiffness: 400, damping: 17}
            }}
            onClick={clickEvent}
        >
            {image && (
                <motion.div
                    className="w-full h-48 overflow-hidden"
                    whileHover={{scale: 1.05}}
                    transition={{duration: 0.5}}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            )}

            <motion.div
                className="p-6 flex-grow flex flex-col"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.2}}
            >
                <motion.h3
                    className={`text-xl font-semibold mb-2 ${isMonsoon ? 'text-blue-300' : 'text-blue-600'}`}
                    initial={{x: -20}}
                    animate={{x: 0}}
                    transition={{type: "spring", stiffness: 100}}
                >
                    {title}
                </motion.h3>

                <motion.p
                    className={`mb-4 ${isMonsoon ? 'text-gray-100' : 'text-gray-700'} flex-grow`}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3}}
                >
                    {description}
                </motion.p>

                {children}
            </motion.div>
        </motion.div>
    );
};

export default AnimatedCard;
