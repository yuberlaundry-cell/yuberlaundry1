
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Package } from 'lucide-react';
import Link from 'next/link';
import { useLaundromatOrders } from '@/hooks/use-laundromat-orders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function IntakePage() {
  const { orders, updateOrderStatus } = useLaundromatOrders();
  const { toast } = useToast();
  const router = useRouter();
  const awaitingOrders = orders.filter(o => o.status === 'Intake');

  const handleStartProcessing = (orderId: string) => {
    updateOrderStatus(orderId, 'Washing');
    toast({
      title: 'Order Sent to Processing',
      description: `${orderId} is now in the 'Washing' queue.`,
    });
  }

  const getOrderWeight = (order: typeof orders[0]) => {
      if (!order.items) return 'N/A';
      const weight = order.items.reduce((acc, item) => {
          if (item.model === 'per_kg') {
              return acc + item.value;
          }
          return acc;
      }, 0);
      return weight > 0 ? `${weight.toFixed(2)} kg` : 'N/A';
  }

  const getOrderSource = (order: typeof orders[0]) => {
      return order.id.startsWith('#W-') ? 'Walk-in' : 'Driver';
  }

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Order Intake</h1>
        <p className="text-muted-foreground">
          Check-in driver drop-offs, customer drop-offs, and walk-ins.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start New Intake</CardTitle>
          <CardDescription>
            Begin the check-in process for any type of order drop-off.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full h-12 text-base" asChild>
            <Link href="/laundromat/intake/new">
                <PlusCircle className="mr-2" /> Start Intake
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Awaiting Processing ({awaitingOrders.length})</CardTitle>
          <CardDescription>
            These orders have been checked in and are ready to be moved to the washing stage.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {awaitingOrders.length > 0 ? (
                <div className="space-y-4">
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Order ID</TableHead>
                                  <TableHead>Customer</TableHead>
                                  <TableHead>Service</TableHead>
                                  <TableHead>Weight (kg)</TableHead>
                                  <TableHead>Source</TableHead>
                                  <TableHead>SLA</TableHead>
                                  <TableHead><span className="sr-only">Actions</span></TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {awaitingOrders.map(order => (
                                  <TableRow key={order.id}>
                                      <TableCell className="font-medium cursor-pointer hover:underline" onClick={() => router.push(`/laundromat/orders/${order.id.replace('#', '')}`)}>{order.id}</TableCell>
                                      <TableCell>{order.customer}</TableCell>
                                      <TableCell>{order.service}</TableCell>
                                      <TableCell>{getOrderWeight(order)}</TableCell>
                                      <TableCell>
                                        <Badge variant={getOrderSource(order) === 'Driver' ? 'default' : 'secondary'}>
                                          {getOrderSource(order)}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant={order.sla.includes('Due') ? 'destructive' : 'outline'}>{order.sla}</Badge>
                                      </TableCell>
                                      <TableCell className="text-right">
                                          <Button size="sm" onClick={() => handleStartProcessing(order.id)}>Start Processing</Button>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </div>
                  {/* Mobile Cards */}
                  <div className="space-y-4 md:hidden">
                    {awaitingOrders.map(order => (
                      <Card key={order.id}>
                        <CardHeader>
                          <CardTitle className="text-base cursor-pointer hover:underline" onClick={() => router.push(`/laundromat/orders/${order.id.replace('#', '')}`)}>{order.id}</CardTitle>
                          <CardDescription>{order.customer}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                           <p><span className="font-medium">Service:</span> {order.service}</p>
                           <p><span className="font-medium">Weight:</span> {getOrderWeight(order)}</p>
                           <p><span className="font-medium">Source:</span>
                              <Badge variant={getOrderSource(order) === 'Driver' ? 'default' : 'secondary'} className="ml-2">
                                {getOrderSource(order)}
                              </Badge>
                           </p>
                           <p><span className="font-medium">SLA:</span>
                                <Badge variant={order.sla.includes('Due') ? 'destructive' : 'outline'} className="ml-2">{order.sla}</Badge>
                           </p>
                           <Button className="w-full mt-2" size="sm" onClick={() => handleStartProcessing(order.id)}>Start Processing</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <div className="flex justify-center mb-4">
                        <div className="bg-secondary rounded-full p-4">
                            <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold">No orders are awaiting processing.</h3>
                    <p className="text-muted-foreground">Complete an intake to see orders appear here.</p>
                </div>
            )}
        </CardContent>
      </Card>

    </div>
  );
}
