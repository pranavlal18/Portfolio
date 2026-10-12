import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

// S6: every channel is an explicit row — no generic loop, no dead "Contact Us" button.
// mailto:/tel: are same-tab anchors (no target); external links open in a new tab.
const CHANNELS = [
    {
        label: "Email",
        value: CONTACT.email,
        href: `mailto:${CONTACT.email}`,
        Icon: FaEnvelope,
        external: false,
    },
    {
        label: "Phone",
        value: CONTACT.phoneNo,
        href: `tel:${CONTACT.phoneNo.replace(/\s+/g, "")}`,
        Icon: FaPhone,
        external: false,
    },
    {
        label: "GitHub",
        value: CONTACT.github,
        href: CONTACT.github,
        Icon: FaGithub,
        external: true,
    },
    {
        label: "LinkedIn",
        value: CONTACT.linkedin,
        href: CONTACT.linkedin,
        Icon: FaLinkedin,
        external: true,
    },
];

const rowProps = (index) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.1 },
    viewport: { once: true },
});

export default function Contact() {
    return (
        <section id="contact" className="border-b border-neutral-800 pb-24">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="my-20 mb-4 text-center text-4xl"
            >
                {"Let's work together"}
            </motion.h2>
            <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-10 text-center text-neutral-400"
            >
                {"Open to jobs & freelance gigs"}
            </motion.p>

            <div className="mx-auto flex max-w-xl flex-col gap-4">
                {CHANNELS.map(({ label, value, href, Icon, external }, index) => (
                    <motion.a
                        key={label}
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...rowProps(index)}
                        whileHover={{ scale: 1.02 }}
                        className="flex min-w-0 items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 transition-colors hover:bg-neutral-800"
                    >
                        <Icon className="shrink-0 text-lg text-cyan-400" aria-hidden="true" />
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-neutral-100">{label}</p>
                            <p className="break-words text-sm text-neutral-400">{value}</p>
                        </div>
                    </motion.a>
                ))}

                {/* Location: plain text, not a link */}
                <motion.div
                    key="location"
                    {...rowProps(CHANNELS.length)}
                    className="flex min-w-0 items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4"
                >
                    <FaMapMarkerAlt
                        className="shrink-0 text-lg text-cyan-400"
                        aria-hidden="true"
                    />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-100">Location</p>
                        <p className="break-words text-sm text-neutral-400">
                            {CONTACT.location}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
