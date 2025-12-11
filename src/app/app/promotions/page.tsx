
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
import { Check, Crown, RefreshCw, Star } from 'lucide-react';

export default function PromotionsPage() {
    const isSubscribed = true;
    
    if (!isSubscribed) {
        return (
             <div className="space-y-8 pb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">My Subscriptions</h1>
                    <p className="text-muted-foreground">
                    Manage your recurring laundry plans.
                    </p>
                </div>
                <Card className="flex items-center justify-center h-96">
                    <CardContent className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-secondary rounded-full p-4">
                                <RefreshCw className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold">No Subscriptions Found</h2>
                        <p className="text-muted-foreground mt-2 mb-4">
                            You don't have any active recurring orders.
                        </p>
                        <Button>Set up a recurring order</Button>
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
