import Lottie from 'lottie-react';
import {motion} from 'framer-motion';
import {useGlobal} from '../GlobalContext'; // Adjust import path as needed

const FullPageLoader = ({animationData, message = 'Loading...'}: { animationData: unknown, message: string }) => {
    const {isToggled: isDarkMode} = useGlobal();

    return (
        <motion.div
            className={`fixed inset-0 w-full h-full flex flex-col items-center justify-center ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            style={{
                zIndex: 9999,
            }}
        >
            <div className="w-full max-w-md p-6">
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{width: '100%', height: 'auto'}}
                    rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice',
                    }}
                />
            </div>

            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2, duration: 0.4}}
            >
                <p className={`text-lg font-medium mt-4 text-center ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                    {message}
                </p>
                <div className="flex justify-center mt-2">
                    <div className="flex space-x-2">
                        {[0, 0.2, 0.4].map((delay, index) => (
                            <motion.div
                                key={index}
                                className={`w-3 h-3 rounded-full ${
                                    isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                                }`}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatDelay: 0,
                                    ease: 'easeInOut',
                                    delay,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FullPageLoader;