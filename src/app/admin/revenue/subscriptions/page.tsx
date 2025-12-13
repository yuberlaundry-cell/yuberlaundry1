
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
  Truck,
  Percent,
  ToggleLeft,
  MoreVertical,
  Trash2,
  Edit,
  Building,
  ShoppingBag,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { type Plan, initialPlans } from '@/lib/plans';

const planTypeIcons = {
    Consumer: ShoppingBag,
    Business: Box,
    Laundromat: Building,
}

export default function SubscriptionsPage() {
    const [plans, setPlans] = useState(initialPlans);
    const [isEditing, setIsEditing] = useState<Plan | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleEdit = (plan: Plan) => {
        setIsEditing(plan);
        setIsDialogOpen(true);
    };
    
    const handleAddNew = () => {
        setIsEditing(null);
        setIsDialogOpen(true);
    };
    
    const handleDelete = (planName: string) => {
        setPlans(prev => prev.filter(p => p.name !== planName));
        toast({
            title: "Plan Deleted",
            description: `The "${planName}" plan has been removed.`,
            variant: "destructive"
        })
    }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Manage consumer, business, and laundromat membership tiers and benefits.
          </p>
        </div>
         <Button className="w-full sm:w-auto" onClick={handleAddNew}>
            <PlusCircle /> Add New Plan
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {plans.map((plan) => {
            const PlanIcon = planTypeIcons[plan.type];
            return (
            <Card key={plan.name} className={cn("flex flex-col h-full", !plan.active && 'bg-muted/50')}>
                {plan.popular && <Badge className="absolute -top-3 right-4">Most Popular</Badge>}
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <PlanIcon /> {plan.name}
                            </CardTitle>
                             <Badge variant="outline" className="w-fit mt-1">{plan.type}</Badge>
                        </div>
                        <Badge variant={plan.active ? 'default' : 'secondary'}>
                            {plan.active ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                    
                    <div className="flex items-baseline pt-2">
                        <span className="text-3xl font-bold">{plan.price === '0' ? 'Free' : `R${plan.price}`}</span>
                        {plan.price !== '0' && <span className="ml-1 text-muted-foreground">/{plan.billingCycle}</span>}
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="space-y-3">
                         {plan.limits.kgIncluded && (
                             <li className="flex items-center gap-3 text-sm">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Up to <span className="font-semibold text-foreground">{plan.limits.kgIncluded} kg</span> included</span>
                            </li>
                        )}
                         {plan.limits.bagsIncluded && (
                             <li className="flex items-center gap-3 text-sm">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Up to <span className="font-semibold text-foreground">{plan.limits.bagsIncluded} bags</span> per month</span>
                            </li>
                        )}
                        {plan.limits.employees && (
                             <li className="flex items-center gap-3 text-sm">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Up to <span className="font-semibold text-foreground">{plan.limits.employees} employees</span></span>
                            </li>
                        )}
                         {plan.limits.commissionOverride !== undefined && (
                             <li className="flex items-center gap-3 text-sm">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground"><span className="font-semibold text-foreground">{plan.limits.commissionOverride}%</span> platform commission</span>
                            </li>
                        )}
                         {plan.limits.deliveryFeeWaiver !== undefined && (
                             <li className="flex items-center gap-3 text-sm">
                                {plan.limits.deliveryFeeWaiver ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-muted-foreground">Delivery Fee Waiver</span>
                            </li>
                        )}
                         {plan.limits.nextDayRushWaiver !== undefined && (
                             <li className="flex items-center gap-3 text-sm">
                                {plan.limits.nextDayRushWaiver ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-muted-foreground">Next-Day Rush Waiver</span>
                            </li>
                        )}
                         {plan.limits.driverFeeWaiver !== undefined && (
                             <li className="flex items-center gap-3 text-sm">
                                {plan.limits.driverFeeWaiver ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-muted-foreground">Driver Fee Waiver</span>
                            </li>
                        )}
                         {plan.limits.platformFeeWaiver !== undefined && (
                             <li className="flex items-center gap-3 text-sm">
                                {plan.limits.platformFeeWaiver ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-muted-foreground">Platform Fee Waiver</span>
                            </li>
                        )}
                         {plan.limits.discountPercentage !== undefined && plan.limits.discountPercentage > 0 && (
                             <li className="flex items-center gap-3 text-sm">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground"><span className="font-semibold text-foreground">{plan.limits.discountPercentage}% discount</span> on all orders</span>
                            </li>
                        )}
                         {plan.limits.rollover !== undefined && (
                             <li className="flex items-center gap-3 text-sm">
                                {plan.limits.rollover ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-muted-foreground">Rollover of bags/kgs</span>
                            </li>
                        )}
                         {plan.limits.otherServicesCredit !== undefined && plan.limits.otherServicesCredit > 0 && (
                             <li className="flex items-center gap-3 text-sm">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground"><span className="font-semibold text-foreground">R{plan.limits.otherServicesCredit} credit</span> for other services</span>
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
                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    <MoreVertical className="mr-2"/> Manage Plan
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(plan)}>
                                    <Edit className="mr-2" /> Edit Plan
                                </DropdownMenuItem>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="mr-2" /> Delete Plan
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the
                                    <span className="font-bold"> {plan.name}</span> plan and may affect existing subscribers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(plan.name)}>
                                    Yes, delete plan
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
            )
        })}
      </div>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
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
    const [planType, setPlanType] = useState<'Consumer' | 'Business' | 'Laundromat' | ''>(plan?.type || '');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: plan ? "Plan Updated!" : "Plan Created!",
            description: "The subscription plan has been successfully saved.",
        });
    }

    return (
        <form className="space-y-6 max-h-[70vh] overflow-y-auto pr-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input id="plan-name" placeholder="e.g., Yuber Premium" defaultValue={plan?.name} required/>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="plan-price">Price (R)</Label>
                    <Input id="plan-price" type="number" placeholder="e.g., 990, or 0 for free" defaultValue={plan?.price} required/>
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
                        <SelectItem value="Laundromat">Laundromat</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {planType === 'Consumer' && (
                <div className="space-y-4 p-4 border bg-muted/50 rounded-lg">
                    <h4 className="font-semibold">Consumer Limits & Waivers</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="plan-kg">Kg Included</Label>
                            <Input id="plan-kg" type="number" placeholder="e.g., 30" defaultValue={plan?.limits.kgIncluded}/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="plan-bags">Bags Included (for Repeat)</Label>
                            <Input id="plan-bags" type="number" placeholder="e.g., 2" defaultValue={plan?.limits.bagsIncluded}/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="plan-discount">Discount on all orders (%)</Label>
                            <Input id="plan-discount" type="number" placeholder="e.g., 10" defaultValue={plan?.limits.discountPercentage}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan-credit">Credit for other services (R)</Label>
                            <Input id="plan-credit" type="number" placeholder="e.g., 100" defaultValue={plan?.limits.otherServicesCredit}/>
                        </div>
                    </div>
                    <Separator className="my-4"/>
                     <h4 className="font-semibold text-sm">Fee Waivers & Benefits</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="delivery-waiver" defaultChecked={plan?.limits.deliveryFeeWaiver} />
                            <Label htmlFor="delivery-waiver">Waive Delivery Fee</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="platform-waiver" defaultChecked={plan?.limits.platformFeeWaiver} />
                            <Label htmlFor="platform-waiver">Waive Platform Fee</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="rush-waiver" defaultChecked={plan?.limits.nextDayRushWaiver} />
                            <Label htmlFor="rush-waiver">Waive Next-Day Rush</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="rollover" defaultChecked={plan?.limits.rollover} />
                            <Label htmlFor="rollover">Allow Rollover</Label>
                        </div>
                    </div>
                </div>
            )}
            {planType === 'Business' && (
                <div className="space-y-4 p-4 border bg-muted/50 rounded-lg">
                    <h4 className="font-semibold">Business Limits & Waivers</h4>
                     <div className="space-y-2">
                        <Label htmlFor="plan-employees">Max Employees</Label>
                        <Input id="plan-employees" type="number" placeholder="e.g., 100" defaultValue={plan?.limits.employees}/>
                     </div>
                      <div className="space-y-2">
                        <Label htmlFor="plan-b2b-discount">Discount on all orders (%)</Label>
                        <Input id="plan-b2b-discount" type="number" placeholder="e.g., 15" defaultValue={plan?.limits.discountPercentage}/>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="b2b-driver-waiver" defaultChecked={plan?.limits.driverFeeWaiver} />
                        <Label htmlFor="b2b-driver-waiver">Waive Driver Fee</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="b2b-platform-waiver" defaultChecked={plan?.limits.platformFeeWaiver} />
                        <Label htmlFor="b2b-platform-waiver">Waive Platform Service Fee</Label>
                    </div>
                </div>
            )}
            {planType === 'Laundromat' && (
                <div className="space-y-4 p-4 border bg-muted/50 rounded-lg">
                    <h4 className="font-semibold">Laundromat Benefits</h4>
                     <div className="space-y-2">
                        <Label htmlFor="plan-commission">Platform Commission Override (%)</Label>
                        <Input id="plan-commission" type="number" placeholder="e.g., 12 (default is 15%)" defaultValue={plan?.limits.commissionOverride}/>
                     </div>
                </div>
            )}
             <Separator className="my-6"/>
             <div className="space-y-2">
                <Label htmlFor="plan-features">Additional Features (comma-separated)</Label>
                <Input id="plan-features" placeholder="Feature 1, Feature 2, ..." defaultValue={plan?.features.join(', ')} required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="paystack-plan-code">Paystack Plan Code</Label>
                <Input id="paystack-plan-code" placeholder="PLN_xxxxxxxxxxxxxxx" defaultValue={plan?.paystackPlanCode} required/>
            </div>
            <DialogFooter className="sticky bottom-0 bg-background pt-4 pb-0 -mb-6 -mx-6 px-6">
                <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                <Button type="submit">{plan ? "Save Changes" : "Create Plan"}</Button>
            </DialogFooter>
        </form>
    );
}
