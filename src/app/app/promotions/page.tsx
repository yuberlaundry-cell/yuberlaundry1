
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
import { Check, Crown, RefreshCw, Star, Loader2, Tag, Gift } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaystackPop from '@paystack/inline-js';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const availableOffers = [
    { title: "20% Off First Dry Cleaning Order", code: "DRYCLEAN20", description: "Get 20% off your first dry cleaning order.", icon: Tag },
    { title: "Refer a Friend, Get R100", code: "REFER100", description: "Give friends R100 off their first order, and you get R100.", icon: Gift },
];

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

    const handleApplyCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const code = formData.get('promo-code') as string;
        toast({
            title: 'Promo Code Applied!',
            description: `Code "${code}" has been successfully applied to your account.`,
        });
        (e.currentTarget as HTMLFormElement).reset();
    };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Promotions & Subscriptions</h1>
        <p className="text-muted-foreground">
          Upgrade your plan and discover available offers.
        </p>
      </div>

       <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    {isSubscribed ? 'Yuber Plus Member' : 'Upgrade to Yuber Plus'}
                </CardTitle>
                <CardDescription>
                    {isSubscribed 
                        ? "You're enjoying the best of Yuber Laundry." 
                        : "Unlock savings and premium features with a subscription."
                    }
                </CardDescription>
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
                {isSubscribed && (
                    <div className="p-4 bg-muted/50 rounded-lg text-sm">
                        <p>Your plan renews on <span className="font-semibold">June 1, 2024</span>.</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex-wrap gap-2">
                {isSubscribed ? (
                    <Button variant="outline">Manage Subscription</Button>
                ) : (
                    <Button onClick={handleSubscribe} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Crown className="mr-2 h-4 w-4" />}
                        {isProcessing ? 'Processing...' : 'Subscribe to Yuber Plus (R450/month)'}
                    </Button>
                )}
            </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Redeem a Voucher</CardTitle>
                <CardDescription>Have a promo code? Apply it to your account here.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form className="flex gap-2" onSubmit={handleApplyCode}>
                    <Input id="promo-code" name="promo-code" placeholder="Enter your code" />
                    <Button type="submit">Apply Code</Button>
                </form>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Available Offers</CardTitle>
                <CardDescription>Special discounts and offers for you.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
                {availableOffers.map(offer => (
                    <Card key={offer.title} className="p-4 flex flex-col">
                        <div className="flex items-start gap-3">
                            <offer.icon className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">{offer.title}</h3>
                                <p className="text-sm text-muted-foreground">{offer.description}</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" className="mt-4 w-fit ml-auto" onClick={() => {
                            toast({ title: 'Copied to clipboard!', description: `Code ${offer.code} copied.`});
                            navigator.clipboard.writeText(offer.code);
                        }}>
                           Code: {offer.code}
                        </Button>
                    </Card>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
