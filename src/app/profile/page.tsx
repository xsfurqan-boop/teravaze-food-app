"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { Loader2, MapPin, Gift, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ProfilePage() {
    const router = useRouter()
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push("/login")
                return
            }

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            setProfile(data || { email: user.email, loyalty_coins: 50, full_name: "Guest" }) // Fallback
            setLoading(false)
        }
        getProfile()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/login")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <div className="container p-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                    </Button>
                </div>

                {/* Loyalty Card */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Gift className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-orange-100 font-medium mb-1">Total Balance</p>
                        <div className="text-5xl font-extrabold mb-4">
                            {profile?.loyalty_coins} <span className="text-2xl opacity-80">Coins</span>
                        </div>
                        <p className="text-sm text-orange-100">Use these coins to get discounts on your favorite meals!</p>
                    </div>
                </div>

                {/* User Details */}
                <div className="space-y-6">
                    <div className="bg-card border p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4 text-primary">Personal Details</h3>
                        <div className="grid gap-4">
                            <div>
                                <label className="text-sm text-muted-foreground">Full Name</label>
                                <p className="font-medium">{profile?.full_name || "Foodie User"}</p>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground">Email</label>
                                <p className="font-medium">{profile?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-primary">Saved Addresses</h3>
                            <Button size="sm" variant="outline">Add New</Button>
                        </div>
                        <div className="flex items-center p-4 bg-accent/50 rounded-lg">
                            <div className="h-10 w-10 bg-background rounded-full flex items-center justify-center mr-4">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Home</p>
                                <p className="text-sm text-muted-foreground">28 May Street, Baku, Azerbaijan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
