import React, {useState} from 'react';
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

    const handleToggle = () => {
        if (disabled) return;

        const newChecked = !checked;
        setChecked(newChecked);

        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <button
            id={id}
            className={`relative outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            style={{
                width,
                height,
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
                className="absolute top-1 h-[2.5rem] w-[2.5rem] rounded-full bg-white shadow-md"
                initial={false}
                animate={{
                    x: checked ? `calc(110px)` : '2px',
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