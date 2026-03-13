import {AnimatedText} from '../components/AnimatedText.tsx';
import {TextGenerateEffect} from '../components/TextGenerate.tsx';
import {PointerHighlight} from '../components/PointerHighlight.tsx';
import InfiniteMovingCards from '../components/InfiniteMovingCards.tsx';
import {useThemeContext} from '../App';
import styles from './Testimonials.module.scss';

// ─── Data ────────────────────────────────────────────────────

interface Client {
    name: string;
    industry: string;
    initials: string;
    logo?: string;
}

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    initials: string;
}

const clients: Client[] = [
    {name: 'Societe Generale', industry: 'Banking & Finance', initials: 'SG', logo: '/assets/clients/socgen_logo.svg'},
    {name: 'Movo', industry: 'Technology', initials: 'MV', logo: '/assets/clients/movoai_logo.png'},
    {name: 'Raheee', industry: 'Technology', initials: 'RH', logo: '/assets/clients/rahee_logo.avif'},
    {name: 'Cipherome', industry: 'Technology', initials: 'CP', logo: '/assets/clients/cipherome_logo.png'},
    {name: 'SoulTalk', industry: 'Technology', initials: 'ST', logo: '/assets/clients/soultalk_logo.svg'},
    {name: 'Nyxidiom', industry: 'Technology', initials: 'NX', logo: '/assets/clients/nyxidiom_logo.webp'},
];

const testimonials: Testimonial[] = [
    {
        quote: 'Vidish delivered an exceptional full-stack solution that exceeded our expectations. His attention to detail and ability to translate complex requirements into clean, maintainable code was impressive.',
        name: 'Sarah Chen',
        role: 'Engineering Manager',
        company: 'TechCorp',
        initials: 'SC',
    },
    {
        quote: 'Working with Vidish on our cloud migration was seamless. He not only handled the technical complexities but also kept the team aligned throughout the process.',
        name: 'Marcus Rivera',
        role: 'CTO',
        company: 'StartupXYZ',
        initials: 'MR',
    },
    {
        quote: 'The AI-powered features Vidish built into our platform transformed our user experience. His deep understanding of both frontend and ML pipelines is rare to find.',
        name: 'Priya Patel',
        role: 'Product Lead',
        company: 'DataFlow Inc',
        initials: 'PP',
    },
    {
        quote: 'Vidish is the kind of developer who thinks beyond the ticket. He proactively identified performance bottlenecks and delivered optimizations that cut our load times in half.',
        name: 'James O\'Brien',
        role: 'Senior Developer',
        company: 'WebScale',
        initials: 'JO',
    },
];

// ─── Component ───────────────────────────────────────────────

const Testimonials = () => {
    const {season, palette, backgrounds} = useThemeContext();
    const isMonsoon = season === 'monsoon';

    const bgStyle = backgrounds.testimonials
        ? {backgroundImage: `url('${backgrounds.testimonials}')`}
        : season === 'winter'
            ? {background: 'linear-gradient(170deg, #9bb8cf 0%, #a5c0d5 20%, #afc8db 40%, #b8cfe0 60%, #c5d8e8 80%, #d4e4f0 100%)'}
            : {background: 'linear-gradient(170deg, #d4ad78 0%, #e0be8e 20%, #e8cda0 40%, #f0dbb5 60%, #f5e4c8 80%, #f8edda 100%)'};

    return (
        <section
            className={styles.section}
            style={{position: 'relative', ...bgStyle}}
        >
            <div className={styles.content}>
                {/* ── Clients ── */}
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
                            }}
                        >
                            {client.logo ? (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className={styles.clientLogo}
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
                                <span className={styles.clientIndustry} style={{color: palette.textMuted}}>
                                    {client.industry}
                                </span>
                            </div>
                        </div>
                    )}
                />

                {/* ── Testimonials ── */}
                <AnimatedText delay={0.2}>
                    <div className={styles.heading} style={{color: palette.textSecondary, marginTop: '3rem'}}>
                        <PointerHighlight
                            autoAnimate
                            loopDuration={5}
                            rectangleClassName={isMonsoon ? 'border-amber-400/60' : 'border-amber-700/50'}
                            pointerClassName={isMonsoon ? 'text-amber-400' : 'text-amber-700'}
                        >
                            <span style={{fontWeight: 700, color: palette.accent}}>
                                Testimonials
                            </span>
                        </PointerHighlight>
                    </div>
                </AnimatedText>

                <div
                    className={styles.dividerLine}
                    style={{background: palette.dividerGradient}}
                />

                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="normal"
                    className={styles.carouselWrapper}
                    renderItem={(t) => (
                        <div
                            className={styles.testimonialCard}
                            style={{
                                backgroundColor: palette.testimonialCardBg,
                                border: `1px solid ${palette.testimonialCardBorder}`,
                                color: palette.textPrimary,
                            }}
                        >
                            <span
                                className={styles.quoteIcon}
                                style={{color: palette.testimonialQuoteColor}}
                            >
                                &ldquo;
                            </span>
                            <p className={styles.quoteText}>{t.quote}</p>
                            <div className={styles.author}>
                                <div
                                    className={styles.avatar}
                                    style={{
                                        backgroundColor: palette.testimonialQuoteColor + '20',
                                        color: palette.testimonialQuoteColor,
                                    }}
                                >
                                    {t.initials}
                                </div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.authorName}>{t.name}</span>
                                    <span className={styles.authorRole} style={{color: palette.textMuted}}>
                                        {t.role}, {t.company}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </section>
    );
};

export default Testimonials;
