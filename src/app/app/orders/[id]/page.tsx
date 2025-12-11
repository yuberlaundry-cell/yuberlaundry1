
'use client';

import React from "react";
import { OrderDetailsContent } from "@/components/orders/order-details-content";
import { mockOrders } from "@/lib/mock-data";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LiveReceiptCard } from "@/components/orders/live-receipt-card";
import { CleaningFacilityCard } from "@/components/orders/cleaning-facility-card";
import { DeliveryScheduledCard } from "@/components/orders/delivery-scheduled-card";
import { WaterSavedCard } from "@/components/orders/water-saved-card";
import { InvoiceCard } from "@/components/orders/invoice-card";

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

    // A dummy state to simulate progress
    const [progress, setProgress] = React.useState(25);

    const handleSimulate = () => {
      setProgress(prev => {
        const next = prev + 25;
        if (next > 100) return 100;
        // Find the next pending step and update it
        const pendingStepIndex = order.timeline.findIndex(e => e.status === 'pending');
        if (pendingStepIndex > -1) {
            order.timeline[pendingStepIndex-1].status = 'completed';
            order.timeline[pendingStepIndex].status = 'in-progress';
        } else {
            // All steps are in progress or completed, mark the last one as completed
            order.timeline[order.timeline.length - 1].status = 'completed';
        }
        return next;
      });
    }

    const isDelivered = order.status === 'Delivered';


    return (
        <div className="space-y-6">
            <OrderDetailsContent order={order} progress={progress} />
             <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     {isDelivered && (
                        <div className="flex justify-center">
                            <Button variant="outline" asChild>
                                <a href="#">Reorder</a>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="space-y-6">
                    {isDelivered ? <InvoiceCard /> : <LiveReceiptCard />}
                    <CleaningFacilityCard />
                    <DeliveryScheduledCard />
                    <WaterSavedCard />
                </div>
            </div>
             <div className="flex justify-center">
                 <Button onClick={handleSimulate}>Simulate Progress</Button>
            </div>
        </div>
    );
}
