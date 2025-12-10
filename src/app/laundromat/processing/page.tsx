
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
import { MoreHorizontal, CheckSquare, Wind, Droplets, Package } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const columns = [
  {
    id: 'washing',
    title: 'Washing',
    icon: Droplets,
    orders: [
      {
        id: '#YL12345',
        customer: 'Jane Doe',
        service: 'Wash & Fold',
        sla: 'Due in 3h',
      },
    ],
  },
  {
    id: 'drying',
    title: 'Drying',
    icon: Wind,
    orders: [
      {
        id: '#YL12348',
        customer: 'Peter Pan',
        service: 'Ironing',
        sla: 'Due in 5h',
      },
    ],
  },
  {
    id: 'folding-qc',
    title: 'Folding & QC',
    icon: CheckSquare,
    orders: [
      {
        id: '#YL12346',
        customer: 'John Smith',
        service: 'Dry Cleaning',
        sla: 'Due in 1h',
      },
    ],
  },
  {
    id: 'ready',
    title: 'Ready for Handoff',
    icon: Package,
    orders: [
      {
        id: '#YL12347',
        customer: 'Acme Corp',
        service: 'Wash & Fold',
        sla: 'Completed',
      },
    ],
  },
];

const OrderCard = ({ order }: { order: (typeof columns)[0]['orders'][0] }) => {
    const orderId = order.id.replace('#', '');
    return (
      <Card className="mb-4">
        <CardHeader className="p-4 flex flex-row items-start justify-between">
          <div>
            <Link href={`/laundromat/orders/${orderId}`}>
                <CardTitle className="text-base font-bold hover:underline">{order.id}</CardTitle>
            </Link>
            <CardDescription>{order.customer}</CardDescription>
          </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/laundromat/orders/${orderId}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Report Issue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex justify-between items-center text-sm">
            <p className="font-medium">{order.service}</p>
            <Badge
              variant={order.sla === 'Completed' ? 'default' : 'destructive'}
            >
              {order.sla}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
}

export default function ProcessingPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="pb-8">
        <h1 className="text-3xl font-bold font-headline">Processing Board</h1>
        <p className="text-muted-foreground">
          Manage orders through the laundry lifecycle.
        </p>
      </div>
      <div className="flex-grow overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className="bg-muted rounded-lg p-4 w-[320px] h-full flex flex-col"
            >
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <column.icon className="h-5 w-5 text-muted-foreground" />
                {column.title}{' '}
                <span className="text-sm bg-background text-muted-foreground rounded-full h-6 w-6 flex items-center justify-center">
                  {column.orders.length}
                </span>
              </h2>
              <div className="flex-grow overflow-y-auto">
                {column.orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
                 {column.orders.length === 0 && (
                    <div className="text-center text-muted-foreground py-16 border-2 border-dashed rounded-lg">
                        <p>No orders in this stage.</p>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
