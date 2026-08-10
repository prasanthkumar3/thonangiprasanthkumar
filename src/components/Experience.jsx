import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { cn } from "../lib/utils";

const timelineData = [
  {
    type: "experience",
    title: "ServiceNow Developer Intern",
    organization: "ServiceNow",
    date: "Dec 2023 - Present",
    details: [
      "Mastered platform fundamentals and core capabilities.",
      "Developed automation workflows to optimize enterprise processes.",
      "Prepared and earned Certified System Administrator (CSA) credential.",
    ],
    icon: <Briefcase className="w-6 h-6 text-primary" />,
  },
  {
    type: "education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "University / Institute Name",
    date: "2026",
    details: ["Current CGPA: 8.28", "Focus on advanced algorithms, cloud architecture, and full-stack web development."],
    icon: <GraduationCap className="w-6 h-6 text-accent" />,
  },
  {
    type: "education",
    title: "Intermediate (Class XII)",
    organization: "Junior College Name",
    date: "2021",
    details: ["Percentage: 87.3%", "Majored in Mathematics, Physics, and Chemistry."],
    icon: <GraduationCap className="w-6 h-6 text-accent" />,
  },
  {
    type: "education",
    title: "Secondary School Certificate (Class X)",
    organization: "High School Name",
    date: "2019",
    details: ["CGPA: 10/10", "Foundation in fundamental sciences and mathematics."],
    icon: <GraduationCap className="w-6 h-6 text-accent" />,
  },
];

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "relative flex items-center justify-between md:justify-normal w-full group",
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Icon Node */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass border-2 border-primary/50 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,0,127,0.3)] group-hover:shadow-[0_0_25px_rgba(255,0,127,0.8)] transition-shadow duration-300">
        {item.icon}
      </div>

      {/* Spacing for one side */}
      <div className="hidden md:block w-1/2" />

      {/* Content Card */}
      <div className="w-full pl-16 md:pl-0 md:w-1/2 flex flex-col">
        <div className={cn(
          "glass p-6 rounded-3xl border border-white/5 group-hover:border-primary/30 transition-colors duration-300",
          isLeft ? "md:mr-10 xl:mr-16" : "md:ml-10 xl:ml-16"
        )}>
          <span className="text-sm font-bold text-primary mb-2 block tracking-wider">
            {item.date}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            {item.title}
          </h3>
          <h4 className="text-md text-gray-300 mb-4 font-medium">
            {item.organization}
          </h4>
          <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm leading-relaxed">
            {item.details.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative w-full min-h-screen py-24 flex items-center z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="inline-block glass px-4 py-2 rounded-full border border-accent/30 mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              My Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Experience & Education</h2>
        </motion.div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 -translate-x-[2px] w-[2px] h-full bg-gradient-to-b from-primary via-accent to-transparent rounded-full opacity-30" />

          <div className="flex flex-col gap-12 md:gap-8 relative z-10">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
