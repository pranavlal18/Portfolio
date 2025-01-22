import { HERO_CONTENT } from "../constants";
import profilePic from '../assets/profilePic.jpeg';
import { motion } from "framer-motion";
const Hero = () => {
    const container =(x,delay)=>({
        hidden:{ x:x ,opacity:0},
        visible:{
            x:0,
            opacity:1,
            transition:{duration:0.5,delay:delay},
        },



    });
    return (
        <div className="border-b border-neutral-700 pb-4 lg:mb-36">
            <div className="flex flex-wrap">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 ">
                <div className="flex flex-col items-center lg:items-start -mt-8">
                        <motion.h1 
                        variants={container(-100,0)}
                        initial="hidden"
                        animate="visible"
                        className="pb-16 text-6xl font-thin tracking-tighter lg:mt-16 lg:text-8xl">
                            Pranav Lal
                        </motion.h1>
                        <motion.span
                        variants={container(-100,0.5)}
                        initial="hidden"
                        animate="visible"
                        className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent">
                            Full Stack Developer
                        </motion.span>
                        <motion.p variants={container(-100,1)}
                        initial="hidden"
                        animate="visible" className="my-2 max-w-xl py-6 font-light tracking-tighter text-center lg:text-left">
                            {HERO_CONTENT}
                        </motion.p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 lg:p-8">
                    <div className="flex justify-center">
                        <motion.img
                        variants={container(100,1.3)}
                        initial="hidden"
                        animate="visible"
                            src={profilePic}
                            alt="profile"
                            className="w-[30rem] h-[30rem] lg:w-[25rem] lg:h-[25rem] rounded-lg"

                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
