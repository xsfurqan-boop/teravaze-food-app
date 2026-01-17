"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_MENU } from '@/lib/mock-data';

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    // Get the first item from each category for the slider
    const categories = ["Appetizers", "Burgers", "Sandwiches", "Steaks", "BBQ"];
    const slides = categories.map(cat => {
        const item = MOCK_MENU.items.find(i => i.category === cat);
        return item ? { image: item.image, title: item.name, category: cat } : null;
    }).filter(item => item !== null) as { image: string, title: string, category: string }[];

    const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () => setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        const timer = setInterval(next, 5000); // Auto-slide every 5s
        return () => clearInterval(timer);
    }, []);

    if (slides.length === 0) return null;

    return (
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden group">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Slide Content */}
                        <div className="absolute bottom-10 left-4 md:left-10 text-white z-10">
                            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm md:text-base mb-2 block">
                                Featured {slide.category}
                            </span>
                            <h2 className="text-3xl md:text-6xl font-black tracking-tight drop-shadow-2xl">
                                {slide.title}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur text-white hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110 opacity-0 group-hover:opacity-100 z-20"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur text-white hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110 opacity-0 group-hover:opacity-100 z-20"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 right-4 md:right-10 flex gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${current === i ? 'w-8 bg-orange-500' : 'w-2 bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
