import { CONTACT } from "../constants";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <div className="border-b border-neutral-800 pb-24">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1 }}
                className="my-20 text-center text-4xl"
            >
                Get in Touch
            </motion.h1>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                className="flex flex-col items-center text-neutral-300"
            >
                {Object.entries(CONTACT).map(([key, value]) => (
                    <motion.div
                        key={key}
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.1 }} 
                        transition={{ duration: 0.1 }} 
                        viewport={{ once: true }}
                        className="mb-4 text-center cursor-pointer p-4 rounded-lg hover:bg-neutral-800 transition-all"
                    >
                        <h2 className="text-lg font-semibold text-neutral-100 capitalize">
                            {key.replace("No", " Number")}
                        </h2>
                        <p className="text-sm">{value}</p>
                    </motion.div>
                ))}
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.1 }} 
                    transitions={{ duration: 0.1 }} 
                    viewport={{ once: true }}
                    className="mt-6"
                >
                    <button className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition-all">
                        Contact Us
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Contact;