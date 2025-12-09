'use client';

import {
  ArrowLeft,
  Banknote,
  CircleOff,
  Clock,
  CreditCard,
  Mail,
  MessageSquareWarning,
  Phone,
  RotateCcw,
  ShieldAlert,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const customer = {
  id: 'cust-001',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+44 7123 456 789',
  status: 'Active',
  totalOrders: 25,
  lifetimeSpend: 630.5,
  signupDate: 'Jan 15, 2023',
  walletBalance: 15.5,
  orders: [
    { id: '#YL12345', status: 'Delivered', date: 'May 12, 2024', total: 25.5 },
    { id: '#YL12340', status: 'Delivered', date: 'May 5, 2024', total: 32.0 },
  ],
  issues: [
    {
      id: 'TKT-001',
      subject: 'Missing sock',
      status: 'Resolved',
      date: 'Apr 20, 2024',
    },
  ],
};

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Suspended: 'bg-red-100 text-red-800',
};

export default function CustomerDetailsPage() {
    const router = useRouter();
  return (
    <div className="space-y-8 pb-8">
      <div>
        <Button variant="ghost" onClick={() => router.push('/admin/customers')} className="-ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all customers
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl">
              {customer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold font-headline">
                {customer.name}
              </h1>
              <Badge
                variant="secondary"
                className={statusColors[customer.status]}
              >
                {customer.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{customer.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Password
          </Button>
          <Button variant="destructive">
            <CircleOff className="mr-2 h-4 w-4" /> Suspend
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>{' '}
                <span className="font-medium">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>{' '}
                <span className="font-medium">{customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Signup Date</span>{' '}
                <span className="font-medium">{customer.signupDate}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-primary" /> Financials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Orders</span>{' '}
                        <span className="font-medium">{customer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Lifetime Spend</span>{' '}
                        <span className="font-medium">
                        ${customer.lifetimeSpend.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Wallet Balance</span>{' '}
                        <span className="font-medium">
                        ${customer.walletBalance.toFixed(2)}
                        </span>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="wallet-adjustment">Adjust Wallet</Label>
                    <div className="flex gap-2">
                        <Input id="wallet-adjustment" type="number" placeholder="e.g., -10 or 20" />
                        <Button variant="outline">Apply</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ${order.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets & Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.issues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">{issue.id}</TableCell>
                      <TableCell>{issue.subject}</TableCell>
                      <TableCell>{issue.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{issue.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}