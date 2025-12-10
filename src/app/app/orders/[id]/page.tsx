'use client';

import { OrderDetailsContent } from "@/components/orders/order-details-content";
import { mockOrders } from "@/lib/mock-data";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = `#${params.id as string}`;
    const order = mockOrders.find(o => o.id === orderId);

    if (!order) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Order not found.</p>
            </div>
        );
    }

    return <OrderDetailsContent order={order} />;
}
