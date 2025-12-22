"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, Plus, ThumbsUp, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";

// Reuse Project interface or import it
interface Project {
  id: number;
  title: string;
  image: string;
  match: number;
  tags: string[];
}

interface NetflixModalProps {
  project: Project | null;
  onClose: () => void;
}

export const NetflixModal = ({ project, onClose }: NetflixModalProps) => {
  const [muted, setMuted] = useState(true);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 flex justify-center overflow-y-auto scrollbar-hide pt-12 px-4"
        onClick={onClose}
      >
        <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative bg-[#181818] w-full max-w-4xl rounded-md overflow-hidden shadow-2xl mb-12 h-fit"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-[#282828] transition-colors"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* Hero Section */}
            <div className="relative w-full aspect-video">
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10" />

                {/* Image / Video Placeholder */}
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />

                {/* Title & Actions Overlay */}
                <div className="absolute bottom-[5%] left-10 z-20 space-y-6 max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-black text-white font-display uppercase drop-shadow-lg">
                        {project.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-8 py-2 bg-white text-black font-bold rounded hover:bg-white/90 transition-colors">
                            <Play className="fill-black w-6 h-6" />
                            Play
                        </button>
                        <button className="w-10 h-10 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white text-gray-300 hover:text-white transition-all bg-[#2a2a2a]/60">
                            <Plus className="w-5 h-5" />
                        </button>
                         <button className="w-10 h-10 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white text-gray-300 hover:text-white transition-all bg-[#2a2a2a]/60">
                            <ThumbsUp className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Initial Mute Toggle */}
                <button
                    onClick={() => setMuted(!muted)}
                    className="absolute bottom-[5%] right-10 z-20 w-10 h-10 border border-gray-500/50 rounded-full flex items-center justify-center hover:border-white text-gray-300 bg-black/20 backdrop-blur-sm"
                >
                    {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </div>

            {/* Content Details */}
            <div className="px-10 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Metadata & Description */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#46d369] font-bold text-lg">{project.match}% Match</span>
                        <span className="text-gray-400">2024</span>
                        <span className="border border-gray-500 px-1.5 py-0.5 text-xs text-white uppercase rounded-sm">TV-MA</span>
                        <span className="text-white">Next.js Series</span>
                    </div>

                    <p className="text-white text-base leading-relaxed">
                        A groundbreaking project exploring the boundaries of {project.tags.join(" and ")}.
                        Designed with scalability in mind, this application leverages modern architecture to deliver seamless user experiences.
                        <br /><br />
                        Featuring real-time data processing, immersive UI animations, and a robust backend infrastructure.
                    </p>
                </div>

                {/* Right: Cast/Genres */}
                <div className="space-y-4 text-sm">
                    <div>
                        <span className="text-gray-500">Cast: </span>
                        <span className="text-white hover:underline cursor-pointer">React</span>, <span className="text-white hover:underline cursor-pointer">TypeScript</span>, <span className="text-white hover:underline cursor-pointer">Tailwind</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Genres: </span>
                        <span className="text-white hover:underline cursor-pointer">Web App</span>, <span className="text-white hover:underline cursor-pointer">Cyberpunk</span>
                    </div>
                     <div>
                        <span className="text-gray-500">This show is: </span>
                        <span className="text-white hover:underline cursor-pointer">Dark</span>, <span className="text-white hover:underline cursor-pointer">Futuristic</span>
                    </div>
                </div>
            </div>

            {/* More Like This Grid */}
            <div className="px-10 py-6 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">More Like This</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="bg-[#2f2f2f] rounded overflow-hidden hover:scale-105 transition-transform cursor-pointer relative group">
                            <div className="aspect-video bg-black/50 relative">
                                <div className="absolute top-2 right-2 text-xs font-bold text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-1 rounded">
                                    4 Seasons
                                </div>
                                <img src={project.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center bg-black/40">
                                        <Play className="fill-white w-3 h-3 ml-0.5 text-white" />
                                     </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="flex justify-between items-start mb-2">
                                     <span className="text-[#46d369] font-bold text-xs">9{i}% Match</span>
                                     <div className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center hover:border-white">
                                        <Plus className="w-3 h-3 text-gray-300" />
                                     </div>
                                </div>
                                <p className="text-gray-400 text-xs leading-snug line-clamp-3">
                                    Similar project utilizing {project.tags[0]} for enhanced performance.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
