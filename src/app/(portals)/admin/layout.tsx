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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Gauge },
  { href: '/admin/customers', label: 'Customers', icon: Contact },
  { href: '/admin/drivers', label: 'Drivers', icon: Truck },
  { href: '/admin/laundromats', label: 'Laundromats', icon: Building },
  { href: '/admin/warehouses', label: 'Warehouses', icon: Warehouse },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/financials', label: 'Financials', icon: CreditCard },
  { href: '/admin/payouts', label: 'Payouts', icon: Percent },
  { href: '/admin/marketing', label: 'Marketing & CMS', icon: Book },
  { href: '/admin/promotions', label: 'Promotions', icon: Tags },
  { href: '/admin/tenants', label: 'Tenants', icon: LayoutGrid },
  { href: '/admin/feature-flags', label: 'Feature Flags', icon: Flag },
  { href: '/admin/integrations', label: 'Integrations & API', icon: Key },
  { href: '/admin/staff', label: 'Staff & Roles', icon: Users },
  { href: '/admin/audits', label: 'Audit Logs', icon: ClipboardList },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/support', label: 'Support Center', icon: HelpCircle },
  { href: '/admin/automation', label: 'Automation', icon: Combine },
  { href: '/admin/monitoring', label: 'System Monitoring', icon: HeartPulse },
  { href: '/admin/api-status', label: 'API Status', icon: Server },
  { href: '/admin/tasks', label: 'Task Schedules', icon: Clock },
  { href: '/admin/logs', label: 'Logs', icon: BookCopy },
  { href: '/admin/dev-tools', label: 'Dev Tools', icon: Code },
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
            {menuItems.map((item) => (
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
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
