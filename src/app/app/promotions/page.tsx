
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
import { Check, Crown, Loader2, Tag, Gift } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaystackPop from '@paystack/inline-js';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { initialPlans, type Plan } from '@/lib/plans';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const availableOffers = [
    { title: "20% Off First Dry Cleaning Order", code: "DRYCLEAN20", description: "Get 20% off your first dry cleaning order.", icon: Tag },
    { title: "Refer a Friend, Get R100", code: "REFER100", description: "Give friends R100 off their first order, and you get R100.", icon: Gift },
];

export default function PromotionsPage() {
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(initialPlans.find(p => p.name === 'Yuber Repeat (2 Bags)') || null);
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const { toast } = useToast();
    const { user } = useAuth();
    
    const handleSubscribe = (plan: Plan) => {
        setIsProcessing(plan.name);
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
            email: user?.email || '',
            amount: parseInt(plan.price) * 100, 
            currency: 'ZAR',
            plan: plan.paystackPlanCode,
            reference: `yuber_sub_${user?.id}_${Date.now()}`,
            onSuccess: () => {
                toast({ title: 'Subscription Successful!', description: `Welcome to ${plan.name}!` });
                setCurrentPlan(plan);
                setIsProcessing(null);
            },
            onClose: () => {
                setIsProcessing(null);
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

    const consumerPlans = initialPlans.filter(p => p.type === 'Consumer' && p.active && !p.name.includes('Legacy'));

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Promotions & Subscriptions</h1>
        <p className="text-muted-foreground">
          Upgrade your plan and discover available offers.
        </p>
      </div>
      
       {currentPlan && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Crown className="h-6 w-6 text-yellow-500" />
                        Your Current Plan
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                        <p className="font-bold text-lg text-primary">{currentPlan.name}</p>
                        <p className="text-sm text-muted-foreground">Your plan renews on <span className="font-semibold">June 1, 2024</span>.</p>
                         <Button variant="outline" size="sm" className="mt-4">Manage Subscription</Button>
                    </div>
                </CardContent>
            </Card>
        )}

       <Card>
            <CardHeader>
                <CardTitle>Upgrade Your Plan</CardTitle>
                <CardDescription>Unlock savings and premium features with a subscription.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consumerPlans.map(plan => (
                    <Card key={plan.name} className={cn("flex flex-col", plan.popular ? "border-2 border-primary" : "")}>
                        {plan.popular && <Badge className="absolute -top-3 right-4">Most Popular</Badge>}
                        <CardHeader>
                            <CardTitle>{plan.name.replace('Yuber Repeat ', '')}</CardTitle>
                            <div className="flex items-baseline pt-2">
                                <span className="text-3xl font-bold">R{plan.price}</span>
                                <span className="ml-1 text-muted-foreground">/month</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <ul className="space-y-3">
                                {plan.limits.bagsIncluded && <li className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{plan.limits.bagsIncluded} bag(s)/month</span></li>}
                                {plan.limits.deliveryFeeWaiver && <li className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Free delivery</span></li>}
                                {plan.limits.nextDayRushWaiver && <li className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Free next-day rush</span></li>}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full"
                                variant={plan.name === currentPlan?.name ? "secondary" : "default"}
                                onClick={() => handleSubscribe(plan)}
                                disabled={isProcessing !== null || plan.name === currentPlan?.name}
                            >
                                {isProcessing === plan.name ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {plan.name === currentPlan?.name ? 'Current Plan' : 'Choose Plan'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
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

