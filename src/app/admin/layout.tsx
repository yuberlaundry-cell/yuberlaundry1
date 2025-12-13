

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
  Map,
  Clock,
  Waypoints,
  FileText,
  UserCog,
  Briefcase,
  Star,
  Palette,
  Sparkles,
  Package,
  Tag,
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
      { href: '/admin/reports', label: 'Demand vs Supply', icon: BarChart },
    ],
  },
  {
    title: 'Operations',
    links: [
      { href: '/admin/orders', label: 'Orders Control', icon: ShoppingCart },
      { href: '/admin/b2b', label: 'B2B Accounts', icon: Briefcase },
      { href: '/admin/laundromats', label: 'Laundromats', icon: Building },
      { href: '/admin/drivers', label: 'Driver Fleet', icon: Truck },
      { href: '/admin/services', label: 'Service Management', icon: Package },
    ],
  },
   {
    title: 'Logistics & Routing',
    links: [
      { href: '/admin/logistics/slots', label: 'Time Slots', icon: Clock },
      { href: '/admin/logistics/zones', label: 'Service Zones', icon: Map },
      { href: '/admin/logistics/routing', label: 'Routing Rules', icon: Waypoints },
    ],
  },
  {
    title: 'Revenue & Billing',
    links: [
      { href: '/admin/revenue/commissions', label: 'Commission Rules', icon: Percent },
      { href: '/admin/revenue/subscriptions', label: 'Subscription Plans', icon: Crown },
      { href: '/admin/revenue/subscribers', label: 'Subscribers', icon: Users },
      { href: '/admin/billing', label: 'B2B Billing', icon: CreditCard },
    ],
  },
  {
    title: 'Marketing',
    links: [
        { href: '/admin/promotions', label: 'Promotions', icon: Tag },
        { href: '/admin/loyalty', label: 'Loyalty Program', icon: Star },
    ]
  },
  {
    title: 'Quality & Risk',
    links: [
      { href: '/admin/compliance', label: 'Compliance', icon: ShieldCheck, subMenu: [
          { href: '/admin/compliance/risks', label: 'High-Risk Entities' },
          { href: '/admin/compliance/documents', label: 'Expiring Documents' },
          { href: '/admin/compliance/tasks', label: 'Compliance Tasks' },
      ]},
      { href: '/admin/fraud', label: 'Fraud Monitoring', icon: Shield, subMenu: [
          { href: '/admin/fraud/overview', label: 'Overview' },
          { href: '/admin/fraud/alerts', label: 'New Alerts' },
          { href: '/admin/fraud/review', label: 'Under Review' },
          { href: '/admin/fraud/blocked', label: 'Blocked Accounts' },
      ]},
    ],
  },
   {
    title: 'Platform Health',
    links: [
      { href: '/admin/api-status', label: 'API Status', icon: BadgeInfo },
       { href: '/admin/health', label: 'System Health', icon: HeartPulse },
    ],
  },
  {
    title: 'Content Management',
    links: [
        { href: '/admin/content/homepage', label: 'Homepage', icon: FileText },
        { href: '/admin/content/for-business', label: 'For Business', icon: FileText },
        { href: '/admin/content/how-it-works', label: 'How It Works', icon: FileText },
        { href: '/admin/content/features', label: 'Features', icon: Sparkles },
        { href: '/admin/content/pages', label: 'Site Pages', icon: FileText },
    ]
  },
  {
    title: 'Users & Config',
    links: [
      { href: '/admin/users', label: 'User Management', icon: Users },
      { href: '/admin/roles', label: 'Roles & Permissions', icon: UserCog },
      { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
      { href: '/admin/settings/branding', label: 'Branding', icon: Palette },
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
                    <span className="truncate group-data-[collapsible=icon]:hidden">{section.title}</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="py-1 pl-4 border-l ml-[18px] group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:border-l-0">
                        {section.links.map((item) => (
                            <div key={item.href}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.label}
                                        isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href) && !item.subMenu)}
                                        className={cn(item.subMenu && "pointer-events-none opacity-50")}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                {item.subMenu && (
                                    <div className="pl-6 pt-1 pb-2 space-y-1">
                                        {item.subMenu.map(subItem => (
                                             <SidebarMenuItem key={subItem.href}>
                                                 <SidebarMenuButton
                                                    asChild
                                                    tooltip={subItem.label}
                                                    isActive={pathname === subItem.href}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full justify-start"
                                                >
                                                    <Link href={subItem.href}>
                                                        <span>{subItem.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </div>
                                )}
                            </div>
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
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-6xl">
                {children}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
