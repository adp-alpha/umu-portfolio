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
        "relative grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={!transparent ? {
        y: -4,
        transition: { duration: 0.4, ease: "easeOut" }
      } : { scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "row-span-1 rounded-[2rem] group/bento transition-all duration-700 justify-between flex flex-col space-y-0 cursor-pointer relative",
        !transparent && "bg-[#030303] border border-white/5 hover:border-white/10 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-black/60 overflow-hidden",
        transparent && "bg-transparent border-none shadow-none overflow-visible",
        onClick && "hover:cursor-pointer",
        className
      )}
    >
        {!transparent && (
          <>
            {/* Elegant Noise Texture (Subtle) */}
            <div className="absolute inset-0 z-0 bg-noise opacity-[0.15] pointer-events-none mix-blend-overlay" />

            {/* Subtle Gradient Glow from Top */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700" />

            {/* Ambient Backlight (Very Subtle Colors) */}
            <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-white/5 rounded-full blur-[80px] group-hover/bento:bg-[#E85002]/10 transition-colors duration-1000" />

            {/* Inner Highlight Border */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/5 z-20 pointer-events-none" />
          </>
        )}

        {/* Content Container */}
        <div className={cn("relative z-30 w-full h-full flex flex-col", transparent ? "" : "")}>
            {header}
            {(title || description) && (
             <div className="p-6 md:p-8 transition-transform duration-700 group-hover/bento:translate-y-[-2px]">
                {icon && <div className="mb-4 text-neutral-500 group-hover/bento:text-white transition-colors duration-500">{icon}</div>}

                <div className="font-display font-medium text-neutral-200 group-hover/bento:text-white mb-2 text-xl tracking-tight transition-colors duration-500">
                {title}
                </div>

                <div className="font-sans font-medium text-neutral-500 text-xs tracking-wide uppercase group-hover/bento:text-neutral-400 transition-colors duration-500">
                {description}
                </div>
            </div>
            )}
        </div>
    </motion.div>
  );
};
