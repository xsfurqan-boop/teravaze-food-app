import Link from "next/link"
import { ShoppingBag, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">Teravaze</span>
                    </Link>
                </div>

                <div className="hidden flex-1 md:flex items-center justify-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search for food..."
                            className="w-full rounded-full bg-muted pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5 md:hidden" />
                    </Button>

                    <Button variant="default" size="icon" className="relative rounded-full">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary">
                            2
                        </span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
