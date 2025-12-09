'use client';

import { type Order } from "@/lib/mock-data";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { OrderStatusTimeline } from "./order-status-timeline";
import { DriverTrackingCard } from "./driver-tracking-card";
import { OrderSummaryCard } from "./order-summary-card";
import { SupportCard } from "./support-card";
import { ReviewPrompt } from "./review-prompt";
import { OrderPhotosCard } from "./order-photos-card";

const statusColors = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
};

export function OrderDetailsContent({ order }: { order: Order }) {

    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div>
                <Button variant="ghost" asChild className="mb-4 -ml-4">
                    <Link href="/app/orders">&larr; Back to all orders</Link>
                </Button>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">{order.id}</h1>
                        <p className="text-muted-foreground">{order.serviceSummary}</p>
                    </div>
                     <Badge variant="secondary" className={`text-base ${statusColors[order.statusCategory]}`}>
                        {order.status}
                    </Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {order.statusCategory === 'completed' && <ReviewPrompt />}
                    <OrderStatusTimeline timeline={order.timeline} />
                    <OrderPhotosCard />
                    {order.driver && (
                        <DriverTrackingCard driver={order.driver} status={order.status} />
                    )}
                </div>
                <div className="space-y-8 lg:sticky lg:top-24">
                    <OrderSummaryCard order={order} />
                    <SupportCard />
                </div>
            </div>
        </div>
    );
}
