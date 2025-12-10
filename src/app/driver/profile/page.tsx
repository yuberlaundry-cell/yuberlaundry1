'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { Building, Car, HelpCircle, LogOut, Mail, Newspaper, Bell } from "lucide-react";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and settings.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user?.avatarUrl} />
                            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
                            <p className="text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Personal Information</h3>
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input defaultValue={`${user?.firstName} ${user?.lastName}`} />
                        </div>
                         <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" defaultValue={user?.email} />
                        </div>
                    </div>
                    <Separator/>
                     <div className="space-y-4">
                        <h3 className="font-semibold">Vehicle Information</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Vehicle Type</Label>
                                <Input defaultValue="Blue Toyota Prius" />
                            </div>
                            <div className="space-y-2">
                                <Label>License Plate</Label>
                                <Input defaultValue="LAUNDRY1" />
                            </div>
                        </div>
                    </div>
                    <Separator />
                     <div className="space-y-4">
                        <h3 className="font-semibold">Payout Information</h3>
                         <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                            <Building className="h-6 w-6 text-muted-foreground"/>
                            <div>
                                <p className="font-medium">Bank of Example</p>
                                <p className="text-sm text-muted-foreground">Account ending in **** 5678</p>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full sm:w-auto">Save Changes</Button>
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
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={logout}>
                        <LogOut className="mr-2"/> Log Out
                    </Button>
                </CardContent>
            </Card>

        </div>
    )
}
