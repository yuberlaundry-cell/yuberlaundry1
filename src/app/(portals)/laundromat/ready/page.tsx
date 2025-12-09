'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Truck, User } from 'lucide-react';

const readyForDriverOrders = [
  {
    id: '#YL12347',
    customer: 'Acme Corp',
    service: 'Wash & Fold',
    bags: 5,
    readyTime: 'Today, 2:15 PM',
    driver: 'Assigned (David L.)',
  },
];

const readyForPickupOrders = [
    {
    id: '#YL12351',
    customer: 'Walk-in Customer',
    service: 'Wash & Fold',
    bags: 2,
    readyTime: 'Today, 3:30 PM',
  },
   {
    id: '#YL12350',
    customer: 'Wonderland Inc.',
    service: 'Bedding',
    bags: 12,
    readyTime: 'Today, 3:00 PM',
  },
];

export default function ReadyForDeliveryPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Ready for Handoff
        </h1>
        <p className="text-muted-foreground">
          Coordinate handoff of completed orders to drivers and customers.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Handoff to Driver */}
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Truck className="h-6 w-6 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Handoff to Driver</h2>
            </div>
            <div className="grid gap-6">
                {readyForDriverOrders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader>
                        <CardTitle>{order.id}</CardTitle>
                        <CardDescription>{order.customer}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <p className="font-medium">{order.service}</p>
                        <p className="text-sm text-muted-foreground">{order.bags} bags</p>
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span
                            className={`text-sm ${
                                order.driver === 'Unassigned' ? 'text-amber-600' : ''
                            }`}
                            >
                            {order.driver}
                            </span>
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full">
                            <Check className="mr-2" /> Mark as Handed to Driver
                        </Button>
                        </CardFooter>
                    </Card>
                ))}
                 {readyForDriverOrders.length === 0 && (
                    <Card className="text-center text-muted-foreground py-12 border-dashed">
                        <p>No orders awaiting driver handoff.</p>
                    </Card>
                )}
            </div>
        </div>

        {/* Customer Pickup */}
        <div>
             <div className="flex items-center gap-2 mb-4">
                <User className="h-6 w-6 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Customer Pickup</h2>
            </div>
             <div className="grid gap-6">
                {readyForPickupOrders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader>
                        <CardTitle>{order.id}</CardTitle>
                        <CardDescription>{order.customer}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <p className="font-medium">{order.service}</p>
                        <p className="text-sm text-muted-foreground">{order.bags} bags</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            Ready since {order.readyTime}
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full">
                            <Check className="mr-2" /> Mark as Picked Up
                        </Button>
                        </CardFooter>
                    </Card>
                ))}
                 {readyForPickupOrders.length === 0 && (
                    <Card className="text-center text-muted-foreground py-12 border-dashed">
                        <p>No orders awaiting customer pickup.</p>
                    </Card>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
