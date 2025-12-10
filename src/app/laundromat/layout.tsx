
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
  Home,
  Package,
  ScanLine,
  LayoutGrid,
  Truck,
  Book,
  Settings,
  WashingMachine,
  ClipboardCheck,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/layout/user-nav';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const navigationConfig = [
  { href: '/laundromat', label: 'Dashboard', icon: Home, isStandalone: true },
  {
    title: 'Core Operations',
    links: [
      { href: '/laundromat/intake', label: 'Intake', icon: ScanLine },
      { href: '/laundromat/orders', label: 'All Orders', icon: Package },
      { href: '/laundromat/processing', label: 'Processing Board', icon: LayoutGrid },
      { href: '/laundromat/qc', label: 'Quality Control', icon: ClipboardCheck },
      { href: '/laundromat/ready', label: 'Ready for Handoff', icon: Truck },
    ]
  },
  {
    title: 'Management',
    links: [
       { href: '/laundromat/financials', label: 'Financials', icon: CreditCard },
       { href: '/laundromat/resources', label: 'Resources', icon: Book },
       { href: '/laundromat/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function LaundromatPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
   const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
     if (!loading && user && user.role !== 'laundromat_staff') {
        router.push('/');
    }
  }, [user, loading, router]);

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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="group-data-[collapsible=icon]:hidden"
            >
              <Link href="/" className="mr-auto">
                <WashingMachine className="h-7 w-7 text-primary" />
              </Link>
            </Button>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <h1 className="font-headline text-lg font-semibold -mb-1">
                Main St. Laundry
              </h1>
              <p className="text-xs text-muted-foreground">Facility Portal</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationConfig.map((section) => {
              if (section.isStandalone) {
                return (
                  <SidebarMenuItem key={section.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={section.label}
                      isActive={pathname === section.href}
                    >
                      <Link href={section.href}>
                        <section.icon />
                        <span>{section.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
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
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="facility-status" defaultChecked />
            <Label htmlFor="facility-status">Open</Label>
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
