import logo from "../assets/kevinRushLogo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"; 
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className=" mb-20 flex items-center justify-between py-6">
            <div className="flex flex-shrink-0 items-center">
                {/* <img className="mx-2 w-10 "src={logo} alt="Logo" /> */}
            </div>

            <div className="m-8 flex items-center justify-center py-6 space-x-4">
                
                <FaLinkedin />
                <FaGithub />
                <FaInstagram />
                <FaTwitter /> 
            </div>
        </nav>
    );
};

export default Navbar;
