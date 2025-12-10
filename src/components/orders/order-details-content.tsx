
'use client';

import { type Order } from "@/lib/mock-data";
import { Badge } from "../ui/badge";
import { OverallProgressCard } from "./overall-progress-card";
import { OrderStatusTimeline } from "./order-status-timeline";
import { LiveReceiptCard } from "./live-receipt-card";
import { CleaningFacilityCard } from "./cleaning-facility-card";
import { DeliveryScheduledCard } from "./delivery-scheduled-card";
import { WaterSavedCard } from "./water-saved-card";

export function OrderDetailsContent({ order, progress }: { order: Order, progress: number }) {

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                 <h1 className="text-2xl font-bold font-headline">{order.id}</h1>
                 <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-800 border-blue-200">Cleaning in Progress</Badge>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <OverallProgressCard progress={progress} />
                    <OrderStatusTimeline timeline={order.timeline} />
                </div>
                <div className="space-y-6">
                    <LiveReceiptCard />
                    <CleaningFacilityCard />
                    <DeliveryScheduledCard />
                    <WaterSavedCard />
                </div>
            </div>
        </div>
    );
}
