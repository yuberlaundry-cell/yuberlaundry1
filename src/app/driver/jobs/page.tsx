
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ListFilter, Package, Search, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const allJobs = [
    { id: 'PU-123', type: 'Pickup', customer: 'Jane Doe', address: '123 Main St, London', time: 'Today, 12:00-14:00', status: 'Assigned' },
    { id: 'DO-456', type: 'Delivery', customer: 'John Smith', address: '456 Business Rd, London', time: 'Today, 16:00-18:00', status: 'Upcoming' },
    { id: 'PU-122', type: 'Pickup', customer: 'Amy Adams', address: '789 Oak Ave, London', time: 'Yesterday', status: 'Completed' },
    { id: 'DO-455', type: 'Delivery', customer: 'Peter Pan', address: '101 Neverland, London', time: 'Yesterday', status: 'Completed' },
];


export default function JobsPage() {
    const router = useRouter();
    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">All Jobs</h1>
                <p className="text-muted-foreground">Your complete job history.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by address, customer, ID..." className="pl-8" />
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Pickup</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Delivery</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Cancelled</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="space-y-4">
                {allJobs.map(job => (
                     <Card key={job.id} className="cursor-pointer hover:border-primary" onClick={() => router.push(`/driver/jobs/${job.id}`)}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                     {job.type === 'Pickup' ? <Package className="text-primary"/> : <Truck className="text-primary"/>}
                                     {job.type} Job
                                </CardTitle>
                                <Badge>{job.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                             <p><span className="font-semibold">Customer:</span> {job.customer}</p>
                             <p><span className="font-semibold">Address:</span> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{job.address}</a></p>
                             <p><span className="font-semibold">Time:</span> {job.time}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
    )
}
