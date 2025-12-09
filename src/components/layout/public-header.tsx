"use client";

import Link from 'next/link';
import { WashingMachine, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { UserNav } from './user-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/for-business', label: 'For Business' },
  { href: '/faq', label: 'FAQ' },
];

export function PublicHeader() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <WashingMachine className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">Yuber Laundry</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                    <WashingMachine className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Yuber Laundry</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "transition-colors hover:text-foreground/80",
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
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
