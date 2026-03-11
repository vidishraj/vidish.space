import {useEffect, useRef, useState, useMemo} from 'react';
import styles from './ScrollTracker.module.scss';
import resumePDF from '/assets/Resume_SDE_Vidish_Raj.pdf'
import {useThemeContext} from '../App';

const ScrollTracker = () => {
    const [activeSection, setActiveSection] = useState('section1');
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const {season} = useThemeContext();
    const isMonsoon = season === 'monsoon';

    const sections = useMemo(() => [
        {id: 'section1', label: 'Home'},
        {id: 'section2', label: 'Services'},
        {id: 'section3', label: 'Career'},
        {id: 'section4', label: 'Projects'},
        {id: 'section5', label: 'Contact'},
    ], []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 100 || currentScrollY < lastScrollY.current) {
                setVisible(true);
            } else {
                setVisible(false);
            }
            lastScrollY.current = currentScrollY;

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

        window.addEventListener('scroll', handleScroll, {passive: true});
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

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
        const link = document.createElement('a');
        link.href = resumePDF;
        link.download = 'vidish_raj_resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const modeClass = isMonsoon ? styles.darkMode : styles.lightMode;

    return (
        <div className={`${styles.trackerContainer} ${modeClass} ${visible ? '' : styles.hidden}`}>
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
                        src={'/assets/contacts/file-user.png'}
                        alt="Resume"
                        className="w-6 h-6 object-contain"
                        style={{
                            filter: isMonsoon ? 'brightness(1.2)' : 'none'
                        }}
                    />
                    <span>Resume</span>
                </button>
            </div>
        </div>
    );
};

export default ScrollTracker;
