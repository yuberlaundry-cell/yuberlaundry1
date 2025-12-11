
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListFilter, MapPin, Package, Search, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const availableJobs = [
    { id: 'PU-124', type: 'Pickup', payout: 'R150.00', distance: '4.0 km', address: '888 Park Ave, London', time: 'ASAP' },
    { id: 'DO-457', type: 'Delivery', payout: 'R125.50', distance: '2.9 km', address: '999 Ocean Dr, London', time: '18:00-19:00' },
];

export default function AvailableJobsPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleAcceptJob = (jobId: string) => {
        toast({
            title: "Job Accepted!",
            description: `Job ${jobId} has been added to your queue.`,
        });
        // In a real app, this would update state and remove the job from the available list.
        router.push(`/driver/jobs/${jobId}`);
    }

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Available Jobs</h1>
                <p className="text-muted-foreground">Find and accept new jobs in your area.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by address..." className="pl-8" />
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="space-y-4">
                {availableJobs.map(job => (
                     <Card key={job.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                     {job.type === 'Pickup' ? <Package className="text-primary"/> : <Truck className="text-primary"/>}
                                     {job.type} Job
                                </CardTitle>
                                <Badge variant="secondary" className="font-mono text-base">{job.payout}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4"/>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{job.address}</a>
                             </div>
                              <p><span className="font-semibold">Distance:</span> {job.distance}</p>
                             <p><span className="font-semibold">Time:</span> {job.time}</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="sm" onClick={() => handleAcceptJob(job.id)}>
                                Accept Job
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                 {availableJobs.length === 0 && (
                    <Card className="py-12 text-center border-dashed">
                        <p className="text-muted-foreground">No available jobs in your area right now.</p>
                    </Card>
                )}
            </div>

        </div>
    )
}
