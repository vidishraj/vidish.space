import {useRef} from 'react';
import styles from './Projects.module.scss';
import {ProjectsGrid} from "../components/Carousel.tsx";
import ParallaxText from "../components/LetterScroll.tsx";
import {useThemeContext} from '../App';
import {allProjects} from '../assets/projects';

export const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const {season, backgrounds} = useThemeContext();
    const isMonsoon = season === 'monsoon';

    return (
        <section
            id="section4"
            className={styles.section3}
            aria-label="Projects"
            style={{
                maxHeight: "max-content",
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                ...(backgrounds.projects
                    ? {backgroundImage: `url('${backgrounds.projects}')`}
                    : season === 'summer'
                        ? {background: 'linear-gradient(170deg, #fffffe 0%, #fefefe 15%, #fcfcfd 30%, #f8f9fb 45%, #f4f6f9 60%, #f0f3f7 75%, #ecf0f5 90%, #e6ecf2 100%)'}
                        : season === 'winter'
                            ? {background: 'linear-gradient(170deg, #698cad 0%, #6488aa 15%, #5f84a7 30%, #5a80a4 45%, #557ca1 60%, #50789e 75%, #4b749b 90%, #467098 100%)'}
                            : {background: 'linear-gradient(170deg, #161f27 0%, #17212b 50%, #131a22 100%)'}),
            }}
            ref={sectionRef}>
            <div style={{width: '100%', height: '100%'}}>
                <ParallaxText baseVelocity={200}>MY WORK</ParallaxText>
                <ProjectsGrid projects={allProjects}/>
            </div>
            <ParallaxText baseVelocity={200} direction={isMonsoon ? 'left' : 'right'}>Projects</ParallaxText>
        </section>
    );
};

export default Projects;
