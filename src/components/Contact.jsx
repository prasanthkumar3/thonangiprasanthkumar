import { motion } from "framer-motion";
import { Send, Phone, Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full min-h-screen py-24 flex items-center justify-center z-10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Info Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <div className="inline-block glass px-4 py-2 rounded-full border border-primary/30 mb-6 w-max">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Get in Touch
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Let's build <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">something legendary.</span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
          </p>

          <div className="flex flex-col gap-6">
            <a href="mailto:hello@prasanth.dev" className="flex items-center gap-4 text-gray-300 hover:text-white group w-max">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-lg font-medium">hello@prasanth.dev</span>
            </a>
            
            <a href="tel:+919876543210" className="flex items-center gap-4 text-gray-300 hover:text-white group w-max">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <Phone className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
              </div>
              <span className="text-lg font-medium">+91 9876543210</span>
            </a>
          </div>

          <div className="flex gap-4 mt-12 w-full">
            {[Github, Linkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all duration-300 border border-white/5 hover:border-primary/50"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* Glowing background behind form */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-[3rem] -z-10 animate-pulse" />
          
          <form className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 flex flex-col gap-6 shadow-2xl relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-gray-400 font-medium ml-2">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-gray-400 font-medium ml-2">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400 font-medium ml-2">Message</label>
              <textarea 
                rows="5"
                placeholder="How can we collaborate?" 
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              />
            </div>
            
            <button 
              type="button" 
              className="mt-4 w-full bg-gradient-to-r from-primary to-accent text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity active:scale-[0.98] relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Send Message</span>
              <Send className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform origin-bottom duration-300 z-0" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
