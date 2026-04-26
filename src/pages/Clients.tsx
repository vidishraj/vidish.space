import {useState} from 'react';
import {AnimatedText} from '../components/AnimatedText.tsx';
import {TextGenerateEffect} from '../components/TextGenerate.tsx';
import {PointerHighlight} from '../components/PointerHighlight.tsx';
import InfiniteMovingCards from '../components/InfiniteMovingCards.tsx';
import ClientModal from '../components/ClientModal.tsx';
import {useThemeContext} from '../App';
import styles from './Clients.module.scss';

interface Client {
    name: string;
    shortDesc: string;
    initials: string;
    logo?: string;
    logoBg?: string;
    logoFill?: boolean;
    role: string;
    duration: string;
    summary: string[];
    tech: string[];
}

const clients: Client[] = [
    {
        name: 'Societe Generale',
        shortDesc: 'Legacy-to-cloud migration, 5+ microservices on AWS',
        initials: 'SG',
        logo: '/assets/clients/socgen_logo.svg',
        role: 'Software Engineer',
        duration: 'Jul 2022 – Feb 2026 (3.5 years)',
        summary: [
            'Migrated a mission-critical regulatory pipeline from a Java 8 monolith to Java 17 microservices on AWS, serving 1,000+ users.',
            'Built and maintained 5+ Spring Boot microservices handling large-scale banking data processing.',
            'Developed a React + TypeScript frontend for the new platform, replacing a legacy JSP application.',
            'Set up CI/CD pipelines with Jenkins, containerized services with Docker, and deployed via AWS ECS & ECR.',
            'Collaborated with cross-functional French teams on architecture decisions and sprint deliveries.',
        ],
        tech: ['Java 17', 'Spring Boot', 'React', 'TypeScript', 'AWS', 'Docker', 'Jenkins', 'PostgreSQL'],
    },
    {
        name: 'PwC India',
        shortDesc: 'Contract management POC with Python & Flask',
        initials: 'PW',
        logo: '/assets/clients/pwc_logo.jpeg',
        logoFill: true,
        role: 'Intern',
        duration: 'Jan 2022 – May 2022 (6 months)',
        summary: [
            'Built a proof-of-concept contract management tool with a Tkinter GUI and Flask backend.',
            'Implemented PDF parsing to automate contract auditing workflows, saving hours of manual review.',
            'Deployed the tool on Windows Server using uWSGI + IIS.',
            'First exposure to corporate engineering practices — Git, Jira, and collaborative development.',
        ],
        tech: ['Python', 'Flask', 'Tkinter', 'PDF Parsing', 'Windows Server', 'uWSGI'],
    },
    {
        name: 'Movo',
        shortDesc: 'AI pipelines, vector DB & CRM integrations',
        initials: 'MV',
        logo: '/assets/clients/movoai_logo.png',
        role: 'Full-Stack Developer',
        duration: 'Dec 2025 – Mar 2026 (3 months)',
        summary: [
            'Built SMS/email AI pipelines and a vector database with knowledge base for intelligent query handling.',
            'Integrated LeagueApps & Salesforce CRMs into the platform for seamless data sync.',
            'Developed an insights engine and lead scoring v2 with multi-location support.',
            '84 commits across backend (55 merged + 14 unmerged PRs) and frontend (15 commits).',
        ],
        tech: ['Node.js', 'React', 'Vector DB', 'LangChain', 'Salesforce API', 'LeagueApps'],
    },
    {
        name: 'Raheee',
        shortDesc: 'Mobile app refactor, 154MB to 20MB',
        initials: 'RH',
        logo: '/assets/clients/rahee_logo.avif',
        role: 'Full-Stack Developer',
        duration: '2-week sprint (~118 hrs)',
        summary: [
            'Refactored a Capacitor React mobile app — security hardening, TypeScript migration, and architecture overhaul.',
            'Rewrote the video player with a reels-style feed for smoother user experience.',
            'Reduced app size from 154MB to 20MB through aggressive optimization.',
            'Set up the deployment pipeline for streamlined releases.',
        ],
        tech: ['React', 'TypeScript', 'Capacitor', 'Mobile', 'Video Player', 'CI/CD'],
    },
    {
        name: 'Cipherome',
        shortDesc: 'Eclipse Dataspace Connector & Keycloak IAM',
        initials: 'CP',
        logo: '/assets/clients/cipherome_logo.png',
        role: 'Backend Developer',
        duration: '1 month',
        summary: [
            'Implemented a custom data plane for Eclipse Dataspace Connector (EDC) for secure genomic data exchange.',
            'Integrated Keycloak IAM for authentication and authorization across the connector.',
            'Delivered architectural improvements and optimizations beyond the original scope.',
        ],
        tech: ['Java', 'Eclipse EDC', 'Keycloak', 'IAM', 'REST APIs'],
    },
    {
        name: 'SoulTalk',
        shortDesc: 'Full-stack wellness AI platform, sole developer',
        initials: 'ST',
        logo: '/assets/clients/soultalk_logo.svg',
        role: 'Sole Developer',
        duration: '6 months (216 commits)',
        summary: [
            'Built the entire platform end-to-end: Node/Express backend, React Native mobile app, and landing website.',
            'Designed and implemented AI-powered wellness features with conversational interfaces.',
            'Set up infrastructure with Docker, CI/CD pipelines, and cloud deployment.',
            'Sole developer responsible for architecture, development, testing, and deployment.',
        ],
        tech: ['Node.js', 'Express', 'React Native', 'React', 'Docker', 'CI/CD', 'AI/ML'],
    },
    {
        name: 'Nyxidiom',
        shortDesc: 'Raspberry Pi embedded system with UART comms',
        initials: 'NX',
        logo: '/assets/clients/nyxidiom_logo.webp',
        logoBg: '#1a1a2e',
        role: 'Embedded Systems Developer',
        duration: '3.5 months (71 commits)',
        summary: [
            'Built a Raspberry Pi container return/deposit system communicating with STM32 via UART.',
            'Implemented QR scanning, server sync, and audit logging for the kiosk system.',
            'Developed a hardware simulator for testing without physical devices.',
        ],
        tech: ['Python', 'Raspberry Pi', 'UART', 'STM32', 'QR Scanning', 'Embedded'],
    },
];

