
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
import { CheckCircle, Star, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
    const { toast } = useToast();

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({
        title: "Copied to clipboard!",
        description: `Promo code ${code} has been copied.`,
        });
    };

    const handleRedeem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem('promo-code') as HTMLInputElement;
        const code = input.value;

        if (code) {
            toast({
                title: "Code Applied!",
                description: `The promo code ${code.toUpperCase()} has been added to your account.`,
            });
            input.value = '';
        } else {
             toast({
                variant: 'destructive',
                title: "No code entered",
                description: "Please enter a promo code to apply.",
            });
        }
    }


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
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">Manage Subscription</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Manage Yuber Plus</DialogTitle>
                        <DialogDescription>
                           Here you can view your plan details, billing history, or cancel your subscription.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Subscription management interface coming soon.</p>
                    </div>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Redeem a Code</CardTitle>
                <CardDescription>Enter a promo code to apply it to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form className="flex space-x-2" onSubmit={handleRedeem}>
                    <Input name="promo-code" placeholder="Enter code" />
                    <Button type="submit">Apply</Button>
                </form>
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
                        <div className='flex items-center gap-3'>
                            <Ticket className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-semibold text-sm">{promo.description}</p>
                                <p className="text-xs text-muted-foreground font-mono">{promo.code}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(promo.code)}>Copy</Button>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
