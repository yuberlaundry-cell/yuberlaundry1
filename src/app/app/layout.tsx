
"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { Home, ShoppingCart, Wallet, Tag, User, Menu, ChevronRight } from 'lucide-react';
import { WashingMachine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const navigationConfig = [
  { href: '/app', label: 'Home', icon: Home, isStandalone: true },
  {
    title: 'My Activity',
    links: [
      { href: '/app/orders', label: 'Orders', icon: ShoppingCart },
      { href: '/app/wallet', label: 'Wallet', icon: Wallet },
      { href: '/app/promotions', label: 'Promotions', icon: Tag },
    ]
  },
  {
    title: 'Settings',
    links: [
      { href: '/app/account', label: 'Account', icon: User },
    ]
  }
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
             <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                 <h1 className="font-headline text-lg font-semibold -mb-1">Yuber Laundry</h1>
                <p className="text-xs text-muted-foreground">Personal</p>
            </div>
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
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
