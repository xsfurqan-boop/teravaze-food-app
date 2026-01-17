"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle } from "lucide-react"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type OrderItem = {
    name: string;
    quantity: number;
}

type Order = {
    id: string;
    created_at: string;
    customer_name: string;
    items: OrderItem[];
    total_amount: number;
    status: string;
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setOrders(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchOrders()
        // Subscribe to real-time changes
        const channel = supabase
            .channel('orders')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
                setOrders((prev) => [payload.new as Order, ...prev])
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // Statistics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length
    const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'paid').length // Considering paid as completed for now

    return (
        <div className="p-8 space-y-8 min-h-screen bg-muted/20">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard &lt;Live&gt;</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchOrders}>Refresh</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <span className="text-muted-foreground font-bold">AZN</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} AZN</div>
                        <p className="text-xs text-muted-foreground">Lifetime Earnings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New / Pending</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeOrders}</div>
                        <p className="text-xs text-muted-foreground">Needs Attention</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">All Orders</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders.length}</div>
                        <p className="text-xs text-muted-foreground">Total Orders Placed</p>
                    </CardContent>
                </Card>
            </div>

            {/* Live Orders Board */}
            <div>
                <h2 className="text-xl font-bold mb-4">Live Incoming Orders</h2>
                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-muted-foreground">No orders yet.</p>
                ) : (
                    <div className="grid gap-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4 animate-in fade-in slide-in-from-top-4">
                                <div className="flex gap-4 items-center">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                        #{order.id.slice(0, 4)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">{order.customer_name || "Guest"}</p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {Array.isArray(order.items)
                                                ? order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(", ")
                                                : "Items info unavailable"}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(order.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 ml-auto">
                                    <div className="text-right">
                                        <p className="font-bold text-lg">{order.total_amount?.toFixed(2)} AZN</p>
                                    </div>
                                    <Badge
                                        variant={order.status === 'pending' ? 'destructive' : order.status === 'preparing' ? 'secondary' : 'default'}
                                        className="px-4 py-1 text-sm font-medium capitalize"
                                    >
                                        {order.status}
                                    </Badge>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
