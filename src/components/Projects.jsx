import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";

const projects = [
  {
    title: "AVISHKAAR Hackathon Platform",
    desc: "A full-stack MERN application to manage hackathon registrations and an admin dashboard for organizers.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
    demo: "#",
    github: "#",
  },
  {
    title: "TECHNO VISION Website",
    desc: "Responsive event website serving 290+ participants with smooth performance and interactive UI.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    demo: "#",
    github: "#",
  }
];

function TiltCard({ project, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full glass rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-colors duration-300 group flex flex-col"
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="w-full flex justify-between items-center mb-8"
      >
        <Folder className="w-12 h-12 text-primary" />
        <div className="flex gap-4">
          <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href={project.demo} className="text-gray-400 hover:text-primary transition-colors">
            <ExternalLink className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="flex-1">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-8 leading-relaxed">
          {project.desc}
        </p>
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="flex flex-wrap gap-3 mt-auto">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Glow block behind */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl pointer-events-none" />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full min-h-screen py-24 flex items-center z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full perspective-[1000px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          <p className="text-gray-400 text-lg">Things I've built to solve real-world problems.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <TiltCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
