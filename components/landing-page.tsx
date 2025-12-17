"use client";

import DistortImageCanvas from "@/components/distort-image";
import { BentoGridItem } from "@/components/ui/bento-grid";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Code2, Linkedin, Mail, MoveRight, Palette, X } from "lucide-react";
import { useState } from "react";

interface Item {
  id: number;
  title: string;
  description: string;
  header: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  fullDescription?: string;
  roles?: string;
  stack?: string;
  isProfile?: boolean;
  isContact?: boolean;
  isSkills?: boolean;
}

const items: Item[] = [
  // --- Left Column (Connect & Skills) ---
  {
    id: 5,
    title: "Connect",
    description: "",
    header: (
        <div className="flex flex-col items-center justify-center p-6 h-full gap-4 w-full relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, #E85002 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

            <span className="text-xs font-bold text-neutral-400 tracking-widest uppercase relative z-10">Socials</span>
            <div className="flex gap-4 relative z-10">
                <a href="https://linkedin.com" target="_blank" className="p-3 bg-[#0077b5] text-white rounded-xl hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-[#0077b5]/50 active:scale-95"><Linkedin className="w-5 h-5"/></a>
                <a href="https://x.com" target="_blank" className="p-3 bg-black border border-white/20 text-white rounded-xl hover:scale-125 hover:-rotate-12 transition-all duration-300 shadow-lg hover:shadow-white/20 active:scale-95"><span className="font-bold text-lg leading-none">𝕏</span></a>
                <a href="mailto:hello@umyal.com" className="p-3 bg-[#EA4335] text-white rounded-xl hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-[#EA4335]/50 active:scale-95"><Mail className="w-5 h-5"/></a>
            </div>
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[200px]",
    isContact: true,
  },
  {
    id: 7,
    title: "Philosophy",
    description: "Design System",
    header: (
        <div className="h-full flex flex-col items-center justify-center p-4 relative overflow-hidden group/phil">
             {/* Animated grid background */}
             <div className="absolute inset-0 opacity-10 group-hover/phil:opacity-30 transition-all duration-700 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E85002 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

             {/* Floating geometric shapes */}
             <div className="absolute top-4 right-4 w-8 h-8 border border-[#E85002]/30 rotate-45 group-hover/phil:rotate-90 transition-transform duration-1000" />
             <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full group-hover/phil:scale-150 transition-transform duration-700" />

             <div className="text-center z-10 relative">
                <span className="text-4xl font-black text-neutral-700 group-hover/phil:text-[#E85002] transition-all duration-500 group-hover/phil:scale-110 inline-block">LOGIC</span>
                <p className="text-[10px] text-neutral-500 font-mono mt-2 uppercase tracking-wider group-hover/phil:text-neutral-400 transition-colors">over chaos</p>

                {/* Subtle underline animation */}
                <div className="w-0 group-hover/phil:w-full h-0.5 bg-[#E85002] mx-auto mt-2 transition-all duration-500" />
             </div>
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[200px]",
  },

  // --- Center Column (Profile) ---
  {
    id: 2,
    title: "",
    description: "",
    header: (
      <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-transparent flex items-center justify-center">
        {/* Distort Effect Component - Full size */}
        <div className="absolute inset-0 w-full h-full">
            <DistortImageCanvas canvasImage="/mex.png" blockSize={10} />
        </div>

        {/* Overlay Text */}
        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
            <h1 className="font-display font-black text-4xl text-white tracking-tight drop-shadow-lg mix-blend-difference">UMYAL.</h1>
            <p className="text-white/80 text-[10px] font-mono uppercase tracking-[0.3em] mt-1 mix-blend-difference">Engineer</p>
        </div>
      </div>
    ),
    className: "md:col-span-1 md:row-span-2 shadow-2xl border border-white/10",
    isProfile: true,
  },

  // --- Right Column (3 Projects) ---
  {
    id: 3,
    title: "Multimodal Emotion AI",
    description: "Featured Project",
    header: (
        <div className="w-full h-full bg-gradient-to-br from-[#E85002] via-[#F16001] to-[#E85002] p-5 flex flex-col justify-between relative overflow-hidden group/featured">
           {/* Animated background elements */}
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/featured:translate-x-full transition-transform duration-1000" />

           {/* Floating code icon with animation */}
           <Code2 className="absolute top-4 right-4 text-white/30 w-12 h-12 rotate-12 group-hover/featured:rotate-45 group-hover/featured:scale-110 transition-all duration-500" />

           {/* Circuit pattern overlay */}
           <div className="absolute top-0 left-0 w-full h-full opacity-20 group-hover/featured:opacity-30 transition-opacity" style={{ backgroundImage: "linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 76%, transparent 77%, transparent), linear-gradient(transparent 24%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 76%, transparent 77%, transparent)", backgroundSize: "20px 20px" }} />

           <div className="bg-white/30 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-[10px] font-bold text-white mb-auto border border-white/20 group-hover/featured:scale-105 transition-transform duration-300">FEATURED</div>
           <div className="relative z-10">
             <h3 className="font-display font-bold text-2xl text-white leading-none mb-1 group-hover/featured:scale-105 transition-transform duration-300">Emotion AI</h3>
             <p className="text-white/80 text-xs font-medium">PyTorch · Vision</p>
           </div>
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[140px] bg-[#E85002] border-none shadow-lg shadow-[#E85002]/30",
    fullDescription: "Built a multimodal AI system from scratch using PyTorch that processes video, audio, and text inputs.",
    roles: "Feb 2025 - Apr 2025",
    stack: "PyTorch · Computer Vision · NLP"
  },
  {
    id: 1,
    title: "AI Learning Platform",
    description: "Real-time Tutors",
    header: (
        <div className="w-full h-full p-5 flex items-end justify-between relative group/p1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
            <div className="relative z-10">
                 <h3 className="font-display font-bold text-lg text-white group-hover/p1:text-[#E85002] transition-colors">AI Learning</h3>
                 <p className="text-neutral-500 text-xs">Next.js · Realtime</p>
            </div>
            <Brain className="relative z-10 text-neutral-600 group-hover/p1:text-white transition-colors" />
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[120px]",
    fullDescription: "Built a live video-based learning system for children featuring real-time AI tutors.",
    roles: "Jun 2025 - Jul 2025",
    stack: "React.js · Next.js · Tailwind CSS · AI"
  },
  {
    id: 4,
    title: "Genco App",
    description: "Anonymous Chat",
    header: (
        <div className="w-full h-full p-5 flex items-end justify-between relative group/p2">
             <div className="relative z-10">
                 <h3 className="font-display font-bold text-lg text-white group-hover/p2:text-[#E85002] transition-colors">Genco</h3>
                 <p className="text-neutral-500 text-xs">React Native</p>
            </div>
            <Palette className="relative z-10 text-neutral-600 group-hover/p2:text-white transition-colors" />
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[120px]",
    fullDescription: "Designed a community app with features like anonymous chat and AI-driven moderation.",
    roles: "Sep 2024 - Sep 2024",
    stack: "React Native · Python · MongoDB"
  },

  // --- Bottom Row (About) ---
  {
    id: 8,
    title: "About Me",
    description: "New Delhi, India.",
    header: (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 h-full relative overflow-hidden">
             {/* Abstract Background Decoration */}
             <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#E85002]/5 rounded-full blur-3xl" />

            <div className="flex items-center gap-8 relative z-10 w-full md:w-auto text-center md:text-left">
                <div className="p-4 bg-white/5 rounded-full border border-white/10 hidden md:block group-hover/bento:scale-110 group-hover/bento:rotate-12 transition-all duration-500">
                    <MoveRight className="w-8 h-8 text-[#E85002]" />
                </div>
                <div className="space-y-3">
                    <p className="text-2xl md:text-4xl font-light text-neutral-200 leading-tight">
                        Bridging <span className="font-display font-bold text-[#E85002]">Chaos</span> & <span className="font-display font-bold text-white">Logic</span>.
                    </p>
                    <p className="text-neutral-500 max-w-lg text-sm leading-relaxed font-medium mx-auto md:mx-0">
                        Engineer with a designer&apos;s heart. Obsessed with <span className="text-neutral-300">Fluid Interfaces</span> & <span className="text-neutral-300">AI Agents</span>.
                    </p>
                </div>
            </div>

            <div className="mt-6 md:mt-0 relative z-10">
                 <div className="group/hire relative px-6 py-2 bg-neutral-900/50 border border-white/10 rounded-full overflow-hidden hover:border-[#E85002]/50 transition-colors cursor-pointer">
                    <div className="absolute inset-0 bg-[#E85002]/10 translate-y-full group-hover/hire:translate-y-0 transition-transform duration-300 ease-out" />
                    <div className="flex items-center gap-2 relative z-10">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-neutral-300 group-hover/hire:text-white transition-colors uppercase tracking-wider">Available for hire</span>
                    </div>
                 </div>
            </div>
        </div>
    ),
    className: "md:col-span-3 md:row-span-1 h-[200px] border-white/5", // Removed bg-[#111] to let Bento base show
    isSkills: true,
  },
];

export default function LandingPage() {
  const [selectedProject, setSelectedProject] = useState<Item | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans selection:bg-[#E85002] selection:text-white flex items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-7xl">
           {/* Enhanced Overlapping Grid Layout */}
           <div className="relative">
                {/* Background Decorative Elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#E85002]/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-1/2 -right-32 w-60 h-60 bg-white/5 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-[#E85002]/15 rounded-full blur-2xl opacity-40" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

                    {/* Col 1 (Left): Connect + Philosophy with Staggered Animation */}
                    <motion.div
                        className="flex flex-col gap-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <BentoGridItem {...items[0]} className="flex-1 md:transform md:rotate-1 md:hover:rotate-0 transition-transform duration-500" />
                        <BentoGridItem {...items[1]} className="flex-1 md:transform md:-rotate-1 md:hover:rotate-0 transition-transform duration-500 md:-mt-4" />
                    </motion.div>

                    {/* Col 2 (Center): Profile - Hero with Overlap */}
                    <motion.div
                        className="flex flex-col gap-6 relative z-20 md:mt-8 md:mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <BentoGridItem
                            {...items[2]}
                            transparent={true}
                            className="h-[424px] md:scale-110 relative z-30 md:-mx-4 bg-transparent border-none shadow-none"
                        />
                    </motion.div>

                    {/* Col 3 (Right): 3 Projects with Cascading Overlap */}
                    <motion.div
                        className="flex flex-col gap-4 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <BentoGridItem
                            {...items[3]}
                            onClick={() => setSelectedProject(items[3])}
                            className="flex-1 md:transform md:rotate-2 md:hover:rotate-0 md:hover:scale-105 transition-all duration-500 relative z-25"
                        />
                        <BentoGridItem
                            {...items[4]}
                            onClick={() => setSelectedProject(items[4])}
                            className="flex-1 md:transform md:-rotate-1 md:hover:rotate-0 md:hover:scale-105 transition-all duration-500 md:-mt-6 relative z-24"
                        />
                        <BentoGridItem
                            {...items[5]}
                            onClick={() => setSelectedProject(items[5])}
                            className="flex-1 md:transform md:rotate-1 md:hover:rotate-0 md:hover:scale-105 transition-all duration-500 md:-mt-4 relative z-23"
                        />
                    </motion.div>

                </div>

                {/* Bottom Row: About - Floating Above */}
                <motion.div
                    className="md:col-span-3 mt-12 relative z-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <BentoGridItem
                        {...items[6]}
                        className="w-full md:transform md:hover:scale-[1.02] transition-all duration-500 shadow-2xl shadow-black/30 border-[#E85002]/30"
                    />
                </motion.div>

           </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-6 md:p-10 max-w-2xl w-full relative overflow-hidden"
            >
               <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
               >
                 <X className="w-5 h-5 text-white" />
               </button>

               <div className="space-y-6">
                 <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-[#E85002]">{selectedProject.title}</h2>
                    <p className="text-neutral-400 font-mono text-sm mt-1">{selectedProject.roles}</p>
                 </div>

                 <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-neutral-200">
                        {selectedProject.fullDescription}
                    </p>
                 </div>

                 <div className="pt-6 border-t border-neutral-800">
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.stack?.split('·').map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-lg text-sm font-medium border border-neutral-700">
                                {tech.trim()}
                            </span>
                        ))}
                    </div>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
