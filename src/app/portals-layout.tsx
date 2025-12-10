"use client";

import { useAuth } from "@/hooks/use-auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { WashingMachine } from "lucide-react";
import AdminPortalLayout from "./admin/layout";
import ConsumerPortalLayout from "./app/layout";
import BusinessPortalLayout from "./business/layout";
import DriverPortalLayout from "./driver/layout";
import LaundromatPortalLayout from "./laundromat/layout";

export function PortalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const portalRoutes = ['/app', '/business', '/driver', '/laundromat', '/admin'];
  const isPortalPage = portalRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    if (!loading && !user && isPortalPage) {
      router.push('/auth/login');
    }
  }, [user, loading, router, isPortalPage, pathname]);

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
    return <DriverPortalLayout>{children}</DriverPortalLayout>
  }
   if (pathname.startsWith('/laundromat')) {
    return <LaundromatPortalLayout>{children}</LaundromatPortalLayout>;
  }
   if (pathname.startsWith('/admin')) {
    return <AdminPortalLayout>{children}</AdminPortalLayout>;
  }


  return <>{children}</>;
}
