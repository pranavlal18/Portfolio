import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiInfinityLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { CONTACT } from "../constants";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const hoverVariants = {
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b border-neutral-800 bg-neutral-950/70">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6"
      >
        {/* Logo mark */}
        <div className="flex flex-shrink-0 items-center">
          <div className="group">
            <motion.div
              className="text-4xl"
              initial={{ color: "#FFFFFF" }}
              animate={{ color: "#22d3ee" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              role="img"
              aria-label="Pranav Lal K B"
            >
              <RiInfinityLine className="group-hover:animate-spinPulse" />
            </motion.div>
          </div>
        </div>

        {/* Section anchor links */}
        <ul className="order-3 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm sm:order-none sm:w-auto sm:text-base">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="flex items-center gap-6 text-2xl">
          <motion.a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={hoverVariants}
            aria-label="GitHub"
            className="text-white hover:text-green-600 transition-transform duration-100 transform hover:scale-125"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={hoverVariants}
            aria-label="LinkedIn"
            className="text-blue-600 hover:text-blue-400 transition-transform duration-100 transform hover:scale-125"
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </motion.div>
    </nav>
  );
}
