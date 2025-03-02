import React, {useEffect, useRef, useState} from 'react';
import {marked} from "marked";
import '/assets/akkountantModal/akkountantModal.css?url'
import '/assets/tripsplitModal/tripsplitModal.css?url'
import '/assets/vidishSpaceModal/vidishSpaceModal.css?url'
import '/assets/leetcodeToGitModal/leetcodeToGitModal.css?url'

// Data structure for the modal
interface Section {
    title: string;
    description: string;
    imgSrc: string;
}

interface ModalData {
    title: string;
    sections: Section[];
    links?: {
        github?: string;
        designDoc?: string;
        website?: string;
    };
    // New color props for gradient
    gradientColors?: {
        color1: string;
        color2: string;
        color3: string;
    };
}

interface ModalProps {
    isOpen: boolean;
    onClose: (e: React.MouseEvent) => void;
    data: ModalData;
    darkMode?: boolean;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, data, darkMode = false}) => {
    const [activeSection, setActiveSection] = useState(0);
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Default gradient colors
    const defaultGradient = darkMode ?
        {color1: '#1e293b', color2: '#0f172a', color3: '#020617'} :
        {color1: '#f0f9ff', color2: '#e0f2fe', color3: '#bae6fd'};

    const gradientColors = data.gradientColors || defaultGradient;

    // Reset active section when modal opens and disable body scroll
    useEffect(() => {
        if (isOpen) {
            setActiveSection(0);
            // Disable body scroll
            document.body.style.overflow = 'hidden';
            // Check arrow visibility after a short delay to ensure DOM is updated
            setTimeout(checkArrowsVisibility, 100);
        } else {
            // Re-enable body scroll when modal closes
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to ensure scroll is re-enabled
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose(e as unknown as React.MouseEvent);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Check if arrows should be visible
    const checkArrowsVisibility = () => {
        const container = tabsContainerRef.current;
        if (!container) return;

        // Check if content overflows
        const hasOverflow = container.scrollWidth > container.clientWidth;

        // Show right arrow if there's overflow and not at the end
        setShowRightArrow(hasOverflow && container.scrollLeft < container.scrollWidth - container.clientWidth);

        // Show left arrow if not at the beginning
        setShowLeftArrow(container.scrollLeft > 0);
    };

    // Scroll tabs left or right
    const scrollTabs = (direction: 'left' | 'right') => {
        const container = tabsContainerRef.current;
        if (!container) return;

        const scrollAmount = 200; // Adjust scroll amount as needed
        const newScrollLeft = direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });

        // Update arrow visibility after scrolling
        setTimeout(checkArrowsVisibility, 300);
    };

    // Listen for scroll events to update arrow visibility
    useEffect(() => {
        const container = tabsContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            checkArrowsVisibility();
        };

        container.addEventListener('scroll', handleScroll);

        // Initial check
        checkArrowsVisibility();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            checkArrowsVisibility();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll to active tab when it changes
    useEffect(() => {
        const container = tabsContainerRef.current;
        if (!container) return;

        const activeTab = container.children[activeSection] as HTMLElement;
        if (!activeTab) return;

        // Calculate position to center the active tab
        const containerWidth = container.clientWidth;
        const tabWidth = activeTab.clientWidth;
        const tabLeft = activeTab.offsetLeft;

        container.scrollTo({
            left: tabLeft - (containerWidth / 2) + (tabWidth / 2),
            behavior: 'smooth'
        });

        // Update arrow visibility after scrolling
        setTimeout(checkArrowsVisibility, 300);
    }, [activeSection]);

    if (!isOpen) return null;

    // Generate gradient background style
    const gradientBackground = `linear-gradient(135deg, ${gradientColors.color1}, ${gradientColors.color2}, ${gradientColors.color3})`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Overlay - capturing all clicks */}
            <div
                className="fixed inset-0 bg-black/70 transition-opacity backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal content */}
            <div
                className="relative w-full max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden transition-all transform scale-100"
                style={{background: gradientBackground}}
            >
                {/* Header */}
                <div
                    className={`px-8 py-5 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm`}>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} tracking-tight font-serif`}>
                        {data.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className={`absolute top-5 right-5 p-0.5 rounded-full ${
                            darkMode ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' : 'hover:bg-gray-200/50 text-gray-600 hover:text-gray-800'
                        } transition-colors duration-200`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Section navigation with arrows */}
                {data.sections.length > 1 && (
                    <div
                        className={` relative ${darkMode ? 'bg-gray-900/30' : 'bg-gray-100/30'} border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm`}>
                        {/* Left navigation arrow */}
                        {showLeftArrow && (
                            <button
                                onClick={() => scrollTabs('left')}
                                className={`absolute left-0 top-[10%] bottom-0 z-10 px-1 flex items-center justify-center h-[75%] ${
                                    darkMode ? 'bg-[whitesmoke]' : 'bg-gray-300'
                                }`}
                                aria-label="Scroll tabs left"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        )}

                        {/* Tabs container */}
                        <div
                            ref={tabsContainerRef}
                            className="flex overflow-x-hidden scroll-smooth px-8"
                        >
                            {data.sections.map((section, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSection(index)}
                                    className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors${
                                        index === activeSection
                                            ? darkMode
                                                ? ' border-b-2 border-blue-400 text-blue-300 font-semibold bg-[#161f27] '
                                                : ' border-b-2 border-blue-600 text-blue-700 font-semibold'
                                            : darkMode
                                                ? ' text-white hover:text-white bg-black '
                                                : ' text-gray-700 hover:text-gray-900 '
                                    }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </div>

                        {/* Right navigation arrow */}
                        {showRightArrow && (
                            <button
                                onClick={() => scrollTabs('right')}
                                className={`absolute right-0 top-[10%] bottom-0 z-10 px-1 flex items-center justify-center h-[75%]
                                 ${
                                    darkMode ? ' bg-[whitesmoke] ' : 'bg-gray-300'
                                }`}
                                aria-label="Scroll tabs right"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Section content */}
                <div className="max-h-[70vh] overflow-y-auto backdrop-blur-sm bg-opacity-50"
                     style={{
                         background: darkMode ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.4)'
                     }}>
                    {data.sections.length > 0 && (
                        <div className="p-8">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Image */}
                                {data.sections[activeSection].imgSrc && (
                                    <div className="lg:w-1/3 flex-shrink-0 flex items-center justify-center">
                                        <img
                                            src={data.sections[activeSection].imgSrc}
                                            alt={data.sections[activeSection].title}
                                            className="w-full h-auto rounded-lg object-contain max-h-[60vh] shadow-lg"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className={data.sections[activeSection].imgSrc ? "lg:w-2/3" : "w-full"}
                                     style={{color: darkMode ? 'white' : 'black'}}>
                                    {/*<h3 className={`text-2xl font-serif font-bold mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>*/}
                                    {/*    {data.sections[activeSection].title}*/}
                                    {/*</h3>*/}
                                    <div
                                        className={`prose lg:prose-lg ${darkMode ? 'prose-invert' : ''} max-w-none ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                        dangerouslySetInnerHTML={{
                                            __html: marked(data.sections[activeSection].description),
                                        }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with links */}
                <div
                    className={`px-8 py-5 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} flex justify-between items-center backdrop-blur-sm`}
                    style={{
                        background: darkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        flexWrap: 'wrap'
                    }}
                >
                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {/* GitHub Link */}
                        {data.links?.github && (
                            <a
                                href={data.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-full ${
                                    darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                } transition-colors`}
                                aria-label="GitHub"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                        )}

                        {/* Design Doc Link */}
                        {data.links?.designDoc && (
                            <a
                                href={data.links.designDoc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-full ${
                                    darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                } transition-colors`}
                                aria-label="Design Document"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </a>
                        )}

                        {/* Website Link */}
                        {data.links?.website && (
                            <a
                                href={data.links.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-full ${
                                    darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                } transition-colors`}
                                aria-label="Website"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path
                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </a>
                        )}
                    </div>

                    {/* Page indicators and close button */}
                    <div className="flex items-center gap-6">
                        {/* Page indicators */}
                        <div className="flex items-center gap-2">
                            {data.sections.length > 1 && Array.from({length: data.sections.length}).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSection(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                        index === activeSection
                                            ? darkMode
                                                ? 'bg-blue-400 w-4'
                                                : 'bg-blue-600 w-4'
                                            : darkMode
                                                ? 'bg-gray-600 hover:bg-gray-500'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to section ${index + 1}`}
                                ></button>
                            ))}
                        </div>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                darkMode
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                            }`}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;