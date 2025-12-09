"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WashingMachine } from "lucide-react";

export default function PortalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
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

  return <>{children}</>;
}
