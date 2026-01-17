"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { ArrowLeft, MapPin, CreditCard, Wallet, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const initialOptions = {
    "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    "currency": "USD", // PayPal Sandbox often defaults to USD, changing AZN to USD for demo as AZN might not be standard in sandbox defaults without config
    "intent": "capture",
};

export default function CheckoutPage() {
    const router = useRouter()
    const [useCoins, setUseCoins] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'paypal'>('card')

    const ORDER_TOTAL = 45.00
    const DISCOUNT = 5.00
    const FINAL_TOTAL = useCoins ? ORDER_TOTAL - DISCOUNT : ORDER_TOTAL

    const handleCreateOrder = async (details?: any) => {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            alert("Please login to place an order")
            router.push("/login")
            return
        }

        // Insert Order into Supabase
        const { data, error } = await supabase
            .from('orders')
            .insert({
                user_id: user.id,
                total_amount: FINAL_TOTAL,
                status: details ? 'paid' : 'pending', // 'paid' if coming from PayPal
                payment_method: paymentMethod == 'paypal' ? 'paypal' : paymentMethod
            })
            .select()

        if (error) {

            alert("Failed to place order. " + error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
                <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-8">Cooking has started. Your food will be there in ~35 mins.</p>
                <Link href="/">
                    <Button size="lg" className="rounded-full">Back to Home</Button>
                </Link>
            </div>
        )
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="min-h-screen bg-background pb-32">
                <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b p-4">
                    <div className="container flex items-center gap-4">
                        <Link href="/">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-xl font-bold">Checkout</h1>
                    </div>
                </div>

                <div className="container p-4 space-y-6">
                    {/* Delivery Address */}
                    <div className="space-y-3">
                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" /> Delivery Address
                        </h2>
                        <div className="p-4 border rounded-xl bg-card hover:border-primary cursor-pointer transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 bg-primary text-white text-xs font-bold rounded-bl-lg">
                                Selected
                            </div>
                            <p className="font-bold">Home</p>
                            <p className="text-sm text-muted-foreground">28 May Street, Baku, Azerbaijan</p>
                            <p className="text-sm text-muted-foreground mt-1">+994 50 123 45 67</p>
                        </div>
                        <Button variant="outline" className="w-full border-dashed">
                            + Add New Address
                        </Button>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-primary" /> Payment
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            <div
                                onClick={() => setPaymentMethod('card')}
                                className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''}`}
                            >
                                <CreditCard className="h-6 w-6" />
                                <span className="font-medium text-sm">Card</span>
                            </div>
                            <div
                                onClick={() => setPaymentMethod('cash')}
                                className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : ''}`}
                            >
                                <Wallet className="h-6 w-6" />
                                <span className="font-medium text-sm">Cash</span>
                            </div>
                            <div
                                onClick={() => setPaymentMethod('paypal')}
                                className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : ''}`}
                            >
                                <span className="text-xl font-bold italic text-[#003087]">Pay<span className="text-[#009cde]">Pal</span></span>
                                <span className="font-medium text-sm">Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Loyalty Application */}
                    <div className="p-4 border border-orange-200 bg-orange-50/50 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">🪙</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm">Use 50 Coins</p>
                                <p className="text-xs text-muted-foreground">Save 5.00 AZN (approx $3 USD)</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-5 w-5 accent-primary"
                                checked={useCoins}
                                onChange={(e) => setUseCoins(e.target.checked)}
                            />
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-3">
                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            <span className="text-xl">🛍️</span> Order Items
                        </h2>
                        <div className="bg-card border rounded-xl p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="h-12 w-12 bg-muted rounded-md overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=100" alt="Kebab" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Lamb Kebab Platter</p>
                                        <p className="text-xs text-muted-foreground">Extra Spicy</p>
                                        <p className="text-xs font-bold mt-1">1 x 25.00 AZN</p>
                                    </div>
                                </div>
                                <p className="font-bold text-sm">25.00 AZN</p>
                            </div>
                            <div className="flex justify-between items-start pt-4 border-t border-dashed">
                                <div className="flex gap-3">
                                    <div className="h-12 w-12 bg-muted rounded-md overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=100" alt="Drink" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Ayran (Homemade)</p>
                                        <p className="text-xs text-muted-foreground">Chilled</p>
                                        <p className="text-xs font-bold mt-1">2 x 2.50 AZN</p>
                                    </div>
                                </div>
                                <p className="font-bold text-sm">5.00 AZN</p>
                            </div>
                            <div className="flex justify-between items-start pt-4 border-t border-dashed">
                                <div className="flex gap-3">
                                    <div className="h-12 w-12 bg-muted rounded-md overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1574484284008-59166b5bad6c?auto=format&fit=crop&w=100" alt="Salad" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Choban Salad</p>
                                        <p className="text-xs text-muted-foreground">Fresh Greens</p>
                                        <p className="text-xs font-bold mt-1">1 x 10.00 AZN</p>
                                    </div>
                                </div>
                                <p className="font-bold text-sm">10.00 AZN</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>40.00 AZN</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span>5.00 AZN</span>
                        </div>
                        {useCoins && (
                            <div className="flex justify-between text-sm text-green-600 font-medium">
                                <span>Loyalty Discount</span>
                                <span>-5.00 AZN</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-bold pt-2">
                            <span>Total</span>
                            <span className="text-primary">{FINAL_TOTAL.toFixed(2)} AZN</span>
                        </div>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4 z-40 md:static md:border-t-0">
                    <div className="container">
                        {paymentMethod === 'paypal' ? (
                            <PayPalButtons
                                style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        intent: "CAPTURE",
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: "USD",
                                                    value: (FINAL_TOTAL * 0.59).toFixed(2), // Rough AZN to USD conversion for Demo
                                                },
                                            },
                                        ],
                                    })
                                }}
                                onApprove={async (data, actions) => {
                                    if (actions.order) {
                                        const details = await actions.order.capture()
                                        handleCreateOrder(details)
                                    }
                                }}
                            />
                        ) : (
                            <Button
                                size="lg"
                                className="w-full rounded-full text-lg font-bold h-14 shadow-xl shadow-primary/20"
                                onClick={() => handleCreateOrder()}
                                disabled={loading}
                            >
                                {loading ? "Placing Order..." : `Place Order (${FINAL_TOTAL.toFixed(2)} AZN)`}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    )
}
