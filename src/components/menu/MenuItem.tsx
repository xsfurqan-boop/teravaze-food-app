import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MenuItemProps {
    item: {
        id: string
        name: string
        description: string
        price: number
        currency: string
        image: string
        popular?: boolean
    }
}

export function MenuItem({ item }: MenuItemProps) {
    const originalPrice = (item.price * 1.2).toFixed(2);

    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
            {/* Image Section - Full Width, Fixed Height */}
            <div className="relative w-full h-[200px] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {item.popular && (
                    <div className="absolute top-3 left-3 bg-[#ffb703] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Popular
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-[#2d3436] line-clamp-1 group-hover:text-[#4d5d53] transition-colors">
                        {item.name}
                    </h3>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through font-medium">
                            {originalPrice} {item.currency}
                        </span>
                        <span className="text-xl font-extrabold text-[#4d5d53]">
                            {item.price} {item.currency}
                        </span>
                    </div>

                    <Button
                        className="rounded-xl bg-[#4d5d53] hover:bg-[#3d4a42] text-white px-6 font-bold shadow-md hover:shadow-lg transition-all"
                    >
                        Add <Plus className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MenuItemProps {
    item: {
        id: string
        name: string
        description: string
        price: number
        currency: string
        image: string
        popular?: boolean
    }
}

export function MenuItem({ item }: MenuItemProps) {
    // Mock discount for display logic (Displaying original price as 20% higher)
    const originalPrice = (item.price * 1.2).toFixed(2);

    return (
        <div className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Image Section (Left on Desktop, Top on Mobile) */}
            <div className="relative w-full sm:w-[40%] aspect-[4/3] sm:aspect-square md:aspect-[4/3] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.popular && (
                    <div className="absolute top-2 left-2 bg-[#ffb703] text-black text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                        Chef&apos;s Special
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg text-[#2d3436] mb-1 line-clamp-1 group-hover:text-[#4d5d53] transition-colors">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through decoration-red-400 decoration-1">
                            {originalPrice} {item.currency}
                        </span>
                        <span className="text-lg font-bold text-[#4d5d53]">
                            {item.price} {item.currency}
                        </span>
                    </div>

                    <Button
                        size="icon"
                        className="rounded-lg bg-[#4d5d53] hover:bg-[#ffb703] hover:text-black transition-colors w-10 h-10 shadow-md"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
