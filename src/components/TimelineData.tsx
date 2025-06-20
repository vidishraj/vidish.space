import {ContainerScroll} from "./TimeLine3DCard.tsx";
import styles from '../pages/HeroSection.module.scss'
import {TextGenerateEffect} from "./TextGenerate.tsx";
import {AnimatedText} from './AnimatedText.tsx';
import {CSSProperties, useEffect, useState} from "react";
import Lottie from "lottie-react";

const earlyDaysAnimation = () => import('../assets/lottieAnimations/earlyDays.json');
const jobAnimation = () => import('../assets/lottieAnimations/job.json');
const internshipAnimation = () => import('../assets/lottieAnimations/internship.json');
const collegeDaysAnimation = () => import('../assets/lottieAnimations/college.json');

interface LazyLottieProps {
    animationImport: () => Promise<{ default: any }>;
    className?: string;
    style?: CSSProperties;
}

export const LazyLottie = ({animationImport, className = "", style = {}}: LazyLottieProps) => {
    const [animationData, setAnimationData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        animationImport()
            .then(module => {
                if (isMounted) {
                    setAnimationData(module.default);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Failed to load animation:", error);
                setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [animationImport]);

    if (isLoading || !animationData) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <span>Loading...</span>
            </div>
        );
    }

    return <Lottie className={className} animationData={animationData} style={style}/>;
};

export const timelineData = (isDarkMode: boolean) => {
    return [
        {
            title: 'The Early Days (Till 2018)',
            subtitle: 'The Humble Beginnings of a Tech Nerd',
            animationData: earlyDaysAnimation,
            content: [
                <ContainerScroll
                    containerClassName={!isDarkMode ? `${styles.timelineCard} ${styles.firstCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isDarkMode ? 'white' : 'black'}`}
                            words={"The Humble Beginnings of a Tech Nerd"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isDarkMode ? 'white' : 'black'}}>St. Xaviers, Bokaro (1st-4th
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Queens, NY (5th-8th grade,
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>DPS South, Bengaluru
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
                    containerClassName={!isDarkMode ? `${styles.timelineCard} ${styles.secondCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isDarkMode ? 'white' : 'black'}`}
                            words={"Becoming a Full-Stack Wizard 🧙‍♂️"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🎓</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isDarkMode ? 'white' : 'black'}}>PES University,
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Achievements</h3>
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Placement Wins</h3>
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
                    containerClassName={!isDarkMode ? `${styles.timelineCard} ${styles.thirdCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isDarkMode ? 'white' : 'black'}`}
                            words={"PwC: From Intern to POC Wizard"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💼</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isDarkMode ? 'white' : 'black'}}>PwC India</h3>
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Project Deployment</h3>
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Corporate Life Skills</h3>
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
                    containerClassName={!isDarkMode ? `${styles.timelineCard} ${styles.fourthCard}` : styles.timelineCardDark}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline text-${isDarkMode ? 'white' : 'black'}`}
                            words={"Societe Generale: Microservices, AWS, and French Colleagues 🇫🇷️"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💻</span>
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-200"
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Initial Role</h3>
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>New Project</h3>
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Key Projects</h3>
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>International
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
                                            style={{color: isDarkMode ? 'white' : 'black'}}>Current Status</h3>
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
};
