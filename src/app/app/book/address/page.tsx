'use client';

import { BookingLayout } from "@/components/booking/booking-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Home, Building, PlusCircle, Trash2, Edit } from "lucide-react";
import { useState } from "react";

const addresses = [
    { id: 'home', label: 'Home', address: '123 Main St, London, SW1A 0AA', notes: 'Gate code: #1234'},
    { id: 'work', label: 'Work', address: '456 Business Rd, London, EC1A 1BB', notes: 'Leave at reception'},
];

export default function AddressPage() {
    const [selectedAddress, setSelectedAddress] = useState('home');

    return (
        <BookingLayout
            stepTitle="Select Pickup Address"
            stepDescription="Where should we pick up your laundry from?"
            nextHref="/app/book/schedule"
            backHref="/app"
        >
            <div className="space-y-4">
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    {addresses.map(addr => (
                        <Label key={addr.id} htmlFor={addr.id} className={cn("block p-4 border rounded-lg cursor-pointer hover:bg-muted/50", { "border-primary bg-primary/5": selectedAddress === addr.id })}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value={addr.id} id={addr.id} />
                                    <div className="flex items-center gap-3">
                                        {addr.label === 'Home' ? <Home className="h-5 w-5 text-muted-foreground" /> : <Building className="h-5 w-5 text-muted-foreground" />}
                                        <div>
                                            <p className="font-semibold">{addr.label}</p>
                                            <p className="text-muted-foreground">{addr.address}</p>
                                            {addr.notes && <p className="text-sm text-muted-foreground italic">Notes: {addr.notes}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Label>
                    ))}
                </RadioGroup>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Address
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a new address</DialogTitle>
                            <DialogDescription>
                                Enter the details for your new pickup and delivery location.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="street">Street Address</Label>
                                <Input id="street" placeholder="e.g., 10 Downing Street" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apartment">Apartment / Unit (optional)</Label>
                                <Input id="apartment" placeholder="e.g., Apt 5B" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="label">Label</Label>
                                <Input id="label" placeholder="e.g., Mom's House" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="notes">Notes (optional)</Label>
                                <Input id="notes" placeholder="e.g., Ring bell twice" />
                            </div>
                            <Button type="submit" className="w-full">Save Address</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </BookingLayout>
    )
}
