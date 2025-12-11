
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, RefreshCw, Star, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaystackPop from '@paystack/inline-js';
import { useAuth } from '@/hooks/use-auth';

export default function PromotionsPage() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    const { user } = useAuth();
    
    const handleSubscribe = () => {
        setIsProcessing(true);
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
            email: user?.email || '',
            amount: 450 * 100, // R450 in kobo
            currency: 'ZAR',
            plan: '', // In a real app, you would have a Paystack Plan Code here
            reference: `yuber_sub_${Date.now()}`,
            onSuccess: () => {
                toast({ title: 'Subscription Successful!', description: 'Welcome to Yuber Plus!' });
                setIsSubscribed(true);
                setIsProcessing(false);
            },
            onClose: () => {
                setIsProcessing(false);
            }
        });
    };

    if (!isSubscribed) {
        return (
             <div className="space-y-8 pb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">My Subscriptions</h1>
                    <p className="text-muted-foreground">
                    Manage your recurring laundry plans.
                    </p>
                </div>
                <Card className="flex flex-col items-center justify-center h-96 text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-secondary rounded-full p-4">
                                <RefreshCw className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold">No Subscriptions Found</h2>
                        <p className="text-muted-foreground mt-2 mb-4">
                            You don't have any active recurring orders. Why not upgrade to Yuber Plus?
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleSubscribe} disabled={isProcessing}>
                            {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Crown className="mr-2 h-4 w-4" />}
                            {isProcessing ? 'Processing...' : 'Subscribe to Yuber Plus'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Subscriptions</h1>
        <p className="text-muted-foreground">
          Manage your recurring laundry plans.
        </p>
      </div>

       <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    Yuber Plus Member
                </CardTitle>
                <CardDescription>Your current subscription plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Up to 30 kg included per month</span>
                    </li>
                     <li className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Free pickup & delivery</span>
                    </li>
                     <li className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Premium detergents</span>
                    </li>
                     <li className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Next-day turnaround</span>
                    </li>
                </ul>
                <div className="p-4 bg-muted/50 rounded-lg text-sm">
                    <p>Your plan renews on <span className="font-semibold">June 1, 2024</span>.</p>
                </div>
            </CardContent>
            <CardFooter className="flex-wrap gap-2">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Manage Subscription</Button>
            </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Available Offers</CardTitle>
                <CardDescription>Special discounts and offers for you.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <p>No other offers available right now.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
