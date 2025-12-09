import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { type Order } from "@/lib/mock-data";

export function OrderSummaryCard({ order }: { order: Order }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1">Pickup</h4>
                    <p className="text-muted-foreground">{order.pickupAddress}</p>
                    <p className="text-muted-foreground">{order.pickupTime}</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Delivery</h4>
                    <p className="text-muted-foreground">{order.deliveryAddress}</p>
                    <p className="text-muted-foreground">{order.deliveryTime}</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-2">Payment Details</h4>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p>{order.payment.subtotal}</p>
                        </div>
                         {order.payment.discount && <div className="flex justify-between">
                            <p className="text-muted-foreground">Discount</p>
                            <p className="text-green-600">-{order.payment.discount}</p>
                        </div>}
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Service Fee</p>
                            <p>{order.payment.serviceFee}</p>
                        </div>
                        <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                            <p>Total Paid</p>
                            <p>{order.price}</p>
                        </div>
                    </div>
                </div>
                 <Separator />
                 <p className="text-xs text-muted-foreground">Paid with Visa ending in 4242</p>
            </CardContent>
        </Card>
    );
}
