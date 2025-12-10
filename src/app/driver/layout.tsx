
"use client";

import { usePathname } from "next/navigation";
import { CircleUserRound, ClipboardList, Home, Wallet, WashingMachine } from "lucide-react";
import { UserNav } from "@/components/layout/user-nav";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";

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
                <div className="h-16 flex items-center px-4 border-b gap-2">
                    <WashingMachine className="h-7 w-7 text-primary" />
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
                 <div className="mt-auto p-4 border-t">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="availability-desktop" className="font-medium">Online Status</Label>
                        <Switch id="availability-desktop" />
                    </div>
                </div>
            </aside>

            <div className="flex flex-col flex-1">
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 md:justify-end">
                    <div className="md:hidden flex items-center gap-2">
                         <WashingMachine className="h-6 w-6 text-primary" />
                         <p className="font-headline font-semibold">Driver Portal</p>
                    </div>
                    <UserNav />
                </header>
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
                 <div className="h-16 grid grid-cols-4">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-xs font-medium",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
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
