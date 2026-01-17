
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push("/profile")
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        Welcome <span className="text-4xl">👋</span>
                    </h1>
                    <p className="text-xs text-muted-foreground/50 absolute top-2 right-2">v1.1</p>
                    <p className="mt-2 text-muted-foreground">
                        Sign in to check your <span className="text-primary font-medium">Food Coins</span>.
                    </p>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                Email
                            </label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                required
                                className="bg-background/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                required
                                className="bg-background/50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button disabled={loading} className="w-full rounded-full text-lg font-bold h-12 shadow-lg shadow-primary/20" size="lg">
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link href="/signup" className="text-primary font-bold hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
