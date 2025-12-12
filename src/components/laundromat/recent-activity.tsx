
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useLaundromatOrders } from '@/hooks/use-laundromat-orders';
import { useRouter } from 'next/navigation';

const statusColors: { [key: string]: string } = {
  'Ready': 'bg-green-100 text-green-800',
  'Washing': 'bg-blue-100 text-blue-800',
  'Drying': 'bg-blue-100 text-blue-800',
  'Folding/QC': 'bg-purple-100 text-purple-800',
  'Intake': 'bg-gray-100 text-gray-800',
};


export function RecentActivity() {
  const { orders } = useLaundromatOrders();
  const router = useRouter();
  const currentOrders = orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/laundromat/orders">View all orders</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {/* Desktop Table */}
        <div className="hidden md:block">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer" onClick={() => router.push(`/laundromat/orders/${order.id.replace('#', '')}`)}>
                    <TableCell className="font-medium">
                        {order.id}
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>
                    <Badge variant="secondary" className={statusColors[order.status] || ''}>
                        {order.status}
                    </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.sla.includes('Due') ? 'destructive' : 'outline'}>{order.sla}</Badge>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>

        {/* Mobile Card List */}
        <div className="space-y-4 md:hidden">
            {currentOrders.map((order) => (
                <Card key={order.id} onClick={() => router.push(`/laundromat/orders/${order.id.replace('#', '')}`)}>
                     <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-base">{order.id}</CardTitle>
                                <CardDescription>{order.customer}</CardDescription>
                            </div>
                             <Badge variant="secondary" className={statusColors[order.status] || ''}>
                                {order.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="text-sm flex justify-between items-center">
                        <p>{order.service}</p>
                        <Badge variant={order.sla.includes('Due') ? 'destructive' : 'outline'}>{order.sla}</Badge>
                    </CardContent>
                </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
