
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, CreditCard } from "lucide-react";

const receiptItems = [
    { name: "Mixed Laundry (12 lbs)", price: "$23.88" },
    { name: "Bedding (5.5 lbs)", price: "$14.85" },
    { name: "Add-on: Special Detergent", price: "$5.00" },
];

const subtotal = 43.73;
const serviceFee = 2.50;
const total = subtotal + serviceFee;

export function LiveReceiptCard() {
    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Live Receipt</h3>
                <div className="space-y-2 text-sm">
                    {receiptItems.map(item => (
                        <div key={item.name} className="flex justify-between">
                            <p className="text-muted-foreground">{item.name}</p>
                            <p>{item.price}</p>
                        </div>
                    ))}
                </div>
                <Separator className="my-4" />
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between">
                        <p className="text-muted-foreground">Service Fee</p>
                        <p>${serviceFee.toFixed(2)}</p>
                    </div>
                </div>
                 <Separator className="my-4" />
                <div className="flex justify-between items-center font-bold text-lg mb-4">
                    <p>Total to be charged</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download</Button>
                    <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Email</Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>Will be charged to Visa ending in 4242</span>
                </div>
            </CardContent>
        </Card>
    );
}
