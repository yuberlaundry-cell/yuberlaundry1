
'use client';

import { Separator } from "../ui/separator";
import { MapPin, Calendar, Clock, Sparkle, Tag, Info, ShoppingBag, CheckCircle } from 'lucide-react';
import { Button } from "../ui/button";
import { type Plan } from "@/lib/plans";

interface OrderSummaryProps {
    subscription: Plan | null;
}

export function OrderSummary({ subscription }: OrderSummaryProps) {
    const subtotal = 40.00;
    const baseServiceFee = 6.00;
    
    // Apply subscription benefits
    const serviceFee = subscription?.limits.platformFeeWaiver ? 0.00 : baseServiceFee;
    const discount = subscription?.limits.discountPercentage ? subtotal * (subscription.limits.discountPercentage / 100) : 0;
    
    const total = subtotal + serviceFee - discount;

    return (
        <div className="space-y-6">
            <ol className="space-y-4">
                <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                            <CheckCircle className="h-5 w-5"/>
                        </div>
                        <div className="h-full w-px bg-border my-1"/>
                    </div>
                    <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-sm text-muted-foreground">Selected Address</p>
                    </div>
                </li>
                 <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                             <CheckCircle className="h-5 w-5"/>
                        </div>
                        <div className="h-full w-px bg-border my-1"/>
                    </div>
                    <div>
                        <p className="font-semibold">Collection time</p>
                        <p className="text-sm text-muted-foreground">Selected Time Slot</p>
                         <p className="text-sm text-muted-foreground">Collect from me in person</p>
                    </div>
                </li>
                 <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-primary text-primary">
                            3
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-primary">Delivery time</p>
                        <p className="text-sm text-muted-foreground">Selected Time Slot</p>
                        <p className="text-sm text-muted-foreground">Deliver to me in person</p>
                    </div>
                </li>
            </ol>
            
            <Separator />

            <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Wash & Fold</p>
                        <p>Est. R25.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Dry Cleaning</p>
                        <p>Est. R15.00</p>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-medium">R{subtotal.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <p>Service Fee</p>
                        {serviceFee === 0 && <span className="text-xs font-semibold text-green-600">(Waived)</span>}
                    </div>
                    <p className={cn("font-medium", serviceFee === 0 && "line-through text-muted-foreground")}>R{baseServiceFee.toFixed(2)}</p>
                </div>
                {discount > 0 && (
                     <div className="flex justify-between text-green-600">
                        <p>Yuber Repeat Discount</p>
                        <p className="font-medium">-R{discount.toFixed(2)}</p>
                    </div>
                )}
                 <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                    <p>Total</p>
                    <p>R{total.toFixed(2)}</p>
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
