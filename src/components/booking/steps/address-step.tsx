
'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Home, Briefcase, Plus, Edit, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const savedAddresses = [
    { id: 'home', type: 'Home', address: '123 Main St, London, SW1A 0AA' },
    { id: 'work', type: 'Work', address: '456 Business Rd, London, EC1A 1BB' },
];

export default function AddressStep() {
    const [selectedAddress, setSelectedAddress] = useState('home');

    return (
         <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Where should we pickup and deliver?</h2>
                <p className="text-muted-foreground mt-1">Select a saved address or add a new one.</p>
            </div>

            <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
                {savedAddresses.map(addr => (
                    <Label key={addr.id} htmlFor={addr.id} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <div className="flex items-center gap-4">
                            <RadioGroupItem value={addr.id} id={addr.id} />
                            <div className="flex items-center gap-3">
                                {addr.type === 'Home' ? <Home className="h-5 w-5 text-muted-foreground" /> : <Briefcase className="h-5 w-5 text-muted-foreground" />}
                                <div>
                                    <p className="font-medium">{addr.type}</p>
                                    <p className="text-sm text-muted-foreground">{addr.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Dialog>
                                <DialogTrigger asChild>
                                     <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4"/></Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Address</DialogTitle>
                                    </DialogHeader>
                                    <AddressForm defaultValues={{ type: addr.type.toLowerCase(), street: addr.address }} />
                                </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    </Label>
                ))}
            </RadioGroup>
            
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add New Address
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a New Address</DialogTitle>
                        <DialogDescription>Enter the details for your new address.</DialogDescription>
                    </DialogHeader>
                    <AddressForm />
                </DialogContent>
            </Dialog>

        </div>
    )
}

function AddressForm({ defaultValues }: { defaultValues?: any}) {
    return (
        <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" placeholder="123 Main St" defaultValue={defaultValues?.street || ''}/>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="London" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input id="postcode" placeholder="SW1A 0AA" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="notes">Delivery Notes (optional)</Label>
                <Textarea id="notes" placeholder="e.g., Leave with concierge. Gate code is #1234." />
            </div>
             <div className="space-y-2">
                <Label>Address Type</Label>
                <RadioGroup defaultValue={defaultValues?.type || 'home'} className="flex gap-4">
                     <Label htmlFor="home" className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem value="home" id="home"/> Home
                    </Label>
                     <Label htmlFor="work" className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem value="work" id="work"/> Work
                    </Label>
                </RadioGroup>
            </div>
            <Button type="submit" className="w-full">Save Address</Button>
        </form>
    );
}

