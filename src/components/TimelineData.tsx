import {ContainerScroll} from "./TimeLine3DCard.tsx";
import styles from '../pages/HeroSection.module.scss'
import {TextGenerateEffect} from "./TextGenerate.tsx";
import {AnimatedText} from './AnimatedText.tsx';
import {CSSProperties, useEffect, useState} from "react";
import Lottie from "lottie-react";
import {Season, seasonPalettes} from "../utils/seasonConfig";

const earlyDaysAnimation = () => import('../assets/lottieAnimations/earlyDays.json');
const jobAnimation = () => import('../assets/lottieAnimations/job.json');
const internshipAnimation = () => import('../assets/lottieAnimations/internship.json');
const collegeDaysAnimation = () => import('../assets/lottieAnimations/college.json');
const freelanceAnimation = () => import('../assets/lottieAnimations/newSummer3.json');
const fleetAnimation = () => import('../assets/lottieAnimations/timelineAnimation.json');

interface LazyLottieProps {
    animationImport: () => Promise<{ default: object }>;
    className?: string;
    style?: CSSProperties;
}

export const LazyLottie = ({animationImport, className = "", style = {}}: LazyLottieProps) => {
    const [animationData, setAnimationData] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setHasError(false);

        animationImport()
            .then(module => {
                if (isMounted) {
                    setAnimationData(module.default);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Failed to load animation:", error);
                if (isMounted) {
                    setHasError(true);
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [animationImport]);

    // On failure, render nothing rather than a permanently stuck
    // "Loading..." placeholder — the surrounding timeline card still shows.
    if (hasError) return null;

    if (isLoading || !animationData) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    backgroundColor: "transparent",
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

export const timelineData = (season: Season) => {
    const palette = seasonPalettes[season];
    const isMonsoon = season === 'monsoon';
    const textColor = palette.textPrimary;
    const cardColors = palette.timelineCards;

    const getCardClass = () => {
        if (isMonsoon) return styles.timelineCardDark;
        return `${styles.timelineCard}`;
    };

    const getCardStyle = (index: number): CSSProperties => {
        // Cycle the palette: every season defines 5 card colors and the
        // chapter count must never crash on a 6th (see the Services fix).
        return {background: cardColors[index % cardColors.length]};
    };

    return [
        {
            title: 'The Early Days (Till 2018)',
            subtitle: 'The Humble Beginnings of a Tech Nerd',
            animationData: earlyDaysAnimation,
            content: [
                <ContainerScroll
                    containerClassName={getCardClass()}
                    containerStyle={getCardStyle(0)}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline`}
                            parentStyle={{color: textColor}}
                            words={"The Humble Beginnings of a Tech Nerd"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>St. Xaviers, Bokaro (1st-4th
                                            grade)</h3>
                                        <p style={{color: textColor}}>Rocking an ancient Windows XP with 2GB RAM and a CRT monitor. Got my first
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
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Queens, NY (5th-8th grade,
                                            PS120 & IS237)</h3>
                                        <p style={{color: textColor}}>High-speed WiFi unlocked! Became the family tech support, fixing routers for
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
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>DPS South, Bengaluru
                                            (9th-12th grade)</h3>
                                        <p style={{color: textColor}}>Brief tech rebellion phase. CS in 11th grade? Nah. Switched to Economics
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
                    containerClassName={getCardClass()}
                    containerStyle={getCardStyle(1)}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline`}
                            parentStyle={{color: textColor}}
                            words={"Becoming a Full-Stack Wizard 🧙‍♂️"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🎓</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>PES University,
                                            Bengaluru</h3>
                                        <p style={{color: textColor}}>Developed an obsession with C, Python, and frontend development. Code became
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
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Achievements</h3>
                                        <ul className="list-disc pl-6" style={{color: textColor}}>
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
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Placement Wins</h3>
                                        <ul className="list-disc pl-6" style={{color: textColor}}>
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
                    containerClassName={getCardClass()}
                    containerStyle={getCardStyle(2)}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline`}
                            parentStyle={{color: textColor}}
                            words={"PwC: From Intern to POC Wizard"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💼</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>PwC India</h3>
                                        <p style={{color: textColor}}>Built a Proof of Concept (POC) for an internal tool using Python + Tkinter
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
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Project Deployment</h3>
                                        <p style={{color: textColor}}>Contributed to the final design of the tool and deployed it on Windows Server
                                            using IIS + Apache (yes, it worked!).</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💡</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Corporate Life Skills</h3>
                                        <p style={{color: textColor}}>First exposure to corporate life, where I mastered the sacred arts of Git,
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
            title: 'The Big Leagues (July 2022 - Feb 2026)',
            subtitle: 'Societe Generale: Microservices, AWS, and French Colleagues 🇫🇷️',
            animationData: jobAnimation,
            content: [
                <ContainerScroll
                    containerClassName={getCardClass()}
                    containerStyle={getCardStyle(3)}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline`}
                            parentStyle={{color: textColor}}
                            words={"Societe Generale: Microservices, AWS, and French Colleagues 🇫🇷️"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">💻</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Initial Role</h3>
                                        <p style={{color: textColor}}>Started as a Software Engineer, maintaining a chain of microservices that
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
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>New Project</h3>
                                        <p style={{color: textColor}}>6 months in – The big one: the bank’s move off
                                            on-premise servers. Rebuilding an old JSP application as React + Spring Boot
                                            microservices on AWS—a migration that took serious time to architect before
                                            the building years began.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">⚡</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Key Projects</h3>
                                        <ul className="list-disc pl-6" style={{color: textColor}}>
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
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>International
                                            Collaboration</h3>
                                        <p style={{color: textColor}}>Fully remote for all three and a half years: one of
                                            two developers in India on a 15-member team, the rest in France—meaning I've
                                            learned more French phrases than I ever expected to (Mostly "Ça marche?" and
                                            "Ça ne marche pas.")</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={1.0}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">☕</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>How It Wrapped Up</h3>
                                        <p style={{color: textColor}}>Wrapped up in Feb 2026 after carrying the project into its pre-prod phase —
                                            plenty of coffee, debugging, and Jenkins logs along the way.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>
                    </div>
                </ContainerScroll>
            ],
        },
        {
            title: 'Going Solo (2025 - Present)',
            subtitle: 'Freelance: From AI Pipelines to Embedded Systems 🚀',
            animationData: freelanceAnimation,
            content: [
                <ContainerScroll
                    containerClassName={getCardClass()}
                    containerStyle={getCardStyle(4)}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline`}
                            parentStyle={{color: textColor}}
                            words={"Freelance: From AI Pipelines to Embedded Systems 🚀"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🎯</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>The Leap</h3>
                                        <p style={{color: textColor}}>Started freelancing on nights and weekends alongside
                                            the remote day job in 2025; when Societe Generale wrapped in Feb 2026, went
                                            all in. Turns out, being your own boss means you never get to blame anyone
                                            else for bad code.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.4}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🤖</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>AI & Full-Stack</h3>
                                        <p style={{color: textColor}}>Put 548 commits into <a href="#/project/client-movo" style={{color: 'inherit', textDecoration: 'underline'}}>Movo</a> in
                                            three months—vector search, an LLM insights engine, CRM integrations—ending as
                                            the backend’s second most active contributor. Shipped an entire LLM wellness
                                            platform to the App Store as the sole developer for <a href="#/project/client-soultalk" style={{color: 'inherit', textDecoration: 'underline'}}>SoulTalk</a>—808
                                            commits of pure hustle.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">📱</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Mobile & Optimization</h3>
                                        <p style={{color: textColor}}>Refactored <a href="#/project/client-raheee" style={{color: 'inherit', textDecoration: 'underline'}}>Raheee</a>’s mobile app in a
                                            2-week sprint—shrunk it from 154MB to 20MB. Also built secure data exchange
                                            connectors for <a href="#/project/client-cipherome" style={{color: 'inherit', textDecoration: 'underline'}}>Cipherome</a>’s genomics platform.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.8}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🔧</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Hardware Meets Software</h3>
                                        <p style={{color: textColor}}>Went from cloud to bare metal—built the entire Pi side
                                            of a container-return kiosk for <a href="#/project/client-nyxidiom" style={{color: 'inherit', textDecoration: 'underline'}}>Nyxidiom</a> (100% of the
                                            code by git blame at handoff), talking to STM32 boards over UART. Because why
                                            not add embedded systems to the resume?</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={1.0}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">⚡</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>Current Status</h3>
                                        <p style={{color: textColor}}>10+ clients, countless commits, and zero regrets. Still
                                            shipping code, still breaking things in staging, still loving every bit of it.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>
                    </div>
                </ContainerScroll>
            ],
        },
        {
            title: 'The Fleet Era (2026 - Present)',
            subtitle: 'Running a 50-Seat AI Software Team 🤖',
            animationData: fleetAnimation,
            content: [
                <ContainerScroll
                    containerClassName={getCardClass()}
                    containerStyle={getCardStyle(5)}
                    className={styles.timelineContent}>
                    <div className="flex flex-col space-y-6">
                        <TextGenerateEffect
                            className={`flex align-center justify-center underline`}
                            parentStyle={{color: textColor}}
                            words={"Running a 50-Seat AI Software Team 🤖"}/>

                        <AnimatedText delay={0.2}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🏗️</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>United Majdoors</h3>
                                        <p style={{color: textColor}}>Stopped writing all the code myself and built a
                                            command centre for a fleet of autonomous Claude agents instead—on top of
                                            Steve Yegge’s <a href="https://github.com/gastownhall/gastown" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>Gas Town</a>. Live
                                            terminals in the browser, durable work tracking, push notifications: one
                                            person operating <a href="#/project/united-majdoors" style={{color: 'inherit', textDecoration: 'underline'}}>50+ agent seats across 11 projects</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.4}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🚢</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>What the fleet ships</h3>
                                        <p style={{color: textColor}}>An accounting platform with its own AI agent
                                            (<a href="#/project/akkountant" style={{color: 'inherit', textDecoration: 'underline'}}>Akkountant</a>), a ~300k-listing real-estate dashboard built in five
                                            weeks (<a href="#/project/makaan" style={{color: 'inherit', textDecoration: 'underline'}}>Makaan</a>), a private poker night for the group chat
                                            (<a href="#/project/satte-nights" style={{color: 'inherit', textDecoration: 'underline'}}>Satte Nights</a>), and a trip ledger with an AI operator
                                            (<a href="#/project/tripsplit" style={{color: 'inherit', textDecoration: 'underline'}}>TripSplit</a>).</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedText>

                        <AnimatedText delay={0.6}>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <span className="text-xl mr-2">🌀</span>
                                    <div>
                                        <h3 className="font-semibold text-lg"
                                            style={{color: textColor}}>The recursive bit</h3>
                                        <p style={{color: textColor}}>This website—including the timeline you are reading
                                            right now—is written, reviewed, and deployed by agents inside that fleet. I
                                            mostly review, decide, and take the screenshots.</p>
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
