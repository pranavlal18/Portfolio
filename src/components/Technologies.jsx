import { SKILLS } from "../constants";
import { motion } from "framer-motion";
import { FaBrain, FaCloud, FaDatabase, FaRobot } from "react-icons/fa";

const GROUP_ICONS = {
    "Generative AI & Agents": { Icon: FaRobot, color: "text-cyan-400" },
    "Backend & Data": { Icon: FaDatabase, color: "text-blue-400" },
    ML: { Icon: FaBrain, color: "text-purple-400" },
    "Cloud & Tools": { Icon: FaCloud, color: "text-amber-400" },
};

const Tech = () => {
    return (
        <section id="skills" className="border-b border-neutral-800 pb-24">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="my-20 text-center text-4xl"
            >
                Skills
                <span className="text-neutral-400"> Stack</span>
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {SKILLS.map(({ group, items }, index) => {
                    const { Icon, color } = GROUP_ICONS[group] ?? {
                        Icon: FaBrain,
                        color: "text-neutral-400",
                    };
                    return (
                        <motion.div
                            key={group}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                            className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <Icon className={`text-2xl ${color}`} aria-hidden="true" />
                                <h3 className="text-lg font-medium text-white">{group}</h3>
                            </div>
                            <ul className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Tech;
