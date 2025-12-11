
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DialogClose } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ConfirmationStep() {
    return (
        <div className="flex items-center justify-center h-full p-4">
            <Card className="w-full max-w-md text-center shadow-none border-none">
                <CardContent className="p-4 sm:p-8">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-green-500" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-headline">Your laundry is booked!</h1>
                    <p className="text-muted-foreground mt-2">
                        Get ready for the easiest laundry day ever.
                    </p>

                    <Separator className="my-6" />

                    <div className="text-left space-y-4">
                        <h3 className="font-semibold">Order Summary</h3>
                        <div className="text-sm space-y-1">
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Pickup:</p>
                                <p className="font-medium">Today, 12:00 - 14:00</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Delivery:</p>
                                <p className="font-medium">Wednesday, May 15, 18:00 - 20:00</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Est. Total:</p>
                                <p className="font-medium">R245.50</p>
                            </div>
                        </div>
                    </div>
                    
                    <Separator className="my-6" />

                    <div className="space-y-3">
                         <DialogClose asChild>
                            <Button className="w-full" asChild>
                                <Link href="/app/orders">Track your order</Link>
                            </Button>
                         </DialogClose>
                         <DialogClose asChild>
                             <Button variant="outline" className="w-full">Back to Dashboard</Button>
                         </DialogClose>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
