
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

export function CleaningFacilityCard() {
    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Cleaning Facility</h3>
                <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                        <p className="font-medium">SparkleClean Downtown</p>
                        <p className="text-sm text-muted-foreground">123 Clean St, Metropolis, 10001</p>
                        <div className="flex items-center gap-4 mt-2">
                             <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span>4.9</span>
                             </div>
                             <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Eco-Certified</Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