const Clients = () => {
    const {season, palette, backgrounds} = useThemeContext();
    const isMonsoon = season === 'monsoon';
    const [modalClient, setModalClient] = useState<Client | null>(null);

    const bgStyle = backgrounds.testimonials
        ? {backgroundImage: `url('${backgrounds.testimonials}')`}
        : season === 'winter'
            ? {background: 'linear-gradient(170deg, #a5bcd1 0%, #a0b8ce 20%, #9bb4cb 40%, #96b0c8 60%, #91acc5 80%, #8ca8c2 100%)'}
            : {background: 'linear-gradient(170deg, #f5debb 0%, #f7e2c5 20%, #f8e6cf 40%, #faebd8 60%, #fbefe1 80%, #fcf3ea 100%)'};

    return (
        <section
            id="sectionClients"
            className={styles.section}
            style={{position: 'relative', ...bgStyle}}
        >
            <div className={styles.content}>
                <AnimatedText delay={0.1}>
                    <div className={styles.heading} style={{color: palette.textSecondary}}>
                        <PointerHighlight
                            autoAnimate
                            loopDuration={5}
                            rectangleClassName={isMonsoon ? 'border-amber-400/60' : 'border-amber-700/50'}
                            pointerClassName={isMonsoon ? 'text-amber-400' : 'text-amber-700'}
                        >
                            <span style={{fontWeight: 700, color: palette.accent}}>
                                Clients
                            </span>
                        </PointerHighlight>
                        <TextGenerateEffect
                            parentStyle={{color: palette.textSecondary}}
                            words=" I've worked with"
                        />
                    </div>
                </AnimatedText>

                <div
                    className={styles.dividerLine}
                    style={{background: palette.dividerGradient}}
                />

                <InfiniteMovingCards
                    items={clients}
                    direction="left"
                    speed="slow"
                    className={styles.carouselWrapper}
                    renderItem={(client) => (
                        <div
                            className={styles.clientCard}
                            style={{
                                backgroundColor: palette.testimonialCardBg,
                                border: `1px solid ${palette.testimonialCardBorder}`,
                                color: palette.textPrimary,
                                cursor: 'pointer',
                            }}
                            onClick={() => setModalClient(client)}
                        >
                            {client.logo ? (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className={styles.clientLogo}
                                    style={{
                                        ...(client.logoBg ? {background: client.logoBg} : {}),
                                        ...(client.logoFill ? {objectFit: 'cover', padding: 0} : {}),
                                    }}
                                />
                            ) : (
                                <div
                                    className={styles.clientAvatar}
                                    style={{
                                        backgroundColor: palette.testimonialQuoteColor + '18',
                                        color: palette.testimonialQuoteColor,
                                    }}
                                >
                                    {client.initials}
                                </div>
                            )}
                            <div className={styles.clientInfo}>
                                <span className={styles.clientName}>{client.name}</span>
                                <span className={styles.clientDesc} style={{color: palette.textSecondary}}>
                                    {client.shortDesc}
                                </span>
                                <span className={styles.tapHint} style={{color: palette.accent}}>
                                    Tap to view details &rarr;
                                </span>
                            </div>
                        </div>
                    )}
                />
            </div>

            <ClientModal
                isOpen={!!modalClient}
                onClose={() => setModalClient(null)}
                clientName={modalClient?.name ?? ''}
                clientLogo={modalClient?.logo}
                clientLogoBg={modalClient?.logoBg}
                clientInitials={modalClient?.initials ?? ''}
                role={modalClient?.role ?? ''}
                duration={modalClient?.duration ?? ''}
                summary={modalClient?.summary ?? []}
                tech={modalClient?.tech ?? []}
                season={season}
            />
        </section>
    );
};

export default Clients;
