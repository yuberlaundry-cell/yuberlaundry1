
'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusTimeline } from "@/components/orders/order-status-timeline";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { mockBusinessOrders } from "@/lib/mock-data";
import { ArrowLeft, FileText, Shirt, ShoppingBag, VenetianMask, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const statusColors: { [key: string]: string } = {
    'Delivered': 'bg-green-100 text-green-800',
    'In progress': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Scheduled': 'bg-blue-100 text-blue-800',
};

const serviceIcons: { [key: string]: React.ReactNode } = {
    'Wash & Fold': <ShoppingBag className="h-5 w-5 text-muted-foreground" />,
    'Dry Cleaning': <VenetianMask className="h-5 w-5 text-muted-foreground" />,
    'Ironing': <Shirt className="h-5 w-5 text-muted-foreground" />,
};

export default function BusinessOrderDetailsPage() {
    const params = useParams();
    const orderId = `#${params.id as string}`;
    const order = mockBusinessOrders.find(o => o.id === orderId);
    const { user } = useAuth();
    const isAdmin = user?.role === 'business_admin';

    if (!order) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold">Order not found</h2>
                <Button variant="link" asChild><Link href="/business/orders">Return to list</Link></Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/business/orders">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all orders
                    </Link>
                </Button>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                        {order.id} 
                        <Badge variant="secondary" className={`text-base ${statusColors[order.status]}`}>{order.status}</Badge>
                    </h1>
                     <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{order.employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>For {order.employee.name}</span>
                    </div>
                </div>
                {isAdmin && (
                    <div className="flex gap-2">
                        <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Download Receipt</Button>
                        <Button variant="destructive" disabled={order.status === 'Delivered' || order.status === 'Cancelled'}>
                            <XCircle className="mr-2 h-4 w-4" /> Cancel Order
                        </Button>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <OrderStatusTimeline timeline={order.timeline} />
                     {isAdmin && <Card>
                        <CardHeader>
                            <CardTitle>Internal Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground italic">No notes for this order.</p>
                        </CardContent>
                    </Card>}
                </div>
                 <div className="lg:col-span-1 space-y-8 lg:sticky top-24">
                     <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="space-y-1">
                                <h4 className="font-semibold mb-1">Services</h4>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    {serviceIcons[order.service]}
                                    <span>{order.service}</span>
                                </div>
                            </div>
                            <Separator/>
                            <div>
                                <h4 className="font-semibold mb-1">Pickup</h4>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.pickupAddress)}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">
                                    {order.pickupAddress}
                                </a>
                                <p className="text-muted-foreground">{order.pickup}</p>
                            </div>
                            <Separator />
                             <div>
                                <h4 className="font-semibold mb-1">Delivery</h4>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.deliveryAddress)}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">
                                    {order.deliveryAddress}
                                </a>
                                <p className="text-muted-foreground">{order.delivery}</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Financials</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                           <div className="flex justify-between">
                                <p className="text-muted-foreground">Services Subtotal</p>
                                <p>£{order.cost.toFixed(2)}</p>
                           </div>
                           <Separator/>
                            <div className="flex justify-between font-bold">
                                <p>Total Cost</p>
                                <p>£{order.cost.toFixed(2)}</p>
                           </div>
                           {isAdmin && (
                            <>
                                <div className="flex justify-between text-muted-foreground">
                                    <p>Company Contribution</p>
                                    <p>£{order.companyShare.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <p>Employee Contribution</p>
                                    <p>£{order.employeeShare.toFixed(2)}</p>
                                </div>
                            </>
                           )}
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}
