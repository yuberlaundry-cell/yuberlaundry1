import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Car, Map } from "lucide-react";
import { type Driver } from "@/lib/mock-data";
import { Skeleton } from "../ui/skeleton";

interface DriverTrackingCardProps {
    driver: Driver | null;
    status: string;
}

export function DriverTrackingCard({ driver, status }: DriverTrackingCardProps) {
    const isTrackingActive = status.toLowerCase().includes('driver') || status.toLowerCase().includes('delivery');

    if (!isTrackingActive) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Driver Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center text-muted-foreground">
                    <p>Driver will be assigned shortly before your pickup time.</p>
                     <Skeleton className="h-40 w-full rounded-lg" />
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Driver Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={driver?.avatarUrl} alt={driver?.name} data-ai-hint="profile person" />
                            <AvatarFallback>{driver?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{driver?.name}</p>
                            <p className="text-sm text-muted-foreground">Estimated arrival: {driver?.eta}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Car className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{driver?.vehicle}</p>
                    </div>
                </div>

                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground z-10">Live map placeholder</p>
                    <Map className="absolute h-24 w-24 text-gray-300"/>
                </div>

                <Button className="w-full">Live Tracking</Button>
            </CardContent>
        </Card>
    );
}
