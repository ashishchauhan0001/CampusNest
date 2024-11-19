import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Staggering the animation of each child (letter)
                delayChildren: 0.3, // Delay before animation starts
            },
        },
    };

    const letterVariant = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: [1, 1.5, 1], // Smooth pulsing effect
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-gray-300">
            {/* Pulse Animation for Text */}
            <motion.div
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                className="text-5xl font-bold text-black flex gap-2"
            >
                {"Campus".split("").map((char, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariant}
                        className="inline-block text-red-500"
                    >
                        {char}
                    </motion.span>
                ))}
                {"Nest".split("").map((char, index) => (
                    <motion.span
                        key={`nest-${index}`}
                        variants={letterVariant}
                        className="inline-block text-black-500"
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
};

export default Loader;
