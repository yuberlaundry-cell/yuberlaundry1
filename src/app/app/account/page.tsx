
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { CreditCard, Edit, MoreVertical, PlusCircle, Trash2, User, Home, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { AddressInput } from "@/components/ui/address-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { usePaystackPayment } from 'react-paystack';

const paymentMethods = [
    { id: 'pm_1', brand: 'Visa', last4: '4242', expiry: '12/26', isPrimary: true },
    { id: 'pm_2', brand: 'Mastercard', last4: '5555', expiry: '08/25', isPrimary: false },
];

const initialAddresses = [
    { id: 'home', type: 'Home', address: '123 Main St, London, SW1A 0AA', isPrimary: true },
    { id: 'work', type: 'Work', address: '456 Business Rd, London, EC1A 1BB', isPrimary: false },
];

const notificationSettings = [
    { id: 'email-status', label: 'Order Status Updates', description: 'Receive email updates when your order progresses.', defaultValue: true },
    { id: 'email-promo', label: 'Promotions & Offers', description: 'Get notified about special deals and new services.', defaultValue: true },
    { id: 'sms-delivery', label: 'Delivery Alerts', description: 'Get an SMS when your driver is on the way.', defaultValue: true },
    { id: 'push-general', label: 'General App Notifications', description: 'Receive general updates through the mobile app.', defaultValue: true },
];


function AddCardForm() {
    const { user } = useAuth();
    const { toast } = useToast();

    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email || '',
        amount: 0, // Amount is 0 for card authorization
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = (reference: any) => {
        // In a real app, you'd send this reference to your backend to verify
        // and save the card authorization details with the user's profile.
        console.log('Paystack Authorization Success:', reference);
        toast({
            title: "Card Added Successfully",
            description: "Your new payment method has been saved.",
        });
    };

    const onClose = () => {
        console.log('Paystack modal closed.');
    };
    
    return (
        <Button 
            onClick={() => {
                initializePayment({onSuccess, onClose});
            }}
            className="w-full"
        >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Card Securely
        </Button>
    )
}


export default function AccountPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;
    const [addresses, setAddresses] = useState(initialAddresses);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Saved",
            description: "Your information has been updated successfully.",
        });
    }

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
    }
    
    const handleSaveAddress = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Address Saved",
            description: "Your address has been saved.",
        });
    };

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings, addresses, and payment methods.</p>
            </div>

            <Tabs defaultValue="profile">
                <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="payment">Payment</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <TabsContent value="profile" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>This is how others will see you on the site.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={user?.avatarUrl} />
                                    <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
                                </Avatar>
                                <div className="flex gap-2">
                                    <Button>Change photo</Button>
                                    <Button variant="ghost" className="text-muted-foreground">Remove</Button>
                                </div>
                            </div>

                             <form className="space-y-6" onSubmit={handleSaveProfile}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="full-name">Full Name</Label>
                                        <Input id="full-name" defaultValue={`${user?.firstName} ${user?.lastName}`} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue={user?.email} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <PhoneNumberInput />
                                </div>
                                <Button type="submit">Save Changes</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="addresses" className="mt-4">
                    <Card>
                         <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <CardTitle>Addresses</CardTitle>
                                <CardDescription>Manage your saved pickup and delivery addresses.</CardDescription>
                            </div>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Address</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Address</DialogTitle>
                                    </DialogHeader>
                                    <AddressForm onSave={handleSaveAddress} />
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {addresses.map(addr => (
                                <div key={addr.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        {addr.type === 'Home' ? <Home className="h-6 w-6 text-muted-foreground" /> : <Briefcase className="h-6 w-6 text-muted-foreground" />}
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold">{addr.type}</p>
                                                {addr.isPrimary && <Badge>Primary</Badge>}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{addr.address}</p>
                                        </div>
                                    </div>
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {!addr.isPrimary && <DropdownMenuItem>Set as Primary</DropdownMenuItem>}
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                           ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment" className="mt-4">
                     <Card>
                         <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <CardTitle>Payment Methods</CardTitle>
                                <CardDescription>Manage your saved payment methods via Paystack.</CardDescription>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add New Card
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add a New Payment Method</DialogTitle>
                                        <DialogDescription>
                                            Your card details are securely stored with Paystack.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="pt-4">
                                       <AddCardForm />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {paymentMethods.map(method => (
                                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold">{method.brand} ending in {method.last4}</p>
                                                {method.isPrimary && <Badge>Primary</Badge>}
                                            </div>
                                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {!method.isPrimary && <DropdownMenuItem>Set as Primary</DropdownMenuItem>}
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security" className="mt-4">
                     <Card>
                         <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your password and account security.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6 max-w-lg" onSubmit={handleSavePassword}>
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" required />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" required />
                                    </div>
                                </div>
                                <Button type="submit">Update Password</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="notifications" className="mt-4">
                     <Card>
                         <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Manage your notification preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 max-w-2xl">
                           {notificationSettings.map(setting => (
                               <div key={setting.id} className="flex items-start justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label htmlFor={setting.id} className="text-base font-medium">{setting.label}</Label>
                                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                                    </div>
                                    <Switch id={setting.id} defaultChecked={setting.defaultValue} />
                               </div>
                           ))}
                            <div className="pt-2">
                                <Button>Save Notification Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
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
                <Input id="notes" placeholder="e.g., Leave with concierge." />
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
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="submit" className="w-full">Save Address</Button>
                </DialogClose>
            </DialogFooter>
        </form>
    );
}
