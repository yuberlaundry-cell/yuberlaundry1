'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Gift, Clock, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const transactions = [
    { date: 'May 12, 2024', description: 'Credit from referral', amount: '+$5.00' },
    { date: 'May 10, 2024', description: 'Applied to Order #YL12344', amount: '-$10.00' },
    { date: 'May 1, 2024', description: 'Yuber Plus monthly credit', amount: '+$5.00' },
    { date: 'April 20, 2024', description: 'Refund for missing item', amount: '+$15.50' },
];

export default function WalletPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Yuber Wallet</h1>
        <p className="text-muted-foreground">
          Your balance, transaction history, and referral rewards.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary"/>
                    Current Balance
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-5xl font-bold">$15.50</p>
                 <p className="text-sm text-muted-foreground mt-1">Available credits are automatically applied to your next order.</p>
            </CardContent>
            <CardFooter>
                <Button><PlusCircle className="mr-2"/> Add Funds</Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Gift className="h-6 w-6 text-primary" />
                     Refer & Earn
                </CardTitle>
                <CardDescription>
                    Share your code with friends. They get $10 off, and you get $10 when they place their first order.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input value="JANE-DOE-123" readOnly />
                    <Button variant="outline">Copy</Button>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map(t => (
                        <TableRow key={t.date}>
                            <TableCell>{t.date}</TableCell>
                            <TableCell>{t.description}</TableCell>
                             <TableCell className={`text-right font-medium ${t.amount.startsWith('+') ? 'text-green-600' : ''}`}>
                                {t.amount}
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
