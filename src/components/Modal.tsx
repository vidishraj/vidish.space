import React, {useEffect, useRef, useState} from 'react';
import {marked} from "marked";
import DOMPurify from "dompurify";
import '../assets/modalStyles/akkountantModal.css'
import '../assets/modalStyles/tripsplitModal.css'
import '../assets/modalStyles/vidishSpaceModal.css'
import '../assets/modalStyles/leetcodeToGitModal.css'
import {Season} from '../utils/seasonConfig';
import {useFocusTrap} from '../utils/useFocusTrap';

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
    gradientColors?: {
        color1: string;
        color2: string;
        color3: string;
    };
}

interface ModalProps {
    isOpen: boolean;
    onClose: (e: React.MouseEvent | KeyboardEvent) => void;
    data: ModalData;
    season?: Season;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, data, season = 'summer'}) => {
    const [activeSection, setActiveSection] = useState(0);
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    useFocusTrap(isOpen, dialogRef);

    const isMonsoon = season === 'monsoon';

    // Default gradient colors based on season
    const defaultGradient = isMonsoon ?
        {color1: '#1e293b', color2: '#0f172a', color3: '#020617'} :
        {color1: '#f0f9ff', color2: '#e0f2fe', color3: '#bae6fd'};

    const gradientColors = data.gradientColors || defaultGradient;

    useEffect(() => {
        if (isOpen) {
            setActiveSection(0);
            document.body.style.overflow = 'hidden';
            setTimeout(checkArrowsVisibility, 100);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose(e);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const checkArrowsVisibility = () => {
        const container = tabsContainerRef.current;
        if (!container) return;
        const hasOverflow = container.scrollWidth > container.clientWidth;
        setShowRightArrow(hasOverflow && container.scrollLeft < container.scrollWidth - container.clientWidth);
        setShowLeftArrow(container.scrollLeft > 0);
    };

    const scrollTabs = (direction: 'left' | 'right') => {
        const container = tabsContainerRef.current;
        if (!container) return;
        const scrollAmount = 200;
        const newScrollLeft = direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;
        container.scrollTo({left: newScrollLeft, behavior: 'smooth'});
        setTimeout(checkArrowsVisibility, 300);
    };

    useEffect(() => {
        const container = tabsContainerRef.current;
        if (!container) return;
        const handleScroll = () => checkArrowsVisibility();
        container.addEventListener('scroll', handleScroll);
        checkArrowsVisibility();
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => checkArrowsVisibility();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const container = tabsContainerRef.current;
        if (!container) return;
        const activeTab = container.children[activeSection] as HTMLElement;
        if (!activeTab) return;
        const containerWidth = container.clientWidth;
        const tabWidth = activeTab.clientWidth;
        const tabLeft = activeTab.offsetLeft;
        container.scrollTo({
            left: tabLeft - (containerWidth / 2) + (tabWidth / 2),
            behavior: 'smooth'
        });
        setTimeout(checkArrowsVisibility, 300);
    }, [activeSection]);

    if (!isOpen) return null;

    const gradientBackground = `linear-gradient(135deg, ${gradientColors.color1}, ${gradientColors.color2}, ${gradientColors.color3})`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/70 transition-opacity backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
                className="relative mx-auto rounded-lg shadow-2xl overflow-hidden transition-all transform scale-100 w-[100vw] h-[75vh] max-h-[75vh] md:max-w-4xl"
                style={{background: gradientBackground}}
            >
                {/* Header */}
                <div
                    className={`px-4 sm:px-8 py-3 sm:py-5 border-b ${isMonsoon ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm flex items-center justify-between`}>
                    <h2 id="modal-title" className={`text-xl sm:text-2xl font-bold ${isMonsoon ? 'text-white' : 'text-gray-800'} tracking-tight font-serif truncate pr-10`}>
                        {data.title}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className={`p-0.5 rounded-full ${
                            isMonsoon ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' : 'hover:bg-gray-200/50 text-gray-600 hover:text-gray-800'
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
                        className={`relative ${isMonsoon ? 'bg-gray-900/30' : 'bg-gray-100/30'} border-b ${isMonsoon ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm`}>
                        {showLeftArrow && (
                            <button
                                onClick={() => scrollTabs('left')}
                                className={`absolute left-0 top-[10%] bottom-0 z-10 px-1 flex items-center justify-center h-[75%] ${
                                    isMonsoon ? 'bg-[whitesmoke]' : 'bg-gray-300'
                                }`}
                                aria-label="Scroll tabs left"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        )}

                        <div
                            ref={tabsContainerRef}
                            className="flex overflow-x-hidden scroll-smooth px-4 sm:px-8"
                        >
                            {data.sections.map((section, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSection(index)}
                                    className={`px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors${
                                        index === activeSection
                                            ? isMonsoon
                                                ? ' border-b-2 border-blue-400 text-blue-300 font-semibold bg-[#161f27] '
                                                : ' border-b-2 border-blue-600 text-blue-700 font-semibold bg-[whitesmoke]'
                                            : isMonsoon
                                                ? ' text-white hover:text-white bg-black '
                                                : ' text-gray-700 hover:text-gray-900 bg-[white]'
                                    }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </div>

                        {showRightArrow && (
                            <button
                                onClick={() => scrollTabs('right')}
                                className={`absolute right-0 top-[10%] bottom-0 z-10 px-1 flex items-center justify-center h-[75%]
                                 ${
                                    isMonsoon ? ' bg-[whitesmoke] ' : 'bg-gray-300'
                                }`}
                                aria-label="Scroll tabs right"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Section content */}
                <div className="h-[calc(75vh-12rem)] overflow-y-auto backdrop-blur-sm bg-opacity-50"
                     style={{
                         background: isMonsoon ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.4)'
                     }}>
                    {data.sections.length > 0 && (
                        <div className="p-4 sm:p-8">
                            <div className="flex flex-col md:flex-row gap-4 sm:gap-8 h-full">
                                {data.sections[activeSection].imgSrc && (
                                    <div className="md:w-1/2 flex-shrink-0 flex items-start justify-center">
                                        <img
                                            src={data.sections[activeSection].imgSrc}
                                            alt={data.sections[activeSection].title}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                            className="w-full h-auto rounded-lg object-contain max-h-[25vh] md:max-h-[40vh] min-h-[-webkit-fill-available] shadow-lg"
                                        />
                                    </div>
                                )}

                                <div className="md:w-1/2" style={{color: isMonsoon ? 'white' : 'black'}}>
                                    <div
                                        className={`prose max-w-none text-sm sm:text-base ${isMonsoon ? 'prose-invert' : ''} ${isMonsoon ? 'text-gray-200' : 'text-gray-700'}`}
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(marked(data.sections[activeSection].description) as string),
                                        }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with links */}
                <div
                    className={`px-4 sm:px-8 py-3 sm:py-5 border-t ${isMonsoon ? 'border-gray-700/50' : 'border-gray-200/50'} flex justify-between items-center backdrop-blur-sm`}
                    style={{
                        background: isMonsoon ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        flexWrap: 'wrap'
                    }}
                >
                    <div className="flex items-center gap-3 sm:gap-4">
                        {data.links?.github && (
                            <a
                                href={data.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-1 sm:p-2 rounded-full ${
                                    isMonsoon ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                } transition-colors`}
                                aria-label="GitHub"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                        )}

                        {data.links?.designDoc && (
                            <a
                                href={data.links.designDoc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-1 sm:p-2 rounded-full ${
                                    isMonsoon ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                } transition-colors`}
                                aria-label="Design Document"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
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

                        {data.links?.website && (
                            <a
                                href={data.links.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-1 sm:p-2 rounded-full ${
                                    isMonsoon ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                } transition-colors`}
                                aria-label="Website"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
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

                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-1 sm:gap-2">
                            {data.sections.length > 1 && Array.from({length: data.sections.length}).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSection(index)}
                                    className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                                        index === activeSection
                                            ? isMonsoon
                                                ? 'bg-blue-400 w-3 sm:w-4'
                                                : 'bg-blue-600 w-3 sm:w-4'
                                            : isMonsoon
                                                ? 'bg-gray-600 hover:bg-gray-500'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to section ${index + 1}`}
                                ></button>
                            ))}
                        </div>

                        <button
                            onClick={onClose}
                            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
                                isMonsoon
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
