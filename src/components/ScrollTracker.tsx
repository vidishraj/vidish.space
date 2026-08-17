import {useEffect, useState, useMemo} from 'react';
import styles from './ScrollTracker.module.scss';
import resumePDF from '/assets/Resume_SDE_Vidish_Raj.pdf'
import {useThemeContext} from '../App';

const ScrollTracker = () => {
    const [activeSection, setActiveSection] = useState('section1');
    const {season} = useThemeContext();
    const isMonsoon = season === 'monsoon';

    const sections = useMemo(() => [
        {id: 'section1', label: 'Home'},
        {id: 'section2', label: 'Services'},
        {id: 'sectionClients', label: 'Clients'},
        {id: 'section4', label: 'Projects'},
        {id: 'section3', label: 'Career'},
        {id: 'section5', label: 'Contact'},
    ], []);

    useEffect(() => {
        let rafId: number | null = null;

        const computeActiveSection = () => {
            rafId = null;
            const current = sections
                .map(section => document.getElementById(section.id))
                .find(element => {
                    if (!element) return false;
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                });

            if (current) {
                setActiveSection(current.id);
            }
        };

        // Throttle to one measurement per animation frame to avoid layout
        // thrashing from getBoundingClientRect on every scroll event.
        const handleScroll = () => {
            if (rafId === null) {
                rafId = requestAnimationFrame(computeActiveSection);
            }
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        computeActiveSection();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
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
        <nav className={`${styles.trackerContainer} ${modeClass}`} aria-label="Section navigation">
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
                            aria-current={activeSection === section.id ? 'true' : undefined}
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
                        alt=""
                        aria-hidden="true"
                        className="w-6 h-6 object-contain"
                        style={{
                            filter: isMonsoon ? 'brightness(1.2)' : 'none'
                        }}
                    />
                    <span>Resume</span>
                </button>
            </div>
        </nav>
    );
};

export default ScrollTracker;
