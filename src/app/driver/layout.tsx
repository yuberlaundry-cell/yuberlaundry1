
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import {
  CircleUserRound,
  ClipboardList,
  Home,
  Wallet,
  WashingMachine,
  ClipboardPlus,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/layout/user-nav';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const desktopNavItems = [
  { href: '/driver', label: 'Today', icon: Home, exact: true },
  { href: '/driver/jobs/available', label: 'Available Jobs', icon: ClipboardPlus },
  { href: '/driver/jobs', label: 'All Jobs', icon: ClipboardList },
  { href: '/driver/earnings', label: 'Earnings', icon: Wallet },
  { href: '/driver/profile', label: 'Profile', icon: CircleUserRound },
];

const mobileNavItems = [
  { href: '/driver', label: 'Today', icon: Home, exact: true },
  { href: '/driver/jobs/available', label: 'Available', icon: ClipboardPlus },
  { href: '/driver/earnings', label: 'Earnings', icon: Wallet },
  { href: '/driver/profile', label: 'Profile', icon: CircleUserRound },
];

const BottomNavbar = () => {
    const pathname = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
            <div className="grid h-16 grid-cols-4 w-full">
                {mobileNavItems.map((item) => {
                    const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-muted-foreground",
                                isActive && "text-primary"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
};


export default function DriverPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (isMobile) {
       return (
        <>
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 justify-between">
                <Link href="/" className="mr-auto">
                    <WashingMachine className="h-7 w-7 text-primary" />
                </Link>
                <div className="flex items-center gap-2">
                    <Label htmlFor="availability-mobile" className="text-sm font-medium">
                        Online
                    </Label>
                    <Switch id="availability-mobile" defaultChecked />
                </div>
                <UserNav />
            </header>
            <main className="flex-1 p-4 pb-24 sm:p-6 lg:p-8">
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
                    <h1 className="font-headline text-lg font-semibold -mb-1">Driver Portal</h1>
                </div>
             </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {desktopNavItems.map((item) => {
              const isActive = (item.exact && pathname === item.href) || (!item.exact && pathname.startsWith(item.href));
              return (
              <SidebarMenuItem key={item.href} className="px-2">
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  isActive={isActive}
                  variant="ghost"
                  className="justify-start"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )})}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
           <div className="ml-auto flex items-center gap-4">
             <div className="flex items-center gap-2">
                <Label htmlFor="availability-desktop" className="font-medium">
                Online Status
                </Label>
                <Switch id="availability-desktop" defaultChecked/>
            </div>
            <UserNav />
          </div>
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
