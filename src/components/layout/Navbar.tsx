import Link from "next/link"
import { ShoppingBag, MapPin, Phone, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-white/10 shadow-lg font-sans">
            <div className="container max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">

                {/* Left: Location & Contact - Visible on Desktop */}
                <div className="hidden md:flex flex-col space-y-1">
                    <div className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors cursor-pointer group">
                        <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-orange-500/20">
                            <MapPin size={18} className="text-orange-500" />
                        </div>
                        <span className="font-medium text-sm">28 May Street, Baku</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors cursor-pointer group">
                        <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-orange-500/20">
                            <Phone size={18} className="text-orange-500" />
                        </div>
                        <span className="font-medium text-sm">055 555 55 55</span>
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                        <Menu className="h-7 w-7" />
                    </Button>
                </div>


                {/* Center: Logo */}
                <div className="flex-1 flex justify-center transform hover:scale-105 transition-transform duration-300">
                    <Link href="/" className="flex flex-col items-center">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            Teravaze
                        </h1>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-bold mt-1 shadow-orange-500/50">
                            Food App
                        </span>
                    </Link>
                </div>

                {/* Right: Cart & User */}
                <div className="flex items-center gap-3 md:gap-6">
                    <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-white/10 text-white">
                        <User className="h-6 w-6" />
                    </Button>

                    <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full h-12 px-6 shadow-lg shadow-orange-900/20 transition-all hover:shadow-orange-500/30 relative group border-2 border-orange-500/20">
                        <ShoppingBag className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                        <span className="font-bold text-base">Cart</span>
                        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-orange-600 text-xs font-extrabold shadow-sm">
                            2
                        </span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
