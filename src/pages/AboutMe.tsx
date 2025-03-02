import styles from "./HeroSection.module.scss";
import {ContainerScroll} from "../components/TimeLine3DCard.tsx";
import {TextGenerateEffect} from "../components/TextGenerate.tsx";
import {Timeline} from "../components/Timeline.tsx";
import {motion} from "framer-motion";
import earlyDaysAnimation from '../../public/assets/lottieAnimations/earlyDays.json'
import jobAnimation from '../../public/assets/lottieAnimations/job.json'
import internshipAnimation from '../../public/assets/lottieAnimations/internship.json'
import collegeDaysAnimation from '../../public/assets/lottieAnimations/college.json'
import {useGlobal} from "../GlobalContext.tsx";
import {ReactNode} from "react";

const TimelineSection = () => {
    const {isToggled} = useGlobal();
    const AnimatedText = ({children, className, delay = 0}: {
        children: ReactNode,
        className?: string,
        delay: number
    }) => {
        return (
            <motion.div
                className={className || ""}
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: delay}}
                viewport={{once: true}}
            >
                {children}
            </motion.div>
        );
    };

    const timelineData = [
        {
            title: 'The Early Days (Till 2018)',
            subtitle: 'The Humble Beginnings of a Tech Nerd',
            animationData: earlyDaysAnimation,

            content: [
                <ContainerScroll
                    containerClassName={!isToggled ? `${styles.timelineCard} ${styles.firstCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isToggled ? 'white' : 'black'}`}
                            words={"The Humble Beginnings of a Tech Nerd"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>St. Xaviers, Bokaro (1st-4th
                                            grade)</h3>
                                        <p>Rocking an ancient Windows XP with 2GB RAM and a CRT monitor. Got my first
                                            taste
                                            of the internet—love at first dial-up tone.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.4}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Queens, NY (5th-8th grade,
                                            PS120 & IS237)</h3>
                                        <p>High-speed WiFi unlocked! Became the family tech support, fixing routers for
                                            uncles and figuring out torrents (for educational purposes, of course 😉).
                                            Learned about storage, operating systems, and the art of data transfers.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>DPS South, Bengaluru
                                            (9th-12th grade)</h3>
                                        <p>Brief tech rebellion phase. CS in 11th grade? Nah. Switched to Economics
                                            instead.
                                            Regrets? Maybe. But hey, life's about twists and turns!</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>
                    </div>
                </ContainerScroll>
            ],
        },
        {
            title: 'College Chronicles (2018-2022)',
            subtitle: 'Becoming a Full-Stack Wizard 🧙‍♂️',
            animationData: collegeDaysAnimation,
            content: [
                <ContainerScroll
                    containerClassName={!isToggled ? `${styles.timelineCard} ${styles.secondCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isToggled ? 'white' : 'black'}`}
                            words={"Becoming a Full-Stack Wizard 🧙‍♂️"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🎓</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>PES University,
                                            Bengaluru</h3>
                                        <p>Developed an obsession with C, Python, and frontend development. Code became
                                            poetry, and debugging became therapy.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.4}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🏆</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Achievements</h3>
                                        <ul className="list-disc pl-6">
                                            <li>MDR Scholarship (2x) – They paid me to be a nerd.</li>
                                            <li>Distinction Award (2x) – More proof I actually studied.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">📌</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Placement Wins</h3>
                                        <ul className="list-disc pl-6">
                                            <li>Landed an internship at PwC.</li>
                                            <li>Bagged a job at Societe Generale before even graduating. Mission
                                                accomplished. 🎯
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>
                    </div>
                </ContainerScroll>
            ],
        },
        {
            title: 'The Intern Life (Jan 2022-May 2022)',
            subtitle: 'PwC: From Intern to POC Wizard',
            animationData: internshipAnimation,
            content: [
                <ContainerScroll
                    containerClassName={!isToggled ? `${styles.timelineCard} ${styles.thirdCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isToggled ? 'white' : 'black'}`}
                            words={"PwC: From Intern to POC Wizard"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💼</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Software Engineer Intern</h3>
                                        <p>Built a Proof of Concept (POC) for an internal tool using Python + Tkinter
                                            (old
                                            school but effective).</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.4}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🚀</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Project Deployment</h3>
                                        <p>Contributed to the final design of the tool and deployed it on Windows Server
                                            using uWSGI + IIS (yes, it worked!).</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💡</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Corporate Life Skills</h3>
                                        <p>First exposure to corporate life, where I mastered the sacred arts of Git,
                                            Teams,
                                            and Jira. Also discovered meetings could've been emails.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>
                    </div>
                </ContainerScroll>
            ],
        },
        {
            title: 'The Big Leagues (July 2022 - Present)',
            subtitle: 'Societe Generale: Microservices, AWS, and French Colleagues 🇫🇷️',
            animationData: jobAnimation,
            content: [
                <ContainerScroll
                    containerClassName={!isToggled ? `${styles.timelineCard} ${styles.fourthCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isToggled ? 'white' : 'black'}`}
                            words={"Societe Generale: Microservices, AWS, and French Colleagues 🇫🇷️"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💻</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Initial Role</h3>
                                        <p>Started as a Software Engineer, maintaining a chain of microservices that
                                            crunched huge amounts of banking data.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.4}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🔄</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>New Project</h3>
                                        <p>6 months in – Got a new project: Rebuilding an old JSP application using
                                            ReactJS
                                            + Spring Boot with AWS as our cloud provider.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">⚡</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Tech Stack Power-Up</h3>
                                        <ul className="list-disc pl-6">
                                            <li>Containerization – Everything in Docker, deployed via AWS ECS & ECR.
                                            </li>
                                            <li>CI/CD Mastery – Pipelines built with Jenkins.</li>
                                            <li>Version Control Guru – GitHub all the way.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.8}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🇫🇷</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>International
                                            Collaboration</h3>
                                        <p>Cross-functional teams, mostly working with French colleagues—meaning I've
                                            learned more French phrases than I ever expected to (Mostly "Ça marche?" and
                                            "Ça
                                            ne marche pas.")</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={1.0}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">☕</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isToggled ? 'white' : 'black'}}>Current Status</h3>
                                        <p>Currently in the pre-prod phase of the project, which means more coffee, more
                                            debugging, and more Jenkins logs.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>
                    </div>
                </ContainerScroll>
            ],
        },
    ];

    return (
        <section id="section2" className={!isToggled ? styles.section2 : styles.section2Dark}>
            <Timeline
                titleClassName={styles.timelineTitle}
                data={timelineData}
                containerClassname={styles.timelineParent}
            />
        </section>
    );
};
export default TimelineSection;