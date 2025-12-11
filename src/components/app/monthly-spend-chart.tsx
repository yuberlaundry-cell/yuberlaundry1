
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
  { month: 'Dec', spend: 255 },
  { month: 'Jan', spend: 305 },
  { month: 'Feb', spend: 237 },
  { month: 'Mar', spend: 173 },
  { month: 'Apr', spend: 209 },
  { month: 'May', spend: 214 },
];

const chartConfig = {
  spend: {
    label: 'Spend (R)',
    color: 'hsl(var(--primary))',
  },
};

export function MonthlySpendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Monthly Spend</CardTitle>
        <CardDescription>Spending summary for the last 6 months.</CardDescription>
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
                tickFormatter={(value) => `R${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="spend" fill="var(--color-spend)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
