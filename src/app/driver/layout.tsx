
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
  Bell,
  ChevronRight,
  LogOut,
  MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/layout/user-nav';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const navConfig = [
    { href: '/driver', label: 'Today', icon: Home, isStandalone: true },
    {
        title: 'Jobs',
        links: [
            { href: '/driver/jobs/available', label: 'Available Jobs', icon: ClipboardPlus },
            { href: '/driver/jobs', label: 'All Jobs', icon: ClipboardList },
        ]
    },
    {
        title: 'Account',
        links: [
            { href: '/driver/earnings', label: 'Earnings', icon: Wallet },
            { href: '/driver/profile', label: 'Profile', icon: CircleUserRound },
        ]
    }
];

const mobileNavItems = [
  { href: '/driver', label: 'Today', icon: Home, exact: true },
  { href: '/driver/jobs/available', label: 'Available', icon: ClipboardPlus },
  { href: '/driver/earnings', label: 'Earnings', icon: Wallet },
  { href: '/driver/profile', label: 'Profile', icon: CircleUserRound },
];

const moreMenuItems = [
    ...navConfig.filter(s => s.title === 'Jobs')[0].links,
    ...navConfig.filter(s => s.title === 'Account')[0].links,
];

const notifications = [
    { title: 'New Job Available: ASAP Pickup', description: 'A new ASAP job is available in your area.' },
    { title: 'Weekly Summary Ready', description: 'Your earnings summary for last week is now available.' },
    { title: 'Reminder: Update Documents', description: 'Your vehicle insurance is expiring in 15 days.' },
];

const BottomNavbar = () => {
    const pathname = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
            <div className="grid h-16 grid-cols-5 w-full text-xs">
                {mobileNavItems.map((item) => {
                    const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center pt-1 gap-1",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
                <Sheet>
                    <SheetTrigger asChild>
                         <div className="flex flex-col items-center justify-center pt-1 gap-1 text-muted-foreground">
                            <MoreHorizontal className="h-5 w-5" />
                            <span>More</span>
                        </div>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="rounded-t-2xl h-[70%] flex flex-col">
                        <SheetHeader>
                            <SheetTitle className="sr-only">More Options</SheetTitle>
                            <SheetDescription className="sr-only">
                                Access additional menu items.
                            </SheetDescription>
                        </SheetHeader>
                         <div className="space-y-2 py-4 flex-grow overflow-y-auto">
                             <SheetClose asChild>
                                <Button variant="ghost" className="w-full justify-start text-base py-6" asChild>
                                    <Link href="/driver/jobs">
                                        <ClipboardList className="mr-3 h-5 w-5 text-muted-foreground" /> All Jobs
                                    </Link>
                                </Button>
                            </SheetClose>
                         </div>
                        <Separator className="my-2"/>
                         <SheetClose asChild>
                             <Button variant="ghost" className="w-full justify-start text-base py-6 text-destructive hover:text-destructive" >
                                <LogOut className="mr-3 h-5 w-5" /> Log Out
                            </Button>
                        </SheetClose>
                    </SheetContent>
                </Sheet>
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
  const { user, loading } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();

   React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
     if (!loading && user && user.role !== 'driver') {
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

  if (isMobile) {
       return (
        <div className="flex flex-col min-h-screen">
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
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                          <Bell />
                          <span className="absolute top-1 right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                      <div className="p-2 font-semibold">Notifications</div>
                      <DropdownMenuSeparator />
                      {notifications.map((n, i) => (
                          <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 whitespace-normal">
                            <div className="font-medium">{n.title}</div>
                            <div className="text-xs text-muted-foreground">{n.description}</div>
                          </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <UserNav />
            </header>
            <main className="flex-1 p-4 pb-24 sm:p-6 lg:p-8">
                 <div className="mx-auto w-full max-w-6xl">
                    {children}
                 </div>
            </main>
            <BottomNavbar />
        </div>
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
            {navConfig.map((section) => {
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
                           <div key={item.href}>
                            <SidebarMenuItem>
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
                            </div>
                        ))}
                    </div>
                </CollapsibleContent>
              </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
           <div className="flex items-center gap-2">
                <Label htmlFor="availability-desktop" className="font-medium">
                Online
                </Label>
                <Switch id="availability-desktop" defaultChecked/>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                          <Bell />
                          <span className="absolute top-1 right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                      <div className="p-2 font-semibold">Notifications</div>
                      <DropdownMenuSeparator />
                      {notifications.map((n, i) => (
                          <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 whitespace-normal">
                            <div className="font-medium">{n.title}</div>
                            <div className="text-xs text-muted-foreground">{n.description}</div>
                          </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
