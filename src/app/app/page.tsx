
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, RefreshCw, CalendarClock, Wallet, LifeBuoy, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockOrders } from "@/lib/mock-data";
import { OrderCard } from "@/components/orders/order-card";
import { LoyaltyCard } from "@/components/app/loyalty-card";
import { MonthlySpendChart } from "@/components/app/monthly-spend-chart";

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
  const recentOrders = mockOrders.slice(0, 2);

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Customer Dashboard</h1>
        <p className="text-muted-foreground">Good morning, Jane! Here's a summary of your laundry activities.</p>
      </div>

      <LoyaltyCard />
      
      <div className="grid gap-4 sm:grid-cols-2">
        {actionCards.map(card => (
            <Card key={card.title} className="hover:border-primary/80 hover:shadow-lg transition-all cursor-pointer">
                <Link href={card.href} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-4">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <card.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-base">{card.title}</CardTitle>
                        </div>
                    </CardHeader>
                </Link>
            </Card>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <MonthlySpendChart />
        </div>
        <Card className="flex flex-col items-center justify-center text-center p-6 bg-accent/10 border-accent/30">
            <div className="p-3 bg-background rounded-full border mb-3">
                <Zap className="h-6 w-6 text-accent" />
            </div>
            <p className="text-3xl font-bold font-headline">18.5 hours</p>
            <p className="text-muted-foreground">of life returned to you 🙌</p>
        </Card>
      </div>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent orders</CardTitle>
             <Button variant="link" size="sm" asChild>
                <Link href="/app/orders">View all</Link>
            </Button>
        </CardHeader>
        <CardContent>
            {recentOrders.length > 0 ? (
                 <div className="grid sm:grid-cols-2 gap-6">
                    {recentOrders.map(order => <OrderCard key={order.id} order={order} />)}
                </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No recent orders found.</p>
                </div>
            )}
        </CardContent>
      </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Promotions</CardTitle>
                <Button variant="link" size="sm" asChild><Link href="/app/promotions">View all offers</Link></Button>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-8">
                <p>No active promotions available.</p>
            </CardContent>
        </Card>
    </div>
  );
}
