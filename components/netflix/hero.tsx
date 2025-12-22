"use client";

import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";

export const NetflixHero = () => {
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-start px-12 md:px-24 overflow-hidden mb-20">
      {/* Background - In a real app, this would be a video */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-10" />
         <img
            src="/mexc.png" // Placeholder - likely use a project screenshot
            alt="Featured Project"
            className="w-full h-full object-cover opacity-60"
         />
      </div>

      <div className="relative z-20 max-w-2xl space-y-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
        >
            <span className="text-[#E85002] font-black tracking-widest text-sm uppercase">N E T F L I X &ensp; O R I G I N A L</span>
        </motion.div>

        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-white font-display tracking-tighter uppercase drop-shadow-2xl"
        >
            EMOTION AI
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-xl shadow-black drop-shadow-md"
        >
            A multimodal AI system built from scratch using PyTorch.
            Processes video, audio, and text inputs to detect emotional states in real-time.
            Deployed on AWS with <span className="text-[#46d369] font-bold">98% Match Rate</span>.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4 pt-4"
        >
            <button className="flex items-center gap-3 px-8 py-3 bg-white text-black font-bold rounded hover:bg-white/90 transition-colors">
                <Play className="fill-black w-6 h-6" />
                Play Demo
            </button>
            <button className="flex items-center gap-3 px-8 py-3 bg-[#5c5c5c]/60 text-white font-bold rounded hover:bg-[#5c5c5c]/40 transition-colors backdrop-blur-md">
                <Info className="w-6 h-6" />
                More Info
            </button>
        </motion.div>
      </div>
    </div>
  );
};
