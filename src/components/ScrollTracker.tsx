// ScrollTracker.jsx
import {useEffect, useState} from 'react';
import styles from './ScrollTracker.module.scss';
import {useGlobal} from "../GlobalContext.tsx";
import resumePDF from '../../public/assets/Resume_SDE_Vidish_Raj.pdf'

const ScrollTracker = () => {
    const [activeSection, setActiveSection] = useState('section1');
    const {isToggled: isDarkMode} = useGlobal(); // Get theme from context

    const sections = [
        {id: 'section1', label: 'Home'},
        {id: 'section2', label: 'Career'},
        {id: 'section3', label: 'Projects'},
        {id: 'section4', label: 'Contact'},
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(section =>
                document.getElementById(section.id)
            );

            const current = sectionElements.find(element => {
                if (!element) return false;
                const rect = element.getBoundingClientRect();
                return rect.top <= 150 && rect.bottom >= 150;
            });

            if (current) {
                setActiveSection(current.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const downloadResume = () => {
        // Create a link to the resume and trigger download
        const link = document.createElement('a');
        link.href = resumePDF;
        link.download = 'vidish_raj_resume.pdf'; // The name the file will download as
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`${styles.trackerContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
            <div className={styles.tracker}>
                <div className={styles.navButtons}>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`${styles.trackerButton} ${
                                activeSection === section.id ? styles.activeButton : ''
                            }`}
                            aria-label={`Navigate to ${section.label}`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
                <div className={styles.divider}></div>
                <button
                    onClick={downloadResume}
                    className={styles.resumeButton}
                    aria-label="Download Resume"
                >
                    <img
                        src={'../../public/assets/contacts/file-user.png'}
                        className="w-6 h-6 object-contain"
                        style={{
                            filter: isDarkMode ? 'brightness(1.2)' : 'none'
                        }}
                    />
                    <span>Resume</span>
                </button>
            </div>
        </div>
    );
};

export default ScrollTracker;