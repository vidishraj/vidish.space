"use client";
import React, {useEffect, useId, useRef, useState} from "react";
import {motion, useAnimation, useInView} from "framer-motion";
import styles from "../pages/Projects.module.scss";
import AnimatedCard from "./AnimatedCard";
import Modal from "./Modal.tsx";
import akkountantData from '/assets/akkountantModal/akkountantInfo.json?url';
import tripsplitData from '/assets/tripsplitModal/tripsplitInfo.json?url';
import leetcodeToGitData from '/assets/leetcodeToGitModal/leetcodeToGitInfo.json?url';
import vidishSpaceData from '/assets/vidishSpaceModal/vidishSpaceInfo.json?url';

import {useGlobal} from "../GlobalContext.tsx";

interface SlideData {
    title: string;
    description: string;
    img: string;
}

interface ProjectsGridProps {
    slides: SlideData[];
    sectionRef?: React.RefObject<HTMLElement>;
}

export function ProjectsGrid({slides}: ProjectsGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);
    const {isToggled} = useGlobal();
    const isInView = useInView(gridRef, {once: false, amount: 0.2});
    const controls = useAnimation();
    const [windowWidth, setWindowWidth] = useState(0);
    const [cardsPerRow, setCardsPerRow] = useState(3);
    const [modalData, setModalData] = useState(akkountantData);


    // Update window width on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Set initial width
        setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine cards per row based on window width
    useEffect(() => {
        if (windowWidth < 640) {
            setCardsPerRow(1); // Mobile: 1 card per row
        } else if (windowWidth < 1024) {
            setCardsPerRow(2); // Tablet: 2 cards per row
        } else {
            setCardsPerRow(2); // Desktop: 3 cards per row
        }
    }, [windowWidth]);

    // Set up animations when grid comes into view
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

    // Container animation variants
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

    // Item animation variants
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

    // Calculate number of rows needed
    const numRows = Math.ceil(slides.length / cardsPerRow);

    // Create a 2D array of slides organized by rows
    const rowsOfCards = Array(numRows).fill(0).map((_, rowIndex) => {
        const startIdx = rowIndex * cardsPerRow;
        const rowCards = slides.slice(startIdx, startIdx + cardsPerRow);

        // Pad with null values to maintain equal cards per row
        while (rowCards.length < cardsPerRow) {
            // @ts-expect-error - Null value is fine. Fckin tsx
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
            {/* Map through rows and render each row */}
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
                            // Return empty space for padding
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
                                        darkMode={isToggled}
                                        className={styles.baseAnimatedCard}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            ))}

            {/* "Load more" button with animation */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                transition={{delay: 0.5, duration: 0.5}}
                className="flex justify-center mt-12"
            >
            </motion.div>


            {/* Modal component */}
            <Modal
                isOpen={isOpen}
                onClose={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                }}
                data={modalData}
                darkMode={isToggled}
            />
        </div>
    );
}