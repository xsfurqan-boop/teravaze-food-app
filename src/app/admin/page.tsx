import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, CheckCircle } from "lucide-react"

// Mock Orders Data
const ORDERS = [
    { id: "#1001", customer: "Farid M.", items: "2x Adana Kebab, 1x Cola", total: "40 AZN", status: "New", time: "2 min ago" },
    { id: "#1002", customer: "Leyla A.", items: "1x Shah Plov", total: "25 AZN", status: "Preparing", time: "15 min ago" },
    { id: "#1003", customer: "Orkhan B.", items: "3x Lamb Chops", total: "90 AZN", status: "Ready", time: "30 min ago" },
]

export default function AdminDashboard() {
    return (
        <div className="p-8 space-y-8 min-h-screen bg-muted/20">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <div className="flex gap-2">
                    <Button variant="outline">Refresh</Button>
                    <Button>Settings</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <span className="text-muted-foreground font-bold">AZN</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">450.00 AZN</div>
                        <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">4 preparing, 8 delivery</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48</div>
                        <p className="text-xs text-muted-foreground">Orders today</p>
                    </CardContent>
                </Card>
            </div>

            {/* Live Orders Board */}
            <div>
                <h2 className="text-xl font-bold mb-4">Live Orders</h2>
                <div className="grid gap-4">
                    {ORDERS.map((order) => (
                        <Card key={order.id} className="flex items-center justify-between p-4">
                            <div className="flex gap-4 items-center">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {order.id.slice(1)}
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{order.customer}</p>
                                    <p className="text-sm text-muted-foreground">{order.items}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="font-bold">{order.total}</p>
                                    <p className="text-xs text-muted-foreground">{order.time}</p>
                                </div>
                                <Badge
                                    variant={order.status === 'New' ? 'destructive' : order.status === 'Preparing' ? 'secondary' : 'default'}
                                    className="px-4 py-1 text-sm font-medium"
                                >
                                    {order.status}
                                </Badge>
                                <Button size="sm" variant="outline">Manage</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
