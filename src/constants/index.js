import project1 from "../assets/projects/stock.png";
import dish from "../assets/projects/dish.png";
import chatty from "../assets/projects/chatty.png";
import ecom from "../assets/projects/ecom.png";

export const HERO_CONTENT = `

I am a passionate full-stack developer with a strong foundation in crafting robust and scalable web applications. I have developed expertise in front-end technologies like React and HTML/CSS, paired with back-end technologies such as Django, Node.js, and PostgreSQL
 through hands-on experience and continuous learning.

I thrive on solving complex problems and embracing new challenges to stay ahead in the dynamic field of development. My goal is to leverage my skills to create innovative solutions that deliver exceptional user experiences and drive meaningful impact`;

export const ABOUT_TEXT = `

I am a dedicated and versatile full-stack developer with a passion for creating efficient and user-friendly web applications. With experience in front-end technologies like React and back-end technologies such as Django, Node.js, and PostgreSQL
, I continuously strive to learn and adapt to new challenges in web development. My journey in this field began with a curiosity about how things work, and it has evolved into a career where I am committed to delivering high-quality, scalable solutions.

I thrive in collaborative environments and enjoy tackling complex problems. Outside of coding, I love staying active, exploring new technologies, and helping my friends with their tech challenges and projects.`;

export const PROJECTS = [
   {
    title: "Dishcovery",
    description: "A recipe recommendation platform based on user preferences, dietary restrictions, and ingredients. Features include user registration, saved recipes, filtering, and a responsive UI. Integrated with PostgreSQL for scalable and efficient data management.",
    image: dish,  // add your project images accordingly in public folder
    technologies: ["Python", "Django", "PostgreSQL", "HTML", "CSS", "JavaScript"]
  },
  {
    title: "E-commerce Website",
    description: "Built a dynamic online store for electronic products with real-time inventory and authentication. Utilized Firebase for backend services like authentication and database management. Delivered a smooth user experience with a clean and intuitive frontend.",
    image: ecom,
    technologies: ["React", "Firebase", "TailwindCSS"]
  },
  {
    title: "Chatty",
    description: "Developed a real-time full-stack chat application using Socket.io and MERN. Included features like JWT authentication, online user tracking, and error handling. Zustand was used for global state management, styled with TailwindCSS and DaisyUI.",
    image: chatty,
    technologies: ["MERN", "TailwindCSS", "DaisyUI", "Socket.io", "JWT", "Zustand"]
  },
  {
    title: "Stock Vision",
    image: project1,
    description:
      "Stock Vision is a web-based platform designed to help stock investors make informed decisions. It provides users with predictive analytics, historical stock data, and portfolio management tools. Through features like real-time stock predictions, trending news, and in-depth market insights, Stock Vision aims to empower investors with the tools they need to optimize their strategies and grow their portfolios.",
    technologies: ["HTML", "CSS", "Django", "SQlite"],
  },
  
];

export const CONTACT = {

  email: "pranavlal18@gmail.com",

  phoneNo:"+91 9188883090",


};
