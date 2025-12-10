
'use client';

import { Separator } from "../ui/separator";
import { MapPin, Calendar, Clock, Sparkle, Tag, Info, ShoppingBag } from 'lucide-react';
import { Button } from "../ui/button";

export function OrderSummary() {
    return (
        <div className="space-y-6 sticky top-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-headline">Order Summary</h2>
                <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                </Button>
            </div>
            
            <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">123 Main Street, Anytown</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="font-medium">Collection</p>
                        <p className="text-muted-foreground">Wed, 10 Dec, 16:00 - 17:00</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="font-medium">Delivery</p>
                        <p className="text-muted-foreground">Thu, 11 Dec, 17:00 - 18:00</p>
                    </div>
                </div>
            </div>
            
            <Separator />

            <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Wash & Fold</p>
                        <p>Est. $25.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Dry Cleaning</p>
                        <p>Est. $15.00</p>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-medium">$40.00</p>
                </div>
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Tip (15%)</p>
                    <p className="font-medium">$6.00</p>
                </div>
                 <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                    <p>Total</p>
                    <p>$46.00</p>
                </div>
            </div>

            <div className="p-3 bg-green-100/70 border border-green-200 rounded-lg text-sm flex items-start gap-3">
                <Sparkle className="h-4 w-4 text-green-700 mt-0.5" />
                <div>
                    <p className="font-semibold text-green-800">This is a sustainable choice</p>
                    <p className="text-green-700">Each delivery uses our electric fleet and saves 1kg of CO2.</p>
                </div>
            </div>
        </div>
    )
}
