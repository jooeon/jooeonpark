import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {motion, useMotionValue, useScroll, useTransform} from 'framer-motion';
import {useLenis} from "lenis/react";

const HorizontalScrollSection = ({
                                     children,
                                     gap = 10, // Gap between items
                                     // duration = 0.5, // Smoothness of the scroll
                                 }) => {
    const containerRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(0);

    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            // immediate: true will skip the smooth animation
            lenis.scrollTo(0, { immediate: true });
        } else {
            // fallback
            window.scrollTo(0, 0);
        }
    }, [lenis]);

    useEffect(() => {
        // Calculate dynamic item width so that ~4.5 items fit in the viewport
        const updateItemWidth = () => {
            setItemWidth(window.innerWidth / 4.5 - gap * 2);
        };

        // Initial calculation
        updateItemWidth();

        // Recalculate on window resize
        window.addEventListener('resize', updateItemWidth);

        // Cleanup on unmount
        return () => window.removeEventListener('resize', updateItemWidth);
    }, [gap]);

    // Calculate total scrollable width dynamically
    const totalScrollWidth =
        children.length * (itemWidth + gap * 2) - window.innerWidth + itemWidth / 5;

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const zeroBased = useMotionValue(0);

    // whenever scrollYProgress changes, push it into zeroBased
    useEffect(() => {
        return scrollYProgress.on("change",(v) => zeroBased.set(v));
    }, [scrollYProgress, zeroBased]);

    // ensure x *always* starts from zero
    const x = useTransform(
        zeroBased,
        [0, 1],
        [0, -totalScrollWidth]
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${totalScrollWidth}px` }} // Ensure enough height for vertical scrolling
        >
            {/* Sticky Wrapper */}
            <div className="sticky top-0 h-screen overflow-hidden pt-16 xl:pt-24 pb-10">
                {/* Motion div for horizontal scrolling */}
                <motion.div
                    style={{ x: x }}
                    className="flex h-full w-max"
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className={`flex h-full x-scroll-item`}
                            style={{
                                width: `${itemWidth}px`,
                                marginLeft: `${gap}px`,
                                marginRight: `${gap}px`,
                            }}
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
    gap: PropTypes.number,
    // duration: PropTypes.number,
};

export default HorizontalScrollSection;
