
'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Home, Briefcase, Plus, Edit, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { AddressInput } from '@/components/ui/address-input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const savedAddresses = [
    { id: 'home', type: 'Home', address: '123 Main St, London, SW1A 0AA' },
    { id: 'work', type: 'Work', address: '456 Business Rd, London, EC1A 1BB' },
];

export default function AddressStep() {
    const [selectedPickupAddress, setSelectedPickupAddress] = useState('home');
    const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState('home');
    const [isSameAddress, setIsSameAddress] = useState(true);
    const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
    const { toast } = useToast();

    const handleSaveAddress = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the address to your backend
        toast({
            title: "Address Saved",
            description: "Your new address has been added.",
        });
        setIsAddAddressOpen(false);
    };

    return (
         <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Where should we pickup and deliver?</h2>
                <p className="text-muted-foreground mt-1">Select a saved address or add a new one.</p>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Pickup Address</h3>
                <RadioGroup value={selectedPickupAddress} onValueChange={setSelectedPickupAddress} className="space-y-3">
                    {savedAddresses.map(addr => (
                        <Label key={addr.id} htmlFor={`pickup-${addr.id}`} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value={addr.id} id={`pickup-${addr.id}`} />
                                <div className="flex items-center gap-3">
                                    {addr.type === 'Home' ? <Home className="h-5 w-5 text-muted-foreground" /> : <Briefcase className="h-5 w-5 text-muted-foreground" />}
                                    <div>
                                        <p className="font-medium">{addr.type}</p>
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr.address)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline" onClick={(e) => e.stopPropagation()}>
                                            {addr.address}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Dialog>
                                    <DialogTrigger asChild>
                                         <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}><Edit className="h-4 w-4"/></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Address</DialogTitle>
                                        </DialogHeader>
                                        <AddressForm defaultValues={{ type: addr.type.toLowerCase(), street: addr.address }} onSave={handleSaveAddress} />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                            </div>
                        </Label>
                    ))}
                </RadioGroup>
            </div>

            <Separator />
            
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="same-address" checked={isSameAddress} onCheckedChange={(checked) => setIsSameAddress(Boolean(checked))} />
                    <Label htmlFor="same-address" className="text-base">
                        My delivery address is the same as my pickup address.
                    </Label>
                </div>

                {!isSameAddress && (
                    <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-lg">Delivery Address</h3>
                        <RadioGroup value={selectedDeliveryAddress} onValueChange={setSelectedDeliveryAddress} className="space-y-3">
                            {savedAddresses.map(addr => (
                                <Label key={addr.id} htmlFor={`delivery-${addr.id}`} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                    <div className="flex items-center gap-4">
                                        <RadioGroupItem value={addr.id} id={`delivery-${addr.id}`} />
                                        <div className="flex items-center gap-3">
                                            {addr.type === 'Home' ? <Home className="h-5 w-5 text-muted-foreground" /> : <Briefcase className="h-5 w-5 text-muted-foreground" />}
                                            <div>
                                                <p className="font-medium">{addr.type}</p>
                                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr.address)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline" onClick={(e) => e.stopPropagation()}>
                                                    {addr.address}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}><Edit className="h-4 w-4"/></Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Address</DialogTitle>
                                                </DialogHeader>
                                                <AddressForm defaultValues={{ type: addr.type.toLowerCase(), street: addr.address }} onSave={handleSaveAddress} />
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                                    </div>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
                )}
            </div>
        </div>
    )
}

function AddressForm({ defaultValues, onSave }: { defaultValues?: any; onSave: (e: React.FormEvent) => void }) {
    const [selectedAddress, setSelectedAddress] = useState<string>(defaultValues?.street || '');
    
    return (
        <form className="space-y-4" onSubmit={onSave}>
            <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <AddressInput
                    id="street"
                    placeholder="Start typing your address..."
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    onAddressSelect={(address) => {
                        setSelectedAddress(address.description);
                        console.log('Selected address coordinates:', address.coordinates);
                    }}
                />
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
            <DialogClose asChild>
                <Button type="submit" className="w-full">Save Address</Button>
            </DialogClose>
        </form>
    );
}
