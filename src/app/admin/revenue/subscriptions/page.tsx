
'use client';

import React, { useState } from 'react';
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
  Users,
  Box,
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
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Plan {
    name: string;
    price: string;
    billingCycle: string;
    features: string[];
    active: boolean;
    type: 'Consumer' | 'Business';
    limits: {
        employees?: number;
        kgIncluded?: number;
        monthlyAllowance?: number;
        perOrderLimit?: number;
    }
}

const initialPlans: Plan[] = [
    {
        name: "Yuber Plus",
        price: "R450",
        billingCycle: "monthly",
        features: [
            "Free pickup & delivery",
            "Premium detergents",
            "Next-day turnaround"
        ],
        active: true,
        type: 'Consumer',
        limits: {
            kgIncluded: 30
        }
    },
    {
        name: "Business Pro",
        price: "R5000",
        billingCycle: "monthly",
        features: [
            "Centralized billing",
            "Usage reports",
            "Dedicated support"
        ],
        active: true,
        type: 'Business',
        limits: {
            employees: 100,
            monthlyAllowance: 2000,
            perOrderLimit: 500,
        }
    },
     {
        name: "Yuber Lite (Legacy)",
        price: "R250",
        billingCycle: "monthly",
        features: [
            "Discounted delivery",
        ],
        active: false,
        type: 'Consumer',
        limits: {
            kgIncluded: 15
        }
    }
]

export default function SubscriptionsPage() {
    const [plans, setPlans] = useState(initialPlans);
    const [isEditing, setIsEditing] = useState<Plan | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEdit = (plan: Plan) => {
        setIsEditing(plan);
        setIsDialogOpen(true);
    };
    
    const handleAddNew = () => {
        setIsEditing(null);
        setIsDialogOpen(true);
    };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Manage consumer and business membership tiers and benefits.
          </p>
        </div>
         <Button className="w-full sm:w-auto" onClick={handleAddNew}>
            <PlusCircle /> Add New Plan
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col h-full ${!plan.active ? 'bg-muted/50' : ''}`}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                            <Crown /> {plan.name}
                        </CardTitle>
                        <Badge variant={plan.active ? 'default' : 'secondary'}>
                            {plan.active ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                     <Badge variant="outline" className="w-fit">{plan.type}</Badge>
                    <div className="flex items-baseline pt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="ml-1 text-muted-foreground">/{plan.billingCycle}</span>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="space-y-3">
                        {plan.limits.kgIncluded && (
                             <li className="flex items-center gap-3 text-sm">
                                <Box className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Up to <span className="font-semibold text-foreground">{plan.limits.kgIncluded} kg</span> included</span>
                            </li>
                        )}
                        {plan.limits.employees && (
                             <li className="flex items-center gap-3 text-sm">
                                <Users className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Up to <span className="font-semibold text-foreground">{plan.limits.employees} employees</span></span>
                            </li>
                        )}
                        {plan.features.map(feature => (
                            <li key={feature} className="flex items-center gap-3 text-sm">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleEdit(plan)}>Edit Plan</Button>
                </CardFooter>
            </Card>
        ))}
      </div>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
                <DialogTitle>{isEditing ? 'Edit Subscription Plan' : 'Create a New Subscription Plan'}</DialogTitle>
                <DialogDescription>
                    Define a new membership tier. This must correspond to an existing plan in Paystack.
                </DialogDescription>
            </DialogHeader>
            <SubscriptionForm plan={isEditing} />
          </DialogContent>
        </Dialog>
    </div>
  );
}

function SubscriptionForm({ plan }: { plan: Plan | null }) {
    const [planType, setPlanType] = useState<'Consumer' | 'Business' | ''>(plan?.type || '');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: plan ? "Plan Updated!" : "Plan Created!",
            description: "The subscription plan has been successfully saved.",
        });
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input id="plan-name" placeholder="e.g., Yuber Premium" defaultValue={plan?.name} required/>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="plan-price">Price (R)</Label>
                    <Input id="plan-price" type="number" placeholder="e.g., 990" defaultValue={plan?.price.replace('R','')} required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="plan-cycle">Billing Cycle</Label>
                     <Select name="billing-cycle" defaultValue={plan?.billingCycle} required>
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
                <Label htmlFor="plan-type">Plan Type</Label>
                <Select value={planType} onValueChange={(value) => setPlanType(value as any)} required>
                    <SelectTrigger id="plan-type">
                        <SelectValue placeholder="Select plan type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Consumer">Consumer</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {planType === 'Consumer' && (
                <div className="space-y-2 p-4 border bg-muted/50 rounded-lg">
                    <Label htmlFor="plan-kg">Kg Included</Label>
                    <Input id="plan-kg" type="number" placeholder="e.g., 30" defaultValue={plan?.limits.kgIncluded}/>
                </div>
            )}
            {planType === 'Business' && (
                <div className="space-y-4 p-4 border bg-muted/50 rounded-lg">
                     <div className="space-y-2">
                        <Label htmlFor="plan-employees">Max Employees</Label>
                        <Input id="plan-employees" type="number" placeholder="e.g., 100" defaultValue={plan?.limits.employees}/>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="plan-allowance">Default Monthly Allowance (R)</Label>
                        <Input id="plan-allowance" type="number" placeholder="e.g., 2000" defaultValue={plan?.limits.monthlyAllowance}/>
                     </div>
                      <div className="space-y-2">
                        <Label htmlFor="plan-order-limit">Default Per-Order Limit (R)</Label>
                        <Input id="plan-order-limit" type="number" placeholder="e.g., 500" defaultValue={plan?.limits.perOrderLimit}/>
                     </div>
                </div>
            )}
             <div className="space-y-2">
                <Label htmlFor="plan-features">Features (comma-separated)</Label>
                <Input id="plan-features" placeholder="Feature 1, Feature 2, ..." defaultValue={plan?.features.join(', ')} required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="paystack-plan-code">Paystack Plan Code</Label>
                <Input id="paystack-plan-code" placeholder="PLN_xxxxxxxxxxxxxxx" required/>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                <Button type="submit">{plan ? "Save Changes" : "Create Plan"}</Button>
            </DialogFooter>
        </form>
    );
}

    