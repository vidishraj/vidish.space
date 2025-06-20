import './App.css';
import {lazy, Suspense, createContext, useContext} from "react";
import FullPageLoader from "./components/FullPageLoader.tsx";
import loader from './assets/lottieAnimations/loader.json';
import ScrollTracker from "./components/ScrollTracker.tsx";
import { useTheme } from './utils/useTheme';

const HeroSection = lazy(() => import("./pages/HeroSection.tsx"));
const TimelineSection = lazy(() => import("./pages/AboutMe.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Contact = lazy(() => import("./pages/ContactMe.tsx"));

// Create a new theme context
type ThemeContextType = ReturnType<typeof useTheme>;
export const ThemeContext = createContext<ThemeContextType | null>(null);

// Custom hook to use theme context
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

function App() {
    const themeContext = useTheme();

    return (
        <ThemeContext.Provider value={themeContext}>
            <ScrollTracker/>

            <Suspense fallback={<FullPageLoader animationData={loader} message="Loading Hero Section..."/>}>
                <HeroSection/>
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
