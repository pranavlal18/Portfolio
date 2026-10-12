import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

const getInitials = (title) =>
    title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

export default function Project() {
    return (
        <section id="projects" className="border-b border-neutral-800 pb-24">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="my-20 text-center text-4xl"
            >
                Featured
                <span className="text-neutral-400"> Projects</span>
            </motion.h2>

            <div className="flex flex-col gap-10">
                {PROJECTS.map((project, index) => {
                    const isReversed = index % 2 === 1;
                    // R2 (binding): private repo live in production (github === null)
                    // must show a badge instead of a GitHub link (404s).
                    const isPrivate = !project.github;

                    return (
                        <motion.article
                            key={project.title}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -50 : 50,
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 gap-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center"
                        >
                            {/* Media — alternates sides; gradient placeholder when image === null */}
                            <div className={isReversed ? "lg:order-2" : ""}>
                                {project.image === null ? (
                                    <div className="flex h-48 w-full items-center justify-center rounded-xl border border-neutral-800 bg-gradient-to-br from-cyan-500/25 via-blue-500/10 to-fuchsia-500/20 px-4">
                                        <div className="text-center">
                                            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-neutral-950/70 text-lg font-bold text-cyan-300">
                                                {getInitials(project.title)}
                                            </span>
                                            <p className="text-lg font-semibold text-white">
                                                {project.title}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="h-48 w-full rounded-xl border border-neutral-800 object-cover"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className={isReversed ? "lg:order-1" : ""}>
                                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                                    <span className="text-sm font-semibold text-cyan-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-2xl font-semibold text-white">
                                        {project.title}
                                    </h3>
                                </div>

                                <p className="mb-3 text-sm text-neutral-400">
                                    {project.subtitle}
                                </p>

                                {/* Description capped at 2 lines; full detail lives in the highlights */}
                                <p className="mb-4 line-clamp-2 leading-relaxed text-neutral-300">
                                    {project.description}
                                </p>

                                <ul className="mb-5 space-y-2">
                                    {project.highlights.slice(0, 3).map((highlight) => (
                                        <li
                                            key={highlight}
                                            className="flex gap-2 text-sm text-neutral-400"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-0.5 text-cyan-400"
                                            >
                                                ▸
                                            </span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mb-5 flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs font-medium text-cyan-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    {isPrivate ? (
                                        /* R2: badge instead of a dead GitHub link */
                                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
                                            <FaLock aria-hidden="true" />
                                            Private repo · Live in production
                                        </span>
                                    ) : (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${project.title} on GitHub`}
                                            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-sm text-neutral-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-300"
                                        >
                                            <FaGithub aria-hidden="true" />
                                            Code
                                        </a>
                                    )}

                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${project.title} live demo`}
                                            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-medium text-cyan-950 transition-colors hover:bg-cyan-400"
                                        >
                                            <FaExternalLinkAlt aria-hidden="true" />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
