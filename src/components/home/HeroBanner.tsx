import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroBanner() {
    return (
        <section className="relative overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2069" // High-res Kebab/Food image
                    alt="Delicious Food"
                    className="h-full w-full object-cover opacity-60"
                />
            </div>

            <div className="container relative z-20 flex flex-col items-start gap-4 py-20 md:py-32 px-4">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    🔥 Deal of the Day
                </div>
                <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
                    Taste the Best <br />
                    <span className="text-primary">Baku Cuisine</span>
                </h1>
                <p className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
                    From steaming Plov to juicy Kebabs. Get 20% OFF on your first order with code <span className="text-primary font-bold">BAKU20</span>.
                </p>
                <div className="flex gap-4 mt-4">
                    <Link href="/restaurant/1">
                        <Button size="lg" className="rounded-full text-lg">
                            Order Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="rounded-full text-lg">
                        View Menu
                    </Button>
                </div>
            </div>
        </section>
    )
}
