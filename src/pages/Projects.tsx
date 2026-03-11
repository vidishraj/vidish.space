import {useRef} from 'react';
import styles from './Projects.module.scss';
import {ProjectsGrid} from "../components/Carousel.tsx";
import ParallaxText from "../components/LetterScroll.tsx";
import {useThemeContext} from '../App';

export const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const {season, backgrounds} = useThemeContext();
    const isMonsoon = season === 'monsoon';

    const content = [
        {
            title: "Akkountant – Your Personal Finance Tracker",
            description:
                "Managing finances across multiple banks and investments is a hassle. Akkountant simplifies it by automatically tracking your transactions and investments, fetching real-time data, and storing everything securely. Whether it's keeping an eye on your spending or monitoring your portfolio, Akkountant ensures you're always in control.",
            img: "/assets/akkountantModal/akkountant.webp",
            content: (
                <div>
                    Running out of content
                </div>
            ),
        },
        {
            title: "TripSplit – Effortless Group Expense Management",
            description:
                "Splitting bills among friends shouldn't be a headache. TripSplit makes group expense management simple—track shared costs, split bills fairly, and settle up without the usual confusion. No more awkward \"who owes whom\" conversations.",
            img: "/assets/tripsplitModal/tripsplit.png",
            content: (
                <div>
                    Running out of content
                </div>
            ),
        },
        {
            title: "Vidish.Space – My Digital Playground",
            description:
                "A handcrafted portfolio website where design meets functionality. Built with React, it showcases projects, integrates animations, and reflects my love for clean, creative web development.",
            img: "/assets/vidishSpaceModal/vidishSpaceDark.webp",
            content: (
                <div>
                    Running out of content
                </div>
            ),
        },
        {
            title: "LeetcodeToGit – Automate Your Coding Journal",
            description:
                "A Chrome extension that bridges LeetCode and GitHub. Automatically pushes your LeetCode solutions to a GitHub repository, keeping your coding journey organized and version-controlled—zero manual effort required.",
            img: "/assets/leetcodeToGitModal/gitLeet.webp",
            content: (
                <div>
                    Running out of content
                </div>
            ),
        },
    ];

    return (
        <section
            id="section4"
            className={styles.section3}
            style={{
                maxHeight: "max-content",
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                ...(backgrounds.projects ? {backgroundImage: `url('${backgrounds.projects}')`} : {}),
            }}
            ref={sectionRef}>
            <div style={{width: '100%', height: '100%'}}>
                <ParallaxText baseVelocity={200}>MY WORK</ParallaxText>
                <ProjectsGrid slides={content}/>
            </div>
            <ParallaxText baseVelocity={200} direction={isMonsoon ? 'left' : 'right'}>Projects</ParallaxText>
        </section>
    );
};

export default Projects;
