import {motion, useAnimation, useInView} from 'framer-motion';
import {useRef, useEffect} from 'react';
import {TextGenerateEffect} from '../components/TextGenerate.tsx';
import {AnimatedText} from '../components/AnimatedText.tsx';
import {PointerHighlight} from '../components/PointerHighlight.tsx';
import {useThemeContext} from '../App';
import styles from './WhatIDo.module.scss';

interface ServiceCard {
    emoji: string;
    title: string;
    description: string;
    tags: string[];
}

const services: ServiceCard[] = [
    {
        emoji: '\u{2699}\u{FE0F}',
        title: 'Backend & APIs',
        description:
            'Microservices handling 50,000+ daily transactions, REST APIs powering 1,000+ users, and third-party integrations with platforms like Salesforce, Mindbody, and Keycloak.',
        tags: ['Spring Boot', 'Node.js', 'Python', 'PostgreSQL'],
    },
    {
        emoji: '\u{1F4BB}',
        title: 'Frontend & Mobile',
        description:
            'Responsive web apps, interactive dashboards with million-row tables, and cross-platform mobile apps. Shipped iOS and Android builds from scratch.',
        tags: ['React', 'TypeScript', 'React Native', 'Next.js'],
    },
    {
        emoji: '\u{1F916}',
        title: 'AI-Powered Systems',
        description:
            'Conversational AI across SMS, email, and voice. RAG pipelines with vector search, LLM-driven insight engines, and intelligent lead scoring systems.',
        tags: ['OpenAI', 'RAG', 'Vector DBs', 'VAPI'],
    },
    {
        emoji: '\u{2601}\u{FE0F}',
        title: 'Cloud & Infrastructure',
        description:
            'Containerized deployments on AWS, CI/CD pipelines that cut deployment time by 20%, and cloud migrations of legacy enterprise systems.',
        tags: ['AWS', 'Docker', 'Jenkins', 'ECS'],
    },
    {
        emoji: '\u{1F527}',
        title: 'Hardware & Embedded',
        description:
            'UART protocol implementations for microcontrollers, QR-based validation systems on Raspberry Pi, and bridging firmware with cloud backends.',
        tags: ['STM32', 'Raspberry Pi', 'Serial', 'IoT'],
    },
    {
        emoji: '\u{1F680}',
        title: 'End-to-End Delivery',
        description:
            'Solo-built entire products from architecture to app store. Took codebases from 154MB down to 20MB, and shipped production systems in as little as two weeks.',
        tags: ['System Design', 'Architecture', 'App Store', 'Deployment'],
    },
];

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: {opacity: 0, y: 30, scale: 0.97},
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 16,
        },
    },
};

const WhatIDo = () => {
    const {season, palette, backgrounds} = useThemeContext();
    const isMonsoon = season === 'monsoon';
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(gridRef, {once: false, amount: 0.12});
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [isInView, controls]);

    return (
        <section
            id="section2"
            className={styles.section}
            style={{
                position: 'relative',
                ...(backgrounds.whatIDo
                    ? {backgroundImage: `url('${backgrounds.whatIDo}')`}
                    : {background: season === 'winter'
                        ? 'linear-gradient(170deg, #bed0e0 0%, #b9ccdd 20%, #b4c8da 40%, #afc4d7 60%, #aac0d4 80%, #a5bcd1 100%)'
                        : 'linear-gradient(170deg, #f5eddd 0%, #f6ebd5 20%, #f7e8ce 40%, #f7e5c8 60%, #f6e1c0 80%, #f5debb 100%)'}),
            }}
        >
            <div className={styles.content}>
                <AnimatedText delay={0.1}>
                    <div className={styles.subtitle} style={{color: palette.textSecondary}}>
                        <PointerHighlight
                            autoAnimate
                            loopDuration={5}
                            rectangleClassName={isMonsoon ? 'border-amber-400/60' : 'border-amber-700/50'}
                            pointerClassName={isMonsoon ? 'text-amber-400' : 'text-amber-700'}
                        >
                            <span style={{
                                fontWeight: 700,
                                color: palette.accent,
                            }}>
                                Services & expertise
                            </span>
                        </PointerHighlight>
                        <TextGenerateEffect
                            parentStyle={{color: palette.textSecondary}}
                            words=" I bring to every project"
                        />
                    </div>
                </AnimatedText>

                <div
                    className={styles.dividerLine}
                    style={{background: palette.dividerGradient}}
                />

                <motion.div
                    ref={gridRef}
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {services.map((service, index) => {
                        const cardPalette = palette.serviceCards[index];

                        return (
                            <motion.div
                                key={service.title}
                                variants={cardVariants}
                                whileHover={{
                                    y: -6,
                                    boxShadow: isMonsoon
                                        ? `0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px ${cardPalette.accent}20`
                                        : '0 12px 32px rgba(0,0,0,0.1)',
                                    transition: {type: 'spring', stiffness: 400, damping: 20},
                                }}
                                className={styles.card}
                                style={{
                                    backgroundColor: cardPalette.bg,
                                    color: palette.textPrimary,
                                    border: `1px solid ${cardPalette.border}`,
                                }}
                            >
                                <span className={styles.index} style={{
                                    color: isMonsoon ? cardPalette.accent : palette.textPrimary,
                                    opacity: isMonsoon ? 0.15 : 0.08,
                                }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className={styles.cardHeader}>
                                    <span className={styles.emoji}>{service.emoji}</span>
                                    <h3 className={styles.cardTitle}>{service.title}</h3>
                                </div>

                                <p className={styles.cardDescription}>{service.description}</p>

                                <div className={styles.tags}>
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={styles.tag}
                                            style={{
                                                backgroundColor: cardPalette.tagBg,
                                                color: cardPalette.tagColor,
                                                borderLeftColor: cardPalette.accent,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

        </section>
    );
};

export default WhatIDo;
