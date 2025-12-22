"use client";

import { motion } from "framer-motion";
import {
    Crop,
    Eraser,
    Eye,
    Folder,
    Layers,
    MousePointer2,
    Move,
    Paintbrush,
    Settings,
    Trash2,
    Type
} from "lucide-react";

// --- Types ---
export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    layerName: string;
}

// --- Components ---

export const PSToolbar = () => {
    const tools = [
        { icon: Move, label: "Move" },
        { icon: MousePointer2, label: "Select" },
        { icon: Crop, label: "Crop" },
        { icon: Type, label: "Text" },
        { icon: Paintbrush, label: "Brush" },
        { icon: Eraser, label: "Eraser" },
        { icon: Layers, label: "Gradient" },
    ];

    return (
        <div className="w-12 bg-[#2d2d2d] flex flex-col items-center py-2 gap-2 border-r border-[#1e1e1e] flex-shrink-0 z-20">
            {tools.map((t, i) => (
                <div key={i} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#3d3d3d] text-gray-400 cursor-pointer relative group">
                    <t.icon className="w-4 h-4" />
                    <span className="absolute left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50">
                        {t.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export const PSLayersPanel = ({
    items,
    selectedId,
    onSelect
}: {
    items: GalleryItem[],
    selectedId: number,
    onSelect: (id: number) => void
}) => {
    return (
        <div className="w-72 bg-[#2d2d2d] border-l border-[#1e1e1e] flex flex-col flex-shrink-0 z-20">
            {/* Panel Tabs */}
            <div className="h-8 bg-[#383838] flex items-center px-2 gap-4 text-xs font-medium text-gray-300 border-b border-[#1e1e1e]">
                <span>Layers</span>
                <span className="text-gray-500">Channels</span>
                <span className="text-gray-500">Paths</span>
            </div>

            {/* Layer Controls */}
            <div className="p-2 flex gap-2 border-b border-[#1e1e1e]">
                 <div className="text-xs text-gray-400">Normal</div>
                 <div className="text-xs text-gray-400 ml-auto">Op: 100%</div>
            </div>

            {/* Layers List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-1 space-y-1">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`flex items-center gap-2 p-1 rounded cursor-pointer select-none text-xs ${
                            selectedId === item.id ? 'bg-[#4a4a4a]' : 'hover:bg-[#383838]'
                        }`}
                    >
                        <Eye className="w-3 h-3 text-gray-400" />

                        {/* Layer Preview Thumbnail */}
                        <div className="w-10 h-8 bg-black border border-gray-600 overflow-hidden relative">
                             <img src={item.image} className="w-full h-full object-cover" />
                        </div>

                        <span className="text-gray-200 truncate flex-1">{item.layerName}</span>
                    </div>
                ))}
            </div>

            {/* Bottom Controls */}
            <div className="h-8 bg-[#2d2d2d] border-t border-[#1e1e1e] flex items-center justify-between px-3 text-gray-400">
                <Settings className="w-4 h-4 hover:text-white cursor-pointer" />
                <div className="flex gap-2">
                    <Folder className="w-4 h-4 hover:text-white cursor-pointer" />
                    <Trash2 className="w-4 h-4 hover:text-white cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export const PSCanvas = ({ item }: { item: GalleryItem }) => {
    return (
        <div className="flex-1 bg-[#1e1e1e] flex items-center justify-center overflow-hidden relative p-8">
            {/* Ruler / Guides Mock */}
            <div className="absolute top-0 left-0 w-full h-6 bg-[#262626] border-b border-[#3e3e3e] z-10" />
            <div className="absolute top-0 left-0 w-6 h-full bg-[#262626] border-r border-[#3e3e3e] z-10" />

            {/* Main Canvas Area */}
            <div className="bg-[#282828] p-1 shadow-2xl overflow-hidden relative group">
                {/* Checkered Background (Transparency grid) */}
                <div
                    className="absolute inset-1 z-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                    }}
                />

                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 border border-white/5"
                >
                     <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-[70vh] max-w-full object-contain shadow-black/50 shadow-lg"
                     />
                </motion.div>

                {/* Transform Handles (UI Flair) */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-white border border-blue-500 -translate-x-1 -translate-y-1 z-20" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-white border border-blue-500 translate-x-1 -translate-y-1 z-20" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-white border border-blue-500 -translate-x-1 translate-y-1 z-20" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-white border border-blue-500 translate-x-1 translate-y-1 z-20" />
                <div className="absolute inset-0 border border-blue-500 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

            </div>

            {/* Info Footer */}
            <div className="absolute bottom-4 bg-[#2d2d2d] px-4 py-2 rounded text-xs text-gray-400 flex gap-4 shadow-lg border border-[#3e3e3e]">
                <span>Doc: 1080px x 1920px (72ppi)</span>
                <span>Zoom: 100%</span>
                <span>{item.title}</span>
            </div>
        </div>
    );
};
