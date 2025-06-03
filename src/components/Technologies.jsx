import { RiReactjsLine } from "react-icons/ri";
import { SiDjango, SiPostgresql, SiTailwindcss } from "react-icons/si";
import { FaNodeJs, FaJava } from "react-icons/fa";
import { motion } from "framer-motion";

const Tech = () => {
    const generateRandomValue = (min, max) => Math.random() * (max - min) + min;

    const iconVariants = () => ({
        initial: { y: -generateRandomValue(0,5) },
        animate: {
            y: [generateRandomValue(5,10), -generateRandomValue(5,10)],
            transition: {
                duration: generateRandomValue(1.5, 5),
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
            },
        },
    });

    return (
        <div className="border-b border-neutral-800 pb-24">
            <motion.h1
                whileInView={{opacity:1 ,y:0}}
                initial={{opacity:0,y:-100}}
                transition={{duration:1}}
                className="my-20 text-center text-4xl"
            >
                Technologies
            </motion.h1>
            <motion.div
                whileInView={{opacity:1 ,x:0}}
                initial={{opacity:0,x:-100}}
                transition={{duration:1.5}}
                className="flex flex-wrap items-center justify-center gap-2"
            >
                {/* React */}
                <motion.div
                    variants={iconVariants()}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl p-4 bg-transparent"
                >
                    <RiReactjsLine className="text-7xl text-cyan-500" />
                </motion.div>
                {/* Tailwind CSS */}
                <motion.div
                    variants={iconVariants()}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl p-4 bg-transparent"
                >
                    <SiTailwindcss className="text-7xl text-teal-400" />
                </motion.div>
                {/* Node.js */}
                <motion.div
                    variants={iconVariants()}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl p-4 bg-transparent"
                >
                    <FaNodeJs className="text-7xl text-green-600" />
                </motion.div>
                {/* Django */}
                <motion.div
                    variants={iconVariants()}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl p-4 bg-transparent"
                >
                    <SiDjango className="text-7xl text-green-800" />
                </motion.div>
                {/* Java */}
                <motion.div
                    variants={iconVariants()}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl p-4 bg-transparent"
                >
                    <FaJava className="text-7xl text-orange-600" />
                </motion.div>
                {/* PostgreSQL */}
                <motion.div
                    variants={iconVariants()}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl p-4 bg-transparent"
                >
                    <SiPostgresql className="text-7xl text-blue-700" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Tech;
