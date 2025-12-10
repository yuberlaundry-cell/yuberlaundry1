
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
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const services = [
  {
    name: 'Google Maps API',
    status: 'Operational',
    icon: CheckCircle,
    color: 'text-green-500',
    chartData: [
      { time: '12:00', ms: 50 },
      { time: '12:05', ms: 52 },
      { time: '12:10', ms: 48 },
      { time: '12:15', ms: 55 },
      { time: '12:20', ms: 53 },
      { time: '12:25', ms: 50 },
    ],
  },
  {
    name: 'Payment Gateway',
    status: 'Degraded Performance',
    icon: AlertTriangle,
    color: 'text-amber-500',
     chartData: [
      { time: '12:00', ms: 120 },
      { time: '12:05', ms: 130 },
      { time: '12:10', ms: 250 },
      { time: '12:15', ms: 240 },
      { time: '12:20', ms: 125 },
      { time: '12:25', ms: 122 },
    ],
  },
  {
    name: 'SMS Service',
    status: 'Operational',
    icon: CheckCircle,
    color: 'text-green-500',
     chartData: [
      { time: '12:00', ms: 80 },
      { time: '12:05', ms: 85 },
      { time: '12:10', ms: 82 },
      { time: '12:15', ms: 88 },
      { time: '12:20', ms: 81 },
      { time: '12:25', ms: 84 },
    ],
  },
  {
    name: 'Geocoding Service',
    status: 'Outage',
    icon: XCircle,
    color: 'text-red-500',
    chartData: [
      { time: '12:00', ms: 90 },
      { time: '12:05', ms: 95 },
      { time: '12:10', ms: 100 },
      { time: '12:15', ms: 0 },
      { time: '12:20', ms: 0 },
      { time: '12:25', ms: 0 },
    ],
  },
];

const chartConfig = {
  ms: {
    label: 'ms',
    color: 'hsl(var(--primary))',
  },
};

const uptimeStats = [
    { service: 'Google Maps API', '24h': '100%', '7d': '99.98%', '30d': '99.95%' },
    { service: 'Payment Gateway', '24h': '99.90%', '7d': '99.95%', '30d': '99.98%' },
    { service: 'SMS Service', '24h': '100%', '7d': '100%', '30d': '99.99%' },
    { service: 'Geocoding Service', '24h': '98.20%', '7d': '99.50%', '30d': '99.80%' },
];

const incidentLog = [
    { time: '2024-05-13 12:14 UTC', service: 'Geocoding Service', event: 'Service outage detected.' },
    { time: '2024-05-13 12:10 UTC', service: 'Payment Gateway', event: 'Response times elevated.' },
];

export default function ApiStatusPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">API Status</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of all critical system services.
          </p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <RefreshCw /> Refresh Status
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <service.icon className={`h-5 w-5 ${service.color}`} />
                  <span className={`font-semibold ${service.color}`}>
                    {service.status}
                  </span>
                </div>
              </div>
              <CardDescription>Average response time (last 30 minutes)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <AreaChart
                  data={service.chartData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} domain={[0, 'dataMax + 50']}/>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="ms"
                    type="natural"
                    fill="var(--color-ms)"
                    fillOpacity={0.4}
                    stroke="var(--color-ms)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ))}
      </div>
        <div className="grid lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Uptime</CardTitle>
                    <CardDescription>Historical service uptime percentages.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>24 Hours</TableHead>
                                <TableHead>7 Days</TableHead>
                                <TableHead>30 Days</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uptimeStats.map(stat => (
                                <TableRow key={stat.service}>
                                    <TableCell className="font-medium">{stat.service}</TableCell>
                                    <TableCell className="text-green-600">{stat['24h']}</TableCell>
                                    <TableCell className="text-green-600">{stat['7d']}</TableCell>
                                    <TableCell className="text-green-600">{stat['30d']}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Incident Log</CardTitle>
                    <CardDescription>Recent automated system events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Event</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {incidentLog.map(log => (
                                <TableRow key={log.time}>
                                    <TableCell className="font-mono text-xs">{log.time}</TableCell>
                                    <TableCell className="font-medium">{log.service}</TableCell>
                                    <TableCell>{log.event}</TableCell>
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
