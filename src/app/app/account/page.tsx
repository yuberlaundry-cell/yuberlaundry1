
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { CreditCard, Edit, MoreVertical, PlusCircle, Trash2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const paymentMethods = [
    { id: 'pm_1', brand: 'Visa', last4: '4242', expiry: '12/26', isPrimary: true },
    { id: 'pm_2', brand: 'Mastercard', last4: '5555', expiry: '08/25', isPrimary: false },
]

export default function AccountPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Saved",
            description: "Your information has been updated successfully.",
        });
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings, addresses, and payment methods.</p>
            </div>

            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
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
                                    <Input id="phone" type="tel" />
                                </div>
                                <Button type="submit">Save Changes</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="addresses">
                    <Card>
                         <CardHeader>
                            <CardTitle>Addresses</CardTitle>
                            <CardDescription>Manage your saved pickup and delivery addresses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Addresses management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment">
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
                                            Your card details are securely stored and processed by Paystack.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* 
                                      In a real application, this form would be replaced by the Paystack Inline SDK.
                                      You would use the NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY from environment variables
                                      to initialize Paystack and show the payment popup.
                                      e.g., using a library like 'react-paystack':
                                      <PaystackButton publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY} ... />
                                    */}
                                    <form className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" placeholder="you@company.com" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="card-number">Card Number</Label>
                                            <Input id="card-number" placeholder="•••• •••• •••• ••••" required />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry-month">Expiry Month</Label>
                                                <Input id="expiry-month" placeholder="MM" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry-year">Expiry Year</Label>
                                                <Input id="expiry-year" placeholder="YY" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input id="cvc" placeholder="•••" required />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full">Save Card</Button>
                                    </form>
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
                <TabsContent value="security">
                     <Card>
                         <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your password and account security.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p>Security settings coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="notifications">
                     <Card>
                         <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Manage your notification preferences.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p>Notifications settings coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
