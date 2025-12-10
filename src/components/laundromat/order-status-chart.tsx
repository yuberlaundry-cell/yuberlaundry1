
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { status: 'Intake', orders: 12, fill: 'var(--color-intake)' },
  { status: 'Washing', orders: 25, fill: 'var(--color-washing)' },
  { status: 'Drying', orders: 18, fill: 'var(--color-drying)' },
  { status: 'Folding/QC', orders: 8, fill: 'var(--color-folding)' },
  { status: 'Ready', orders: 28, fill: 'var(--color-ready)' },
];

const chartConfig = {
  orders: {
    label: 'Orders',
  },
  intake: {
    label: 'Intake',
    color: 'hsl(var(--chart-1))',
  },
  washing: {
    label: 'Washing',
    color: 'hsl(var(--chart-2))',
  },
  drying: {
    label: 'Drying',
    color: 'hsl(var(--chart-3))',
  },
  folding: {
    label: 'Folding/QC',
    color: 'hsl(var(--chart-4))',
  },
  ready: {
    label: 'Ready for Handoff',
    color: 'hsl(var(--chart-5))',
  },
};

export function OrderStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Order Status</CardTitle>
        <CardDescription>
          Distribution of orders across processing stages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-xs"
            />
            <XAxis dataKey="orders" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="orders" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
