import { motion } from "framer-motion";
import { Code, Layout, Cloud, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: <Code className="w-6 h-6 text-primary" />,
    skills: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript"],
  },
  {
    title: "Web Development",
    icon: <Layout className="w-6 h-6 text-accent" />,
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Next.js"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-6 h-6 text-purple-400" />,
    skills: ["AWS", "ServiceNow", "Docker", "CI/CD"],
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="w-6 h-6 text-pink-400" />,
    skills: ["Git", "Figma", "Wireshark", "Postman", "Linux"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen py-24 flex items-center z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-end gap-4 mb-16"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-l from-primary/50 to-transparent mr-4 hidden md:block" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Technical Arsenal</h2>
          <Code className="w-10 h-10 text-primary ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/40 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="mb-6 p-4 rounded-full bg-white/5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-[0_0_0_rgba(255,0,127,0)] group-hover:shadow-[0_0_20px_rgba(255,0,127,0.4)]">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,0,127,0.2)" }}
                    className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full border border-white/5 hover:text-white cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
