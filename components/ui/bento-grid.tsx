"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.3 }
      }}
      whileHover={!transparent ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 20 }
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "row-span-1 group/bento transition-all duration-300 justify-between flex flex-col space-y-0 cursor-pointer relative",
        !transparent && "raycast-card overflow-hidden",
        transparent && "bg-transparent border-none shadow-none overflow-visible",
        onClick && "hover:cursor-pointer",
        className
      )}
    >
      {/* Raycast Inner Light on Hover */}
      {!transparent && (
        <motion.div
          className="absolute inset-0 opacity-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Content Container */}
      <div className={cn("relative z-10 w-full h-full flex flex-col", transparent ? "" : "")}>
        {header}
        {(title || description) && (
          <motion.div
            className="p-8 flex flex-col justify-end flex-1 bg-gradient-to-t from-black via-black/80 to-transparent"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {icon && (
              <motion.div
                className="mb-3 text-neutral-500 group-hover/bento:text-[#E85002] transition-colors duration-200"
                animate={{
                  y: isHovered ? -2 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {icon}
              </motion.div>
            )}

            <motion.div
              className="font-display font-black text-white mb-1.5 text-2xl uppercase tracking-tighter"
              animate={{
                x: isHovered ? 2 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {title}
            </motion.div>

            <motion.div
              className="font-mono font-medium text-neutral-500 text-[10px] tracking-[0.2em] uppercase overflow-hidden"
              animate={{
                x: isHovered ? 2 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
            >
              <motion.span
                className="inline-block text-[#E85002] mr-2"
                animate={{
                  x: isHovered ? [0, 3, 0] : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 0.5,
                }}
              >
                ➜
              </motion.span>
              {description}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
