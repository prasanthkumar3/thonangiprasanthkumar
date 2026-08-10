import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    skills: ["Cloud Concepts", "Security", "AWS Technology", "Billing & Pricing"],
  },
  {
    title: "Machine Learning",
    issuer: "NPTEL",
    date: "2023",
    skills: ["Supervised Learning", "Neural Networks", "Data Preprocessing"],
  },
  {
    title: "Ethical Hacking",
    issuer: "Platform/Institution Name",
    date: "2023",
    skills: ["Vulnerability Assessment", "Network Security", "Cryptography"],
  },
  {
    title: "Penetration Testing Fundamentals",
    issuer: "Platform/Institution Name",
    date: "2023",
    skills: ["Reconnaissance", "Exploitation", "Reporting"],
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full min-h-screen py-24 flex items-center z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <Award className="w-10 h-10 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Certifications & Accolades</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-8 rounded-3xl glass border border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-accent font-medium">{cert.issuer}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-500 border border-gray-700 px-3 py-1 rounded-full">
                    {cert.date}
                  </span>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-1.5 text-sm text-gray-400">
                      <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
