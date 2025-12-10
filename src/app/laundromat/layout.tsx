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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/layout/user-nav';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const menuItems = [
  { href: '/laundromat', label: 'Dashboard', icon: Home },
  { href: '/laundromat/orders', label: 'Orders', icon: Package },
  { href: '/laundromat/intake', label: 'Intake', icon: ScanLine },
  { href: '/laundromat/processing', label: 'Processing', icon: LayoutGrid },
  { href: '/laundromat/qc', label: 'Quality Control', icon: ClipboardCheck },
  { href: '/laundromat/ready', label: 'Ready for Delivery', icon: Truck },
  { href: '/laundromat/financials', label: 'Financials', icon: CreditCard },
  { href: '/laundromat/resources', label: 'Resources', icon: Book },
  { href: '/laundromat/settings', label: 'Settings', icon: Settings },
];

export default function LaundromatPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

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
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  isActive={
                    pathname.startsWith(item.href) &&
                    (item.href === '/laundromat' ? pathname === item.href : true)
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
          <div className="flex items-center space-x-2">
            <Switch id="facility-status" defaultChecked />
            <Label htmlFor="facility-status">Open</Label>
          </div>
          <div className="flex-1" />
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
