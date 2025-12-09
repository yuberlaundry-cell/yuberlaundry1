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
import { Check, Truck } from 'lucide-react';

const readyOrders = [
  {
    id: '#YL12347',
    customer: 'Acme Corp',
    service: 'Wash & Fold',
    bags: 5,
    readyTime: 'Today, 2:15 PM',
    driver: 'Assigned (David L.)',
  },
  {
    id: '#YL12350',
    customer: 'Wonderland Inc.',
    service: 'Bedding',
    bags: 12,
    readyTime: 'Today, 3:00 PM',
    driver: 'Unassigned',
  },
];

export default function ReadyForDeliveryPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Ready for Delivery
        </h1>
        <p className="text-muted-foreground">
          Coordinate handoff of completed orders to drivers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {readyOrders.map((order) => (
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
      </div>
    </div>
  );
}
