'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, Chart as ChartPrimitive } from "@/components/ui/chart"

const chartData = [
  { month: "July", company: 3800, employee: 400 },
  { month: "August", company: 4100, employee: 500 },
  { month: "September", company: 3900, employee: 350 },
  { month: "October", company: 4500, employee: 600 },
  { month: "November", company: 4300, employee: 550 },
  { month: "December", company: 4250, employee: 500 },
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
                    tickFormatter={(value) => `$${Number(value) / 1000}k`}
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
