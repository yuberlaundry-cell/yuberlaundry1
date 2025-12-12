
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneNumberInput } from '@/components/ui/phone-number-input';
import { User, WashingMachine } from 'lucide-react';
import Link from 'next/link';

export default function RegisterCustomerPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
             <div className="bg-primary/10 rounded-full p-3 text-primary">
                <User size={32} />
             </div>
          </div>
          <CardTitle className="font-headline text-2xl">Create Your Account</CardTitle>
          <CardDescription>Get started with Yuber Laundry today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneNumberInput />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Create Account & Book
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
