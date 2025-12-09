'use client';

import { useAuth } from '@/hooks/use-auth';
import { UserRole, getRedirectPathForRole } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WashingMachine } from 'lucide-react';
import Link from 'next/link';

const roles: UserRole[] = ['consumer', 'business_admin', 'business_employee', 'driver', 'laundromat_staff', 'superadmin'];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: UserRole) => {
    login(role);
    const redirectPath = getRedirectPathForRole(role);
    router.push(redirectPath);
  };

  const toTitleCase = (str: string) => {
    return str.replace(/_/g, ' ').replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
            <Link href="/">&larr; Back to Home</Link>
        </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
             <div className="bg-primary rounded-full p-3 text-primary-foreground">
                <WashingMachine size={32} />
             </div>
          </div>
          <CardTitle className="font-headline text-2xl">Yuber Laundry Demo</CardTitle>
          <CardDescription>Select a role to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {roles.map((role) => (
              <Button
                key={role}
                variant="outline"
                className="w-full"
                onClick={() => handleLogin(role)}
              >
                Login as {toTitleCase(role)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
