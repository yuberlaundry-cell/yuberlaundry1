
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "July", company: 38000, employee: 4000 },
  { month: "August", company: 41000, employee: 5000 },
  { month: "September", company: 39000, employee: 3500 },
  { month: "October", company: 45000, employee: 6000 },
  { month: "November", company: 43000, employee: 5500 },
  { month: "December", company: 42500, employee: 5000 },
]

const chartConfig = {
  company: {
    label: "Company Spend",
    color: "hsl(var(--primary))",
  },
  employee: {
    label: "Employee Spend",
    color: "hsl(var(--secondary))",
  },
}

export function SpendChart() {
  return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R${Number(value) / 1000}k`}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar dataKey="company" fill="var(--color-company)" radius={4} stackId="a" />
                <Bar dataKey="employee" fill="var(--color-employee)" radius={4} stackId="a" />
            </BarChart>
        </ChartContainer>
  )
}
