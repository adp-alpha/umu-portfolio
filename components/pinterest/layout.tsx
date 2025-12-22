"use client";

import { ArrowUpRight, Bell, ChevronDown, MessageCircle, MoreHorizontal, Search, Upload } from "lucide-react";
import { useState } from "react";

// --- Types ---
export interface Pin {
    id: number;
    title: string;
    image: string;
    heightClass: string; // Tailwind class for aspect ratio simulation if needed, or just let natural height work
    user?: string;
}

// --- Components ---

export const PinterestHeader = () => {
    return (
        <div className="fixed top-0 w-full z-50 bg-[#050505] py-4 px-4 flex items-center justify-between gap-4">
             {/* Logo */}
             <a href="/" className="w-10 h-10 rounded-full bg-[#E60023] flex items-center justify-center text-white font-bold flex-shrink-0 hover:bg-[#ad081b] transition-colors cursor-pointer">
                P
             </a>

             {/* Nav Links */}
             <div className="hidden md:flex items-center gap-1">
                 <button className="px-4 py-2 bg-white text-black rounded-full font-bold text-sm">Home</button>
                 <button className="px-4 py-2 text-white font-semibold text-sm hover:bg-[#1a1a1a] rounded-full transition-colors">Create</button>
             </div>

             {/* Search */}
             <div className="flex-1 relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                 <input
                    type="text"
                    placeholder="Search for inspiration"
                    className="w-full bg-[#1a1a1a] rounded-full py-3 pl-12 pr-4 text-white text-sm outline-none focus:ring-2 focus:ring-[#E60023]/50 hover:bg-[#2a2a2a] transition-all"
                 />
             </div>

             {/* Icons */}
             <div className="flex items-center gap-2 text-gray-400">
                 <button className="p-3 hover:bg-[#1a1a1a] rounded-full transition-colors relative">
                    <Bell className="w-6 h-6" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#E60023] rounded-full" />
                 </button>
                 <button className="p-3 hover:bg-[#1a1a1a] rounded-full transition-colors">
                    <MessageCircle className="w-6 h-6" />
                 </button>
                 <button className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold hover:opacity-80">
                    U
                 </button>
                 <button className="p-1 hover:bg-[#1a1a1a] rounded-full transition-colors">
                    <ChevronDown className="w-4 h-4" />
                 </button>
             </div>
        </div>
    );
};

export const PinCard = ({ pin }: { pin: Pin }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`mb-4 relative break-inside-avoid rounded-[20px] overflow-hidden cursor-zoom-in group ${pin.heightClass || ''}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img src={pin.image} alt={pin.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-black/40 p-4 flex flex-col justify-between transition-opacity duration-200 ${hover ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex justify-end items-start pointer-events-none">
                    <button className="bg-[#E60023] text-white font-bold px-5 py-3 rounded-full text-sm hover:bg-[#ad081b] transition-colors pointer-events-auto shadow-sm">
                        Save
                    </button>
                </div>

                <div className="flex justify-between items-center pointer-events-none">
                    <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-black px-3 py-2 rounded-full hover:bg-white transition-colors pointer-events-auto w-fit max-w-[140px]">
                        <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                        <span className="text-xs font-bold truncate">{pin.title}</span>
                    </button>

                    <div className="flex gap-2">
                         <button className="p-2 bg-white/90 backdrop-blur-sm text-black rounded-full hover:bg-white pointer-events-auto transition-colors">
                            <Upload className="w-4 h-4" />
                         </button>
                         <button className="p-2 bg-white/90 backdrop-blur-sm text-black rounded-full hover:bg-white pointer-events-auto transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
