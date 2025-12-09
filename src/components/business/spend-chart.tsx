'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, Chart as ChartPrimitive } from "@/components/ui/chart"

const chartData = [
  { month: "July", spend: 3800 },
  { month: "August", spend: 4100 },
  { month: "September", spend: 3900 },
  { month: "October", spend: 4500 },
  { month: "November", spend: 4300 },
  { month: "December", spend: 4250 },
]

const chartConfig = {
  spend: {
    label: "Spend",
    color: "hsl(var(--primary))",
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
                <Bar dataKey="spend" fill="var(--color-spend)" radius={4} />
            </BarChart>
        </ChartContainer>
  )
}
