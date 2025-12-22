"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Play, Plus } from "lucide-react";
import { useRef, useState } from "react";

// Mock Data Structure
export interface Project {
  id: number;
  title: string;
  image: string;
  match: number;
  tags: string[];
}

const ProjectCard = ({ project, onClick }: { project: Project, onClick: (p: Project) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
      className="relative flex-shrink-0 w-[280px] md:w-[320px] aspect-video bg-[#141414] rounded-md overflow-visible cursor-pointer group transition-all duration-300 z-10 hover:z-50"
      whileHover={{
          scale: 1.3,
          transition: { duration: 0.3, delay: 0.3 }
      }}
    >
        {/* Simple Thumbnail (Visible by default) */}
        {!isHovered && (
             <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-md"
            />
        )}


        {/* Hover Expanded Content Overlay */}
        {isHovered && (
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-[-20%] left-[-15%] w-[130%] bg-[#141414] shadow-2xl rounded-md overflow-hidden flex flex-col justify-start"
                style={{ aspectRatio: "16/12" }}
             >
                {/* Image Section */}
                <div className="w-full h-3/5 relative bg-black/50 mb-3">
                    <img src={project.image} className="w-full h-full object-cover" />
                </div>

                {/* Actions & Meta */}
                <div className="p-4 pt-0 flex flex-col justify-between h-2/5 pb-2">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors" onClick={(e) => { e.stopPropagation(); onClick(project); }}>
                            <Play className="fill-black w-4 h-4 ml-0.5" />
                        </div>
                        <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
                            <Plus className="text-gray-300 w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white ml-auto transition-colors" onClick={(e) => { e.stopPropagation(); onClick(project); }}>
                            <ChevronDown className="text-gray-300 w-4 h-4" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[#46d369] font-bold text-[10px]">{project.match}% Match</span>
                            <span className="border border-gray-500 px-1 text-[8px] text-gray-400 uppercase">18+</span>
                            <span className="text-[10px] text-gray-400">4 Seasons</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[10px] text-white">
                            {project.tags.join(" • ")}
                        </div>
                    </div>
                </div>
             </motion.div>
        )}
    </motion.div>
  );
};

export const NetflixRow = ({ title, projects, onProjectClick }: { title: string, projects: Project[], onProjectClick: (p: Project) => void }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left' ? -window.innerWidth / 2 : window.innerWidth / 2;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

  return (
    <div className="mb-12 relative group/row px-12 md:px-24">
      <h2 className="text-xl md:text-2xl font-bold text-[#e5e5e5] mb-4 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group/title">
        {title}
        <span className="text-sm text-[#54b9c5] font-semibold opacity-0 group-hover/title:opacity-100 transition-opacity flex items-center">
            Explore All <ChevronRight className="w-4 h-4" />
        </span>
      </h2>

      <div className="relative group/slider">
          <ChevronRight
            className="absolute left-0 top-0 bottom-0 my-auto w-12 h-full text-white bg-black/50 z-40 cursor-pointer opacity-0 group-hover/slider:opacity-100 hover:bg-black/70 transition-all rotate-180 flex items-center justify-center"
            onClick={() => scroll('left')}
          />

          <div
            ref={rowRef}
            className="flex items-center gap-2 overflow-x-scroll scrollbar-hide py-10 px-2" // Added py-10 for hover space, changed to overflow-x-scroll
            style={{ scrollBehavior: 'smooth' }}
          >
            {projects.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={onProjectClick} />
            ))}
          </div>

          <ChevronRight
            className="absolute right-0 top-0 bottom-0 my-auto w-12 h-full text-white bg-black/50 z-40 cursor-pointer opacity-0 group-hover/slider:opacity-100 hover:bg-black/70 transition-all flex items-center justify-center"
            onClick={() => scroll('right')}
          />
      </div>
    </div>
  );
};
