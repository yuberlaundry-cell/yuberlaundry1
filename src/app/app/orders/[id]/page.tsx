
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
import { RateExperienceCard } from "@/components/orders/rate-experience-card";

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = `#${params.id as string}`;
    
    // Find the original order from the mock data
    const originalOrder = mockOrders.find(o => o.id === orderId);

    // Deep clone the order data into state to make it mutable
    const [order, setOrder] = React.useState(() => {
        if (!originalOrder) return null;
        return JSON.parse(JSON.stringify(originalOrder));
    });

    // A dummy state to simulate progress
    const [progress, setProgress] = React.useState(25);

    const handleSimulate = () => {
        setOrder(prevOrder => {
            if (!prevOrder) return null;

            // Create a new mutable copy for this update
            const newOrderState = JSON.parse(JSON.stringify(prevOrder));
            const newTimeline = newOrderState.timeline;
            
            const pendingStepIndex = newTimeline.findIndex((e: any) => e.status === 'pending');

            if (pendingStepIndex > -1) {
                if (pendingStepIndex > 0) {
                    newTimeline[pendingStepIndex - 1].status = 'completed';
                }
                newTimeline[pendingStepIndex].status = 'in-progress';
            } else {
                const lastStepIndex = newTimeline.length - 1;
                if (lastStepIndex >= 0 && newTimeline[lastStepIndex].status !== 'completed') {
                    newTimeline[lastStepIndex].status = 'completed';
                }
            }
            
            // Also update the overall progress bar
            setProgress(prev => Math.min(prev + 25, 100));

            return newOrderState;
        });
    }
    
    if (!order) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Order not found.</p>
            </div>
        );
    }

    const isDelivered = order.timeline.every((e: any) => e.status === 'completed');

    return (
        <div className="space-y-6">
            <OrderDetailsContent order={order} progress={progress} />
             <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     {isDelivered && (
                        <RateExperienceCard />
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
