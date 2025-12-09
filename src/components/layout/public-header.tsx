"use client";

import Link from 'next/link';
import { WashingMachine, Menu, ChevronDown, Rocket, Bike, Shirt, Gift, Sparkles, CircleHelp, Mail, MessageSquare, Star, Apple, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { UserNav } from './user-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from 'react';
import { Badge } from '../ui/badge';

const navLinks = [
  { href: '/for-business', label: 'Business' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/locations', label: 'Locations' },
];

const personalMegaMenuItems = {
  "How it works": [
    { icon: Rocket, title: "Schedule Pickup", href: "#" },
    { icon: Shirt, title: "We Clean", href: "#" },
    { icon: Bike, title: "Fast Delivery", href: "#" },
    { icon: Shirt, title: "Pricing", href: "/pricing" },
    { icon: Apple, title: "Download App", href: "#" },
  ],
  "Plans & Features": [
    { icon: Sparkles, title: "Yuber Plus", href: "#", popular: true },
    { icon: Sparkles, title: "Sustainability", href: "#" },
    { icon: Gift, title: "Gift Cards", href: "#" },
    { icon: Sparkles, title: "Referral Program", href: "#" },
  ],
  "Support": [
    { icon: CircleHelp, title: "Help Centre", href: "/faq" },
    { icon: Mail, title: "Contact Us", href: "#" },
    { icon: MessageSquare, title: "FAQs", href: "/faq" },
    { icon: Star, title: "Reviews", href: "#" },
  ]
};

export function PublicHeader() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block font-headline text-lg">Yuber Laundry</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Personal</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] lg:w-[700px] grid-cols-3 gap-6 p-6">
                    {Object.entries(personalMegaMenuItems).map(([title, items]) => (
                       <div key={title}>
                          <h3 className="font-semibold text-sm text-muted-foreground mb-3">{title}</h3>
                          <ul className="space-y-3">
                            {items.map(item => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link href={item.href} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                                      <item.icon className="h-4 w-4 text-muted-foreground" />
                                      <span>{item.title}</span>
                                      {item.popular && <Badge variant="secondary">POPULAR</Badge>}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                       </div>
                    ))}
                  </div>
                  <div className="p-4 bg-blue-50 m-2 rounded-lg">
                      <h4 className="font-semibold">First order 20% off</h4>
                      <p className="text-sm text-muted-foreground">Use code: <span className="font-mono p-1 rounded-sm bg-blue-100">WELCOME20</span></p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === link.href ? "text-foreground" : "text-foreground/60")}>
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='w-full'>
                <Link href="/" className="flex items-center space-x-2 mb-6">
                    <span className="font-bold font-headline text-lg">Yuber Laundry</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {/* TODO: Add mobile mega menu */}
                    <Link href="#" className='font-medium'>Personal</Link>
                    {navLinks.map((link) => (
                      <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "transition-colors hover:text-foreground/80 font-medium",
                             pathname === link.href ? "text-foreground" : "text-foreground/60"
                          )}
                      >
                          {link.label}
                      </Link>
                    ))}
                </nav>
            </SheetContent>
          </Sheet>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2">
          {!loading && (
            <>
              {user ? (
                <UserNav />
              ) : (
                <div className='hidden md:flex items-center space-x-2'>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Sign up</Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
