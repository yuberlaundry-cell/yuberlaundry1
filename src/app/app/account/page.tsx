'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { CreditCard, Shield, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
    const { user, logout } = useAuth();
    const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Account Settings</h1>
                <p className="text-muted-foreground">Manage your profile, payment methods, and notification preferences.</p>
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
                     <form className="space-y-4 max-w-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" defaultValue={user?.firstName} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" defaultValue={user?.lastName} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={user?.email} />
                        </div>
                        <Button>Save Profile</Button>
                    </form>
                    <Separator />
                     <div className="space-y-4">
                        <h3 className="font-semibold">Password</h3>
                        <Button variant="outline">Change Password</Button>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Preferences & Legal</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                     <Link href="#" className="py-3 flex items-center justify-between hover:bg-muted/50 -mx-6 px-6">
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <span>Payment Methods</span>
                        </div>
                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                     <Link href="#" className="py-3 flex items-center justify-between hover:bg-muted/50 -mx-6 px-6">
                         <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span>Notifications</span>
                        </div>
                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                     <Link href="#" className="py-3 flex items-center justify-between hover:bg-muted/50 -mx-6 px-6">
                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <span>Privacy & Sharing</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                     <Link href="/faq" className="py-3 flex items-center justify-between hover:bg-muted/50 -mx-6 px-6">
                         <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-muted-foreground" />
                            <span>Help Center</span>
                        </div>
                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                </CardContent>
                 <CardFooter>
                     <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={logout}>
                         <LogOut className="mr-2"/>
                         Log Out
                    </Button>
                 </CardFooter>
            </Card>

        </div>
    );
}
