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
        <div className="sticky top-0 z-40 bg-[#4d5d53] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex overflow-x-auto no-scrollbar py-4 gap-8 items-center">
                    {MOCK_MENU.restaurant.categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => scrollToCategory(cat)}
                            className={`flex flex-col items-center group min-w-[80px] transition-colors ${activeCategory === cat ? 'text-[#ffb703]' : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {/* Icon Placeholder (Can replace with real icons later if mapped) */}
                            <div className={`p-3 rounded-full mb-1 transition-all ${activeCategory === cat ? 'bg-white/10' : 'bg-transparent group-hover:bg-white/5'
                                }`}>
                                {/* Simple text icon or we could map lucide icons */}
                                <span className="text-2xl">🍽️</span>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                                {cat}
                            </span>
                            {/* Active Indicator Line */}
                            {activeCategory === cat && (
                                <div className="h-0.5 w-full bg-[#ffb703] mt-1" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
