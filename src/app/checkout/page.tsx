"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, CreditCard, Wallet, CheckCircle2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { createClient } from "@supabase/supabase-js"
import { useCart } from "@/context/CartContext"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const initialOptions = {
    "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    "currency": "USD",
    "intent": "capture",
};

export default function CheckoutPage() {
    const router = useRouter()
    const { items, cartTotal, removeFromCart, clearCart } = useCart()
    const [useCoins, setUseCoins] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'paypal'>('card')

    const DELIVERY_FEE = 5.00
    const DISCOUNT = 5.00
    const FINAL_TOTAL = (cartTotal + DELIVERY_FEE) - (useCoins ? DISCOUNT : 0)

    const handleCreateOrder = async (details?: any) => {
        setLoading(true)

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            alert("Please login to place an order")
            router.push("/login")
            return
        }

        const { error } = await supabase
            .from('orders')
            .insert({
                user_id: user.id,
                total_amount: FINAL_TOTAL,
                status: details ? 'paid' : 'pending',
                payment_method: paymentMethod == 'paypal' ? 'paypal' : paymentMethod,
                items: items // Assuming Supabase 'orders' table has a JSONB 'items' column
            })

        if (error) {
            alert("Failed to place order. " + error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            clearCart() // Clear cart on success
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

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center space-y-4">
                <div className="h-24 w-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">🛒</span>
                </div>
                <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                <p className="text-muted-foreground">Add some delicious items from the menu first.</p>
                <Link href="/">
                    <Button size="lg" className="rounded-full bg-orange-600 hover:bg-orange-700">Browse Menu</Button>
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

                <div className="container p-4 space-y-6 max-w-2xl mx-auto">
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
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            <span className="text-xl">🛍️</span> Order Items
                        </h2>
                        <div className="bg-card border rounded-xl p-4 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-start pb-4 border-b border-dashed last:border-0 last:pb-0">
                                    <div className="flex gap-3">
                                        <div className="h-16 w-16 bg-muted rounded-lg overflow-hidden flex-shrink-0 relative">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                                            <p className="text-xs font-bold mt-1 text-orange-600">
                                                {item.quantity} x {item.price} {item.currency}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <p className="font-bold text-sm">
                                            {(item.price * item.quantity).toFixed(2)} {item.currency}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{cartTotal.toFixed(2)} AZN</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span>{DELIVERY_FEE.toFixed(2)} AZN</span>
                        </div>
                        {useCoins && (
                            <div className="flex justify-between text-sm text-green-600 font-medium">
                                <span>Loyalty Discount</span>
                                <span>-{DISCOUNT.toFixed(2)} AZN</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-bold pt-2 border-t mt-2">
                            <span>Total</span>
                            <span className="text-primary">{FINAL_TOTAL.toFixed(2)} AZN</span>
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
                                <p className="text-xs text-muted-foreground">Save {DISCOUNT.toFixed(2)} AZN</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="h-5 w-5 accent-primary cursor-pointer"
                            checked={useCoins}
                            onChange={(e) => setUseCoins(e.target.checked)}
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-primary" /> Payment Method
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div
                                onClick={() => setPaymentMethod('paypal')}
                                className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-card'}`}
                            >
                                <div className="flex items-center gap-1">
                                    <span className="text-xl font-bold italic text-[#003087]">Pay<span className="text-[#009cde]">Pal</span></span>
                                    <span className="text-sm text-gray-400">/</span>
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <span className="font-medium text-sm">Online Payment</span>
                            </div>
                            <div
                                onClick={() => setPaymentMethod('cash')}
                                className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-card'}`}
                            >
                                <Wallet className="h-6 w-6" />
                                <span className="font-medium text-sm">Cash on Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Button */}
                    <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4 z-40 md:static md:border-t-0 md:p-0">
                        {paymentMethod === 'paypal' ? (
                            <PayPalButtons
                                style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        intent: "CAPTURE",
                                        application_context: {
                                            shipping_preference: "NO_SHIPPING"
                                        },
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: "USD",
                                                    value: (FINAL_TOTAL * 0.59).toFixed(2),
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
                                className="w-full rounded-full text-lg font-bold h-14 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90"
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
