
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  User,
  Truck,
  Building,
  CreditCard,
  FileText,
  MessageSquare,
  XCircle,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockOrders } from '@/lib/mock-data';
import { OrderStatusTimeline } from '@/components/orders/order-status-timeline';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const statusColors: { [key: string]: string } = {
  upcoming: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = `#${params.id}`;
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" asChild className="-ml-4">
            <Link href="/admin/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <div className="flex items-center gap-2 mt-2">
            <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
              Order {order.id}
            </h1>
            <Badge
              variant="secondary"
              className={statusColors[order.statusCategory]}
            >
              {order.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline"><XCircle className="mr-2 h-4 w-4" /> Cancel</Button>
            <Button>Refund</Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Re-assign Driver</DropdownMenuItem>
                    <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <OrderStatusTimeline timeline={order.timeline} />
          <Card>
            <CardHeader>
              <CardTitle>Financials</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableRow>
                  <TableHead>Subtotal</TableHead>
                  <TableCell className="text-right">{order.payment.subtotal}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableHead>Service Fee</TableHead>
                  <TableCell className="text-right">{order.payment.serviceFee}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableHead className="font-bold">Total</TableHead>
                  <TableCell className="text-right font-bold">{order.price}</TableCell>
                </TableRow>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User /> Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/seed/cust1/40/40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">
                    jane.doe@example.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck /> Driver
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.driver ? (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={order.driver.avatarUrl} />
                    <AvatarFallback>
                      {order.driver.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{order.driver.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.driver.vehicle}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No driver assigned</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building /> Laundromat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Speedy Suds</p>
              <p className="text-sm text-muted-foreground">London, UK</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
