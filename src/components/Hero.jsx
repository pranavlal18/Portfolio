import { HERO_CONTENT, CONTACT } from "../constants";
import profile from '../assets/profile.jpg';
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";

export default function Hero() {
    const container = (x, delay) => ({
        hidden: { x: x, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: delay },
        },
    });

    return (
        <div className="border-b border-neutral-700 pb-4 pt-12 sm:pt-16 lg:mb-36">
            <div className="flex flex-wrap items-center">
                {/* Left Section */}
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <motion.h1
                            variants={container(-100, 0)}
                            initial="hidden"
                            animate="visible"
                            className="pb-6 text-4xl font-thin tracking-tighter sm:text-5xl lg:mt-16 lg:pb-16 lg:text-8xl"
                        >
                            Pranav Lal K B
                        </motion.h1>
                        <motion.span
                            variants={container(-100, 0.5)}
                            initial="hidden"
                            animate="visible"
                            className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-center text-xl tracking-tight text-transparent sm:text-2xl lg:text-left lg:text-3xl"
                        >
                            {"Python Developer · LLM Apps · RAG & Agents"}
                        </motion.span>
                        <motion.p
                            variants={container(-100, 1)}
                            initial="hidden"
                            animate="visible"
                            className="my-2 max-w-xl py-6 text-center font-light tracking-tight lg:text-left"
                        >
                            {HERO_CONTENT}
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            variants={container(-100, 1.4)}
                            initial="hidden"
                            animate="visible"
                            className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
                        >
                            <a
                                href="#projects"
                                className="rounded-lg bg-cyan-400 px-6 py-3 font-medium text-cyan-950 transition-colors hover:bg-cyan-300"
                            >
                                View Projects
                            </a>
                            <a
                                href="#contact"
                                className="rounded-lg border border-neutral-600 px-6 py-3 font-medium text-white transition-colors hover:border-neutral-300 hover:bg-neutral-800"
                            >
                                Get in Touch
                            </a>
                        </motion.div>

                        {/* Location line */}
                        <motion.p
                            variants={container(-100, 1.7)}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-400 lg:justify-start"
                        >
                            <FaMapMarkerAlt className="text-cyan-400" aria-hidden="true" />
                            {CONTACT.location}
                        </motion.p>

                        {/* Email / phone / socials */}
                        <motion.div
                            variants={container(-100, 1.9)}
                            initial="hidden"
                            animate="visible"
                            className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-neutral-400 lg:justify-start"
                        >
                            <a
                                href={`mailto:${CONTACT.email}`}
                                className="flex items-center gap-2 transition-colors hover:text-white"
                            >
                                <FaEnvelope aria-hidden="true" />
                                {CONTACT.email}
                            </a>
                            <a
                                href={`tel:${CONTACT.phoneNo.replace(/\s+/g, "")}`}
                                className="flex items-center gap-2 transition-colors hover:text-white"
                            >
                                <FaPhone aria-hidden="true" />
                                {CONTACT.phoneNo}
                            </a>
                            <a
                                href={CONTACT.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="flex items-center gap-2 transition-colors hover:text-white"
                            >
                                <FaGithub aria-hidden="true" />
                                GitHub
                            </a>
                            <a
                                href={CONTACT.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex items-center gap-2 transition-colors hover:text-white"
                            >
                                <FaLinkedin aria-hidden="true" />
                                LinkedIn
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="mt-10 w-full lg:mt-0 lg:w-1/2 lg:p-8">
                    <div className="flex justify-center">
                        <motion.img
                            variants={container(100, 2.1)}
                            initial="hidden"
                            animate="visible"
                            src={profile}
                            alt="Pranav Lal K B"
                            className="h-64 w-64 rounded-lg object-cover sm:h-80 sm:w-80 lg:h-[25rem] lg:w-[25rem]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
