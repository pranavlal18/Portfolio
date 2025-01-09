
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"; 
import { FaInstagram } from "react-icons/fa";
import { RiInfinityLine } from "react-icons/ri";
import { motion } from "framer-motion";

const Navbar = () => {
    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
      };
    
      const hoverVariants = {
        hover: { scale: 1.2, transition: { type: "spring", stiffness: 300 } },
      };
    return (
        <nav className=" mb-20 flex items-center justify-between py-6">
            <div className="flex flex-shrink- items-center">
      <div className="group">
        <motion.div
          className="text-4xl"  
          initial={{ color: "#FFFFFF" }}
          animate={{ color: "#6B21A8" }}  
          transition={{ duration: 1.5, ease: "easeInOut" }}  
        >
          <RiInfinityLine className="group-hover:animate-spinPulse" />
        </motion.div>
      </div>
    </div>

            <motion.div
        className="m-8 flex items-center justify-center py-6 space-x-6 text-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <motion.a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={hoverVariants}
          className="text-blue-600 hover:text-blue-800 transition-transform duration-100 transform hover:scale-125"
        >
          <FaLinkedin />
        </motion.a>

        <motion.a
          href="https://github.com/pranavlal18"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={hoverVariants}
           className="text-white hover:text-green-600 transition-transform duration-100 transform hover:scale-125"
        >
          <FaGithub />
        </motion.a>
        <a
          href="https://twitter.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-transform duration-300 transform hover:scale-125"
        >
          <FaTwitter />
        </a>

        <motion.a
          href="https://instagram.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={hoverVariants}
          className="text-pink-500 hover:text-pink-600 transition-transform duration-100 transform hover:scale-125"
        >
          <FaInstagram />
        </motion.a>

       
      </motion.div>
    </nav>
    );
};

export default Navbar;
