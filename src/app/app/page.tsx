
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, RefreshCw, CalendarClock, Wallet, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const actionCards = [
    {
        title: "Book New Order",
        description: "Place a one-time order",
        icon: ShoppingCart,
        href: "/app/book/address"
    },
    {
        title: "Reorder Last",
        description: "Repeat your last order",
        icon: RefreshCw,
        href: "#"
    },
    {
        title: "Schedule Recurring",
        description: "Set up a regular pickup",
        icon: CalendarClock,
        href: "#"
    },
    {
        title: "Add Funds",
        description: "Top up your wallet",
        icon: Wallet,
        href: "/app/wallet"
    }
];

export default function ConsumerDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Customer Dashboard</h1>
        <p className="text-muted-foreground">Good morning, super! Here's a summary of your laundry activities.</p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actionCards.map(card => (
            <Card key={card.title} className="hover:border-primary/80 hover:shadow-sm transition-all">
                <Link href={card.href} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            <card.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-base">{card.title}</CardTitle>
                            <CardDescription className="text-xs">{card.description}</CardDescription>
                        </div>
                    </CardHeader>
                </Link>
            </Card>
        ))}
      </div>

       <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Wallet</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-6 items-center">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-2xl font-bold">R15.50</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">Referral Credits</p>
                    <p className="text-2xl font-bold">R0.00</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">Loyalty Points</p>
                    <p className="text-2xl font-bold">0 pts</p>
                </div>
            </CardContent>
             <CardFooter className="flex-wrap gap-2 border-t pt-4">
                <Button>Add Funds</Button>
                <Button variant="outline">View History</Button>
             </CardFooter>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Promotions</CardTitle>
                <Button variant="link" asChild><Link href="#">View all offers</Link></Button>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-8">
                <p>No active promotions.</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent orders</CardTitle>
             <Button variant="link" asChild>
                <Link href="/app/orders">View all</Link>
            </Button>
        </CardHeader>
        <CardContent>
            <div className="text-center py-8 text-muted-foreground">
                <p>No recent orders found.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
