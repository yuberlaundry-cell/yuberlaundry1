
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
  { month: 'Dec', hours: 4 },
  { month: 'Jan', hours: 5 },
  { month: 'Feb', hours: 3.5 },
  { month: 'Mar', hours: 2.5 },
  { month: 'Apr', hours: 3 },
  { month: 'May', hours: 3.5 },
];

const chartConfig = {
  hours: {
    label: 'Hours Saved',
    color: 'hsl(var(--primary))',
  },
};

export function MonthlySpendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Laundry Hours Saved</CardTitle>
        <CardDescription>An estimate of the time you've reclaimed each month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
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
                tickFormatter={(value) => `${value}h`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
