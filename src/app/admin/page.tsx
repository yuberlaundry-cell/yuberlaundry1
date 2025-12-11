
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
import {
  Users,
  WashingMachine,
  Truck,
  DollarSign,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import Link from 'next/link';

const kpiCards = [
  {
    title: 'Total Users',
    value: '1,254',
    icon: Users,
    description: '+20% from last month',
  },
  {
    title: 'Active Laundromats',
    value: '23',
    icon: WashingMachine,
    description: '+2 new partners',
  },
  {
    title: 'Active Drivers',
    value: '57',
    icon: Truck,
    description: '+5 from last week',
  },
  {
    title: 'Platform Revenue (MoM)',
    value: 'R1.25M',
    icon: DollarSign,
    description: '+15.2% from last month',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 400000 },
  { month: 'Feb', revenue: 300000 },
  { month: 'Mar', revenue: 500000 },
  { month: 'Apr', revenue: 450000 },
  { month: 'May', revenue: 600000 },
  { month: 'Jun', revenue: 700000 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
};

const recentActivities = [
    { id: 'U-098', description: 'New user registered: jane.doe@example.com', type: 'User', date: '2 min ago' },
    { id: 'L-012', description: 'New laundromat onboarded: Speedy Suds', type: 'Laundromat', date: '1 hour ago' },
    { id: 'D-045', description: 'Driver application received: Alex Ray', type: 'Driver', date: '3 hours ago' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Platform-wide overview and key metrics.
          </p>
        </div>
         <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/reports">View All Reports</Link>
        </Button>
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

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>
              Monthly recurring revenue (MRR) for the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart
                accessibilityLayer
                data={revenueData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="var(--color-revenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-revenue)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                 <CardDescription>
                    Latest platform events.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableBody>
                        {recentActivities.map(activity => (
                            <TableRow key={activity.id}>
                                <TableCell>
                                    <p className="font-medium">{activity.description}</p>
                                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                                </TableCell>
                                <TableCell className='text-right'>
                                     <Badge variant="outline">{activity.type}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
