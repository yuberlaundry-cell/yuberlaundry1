
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function DeliveryScheduledCard() {
    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Delivery Scheduled</h3>
                 <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                        <p className="font-medium">Tomorrow, 4:00 PM - 6:00 PM</p>
                        <p className="text-sm text-muted-foreground">456 Home Ave, Apt 7B, Metropolis</p>
                        <Button variant="link" className="p-0 h-auto text-primary text-sm">Change Delivery</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
