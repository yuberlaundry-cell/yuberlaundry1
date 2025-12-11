
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Truck } from "lucide-react";

const todayJobs = [
    { id: 'PU-123', type: 'Pickup', customer: 'Jane Doe', address: '123 Main St, London', time: '12:00 - 14:00', status: 'Assigned' },
    { id: 'DO-456', type: 'Delivery', customer: 'John Smith', address: '456 Business Rd, London', time: '16:00 - 18:00', status: 'Upcoming' },
];

export default function TodayPage() {
    if (todayJobs.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 bg-muted rounded-full mb-4">
                    <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold font-headline">No jobs for today</h2>
                <p className="text-muted-foreground">Go online to receive new jobs.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Today's Tasks</h1>
                <p className="text-muted-foreground">Your scheduled pickups and deliveries for today.</p>
            </div>
            <div className="space-y-4">
                {todayJobs.map(job => (
                     <Card key={job.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                     {job.type === 'Pickup' ? <Package className="text-primary"/> : <Truck className="text-primary"/>}
                                     {job.type} Job
                                </CardTitle>
                                <Badge>{job.status}</Badge>
                            </div>
                            <CardDescription>{job.id}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <p><span className="font-semibold">Customer:</span> {job.customer}</p>
                             <p><span className="font-semibold">Address:</span> {job.address}</p>
                             <p><span className="font-semibold">Time:</span> {job.time}</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild>
                                <Link href={`/driver/jobs/${job.id}`}>View Job</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
