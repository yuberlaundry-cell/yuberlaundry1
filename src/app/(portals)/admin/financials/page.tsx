
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Download, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


const kpiCards = [
  {
    title: 'Total Revenue',
    value: '$2,150,830',
    icon: DollarSign,
    description: '+15.2% this quarter',
  },
  {
    title: 'Net Platform Fees',
    value: '$322,624',
    icon: TrendingUp,
    description: '15% of GMV',
  },
  {
    title: 'Total Refunds',
    value: '$12,450',
    icon: TrendingDown,
    description: '-5% vs last quarter',
  },
   {
    title: 'Open Disputes',
    value: '4',
    icon: TrendingDown,
    description: '$85.50 at risk',
  },
];

const reconciliationBatches = [
    { id: 'REC-2024-11-01', provider: 'Stripe', period: 'Nov 1-15, 2024', amount: '$150,450.22', status: 'Completed' },
    { id: 'REC-2024-10-15', provider: 'Stripe', period: 'Oct 16-31, 2024', amount: '$145,980.10', status: 'Completed' },
    { id: 'PAY-L-2024-11-01', provider: 'Partner Payouts', period: 'Nov 1-15, 2024', amount: '$85,200.00', status: 'In Progress' },
    { id: 'PAY-D-2024-11-01', provider: 'Driver Payouts', period: 'Nov 1-15, 2024', amount: '$42,100.50', status: 'Pending' },
];

const statusColors: { [key: string]: string } = {
  Completed: 'bg-green-100 text-green-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Pending: 'bg-amber-100 text-amber-800',
  Failed: 'bg-red-100 text-red-800',
};

export default function FinancialsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Financials</h1>
            <p className="text-muted-foreground">
                High-level financial analytics and reconciliation tools.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
        </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

        <Card>
            <CardHeader>
                <CardTitle>Reconciliation Status</CardTitle>
                <CardDescription>
                    Monitor the status of financial reconciliation batches.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Batch ID</TableHead>
                            <TableHead>Provider/Type</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reconciliationBatches.map((batch) => (
                            <TableRow key={batch.id}>
                                <TableCell className="font-medium font-mono text-xs">{batch.id}</TableCell>
                                <TableCell>{batch.provider}</TableCell>
                                <TableCell>{batch.period}</TableCell>
                                <TableCell className="font-medium">{batch.amount}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={statusColors[batch.status]}>
                                        {batch.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Download Report</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
