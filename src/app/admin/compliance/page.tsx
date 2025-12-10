
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
  FileCheck,
  ShieldAlert,
  AlertOctagon,
  CalendarClock,
  BarChart,
  ChevronDown,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Chart,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const kpiCards = [
  {
    title: 'High-Risk Entities',
    value: '8',
    icon: ShieldAlert,
    description: '2 drivers, 6 laundromats',
  },
  {
    title: 'Documents Expiring Soon',
    value: '14',
    icon: CalendarClock,
    description: 'Next 30 days',
  },
  {
    title: 'Open Compliance Tasks',
    value: '21',
    icon: FileCheck,
    description: '5 overdue',
  },
  {
    title: 'Fraud Alerts (7d)',
    value: '4',
    icon: AlertOctagon,
    description: '2 requiring review',
  },
];

const riskScoreData = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
  { month: 'Mar', score: 87 },
  { month: 'Apr', score: 90 },
  { month: 'May', score: 92 },
  { month: 'Jun', score: 91 },
];

const chartConfig = {
  score: {
    label: 'Risk Score',
    color: 'hsl(var(--primary))',
  },
};

const recentTasks = [
    { id: 'T-098', title: 'Review Driver D-45 background check', priority: 'High', due: '2 days' },
    { id: 'T-097', title: 'Audit Laundromat L-12 chemical storage', priority: 'Medium', due: '1 week' },
    { id: 'T-096', title: 'Verify warehouse W-02 fire safety certificate', priority: 'High', due: 'overdue' },
];

export default function CompliancePage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">
            Compliance & Governance
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage platform-wide compliance, risk, and governance.
          </p>
        </div>
         <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                <Button variant="outline">
                    Date: All Time <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="range" />
                </PopoverContent>
            </Popover>
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

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Risk Score Over Time</CardTitle>
            <CardDescription>
              Aggregated compliance risk score across all entities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart
                accessibilityLayer
                data={riskScoreData}
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
                  dataKey="score"
                  type="natural"
                  fill="var(--color-score)"
                  fillOpacity={0.4}
                  stroke="var(--color-score)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Top Open Tasks</CardTitle>
                 <CardDescription>
                    High-priority compliance tasks requiring attention.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentTasks.map(task => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell>
                                     <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>
                                        {task.priority}
                                    </Badge>
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
