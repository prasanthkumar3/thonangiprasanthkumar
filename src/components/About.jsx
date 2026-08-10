import { motion } from "framer-motion";
import { User, Code2, Cloud, Terminal } from "lucide-react";

export default function About() {
  const cards = [
    {
      icon: <Code2 className="w-8 h-8 text-primary" />,
      title: "Full-Stack Developer",
      desc: "Building scalable and interactive web applications using the MERN stack."
    },
    {
      icon: <Cloud className="w-8 h-8 text-accent" />,
      title: "Cloud Enthusiast",
      desc: "Passionate about AWS, ServiceNow, and deploying robust cloud solutions."
    },
    {
      icon: <Terminal className="w-8 h-8 text-purple-400" />,
      title: "Problem Solver",
      desc: "Algorithms, competitive programming, and architecting efficient systems."
    }
  ];

  return (
    <section id="about" className="relative w-full min-h-screen py-24 flex items-center z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <User className="w-10 h-10 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">About Me</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 text-gray-400 text-lg leading-relaxed"
          >
            <p>
              Hi, I'm <strong className="text-white">Prasanth Kumar</strong>, a passionate Computer Science Engineering student focused on building exceptional digital experiences. 
              I specialize in bridging the gap between elegant user interfaces and robust backend architectures.
            </p>
            <p>
              My journey in tech revolves around continuous learning. With a strong foundation in <strong className="text-white">Python, Java, and C++</strong>, 
              I've successfully translated logic into modern web paradigms using the <strong className="text-white">MERN stack</strong> and Next.js.
            </p>
            <p>
              Beyond coding, I am an avid cloud enthusiast with hands-on experience in AWS and ServiceNow automation workflows.
            </p>

            {/* Glowing Accent Box */}
            <div className="mt-4 p-6 glass rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />
              <div className="relative z-10">
                <blockquote className="text-xl font-medium text-white italic">
                  "I don't just write code; I build robust experiences that solve real problems."
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="mb-4 p-4 rounded-full bg-white/5 inline-block group-hover:bg-primary/10 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
            
            {/* Image placeholder / Empty space filler with glowing orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative hidden sm:flex lg:hidden xl:flex items-center justify-center p-8 rounded-3xl overflow-hidden glass border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
              <div className="relative z-10 w-full aspect-square rounded-full border-2 border-primary/50 flex items-center justify-center">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Prasanth.dev</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
