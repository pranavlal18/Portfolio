import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "../constants";
import { motion } from "framer-motion";
import { FaCertificate, FaGraduationCap } from "react-icons/fa";

// Shared rail marker class for each timeline entry (S5: vertical timeline).
const timelineDotClass = (color) =>
    `absolute -left-6 top-5 -translate-x-1/2 h-3 w-3 rounded-full border bg-neutral-950 sm:-left-8 ${color}`;

const entryProps = (index) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: index * 0.1 },
    viewport: { once: true },
    className: "relative mb-10 last:mb-0",
});

export default function Experience() {
    return (
        <section id="experience" className="border-b border-neutral-800 pb-24">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="my-20 text-center text-4xl"
            >
                {"Experience"}
                <span className="text-neutral-400">{" & Education"}</span>
            </motion.h2>

            {/* Vertical timeline: work -> education -> certifications */}
            <ol className="relative mx-auto max-w-3xl border-l border-neutral-800 pl-6 sm:pl-8">
                {EXPERIENCE.map((job, index) => (
                    <motion.li key={`${job.org}-${job.period}`} {...entryProps(index)}>
                        <span
                            aria-hidden="true"
                            className={timelineDotClass("border-cyan-400")}
                        />
                        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
                            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h3 className="text-lg font-semibold text-white sm:text-xl">
                                    {job.role}
                                    <span className="font-normal text-neutral-400">
                                        {" · "}
                                        {job.org}
                                    </span>
                                </h3>
                                <span className="text-sm text-cyan-400">{job.period}</span>
                            </div>
                            <ul className="space-y-2">
                                {job.bullets.map((bullet) => (
                                    <li
                                        key={bullet}
                                        className="flex gap-2 text-sm text-neutral-400"
                                    >
                                        <span aria-hidden="true" className="mt-0.5 text-cyan-400">
                                            ▸
                                        </span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.li>
                ))}

                {EDUCATION.map((edu, index) => (
                    <motion.li
                        key={`${edu.degree}-${edu.school}`}
                        {...entryProps(EXPERIENCE.length + index)}
                    >
                        <span
                            aria-hidden="true"
                            className={timelineDotClass("border-purple-400")}
                        />
                        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
                            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                                    <FaGraduationCap
                                        aria-hidden="true"
                                        className="text-purple-400"
                                    />
                                    {edu.degree}
                                    <span className="font-normal text-neutral-400">
                                        {" · "}
                                        {edu.school}
                                    </span>
                                </h3>
                                <span className="text-sm text-cyan-400">{edu.period}</span>
                            </div>
                            <p className="text-sm text-neutral-400">{edu.score}</p>
                        </div>
                    </motion.li>
                ))}

                <motion.li {...entryProps(EXPERIENCE.length + EDUCATION.length)}>
                    <span aria-hidden="true" className={timelineDotClass("border-amber-400")} />
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <FaCertificate aria-hidden="true" className="text-amber-400" />
                            <h3 className="text-lg font-semibold text-white">
                                {"Certifications"}
                            </h3>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {CERTIFICATIONS.map((cert) => (
                                <li
                                    key={cert}
                                    className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs font-medium text-cyan-300"
                                >
                                    {cert}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.li>
            </ol>
        </section>
    );
}
