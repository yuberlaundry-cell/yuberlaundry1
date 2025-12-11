
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
import { Check, Crown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaystackPop from '@paystack/inline-js';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';

const subscriptionPlans = [
    {
        name: "Partner Tier 1",
        price: "1500",
        billingCycle: "monthly",
        description: "Get priority support and a featured spot on our homepage.",
        features: [
            "12% Platform Commission (vs 15%)",
            "Priority Support",
            "Featured on Homepage",
            "Basic Analytics"
        ],
        cta: "Upgrade to Tier 1",
        paystackPlanCode: 'PLN_zzzzzzzzzzzzzzz',
        popular: true
    },
    {
        name: "Partner Tier 2",
        price: "3000",
        billingCycle: "monthly",
        description: "Unlock advanced analytics and marketing tools.",
        features: [
            "10% Platform Commission",
            "Dedicated Account Manager",
            "Advanced Analytics Suite",
            "Email Marketing Tools"
        ],
        cta: "Upgrade to Tier 2",
        paystackPlanCode: 'PLN_xxxxxxxxxxxxxxx',
        popular: false
    }
]

export default function LaundromatSubscriptionPage() {
    const [currentPlan, setCurrentPlan] = useState('Free Tier');
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const { toast } = useToast();
    const { user } = useAuth();
    
    const handleSubscribe = (plan: typeof subscriptionPlans[0]) => {
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
                setCurrentPlan(plan.name);
                setIsProcessing(null);
            },
            onClose: () => {
                setIsProcessing(null);
            }
        });
    };

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Subscription</h1>
                <p className="text-muted-foreground">
                    Your current plan is: <span className="font-bold text-primary">{currentPlan}</span>
                </p>
            </div>
            
             <div className="grid md:grid-cols-2 gap-8 items-start">
                    {subscriptionPlans.map(plan => (
                        <Card key={plan.name} className={plan.popular ? "border-2 border-primary shadow-lg" : ""}>
                            {plan.popular && <Badge className="absolute -top-3 right-4">Recommended</Badge>}
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="flex items-baseline pt-4">
                                    <span className="text-4xl font-bold">R{plan.price}</span>
                                    <span className="ml-1 text-muted-foreground">/{plan.billingCycle}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button 
                                    className="w-full" 
                                    variant={plan.popular ? "default" : "outline"} 
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={isProcessing !== null || currentPlan === plan.name}
                                >
                                     {isProcessing === plan.name ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Crown className="mr-2 h-4 w-4" />}
                                     {currentPlan === plan.name ? 'Current Plan' : plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
        </div>
    );
}
