export default function SectionHeader({ title }: { title: string }) {
    return (
        <div className="relative w-full h-[120px] md:h-[160px] bg-[#4d5d53] my-8 flex items-center justify-center overflow-hidden rounded-lg mx-auto max-w-7xl">
            {/* Decorative Leafs (Approximated with CSS shapes/opacity) */}
            <div className="absolute left-[-20px] bottom-[-20px] text-white/5 opacity-20 transform -rotate-12">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7 2 3 7 3 12C3 17 7 22 12 22C17 22 21 17 21 12C21 7 17 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                </svg>
            </div>
            <div className="absolute right-[-20px] top-[-20px] text-white/5 opacity-20 transform rotate-45">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7 2 3 7 3 12C3 17 7 22 12 22C17 22 21 17 21 12C21 7 17 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                </svg>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#ffcdb2] tracking-wide relative z-10 drop-shadow-md">
                {title}
            </h2>
        </div>
    );
}
