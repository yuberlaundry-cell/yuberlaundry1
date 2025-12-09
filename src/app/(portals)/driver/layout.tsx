"use client";

import { usePathname } from "next/navigation";
import { CircleUserRound, ClipboardList, Home, Wallet } from "lucide-react";
import { UserNav } from "@/components/layout/user-nav";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
    { href: "/driver", label: "Today", icon: Home },
    { href: "/driver/jobs", label: "Jobs", icon: ClipboardList },
    { href: "/driver/earnings", label: "Earnings", icon: Wallet },
    { href: "/driver/profile", label: "Profile", icon: CircleUserRound },
];

export default function DriverPortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r">
                <div className="h-16 flex items-center px-6 border-b">
                    <h1 className="font-headline text-lg font-semibold">Driver Portal</h1>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navItems.map(item => (
                            <li key={item.href}>
                                <Button
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <div className="flex flex-col flex-1">
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <p className="hidden md:block font-medium">Welcome, {user?.firstName}!</p>
                        <div className="flex items-center space-x-2">
                            <Switch id="availability" />
                            <Label htmlFor="availability">Online</Label>
                        </div>
                    </div>
                    <UserNav />
                </header>
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
                <div className="grid grid-cols-4 h-16">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground",
                                pathname === item.href && "text-primary"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
             {/* Add padding to the bottom of the main content on mobile to avoid overlap with the bottom nav */}
            <div className="h-16 md:hidden"></div>
        </div>
    );
}
