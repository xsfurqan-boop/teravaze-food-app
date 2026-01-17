"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    '/hero/slide-1.png',
    '/hero/slide-2.png',
    '/hero/slide-3.png',
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((curr) => (curr === 0 ? SLIDES.length - 1 : curr - 1));
    const next = () => setCurrent((curr) => (curr === SLIDES.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        const timer = setInterval(next, 5000); // Auto-slide every 5s
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden group">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {SLIDES.map((src, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${current === i ? 'bg-white scale-110' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
