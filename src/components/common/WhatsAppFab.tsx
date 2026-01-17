import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFab() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Link
                href="https://wa.me/994xxxxxxxxx?text=Hi, I need help with my order."
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg transition-transform hover:scale-110"
                >
                    <MessageCircle className="h-8 w-8 text-white" />
                </Button>
            </Link>
        </div>
    )
}
