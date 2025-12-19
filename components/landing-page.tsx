"use client";

import DistortImageCanvas from "@/components/distort-image";
import { BentoGridItem } from "@/components/ui/bento-grid";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Brain, Cpu, Linkedin, Mail, MoveRight, Palette, Radio, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

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
  // --- Left Column ---
  {
    id: 5,
    title: "",
    description: "",
    header: (
        <div className="flex flex-col justify-between p-6 h-full w-full relative group/connect bg-[#050505]">
             {/* Tech Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            <div className="flex justify-between items-start z-10">
                 <Radio className="w-5 h-5 text-[#E85002] animate-pulse" />
                 <span className="font-mono text-[10px] text-white/40">NET.STATUS: ONLINE</span>
            </div>

            <div className="flex flex-col gap-3 relative z-10 mt-4">
                <a href="https://linkedin.com" target="_blank" className="flex items-center justify-between p-3 border border-white/10 hover:bg-[#E85002] hover:text-black hover:border-[#E85002] transition-all group/link">
                   <div className="flex items-center gap-3">
                       <Linkedin className="w-4 h-4" />
                       <span className="font-mono text-xs uppercase tracking-widest">LinkedIn</span>
                   </div>
                   <MoveRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all"/>
                </a>
                <a href="https://x.com" target="_blank" className="flex items-center justify-between p-3 border border-white/10 hover:bg-[#E85002] hover:text-black hover:border-[#E85002] transition-all group/link">
                   <div className="flex items-center gap-3">
                       <span className="font-bold text-lg leading-none">𝕏</span>
                       <span className="font-mono text-xs uppercase tracking-widest">Twitter</span>
                   </div>
                   <MoveRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all"/>
                </a>
                 <a href="mailto:hello@umyal.com" className="flex items-center justify-between p-3 border border-white/10 hover:bg-[#E85002] hover:text-black hover:border-[#E85002] transition-all group/link">
                   <div className="flex items-center gap-3">
                       <Mail className="w-4 h-4" />
                       <span className="font-mono text-xs uppercase tracking-widest">Email</span>
                   </div>
                   <MoveRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all"/>
                </a>
            </div>
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[260px]",
    isContact: true,
  },
  {
    id: 7,
    title: "Philosophy",
    description: "Design System",
    header: (
        <div className="h-full flex flex-col justify-between p-6 bg-[#0a0a0a] group/phil relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2">
                <Terminal className="w-4 h-4 text-[#E85002]" />
             </div>

             <div className="z-10 mt-auto">
                <h3 className="text-4xl font-display font-black text-white uppercase glitch-text" data-text="LOGIC">LOGIC</h3>
                <div className="w-full h-px bg-[#E85002] my-2" />
                <p className="text-[10px] text-white/60 font-mono uppercase tracking-widest">{">>"} Override Chaos</p>
             </div>
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[260px]",
  },

  // --- Center Column (Profile) ---
  {
    id: 2,
    title: "",
    description: "",
    header: (
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Distort Effect Component - Full size */}
        <div className="absolute inset-0 w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500">
            <DistortImageCanvas canvasImage="/mex.png" blockSize={20} />
        </div>

        {/* Profile Overlays */}
        <div className="absolute top-4 left-4 z-20">
             <div className="px-2 py-1 border border-[#E85002] text-[#E85002] font-mono text-[10px] bg-[#E85002]/10">
                SUBJ: UMYAL_DIXIT
             </div>
        </div>

         <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
             <h1 className="font-display font-black text-[80px] leading-[0.8] text-white mix-blend-difference tracking-tighter text-center">
                CREATIVE<br/>ENGINEER
             </h1>
        </div>
      </div>
    ),
    className: "md:col-span-1 md:row-span-2 shadow-[0_0_20px_rgba(232,80,2,0.15)] border-[#E85002]/50",
    isProfile: true,
  },

  // --- Right Column (Projects) ---
  {
    id: 3,
    title: "Emotion AI",
    description: "Featured",
    header: (
        <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden group/featured bg-[#0a0a0a]">
           <div className="absolute top-0 right-0 w-16 h-16 bg-[#E85002] flex items-center justify-center">
                <ArrowUpRight className="text-black w-6 h-6 group-hover/featured:rotate-45 transition-transform duration-300" />
           </div>

           <div className="mt-auto relative z-10">
             <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 bg-[#E85002] rounded-full animate-pulse" />
                 <span className="font-mono text-[10px] text-[#E85002]">DEPLOYED</span>
             </div>
             <p className="text-white/60 font-mono text-xs">PyTorch // Vision</p>
           </div>
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[260px] border-[#E85002]/30",
    fullDescription: "Built a multimodal AI system from scratch using PyTorch that processes video, audio, and text inputs.",
    roles: "Feb 2025 - Apr 2025",
    stack: "PyTorch · Computer Vision · NLP"
  },
  {
    id: 1,
    title: "AI Learning",
    description: "Real-time Tutors",
    header: (
        <div className="w-full h-full p-4 flex flex-col justify-between relative group/p1 bg-[#0a0a0a]">
            <div className="flex justify-between items-start">
                <Brain className="w-6 h-6 text-white/20 group-hover/p1:text-[#E85002] transition-colors" />
                <span className="font-mono text-[10px] text-white/30">V.1.0</span>
            </div>
        </div>
    ),
    className: "md:col-span-1 md:row-span-1 h-[120px]",
    fullDescription: "Built a live video-based learning system for children featuring real-time AI tutors.",
    roles: "Jun 2025 - Jul 2025",
    stack: "React.js · Next.js · Tailwind CSS · AI"
  },
  {
    id: 4,
    title: "Genco",
    description: "Anon Chat",
    header: (
        <div className="w-full h-full p-4 flex flex-col justify-between relative group/p2 bg-[#0a0a0a]">
            <div className="flex justify-between items-start">
                <Palette className="w-6 h-6 text-white/20 group-hover/p2:text-[#E85002] transition-colors" />
                 <span className="font-mono text-[10px] text-white/30">V.2.4</span>
            </div>
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
    title: "",
    description: "",
    header: (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 h-full bg-[#0a0a0a] relative overflow-hidden">
             {/* Scrolling Text Background */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden opacity-5 pointer-events-none whitespace-nowrap">
                <span className="text-[120px] font-display font-black text-transparent stroke-text">
                    DESIGN ENGINEER BUILD CREATE DESIGN ENGINEER BUILD CREATE
                </span>
            </div>

            <div className="flex items-center gap-12 relative z-10 w-full md:w-auto text-center md:text-left">
                <Cpu className="w-12 h-12 text-[#E85002] hidden md:block" />

                <div className="space-y-4 max-w-2xl">
                    <p className="text-2xl md:text-4xl font-bold text-white leading-none tracking-tight">
                        BRIDGING <span className="text-[#E85002] bg-[#E85002]/10 px-2 glitch-text" data-text="CHAOS">CHAOS</span> & LOGIC.
                    </p>
                    <p className="text-white/60 text-sm font-mono leading-relaxed">
                        // SYSTEM LOG: Engineer with a designer&apos;s heart.<br/>
                        // FOCUS: Fluid Interfaces & AI Agents.
                    </p>
                </div>
            </div>

            <div className="mt-8 md:mt-0 relative z-10">
                 <div className="px-6 py-4 border-2 border-[#E85002] text-[#E85002] font-bold text-sm hover:bg-[#E85002] hover:text-black transition-all cursor-pointer uppercase tracking-widest shadow-[4px_4px_0px_#E85002]">
                    INITIATE_CONTACT
                 </div>
            </div>
        </div>
    ),
    className: "md:col-span-3 md:row-span-1 h-[240px]",
    isSkills: true,
  },
];

export default function LandingPage() {
  const [selectedProject, setSelectedProject] = useState<Item | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen blueprint-grid text-white p-4 md:p-8 font-sans selection:bg-[#E85002] selection:text-white flex items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-7xl relative z-10">

           {/* Brutalist Header Area */}
           <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
              <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#E85002] mb-1">ID: 887-21-X</span>
                  <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">UMYAL DIXIT</h1>
              </div>
              <div className="hidden md:flex gap-8 text-right font-mono text-xs text-white/50">
                  <div className="flex flex-col">
                      <span>COORDS</span>
                      <span className="text-white">28.61° N, 77.20° E</span>
                  </div>
                  <div className="flex flex-col">
                      <span>TIME.LCL</span>
                      <span className="text-[#E85002]">{time}</span>
                  </div>
              </div>
           </div>

           <div className="relative">
                {/* Tech Maximalist Grid - Tighter Gap */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">

                    {/* Col 1 (Left) */}
                    <div className="flex flex-col gap-4">
                        <BentoGridItem {...items[0]} className="flex-1" />
                        <BentoGridItem {...items[1]} className="flex-1" />
                    </div>

                    {/* Col 2 (Center: Profile) */}
                    <div className="flex flex-col gap-4 relative z-20">
                        <BentoGridItem
                            {...items[2]}
                            className="h-[536px] bg-[#050505] relative z-30"
                        />
                    </div>

                    {/* Col 3 (Right) */}
                    <div className="flex flex-col gap-4">
                        <div className="flex-1">
                            <BentoGridItem
                                {...items[3]}
                                onClick={() => setSelectedProject(items[3])}
                                className="h-full"
                            />
                        </div>
                         <div className="flex-1 flex flex-col gap-4">
                            <BentoGridItem
                                {...items[4]}
                                onClick={() => setSelectedProject(items[4])}
                                className="flex-1"
                            />
                            <BentoGridItem
                                {...items[5]}
                                onClick={() => setSelectedProject(items[5])}
                                className="flex-1"
                            />
                         </div>
                    </div>

                </div>

                {/* Bottom Row */}
                <div className="md:col-span-3 mt-4 relative z-20">
                    <BentoGridItem
                        {...items[6]}
                        className="w-full shadow-none"
                    />
                </div>

           </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
             {/* Tech Modal Overlay Grid */}
             <div className="absolute inset-0 pointer-events-none blueprint-grid opacity-20" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#050505] border-2 border-white/20 p-8 max-w-3xl w-full relative shadow-[8px_8px_0px_#222]"
            >
               {/* Modal Content - Brutalist */}
               <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-0 right-0 p-4 bg-[#E85002] text-black hover:bg-white hover:text-black transition-colors font-mono font-bold"
               >
                 CLOSE [X]
               </button>

               <div className="space-y-8 mt-4">
                 <div className="border-b border-dashed border-white/20 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-[#E85002]" />
                        <p className="text-[#E85002] font-mono text-xs uppercase tracking-widest">PROJECT_FILE: {selectedProject.roles}</p>
                    </div>
                    <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter">{selectedProject.title}</h2>
                 </div>

                 <div className="prose prose-invert max-w-none">
                    <p className="text-xl leading-relaxed text-white font-mono">
                        {selectedProject.fullDescription}
                    </p>
                 </div>

                 <div className="pt-4">
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 border-b border-white/10 pb-2 w-fit">STACK_TRACE</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.stack?.split('·').map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-white text-black text-sm font-bold uppercase hover:bg-[#E85002] transition-colors cursor-crosshair">
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
