import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `

I am a passionate full-stack developer with a strong foundation in crafting robust and scalable web applications. I have developed expertise in front-end technologies like React and HTML/CSS, paired with back-end technologies such as Django, Node.js, and MySQL through hands-on experience and continuous learning.

I thrive on solving complex problems and embracing new challenges to stay ahead in the dynamic field of development. My goal is to leverage my skills to create innovative solutions that deliver exceptional user experiences and drive meaningful impact`;

export const ABOUT_TEXT = `

I am a dedicated and versatile full-stack developer with a passion for creating efficient and user-friendly web applications. With experience in front-end technologies like React and back-end technologies such as Django, Node.js, and MySQL, I continuously strive to learn and adapt to new challenges in web development. My journey in this field began with a curiosity about how things work, and it has evolved into a career where I am committed to delivering high-quality, scalable solutions.

I thrive in collaborative environments and enjoy tackling complex problems. Outside of coding, I love staying active, exploring new technologies, and helping my friends with their tech challenges and projects.`;

export const EXPERIENCES = [
  {
    year: "2023 - Present",
    role: "Senior Full Stack Developer",
    company: "Google Inc.",
    description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["Javascript", "React.js", "Next.js", "mongoDB"],
  },
  {
    year: "2022 - 2023",
    role: "Frontend Developer",
    company: "Adobe",
    description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
    technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
  },
  {
    year: "2021 - 2022",
    role: "Full Stack Developer",
    company: "Facebook",
    description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
    technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  },
  {
    year: "2020 - 2021",
    role: "Software Engineer",
    company: "Paypal",
    description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
    technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
  },
];

export const PROJECTS = [
  {
    title: "Stock Vision",
    image: project1,
    description:
      "Stock Vision is a web-based platform designed to help stock investors make informed decisions. It provides users with predictive analytics, historical stock data, and portfolio management tools. Through features like real-time stock predictions, trending news, and in-depth market insights, Stock Vision aims to empower investors with the tools they need to optimize their strategies and grow their portfolios.",
    technologies: ["HTML", "CSS", "Django", "MySql"],
  },
  {
    title: "e-Sign Portal",
    image: project2,
    description:
      "It is a Django-based platform that enables users to create, sign, and manage online petitions. It provides features such as user authentication, petition progress tracking, comment sections, social sharing  and creating a dynamic petitioning environment."






,
    technologies: ["HTML", "CSS", "Django", "MySql"],
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "Bootstrap"],
  },
  {
    title: "Expense Tracker",
    image: project4,
    description:
      "It is a React and Firebase-based web application designed to simplify expense management. With its interactive features, users can set goals, track spending, and analyze financial progress effectively.",
    technologies: ["HTML", "CSS", "React", "FireBase"],
  },
];

export const CONTACT = {
  address: "HNO 178 India ",
  phoneNo: "+91 9182989022 ",
  email: "me@example.com",
};
