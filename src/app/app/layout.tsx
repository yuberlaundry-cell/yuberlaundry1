
"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { ShoppingCart, Wallet, Tag, Settings, LifeBuoy, LogOut, Bot, Users as ReferralsIcon, LayoutDashboard, Search } from 'lucide-react';
import { WashingMachine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";

const navigationConfig = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/orders', label: 'My Orders', icon: ShoppingCart },
  { href: '/app/promotions', label: 'My Subscriptions', icon: Tag },
  { href: '/app/wallet', label: 'My Wallet', icon: Wallet },
  { href: '/app/referrals', label: 'Referrals', icon: ReferralsIcon, disabled: false },
  { href: '/app/support', label: 'Support', icon: LifeBuoy },
];

const bottomNavConfig = [
    { href: '/app/account', label: 'Settings', icon: Settings },
];


export default function ConsumerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
             <Link href="/" className="mr-auto group-data-[collapsible=icon]:mr-0">
                <WashingMachine className="h-7 w-7 text-primary" />
             </Link>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                 <h1 className="font-headline text-lg font-semibold -mb-1">Yuber Laundry</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
             <SidebarMenuItem className="px-2">
                 <Button asChild className="w-full justify-start">
                    <Link href="/app/book/address">New Order</Link>
                </Button>
            </SidebarMenuItem>
            {navigationConfig.map((item) => (
              <SidebarMenuItem key={item.href} className="px-2">
                <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={pathname.startsWith(item.href) && item.href !== '/app' || pathname === item.href}
                variant="ghost"
                className="justify-start"
                disabled={item.disabled}
                >
                <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 space-y-1">
            {bottomNavConfig.map((item) => (
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
                <SidebarMenuButton variant="ghost" className="justify-start w-full" onClick={logout}>
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
