
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
import { useForm } from "react-hook-form";

const initialAddresses = [
    { id: 'home', type: 'Home', label: 'Home', address: '123 Main St, London, SW1A 0AA', notes: 'Gate code: #1234'},
    { id: 'work', type: 'Work', label: 'Work', address: '456 Business Rd, London, EC1A 1BB', notes: 'Leave at reception'},
];

type Address = typeof initialAddresses[0];

export default function AddressPage() {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddress, setSelectedAddress] = useState('home');
    const [isAddOpen, setAddOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState<Address | null>(null);

    const { register, handleSubmit, reset } = useForm<Omit<Address, 'id'>>();

    const handleAddAddress = (data: Omit<Address, 'id'>) => {
        const newAddress = {
            id: `new-${Date.now()}`,
            type: 'Home', // default, can be changed
            ...data
        };
        setAddresses(prev => [...prev, newAddress]);
        reset();
        setAddOpen(false);
    }
    
    const handleDeleteAddress = (e: React.MouseEvent, id: string) => {
        e.preventDefault(); // prevent label click
        e.stopPropagation(); // prevent label click
        setAddresses(prev => prev.filter(addr => addr.id !== id));
        if (selectedAddress === id) {
            setSelectedAddress(addresses[0]?.id || '');
        }
    }


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
                                        {addr.type === 'Home' ? <Home className="h-5 w-5 text-muted-foreground" /> : <Building className="h-5 w-5 text-muted-foreground" />}
                                        <div>
                                            <p className="font-semibold">{addr.label}</p>
                                            <p className="text-muted-foreground">{addr.address}</p>
                                            {addr.notes && <p className="text-sm text-muted-foreground italic">Notes: {addr.notes}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                     <Dialog open={!!isEditOpen} onOpenChange={(open) => !open && setEditOpen(null)}>
                                        <DialogTrigger asChild>
                                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditOpen(addr); }}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent onClick={(e) => e.stopPropagation()}>
                                            <DialogHeader>
                                                <DialogTitle>Edit address</DialogTitle>
                                                <DialogDescription>
                                                   Update the details for your location.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-address-street">Street Address</Label>
                                                    <Input id="edit-address-street" defaultValue={isEditOpen?.address} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-address-label">Label</Label>
                                                    <Input id="edit-address-label" defaultValue={isEditOpen?.label} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-address-notes">Notes (optional)</Label>
                                                    <Input id="edit-address-notes" defaultValue={isEditOpen?.notes} />
                                                </div>
                                                <Button type="submit" className="w-full" onClick={() => setEditOpen(null)}>Save Changes</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={(e) => handleDeleteAddress(e, addr.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Label>
                    ))}
                </RadioGroup>

                <Dialog open={isAddOpen} onOpenChange={setAddOpen}>
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
                        <form className="space-y-4" onSubmit={handleSubmit(handleAddAddress)}>
                             <div className="space-y-2">
                                <Label htmlFor="label">Label</Label>
                                <Input id="label" placeholder="e.g., Mom's House" {...register("label")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="street">Street Address</Label>
                                <Input id="street" placeholder="e.g., 10 Downing Street" {...register("address")} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="notes">Notes (optional)</Label>
                                <Input id="notes" placeholder="e.g., Ring bell twice" {...register("notes")} />
                            </div>
                            <Button type="submit" className="w-full">Save Address</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </BookingLayout>
    )
}
