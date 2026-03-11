import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Zap from "/assets/zap.png";

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
    const [buttonSize, setButtonSize] = useState("60px");
    const [zapSize, setZapSize] = useState("24px");
    const [spacing, setSpacing] = useState("space-x-4");

    useEffect(() => {
        const updateSizes = () => {
            const viewportWidth = window.innerWidth;

            if (viewportWidth < 480) {
                setButtonSize("45px");
                setZapSize("18px");
                setSpacing("space-x-2");
            } else if (viewportWidth < 768) {
                setButtonSize("50px");
                setZapSize("20px");
                setSpacing("space-x-3");
            } else {
                setButtonSize("45px");
                setZapSize("22px");
                setSpacing("space-x-4");
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, []);

    return (
        <div className={`flex items-center justify-center ${spacing} mt-4`}>
            <button
                onClick={() => onSpeedChange(-1)}
                disabled={currentSpeed <= minSpeed}
                className={`flex items-center justify-center rounded-full ${
                    currentSpeed <= minSpeed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-80'
                }`}
                style={{
                    backgroundImage: "url(/assets/heroPage/slowDown.webp)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: buttonSize,
                    height: buttonSize
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

            <div className={`flex items-center ${spacing.replace('4', '2')}`}>
                {Array.from({length: maxSpeed - minSpeed}).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img
                            src={Zap}
                            alt={`Speed level ${index + 1}`}
                            style={{
                                width: zapSize,
                                height: zapSize,
                                color: 'yellow',
                                backgroundColor: index < (currentSpeed - minSpeed) ? 'white' : 'gray',
                                borderRadius: '50%'
                            }}
                            className={`mb-1 ${
                                index < (currentSpeed - minSpeed)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                        />
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
                    backgroundImage: "url(/assets/heroPage/speedUp.webp)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: buttonSize,
                    height: buttonSize
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
