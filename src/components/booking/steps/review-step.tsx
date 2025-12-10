
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const paymentMethods = [
    { id: "card-4242", type: "Visa", last4: "4242" },
    { id: "card-5555", type: "Mastercard", last4: "5555" },
];


export default function ReviewStep() {
    const { toast } = useToast();
    const [selectedMethod, setSelectedMethod] = useState("card-4242");

    const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Promo Code Applied",
            description: "Your discount has been added to the order.",
        });
    }

    const currentMethod = paymentMethods.find(p => p.id === selectedMethod);


    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Review & Pay</h2>
                <p className="text-muted-foreground mt-1">Almost there! Please review your order and complete the payment.</p>
            </div>
           <div className="grid md:grid-cols-2 gap-8 items-start">
               {/* Order Summary */}
               <div className="space-y-6">
                   <Card>
                       <CardContent className="p-6 space-y-4">
                           <h3 className="font-semibold">Pickup Details</h3>
                           <div className="text-sm text-muted-foreground">
                               <p>123 Main St, London, SW1A 0AA</p>
                               <p>Today, 12:00 - 14:00</p>
                           </div>
                           <Separator />
                           <h3 className="font-semibold">Delivery Details</h3>
                           <div className="text-sm text-muted-foreground">
                               <p>123 Main St, London, SW1A 0AA</p>
                               <p>Wednesday, May 15, 18:00 - 20:00</p>
                           </div>
                       </CardContent>
                   </Card>
                   <Card>
                       <CardContent className="p-6 space-y-4">
                           <h3 className="font-semibold">Selected Services</h3>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-muted-foreground">Wash & Fold</p>
                                    <p>Est. $25.00</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-muted-foreground">Dry Cleaning</p>
                                    <p>Est. $15.00</p>
                                </div>
                            </div>
                       </CardContent>
                   </Card>
               </div>

                {/* Payment */}
                <div className="space-y-6">
                     <Card>
                        <CardContent className="p-6 space-y-4">
                             <h3 className="font-semibold">Promo Code</h3>
                            <form className="flex space-x-2" onSubmit={handleApplyPromo}>
                                <Input placeholder="Enter code" />
                                <Button type="submit" variant="outline">Apply</Button>
                            </form>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardContent className="p-6 space-y-4">
                             <h3 className="font-semibold">Payment Method</h3>
                             <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                                        <p className="font-medium text-sm">{currentMethod?.type} ending in {currentMethod?.last4}</p>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                             <Button variant="link" size="sm">Change</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Change Payment Method</DialogTitle>
                                                <DialogDescription>
                                                   Select a different card from your wallet.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3 pt-4">
                                                {paymentMethods.map(method => (
                                                    <Label key={method.id} htmlFor={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                                        <RadioGroupItem value={method.id} id={method.id} />
                                                        <div className="ml-4 flex items-center gap-3">
                                                             <CreditCard className="h-5 w-5 text-muted-foreground" />
                                                            <span className="font-medium">{method.type} ending in {method.last4}</span>
                                                        </div>
                                                    </Label>
                                                ))}
                                            </RadioGroup>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <p className="text-xs text-muted-foreground pl-3">Your Yuber Wallet balance of $15.50 will be automatically applied.</p>
                             </div>
                        </CardContent>
                    </Card>
                     <Card className="bg-muted/50 border-dashed">
                        <CardContent className="p-6 space-y-2 text-sm">
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p>Est. $40.00</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Yuber Wallet</p>
                                <p>-$15.50</p>
                            </div>
                             <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                                <p>Total to be charged</p>
                                <p>Est. $24.50</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
           </div>
        </div>
    )
}
