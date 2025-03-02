import React from "react";
import {motion} from "framer-motion";
import Zap from "/assets/zap.png";
import {useGlobal} from "../GlobalContext.tsx";

interface BeamControlButtonsProps {
    onSpeedChange: (change: number) => void;
    currentSpeed: number;
    maxSpeed: number;
    minSpeed: number;
}

const BeamControlButtons: React.FC<BeamControlButtonsProps> = ({
                                                                   onSpeedChange,
                                                                   currentSpeed,
                                                                   maxSpeed,
                                                                   minSpeed
                                                               }) => {
    const {isToggled} = useGlobal()

    return (
        <div className="flex items-center justify-center space-x-4 mt-4">
            <button
                onClick={() => onSpeedChange(-1)}
                disabled={currentSpeed <= minSpeed}
                className={`flex items-center justify-center rounded-full ${
                    currentSpeed <= minSpeed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-80'
                }`}
                style={{
                    backgroundImage: "url(/assets/heroPage/slowDown.png)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '60px',
                    height: '60px'
                }}
                aria-label="Decrease beam speed"
            >
                <motion.div
                    initial={{scale: 1}}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                >
                    <span className="sr-only">Decrease speed</span>
                </motion.div>
            </button>

            <div className="flex items-center space-x-3">
                {Array.from({length: maxSpeed - minSpeed}).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center"
                    >
                        <img src={Zap} style={{
                            color: 'yellow',
                            backgroundColor: index < (currentSpeed - minSpeed) ? isToggled ? 'white' : 'white' : 'gray',
                            borderRadius: '50%'
                        }}
                             className={`mb-1 ${
                                 index < (currentSpeed - minSpeed)
                                     ? 'text-yellow-400'
                                     : 'text-gray-300'
                             }`}/>

                    </div>
                ))}
            </div>

            <button
                onClick={() => onSpeedChange(1)}
                disabled={currentSpeed >= maxSpeed}
                className={`flex items-center justify-center rounded-full ${
                    currentSpeed >= maxSpeed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-80'
                }`}
                style={{
                    backgroundImage: "url(/assets/heroPage/speedUp.png)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '60px',
                    height: '60px'
                }}
                aria-label="Increase beam speed"
            >
                <motion.div
                    initial={{scale: 1}}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                >
                    <span className="sr-only">Increase speed</span>
                </motion.div>
            </button>
        </div>
    );
};

export default BeamControlButtons;