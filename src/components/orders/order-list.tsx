import Link from "next/link";
import { Button } from "../ui/button";
import { OrderCard } from "./order-card";
import { type Order } from "@/lib/mock-data";
import { ShoppingBag } from "lucide-react";

export function OrderList({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed rounded-lg mt-4">
                <div className="flex justify-center mb-4">
                    <div className="bg-secondary rounded-full p-4">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold">No orders here yet</h3>
                <p className="text-muted-foreground mb-4">When you place an order, it will appear here.</p>
                <Button asChild>
                    <Link href="/app/book/address">Schedule your first pickup</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}
