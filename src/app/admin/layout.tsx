
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
  AreaChart,
  BadgeInfo,
  ShieldCheck,
  Building,
  Users,
  WashingMachine,
  ShoppingCart,
  Truck,
  BarChart,
  Settings,
  Shield,
  HeartPulse,
  CreditCard,
  Percent,
  Crown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/layout/user-nav';
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationConfig = [
  {
    title: 'Overview & Insights',
    links: [
      { href: '/admin', label: 'Global Dashboard', icon: AreaChart },
      { href: '#', label: 'Demand vs Supply', icon: BarChart, disabled: true },
    ],
  },
  {
    title: 'Operations',
    links: [
      { href: '#', label: 'Orders Control', icon: ShoppingCart, disabled: true },
      { href: '/admin/laundromats', label: 'Laundromats', icon: Building },
      { href: '#', label: 'Driver Fleet', icon: Truck, disabled: true },
    ],
  },
  {
    title: 'Revenue & Billing',
    links: [
      { href: '/admin/revenue/commissions', label: 'Commission Rules', icon: Percent },
      { href: '/admin/revenue/subscriptions', label: 'Subscription Plans', icon: Crown },
      { href: '#', label: 'B2B Billing', icon: CreditCard, disabled: true },
    ],
  },
  {
    title: 'Quality & Risk',
    links: [
      { href: '/admin/compliance', label: 'Compliance', icon: ShieldCheck },
      { href: '#', label: 'Fraud Monitoring', icon: Shield, disabled: true },
    ],
  },
   {
    title: 'Platform Health',
    links: [
      { href: '/admin/api-status', label: 'API Status', icon: BadgeInfo },
       { href: '#', label: 'System Health', icon: HeartPulse, disabled: true },
    ],
  },
  {
    title: 'Users & Config',
    links: [
      { href: '/admin/users', label: 'User Management', icon: Users },
      { href: '#', label: 'Platform Settings', icon: Settings, disabled: true },
    ],
  },
];

export default function AdminPortalLayout({
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
    if (!loading && user && user.role !== 'superadmin') {
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
                Yuber Laundry
              </h1>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <SidebarMenu>
            {navigationConfig.map((section) => (
              <Collapsible key={section.title} defaultOpen={section.links.some(l => pathname.startsWith(l.href) && l.href !== '/admin' || pathname === l.href)} className="group/collapsible">
                <CollapsibleTrigger className="group/trigger w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground [&[data-state=open]>svg]:rotate-90">
                    <span>{section.title}</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="py-1 pl-4 border-l ml-[18px]">
                        {section.links.map((item) => (
                            <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                <SidebarMenuButton
                                asChild
                                tooltip={item.label}
                                isActive={pathname === item.href}
                                className={cn(item.disabled && "opacity-50 pointer-events-none")}
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
            <div className="mx-auto w-full max-w-screen-2xl">
                {children}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
