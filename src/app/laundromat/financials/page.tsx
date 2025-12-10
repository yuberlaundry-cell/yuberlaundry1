'use client';

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
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  Download,
  MoreHorizontal,
  TrendingUp,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const kpiCards = [
  {
    title: 'Upcoming Payout',
    value: '$2,450.75',
    icon: DollarSign,
    description: 'Scheduled for June 1, 2024',
  },
  {
    title: 'Last Payout',
    value: '$2,310.50',
    icon: TrendingUp,
    description: 'Paid on May 15, 2024',
  },
  {
    title: 'YTD Earnings',
    value: '$25,830.00',
    icon: DollarSign,
    description: 'Platform fees paid',
  },
];

const payoutHistory = [
  {
    id: 'PAY-24-05-15',
    date: 'May 15, 2024',
    amount: '$2,310.50',
    status: 'Completed',
    period: 'May 1-14',
  },
  {
    id: 'PAY-24-05-01',
    date: 'May 1, 2024',
    amount: '$2,250.00',
    status: 'Completed',
    period: 'April 15-30',
  },
  {
    id: 'PAY-24-04-15',
    date: 'April 15, 2024',
    amount: '$2,410.20',
    status: 'Completed',
    period: 'April 1-14',
  },
];

const statusColors: { [key: string]: string } = {
  Completed: 'bg-green-100 text-green-800',
  Processing: 'bg-blue-100 text-blue-800',
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
            Track your payouts, commissions, and earnings.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>
            A record of all payouts from Yuber Laundry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutHistory.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell className="font-medium font-mono text-xs">
                    {payout.id}
                  </TableCell>
                  <TableCell>{payout.date}</TableCell>
                  <TableCell>{payout.period}</TableCell>
                  <TableCell className="font-medium">{payout.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[payout.status]}
                    >
                      {payout.status}
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
                        <DropdownMenuItem>View Breakdown</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Statement
                        </DropdownMenuItem>
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
