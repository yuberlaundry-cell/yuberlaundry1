
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "July", company: 18000, employee: 2500 },
  { month: "August", company: 21000, employee: 3000 },
  { month: "September", company: 19000, employee: 2000 },
  { month: "October", company: 25000, employee: 4500 },
  { month: "November", company: 23000, employee: 3500 },
  { month: "December", company: 22500, employee: 4000 },
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

export function SpendOverTimeChart() {
  return (
     <Card>
        <CardHeader>
            <CardTitle>Spend Over Time</CardTitle>
            <CardDescription>Company-wide spending for the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
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
                    <Bar dataKey="company" fill="var(--color-company)" radius={4} />
                    <Bar dataKey="employee" fill="var(--color-employee)" radius={4} />
                </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}
