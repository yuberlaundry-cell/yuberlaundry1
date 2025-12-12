
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, RefreshCw, CalendarClock, Wallet, LifeBuoy, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockOrders } from "@/lib/mock-data";
import { OrderCard } from "@/components/orders/order-card";
import { LoyaltyCard } from "@/components/app/loyalty-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookingFlow } from "@/components/booking/booking-flow";

const actionCards = [
    {
        id: "book-new",
        title: "Book New Order",
        description: "Place a one-time order",
        icon: ShoppingCart,
        href: "/app/wallet" // Placeholder, logic is handled differently
    },
    {
        id: "reorder",
        title: "Reorder Last",
        description: "Repeat your last order",
        icon: RefreshCw,
        href: "#"
    },
    {
        id: "schedule",
        title: "Schedule Recurring",
        description: "Set up a regular pickup",
        icon: CalendarClock,
        href: "#"
    },
    {
        id: "add-funds",
        title: "Add Funds",
        description: "Top up your wallet",
        icon: Wallet,
        href: "/app/wallet"
    }
];

export default function ConsumerDashboard() {
  const router = useRouter();
  const recentOrders = mockOrders.slice(0, 2);

  const renderActionCardContent = (card: typeof actionCards[0]) => (
    <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-row items-center gap-3 space-y-0">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <card.icon className="h-5 w-5" />
            </div>
            <div>
                <CardTitle className="text-base">{card.title}</CardTitle>
            </div>
        </div>
    </CardContent>
  );

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Customer Dashboard</h1>
        <p className="text-muted-foreground">Good morning, Jane! Here's a summary of your laundry activities.</p>
      </div>

      <LoyaltyCard />
      
      <Dialog>
        <div className="grid gap-4 sm:grid-cols-2">
          {actionCards.map(card => {
              if (card.id === 'add-funds') {
                  return (
                      <Card key={card.id} className="hover:border-primary/80 hover:shadow-lg transition-all cursor-pointer">
                          <Link href={card.href} className="flex flex-col h-full">
                              {renderActionCardContent(card)}
                          </Link>
                      </Card>
                  )
              }
              return (
                  <DialogTrigger asChild key={card.id}>
                      <Card className="hover:border-primary/80 hover:shadow-lg transition-all cursor-pointer">
                          {renderActionCardContent(card)}
                      </Card>
                  </DialogTrigger>
              )
          })}
        </div>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
              <DialogHeader className="p-6 pb-0 sr-only">
                <DialogTitle>Book your laundry</DialogTitle>
                <DialogDescription>
                    Configure your laundry order and schedule a pickup.
                </DialogDescription>
              </DialogHeader>
              <BookingFlow />
        </DialogContent>
      </Dialog>
      
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
