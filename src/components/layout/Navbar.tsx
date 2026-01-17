"use client";

import Link from "next/link"
import { ShoppingBag, MapPin, Phone, User, Menu, X, Tag, Package, Clock, MessageCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext";

export function Navbar() {
    const { cartCount, isMenuOpen, toggleMenu, closeMenu } = useCart();

    const scrollToInfo = (id: string) => {
        closeMenu();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
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
                        <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white" onClick={toggleMenu}>
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

                        <Link href="/checkout">
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full h-12 px-6 shadow-lg shadow-orange-900/20 transition-all hover:shadow-orange-500/30 relative group border-2 border-orange-500/20">
                                <ShoppingBag className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                                <span className="font-bold text-base">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-orange-600 text-xs font-extrabold shadow-sm animate-in zoom-in">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer / Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in"
                        onClick={closeMenu}
                    />

                    {/* Menu Content */}
                    <div className="relative w-[300px] h-full bg-neutral-900 border-r border-white/10 p-6 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                            <h2 className="text-2xl font-black text-white tracking-widest">MENU</h2>
                            <Button variant="ghost" size="icon" onClick={closeMenu} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto space-y-6">

                            {/* Special Actions */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-4 text-orange-500 p-3 rounded-xl bg-orange-500/10 cursor-pointer hover:bg-orange-500/20 transition-colors">
                                    <Tag className="h-5 w-5" />
                                    <span className="font-bold">Hot Deals & Offers</span>
                                </div>
                                <div className="flex items-center gap-4 text-white p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                    <Package className="h-5 w-5 text-gray-400" />
                                    <span className="font-medium">Track Order</span>
                                </div>
                            </div>

                            <div className="h-px bg-white/5 my-2" />

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 ml-3">Categories</h3>
                                <div className="space-y-1">
                                    {["Appetizers", "Burgers", "Sandwiches", "Steaks", "BBQ"].map((cat) => (
                                        <div
                                            key={cat}
                                            onClick={() => scrollToInfo(cat)}
                                            className="block p-3 rounded-lg text-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer font-medium"
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-white/5 my-2" />

                            {/* User Actions */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-4 text-white p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                    <span className="font-medium">Order History</span>
                                </div>
                                <div className="flex items-center gap-4 text-white p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                    <MessageCircle className="h-5 w-5 text-gray-400" />
                                    <span className="font-medium">Contact Support</span>
                                </div>
                                <div className="flex items-center gap-4 text-white p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                    <Star className="h-5 w-5 text-gray-400" />
                                    <span className="font-medium">Rate Us</span>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-6 border-t border-white/5 text-center">
                            <p className="text-xs text-gray-600">Teravaze App v1.0</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
