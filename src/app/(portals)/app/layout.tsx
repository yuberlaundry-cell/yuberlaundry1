"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { Home, ShoppingCart, Wallet, Tag, User, Menu } from 'lucide-react';
import { WashingMachine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: '/app', label: 'Home', icon: Home },
  { href: '/app/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/app/wallet', label: 'Wallet', icon: Wallet },
  { href: '/app/promotions', label: 'Promotions', icon: Tag },
  { href: '/app/account', label: 'Account', icon: User },
];

export default function ConsumerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="group-data-[collapsible=icon]:hidden">
                <Link href="/" className="mr-auto">
                    <WashingMachine className="h-7 w-7 text-primary" />
                </Link>
            </Button>
            <h1 className="font-headline text-lg font-semibold">Yuber Laundry</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.label} isActive={pathname.startsWith(item.href) && (item.href === '/app' ? pathname === item.href : true) }>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
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
