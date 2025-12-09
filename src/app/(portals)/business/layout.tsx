"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { LayoutDashboard, Users, ShoppingCart, BarChart, CreditCard, Settings, LogOut, Menu } from 'lucide-react';
import { WashingMachine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const adminMenuItems = [
  { href: '/business', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/business/employees', label: 'Employees', icon: Users },
  { href: '/business/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/business/reports', label: 'Reports', icon: BarChart },
  { href: '/business/billing', label: 'Billing', icon: CreditCard },
  { href: '/business/settings', label: 'Settings', icon: Settings },
];

const employeeMenuItems = [
  { href: '/business', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/business/orders', label: 'My Orders', icon: ShoppingCart },
  { href: '/business/reports', label: 'My Reports', icon: BarChart },
  { href: '/business/settings', label: 'Settings', icon: Settings },
]

export default function BusinessPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAdmin = user?.role === 'business_admin';
  const menuItems = isAdmin ? adminMenuItems : employeeMenuItems;
  
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
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <h1 className="font-headline text-lg font-semibold -mb-1">{user?.companyName || 'Business Portal'}</h1>
                <p className="text-xs text-muted-foreground">{isAdmin ? 'Admin' : 'Employee'}</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.label} isActive={pathname.startsWith(item.href) && (item.href === '/business' ? pathname === item.href : true)}>
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
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
