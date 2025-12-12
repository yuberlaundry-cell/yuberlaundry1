
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { Building, Car, HelpCircle, LogOut, Mail, Newspaper, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;

    const handleLogout = () => {
        logout();
        router.push('/');
    }

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Saved",
            description: "Your information has been successfully updated.",
        });
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and settings.</p>
            </div>

            <form onSubmit={handleSaveChanges}>
                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={user?.avatarUrl} />
                                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline">Change Photo</Button>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" defaultValue={user?.firstName} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" defaultValue={user?.lastName} />
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={user?.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <PhoneNumberInput />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vehicle-model">Vehicle Model & Color</Label>
                                    <Input id="vehicle-model" defaultValue="Blue Toyota Prius" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="license-plate">License Plate</Label>
                                    <Input id="license-plate" defaultValue="LAUNDRY1" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                         <Button type="submit" className="w-full sm:w-auto">Save All Changes</Button>
                    </div>
                </div>
            </form>

            <div className="grid gap-8 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Payout Information</CardTitle>
                         <CardDescription>This is managed by the platform administrator.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                            <Building className="h-6 w-6 text-muted-foreground"/>
                            <div>
                                <p className="font-medium">Bank of Example (via Paystack)</p>
                                <p className="text-sm text-muted-foreground">Account ending in **** 5678</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Settings & Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start"><Bell className="mr-2"/> Notification Preferences</Button>
                        <Button variant="ghost" className="w-full justify-start"><HelpCircle className="mr-2"/> Help Center</Button>
                        <Button variant="ghost" className="w-full justify-start"><Newspaper className="mr-2"/> Terms of Service</Button>
                        <Separator/>
                        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleLogout}>
                            <LogOut className="mr-2"/> Log Out
                        </Button>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
