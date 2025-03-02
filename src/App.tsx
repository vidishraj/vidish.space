import './App.css';
import {lazy, Suspense} from "react";
import ScrollTracker from "./components/ScrollTracker.tsx";
import FullPageLoader from "./components/FullPageLoader.tsx";
import loader from './assets/loader.json'

const HeroSection = lazy(() => import("./pages/HeroSection.tsx"));
const TimelineSection = lazy(() => import("./pages/AboutMe.tsx"));
const Section3 = lazy(() => import("./pages/Projects.tsx"));
const Section4 = lazy(() => import("./pages/ContactMe.tsx"));

function App() {
    return (
        <>
            <Suspense fallback={<FullPageLoader animationData={loader} message={""}/>}>
                <ScrollTracker/>
                <HeroSection/>
                <TimelineSection/>
                <Section3/>
                <Section4/>
            </Suspense>
        </>
    );
}

export default App;