
'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Truck, User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLaundromatOrders } from '@/hooks/use-laundromat-orders';

export default function ReadyForHandoffPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { orders, updateOrderStatus } = useLaundromatOrders();
    const { toast } = useToast();

    const handleHandoff = (orderId: string, type: 'driver' | 'pickup') => {
        updateOrderStatus(orderId, 'Completed');
        if (type === 'driver') {
            toast({ title: `Order ${orderId} marked as handed to driver.` });
        } else {
            toast({ title: `Order ${orderId} marked as picked up by customer.` });
        }
    }

    const readyForDriverOrders = orders.filter(o => o.status === 'Ready');
    const readyForPickupOrders = orders.filter(o => o.status === 'Ready'); // In a real app this might be different

    const filteredDriverOrders = readyForDriverOrders.filter(
        (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPickupOrders = readyForPickupOrders.filter(
        (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );


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

       <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by Order ID or Customer Name..."
          className="w-full rounded-lg bg-background pl-10 h-12 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="driver">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="driver" className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Handoff to Driver ({filteredDriverOrders.length})
            </TabsTrigger>
            <TabsTrigger value="customer" className="flex items-center gap-2">
                <User className="h-5 w-5" /> Customer Pickup ({filteredPickupOrders.length})
            </TabsTrigger>
        </TabsList>
        <TabsContent value="driver">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredDriverOrders.map((order) => (
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
                        <Button className="w-full" onClick={() => handleHandoff(order.id, 'driver')}>
                            <Check className="mr-2" /> Mark as Handed to Driver
                        </Button>
                        </CardFooter>
                    </Card>
                ))}
                 {filteredDriverOrders.length === 0 && (
                    <Card className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-12 border-dashed">
                        <p>No orders awaiting driver handoff.</p>
                    </Card>
                )}
            </div>
        </TabsContent>
         <TabsContent value="customer">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredPickupOrders.map((order) => (
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
                        <Button className="w-full" onClick={() => handleHandoff(order.id, 'pickup')}>
                            <Check className="mr-2" /> Mark as Picked Up
                        </Button>
                        </CardFooter>
                    </Card>
                ))}
                 {filteredPickupOrders.length === 0 && (
                    <Card className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-12 border-dashed">
                        <p>No orders awaiting customer pickup.</p>
                    </Card>
                )}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
