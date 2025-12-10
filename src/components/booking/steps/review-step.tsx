
'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Info } from "lucide-react";
import { useState } from "react";


export default function ReviewStep() {
    const [tip, setTip] = useState('15%');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Book Your Service</h2>
                <p className="text-muted-foreground mt-1">Secure payment to complete your service.</p>
            </div>
           
            <div className="space-y-6">
                <h3 className="font-semibold text-lg">Payment</h3>
                
                <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
                    <h4 className="font-medium">How much do I pay?</h4>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p>You'll pay nothing when placing this order. No payment required upfront, just review your booking!</p>
                        </div>
                         <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p>Your local cleaning partner will check your bags and issue an itemised clothes receipt. You can always check and edit this if needed.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p>You'll pay the order total after we clean your items. Service fee R19.00, minimum order R100.00.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p>The selected tip will be added to your gross order value. 100% goes directly to your driver.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="promo-code">Promo code</Label>
                    <div className="flex gap-2">
                        <Input id="promo-code" placeholder="Enter promo code" />
                        <Button variant="outline">Apply</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gift-card">Have a gift card?</Label>
                    <div className="flex gap-2">
                        <Input id="gift-card" placeholder="Enter gift card code" />
                        <Button variant="outline">Apply</Button>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>Tip your driver?</Label>
                     <div className="flex gap-2">
                        {['10%', '15%', '20%', '25%', 'Custom'].map(val => (
                            <Button 
                                key={val}
                                variant={tip === val ? 'default' : 'outline'}
                                onClick={() => setTip(val)}
                                className="flex-1"
                            >
                                {val}
                            </Button>
                        ))}
                    </div>
                </div>

                 <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                        I have read and agree to the <a href="#" className="underline hover:text-primary">Terms</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
                    </Label>
                </div>
            </div>
        </div>
    )
}
