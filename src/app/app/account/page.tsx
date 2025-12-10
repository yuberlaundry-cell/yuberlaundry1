
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { CreditCard, Shield, Bell, HelpCircle, LogOut, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Saved",
            description: "Your information has been updated successfully.",
        });
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3"><User /> Account Settings</h1>
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
                     <form className="space-y-4 max-w-lg" onSubmit={handleSaveProfile}>
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
                        <Button type="submit">Save Profile</Button>
                    </form>
                    <Separator />
                     <div className="space-y-4">
                        <h3 className="font-semibold">Password</h3>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Change Password</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Change Your Password</DialogTitle>
                                    <DialogDescription>
                                        Enter your old password and choose a new one.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="old-password">Current Password</Label>
                                        <Input id="old-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                    <Button type="submit" className="w-full">Set New Password</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Preferences & Legal</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border -mx-6 px-0">
                     <Link href="#" className="py-3 flex items-center justify-between hover:bg-muted/50 px-6">
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <span>Payment Methods</span>
                        </div>
                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                     <Link href="#" className="py-3 flex items-center justify-between hover:bg-muted/50 px-6">
                         <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span>Notifications</span>
                        </div>
                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                     <Link href="#" className="py-3 flex items-center justify-between hover:bg-muted/50 px-6">
                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <span>Privacy & Sharing</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                     <Link href="/faq" className="py-3 flex items-center justify-between hover:bg-muted/50 px-6">
                         <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-muted-foreground" />
                            <span>Help Center</span>
                        </div>
                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                </CardContent>
                 <CardFooter className="pt-6">
                     <Button variant="ghost" className="text-destructive hover:text-destructive -ml-4" onClick={handleLogout}>
                         <LogOut className="mr-2"/>
                         Log Out
                    </Button>
                 </CardFooter>
            </Card>

        </div>
    );
}
