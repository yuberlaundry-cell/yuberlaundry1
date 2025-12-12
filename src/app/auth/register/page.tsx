
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Briefcase, HardHat, User, WashingMachine } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { platformName } from '@/lib/branding';

const roles = [
    {
        name: "I want to wash my clothes",
        description: "For personal laundry and dry cleaning.",
        icon: User,
        role: "customer",
        href: "/auth/register/customer"
    },
    {
        name: "I have a business",
        description: "On-demand laundry for linens, towels, uniforms, and more—built for your industry.",
        icon: Briefcase,
        role: "business",
        href: "/auth/register/business"
    },
     {
        name: "I want to drive",
        description: "Earn money collecting and delivering laundry.",
        icon: HardHat,
        role: "driver",
        href: "/driver/onboarding"
    },
    {
        name: "I have a laundromat",
        description: "Partner with us to grow your business.",
        icon: WashingMachine,
        role: "laundromat",
        href: "/admin/laundromats/new"
    }
]

export default function RegisterPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <div className="w-full max-w-md">
           <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-headline">Join {platformName}</h1>
              <p className="text-muted-foreground">How would you like to use our service?</p>
            </div>
            <div className="space-y-4">
                {roles.map(role => (
                    <Card 
                        key={role.role}
                        className="p-4 cursor-pointer hover:bg-muted/50 hover:shadow-lg transition-all"
                        onClick={() => router.push(role.href)}
                    >
                        <div className="flex items-center gap-4">
                             <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                <role.icon className="h-6 w-6"/>
                            </div>
                            <div>
                                <p className="font-semibold">{role.name}</p>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
             <div className="mt-8 text-center text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="underline font-semibold text-primary">
                    Log in
                </Link>
            </div>
       </div>
    </div>
  );
}
