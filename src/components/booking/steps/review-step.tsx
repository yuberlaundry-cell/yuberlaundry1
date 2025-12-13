
'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Info, Loader2, HandCoins, HardHat, Wallet, CreditCard } from "lucide-react";
import { useState } from "react";


export default function ReviewStep({ isProcessing }: { isProcessing: boolean }) {
    const [driverTip, setDriverTip] = useState('15%');
    const [laundromatTip, setLaundromatTip] = useState('0%');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('wallet');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Review & Place Order</h2>
                <p className="text-muted-foreground mt-1">Finalize your details before confirming your order.</p>
            </div>
           
            <div className="space-y-6">
                <div className="space-y-4">
                    <Label className="font-semibold text-lg">Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                        <Label htmlFor="pay-wallet" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="wallet" id="pay-wallet"/>
                                <Wallet className="h-5 w-5 text-primary"/>
                                <div>
                                    <p className="font-medium">Use Yuber Wallet</p>
                                    <p className="text-sm text-muted-foreground">R150.50 available</p>
                                </div>
                            </div>
                        </Label>
                         <Label htmlFor="pay-card" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="card" id="pay-card"/>
                                <CreditCard className="h-5 w-5 text-muted-foreground"/>
                                <div>
                                    <p className="font-medium">Pay with Card</p>
                                    <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
                                </div>
                            </div>
                             <Button variant="link" size="sm" className="p-0 h-auto">Change</Button>
                        </Label>
                    </RadioGroup>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
                    <h4 className="font-medium">How payment works</h4>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p>You'll pay nothing when placing this order. An authorization may be placed on your card.</p>
                        </div>
                         <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p>After pickup, our partner laundromat will weigh your items and provide a final itemized receipt.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p>Your selected payment method will be charged only after the service is complete.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="promo-code">Promo code</Label>
                    <div className="flex gap-2">
                        <Input id="promo-code" placeholder="Enter promo code" disabled={isProcessing} />
                        <Button variant="outline" disabled={isProcessing}>Apply</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="font-semibold flex items-center gap-2"><HardHat /> Add a tip for your driver?</Label>
                     <div className="flex gap-2">
                        {['10%', '15%', '20%', '25%', 'Custom'].map(val => (
                            <Button 
                                key={val}
                                variant={driverTip === val ? 'default' : 'outline'}
                                onClick={() => setDriverTip(val)}
                                className="flex-1"
                                disabled={isProcessing}
                            >
                                {val}
                            </Button>
                        ))}
                    </div>
                     <p className="text-xs text-muted-foreground">The selected tip will be added to your order total. 100% goes directly to your driver.</p>
                </div>
                
                 <div className="space-y-4">
                    <Label className="font-semibold flex items-center gap-2"><HandCoins /> Add a tip for the laundromat staff?</Label>
                     <div className="flex gap-2">
                        {['0%', '5%', '10%', '15%', 'Custom'].map(val => (
                            <Button 
                                key={val}
                                variant={laundromatTip === val ? 'default' : 'outline'}
                                onClick={() => setLaundromatTip(val)}
                                className="flex-1"
                                disabled={isProcessing}
                            >
                                {val}
                            </Button>
                        ))}
                    </div>
                     <p className="text-xs text-muted-foreground">Show your appreciation for the team that cleans your clothes.</p>
                </div>

                 <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))} disabled={isProcessing}/>
                    <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                        I have read and agree to the <a href="#" className="underline hover:text-primary">Terms</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
                    </Label>
                </div>
            </div>
        </div>
    )
}
