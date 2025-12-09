'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const qcTasks = [
    { orderId: '#YL12346', customer: 'John Smith', service: 'Dry Cleaning', stage: 'Final QC', assignedTo: 'Maria G', status: 'Pending' },
    { orderId: '#YL12348', customer: 'Peter Pan', service: 'Ironing', stage: 'Post-Wash', assignedTo: 'Tom J', status: 'Pending' },
    { orderId: '#YL12345', customer: 'Jane Doe', service: 'Wash & Fold', stage: 'Final QC', assignedTo: 'Maria G', status: 'In Progress' },
];

const statusColors: { [key: string]: string } = {
  Pending: 'bg-amber-100 text-amber-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
};


export default function QCPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Quality Control</h1>
        <p className="text-muted-foreground">
          Manage all pending and in-progress quality control tasks.
        </p>
      </div>

       <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>12</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pass Rate (Today)</CardTitle>
            <CardDescription>98.5%</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Issues Detected (Today)</CardTitle>
            <CardDescription>2</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Pending QC Queue</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>QC Stage</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {qcTasks.map((task) => (
                        <TableRow key={task.orderId}>
                            <TableCell className="font-medium">
                                <Link href={`/laundromat/orders/${task.orderId.replace('#', '')}`} className="hover:underline">
                                    {task.orderId}
                                </Link>
                            </TableCell>
                            <TableCell>{task.customer}</TableCell>
                            <TableCell>{task.service}</TableCell>
                            <TableCell>{task.stage}</TableCell>
                            <TableCell>{task.assignedTo}</TableCell>
                             <TableCell>
                                <Badge variant="secondary" className={statusColors[task.status]}>{task.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/laundromat/orders/${task.orderId.replace('#', '')}`}>
                                        Start QC
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

    </div>
  );
}
