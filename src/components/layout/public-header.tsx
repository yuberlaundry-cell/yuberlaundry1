"use client";

import Link from 'next/link';
import { WashingMachine, Menu, ChevronDown, Rocket, Bike, Shirt, Gift, Sparkles, CircleHelp, Mail, MessageSquare, Star, Apple, Play, Building, Briefcase, FileText, Bot } from 'lucide-react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const navLinks = [
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

const businessMegaMenuItems = {
    "Solutions": [
      { icon: Building, title: "For Hotels", href: "/for-business" },
      { icon: Briefcase, title: "For Corporates", href: "/for-business" },
      { icon: Building, title: "For Restaurants", href: "/for-business" },
      { icon: Building, title: "For Gyms & Salons", href: "/for-business" },
    ],
    "Platform Features": [
      { icon: FileText, title: "Centralized Billing", href: "/for-business" },
      { icon: FileText, title: "Usage Reports", href: "/for-business" },
      { icon: FileText, title: "Employee Allowances", href: "/for-business" },
      { icon: FileText, title: "Dedicated Portal", href: "/for-business" },
    ],
    "Resources": [
      { icon: Bot, title: "Request a Demo", href: "/for-business#contact" },
      { icon: Mail, title: "Contact Sales", href: "/for-business#contact" },
      { icon: Star, title: "Case Studies", href: "#" },
    ]
};

const howItWorksMenuItems = {
    "The Process": [
      { icon: Rocket, title: "Schedule Pickup", description: "Book a pickup in seconds using our app.", href: "#" },
      { icon: Shirt, title: "Professional Cleaning", description: "Our expert partners ensure your items are perfectly cleaned.", href: "#" },
      { icon: Bike, title: "Contactless Delivery", description: "Get fresh, folded laundry delivered to your door.", href: "#" },
    ],
    "Our Services": [
      { icon: Shirt, title: "Wash & Fold", description: "Everyday laundry, priced by the pound.", href: "/pricing" },
      { icon: Shirt, title: "Dry Cleaning", description: "Special care for your delicate items.", href: "/pricing" },
      { icon: Sparkles, title: "Yuber Plus", description: "Subscription for savings and convenience.", href: "/pricing", popular: true },
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

               <NavigationMenuItem>
                <NavigationMenuTrigger>For Business</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] lg:w-[700px] grid-cols-3 gap-6 p-6">
                    {Object.entries(businessMegaMenuItems).map(([title, items]) => (
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
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] lg:w-[500px] grid-cols-2 gap-6 p-6">
                     {Object.entries(howItWorksMenuItems).map(([title, items]) => (
                       <div key={title}>
                          <h3 className="font-semibold text-sm text-muted-foreground mb-3">{title}</h3>
                          <ul className="space-y-1">
                            {items.map(item => (
                              <ListItem key={item.title} title={item.title} href={item.href}>
                                  {item.description}
                                </ListItem>
                            ))}
                          </ul>
                       </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), pathname === link.href ? "text-foreground" : "text-foreground/60")}>
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
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
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="personal">
                    <AccordionTrigger className="font-semibold">Personal</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4 pt-2">
                        {Object.entries(personalMegaMenuItems).map(([title, items]) => (
                          <div key={title}>
                            <h3 className="font-semibold text-sm text-muted-foreground mb-3">{title}</h3>
                            <ul className="space-y-3">
                              {items.map(item => (
                                <li key={item.title}>
                                  <Link href={item.href} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                                      <item.icon className="h-4 w-4 text-muted-foreground" />
                                      <span>{item.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="business">
                    <AccordionTrigger className="font-semibold">For Business</AccordionTrigger>
                    <AccordionContent>
                       <ul className="space-y-4 pt-2">
                        {Object.entries(businessMegaMenuItems).map(([title, items]) => (
                          <div key={title}>
                            <h3 className="font-semibold text-sm text-muted-foreground mb-3">{title}</h3>
                            <ul className="space-y-3">
                              {items.map(item => (
                                <li key={item.title}>
                                  <Link href={item.href} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                                      <item.icon className="h-4 w-4 text-muted-foreground" />
                                      <span>{item.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="how-it-works">
                    <AccordionTrigger className="font-semibold">How It Works</AccordionTrigger>
                    <AccordionContent>
                       <ul className="space-y-4 pt-2">
                        {Object.entries(howItWorksMenuItems).map(([title, items]) => (
                          <div key={title}>
                            <h3 className="font-semibold text-sm text-muted-foreground mb-3">{title}</h3>
                            <ul className="space-y-3">
                              {items.map(item => (
                                <li key={item.title}>
                                  <Link href={item.href} className="flex flex-col gap-1 text-sm font-medium hover:text-primary transition-colors">
                                      <span className="font-semibold">{item.title}</span>
                                      <span className="text-xs text-muted-foreground">{item.description}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                 <nav className="flex flex-col space-y-4 mt-4 border-t pt-4">
                    {navLinks.map((link) => (
                      <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "transition-colors hover:text-foreground/80 font-semibold",
                             pathname === link.href ? "text-foreground" : "text-foreground/80"
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
