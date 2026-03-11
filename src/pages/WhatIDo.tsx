import {motion, useAnimation, useInView} from 'framer-motion';
import {useRef, useEffect} from 'react';
import {TextGenerateEffect} from '../components/TextGenerate.tsx';
import {AnimatedText} from '../components/AnimatedText.tsx';
import ParallaxText from '../components/LetterScroll.tsx';
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
        emoji: '\u{1F4BB}',
        title: 'Frontend Development',
        description:
            'Building responsive, performant user interfaces with modern frameworks. From pixel-perfect designs to complex interactive dashboards.',
        tags: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    },
    {
        emoji: '\u{2699}\u{FE0F}',
        title: 'Backend & APIs',
        description:
            'Designing and building robust server-side systems, RESTful APIs, and microservices that scale reliably under load.',
        tags: ['Spring Boot', 'Node.js', 'REST', 'GraphQL'],
    },
    {
        emoji: '\u{2601}\u{FE0F}',
        title: 'Cloud & DevOps',
        description:
            'Containerizing applications, setting up CI/CD pipelines, and managing cloud infrastructure for seamless deployments.',
        tags: ['AWS', 'Docker', 'Jenkins', 'ECS'],
    },
    {
        emoji: '\u{1F916}',
        title: 'AI & Integrations',
        description:
            'Building intelligent systems with RAG pipelines, LLM integrations, and AI-powered features that plug into existing workflows.',
        tags: ['RAG', 'LLMs', 'Langchain', 'Vector DBs'],
    },
    {
        emoji: '\u{1F680}',
        title: 'Full-Stack Applications',
        description:
            'End-to-end delivery from architecture to deployment. Taking ideas from napkin sketches to production-ready products.',
        tags: ['System Design', 'Architecture', 'Deployment', 'Monitoring'],
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
            style={backgrounds.whatIDo ? {
                backgroundImage: `url('${backgrounds.whatIDo}')`,
            } : undefined}
        >
            <ParallaxText baseVelocity={200}>WHAT I DO</ParallaxText>

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

            <ParallaxText baseVelocity={200} direction="right">SERVICES</ParallaxText>
        </section>
    );
};

export default WhatIDo;
