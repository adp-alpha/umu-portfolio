"use client";

import { NetflixHero } from "@/components/netflix/hero";
import { NetflixRow } from "@/components/netflix/row";
// Note: If Navbar doesn't exist, I'll allow globalx     nav to handle it or build a simple netflix header.

// Mock Data
const trending = [
    { id: 1, title: "Emotion AI", image: "/mexc.png", match: 98, tags: ["Python", "AI", "Vision"] },
    { id: 2, title: "LPU Crowdfund", image: "/me.jpeg", match: 95, tags: ["React", "Stripe", "Node"] },
    { id: 3, title: "Cyber Terminal", image: "/mex.png", match: 88, tags: ["Next.js", "Three.js", "WebGL"] },
    { id: 4, title: "Design System", image: "/mexcw.png", match: 99, tags: ["Figma", "Tailwind", "Storybook"] },
    { id: 5, title: "Portfolio V1", image: "/me.png", match: 80, tags: ["HTML", "CSS", "JS"] },
    { id: 6, title: "Chat App", image: "/mexc.png", match: 92, tags: ["Socket.io", "Redis", "React"] },
];

const webApps = [
    { id: 7, title: "E-Commerce", image: "/mex.png", match: 96, tags: ["Shopify", "Liquid", "JS"] },
    { id: 8, title: "Dashboard", image: "/mexc.png", match: 91, tags: ["D3.js", "React", "Analytics"] },
    { id: 9, title: "Social Feed", image: "/mexcw.png", match: 89, tags: ["GraphQL", "Apollo", "React"] },
    { id: 10, title: "Maps Integ", image: "/me.jpeg", match: 94, tags: ["Google Maps", "API", "Geo"] },
];

export default function ProjectsPage() {
  return (
    <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden pb-20">

      {/* Netflix Header (Simple) */}
      <div className="fixed top-0 w-full z-50 flex items-center justify-between px-12 py-4 bg-gradient-to-b from-black/80 to-transparent transition-all">
         <img src="/logo.svg" className="h-8 w-auto text-[#E50914]" alt="LOGO" />
         {/* If logo empty, text */}
         <div className="flex gap-6 text-sm font-medium">
            <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="font-bold">Projects</a>
            <a href="/gallery" className="hover:text-gray-300 transition-colors">Gallery</a>
            <a href="#" className="hover:text-gray-300 transition-colors">My List</a>
         </div>
      </div>

      <NetflixHero />

      <div className="-mt-32 relative z-30 space-y-8 pl-0">
         <NetflixRow title="Trending Now" projects={trending} />
         <NetflixRow title="Full Stack Applications" projects={webApps} />
         <NetflixRow title="AI & Machine Learning" projects={trending} />
         <NetflixRow title="Design Systems" projects={webApps} />
      </div>

    </div>
  );
}
