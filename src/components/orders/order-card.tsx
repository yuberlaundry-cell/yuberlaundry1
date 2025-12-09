import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { type Order } from "@/lib/mock-data";
import { Shirt, ShoppingBag, VenetianMask } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
};

const serviceIcons = {
    'Wash & Fold': <ShoppingBag className="h-5 w-5" />,
    'Dry Cleaning': <VenetianMask className="h-5 w-5" />,
    'Ironing': <Shirt className="h-5 w-5" />,
};

export function OrderCard({ order }: { order: Order }) {
    const ctaText = order.statusCategory === 'completed' || order.statusCategory === 'cancelled' ? 'View Details' : 'Track Order';

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">{order.serviceSummary}</CardTitle>
                        <CardDescription>{order.id}</CardDescription>
                    </div>
                    <Badge variant="secondary" className={cn("whitespace-nowrap", statusColors[order.statusCategory])}>
                        {order.status}
                    </Badge>
                </div>
                 <div className="flex items-center gap-2 pt-2">
                    {order.services.map(service => (
                        <div key={service} className="p-1.5 bg-muted rounded-full text-muted-foreground">
                            {/* @ts-ignore */}
                            {serviceIcons[service]}
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><span className="font-medium text-foreground">Pickup:</span> {order.pickupTime}</p>
                <p><span className="font-medium text-foreground">Delivery:</span> {order.deliveryTime}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <p className="font-bold text-lg">{order.price}</p>
                <Button asChild variant="outline">
                    <Link href={`/app/orders/${order.id}`}>{ctaText}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
