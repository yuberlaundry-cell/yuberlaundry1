

"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { ShoppingCart, Wallet, Tag, Settings, LifeBuoy, LogOut, Bot, Users as ReferralsIcon, LayoutDashboard, CircleUserRound, PlusCircle, MoreHorizontal, Search, Home } from 'lucide-react';
import { WashingMachine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookingFlow } from "@/components/booking/booking-flow";
import { FaqChatbot } from "@/components/faq-chatbot";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const moreMenuItems = [
    { href: '/app/orders', label: 'My Orders', icon: ShoppingCart },
    { href: '/app/promotions', label: 'Promotions & Subscriptions', icon: Tag },
    { href: '/app/referrals', label: 'Refer a Friend', icon: ReferralsIcon },
    { href: '/app/account', label: 'Account Settings', icon: Settings },
    { href: '/app/support', label: 'Support', icon: LifeBuoy },
];

const desktopNavConfig = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/orders', label: 'My Orders', icon: ShoppingCart },
  { href: '/app/promotions', label: 'Promotions', icon: Tag },
  { href: '/app/wallet', label: 'My Wallet', icon: Wallet },
  { href: '/app/referrals', label: 'Referrals', icon: ReferralsIcon },
];

const desktopBottomNavConfig = [
    { href: '/app/account', label: 'Settings', icon: Settings },
    { href: '/app/support', label: 'Support', icon: LifeBuoy },
];


const BottomNavbar = () => {
    const pathname = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
            <div className="grid h-16 grid-cols-4 w-full text-xs">
                <Link
                    href="/app"
                    className={cn(
                        "flex flex-col items-center justify-center pt-1",
                        pathname === "/app" ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    <div className="flex flex-col items-center justify-center">
                        <Home className="h-5 w-5" />
                        <span className="mt-1">Dashboard</span>
                    </div>
                </Link>

                <Dialog>
                    <DialogTrigger asChild>
                         <div className="flex flex-col items-center justify-center pt-1 text-primary font-semibold">
                            <div className="flex items-center justify-center h-12 w-12 -mt-7 rounded-full bg-primary text-primary-foreground border-4 border-background">
                                <PlusCircle className="h-6 w-6" />
                            </div>
                            <span className="mt-0.5">New Order</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
                         <DialogHeader className="p-6 pb-0">
                            <DialogTitle>Book your laundry</DialogTitle>
                            <DialogDescription>
                                Configure your laundry order and schedule a pickup.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-3 flex-1 overflow-hidden">
                            <BookingFlow />
                        </div>
                    </DialogContent>
                </Dialog>
                
                <Link
                    href="/app/wallet"
                    className={cn(
                        "flex flex-col items-center justify-center pt-1",
                        pathname.startsWith("/app/wallet") ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    <div className="flex flex-col items-center justify-center">
                        <Wallet className="h-5 w-5" />
                        <span className="mt-1">Wallet</span>
                    </div>
                </Link>

                 <Sheet>
                    <SheetTrigger asChild>
                         <div className="flex flex-col items-center justify-center pt-1 text-muted-foreground">
                            <div className="flex flex-col items-center justify-center">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="mt-1">More</span>
                            </div>
                        </div>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="rounded-t-2xl">
                        <SheetHeader>
                            <SheetTitle className="sr-only">More Options</SheetTitle>
                            <SheetDescription className="sr-only">
                                Access additional menu items like orders, promotions, referrals, settings, and support.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-2 py-4">
                            {moreMenuItems.map((item) => (
                                <Button key={item.href} variant="ghost" className="w-full justify-start text-base py-6" asChild>
                                    <Link href={item.href}>
                                        <item.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                                        {item.label}
                                    </Link>
                                </Button>
                            ))}
                            <Separator className="my-2"/>
                             <Button variant="ghost" className="w-full justify-start text-base py-6 text-destructive hover:text-destructive" >
                                <LogOut className="mr-3 h-5 w-5" />
                                Log Out
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};


export default function ConsumerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
        <>
             <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                 <Link href="/" className="mr-auto">
                    <WashingMachine className="h-7 w-7 text-primary" />
                 </Link>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5"/>
                    </Button>
                    <FaqChatbot />
                    <UserNav />
                </div>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 mb-24">
                 <div className="mx-auto w-full max-w-6xl">
                    {children}
                 </div>
            </main>
            <BottomNavbar />
        </>
    )
  }
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
             <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:mr-0">
                <WashingMachine className="h-7 w-7 text-primary" />
                 <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                     <h1 className="font-headline text-lg font-semibold -mb-1">Yuber Laundry</h1>
                </div>
             </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
             <SidebarMenuItem className="px-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start">New Order</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl min-h-[90vh] grid-cols-3 p-0">
                      <DialogHeader className="p-6 pb-0 sr-only">
                        <DialogTitle>Book your laundry</DialogTitle>
                        <DialogDescription>
                            Configure your laundry order and schedule a pickup.
                        </DialogDescription>
                      </DialogHeader>
                      <BookingFlow />
                  </DialogContent>
                </Dialog>
            </SidebarMenuItem>
            {desktopNavConfig.map((item) => (
              <SidebarMenuItem key={item.href} className="px-2">
                <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={pathname.startsWith(item.href) && item.href !== '/app' || pathname === item.href}
                variant="ghost"
                className="justify-start"
                >
                <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            ))}
             <SidebarMenuItem className="px-2">
                <FaqChatbot />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 space-y-1">
            {desktopBottomNavConfig.map((item) => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={pathname.startsWith(item.href)}
                    variant="ghost"
                     className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <SidebarMenuButton variant="ghost" className="justify-start w-full text-destructive hover:text-destructive" onClick={logout}>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders, pickups, help..."
                className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <div className="flex-1" />
            <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
