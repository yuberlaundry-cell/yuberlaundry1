
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
  Search,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useRouter } from 'next/navigation';

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
    description: 'After platform fees',
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

const chartData = [
    { month: "Jan", earnings: 4000 },
    { month: "Feb", earnings: 3000 },
    { month: "Mar", earnings: 5000 },
    { month: "Apr", earnings: 4500 },
    { month: "May", earnings: 6000 },
];
const chartConfig = {
    earnings: {
        label: "Earnings",
        color: "hsl(var(--primary))",
    },
};


export default function FinancialsPage() {
    const router = useRouter();

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
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 xl:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Earnings Over Time</CardTitle>
                    <CardDescription>Monthly earnings after platform fees.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                             <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${Number(value) / 1000}k`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-3 xl:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Bank Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                        <DollarSign className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <p className="font-medium">Main Street Bank</p>
                            <p className="text-sm text-muted-foreground">Account ending in **** 5678</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full">Manage Payout Method</Button>
                </CardContent>
            </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                 <div>
                    <CardTitle>Payout History</CardTitle>
                    <CardDescription>
                        A record of all payouts from Yuber Laundry.
                    </CardDescription>
                </div>
                 <div className="flex items-center gap-2 flex-wrap">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                            Date: All time <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="range" />
                        </PopoverContent>
                    </Popover>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                            Status: All <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>All</DropdownMenuItem>
                            <DropdownMenuItem>Completed</DropdownMenuItem>
                            <DropdownMenuItem>Processing</DropdownMenuItem>
                            <DropdownMenuItem>Failed</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
                 </div>
            </div>
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
                <TableRow key={payout.id} className="cursor-pointer" onClick={() => router.push(`/laundromat/financials/payouts/${payout.id}`)}>
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
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/laundromat/financials/payouts/${payout.id}`)}>
                            View Breakdown
                        </DropdownMenuItem>
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
