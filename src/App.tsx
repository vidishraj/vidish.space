import './App.css';
import {lazy, Suspense} from "react";
import FullPageLoader from "./components/FullPageLoader.tsx";
import loader from './assets/lottieAnimations/loader.json';
import ScrollTracker from "./components/ScrollTracker.tsx";

const HeroSection = lazy(() => import("./pages/HeroSection.tsx"));
const TimelineSection = lazy(() => import("./pages/AboutMe.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Contact = lazy(() => import("./pages/ContactMe.tsx"));

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
