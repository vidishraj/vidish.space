import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

interface ImageToggleButtonProps {
    checkedImage: string;
    uncheckedImage: string;
    initialChecked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
    width?: string;
    height?: string;
    id?: string;
    disabled?: boolean;
    ariaLabel?: string;
}

const ImageToggleButton: React.FC<ImageToggleButtonProps> = ({
                                                                 checkedImage,
                                                                 uncheckedImage,
                                                                 initialChecked = false,
                                                                 onChange,
                                                                 className = '',
                                                                 width = '60px',
                                                                 height = '30px',
                                                                 id,
                                                                 disabled = false,
                                                                 ariaLabel = 'Toggle button',
                                                             }) => {
    const [checked, setChecked] = useState<boolean>(initialChecked);
    const [toggleSize, setToggleSize] = useState({width, height});

    // Update toggle size based on viewport width
    useEffect(() => {
        const updateSize = () => {
            const viewportWidth = window.innerWidth;

            if (viewportWidth < 480) { // Mobile screens
                setToggleSize({
                    width: '55px',
                    height: '25px'
                });
            } else if (viewportWidth <= 768) { // Tablet screens
                setToggleSize({
                    width: '70px',
                    height: '27px'
                });
            } else { // Desktop screens
                setToggleSize({
                    width,
                    height
                });
            }
        };

        // Set initial size
        updateSize();

        // Add event listener for window resize
        window.addEventListener('resize', updateSize);

        // Cleanup
        return () => window.removeEventListener('resize', updateSize);
    }, [width, height]);

    const handleToggle = () => {
        if (disabled) return;
        const newChecked = !checked;
        setChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    // Calculate knob size and position based on current toggle dimensions
    const knobSize = parseInt(toggleSize.height) * 0.8;
    const knobSizeString = `${knobSize}px`;

    return (
        <button
            id={id}
            className={`relative outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${className}`}
            style={{
                width: toggleSize.width,
                height: toggleSize.height,
                backgroundImage: `url(${checked ? checkedImage : uncheckedImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '999px',
                padding: 0,
                border: 'none',
                overflow: 'hidden',
            }}
            onClick={handleToggle}
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            type="button"
        >
            <motion.div
                className="absolute bg-white rounded-full shadow-md"
                style={{
                    width: knobSizeString,
                    height: knobSizeString,
                    top: `${(parseInt(toggleSize.height) - knobSize) / 2}px`,
                }}
                initial={false}
                animate={{
                    x: checked
                        ? `calc(${toggleSize.width} - ${knobSizeString} - ${(parseInt(toggleSize.height) - knobSize) / 2}px)`
                        : `${(parseInt(toggleSize.height) - knobSize) / 2}px`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            />
        </button>
    );
};

export default ImageToggleButton;