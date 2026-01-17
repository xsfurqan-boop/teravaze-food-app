import { Navbar } from "@/components/layout/Navbar"
import { MenuItem } from "@/components/menu/MenuItem"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Star, Clock } from "lucide-react"
import Link from "next/link"
import { MOCK_MENU } from "@/lib/mock-data"

export default function RestaurantPage() {
    const { restaurant, items } = MOCK_MENU

    return (
        <main className="min-h-screen bg-background pb-20">
            <Navbar />

            {/* Restaurant Header */}
            <div className="relative h-64 w-full md:h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                <img
                    src={restaurant.coverImage}
                    alt={restaurant.name}
                    className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 z-20">
                    <Link href="/">
                        <Button variant="secondary" size="icon" className="rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-md">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
                <div className="absolute top-4 right-4 z-20">
                    <Link
                        href={`https://wa.me/?text=Check out this amazing restaurant: ${restaurant.name} - ${restaurant.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="secondary" size="icon" className="rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-md">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 z-20 w-full p-4 md:p-8">
                    <div className="container">
                        <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
                        <div className="flex items-center gap-4 text-sm font-medium text-white/90">
                            <div className="flex items-center gap-1 bg-green-600 px-2 py-0.5 rounded-md text-white">
                                <Star className="h-3 w-3 fill-current" /> {restaurant.rating}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" /> {restaurant.deliveryTime}
                            </div>
                            <span>• {restaurant.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="container px-4 py-8">
                <h2 className="text-xl font-bold mb-6">Recommended for you</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </main>
    )
}
