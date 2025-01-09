import { PROJECTS } from "../constants";
import { motion } from "framer-motion";

const Project = () => {
    return ( 
        <div className="border-b border-neutral-900 pb-4">
            <motion.h1 
             whileInView={{opacity:1 ,y:0}}
             initial={{opacity:0,y:100}}
             transition={{duration:1}}
            className="my-20 text-center text-4xl">Projects</motion.h1>
            <div>
                {PROJECTS.map((project, index) => (
                    <motion.div 
                        key={index} 
                        className="mb-12 flex flex-wrap items-center lg:justify-start"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* Image Section */}
                        <motion.div 
                            className="w-full mb-4 lg:mb-0 lg:w-1/4 flex justify-center"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <img 
                                src={project.image} 
                                width={150} 
                                height={150} 
                                alt={project.title} 
                                className="rounded shadow-md"
                            />
                        </motion.div>
                        
                        {/* Content Section */}
                        <motion.div 
                            className="w-full lg:w-3/4 px-4"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h6 className="mb-2 text-lg font-semibold text-neutral-100">
                                {project.title}
                            </h6>
                            <p className="text-neutral-300">
                                {project.description}
                            </p>
                            <div>
                                {project.technologies.map((tech, index) => (
                                    <span 
                                        key={index} 
                                        className="mr-2 rounded-md bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-400"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
 
export default Project;