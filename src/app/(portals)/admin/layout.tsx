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
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';
import {
  Book,
  Bot,
  Building,
  ClipboardList,
  Contact,
  CreditCard,
  Flag,
  Gauge,
  HelpCircle,
  Home,
  Key,
  LayoutGrid,
  Percent,
  Settings,
  ShoppingCart,
  Tags,
  Truck,
  Warehouse,
  WashingMachine,
  Combine,
  HeartPulse,
  Server,
  Clock,
  BookCopy,
  Code,
  Users,
  BrainCircuit,
  TrendingUp,
  Container,
  Route,
  ShieldAlert,
  Leaf,
  DollarSign,
  Send,
  ShieldCheck,
  Target,
  BarChart,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const menuConfig = [
  {
    group: 'Overview & Insights',
    items: [
      { href: '/admin', label: 'Global Dashboard', icon: Gauge },
      { href: '/admin/intelligence', label: 'Intelligence', icon: BrainCircuit },
      { href: '/admin/monitoring', label: 'System Monitoring', icon: HeartPulse },
    ],
  },
  {
    group: 'Operations',
    items: [
      { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
      { href: '/admin/drivers', label: 'Drivers', icon: Truck },
      { href: '/admin/laundromats', label: 'Laundromats', icon: Building },
      { href: '/admin/warehouses', label: 'Warehouses', icon: Warehouse },
      { href: '/admin/tasks', label: 'Task Schedules', icon: Clock },
    ],
  },
  {
    group: 'Quality & Risk',
    items: [
      { href: '/admin/qc', label: 'Quality Control', icon: ShieldCheck },
      { href: '/admin/audits', label: 'Audit Logs', icon: ClipboardList },
      { href: '/admin/compliance', label: 'Compliance', icon: Target },
    ]
  },
  {
    group: 'Customers & Revenue',
    items: [
      { href: '/admin/customers', label: 'Customers', icon: Contact },
      { href: '/admin/promotions', label: 'Subscriptions', icon: Tags },
      { href: '/admin/marketing', label: 'Marketing', icon: Send },
      { href: '/admin/financials', label: 'Financials', icon: CreditCard },
      { href: '/admin/payouts', label: 'Payouts', icon: Percent },
    ],
  },
  {
    group: 'Platform',
    items: [
      { href: '/admin/automation', label: 'Automation', icon: Combine },
      { href: '/admin/support', label: 'Support Center', icon: HelpCircle },
      { href: '/admin/tenants', label: 'Tenants', icon: LayoutGrid },
      { href: '/admin/feature-flags', label: 'Feature Flags', icon: Flag },
      { href: '/admin/staff', label: 'Staff & Roles', icon: UserCheck },
      { href: '/admin/settings', label: 'Global Settings', icon: Settings },
    ],
  },
  {
    group: 'Developer',
    items: [
      { href: '/admin/api-status', label: 'API Status', icon: Server },
      { href: '/admin/integrations', label: 'Integrations', icon: Key },
      { href: '/admin/logs', label: 'Logs', icon: BookCopy },
      { href: '/admin/dev-tools', label: 'Dev Tools', icon: Code },
    ],
  },
];


export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
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
              <p className="text-xs text-muted-foreground">Superadmin</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
           <div className="p-2">
                <Input placeholder="Global search..." className="w-full" />
            </div>
          <SidebarMenu>
            {menuConfig.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                 {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      isActive={
                        pathname.startsWith(item.href) &&
                        (item.href === '/admin' ? pathname === item.href : true)
                      }
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroup>
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
