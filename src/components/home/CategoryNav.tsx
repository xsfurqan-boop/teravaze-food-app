"use client";

import { useEffect, useState } from 'react';
import { MOCK_MENU } from '@/lib/mock-data';

export default function CategoryNav() {
    const [activeCategory, setActiveCategory] = useState(MOCK_MENU.restaurant.categories[0]);

    const scrollToCategory = (category: string) => {
        const element = document.getElementById(category);
        if (element) {
            // Offset for the sticky header (approx 100px)
            const y = element.getBoundingClientRect().top + window.scrollY - 180;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveCategory(category);
        }
    };

    return (
        <div className="sticky top-24 z-40 bg-neutral-950/95 backdrop-blur shadow-2xl py-2 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex overflow-x-auto no-scrollbar py-2 gap-4 md:gap-8 items-center">
                    {MOCK_MENU.restaurant.categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => scrollToCategory(cat)}
                            className={`flex flex-col items-center group min-w-[70px] transition-all duration-300 rounded-lg p-2 ${activeCategory === cat ? 'bg-white/5' : 'hover:bg-white/5'
                                }`}
                        >
                            <span className={`text-xs md:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-orange-500' : 'text-gray-400 group-hover:text-white'
                                }`}>
                                {cat}
                            </span>

                            {activeCategory === cat && (
                                <div className="h-0.5 w-1/2 bg-orange-500 mt-2 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
