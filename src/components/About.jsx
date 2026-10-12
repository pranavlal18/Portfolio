import aboutImg from "../assets/about.jpg";
import { ABOUT_TEXT } from "../constants";
import { motion } from "framer-motion";

const STATS = ["MCA 8.3 CGPA", "30+ GitHub repos", "2 internships"];

export default function About() {
    return (
        <section id="about" className="border-b border-neutral-900 pb-4">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="my-20 text-center text-4xl"
            >
                About
                <span className="text-neutral-400"> Me</span>
            </motion.h2>
            <div className="flex flex-wrap">
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 lg:p-8"
                >
                    <div className="flex items-center justify-center">
                        <img
                            className="aspect-square w-full max-w-[25rem] rounded-2xl object-cover"
                            src={aboutImg}
                            alt="Pranav Lal K B"
                        />
                    </div>
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2"
                >
                    <div className="flex justify-center lg:justify-start">
                        <p className="my-2 max-w-xl py-6 font-light tracking-tight">{ABOUT_TEXT}</p>
                    </div>
                    {/* Snapshot stat chips */}
                    <div className="flex flex-wrap justify-center gap-3 pb-6 lg:justify-start">
                        {STATS.map((stat) => (
                            <span
                                key={stat}
                                className="rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-300"
                            >
                                {stat}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
