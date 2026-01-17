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
        <div className="group flex flex-col bg-neutral-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/20 h-full">
            {/* Image Section - Full Width, Fixed Height */}
            <div className="relative w-full h-[220px] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />

                {item.popular && (
                    <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Popular
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col relative">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-white line-clamp-1 group-hover:text-orange-400 transition-colors">
                        {item.name}
                    </h3>
                </div>

                <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed flex-grow">
                    {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 line-through font-medium">
                            {originalPrice} {item.currency}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-orange-500">
                                {item.price}
                            </span>
                            <span className="text-sm font-bold text-gray-300">
                                {item.currency}
                            </span>
                        </div>

                    </div>

                    <Button
                        className="rounded-xl bg-white text-black hover:bg-orange-500 hover:text-white px-5 h-10 font-bold shadow-lg transition-all active:scale-95"
                    >
                        Add <Plus className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
