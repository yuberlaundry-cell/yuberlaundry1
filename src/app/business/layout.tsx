
"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { LayoutDashboard, Users, ShoppingCart, BarChart, CreditCard, Settings, ChevronRight } from 'lucide-react';
import { WashingMachine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import React from "react";

const adminNavConfig = [
  { href: '/business', label: 'Dashboard', icon: LayoutDashboard, isStandalone: true },
  {
    title: 'Management',
    links: [
      { href: '/business/employees', label: 'Employees', icon: Users },
      { href: '/business/orders', label: 'Orders', icon: ShoppingCart },
    ],
  },
  {
    title: 'Analytics',
    links: [
      { href: '/business/reports', label: 'Reports', icon: BarChart },
      { href: '/business/billing', label: 'Billing', icon: CreditCard },
    ],
  },
  {
    title: 'Company',
    links: [
       { href: '/business/settings', label: 'Settings', icon: Settings },
    ],
  },
];

const employeeNavConfig = [
  { href: '/business', label: 'Dashboard', icon: LayoutDashboard, isStandalone: true },
  { href: '/business/orders', label: 'My Orders', icon: ShoppingCart, isStandalone: true },
  { href: '/business/reports', label: 'My Reports', icon: BarChart, isStandalone: true },
  { href: '/business/settings', label: 'Settings', icon: Settings, isStandalone: true },
]

export default function BusinessPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isAdmin = user?.role === 'business_admin';
  const navigationConfig = isAdmin ? adminNavConfig : employeeNavConfig;

    if (loading || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <WashingMachine className="h-12 w-12 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">Loading your portal...</p>
            </div>
        );
    }
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
             <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:mr-0">
                <WashingMachine className="h-7 w-7 text-primary" />
                 <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <h1 className="font-headline text-lg font-semibold -mb-1 truncate">{user?.companyName || 'Business Portal'}</h1>
                    <p className="text-xs text-muted-foreground">{isAdmin ? 'Admin' : 'Employee'}</p>
                </div>
             </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationConfig.map((section) => {
              if (section.isStandalone) {
                return (
                   <SidebarMenuItem key={section.href}>
                    <SidebarMenuButton asChild tooltip={section.label} isActive={pathname === section.href}>
                      <Link href={section.href}>
                        <section.icon />
                        <span>{section.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }
              return (
              <Collapsible key={section.title} defaultOpen={section.links.some(l => pathname.startsWith(l.href))} className="group/collapsible">
                <CollapsibleTrigger className="group/trigger w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground [&[data-state=open]>svg]:rotate-90">
                    <span className="truncate group-data-[collapsible=icon]:hidden">{section.title}</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="py-1 pl-4 border-l ml-[18px] group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:border-l-0">
                        {section.links.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                asChild
                                tooltip={item.label}
                                isActive={pathname.startsWith(item.href)}
                                >
                                <Link href={item.href}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </div>
                </CollapsibleContent>
              </Collapsible>
            )})}
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
          <div className="mx-auto w-full max-w-6xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
