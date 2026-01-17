import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.popular && (
                    <div className="absolute top-2 left-2 rounded-full bg-primary/90 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                        Popular
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold leading-none tracking-tight line-clamp-1">{item.name}</h3>
                    <span className="font-bold text-primary">{item.price} {item.currency}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                    {item.description}
                </p>

                <Button className="w-full rounded-full" size="sm">
                    Add <Plus className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
