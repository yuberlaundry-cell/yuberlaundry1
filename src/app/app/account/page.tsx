
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
                         <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Manage your saved payment methods.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p>Payment methods management coming soon.</p>
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
