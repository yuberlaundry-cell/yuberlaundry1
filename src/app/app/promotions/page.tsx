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
import { Input } from '@/components/ui/input';
import { CheckCircle, Star } from 'lucide-react';

const availablePromos = [
  {
    code: 'WELCOME20',
    description: 'Get 20% off your first order.',
  },
  {
    code: 'FRIEND5',
    description: 'Refer a friend and you both get $5 off.',
  },
];

const plusPerks = [
    "Free pickup & delivery on all orders",
    "10% discount on all services",
    "Free ironing on up to 5 items per month",
    "Next-day delivery, guaranteed",
    "Priority customer support",
]

export default function PromotionsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Promotions & Membership</h1>
        <p className="text-muted-foreground">
          Apply promo codes and manage your Plus membership.
        </p>
      </div>

      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="fill-current" /> Yuber Plus Membership
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            You are a Plus member! Enjoy your exclusive benefits.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                {plusPerks.map(perk => (
                    <li key={perk} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>{perk}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter>
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">Manage Subscription</Button>
        </CardFooter>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Redeem a Code</CardTitle>
                <CardDescription>Enter a promo code to apply it to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex space-x-2">
                    <Input placeholder="Enter code" />
                    <Button>Apply</Button>
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Available Promotions</CardTitle>
                <CardDescription>Active promotions you can use right now.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {availablePromos.map(promo => (
                    <div key={promo.code} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                        <div>
                            <p className="font-semibold text-sm">{promo.description}</p>
                            <p className="text-xs text-muted-foreground font-mono">{promo.code}</p>
                        </div>
                        <Button variant="outline" size="sm">Copy</Button>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
