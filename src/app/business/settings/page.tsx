
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { AddressInput } from "@/components/ui/address-input";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function AdminSettings() {
    const { user } = useAuth();
    const [address, setAddress] = useState('456 Corporate Ave, London');
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Company Settings</CardTitle>
                <CardDescription>Manage your company's profile and default laundry preferences.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">Company Profile</TabsTrigger>
                        <TabsTrigger value="preferences">Laundry Preferences</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" className="pt-6">
                        <form className="space-y-6 max-w-lg">
                            <div className="space-y-2">
                                <Label htmlFor="company-name">Company Name</Label>
                                <Input id="company-name" defaultValue={user?.companyName} />
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-email">Company Email</Label>
                                    <Input id="company-email" type="email" placeholder="contact@acme.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-phone">Company Phone</Label>
                                    <Input id="company-phone" type="tel" placeholder="+44 20 7123 4567" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-address">Company Address</Label>
                                <AddressInput
                                    id="company-address"
                                    placeholder="e.g., 456 Corporate Ave, London"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    onAddressSelect={(addr) => {
                                        setAddress(addr.description);
                                    }}
                                />
                            </div>
                            <div className="pt-4">
                                <Button>Save Profile</Button>
                            </div>
                        </form>
                    </TabsContent>
                    <TabsContent value="preferences" className="pt-6">
                        <form className="space-y-6 max-w-lg">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="detergent">Default Detergent</Label>
                                    <Select defaultValue="standard">
                                        <SelectTrigger id="detergent" className="w-[200px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard</SelectItem>
                                            <SelectItem value="hypoallergenic">Hypoallergenic</SelectItem>
                                            <SelectItem value="eco-friendly">Eco-friendly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="water-temp">Default Water Temperature</Label>
                                    <Select defaultValue="warm">
                                        <SelectTrigger id="water-temp" className="w-[200px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cold">Cold</SelectItem>
                                            <SelectItem value="warm">Warm</SelectItem>
                                            <SelectItem value="hot">Hot</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Switch id="employee-notes" />
                                    <Label htmlFor="employee-notes">
                                    Allow employees to add notes to their own orders.
                                    </Label>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button>Save Preferences</Button>
                            </div>
                        </form>
                    </TabsContent>
                     <TabsContent value="notifications" className="pt-6">
                        <form className="space-y-6 max-w-lg">
                            <div>
                                <h4 className="font-medium mb-4">Notification Triggers</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="notify-invoice" className="font-normal">New monthly invoice is ready</Label>
                                        <Switch id="notify-invoice" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="notify-allowance" className="font-normal">Employee exceeds monthly allowance</Label>
                                        <Switch id="notify-allowance" defaultChecked />
                                    </div>
                                </div>
                            </div>
                            <Separator />
                             <div>
                                <Label htmlFor="billing-recipients">Billing Recipients</Label>
                                <p className="text-sm text-muted-foreground">Additional emails to receive billing notifications, separated by commas.</p>
                                <Input id="billing-recipients" className="mt-2" placeholder="accounting@company.com" />
                            </div>
                            <div className="pt-4">
                                <Button>Save Notifications</Button>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}


function EmployeeSettings() {
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
     const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
    }


    return (
        <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Your Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Your Profile</CardTitle>
                        <CardDescription>This is your personal information for your business account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.avatarUrl} />
                                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2">
                                <Button variant="outline">Change photo</Button>
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
                                    <Input id="email" type="email" defaultValue={user?.email} readOnly />
                                </div>
                            </div>
                            <Button type="submit">Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="security">
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password here. It's recommended to use a strong, unique password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6 max-w-lg" onSubmit={handlePasswordChange}>
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
            <TabsContent value="notifications">
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>How you receive updates about your orders.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive updates via email about your order status.</p>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="sms-notifications" className="text-base">SMS Notifications</Label>
                                <p className="text-sm text-muted-foreground">Get text messages for important updates like delivery ETAs.</p>
                            </div>
                            <Switch id="sms-notifications" />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

export default function BusinessSettingsPage() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'business_admin';
    
    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">
                    {isAdmin ? "Company Settings" : "Your Settings"}
                </h1>
                <p className="text-muted-foreground">
                    {isAdmin ? "Manage your company's profile, preferences, and billing." : "Manage your personal profile and notification settings."}
                </p>
            </div>
            {isAdmin ? <AdminSettings /> : <EmployeeSettings />}
        </div>
    );
}
