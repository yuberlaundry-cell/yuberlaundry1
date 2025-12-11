
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
import {
  Server,
  Database,
  Cpu,
  MemoryStick,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const systemComponents = [
    { name: 'Web Servers', icon: Server, status: 'Healthy', details: '3 of 3 instances running' },
    { name: 'Databases', icon: Database, status: 'Healthy', details: 'Primary & replica synced' },
    { name: 'Background Jobs', icon: Clock, status: 'Degraded', details: 'High latency in job queue' },
];

const resourceMetrics = [
    { resource: 'CPU Utilization', value: 45, icon: Cpu },
    { resource: 'Memory Usage', value: 62, icon: MemoryStick },
    { resource: 'Database Connections', value: 75, icon: Database },
];

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">System Health</h1>
          <p className="text-muted-foreground">
            Live overview of platform infrastructure and performance.
          </p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <RefreshCw /> Refresh
        </Button>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Core Components</CardTitle>
            <CardDescription>Status of essential backend services.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemComponents.map(comp => (
                  <TableRow key={comp.name}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <comp.icon className="h-5 w-5 text-muted-foreground" />
                      {comp.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {comp.status === 'Healthy' ? <CheckCircle className="text-green-500" /> : <AlertTriangle className="text-amber-500" />}
                        {comp.status}
                      </div>
                    </TableCell>
                    <TableCell>{comp.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                 <CardDescription>
                    Key infrastructure resource metrics.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {resourceMetrics.map(metric => (
                    <div key={metric.resource}>
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-2 text-sm font-medium">
                                <metric.icon className="h-4 w-4 text-muted-foreground" />
                                {metric.resource}
                             </div>
                             <span className="text-sm font-semibold">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} />
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
