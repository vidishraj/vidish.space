import './App.css';
import {lazy, Suspense, createContext, useContext} from "react";
import FullPageLoader from "./components/FullPageLoader.tsx";
import loader from './assets/lottieAnimations/loader.json';
import ScrollTracker from "./components/ScrollTracker.tsx";
import {useSeason} from './utils/useSeason';

const HeroSection = lazy(() => import("./pages/HeroSection.tsx"));
const WhatIDo = lazy(() => import("./pages/WhatIDo.tsx"));
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

function App() {
    const seasonContext = useSeason();

    return (
        <ThemeContext.Provider value={seasonContext}>
            <ScrollTracker/>

            <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Hero Section..."/>}>
                <HeroSection/>
            </Suspense>

            <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Services..."/>}>
                <WhatIDo/>
            </Suspense>

            <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Timeline..."/>}>
                <TimelineSection/>
            </Suspense>

            <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Projects..."/>}>
                <Projects/>
            </Suspense>

            <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Contact..."/>}>
                <Contact/>
            </Suspense>
        </ThemeContext.Provider>
    );
}

export default App;
