import Lottie from 'lottie-react';
import {motion} from 'framer-motion';
import { useThemeContext } from '../App';

const FullPageLoader = ({animationData, message = 'Loading...'}: { animationData: unknown, message: string }) => {
    const { isDarkMode } = useThemeContext();

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
            <p className={`text-lg mt-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {message}
            </p>
        </motion.div>
    );
};

export default FullPageLoader;