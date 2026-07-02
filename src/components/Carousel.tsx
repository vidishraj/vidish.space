import React, {useEffect, useId, useRef, useState} from "react";
import {motion, useAnimation, useInView} from "framer-motion";
import Modal from "./Modal.tsx";
import {useThemeContext} from '../App';
import {akkountantData, tripsplitData, vidishSpaceData, leetcodeToGitData} from "../assets/modalInfo";
import AnimatedCard from "./AnimatedCard.tsx";
import styles from "../pages/Projects.module.scss";


interface ProjectsGridProps {
    slides: Array<{
        title: string;
        description: string;
        img: string;
        content: React.ReactNode;
    } | null>;
    sectionRef?: React.RefObject<HTMLElement>;
}

export function ProjectsGrid({slides}: ProjectsGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);
    const {season} = useThemeContext();
    const isInView = useInView(gridRef, {once: false, amount: 0.2});
    const controls = useAnimation();
    const [windowWidth, setWindowWidth] = useState(0);
    const [cardsPerRow, setCardsPerRow] = useState(3);
    const [modalData, setModalData] = useState(akkountantData);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 150);
        };
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth < 640) {
            setCardsPerRow(1);
        } else if (windowWidth < 1024) {
            setCardsPerRow(2);
        } else {
            setCardsPerRow(2);
        }
    }, [windowWidth]);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const handleCardClick = (index: number) => {
        switch (index) {
            case 0:
                setModalData(akkountantData);
                break;
            case 1:
                setModalData(tripsplitData);
                break;
            case 2:
                setModalData(vidishSpaceData);
                break;
            case 3:
                setModalData(leetcodeToGitData);
                break;
        }
        setIsOpen(true);
    };

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const numRows = Math.ceil(slides.length / cardsPerRow);

    const rowsOfCards = Array(numRows).fill(0).map((_, rowIndex) => {
        const startIdx = rowIndex * cardsPerRow;
        const rowCards = slides.slice(startIdx, startIdx + cardsPerRow);
        while (rowCards.length < cardsPerRow) {
            rowCards.push(null);
        }
        return rowCards;
    });

    return (
        <div
            ref={gridRef}
            className="relative w-full mt-5 min-h-[100vh] py-16 px-4 md:px-8"
            aria-labelledby={`projects-heading-${id}`}
        >
            {rowsOfCards.map((row, rowIndex) => (
                <motion.div
                    key={`row-${rowIndex}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="mb-8 flex flex-wrap"
                >
                    {row.map((item, colIndex) => {
                        if (item === null) {
                            return (
                                <div
                                    key={`empty-${rowIndex}-${colIndex}`}
                                    className="opacity-0 invisible"
                                    style={{
                                        width: `${100 / cardsPerRow}%`,
                                        height: '400px'
                                    }}
                                />
                            );
                        }

                        return (
                            <motion.div
                                key={`project-${rowIndex}-${colIndex}`}
                                variants={itemVariants}
                                className="px-4 mb-8"
                                style={{width: `${100 / cardsPerRow}%`}}
                            >
                                <div className="h-[400px]">
                                    <AnimatedCard
                                        clickEvent={() => handleCardClick(rowIndex * cardsPerRow + colIndex)}
                                        title={item.title}
                                        description={item.description}
                                        image={item.img}
                                        season={season}
                                        className={styles.baseAnimatedCard}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            ))}

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                data={modalData}
                season={season}
            />
        </div>
    );
}
