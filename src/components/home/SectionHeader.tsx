export default function SectionHeader({ title }: { title: string }) {
    return (
        <div className="relative w-full h-[100px] bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 my-8 flex items-center justify-start px-6 md:px-10 overflow-hidden rounded-2xl border-l-4 border-orange-500 shadow-lg group">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse" />

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase relative z-10 group-hover:translate-x-2 transition-transform duration-500">
                {title} <span className="text-orange-500">.</span>
            </h2>
        </div>
    );
}
