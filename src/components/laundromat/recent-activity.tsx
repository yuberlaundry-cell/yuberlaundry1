
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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';

const mockOrders = [
    {id: '#YL12345', customer: 'Jane Doe', status: 'Washing', service: 'Wash & Fold'},
    {id: '#YL12346', customer: 'John Smith', status: 'Folding/QC', service: 'Dry Cleaning'},
    {id: '#YL12347', customer: 'Acme Corp', status: 'Ready', service: 'Wash & Fold'},
    {id: '#YL12348', customer: 'Peter Pan', status: 'Drying', service: 'Ironing'},
    {id: '#YL12349', customer: 'Mary Poppins', status: 'Intake', service: 'Wash & Fold'},
];

const statusColors: { [key: string]: string } = {
  'Ready': 'bg-green-100 text-green-800',
  'Washing': 'bg-blue-100 text-blue-800',
  'Drying': 'bg-blue-100 text-blue-800',
  'Folding/QC': 'bg-purple-100 text-purple-800',
  'Intake': 'bg-gray-100 text-gray-800',
};


export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/laundromat/orders">View all orders</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link href={`/laundromat/orders/${order.id.replace('#', '')}`} className="hover:underline">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.service}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[order.status] || ''}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
