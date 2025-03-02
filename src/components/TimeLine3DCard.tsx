import React, {useRef, useState} from "react";
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";
import {cn} from '../utils/utils'

export const ContainerScroll = ({
                                    children,
                                    containerClassName,
                                    className
                                }: {
    children: React.ReactNode;
    containerClassName: string,
    className: string
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const scaleDimensions = () => {
        return isMobile ? [0.7, 0.9] : [1.05, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    // const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div
            className="h-[80rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-2"
            ref={containerRef}
        >
            <div
                className="py-10 md:py-40 w-full relative"
                
                style={{
                    perspective: "1000px",
                }}
            >
                {/*<Header translate={translate} titleComponent={titleComponent}/>*/}
                <WobbleCard rotate={rotate} scale={scale} containerClassName={containerClassName} className={className}
                >
                    {children}
                </WobbleCard>
            </div>
        </div>
    );
};


export const WobbleCard = ({
                               children,
                               containerClassName,
                               className,
                               scale, rotate
                           }: {
    children: React.ReactNode;
    containerClassName?: string;
    className?: string;
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
}) => {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const {clientX, clientY} = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) / 20;
        const y = (clientY - (rect.top + rect.height / 2)) / 20;
        setMousePosition({x, y});
    };
    return (
        <>

            {/*<Lottie animationData={animationData}*/}
            {/*        style={{height: '150px', width: '100%', position: 'absolute', top: "0"}}/>*/}
            <motion.section
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                    setIsHovering(false);
                    setMousePosition({x: 0, y: 0});
                }}
                style={{
                    transform: isHovering
                        ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
                        : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                    transition: "transform 0.1s ease-out",
                    rotateX: rotate,
                    scale,
                    boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
                }}
                className={cn(
                    "mx-auto w-full bg-indigo-800  relative rounded-2xl overflow-hidden",
                    containerClassName,
                )}
            >
                <div
                    className="relative  h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden"
                    style={{
                        boxShadow: "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
                    }}
                >
                    <motion.div
                        style={{
                            transform: isHovering
                                ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
                                : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                            transition: "transform 0.1s ease-out",
                        }}
                        className={cn("h-full px-4 py-20 sm:px-10", className)}
                    >
                        <Noise/>
                        {children}
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

const Noise = () => {
    return (
        <div
            className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
            style={{
                backgroundImage: "url(/noise.webp)",
                backgroundSize: "30%",
            }}

        ></div>
    );
};
