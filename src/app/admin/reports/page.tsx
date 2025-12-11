
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
  Map,
  Users,
  Building,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const supplyDemandData = [
  { time: '09:00', demand: 80, supply: 60 },
  { time: '12:00', demand: 120, supply: 90 },
  { time: '15:00', demand: 100, supply: 110 },
  { time: '18:00', demand: 150, supply: 100 },
  { time: '21:00', demand: 90, supply: 120 },
];

const chartConfig = {
  demand: {
    label: 'Demand',
    color: 'hsl(var(--primary))',
  },
  supply: {
    label: 'Supply',
    color: 'hsl(var(--secondary))',
  },
};

const hotspotAreas = [
    { area: 'Downtown', demandScore: 92, driverSupply: 15, laundromatCapacity: '85%' },
    { area: 'Northside', demandScore: 78, driverSupply: 22, laundromatCapacity: '95%' },
    { area: 'West End', demandScore: 85, driverSupply: 12, laundromatCapacity: '70%' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
            Demand vs. Supply
          </h1>
          <p className="text-muted-foreground">
            Monitor real-time demand against operational supply.
          </p>
        </div>
         <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
                    Date: Today <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar />
                </PopoverContent>
            </Popover>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hourly Demand vs. Supply</CardTitle>
            <CardDescription>
              Orders requested (demand) vs. available drivers/laundromats (supply).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
               <BarChart accessibilityLayer data={supplyDemandData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="time"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="demand" fill="var(--color-demand)" radius={4} />
                    <Bar dataKey="supply" fill="var(--color-supply)" radius={4} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Actionable Alerts</CardTitle>
                 <CardDescription>
                    Automated recommendations based on current data.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                        <p className="font-semibold text-red-800">High Demand Alert: Downtown</p>
                        <p className="text-red-700">Driver supply is low. Consider incentives.</p>
                    </div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                        <p className="font-semibold text-amber-800">Capacity Warning: Northside</p>
                        <p className="text-amber-700">Laundromats are nearing full capacity.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Regional Hotspots</CardTitle>
            <CardDescription>Breakdown of supply and demand by city area.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><div className="flex items-center gap-2"><Map /> Area</div></TableHead>
                        <TableHead>Demand Score</TableHead>
                        <TableHead><div className="flex items-center gap-2"><Users/> Driver Supply</div></TableHead>
                        <TableHead><div className="flex items-center gap-2"><Building/> Laundromat Capacity</div></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hotspotAreas.map(area => (
                        <TableRow key={area.area}>
                            <TableCell className="font-medium">{area.area}</TableCell>
                            <TableCell>
                                <Badge variant={area.demandScore > 90 ? 'destructive' : 'secondary'}>{area.demandScore}/100</Badge>
                            </TableCell>
                             <TableCell>{area.driverSupply} available</TableCell>
                            <TableCell>{area.laundromatCapacity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    </div>
  );
}
