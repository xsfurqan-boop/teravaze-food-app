
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

export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName, // This triggers the handle_new_user function
                }
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Redirect to profile (Supabase usually auto-logs on signup if email confirm is off)
            router.push("/profile")
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Join Teravaze <span className="text-primary">🚀</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Get <span className="text-primary font-bold">50 Free Coins</span> on signup!
                    </p>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
                    <form onSubmit={handleSignup} className="space-y-4">
                        {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                className="bg-background/50"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">
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
                            <label className="text-sm font-medium leading-none" htmlFor="password">
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
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
