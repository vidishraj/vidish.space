import './App.css';
import {lazy, Suspense, createContext, useContext, useEffect} from "react";
import FullPageLoader from "./components/FullPageLoader.tsx";
import loader from './assets/lottieAnimations/loader.json';
import ScrollTracker from "./components/ScrollTracker.tsx";
import {useSeason} from './utils/useSeason';
import {ParticleOverlay} from './components/BackgroundBeams.tsx';

const HeroSection = lazy(() => import("./pages/HeroSection.tsx"));
const WhatIDo = lazy(() => import("./pages/WhatIDo.tsx"));
const Clients = lazy(() => import("./pages/Clients.tsx"));
// const Testimonials = lazy(() => import("./pages/Testimonials.tsx"));
const TimelineSection = lazy(() => import("./pages/AboutMe.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Contact = lazy(() => import("./pages/ContactMe.tsx"));

type SeasonContextType = ReturnType<typeof useSeason>;
export const ThemeContext = createContext<SeasonContextType | null>(null);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

function trackVisit() {
    fetch('/api/track', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            page_url: window.location.href,
            referrer: document.referrer,
        }),
    }).catch(() => {});
}

function App() {
    const seasonContext = useSeason();
    const isWinter = seasonContext.season === 'winter';

    useEffect(() => {
        trackVisit();
    }, []);

    return (
        <ThemeContext.Provider value={seasonContext}>
            <ScrollTracker/>

            <div style={{position: 'relative'}}>
                {/* For non-winter: particles only cover hero+services+clients */}
                <div style={{position: 'relative'}}>
                    <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Hero Section..."/>}>
                        <HeroSection/>
                    </Suspense>

                    <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Services..."/>}>
                        <WhatIDo/>
                    </Suspense>

                    <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Clients..."/>}>
                        <Clients/>
                    </Suspense>

                    {!isWinter && <ParticleOverlay particleMode={seasonContext.particleMode} count={30} />}
                </div>

                {/* TODO: Uncomment when testimonials are ready */}
                {/* <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Testimonials..."/>}>
                    <Testimonials/>
                </Suspense> */}

                <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Timeline..."/>}>
                    <TimelineSection/>
                </Suspense>

                <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Projects..."/>}>
                    <Projects/>
                </Suspense>

                <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Contact..."/>}>
                    <Contact/>
                </Suspense>

                {/* Winter snow: fixed, visible across viewport, between backgrounds and content */}
                {isWinter && <ParticleOverlay particleMode={seasonContext.particleMode} count={30} />}
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
