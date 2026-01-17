import Link from "next/link"
import { ShoppingBag, MapPin, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white text-black border-b border-gray-100 shadow-sm">
            <div className="container max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

                {/* Left: Location & Contact */}
                <div className="hidden md:flex flex-col text-sm text-[#4d5d53]">
                    <div className="flex items-center gap-1 mb-1 hover:text-[#ffb703] cursor-pointer transition-colors">
                        <MapPin size={16} />
                        <span className="font-medium">28 May Street, Baku</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-[#ffb703] cursor-pointer transition-colors">
                        <Phone size={16} />
                        <span className="font-medium">055 555 55 55</span>
                    </div>
                </div>

                {/* Mobile Menu Icon (Placeholder) */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <MapPin className="h-6 w-6 text-[#4d5d53]" />
                    </Button>
                </div>


                {/* Center: Logo */}
                <div className="flex-1 flex justify-center">
                    <Link href="/" className="flex flex-col items-center">
                        <h1 className="text-3xl font-serif font-bold text-[#4d5d53] tracking-wide">
                            Teravaze
                        </h1>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#ffb703]">Food App</span>
                    </Link>
                </div>

                {/* Right: Cart & User */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="hover:bg-green-50 text-[#4d5d53]">
                        <User className="h-6 w-6" />
                    </Button>

                    <Button variant="default" className="bg-[#4d5d53] hover:bg-[#3d4a42] text-white rounded-full px-6 relative">
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        <span className="font-bold">Cart</span>
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ffb703] text-black text-xs font-bold border-2 border-white">
                            2
                        </span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
