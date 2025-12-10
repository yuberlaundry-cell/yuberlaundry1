'use client';

import { BookingLayout } from "@/components/booking/booking-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Banknote, CreditCard, Landmark } from "lucide-react";
import Link from "next/link";


export default function ReviewPage() {

    return (
        <BookingLayout
            stepTitle="Review & Pay"
            stepDescription="Almost there! Please review your order and complete the payment."
            nextHref="/app/book/confirmation"
            backHref="/app/book/instructions"
            nextButtonText="Place Order"
        >
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
                            <div className="flex space-x-2">
                                <Input placeholder="Enter code" />
                                <Button variant="outline">Apply</Button>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardContent className="p-6 space-y-4">
                             <h3 className="font-semibold">Payment Method</h3>
                             <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                                        <p className="font-medium text-sm">Visa ending in 4242</p>
                                    </div>
                                    <Button variant="link" size="sm">Change</Button>
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
        </BookingLayout>
    )
}
