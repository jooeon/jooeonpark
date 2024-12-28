import { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HorizontalScrollSection = ({
                                     children,
                                     itemWidth = 100, // Width of each item in the horizontal scroll
                                     gap = 10, // Gap between items
                                     duration = 0.5, // Smoothness of the scroll
                                 }) => {
    const containerRef = useRef(null);

    // Calculate total scrollable width
    const totalScrollWidth = (children.length * itemWidth) + (children.length - 1) * gap - window.innerWidth + itemWidth;

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Translate scroll progress to horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollWidth]);

    // Apply smooth animation with duration
    const smoothX = useSpring(x, {
        damping: 10,
        stiffness: 30,
        duration: duration,
    });

    return (
        <div
            ref={containerRef}
            className={`relative w-full`}
            style={{ height: `${totalScrollWidth}px` }} // Ensure enough height for vertical scrolling
        >
            {/* Sticky Wrapper */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Motion div for horizontal scrolling */}
                <motion.div
                    style={{ x: smoothX }}
                    className="flex h-full w-max"
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className={`h-full`}
                            style={{ width: `${itemWidth}px`, marginRight: `${gap}px` }}
                        >
                            {child}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

HorizontalScrollSection.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    itemWidth: PropTypes.number,
    gap: PropTypes.number,
    duration: PropTypes.number,
};

export default HorizontalScrollSection;
