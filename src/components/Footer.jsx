import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full relative z-10 py-8 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <span className="text-gray-400 text-sm font-medium">
            Designed & Built by <strong className="text-white">Prasanth Kumar</strong>
          </span>
        </div>

        <div className="text-gray-500 text-xs flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Crafted with React, Tailwind & Framer Motion</span>
        </div>

      </div>
    </footer>
  );
}
