
"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { Home, ShoppingCart, Wallet, Tag, User, Menu, ChevronRight, Settings, LifeBuoy, LogOut, Bot, Users as ReferralsIcon, Power, LayoutDashboard } from 'lucide-react';
import { WashingMachine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const navigationConfig = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/orders', label: 'My Orders', icon: ShoppingCart },
  { href: '/app/promotions', label: 'My Subscriptions', icon: Tag },
  { href: '/app/wallet', label: 'My Wallet', icon: Wallet },
  { href: '/app/referrals', label: 'Referrals', icon: ReferralsIcon, disabled: true },
  { href: '#', label: 'AI Schedule Helper', icon: Bot, disabled: true },
];

const bottomNavConfig = [
    { href: '/app/account', label: 'Settings', icon: Settings },
    { href: '/faq', label: 'Support', icon: LifeBuoy },
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
             <SidebarMenuItem>
                 <Button asChild className="w-full justify-start">
                    <Link href="/app/book/address">New Order</Link>
                </Button>
            </SidebarMenuItem>
            {navigationConfig.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={pathname.startsWith(item.href) && item.href !== '/app' || pathname === item.href}
                variant="ghost"
                className="justify-start disabled:opacity-50"
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
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                            {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`}
                        </div>
                        <span>Logout</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="hidden md:flex items-center gap-2">
                 <h1 className="font-headline text-lg font-semibold -mb-1">Yuber Laundry</h1>
            </div>
            <div className="flex-1" />
            <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
