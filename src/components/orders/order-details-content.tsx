
'use client';

import { type Order } from "@/lib/mock-data";
import { Badge } from "../ui/badge";
import { OverallProgressCard } from "./overall-progress-card";
import { OrderStatusTimeline } from "./order-status-timeline";
import { LiveReceiptCard } from "./live-receipt-card";
import { CleaningFacilityCard } from "./cleaning-facility-card";
import { DeliveryScheduledCard } from "./delivery-scheduled-card";
import { WaterSavedCard } from "./water-saved-card";
import { InvoiceCard } from "./invoice-card";

const statusColors: { [key: string]: string } = {
  upcoming: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export function OrderDetailsContent({ order, progress }: { order: Order, progress: number }) {
    const isDelivered = order.status === 'Delivered';
    const isUpcoming = order.statusCategory === 'upcoming';
    const isInProgress = order.statusCategory === 'in-progress';
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                 <h1 className="text-2xl font-bold font-headline">{order.id}</h1>
                 <Badge variant="outline" className={`mt-1 ${statusColors[order.statusCategory]}`}>{order.status}</Badge>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     {isInProgress && <OverallProgressCard progress={isDelivered ? 100 : progress} />}
                    <OrderStatusTimeline timeline={order.timeline} />
                </div>
                <div className="space-y-6">
                   {/* This is now handled in the page itself to toggle between live receipt and invoice */}
                </div>
            </div>
        </div>
    );
}
