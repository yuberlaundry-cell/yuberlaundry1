
'use client';

import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { WashingMachine } from 'lucide-react';
import AdminPortalLayout from './admin/layout';
import ConsumerPortalLayout from './app/layout';
import BusinessPortalLayout from './business/layout';
import DriverPortalLayout from './driver/layout';
import LaundromatPortalLayout from './laundromat/layout';

function RootContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const portalRoutes = ['/app', '/business', '/driver', '/laundromat', '/admin'];
  const isPortalPage = portalRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    if (!loading && !user && isPortalPage) {
      // Handled by specific portal layouts, but can be a fallback.
    }
  }, [user, loading, isPortalPage, pathname]);

  if (isPortalPage) {
    if (loading || !user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <WashingMachine className="h-12 w-12 text-primary animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading your portal...</p>
        </div>
      );
    }
  }
  
  if (pathname.startsWith('/app')) {
    return <ConsumerPortalLayout>{children}</ConsumerPortalLayout>;
  }
  if (pathname.startsWith('/business')) {
    return <BusinessPortalLayout>{children}</BusinessPortalLayout>;
  }
  if (pathname.startsWith('/driver')) {
    return <DriverPortalLayout>{children}</DriverPortalLayout>;
  }
  if (pathname.startsWith('/laundromat')) {
    return <LaundromatPortalLayout>{children}</LaundromatPortalLayout>;
  }
  if (pathname.startsWith('/admin')) {
    return <AdminPortalLayout>{children}</AdminPortalLayout>;
  }

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;600&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <title>Yuber Laundry</title>
        <meta name="description" content="The modern solution for your laundry needs." />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
            <RootContent>{children}</RootContent>
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
