// Section3.tsx
import {useEffect, useRef} from 'react';
import styles from './Projects.module.scss';
import {ProjectsGrid} from "../components/Carousel.tsx";
import {useGlobal} from "../GlobalContext.tsx";
import ParallaxText from "../components/LetterScroll.tsx";

export const Section3 = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const {isToggled} = useGlobal()
    // Adjust the height of the section to accommodate all slides
    useEffect(() => {
        const section = document.getElementById('section3');
        if (section) {
            // Save the original reference
            sectionRef.current = section;
        }
    }, []);

    const content = [
        {
            title: "Akkountant – Your Personal Finance Tracker",
            description:
                "Managing finances across multiple banks and investments is a hassle. Akkountant simplifies it by automatically tracking your transactions and investments, fetching real-time data, and storing everything securely. Whether it's keeping an eye on your spending or monitoring your portfolio, Akkountant ensures you're always in control.",
            img: "src/assets/akkountantModal/akkountant.png",
            content: (
                <div
                    className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                    Collaborative Editing
                </div>
            ),
        },
        {
            title: "TripSplit – Because Math and Vacations Don't Mix!",
            description:
                "Ever struggled to split expenses on a trip? TripSplit makes it easy by handling multiple currencies, tracking shared and personal expenses, and keeping balances clear—so you can focus on making memories, not spreadsheets.",
            img: "src/assets/tripsplitModal/tripsplit.png",
            content: (
                <div className="h-full w-full flex items-center justify-center text-white">
                    Hello
                </div>
            ),
        },
        {
            title: "Vidish.Space - A little about me 👨‍💻",
            description:
                "A simple and clean portfolio built with React 18, featuring sections for my experience, projects, and contact info. It includes smooth animations, dark/light mode support, and a responsive design for a seamless browsing experience.",
            img: "src/assets/vidishSpaceModal/vidishSpaceDark.png",
            content: (
                <div
                    className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                    Version control
                </div>
            ),
        },
        {
            title: "LeetcodeToGit - Hard-Earned Solutions Deserve a Home 🏡",
            description:
                "Never lose a LeetCode solution again! 🚀 LeetCodeToGit is a CLI tool that fetches your best LeetCode submissions and syncs them to a Git repository—automatically! It uses GraphQL APIs, your session cookies, and Git commands to ensure your solutions are always backed up. Solve, sync, and flex your repository with ease!",
            img: "src/assets/leetcodeToGitModal/gitLeet.jpeg",
            content: (
                <div
                    className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                    Running out of content
                </div>
            ),
        },
    ];

    return (
        <section
            id="section3"
            className={!isToggled ? styles.section3 : `${styles.section3Dark} ${styles.section3}`}
            style={{
                maxHeight: "max-content",
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
            }}
            ref={sectionRef}
        >

            <div style={{width: '100%', height: '100%'}}>
                {/*<ParallaxText baseVelocity={-5}>My Work</ParallaxText>*/}
                <ParallaxText baseVelocity={200}>My Work</ParallaxText>
                <ProjectsGrid slides={content}/>
                <ParallaxText baseVelocity={200} direction={"right"}>Projects</ParallaxText>
            </div>
        </section>
    );
};

export default Section3;