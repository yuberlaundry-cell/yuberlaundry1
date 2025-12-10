
'use client';

import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { service: "Wash & Fold", spend: 850, fill: "var(--color-wash-fold)" },
  { service: "Dry Cleaning", spend: 320, fill: "var(--color-dry-cleaning)" },
  { service: "Ironing", spend: 80.75, fill: "var(--color-ironing)" },
]

const chartConfig = {
  spend: {
    label: "Spend",
  },
  "wash-fold": {
    label: "Wash & Fold",
    color: "hsl(var(--chart-1))",
  },
  "dry-cleaning": {
    label: "Dry Cleaning",
    color: "hsl(var(--chart-2))",
  },
  ironing: {
    label: "Ironing",
    color: "hsl(var(--chart-3))",
  },
}

export function ServiceTypeChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Orders by Service Type</CardTitle>
            <CardDescription>Breakdown of company spending by service.</CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-[250px]"
                >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="spend"
                        nameKey="service"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                         {chartData.map((entry) => (
                            <Cell key={entry.service} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
                </ChartContainer>
        </CardContent>
    </Card>
  )
}
