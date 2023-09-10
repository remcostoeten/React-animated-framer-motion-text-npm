import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type AnimatedTextProps = {
    className?: string;
    text: string;
    threshold?: number;
    mobileThreshold?: number;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
    className,
    text,
    threshold = 100,
    mobileThreshold = 50,
}) => {
    const letters = Array.from(text);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;

            setIsVisible(
                scrollY > (window.innerWidth <= 768 ? mobileThreshold : threshold)
            );
        };
        window.addEventListener('scroll', handleScroll);

        // Call the handler initially to check the initial scroll position
        handleScroll();

        // Remove the scroll listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold, mobileThreshold]);

    // Variants for Container
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    // Variants for each letter
    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: 'hidden', display: 'flex', fontSize: '2rem' }}
            variants={container}
            initial='hidden'
            className={className}
            animate={isVisible ? 'visible' : 'hidden'}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default AnimatedText;
