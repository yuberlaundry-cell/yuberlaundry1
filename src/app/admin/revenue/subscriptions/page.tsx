
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
import {
  Crown,
  PlusCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const plans = [
    {
        name: "Yuber Plus",
        price: "$45",
        billingCycle: "monthly",
        features: [
            "Up to 30 lbs included",
            "Free pickup & delivery",
            "Premium detergents",
            "Next-day turnaround"
        ],
        active: true,
    },
    {
        name: "Plus Annual",
        price: "$450",
        billingCycle: "yearly",
        features: [
            "All Yuber Plus benefits",
            "12 months for the price of 10",
            "Dedicated support line",
        ],
        active: true,
    },
     {
        name: "Yuber Lite (Legacy)",
        price: "$25",
        billingCycle: "monthly",
        features: [
            "Up to 15 lbs included",
            "Discounted delivery",
        ],
        active: false,
    }
]

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Manage consumer membership tiers and benefits.
          </p>
        </div>
         <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <PlusCircle /> Add New Plan
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Subscription Plan</DialogTitle>
                    <DialogDescription>
                        Define a new membership tier for customers. This must correspond to an existing plan in Paystack.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="plan-name">Plan Name</Label>
                        <Input id="plan-name" placeholder="e.g., Yuber Premium" required/>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="plan-price">Price ($)</Label>
                            <Input id="plan-price" type="number" placeholder="e.g., 99" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan-cycle">Billing Cycle</Label>
                             <Select name="billing-cycle" required>
                                <SelectTrigger id="plan-cycle">
                                    <SelectValue placeholder="Select interval" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="biannually">Biannually</SelectItem>
                                    <SelectItem value="annually">Annually</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="plan-features">Features (comma-separated)</Label>
                        <Input id="plan-features" placeholder="Feature 1, Feature 2, ..." required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paystack-plan-code">Paystack Plan Code</Label>
                        <Input id="paystack-plan-code" placeholder="PLN_xxxxxxxxxxxxxxx" required/>
                    </div>
                    <Button type="submit" className="w-full">Create Plan</Button>
                </form>
            </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {plans.map((plan) => (
            <Card key={plan.name} className={!plan.active ? 'bg-muted/50' : ''}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                            <Crown /> {plan.name}
                        </CardTitle>
                        <Badge variant={plan.active ? 'default' : 'secondary'}>
                            {plan.active ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                    <div className="flex items-baseline pt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
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
                    <Button variant="outline" className="w-full">Edit Plan</Button>
                </CardFooter>
            </Card>
        ))}
      </div>

    </div>
  );
}
