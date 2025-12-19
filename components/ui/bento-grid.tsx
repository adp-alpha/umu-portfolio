"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
  transparent = false,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  transparent?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={!transparent ? {
        y: -4,
        scale: 1.02,
        transition: { duration: 0.4, type: "spring", stiffness: 200 }
      } : {}}
      onClick={onClick}
      className={cn(
        "row-span-1 group/bento transition-all duration-300 justify-between flex flex-col space-y-0 cursor-pointer relative",
        !transparent && "tech-card overflow-hidden rounded-[40px]",
        transparent && "bg-transparent border-none shadow-none overflow-visible",
        onClick && "hover:cursor-pointer",
        className
      )}
    >
        {/* Technical Data Decorators (Inset for Rounded Corners) */}
        {!transparent && (
          <>
             <div className="absolute top-8 right-8 flex gap-1.5 z-20 opacity-30 group-hover/bento:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>

             <div className="absolute bottom-8 left-8 font-mono text-[10px] text-white/30 z-20 group-hover/bento:text-[#E85002] transition-colors tracking-widest">
                SYS.ID.{Math.floor(Math.random() * 900) + 100}
             </div>
          </>
        )}

        {/* Content Container */}
        <div className={cn("relative z-10 w-full h-full flex flex-col", transparent ? "" : "")}>
            {header}
            {(title || description) && (
             <div className="p-8 flex flex-col justify-end flex-1 bg-gradient-to-t from-black via-black/80 to-transparent">
                {icon && <div className="mb-3 text-neutral-500 group-hover/bento:text-[#E85002] transition-colors duration-200">{icon}</div>}

                <div className="font-display font-black text-white mb-1.5 text-2xl uppercase tracking-tighter">
                {title}
                </div>

                <div className="font-mono font-medium text-neutral-500 text-[10px] tracking-[0.2em] uppercase">
                <span className="text-[#E85002] mr-2">➜</span>
                {description}
                </div>
            </div>
            )}
        </div>
    </motion.div>
  );
};
